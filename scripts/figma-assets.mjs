/**
 * Downloads the assets under a Figma node via the REST API.
 *
 * The REST API has its own quota, separate from the Figma MCP server's — so
 * this keeps working when MCP returns "tool call limit on the Starter plan".
 *
 *   export FIGMA_TOKEN=figd_xxx          # never commit this
 *   node scripts/figma-assets.mjs 1:10298 public/images/logos
 *   node scripts/figma-assets.mjs 1:10298 public/images/logos --format=png --scale=3
 *
 * Grabs two things for every direct child of the node:
 *   - a rendered export (svg by default, png/jpg on request)
 *   - the ORIGINAL uploaded bitmap behind any image fill, which is higher
 *     fidelity than a re-render and is what you want for a photographic logo
 *
 * Token: Figma → Settings → Security → Personal access tokens → Generate.
 * It needs `file_content:read`. Keep it in your shell, not in this repo.
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const FILE_KEY = process.env.FIGMA_FILE_KEY || 'Y0rkpmr19ITkTDSX1S1m4S'
const TOKEN = process.env.FIGMA_TOKEN

const [nodeArg, outArg, ...flags] = process.argv.slice(2)
const nodeId = (nodeArg || '1:10298').replace('-', ':')
const outDir = outArg || 'public/images/figma'
const flag = (name, fallback) => {
  const hit = flags.find((f) => f.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : fallback
}
const format = flag('format', 'svg')
const scale = flag('scale', '2')

if (!TOKEN) {
  console.error('FIGMA_TOKEN is not set.\n\n  export FIGMA_TOKEN=figd_xxx\n\nFigma → Settings → Security → Personal access tokens.')
  process.exit(1)
}

const api = async (path) => {
  const res = await fetch(`https://api.figma.com/v1/${path}`, { headers: { 'X-Figma-Token': TOKEN } })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on /${path}\n${await res.text()}`)
  return res.json()
}

/** Filenames from Figma layer names, which are rarely filename-safe. */
const slug = (name, i) =>
  (name || `layer-${i}`)
    .replace(/\.(jpg|jpeg|png|svg|webp)$/i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `layer-${i}`

const save = async (url, file) => {
  const res = await fetch(url)
  if (!res.ok) return console.warn(`  ! ${file} — ${res.status}`)
  await writeFile(file, Buffer.from(await res.arrayBuffer()))
  console.log(`  ✓ ${file}`)
}

const run = async () => {
  await mkdir(outDir, { recursive: true })

  const doc = await api(`files/${FILE_KEY}/nodes?ids=${encodeURIComponent(nodeId)}&depth=3`)
  const root = doc.nodes[nodeId]?.document
  if (!root) throw new Error(`Node ${nodeId} not found in ${FILE_KEY}.`)

  const children = root.children ?? [root]
  console.log(`\n${root.name} — ${children.length} child layer(s)\n`)

  // 1. Rendered exports, one request for every child.
  const ids = children.map((c) => c.id)
  const q = `images/${FILE_KEY}?ids=${ids.map(encodeURIComponent).join(',')}&format=${format}` +
    (format === 'svg' ? '' : `&scale=${scale}`)
  const { images, err } = await api(q)
  if (err) throw new Error(err)

  console.log(`Rendered exports (${format}${format === 'svg' ? '' : ` @${scale}x`}):`)
  for (const [i, child] of children.entries()) {
    const url = images[child.id]
    if (url) await save(url, join(outDir, `${slug(child.name, i)}.${format}`))
    else console.warn(`  ! ${child.name} — no render returned`)
  }

  // 2. Original uploaded bitmaps behind image fills — better than a re-render.
  const refs = await api(`files/${FILE_KEY}/images`).then((r) => r.meta?.images ?? {}).catch(() => ({}))
  const walk = (node, acc = []) => {
    for (const fill of node.fills ?? []) if (fill.type === 'IMAGE' && fill.imageRef) acc.push([node.name, fill.imageRef])
    for (const kid of node.children ?? []) walk(kid, acc)
    return acc
  }
  const fills = walk(root)
  if (fills.length) {
    console.log('\nOriginal source bitmaps:')
    for (const [i, [name, ref]] of fills.entries()) {
      const url = refs[ref]
      if (url) await save(url, join(outDir, `${slug(name, i)}-original.png`))
    }
  }

  console.log(`\nDone → ${outDir}`)
}

run().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
