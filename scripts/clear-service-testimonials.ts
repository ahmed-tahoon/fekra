/**
 * TL-1 follow-up: the invented testimonials (Sarah Chen, Marcus Rivera, …)
 * were cleared from the home page, but every service page owns its own copy
 * of the block. Same rule everywhere: hold the section as placeholder — clear
 * `items`, keep heading/stats, and TestimonialsSection renders nothing until
 * real profiles arrive.
 *
 *   pnpm tsx scripts/clear-service-testimonials.ts          # dry run
 *   pnpm tsx scripts/clear-service-testimonials.ts --write  # apply
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const LOCALES = ['en', 'ar', 'de', 'fr', 'es'] as const
type Block = { blockType?: string; items?: { authorName?: string }[] }

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  for (const collection of ['services', 'pages'] as const) {
    const { docs } = await payload.find({ collection, limit: 100, depth: 0, select: { slug: true } })
    for (const doc of docs) {
      for (const locale of LOCALES) {
        const full = await payload.findByID({ collection, id: doc.id, depth: 0, locale })
        const layout = [...((full.layout ?? []) as Block[])]
        const hits = layout.filter((b) => b.blockType === 'testimonials' && b.items?.length)
        if (!hits.length) continue
        console.log(`${collection}/${doc.slug} [${locale}]: ${hits.map((b) => b.items!.map((i) => i.authorName).join(', ')).join(' | ')}`)
        if (!write) continue
        for (const b of hits) b.items = []
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
