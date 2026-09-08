/**
 * Loads the client quotes into the home page testimonials block (TL-1).
 *
 *   pnpm tsx scripts/seed-testimonials.ts          # dry run
 *   pnpm tsx scripts/seed-testimonials.ts --write  # apply
 *
 * Attribution is deliberately anonymous: role and country, no personal name and
 * no portrait. The source cards carried invented names over AI-generated faces,
 * which is the exact pattern clear-placeholder-testimonials.ts removed — a named
 * executive with a photo reads as a real, checkable endorsement. Role + country
 * makes the same point without asserting that a specific person said it.
 *
 * The block's `authorName` slot therefore holds the ROLE (it is the emphasised
 * line in the card) and `authorRole` holds the country. No schema change, and
 * the card keeps the comp's two-line caption.
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

type Row = { name: string; role: string; country: string; quote: string }

const rows: Row[] = JSON.parse(
  readFileSync(path.resolve(process.cwd(), 'scripts/testimonials.json'), 'utf8'),
)

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const page = (
    await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0, locale: 'en' })
  ).docs[0]
  if (!page) throw new Error('No home page.')

  const layout = [...((page.layout ?? []) as unknown as Record<string, unknown>[])]
  const index = layout.findIndex((b) => b.blockType === 'testimonials')
  const block = layout[index]
  if (!block) throw new Error('No testimonials block on the home page.')

  const items = rows.map((r) => ({
    quote: r.quote,
    authorName: r.role,
    authorRole: r.country,
  }))

  console.log(`\ntestimonials block: "${block.heading ?? ''}"`)
  console.log(`${(block.items as unknown[] | undefined)?.length ?? 0} items now -> ${items.length} after`)
  for (const i of items) console.log(`   ${i.authorName} · ${i.authorRole} — "${i.quote.slice(0, 58)}…"`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  layout[index] = { ...block, items }
  await payload.update({ collection: 'pages', id: page.id, locale: 'en', data: { layout } as never })

  const check = (
    await payload.findByID({ collection: 'pages', id: page.id, depth: 0, locale: 'en' })
  ).layout as unknown as Record<string, unknown>[]
  const saved = (check.find((b) => b.blockType === 'testimonials')?.items as unknown[]) ?? []
  if (saved.length !== items.length) throw new Error(`Saved ${saved.length}, expected ${items.length}`)
  console.log(`\n${saved.length} testimonials live on /.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
