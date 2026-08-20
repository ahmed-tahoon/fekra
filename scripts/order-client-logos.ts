/**
 * Puts the client-logo board into the agreed priority order (task CL-5).
 *
 *   pnpm tsx scripts/order-client-logos.ts          # dry run, prints the plan
 *   pnpm tsx scripts/order-client-logos.ts --write  # applies it
 *
 * Reorders the existing logos, drops anything not on the agreed list, and
 * reports the ones with no media asset yet so they can be chased. Only the
 * logoCloud block's `logos` array is touched — no other field, block or page.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

/** The client's agreed priority order. */
const ORDER = [
  'ADNOC',
  'NEOM',
  'Ooredoo',
  'Al Rajhi Bank',
  'STC',
  'Kuwait Finance House',
  'Allianz',
  'QNB',
  'Pitman',
  'Codewave',
  'Datafusion',
  'Smart Management Systems',
]

/** Loose match: CMS names carry suffixes ("Pitman Training", "stc"). */
const key = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')
const matches = (cmsName: string, wanted: string) => {
  const a = key(cmsName)
  const b = key(wanted)
  return a.startsWith(b) || b.startsWith(a) || a.includes(b) || b.includes(a)
}

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const { docs } = await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })
  const home = docs[0]
  if (!home) throw new Error('No page with slug "home".')

  const layout = (home.layout ?? []) as { blockType?: string; variant?: string; logos?: { name: string }[] }[]
  const index = layout.findIndex((b) => b.blockType === 'logoCloud' && b.variant !== 'badges')
  const block = layout[index]
  if (!block) throw new Error('No statement-variant logoCloud block on the home page.')

  const current = block.logos ?? []
  const ordered: typeof current = []
  const missing: string[] = []

  for (const wanted of ORDER) {
    const hit = current.find((l) => matches(l.name, wanted))
    if (hit) ordered.push(hit)
    else missing.push(wanted)
  }
  const dropped = current.filter((l) => !ordered.includes(l))

  console.log('\nPlanned order:')
  ordered.forEach((l, i) => console.log(`  ${String(i + 1).padStart(2)}. ${l.name}`))
  if (missing.length) console.log('\nNo media asset yet (chase these):\n  - ' + missing.join('\n  - '))
  if (dropped.length) console.log('\nNot on the agreed list, will be removed:\n  - ' + dropped.map((l) => l.name).join('\n  - '))

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  layout[index] = { ...block, logos: ordered }
  /*
   * `_status` MUST be carried through. Pages has drafts enabled, so an update
   * that omits it saves a draft and silently UNPUBLISHES the page — the public
   * /cms-api starts 404ing while the live site keeps serving a stale static
   * copy, so nothing looks wrong until the next revalidation. Learned the hard
   * way on 20 Aug 2026.
   */
  await payload.update({
    collection: 'pages',
    id: home.id,
    data: { layout, _status: home._status ?? 'published' } as never,
  })

  const after = await payload.findByID({ collection: 'pages', id: home.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}" — republish it in /admin.`)
  console.log(`\nApplied — ${ordered.length} logos in agreed order, page still published.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
