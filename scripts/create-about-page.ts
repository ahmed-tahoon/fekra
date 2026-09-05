/**
 * Creates the About Us page at /about from Figma 93:2964 ("New website
 * 25_8_2026"), composed ENTIRELY of existing shared blocks — hero, stats,
 * cardGrid, richText, cta, and shared references to home's FAQ, blog teaser,
 * contact block and navy band — referenced rather than restated, so the pages
 * cannot drift apart.
 *
 *   pnpm tsx scripts/create-about-page.ts          # dry run
 *   pnpm tsx scripts/create-about-page.ts --write  # apply
 *
 * Copy notes: the Figma frame carried template leftovers reading "CMARIX" in
 * two headings; those render as FEKRA here, per the page's own body copy.
 * English only for now — availableLocales says so, which keeps the language
 * switcher honest until translations are approved.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const text = (value: string, bold = false) => ({
  type: 'text', text: value, format: bold ? 1 : 0, style: '', mode: 'normal', detail: 0, version: 1,
})
const p = (value: string, bold = false) => ({
  type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr' as const, children: [text(value, bold)],
})
const h = (tag: 'h2' | 'h3', value: string) => ({
  type: 'heading', tag, format: '', indent: 0, version: 1, direction: 'ltr' as const, children: [text(value)],
})
const ul = (items: string[]) => ({
  type: 'list', listType: 'bullet', tag: 'ul', start: 1, format: '', indent: 0, version: 1, direction: 'ltr' as const,
  children: items.map((item, i) => ({
    type: 'listitem', value: i + 1, format: '', indent: 0, version: 1, direction: 'ltr' as const, children: [text(item)],
  })),
})
const doc = (children: unknown[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr' as const, children },
})

const CERTS: { stem: string; title: string; subtitle: string; body: string; note: string }[] = [
  {
    stem: 'cert-iso-27001',
    title: 'ISO 27001 Certified',
    subtitle: 'Information Security You Can Trust.',
    body: 'FEKRA follows internationally recognized information security management practices to help protect sensitive data, control access, and maintain secure delivery environments across client engagements.',
    note: 'What It Means for You: A more secure delivery process, stronger information handling practices, and better alignment with enterprise security expectations.',
  },
  {
    stem: 'cert-soc2',
    title: 'SOC 2 Type II',
    subtitle: 'Operational Controls Built for Trust.',
    body: 'SOC 2 Type II demonstrates that FEKRA maintains effective controls related to security, availability, and confidentiality over time — not just in theory, but in actual operational practice.',
    note: 'What It Means for You: Greater confidence in how your data, systems, and workflows are managed throughout the engagement.',
  },
  {
    stem: 'cert-iso-9001',
    title: 'ISO 9001 Certified',
    subtitle: 'Consistent Process. Measurable Quality.',
    body: "ISO 9001 reflects FEKRA's commitment to structured quality management, continuous improvement, and well-defined delivery processes that support reliable project execution.",
    note: 'What It Means for You: More consistent delivery, clearer processes, and stronger quality control across every stage of the engagement.',
  },
  {
    stem: 'cert-gdpr',
    title: 'GDPR Compliant',
    subtitle: 'Privacy-Aware Delivery Practices.',
    body: 'FEKRA aligns its delivery approach with GDPR principles to support responsible data handling, privacy awareness, and better protection of personal information when projects involve sensitive data.',
    note: 'What It Means for You: Improved confidence that privacy and data protection considerations are built into the way we work.',
  },
  {
    stem: 'cert-istqb',
    title: 'ISTQB Platinum Partner',
    subtitle: 'Recognized Commitment to Software Quality.',
    body: 'As an ISTQB Platinum Partner, FEKRA demonstrates a strong commitment to quality assurance, software testing excellence, and continuous capability development in QA practices.',
    note: 'What It Means for You: Access to stronger QA standards, better testing discipline, and more confidence in product quality and release readiness.',
  },
]

const ICON_DIR = '/private/tmp/claude-501/-Users-ahmed-tahon-Fekra-2/b11e4223-3a78-4d0d-9baf-9d4646fee0e6/scratchpad/about-icons'
/** Figma exports supplied by FEKRA (26 Aug): pill badges + stat-card glyphs. */
const ICONS = [
  'about-pill-iso',
  'about-pill-nda',
  'about-pill-response',
  'about-stat-talents',
  'about-stat-years',
  'about-stat-projects',
  'about-stat-companies',
] as const

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const iconId: Record<string, number> = {}
  for (const stem of ICONS) {
    const found = await payload.find({ collection: 'media', where: { filename: { like: stem } }, limit: 1, sort: 'id', depth: 0 })
    let id = found.docs[0]?.id as number | undefined
    if (!id) {
      const created = await payload.create({
        collection: 'media',
        filePath: `${ICON_DIR}/${stem}.svg`,
        data: { alt: '', decorative: true } as never,
      })
      id = created.id as number
      console.log(`  uploaded ${stem} -> media ${id}`)
    }
    iconId[stem] = id
  }

  // Cert badge uploads already in the library (home's badges row uses them).
  const certCards = []
  for (const cert of CERTS) {
    const media = (await payload.find({ collection: 'media', where: { filename: { like: cert.stem } }, limit: 1, sort: 'id', depth: 0 })).docs[0]
    if (!media) throw new Error(`No media for ${cert.stem}`)
    certCards.push({ icon: media.id, title: cert.title, subtitle: cert.subtitle, body: cert.body, note: cert.note })
  }

  const layout = [
    {
      blockType: 'hero',
      heading: 'Meet FEKRA: Your Trusted Technology & Outsourcing Partner',
      // Renders as the gradient SUBHEAD line under the headline (comp 93:2966).
      headingAccent: 'Scaling Businesses with Top Tech Talent & Reliable Software Solutions',
      body:
        'Since 2017, FEKRA has been helping companies scale with carefully vetted software engineers, dedicated teams, and end-to-end technology solutions. We combine technical expertise, structured evaluation, and a transparent delivery process to help our clients grow with confidence.\n\nOur commitment to quality and security is backed by ISO 9001, ISO 27001, SOC 2 Type II, GDPR compliance, and our recognition as an ISTQB Platinum Partner.\n\nToday, FEKRA supports **50+ companies across 12 countries, with 100+ top tech talents, 80+ delivered projects, and expertise across 20+ technologies.**',
      bullets: [
        { text: 'ISO 27001 Certified', icon: iconId['about-pill-iso'] },
        { text: 'NDA on First Call', icon: iconId['about-pill-nda'] },
        { text: '24hr Response', icon: iconId['about-pill-response'] },
      ],
      ctas: [{ variant: 'primary', link: { type: 'route', route: '/meeting', label: 'Schedule a Call' } }],
    },
    {
      blockType: 'stats',
      heading: 'The Foundation Behind Every Successful Partnership',
      items: [
        { value: '100+', label: 'Top Tech Talents', icon: iconId['about-stat-talents'] },
        { value: '8+', label: 'Years of Experience', icon: iconId['about-stat-years'] },
        { value: '80+', label: 'Delivered Projects', icon: iconId['about-stat-projects'] },
        { value: '50+', label: 'Trusted Companies', icon: iconId['about-stat-companies'] },
      ],
    },
    {
      blockType: 'cardGrid',
      variant: 'compliance',
      heading: 'Certifications, Compliance & Quality Standards',
      body: "The certifications, compliance standards, and recognitions that reinforce FEKRA's commitment to quality, security, and trust.",
      columns: '3',
      cards: certCards,
    },
    {
      blockType: 'richText',
      width: 'panel',
      content: doc([
        h('h2', 'Who We Are'),
        p('Built in Egypt. Trusted by Global Businesses.', true),
        p(
          'FEKRA is a technology outsourcing and software engineering partner helping businesses build, scale, and strengthen their technology teams. Since 2017, we have supported startups, SMEs, and enterprises with carefully vetted tech talent, dedicated teams, and end-to-end software solutions.',
        ),
        p(
          'Our capabilities span web and mobile development, backend engineering, cloud & DevOps, QA & testing, UI/UX, Data & AI, and custom software development. We combine structured technical evaluation, transparent communication, and flexible engagement models to connect every client with the right expertise for their business needs.',
        ),
        p(
          "We work as an extension of our clients' teams — not simply as a staffing provider. From talent selection and technical assessment to onboarding, delivery follow-up, and quality management, our model is designed to reduce hiring risk, accelerate execution, and build long-term partnerships.",
        ),
        p(
          'Today, FEKRA supports 50+ companies across 12 countries, backed by 100+ tech talents, 80+ delivered projects, and expertise across 20+ technologies. Our commitment to quality, security, and trusted delivery is reinforced by internationally recognized standards and partnerships.',
        ),
        h('h3', 'What You Can Expect from FEKRA'),
        ul([
          'Dedicated Tech Teams',
          'End-to-End Software Delivery',
          'Flexible Engagement Models',
          'Quality & Security Standards',
          'Carefully Vetted Talent',
          'Transparent Long-Term Partnerships',
        ]),
      ]),
    },
    {
      blockType: 'cta',
      tone: 'brand',
      heading: 'Ready to Scale Your Technology Team?',
      body: 'From carefully vetted tech talent to dedicated engineering teams, FEKRA helps you move faster with the right expertise.',
      ctas: [{ variant: 'secondary', link: { type: 'route', route: '/meeting', label: 'Book a 30-Minute Call' } }],
    },
    // Home owns these four; About just points at them.
    { blockType: 'sharedSection', section: 'faq' },
    { blockType: 'sharedSection', section: 'posts' },
    { blockType: 'sharedSection', section: 'contact' },
    { blockType: 'sharedSection', section: 'ctaBand' },
  ]

  console.log('About page blocks:')
  for (const b of layout as { blockType?: string; heading?: string }[]) console.log(`  - ${b.blockType}  ${b.heading ?? ''}`)

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  const data = {
    title: 'About Us',
    layout,
    availableLocales: ['en'],
    meta: {
      title: 'About Us | FEKRA',
      description:
        'FEKRA is a technology outsourcing and software engineering partner — vetted tech talent, dedicated teams, and end-to-end delivery, backed by ISO 9001, ISO 27001, SOC 2 Type II, GDPR compliance and ISTQB Platinum partnership.',
    },
    _status: 'published',
  }

  const existing = (await payload.find({ collection: 'pages', where: { slug: { equals: 'about' } }, limit: 1, depth: 0 })).docs[0]
  const page = existing
    ? await payload.update({ collection: 'pages', id: existing.id, data: data as never })
    : await payload.create({ collection: 'pages', data: { ...data, slug: 'about' } as never })

  const check = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (check._status !== 'published') throw new Error(`Page left as "${check._status}".`)
  console.log(`\nPage id ${page.id} at /about, _status ${check._status}.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
