import { existsSync } from 'node:fs'
import { join } from 'node:path'

import { getPayload } from 'payload'
import config from '../payload.config'

/**
 * Seeds a working English site that matches the approved Figma Home layout, so
 * a fresh environment renders something real instead of an empty shell.
 *
 * Idempotent: re-running updates the same documents by slug. Content is English
 * only — the other four locales are entered by FEKRA through the CMS (14.12).
 *
 *   pnpm seed
 */
const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? 'admin@fekra-egy.com'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'

/**
 * Sample articles and the example job exist to make a fresh local environment
 * look like a real site. Set SEED_DEMO_CONTENT=false when seeding a real
 * database so the blog starts empty instead of shipping placeholder posts.
 */
const WITH_DEMO_CONTENT = process.env.SEED_DEMO_CONTENT !== 'false'

/** A connection that is not on this machine is treated as real data. */
const isRemoteDatabase = (): boolean => {
  const url = process.env.DATABASE_URL ?? ''
  return Boolean(url) && !/@(localhost|127\.0\.0\.1|::1|db|host\.docker\.internal)[:/]/.test(url)
}

const textNode = (text: string) => ({
  type: 'text',
  text,
  format: 0,
  detail: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const block = (type: 'paragraph' | 'heading', text: string, tag?: 'h2' | 'h3') => ({
  type,
  ...(tag ? { tag } : {}),
  format: '' as const,
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [textNode(text)],
})

const doc = (children: ReturnType<typeof block>[]) => ({
  root: { type: 'root', format: '' as const, indent: 0, version: 1, direction: 'ltr' as const, children },
})

/** Single paragraph — used for short fields like FAQ answers. */
const rich = (text: string) => doc([block('paragraph', text)])

/** `['h2', 'Heading']` / `['p', 'Body copy']` -> a lexical document. */
const article = (lines: [('h2' | 'h3' | 'p'), string][]) =>
  doc(
    lines.map(([kind, text]) =>
      kind === 'p' ? block('paragraph', text) : block('heading', text, kind),
    ),
  )

type SeedCollection = 'pages' | 'posts' | 'services' | 'jobs' | 'categories'

async function upsert<T extends { id: number; title?: string }>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: SeedCollection,
  slug: string,
  data: Record<string, unknown>,
): Promise<T> {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0 })
  const first = existing.docs[0]
  const args = { collection, context: { disableRevalidate: true } } as never
  if (first) {
    return (await payload.update({ ...(args as object), id: first.id, data } as never)) as unknown as T
  }
  return (await payload.create({ ...(args as object), data: { ...data, slug } } as never)) as unknown as T
}

/**
 * Uploads a file from public/images into the Media collection, keyed by
 * filename so re-running the seed reuses the existing document.
 */
async function upsertMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  file: string,
  alt: string,
  folder = 'hero',
): Promise<{ id: number } | null> {
  // Media converts rasters to webp on upload, so the stored filename is not
  // the one passed in. Look for both or every run creates duplicates.
  const stored = file.replace(/\.(png|jpe?g)$/i, '.webp')
  const existing = await payload.find({
    collection: 'media',
    where: { or: [{ filename: { equals: file } }, { filename: { equals: stored } }] },
    limit: 1,
    depth: 0,
  })
  if (existing.docs[0]) return existing.docs[0] as unknown as { id: number }

  const path = join(process.cwd(), 'public', 'images', folder, file)
  if (!existsSync(path)) return null

  return (await payload.create({
    collection: 'media',
    data: { alt },
    filePath: path,
    context: { disableRevalidate: true },
  })) as unknown as { id: number }
}

