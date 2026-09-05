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

const STEPS = [
  ['1. Understand Your Needs Faster', 'Fika helps clarify your technology, talent, and project requirements from the start.'],
  ['2. Define the Right Tech Roles', 'Get guidance on the skills, seniority, and expertise your team actually needs.'],
  ['3. Find the Right Engagement Model', 'Explore whether dedicated teams, team extension, or project-based delivery fits you best.'],
  ["4. Navigate FEKRA's Expertise", 'Quickly discover the services, technologies, and capabilities relevant to your needs.'],
  ['5. Reduce Unnecessary Back-and-Forth', 'Share your requirements once and reach the right FEKRA team with better context.'],
  ['6. Connect with Human Experts', "Move seamlessly from AI assistance to FEKRA's technology and talent specialists."],
] as const

const layout = (avatarId: number) => [
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
  // The page closes on home's own blog teaser, contact block and navy band —
  // referenced, not restated, so the three cannot drift apart.
  { blockType: 'sharedSection', section: 'posts' },
  { blockType: 'sharedSection', section: 'contact' },
  { blockType: 'sharedSection', section: 'ctaBand' },
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

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'fika' } }, limit: 1, depth: 0 })
  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  const items = [...((header.items ?? []) as { link?: { label?: string } }[])]
  const hasNav = items.some((i) => /fika/i.test(i.link?.label ?? ''))

  console.log(`\n/fika page:  ${existing.docs[0] ? 'exists (id ' + existing.docs[0].id + ') — will update' : 'missing — will create'}`)
  console.log(`nav item:    ${hasNav ? 'already present' : 'missing — will append "Meet Fika AI"'}`)
  console.log(`avatar:      ${avatarId ? 'media ' + avatarId : 'will upload on --write'}`)
  console.log(`blocks:      ${layout(avatarId ?? 0).map((b) => b.blockType).join(' · ')}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  const data = {
    title: 'Meet Fika AI',
    layout: layout(avatarId!),
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
