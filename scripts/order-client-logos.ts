/**
 * Sets the client-logo board to the agreed 12, in the agreed order (task CL-5).
 *
 *   pnpm tsx scripts/order-client-logos.ts          # dry run
 *   pnpm tsx scripts/order-client-logos.ts --write  # apply
 *
 * Uploads the supplied artwork from public/images/logos/client-*, then replaces
 * the logoCloud block's array outright so the order is exactly the list below
 * and nothing unlisted survives.
 *
 * This supersedes the earlier reorder-only version, which could manage 9 of 12:
 * NEOM, Ooredoo and QNB had no asset in the repo, the CMS or the Figma design
 * (that frame holds exactly 10 cells). FEKRA supplied all twelve on 23 Aug.
 *
 * The unlisted "Partner" pinwheel is dropped by construction — it is simply not
 * in ORDER, and the array is replaced rather than merged.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const DIR = path.resolve(process.cwd(), 'public/images/logos')

/** The client's agreed priority order. Position here IS the position on the page. */
const ORDER: { name: string; file: string }[] = [
  /*
   * Every raster is TRIMMED to its artwork before upload. The supplied files
   * carried heavy baked-in padding — Pitman's mark occupied 11% of its canvas,
   * KFH 22%, NEOM 25% — so in a contain-fill cell they rendered tiny while the
   * tight crops (stc 88%, Al Rajhi 89%) rendered huge. Trimming is what makes
   * the marks commensurate, not the cell CSS. codewave/datafusion/SMS arrived
   * as rasters wrapped in an <svg> tag and were rasterised at density 600 and
   * trimmed the same way.
   */
  { name: 'ADNOC', file: 'client-adnoc.webp' },
  { name: 'NEOM', file: 'client-neom.webp' },
  { name: 'Ooredoo', file: 'client-ooredoo.webp' },
  { name: 'Al Rajhi Bank', file: 'client-al-rajhi-bank.webp' },
  { name: 'STC', file: 'client-stc.webp' },
  { name: 'Kuwait Finance House', file: 'client-kuwait-finance-house.webp' },
  { name: 'Allianz', file: 'client-allianz.webp' },
  { name: 'QNB', file: 'client-qnb.svg' },
  { name: 'Pitman', file: 'client-pitman.webp' },
  { name: 'Codewave', file: 'client-codewave.webp' },
  { name: 'Datafusion', file: 'client-datafusion.webp' },
  { name: 'Smart Management Systems', file: 'client-smart-management-systems.webp' },
]

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const missing = ORDER.filter((l) => !existsSync(path.join(DIR, l.file)))
  if (missing.length) throw new Error('Missing artwork:\n  ' + missing.map((m) => m.file).join('\n  '))

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No page with slug "home".')

  const layout = [...((page.layout ?? []) as { blockType?: string; variant?: string; logos?: { name: string }[] }[])]
  const index = layout.findIndex((b) => b.blockType === 'logoCloud' && b.variant !== 'badges')
  const block = layout[index]
  if (!block) throw new Error('No statement-variant logoCloud block on the home page.')

  const current = (block.logos ?? []).map((l) => l.name)
  console.log(`\ncurrent board: ${current.length} logos — ${current.join(', ')}`)
  console.log(`\nagreed order (${ORDER.length}):`)
  ORDER.forEach((l, i) => console.log(`  ${String(i + 1).padStart(2)}. ${l.name.padEnd(26)} ${l.file}`))
  const dropped = current.filter((n) => !ORDER.some((o) => o.name.toLowerCase().replace(/[^a-z]/g, '').includes(n.toLowerCase().replace(/[^a-z]/g, '').slice(0, 6))))
  if (dropped.length) console.log(`\nnot on the agreed list, will not survive: ${dropped.join(', ')}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  const logos = []
  for (const { name, file } of ORDER) {
    // Match on the stem: Payload renames on re-upload (foo.webp -> foo-1.webp),
    // so an `equals` lookup misses an existing doc and uploads a duplicate.
    const stem = file.replace(/\.(webp|svg)$/, '')
    const found = await payload.find({ collection: 'media', where: { filename: { like: stem } }, limit: 1, sort: 'id', depth: 0 })
    let id = found.docs[0]?.id as number | undefined
    if (id) {
      await payload.update({ collection: 'media', id, filePath: path.join(DIR, file), data: { alt: `${name} logo` } as never })
      console.log(`  update ${name} -> media ${id}`)
    } else {
      const created = await payload.create({ collection: 'media', filePath: path.join(DIR, file), data: { alt: `${name} logo` } as never })
      id = created.id as number
      console.log(`  upload ${name} -> media ${id}`)
    }
    logos.push({ name, image: id })
  }

  layout[index] = { ...block, logos } as (typeof layout)[number]
  /*
   * `_status` MUST be carried through. Pages has drafts enabled, so an update
   * that omits it saves a draft and silently UNPUBLISHES the page — the public
   * /cms-api starts 404ing while the live site keeps serving a stale static
   * copy, so nothing looks wrong until the next revalidation.
   */
  await payload.update({
    collection: 'pages',
    id: page.id,
    data: { layout, _status: page._status ?? 'published' } as never,
  })

  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}" — republish it in /admin.`)
  console.log(`\nApplied — ${logos.length} logos in agreed order, page still published.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
