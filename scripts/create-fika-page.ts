/**
 * Creates the "Meet Fika AI" page at /fika and adds it to the header nav
 * (tasks HD-2 and, as a side effect, 1.9 / 13.1–13.4).
 *
 *   pnpm tsx scripts/create-fika-page.ts          # dry run
 *   pnpm tsx scripts/create-fika-page.ts --write  # apply
 *
 * Why a CMS page rather than a coded route: /[slug] already renders CMS pages,
 * so Fika gets a real URL now and can be swapped for a coded route later
 * WITHOUT the URL changing (13.4). Every word below is editable in /admin.
 *
 * The copy deliberately does not claim a live AI backend — there isn't one; the
 * "Talk to Fika" widget links to booking. Overclaiming here is exactly what
 * 13.2 rules out. This is a first draft for FEKRA to approve and edit.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const text = (value: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [{ type: 'text', text: value, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})

const doc = (paragraphs: string[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr' as const, children: paragraphs.map(text) },
})

const layout = [
  {
    blockType: 'hero',
    eyebrow: 'Meet Fika',
    heading: 'Your first conversation',
    headingAccent: 'starts with Fika',
    body: 'Fika is how FEKRA says hello. Tell us what you are building and what your team is missing, and Fika points you at the right service, the right role, or a call with a human who can answer properly.',
    trustLine: 'A calmer way to start',
    bullets: [
      { text: 'Ask what you actually need' },
      { text: 'Get pointed to the right team' },
      { text: 'Talk to a person when it matters' },
    ],
    ctas: [{ variant: 'primary', link: { type: 'route', route: '/meeting', label: 'Book a 30-min call' } }],
  },
  {
    blockType: 'cardGrid',
    eyebrow: 'What Fika helps with',
    heading: 'Three things, done well',
    columns: '3',
    cards: [
      {
        title: 'Scope the role',
        body: 'Describe the gap in your team and Fika helps turn it into a role: the stack, the seniority, the engagement model that fits.',
      },
      {
        title: 'Find the service',
        body: 'Not sure whether you need a dedicated team, a staff-augmentation contract or a full build? Fika narrows it down before you spend an hour on a call.',
      },
      {
        title: 'Reach a human',
        body: 'When the question needs a real answer, Fika hands you straight to the team — no forms, no queue, no chatbot loop.',
      },
    ],
  },
  {
    blockType: 'faq',
    eyebrow: 'Straight answers',
    heading: 'What Fika is, and is not',
    emitSchema: true,
    items: [
      {
        question: 'Is Fika an AI chatbot?',
        answer: doc([
          'Not today. Fika is how we introduce FEKRA and guide you to the right next step. We would rather tell you that plainly than dress a contact form up as artificial intelligence.',
        ]),
      },
      {
        question: 'What happens when I start a conversation?',
        answer: doc([
          'You are pointed to the service, role or page that matches what you described, and offered a 30-minute call with the team when a person is the faster answer.',
        ]),
      },
      {
        question: 'Will Fika get smarter?',
        answer: doc([
          'That is the plan. The page and the route are built so richer functionality can be added later without the address or the experience changing underneath you.',
        ]),
      },
      {
        question: 'Do I have to use Fika to contact FEKRA?',
        answer: doc([
          'No. The contact page and the booking link are always available, and they reach exactly the same team.',
        ]),
      },
    ],
  },
  {
    blockType: 'cta',
    heading: 'Ready when you are',
    body: 'Book a 30-minute call and tell us what you are building.',
    tone: 'brand',
    ctas: [{ variant: 'primary', link: { type: 'route', route: '/meeting', label: 'Book a 30-min call' } }],
  },
]

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'pages', where: { slug: { equals: 'fika' } }, limit: 1, depth: 0 })
  const header = await payload.findGlobal({ slug: 'header', depth: 0 })
  const items = [...((header.items ?? []) as { link?: { label?: string } }[])]
  const hasNav = items.some((i) => /fika/i.test(i.link?.label ?? ''))

  console.log(`\n/fika page:  ${existing.docs[0] ? 'exists (id ' + existing.docs[0].id + ') — will update' : 'missing — will create'}`)
  console.log(`nav item:    ${hasNav ? 'already present' : 'missing — will append "Meet Fika AI"'}`)
  console.log(`blocks:      ${layout.map((b) => b.blockType).join(' · ')}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  const data = {
    title: 'Meet Fika AI',
    layout,
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
