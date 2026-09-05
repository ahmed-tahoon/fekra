/*
 * Swaps a page's duplicated tail sections for references to the single copy on
 * home. About and Meet Fika each restated the FAQ, the blog teaser, the contact
 * block and the navy band verbatim — three copies of every one, so editing the
 * FAQ meant editing it three times and remembering the third.
 *
 *   pnpm tsx scripts/use-shared-sections.ts            # dry run, about + fika
 *   pnpm tsx scripts/use-shared-sections.ts --write
 *   pnpm tsx scripts/use-shared-sections.ts blog-index --write
 *
 * Edits the layout in place rather than rebuilding the page: block ids on
 * everything that stays are preserved, so the four other locales keep their
 * translations. The replaced blocks lose theirs, which is the point — that
 * copy now comes from home, already translated there.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import type { BlockProps } from '../src/components/blocks/types'
import { SHARED_SECTIONS, type SharedSectionKey } from '../src/lib/shared-sections'

/** Only sections a page can be *carrying a copy of* — home's own blocks. */
const REPLACEABLE: SharedSectionKey[] = ['faq', 'posts', 'contact', 'ctaBand', 'techStack', 'process', 'industries', 'fika', 'certifications']

const args = process.argv.slice(2)
const write = args.includes('--write')
const slugs = args.filter((a) => !a.startsWith('--'))
const pages = slugs.length ? slugs : ['about', 'fika']

const payload = await getPayload({ config })
let changed = 0

for (const slug of pages) {
  const doc = (await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0 })).docs[0]
  if (!doc) {
    console.log(`\n/${slug}: not found — skipped`)
    continue
  }

  const layout = (doc.layout ?? []) as BlockProps[]
  let hits = 0

  const next = layout.map((block) => {
    const key = REPLACEABLE.find((k) => SHARED_SECTIONS[k].match(block))
    if (!key) return block
    hits++
    console.log(`    ${block.blockType} "${block.heading ?? ''}" -> shared "${SHARED_SECTIONS[key].label}"`)
    // No id: this is a new block row replacing the old one.
    return { blockType: 'sharedSection', section: key }
  })

  console.log(`\n/${slug}: ${hits} of ${layout.length} blocks become references`)
  if (!hits || !write) continue

  await payload.update({
    collection: 'pages',
    id: doc.id,
    locale: 'en',
    data: { layout: next, _status: 'published' } as never,
  })
  changed++
  console.log(`  updated`)
}

console.log(write ? `\n  ${changed} page(s) updated.\n` : '\nDry run. Re-run with --write to apply.\n')
process.exit(0)
