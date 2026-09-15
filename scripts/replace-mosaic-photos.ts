/** Upload the generated editorial photo set and update only home hero images.
 * These are synthetic people, not portraits of FEKRA employees.
 * Default: dry run. Use --write to persist the selected images to the CMS.
 * The renderer also replaces known legacy assets locally, so this migration
 * is optional and does not block the visual update when the CMS is offline.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { HERO_PHOTOS } from '../src/lib/hero-photos'

const DIR = path.resolve(process.cwd(), 'public/images/hero')

const ASSIGNMENT = HERO_PHOTOS.map((photo) => ({ ...photo }))

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No home page.')

  const layout = [...((page.layout ?? []) as { blockType?: string; mosaic?: unknown }[])]
  const heroIndex = layout.findIndex((b) => b.blockType === 'hero')
  const hero = layout[heroIndex]
  if (!hero) throw new Error('No hero block on the home page.')

  const mosaic = [...((hero.mosaic ?? []) as { kind?: string; image?: unknown }[])]
  const photoSlots = mosaic.map((t, i) => (t.kind === 'stat' ? -1 : i)).filter((i) => i >= 0)

  console.log(`\nmosaic: ${mosaic.length} tiles, ${photoSlots.length} of them photos`)
  ASSIGNMENT.forEach((a, n) => {
    const slot = photoSlots[n]
    if (slot === undefined) return
    console.log(`  tile ${String(slot + 1).padStart(2)}  ${a ? a.file : '(left as-is — no ninth photo yet)'}`)
  })

  const missing = ASSIGNMENT.filter((a): a is NonNullable<typeof a> => !!a).filter((a) => !existsSync(path.join(DIR, a.file)))
  if (missing.length) throw new Error('Missing files:\n  ' + missing.map((m) => m.file).join('\n  '))

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  // Upload once per filename; re-running reuses the existing Media document.
  const uploaded = new Map<string, number>()
  for (const a of ASSIGNMENT) {
    if (!a) continue
    /*
     * Match the stem, not the exact filename. Payload renames on re-upload —
     * updating a doc's file turns foo.webp into foo-1.webp — so an `equals`
     * lookup misses it and this script cheerfully uploads a second copy. That
     * is how media 162/163 ended up as duplicates of the same photo.
     */
    const stem = a.file.replace(/\.webp$/, '')
    const found = await payload.find({
      collection: 'media',
      where: { filename: { like: stem } },
      limit: 1,
      sort: 'id',
      depth: 0,
    })
    if (found.docs[0]) {
      uploaded.set(a.file, found.docs[0].id as number)
      console.log(`  reuse  ${a.file}`)
      continue
    }
    const created = await payload.create({
      collection: 'media',
      filePath: path.join(DIR, a.file),
      data: { alt: a.alt } as never,
    })
    uploaded.set(a.file, created.id as number)
    console.log(`  upload ${a.file} -> media ${created.id}`)
  }

  ASSIGNMENT.forEach((a, n) => {
    const slot = photoSlots[n]
    if (slot === undefined || !a) return
    mosaic[slot] = { ...mosaic[slot], image: uploaded.get(a.file) }
  })

  layout[heroIndex] = { ...hero, mosaic } as (typeof layout)[number]
  // _status must ride along or Pages saves a draft and unpublishes the page.
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: page._status ?? 'published' } as never })

  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}".`)
  console.log(`\nApplied. Page _status ${after._status}.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
