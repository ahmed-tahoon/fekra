/**
 * Swaps the home hero mosaic over to the real team photos (tasks IM-1/2/3/5).
 *
 *   pnpm tsx scripts/replace-mosaic-photos.ts          # dry run
 *   pnpm tsx scripts/replace-mosaic-photos.ts --write  # apply
 *
 * Uploads public/images/team/*.webp into Media, then points each photo tile of
 * the hero mosaic at one of them. Stat tiles are never touched.
 *
 * Photos are matched to slots by ORIENTATION. Each mosaic slot has a fixed
 * aspect (MOSAIC_LAYOUT x the 1408:456 board), and dropping a portrait photo
 * into a 2:1 slot crops the subject's head off. The three portrait slots get
 * the three portrait photos; the wide slots get the wide ones.
 *
 * Orientation alone is not always enough. object-cover crops from the CENTRE,
 * so a subject sitting off to one side gets sliced even when the aspect is
 * close: the 1.48-wide desk portrait lost 32% of its frame in the 1.01 slot and
 * cut the person in half. That one was re-cropped square with sharp's
 * saliency-aware `position: 'attention'` before upload, which brings the loss
 * to 1%. Check any photo whose subject is not central.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const DIR = path.resolve(process.cwd(), 'public/images/team')

/**
 * Photo tiles in mosaic order, with the alt text that ships with them.
 * `null` would leave a tile untouched; all nine now have a photo. The ninth
 * slot previously kept `tile-07.webp`, an AI circuit-board stock image — the
 * exact abstract visual IM-1 asked to remove.
 */
const ASSIGNMENT: ({ file: string; alt: string } | null)[] = [
  { file: 'developer-workspace-side.webp', alt: 'A FEKRA engineer at work in the Cairo office' },
  { file: 'developer-desk-bright.webp', alt: 'A FEKRA developer at a dual-monitor desk' },
  { file: 'team-standup-review.webp', alt: 'FEKRA engineers reviewing work at a standing desk' },
  { file: 'team-focus-coworking.webp', alt: 'A FEKRA engineer focused at her laptop' },
  { file: 'developer-coding-window.webp', alt: 'A FEKRA developer writing code by the window' },
  { file: 'team-pairing-session.webp', alt: 'Three FEKRA colleagues pairing over a laptop' },
  { file: 'team-planning-session.webp', alt: 'A FEKRA team planning a project together around a laptop' },
  { file: 'developer-desk-portrait.webp', alt: 'A FEKRA engineer at his desk in the Cairo office' },
  { file: 'team-review-huddle.webp', alt: 'A FEKRA team reviewing work together at a screen' },
]

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
