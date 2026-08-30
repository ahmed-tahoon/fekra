/**
 * Copies the home page's client-logo board (the agreed 12, trimmed uploads)
 * into every other statement logoCloud block — service pages and any other
 * page carrying the section (task CL-5 follow-up: the home board was updated,
 * but each document owns its own copy of the block, per locale).
 *
 *   pnpm tsx scripts/sync-client-logos.ts          # dry run
 *   pnpm tsx scripts/sync-client-logos.ts --write  # apply
 *
 * Headings/statement copy stay each document's own; only `logos` is replaced.
 * Layout is a localized field, so every public locale is written. `_status`
 * is carried through (drafts-enabled collections unpublish without it).
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const LOCALES = ['en', 'ar', 'de', 'fr', 'es'] as const
type Block = { blockType?: string; variant?: string; logos?: { name?: string; image?: unknown }[] }

const isBoard = (b: Block) => b.blockType === 'logoCloud' && b.variant !== 'badges'

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]!
  const source = ((home.layout ?? []) as Block[]).find(isBoard)?.logos
  if (!source?.length) throw new Error('No logo board on the home page to copy from.')
  console.log(`source: ${source.length} logos — ${source.map((l) => l.name).join(', ')}\n`)

  for (const collection of ['services', 'pages'] as const) {
    const { docs } = await payload.find({ collection, limit: 100, depth: 0, select: { slug: true, _status: true } })
    for (const doc of docs) {
      if (collection === 'pages' && doc.slug === 'home') continue
      for (const locale of LOCALES) {
        const full = await payload.findByID({ collection, id: doc.id, depth: 0, locale })
        const layout = [...((full.layout ?? []) as Block[])]
        const hits = layout.filter(isBoard)
        if (!hits.length) continue
        const stale = hits.some((b) => JSON.stringify(b.logos?.map((l) => [l.name, l.image])) !== JSON.stringify(source.map((l) => [l.name, l.image])))
        console.log(`${collection}/${doc.slug} [${locale}]: ${hits.length} board(s)${stale ? '' : ' — already in sync'}`)
        if (!write || !stale) continue
        for (const b of hits) b.logos = source.map((l) => ({ name: l.name, image: l.image })) as never
        await payload.update({
          collection,
          id: doc.id,
          locale,
          data: { layout, _status: (full as { _status?: string })._status ?? 'published' } as never,
        })
      }
      if (write) {
        const after = await payload.findByID({ collection, id: doc.id, depth: 0 })
        if ((after as { _status?: string })._status === 'draft') throw new Error(`${collection}/${doc.slug} left as draft!`)
      }
    }
  }
  console.log(write ? '\nApplied.' : '\nDry run. Re-run with --write to apply.')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
