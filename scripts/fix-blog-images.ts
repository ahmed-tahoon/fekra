/**
 * Repoints every blog post's hero image at the tech stills already in the
 * media library, and gives each one honest alt text.
 *
 *   pnpm tsx scripts/fix-blog-images.ts          # dry run
 *   pnpm tsx scripts/fix-blog-images.ts --write  # apply
 *
 * The posts pointed at media named code/desk/team/meeting/office, but those
 * uploads hold random stock — open water, succulents, a storm front — so the
 * teaser rendered landscapes beside engineering headlines. public/images/
 * samples holds the same wrong pictures under the same names, so re-uploading
 * from there fixes nothing.
 *
 * These tiles are the home-page collage assets (already uploaded, ids 61-69),
 * reused rather than duplicated. Their alt was a single generic line —
 * "FEKRA engineers at work" — on every tile including a circuit board and a
 * robot, so each one is rewritten to describe what it actually shows. That
 * alt is shared with the collage, where it is equally an improvement.
 *
 * ponytail: the tiles are 300-645px wide and the post-detail hero renders at
 * 50vw, so they upscale there. Swap in higher-resolution art when FEKRA
 * supplies it; the teaser cards are close enough to native size to hold up.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

/** slug -> [media filename stem, alt describing the actual picture] */
const PICKS: Record<string, [string, string]> = {
  'how-we-vet-the-top-3-percent': ['tile-02', 'A laptop open on a bright, uncluttered desk'],
  'building-qa-culture-that-ships': ['tile-04', 'A backlit laptop keyboard glowing in a dark room'],
  'nearshore-vs-offshore': ['tile-06', 'An abstract mesh of connected points fading into the distance'],
  'scaling-engineering-teams-with-ai': ['tile-07', 'A circuit board with a processor chip marked AI'],
  'software-outsourcing-in-2026': ['tile-08', 'A white humanoid service robot beside a screen'],
}

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const posts = await payload.find({ collection: 'posts', limit: 100, depth: 0 })
  const rows: { slug: string; from: string; to: string; alt: string }[] = []

  for (const post of posts.docs as { id: number; slug?: string; heroImage?: number }[]) {
    const pick = post.slug ? PICKS[post.slug] : undefined
    if (!pick) continue
    const [stem, alt] = pick

    const media = (
      await payload.find({
        collection: 'media',
        where: { filename: { like: stem } },
        limit: 1,
        sort: 'id',
        depth: 0,
      })
    ).docs[0] as { id: number; filename?: string } | undefined
    if (!media) {
      console.log(`  ! no media matching "${stem}" — skipped ${post.slug}`)
      continue
    }

    const current = post.heroImage
      ? await payload.findByID({ collection: 'media', id: post.heroImage, depth: 0 }).catch(() => null)
      : null

    rows.push({
      slug: post.slug!,
      from: (current as { filename?: string } | null)?.filename ?? '(none)',
      to: media.filename ?? stem,
      alt,
    })

    if (write) {
      // The collage left every tile on one generic line; say what each shows.
      await payload.update({ collection: 'media', id: media.id, data: { alt } as never })
      await payload.update({ collection: 'posts', id: post.id, data: { heroImage: media.id } as never })
    }
  }

  console.log('\nBlog hero images:')
  for (const row of rows) console.log(`  ${row.slug.padEnd(34)} ${row.from.padEnd(16)} -> ${row.to}`)
  console.log('\nAlt text:')
  for (const row of rows) console.log(`  ${row.to.padEnd(14)} ${row.alt}`)

  const missed = Object.keys(PICKS).filter((slug) => !rows.some((row) => row.slug === slug))
  if (missed.length) console.log(`\nNo post found for: ${missed.join(', ')}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }
  console.log(`\nUpdated ${rows.length} post(s).`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