const run = async () => {
  // Refuse to put the throwaway development password on a real database. It is
  // printed in the README, so an admin account using it is effectively public.
  if (isRemoteDatabase() && !process.env.SEED_ADMIN_PASSWORD) {
    console.error(
      '\n  Refusing to seed a remote database with the default admin password.\n' +
        '  Re-run with your own credentials:\n\n' +
        '    SEED_ADMIN_EMAIL=you@fekra-egy.com SEED_ADMIN_PASSWORD=\'<strong password>\' pnpm seed\n',
    )
    process.exit(1)
  }

  const payload = await getPayload({ config })

  const users = await payload.find({ collection: 'users', limit: 1 })
  if (!users.docs.length) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'FEKRA Admin', role: 'admin' },
    })
    payload.logger.info(`Created admin ${ADMIN_EMAIL} — change the password on first login.`)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    context: { disableRevalidate: true },
    data: {
      siteName: 'FEKRA',
      legalName: 'Fekra',
      logoLight: (await upsertMedia(payload, 'fekra-logo.webp', 'FEKRA', ''))?.id,
      logoDark: (await upsertMedia(payload, 'fekra-logo-white.webp', 'FEKRA', ''))?.id,
      tagline: 'Loyalty . Innovation . Expansion',
      generalEmail: 'info@fekra-egy.com',
      notificationEmails: ['info@fekra-egy.com'],
      careersEmails: ['careers@fekra-egy.com'],
      consentMode: 'opt-in',
      crawlerPolicy: {
        allowSearchEngines: true,
        allowAiSearchBots: true,
        allowAiTrainingBots: false,
        publishLlmsTxt: false,
      },
      offices: [
        {
          city: 'Cairo',
          country: 'Egypt',
          countryCode: 'EG',
          phone: '+20 110 113 3572',
          email: 'info@fekra-egy.com',
          isHeadquarters: true,
        },
        { city: 'Riyadh', country: 'Saudi Arabia', countryCode: 'SA' },
        { city: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE' },
        { city: 'London', country: 'United Kingdom', countryCode: 'GB' },
        { city: 'New York', country: 'United States', countryCode: 'US' },
      ],
    },
  })

  type RoutePath = '/' | '/blog' | '/services' | '/careers' | '/contact' | '/meeting'

  const page = (label: string, id: number | string) => ({
    type: 'internal' as const,
    label,
    reference: { relationTo: 'pages' as const, value: Number(id) },
    newTab: false,
  })

  const route = (label: string, path: RoutePath, analyticsId?: string) => ({
    type: 'route' as const,
    label,
    route: path,
    newTab: false,
    ...(analyticsId ? { analyticsId } : {}),
  })

  const clientLogos = await Promise.all(
    ['northwind', 'meridian', 'verta', 'lumen', 'axiom', 'cobalt', 'solace', 'kestrel'].map(
      async (slug) => ({
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        media: await upsertMedia(payload, `${slug}.svg`, `${slug} logo`, 'logos'),
      }),
    ),
  )

  const photoNames = ['team', 'office', 'desk', 'code', 'meeting', 'laptop', 'server', 'design', 'data', 'ai', 'review', 'ship']
  const photos = Object.fromEntries(
    await Promise.all(
      photoNames.map(async (n) => [n, await upsertMedia(payload, `${n}.jpg`, 'FEKRA team at work', 'samples')]),
    ),
  ) as Record<string, { id: number } | null>

  const serviceIcons = await Promise.all(
    ['ai', 'code', 'review', 'server'].map((n) => upsertMedia(payload, `${n}.jpg`, '', 'samples')),
  )

  const services = await Promise.all<{ id: number; title: string; summary: string }>(
    [
      { slug: 'ai-engineers', title: 'AI Engineers', summary: 'Vetted AI and machine-learning engineers.' },
      { slug: 'software-developers', title: 'Software Developers', summary: 'Front-end, back-end and full-stack engineers.' },
      { slug: 'qa-engineers', title: 'QA Engineers', summary: 'Manual, automation and performance testing.' },
      { slug: 'devops-cloud', title: 'DevOps & Cloud', summary: 'Platform, SRE and cloud infrastructure engineers.' },
    ].map((service, index) =>
      upsert<{ id: number; title: string; summary: string }>(payload, 'services', service.slug, {
        ...service,
        order: index,
        icon: serviceIcons[index]?.id,
        availableLocales: ['en'],
        _status: 'published',
      }),
    ),
  )

  const categories = Object.fromEntries(
    await Promise.all(
      [
        ['outsourcing', 'Outsourcing'],
        ['hiring', 'Hiring'],
        ['engineering', 'Engineering'],
        ['quality', 'Quality'],
        ['ai', 'AI'],
      ].map(async ([slug, title]) => [
        slug,
        await upsert<{ id: number }>(payload, 'categories', slug!, { title, _status: 'published' }),
      ]),
    ),
  ) as Record<string, { id: number }>

  const posts: {
    slug: string
    title: string
    excerpt: string
    category: string
    tags: string[]
    featured?: boolean
    body: [('h2' | 'h3' | 'p'), string][]
  }[] = [
    {
      slug: 'software-outsourcing-in-2026',
      title: 'Software Outsourcing in 2026: When It Works, When It Fails',
      excerpt:
        'What separates outsourcing engagements that ship from the ones that stall — scoping, ownership, and the handover nobody plans for.',
      category: 'outsourcing',
      tags: ['Outsourcing', 'Delivery'],
      featured: true,
      body: [
        ['p', 'Outsourcing works when the boundary between teams is a contract about outcomes, not a queue of tickets. It fails when the vendor owns the code but nobody owns the problem.'],
        ['h2', 'Where outsourcing actually works'],
        ['p', 'The strongest engagements share one trait: the external team is accountable for a slice of the product a customer can see, end to end. Give a team a feature and a definition of done, and it will organise itself around shipping.'],
        ['h3', 'Clear surface area'],
        ['p', 'A well-drawn boundary is usually a page, a service, or a workflow — something with its own tests and its own users. Boundaries drawn along skills instead ("they do frontend") create handoffs at exactly the point where context is expensive to transfer.'],
        ['h3', 'A real definition of done'],
        ['p', 'Done means merged, tested, observable in production, and documented well enough that the next person does not need a call. Anything short of that pushes work back onto your own team later.'],
        ['h2', 'Where it fails'],
        ['p', 'Two failure modes account for most of it: treating the vendor as a ticket queue, and never planning the handover. Both are avoidable, and both are decided in the first two weeks.'],
        ['h3', 'The ticket queue trap'],
        ['p', 'When every task arrives fully specified, you pay for hands and lose the judgement you were buying. Engineers who cannot ask "should we build this at all?" produce exactly what was written, including the parts that were wrong.'],
        ['h2', 'How to do it right'],
        ['p', 'Start with one bounded slice. Insist on the same code review, CI and on-call standards you hold internally. Plan the handover on day one, not at the end — the documentation you would need if the team disappeared tomorrow is the documentation you need anyway.'],
      ],
    },
    {
      slug: 'how-we-vet-the-top-3-percent',
      title: 'How We Vet the Top 3% of Engineers',
      excerpt:
        'Five screening stages, what each one is actually testing for, and why the technical interview comes last.',
      category: 'hiring',
      tags: ['Hiring', 'Process'],
      body: [
        ['p', 'Every engineer we place goes through the same five stages. The order matters more than the content: the cheapest signals come first.'],
        ['h2', 'Profile screening'],
        ['p', 'We shortlist on demonstrated ownership rather than years or logos. Someone who took a system from prototype to production tells us more than someone who spent longer next to one.'],
        ['h2', 'Language and communication'],
        ['p', 'A structured interview in English confirms the engineer can disagree clearly, ask for missing context, and write an update somebody else can act on. This stage removes more candidates than the technical one.'],
        ['h2', 'Commitment and reliability'],
        ['p', 'Availability, notice periods and overlap hours are boring questions that prevent expensive surprises. We ask them before anyone invests in a technical assessment.'],
        ['h2', 'Technical assessment'],
        ['p', 'A practical task drawn from the role, not a puzzle. We review the commit history as closely as the result — how someone works through a problem predicts collaboration better than the final diff.'],
        ['h2', 'Technical interview'],
        ['p', 'Last, and deliberately so. By this point we already know the person communicates and delivers, so the conversation can go deep on architecture instead of re-checking basics.'],
      ],
    },
    {
      slug: 'scaling-engineering-teams-with-ai',
      title: 'Scaling Engineering Teams With AI, Without the Theatre',
      excerpt:
        'Where AI tooling genuinely compounds a team’s output, and where it quietly adds review load nobody budgeted for.',
      category: 'ai',
      tags: ['AI', 'Engineering'],
      body: [
        ['p', 'AI tooling changes the cost of writing code. It does not change the cost of understanding it — and understanding is where teams were already bottlenecked.'],
        ['h2', 'What compounds'],
        ['p', 'Test scaffolding, migrations, boilerplate translation, and first-draft documentation. All are verifiable in seconds and boring to write, which is exactly the right profile.'],
        ['h2', 'What adds review load'],
        ['p', 'Large speculative refactors and unfamiliar subsystems. Generated code arrives without the reasoning that produced it, so the reviewer reconstructs it from scratch — often slower than writing it.'],
        ['h2', 'A rule that holds up'],
        ['p', 'Let AI write anything you can verify faster than you can write. Everything else still needs a human who will be on call for it.'],
      ],
    },
    {
      slug: 'building-qa-culture-that-ships',
      title: 'Building a QA Culture That Still Ships Weekly',
      excerpt:
        'Quality gates that catch real defects without turning every release into a two-week ceremony.',
      category: 'quality',
      tags: ['Quality', 'Testing', 'Delivery'],
      body: [
        ['p', 'Most QA processes fail in one of two directions: too thin to catch anything, or so heavy that teams route around them.'],
        ['h2', 'Gate on severity, not on count'],
        ['p', 'A blocker stops a release. A cosmetic issue does not. Writing that distinction down before launch week is what keeps the conversation technical instead of political.'],
        ['h2', 'Automate the regressions, review the rest'],
        ['p', 'Anything that broke once should be a test. Everything else is better served by a short, honest manual pass on the flows that make money.'],
        ['h2', 'Re-test before you call it passed'],
        ['p', 'A fixed defect is not a passed defect. The re-test is the cheapest step in the process and the one most often skipped.'],
      ],
    },
    {
      slug: 'nearshore-vs-offshore',
      title: 'Nearshore vs Offshore: Which Model Fits Your Team',
      excerpt:
        'Timezone overlap, cost, and hiring depth pull in different directions. Here is how to weigh them honestly.',
      category: 'outsourcing',
      tags: ['Outsourcing', 'Hiring'],
      body: [
        ['p', 'The nearshore/offshore debate is really a debate about how many hours a day your teams can talk to each other.'],
        ['h2', 'Overlap is the real variable'],
        ['p', 'Four hours of overlap is enough for a team that owns a bounded slice. One hour is not enough for anyone, at any price.'],
        ['h2', 'When offshore wins'],
        ['p', 'Deep, specialised skills that are simply not available nearby, and work that is asynchronous by nature — data pipelines, migrations, long-running platform work.'],
        ['h2', 'When nearshore wins'],
        ['p', 'Product work with frequent direction changes, anything customer-facing, and any team still finding its architecture.'],
      ],
    },
  ]

  const now = Date.now()
  if (WITH_DEMO_CONTENT)
    await Promise.all(
    posts.map((post, index) =>
      upsert(payload, 'posts', post.slug, {
        title: post.title,
        excerpt: post.excerpt,
        heroImage: photos[photoNames[index % photoNames.length]!]?.id,
        content: article(post.body),
        category: categories[post.category]!.id,
        tags: post.tags,
        featured: Boolean(post.featured),
        availableLocales: ['en'],
        // Spread the dates so the listing has a believable order.
        publishedAt: new Date(now - index * 6 * 864e5).toISOString(),
        _status: 'published',
      }),
    ),
  )

  if (WITH_DEMO_CONTENT)
    await upsert(payload, 'jobs', 'senior-full-stack-engineer', {
    title: 'Senior Full-Stack Engineer',
    summary: 'Build and ship production systems with a team that owns delivery end to end.',
    description: rich(
      'You will work directly with client engineering teams on production systems, from architecture through release.',
    ),
    requirements: rich('5+ years building web applications, strong TypeScript, and clear written English.'),
    department: 'Engineering',
    location: 'Cairo, Egypt',
    workModel: 'hybrid',
    employmentType: 'FULL_TIME',
    countryCode: 'EG',
    city: 'Cairo',
    roleStatus: 'open',
    availableLocales: ['en'],
    publishedAt: new Date().toISOString(),
    _status: 'published',
  })

  // Hero assets, exported from the Figma frame.
  const icons = await Promise.all(
    ['icon-1.svg', 'icon-2.svg', 'icon-3.svg'].map((f) => upsertMedia(payload, f, '')),
  )
  const tiles = await Promise.all(
    Array.from({ length: 9 }, (_, i) => `tile-0${i + 1}.png`).map((f) =>
      upsertMedia(payload, f, 'FEKRA engineers at work'),
    ),
  )

  const home = await upsert<{ id: number }>(payload, 'pages', 'home', {
    title: 'Home',
    availableLocales: ['en'],
    _status: 'published',
    layout: [
      {
        blockType: 'hero',
        trustLine: 'Trusted by 50+ innovative companies',
        heading: 'Scale Your Team Faster With',
        headingAccent: 'AI Engineers',
        body: 'Fekra helps companies scale with carefully vetted software engineers, structured technical evaluation, and a transparent delivery process built for speed, quality, and trust.',
        rotatingWords: [
          { text: 'AI Engineers' },
          { text: 'Full-Stack Engineers' },
          { text: 'Backend Engineers' },
          { text: 'Mobile Engineers' },
          { text: 'QA Engineers' },
          { text: 'DevOps Engineers' },
          { text: 'Data Engineers' },
        ],
        bullets: [
          { text: 'Vetted in days, not weeks', icon: icons[0]?.id },
          { text: 'Structured technical evaluation', icon: icons[1]?.id },
          { text: 'Transparent delivery process', icon: icons[2]?.id },
        ],
        ctas: [{ variant: 'primary', link: route('Schedule a Call', '/meeting', 'booking_cta_click') }],
        // Order matters: each entry maps to a fixed slot in MOSAIC_LAYOUT,
        // which mirrors the Figma collage tile for tile.
        mosaic: [
          { kind: 'image', corner: 'tl', image: tiles[0]?.id },
          { kind: 'stat', corner: 'tr', tone: 'green', value: '100+', label: 'Top Talents' },
          { kind: 'image', corner: 'tr', image: tiles[1]?.id },
          { kind: 'stat', corner: 'tr', tone: 'teal', value: '80+', label: 'Projects' },
          { kind: 'image', corner: 'tr', image: tiles[2]?.id },
          { kind: 'stat', corner: 'tl', tone: 'indigo', value: '8+', label: 'Experience' },
          { kind: 'image', corner: 'tr', image: tiles[3]?.id },
          { kind: 'image', corner: 'tl', image: tiles[4]?.id },
          { kind: 'image', corner: 'tr', image: tiles[5]?.id },
          { kind: 'stat', corner: 'tr', tone: 'emerald', value: '20+', label: 'Tech Stack' },
          { kind: 'image', corner: 'tl', image: tiles[6]?.id },
          { kind: 'image', corner: 'tr', image: tiles[7]?.id },
          { kind: 'image', corner: 'tr', image: tiles[8]?.id },
        ],
      },
      {
        blockType: 'logoCloud',
        statement: {
          before: '50+ companies rely on our',
          highlight: 'top 3%',
          after: 'talent to scale their dev teams.',
        },
        logos: clientLogos
          .filter((l) => l.media)
          .map((l) => ({ name: l.name, image: l.media!.id })),
      },
      {
        blockType: 'talentShowcase',
        heading: 'Build Your',
        headingAccent: 'Team Faster',
        body: 'Get vetted engineers matched to your exact needs without wasting weeks on hiring, screening and filtering.',
        bullets: [
          { text: 'Fast shortlisting' },
          { text: 'Technical evaluation reports' },
          { text: 'Flexible engagement models' },
        ],
        roles: [
          { label: 'AI Engineers' },
          { label: 'Software Developer' },
          { label: 'Software Tester' },
          { label: 'Project managers & business analysts' },
          { label: 'UI/UX Designer' },
          { label: 'Scrum Masters & product owners' },
          { label: 'System administrators & DevOps' },
        ],
        panelTitle: 'Build your remote team',
        people: [
          { name: 'Emma Williams', role: 'UX Designer', experience: '3+ Years', match: 74, evaluated: true },
          { name: 'Priya Sharma', role: 'Data Scientist', experience: '5+ Years', match: 85, evaluated: true },
          { name: 'James Chen', role: 'DevOps Engineer', experience: '10+ Years', match: 91, evaluated: true },
          { name: 'Alex Rivera', role: 'Full Stack Developer', experience: '8+ Years', match: 88, evaluated: true },
        ],
        ctas: [{ variant: 'primary', link: route('Build your remote team', '/contact') }],
      },
      {
        blockType: 'cardGrid',
        eyebrow: 'We work with',
        heading: 'Build Your',
        headingAccent: 'Team Faster',
        body: 'Get vetted engineers matched to your exact needs without wasting weeks on hiring and screening.',
        columns: '3',
        cards: services.map((service) => ({
          title: String(service.title),
          body: String(service.summary ?? ''),
          link: {
            type: 'internal' as const,
            label: String(service.title),
            reference: { relationTo: 'services' as const, value: Number(service.id) },
          },
        })),
      },
      {
        blockType: 'process',
        eyebrow: 'Our process',
        heading: 'Your success starts here',
        body: 'We screen every engineer for technical skills, communication and reliability.',
        steps: [
          { title: 'Sourcing & profile screening', body: 'We shortlist engineers whose experience matches the role.' },
          { title: 'Language & communication screening', body: 'A structured interview confirms they can collaborate clearly with your team.' },
          { title: 'HR & commitment evaluation', body: 'We assess professionalism, availability and long-term fit.' },
          { title: 'Technical evaluation', body: 'A practical assessment based on the real requirements of the role.' },
          { title: 'Technical interview', body: 'A detailed interview validating depth and hands-on capability.' },
        ],
      },
      {
        blockType: 'stats',
        heading: 'Trusted by',
        items: [
          { value: '20+', label: 'Tech Stack' },
          { value: '8+', label: 'Experience' },
          { value: '300+', label: 'Top Talents' },
          { value: '80+', label: 'Projects' },
        ],
      },
      {
        blockType: 'faq',
        heading: 'Frequently Asked Questions',
        emitSchema: true,
        items: [
          {
            question: 'What makes Fekra different?',
            answer: rich('Access to vetted senior talent, rapid start, and a structured process that removes weeks of screening.'),
          },
          {
            question: 'What is the estimated cost of hiring a dedicated development team?',
            answer: rich('Cost depends on seniority, stack and engagement length. Book a 30-minute call for a concrete estimate.'),
          },
          {
            question: 'How does Fekra protect client rights and data confidentiality?',
            answer: rich('Every engagement is covered by NDAs and IP assignment, with access controls agreed before onboarding.'),
          },
        ],
      },
      {
        blockType: 'postsTeaser',
        eyebrow: 'Latest blogs',
        heading: 'Our Recent Blogs',
        limit: 3,
      },
      {
        blockType: 'contact',
        eyebrow: 'Contact us',
        heading: "Let's Talk Business!",
        showOffices: true,
        showForm: true,
      },
      {
        blockType: 'cta',
        tone: 'brand',
        heading: 'Ready to scale your engineering team?',
        body: 'We embed high-performance developers directly into your team, skipping the friction of traditional hiring.',
        ctas: [{ variant: 'secondary', link: route('Book a 30-Min Meeting', '/meeting', 'booking_cta_click') }],
      },
    ],
  })

  const contact = await upsert<{ id: number }>(payload, 'pages', 'contact', {
    title: 'Contact Us',
    availableLocales: ['en'],
    _status: 'published',
    layout: [{ blockType: 'contact', heading: "Let's Talk Business!", showOffices: true, showForm: true }],
  })

  await payload.updateGlobal({
    slug: 'header',
    context: { disableRevalidate: true },
    data: {
      items: [
        { link: page('Home', home.id) },
        {
          link: route('Services', '/services'),
          children: services.map((service) => ({
            link: {
              type: 'internal' as const,
              label: String(service.title),
              reference: { relationTo: 'services' as const, value: Number(service.id) },
            },
          })),
        },
        { link: route('Blog', '/blog') },
        { link: route('Careers', '/careers') },
        { link: page('Contact Us', contact.id) },
      ],
      ctas: [
        { variant: 'primary', link: route('Book a 30-Min Meeting', '/meeting', 'booking_cta_click') },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    context: { disableRevalidate: true },
    data: {
      tagline: 'Loyalty . Innovation . Expansion',
      blurb: 'We provide your teams with a diverse group of highly skilled engineers.',
      newsletter: {
        enabled: true,
        heading: "Let's create something remarkable together.",
        body: 'Stay updated with the latest in tech, design and digital innovation.',
      },
      columns: [
        {
          title: 'Company',
          links: [
            { link: page('Home', home.id) },
            { link: route('Services', '/services') },
            { link: route('Careers', '/careers') },
            { link: page('Contact Us', contact.id) },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Fekra. All rights reserved.`,
    },
  })

  payload.logger.info(
    `Seed complete — ${WITH_DEMO_CONTENT ? 'including' : 'without'} demo articles and the example job.`,
  )
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  // Payload nests field-level failures here; without this you only see "400".
  if (error?.data?.errors) console.error(JSON.stringify(error.data.errors, null, 2))
  process.exit(1)
})
