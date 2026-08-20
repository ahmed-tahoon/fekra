/**
 * Puts the header navigation into the approved Figma order (task HD-1).
 *
 *   pnpm tsx scripts/order-header-nav.ts          # dry run
 *   pnpm tsx scripts/order-header-nav.ts --write  # apply
 *
 * Approved order, read off the header in Figma `New Website 21_7_2026`:
 *
 *   Home · Services · About · Blog · careers · Contact Us · Meet Fika AI
 *
 * The CMS currently has Blog and About the other way round. "Meet Fika AI" is
 * deliberately NOT added here — /fika returns 404, and a nav item pointing at a
 * missing page is worse than a missing nav item. See HD-2.
 *
 * Only reorders items that already exist; nothing is created or deleted, and
 * anything not on the list keeps its relative position at the end.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const ORDER = ['Home', 'Services', 'About', 'Blog', 'Careers', 'Contact Us']

const key = (s: string) => s.toLowerCase().replace(/[^a-z]/g, '')

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  const items = [...((header.items ?? []) as { link?: { label?: string } }[])]

  const label = (i: (typeof items)[number]) => i.link?.label ?? ''
  const rank = (i: (typeof items)[number]) => {
    const idx = ORDER.findIndex((o) => key(o) === key(label(i)))
    // Unlisted items sort after the known ones, keeping their own order.
    return idx === -1 ? ORDER.length + items.indexOf(i) : idx
  }

  const ordered = [...items].sort((a, b) => rank(a) - rank(b))

  console.log('\ncurrent            ->  approved')
  const width = Math.max(...items.map((i) => label(i).length), 8)
  ordered.forEach((item, i) => {
    const before = label(items[i]!)
    const after = label(item)
    console.log(`  ${before.padEnd(width)}  ->  ${after}${before === after ? '' : '   (moved)'}`)
  })

  const unlisted = items.filter((i) => !ORDER.some((o) => key(o) === key(label(i))))
  if (unlisted.length) console.log('\nNot on the approved list:\n  - ' + unlisted.map(label).join('\n  - '))
  const missing = ORDER.filter((o) => !items.some((i) => key(label(i)) === key(o)))
  if (missing.length) console.log('\nApproved but not in the CMS:\n  - ' + missing.join('\n  - '))

  if (ordered.every((item, i) => item === items[i])) {
    console.log('\nAlready in the approved order — nothing to do.')
    process.exit(0)
  }
  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  await payload.updateGlobal({ slug: 'header', data: { items: ordered } as never })
  const after = await payload.findGlobal({ slug: 'header', depth: 0 })
  console.log('\nApplied: ' + ((after.items ?? []) as typeof items).map(label).join(' · '))
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
