/**
 * Rebuilds the "Meet Fika AI" page at /fika from the FEKRA comp (screenshot
 * supplied 29 Aug): a split hero with the Fika illustration, six numbered
 * "journey" steps, and a closing panel pairing the illustration with the
 * support copy.
 *
 *   pnpm tsx scripts/create-fika-page.ts          # dry run
 *   pnpm tsx scripts/create-fika-page.ts --write  # apply
 *
 * Why a CMS page rather than a coded route: /[slug] already renders CMS pages,
 * so Fika keeps a real URL and every word below stays editable in /admin.
 *
 * The illustration is uploaded once and reused by both blocks; re-runs find
 * the existing upload by filename rather than creating duplicates.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const AVATAR = { stem: 'fika-avatar', path: 'public/images/fika/fika-avatar.webp' }

/** Row ids from the home page must not travel into this document. */
const stripIds = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripIds)
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) if (k !== 'id') out[k] = stripIds(v)
    return out
  }
  return value
}

const STEPS = [
  ['1. Understand Your Needs Faster', 'Fika helps clarify your technology, talent, and project requirements from the start.'],
  ['2. Define the Right Tech Roles', 'Get guidance on the skills, seniority, and expertise your team actually needs.'],
  ['3. Find the Right Engagement Model', 'Explore whether dedicated teams, team extension, or project-based delivery fits you best.'],
  ["4. Navigate FEKRA's Expertise", 'Quickly discover the services, technologies, and capabilities relevant to your needs.'],
  ['5. Reduce Unnecessary Back-and-Forth', 'Share your requirements once and reach the right FEKRA team with better context.'],
  ['6. Connect with Human Experts', "Move seamlessly from AI assistance to FEKRA's technology and talent specialists."],
] as const

const layout = (avatarId: number, bandBlock: Record<string, unknown>) => [
  {
    blockType: 'hero',
    heading: 'Build & Scale Your Tech Team Faster with',
    headingAccent: '\u201cFika AI\u201d',
    body:
      "Fika is FEKRA's AI-powered technology and talent assistant, helping you understand your needs, define the right roles, explore the best engagement model, and connect with the right tech expertise \u2014 faster and with less complexity.",
    media: avatarId,
  },
  {
    blockType: 'cardGrid',
    variant: 'numbered',
    heading: 'How Fika Makes Your Journey Smarter',
    columns: '2',
    cards: STEPS.map(([title, body]) => ({ title, body })),
  },
  {
    blockType: 'cta',
    tone: 'panel',
    heading: 'Smarter Support at Every Step',
    media: avatarId,
    body:
      'Fika is your AI-powered technology and talent assistant, designed to support you throughout your journey with FEKRA \u2014 from understanding your needs to finding the right expertise and engagement model.\n' +
      "It combines the speed and intelligence of AI with FEKRA's human expertise, helping you make clearer decisions, reduce unnecessary back-and-forth, and move forward with greater confidence.",
  },
  // The page closes on the same three shared blocks as home and About.
  {
    blockType: 'postsTeaser',
    eyebrow: 'Latest blogs',
    heading: 'Our Recent Blogs',
    limit: 3,
    ctas: [{ variant: 'secondary', link: { type: 'route', route: '/blog', label: 'View all blogs' } }],
  },
  {
    blockType: 'contact',
    eyebrow: "Let's Talk Business!",
    heading: 'Contact us',
    showOffices: true,
    showForm: true,
  },
  bandBlock,
]

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  // Upload the illustration once; re-runs reuse it rather than duplicating.
  const found = await payload.find({
    collection: 'media',
    where: { filename: { like: AVATAR.stem } },
    limit: 1,
    sort: 'id',
    depth: 0,
  })
  let avatarId = found.docs[0]?.id as number | undefined
  if (!avatarId && write) {
    const created = await payload.create({
      collection: 'media',
      filePath: AVATAR.path,
      data: { alt: 'Fika, the FEKRA AI assistant' } as never,
    })
    avatarId = created.id as number
    console.log(`  uploaded ${AVATAR.stem} -> media ${avatarId}`)
  }

  // The navy pre-footer band is copied verbatim from home rather than
  // restated here, so editing it once updates every page that ends on it.
  const home = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  const homeLayout = (home?.layout ?? []) as { blockType?: string; tone?: string }[]
  const bandBlock = stripIds(homeLayout.find((x) => x.blockType === 'cta' && x.tone === 'band')) as
    | Record<string, unknown>
    | undefined
  if (!bandBlock) throw new Error('Home page is missing the navy band cta block.')

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'fika' } }, limit: 1, depth: 0 })
  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  const items = [...((header.items ?? []) as { link?: { label?: string } }[])]
  const hasNav = items.some((i) => /fika/i.test(i.link?.label ?? ''))

  console.log(`\n/fika page:  ${existing.docs[0] ? 'exists (id ' + existing.docs[0].id + ') — will update' : 'missing — will create'}`)
  console.log(`nav item:    ${hasNav ? 'already present' : 'missing — will append "Meet Fika AI"'}`)
  console.log(`avatar:      ${avatarId ? 'media ' + avatarId : 'will upload on --write'}`)
  console.log(`blocks:      ${layout(avatarId ?? 0, bandBlock).map((b) => b.blockType).join(' · ')}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  const data = {
    title: 'Meet Fika AI',
    layout: layout(avatarId!, bandBlock),
    availableLocales: ['en'],
    _status: 'published',
    meta: {
      title: 'Meet Fika AI | FEKRA',
      description: 'Fika is how FEKRA says hello — tell us what you are building and get pointed to the right team.',
    },
  }

  const page = existing.docs[0]
    ? await payload.update({ collection: 'pages', id: existing.docs[0].id, data: data as never })
    : await payload.create({ collection: 'pages', data: { ...data, slug: 'fika' } as never })

  if (!hasNav) {
    items.push({
      link: { type: 'internal', label: 'Meet Fika AI', reference: { relationTo: 'pages', value: page.id } },
      children: [],
    } as never)
    await payload.updateGlobal({ slug: 'header', data: { items } as never })
  }

  const check = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (check._status !== 'published') throw new Error(`Page left as "${check._status}".`)

  const after = await payload.findGlobal({ slug: 'header', depth: 0 })
  console.log(`\nPage id ${page.id}, _status ${check._status}`)
  console.log('Nav: ' + ((after.items ?? []) as typeof items).map((i) => i.link?.label).join(' · '))
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
