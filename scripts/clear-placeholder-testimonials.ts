/**
 * Removes the invented testimonials from the live site (task TL-1).
 *
 *   pnpm tsx scripts/clear-placeholder-testimonials.ts          # dry run
 *   pnpm tsx scripts/clear-placeholder-testimonials.ts --write  # apply
 *
 * The home page was publishing five testimonials attributed to named people
 * with job titles and employers — Sarah Chen, CTO at FinFlow; Marcus Rivera,
 * VP Product at HealthSync; and three more — none of whom exist. Two stock
 * avatars were recycled across the five, so one face carried three identities.
 *
 * That is not neutral placeholder copy. Lorem ipsum announces itself; an
 * invented endorsement from a named executive at a named company reads as a
 * real reference to anyone evaluating FEKRA. The client's own instruction is to
 * hold this section and NOT ship permanent dummy content, so the items go and
 * the block stays.
 *
 * Only `items` is cleared. The eyebrow, heading and stats stay, so the section
 * returns the moment the ten real profiles are loaded — TestimonialsSection
 * renders null while items is empty.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No home page.')

  const layout = [...((page.layout ?? []) as { blockType?: string; items?: unknown[]; heading?: string }[])]
  const index = layout.findIndex((b) => b.blockType === 'testimonials')
  const block = layout[index]
  if (!block) throw new Error('No testimonials block.')

  const items = (block.items ?? []) as { authorName?: string; authorRole?: string }[]
  console.log(`\ntestimonials block: "${block.heading ?? ''}"`)
  console.log(`${items.length} invented attributions to remove:`)
  for (const t of items) console.log(`  - ${t.authorName ?? '?'} — ${t.authorRole ?? '?'}`)
  console.log('\nHeading, eyebrow and stats are kept; only `items` is cleared.')

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  block.items = []
  layout[index] = block as (typeof layout)[number]
  // _status must ride along or Pages saves a draft and unpublishes the page.
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: page._status ?? 'published' } as never })

  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}".`)
  console.log(`\nCleared. Page _status ${after._status}. The section renders nothing until real profiles arrive.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
