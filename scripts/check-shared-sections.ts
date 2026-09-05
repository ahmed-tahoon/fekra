/*
 * Every entry in SHARED_SECTIONS must match exactly one block on the home
 * page. Zero matches means pages referencing it render nothing; more than one
 * means the reference silently picks whichever comes first. Both fail as a
 * section quietly missing from a page, which nobody notices until a client does.
 *
 *   pnpm check:shared-sections
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { BlockProps } from '../src/components/blocks/types'
import { SHARED_SECTIONS } from '../src/lib/shared-sections'

const payload = await getPayload({ config })
const home = (
  await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })
).docs[0]

if (!home) {
  console.error('\n  No home page — shared sections have no source.\n')
  process.exit(1)
}

const layout = (home.layout ?? []) as BlockProps[]
let failed = 0

console.log()
for (const [key, { label, match }] of Object.entries(SHARED_SECTIONS)) {
  const hits = layout.filter(match)
  if (hits.length === 1) {
    console.log(`  ok    ${key.padEnd(15)} ${label}`)
  } else {
    failed++
    console.log(`  FAIL  ${key.padEnd(15)} ${label} — ${hits.length} matching blocks on home, expected 1`)
  }
}

console.log(failed ? `\n  ${failed} unresolvable section(s).\n` : '\n  All shared sections resolve.\n')
process.exit(failed ? 1 : 0)
