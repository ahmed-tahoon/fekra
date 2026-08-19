/**
 * Sample job postings.
 *
 * Lives apart from index.ts so `pnpm seed:jobs` can load just these roles
 * without the full seed also rewriting Pages, Posts and Services.
 *
 * Enough spread across department, location and work model that the careers
 * listing's team grouping, meta pills and related-roles rail all have
 * something real to render — a single role could not show any of it.
 */

type Line = ['h2' | 'h3' | 'p', string]

export type SampleJob = {
  slug: string
  title: string
  summary: string
  department: string
  location: string
  city: string
  countryCode: string
  workModel: 'onsite' | 'hybrid' | 'remote'
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR' | 'TEMPORARY' | 'INTERN'
  about: Line[]
  requirements: Line[]
  benefits?: Line[]
}

export const sampleJobs: SampleJob[] = [
  {
    slug: 'senior-full-stack-engineer',
    title: 'Senior Full-Stack Engineer',
    summary: 'Own features end to end on production systems, alongside client engineering teams.',
    department: 'Engineering',
    location: 'Cairo, Egypt',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'hybrid',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will work directly with client engineering teams on production systems, from architecture through release. This is a delivery role: you own features end to end, and you are trusted to make the call on how they are built.',
      ],
      ['h3', 'What you will do'],
      [
        'p',
        'Design and ship features across the stack, review your teammates’ work properly, and keep the codebase something people are glad to open on a Monday.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '5+ years building and shipping web applications in production.'],
      ['p', 'Strong TypeScript, and comfort moving between React on the front and Node or Python on the back.'],
      ['p', 'Clear written English — most of our client communication happens in writing.'],
    ],
    benefits: [
      ['h2', 'What we offer'],
      ['p', 'Private medical cover, an annual learning budget, and hybrid working from our Cairo office.'],
    ],
  },
  {
    slug: 'ai-ml-engineer',
    title: 'AI / ML Engineer',
    summary: 'Take models from notebook to production, and keep them honest once they are there.',
    department: 'AI & Data',
    location: 'Remote — EMEA',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'remote',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will build and deploy machine-learning systems for clients across fintech, logistics and health — the part of the work that starts after the notebook runs.',
      ],
      ['h3', 'What you will do'],
      [
        'p',
        'Own the path from prototype to production: data pipelines, evaluation, deployment, and the monitoring that tells you when a model has drifted.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '3+ years applying machine learning to real products, not only research.'],
      ['p', 'Strong Python, plus hands-on experience with PyTorch or TensorFlow and a cloud platform.'],
      ['p', 'A habit of measuring things before and after you change them.'],
    ],
  },
  {
    slug: 'senior-react-native-engineer',
    title: 'Senior React Native Engineer',
    summary: 'Build mobile apps people keep on their home screen, on iOS and Android at once.',
    department: 'Engineering',
    location: 'Remote — EMEA',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'remote',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will lead mobile delivery for client products, owning the architecture, the release process, and the performance work that keeps an app feeling native.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '4+ years with React Native, and apps you can point to in either store.'],
      ['p', 'Comfort dropping into native iOS or Android when the bridge is not enough.'],
    ],
  },
  {
    slug: 'devops-platform-engineer',
    title: 'DevOps / Platform Engineer',
    summary: 'Make deployment boring — for our teams and the clients they build for.',
    department: 'Platform',
    location: 'Cairo, Egypt',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'hybrid',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will own the infrastructure our delivery teams stand on: pipelines, environments, observability, and the guardrails that stop a bad release reaching a customer.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '4+ years running production infrastructure on AWS, GCP or Azure.'],
      [
        'p',
        'Infrastructure as code — Terraform or Pulumi — and container orchestration you have actually operated, not just configured.',
      ],
    ],
  },
  {
    slug: 'data-engineer',
    title: 'Data Engineer',
    summary: 'Build the pipelines the rest of the business makes decisions on.',
    department: 'AI & Data',
    location: 'Riyadh, Saudi Arabia',
    city: 'Riyadh',
    countryCode: 'SA',
    workModel: 'onsite',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will design and run the data platform for enterprise clients in the Kingdom — ingestion, modelling, warehousing, and the quality checks that make the numbers trustworthy.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '3+ years building batch and streaming pipelines in production.'],
      ['p', 'Strong SQL and Python, plus a modern warehouse such as BigQuery, Snowflake or Redshift.'],
      ['p', 'Based in Riyadh, or willing to relocate.'],
    ],
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    summary: 'Design interfaces that survive contact with real users and real deadlines.',
    department: 'Design',
    location: 'Cairo, Egypt',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'hybrid',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will work alongside engineers from the first sketch to the last review, owning the design system as much as the screens.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '3+ years designing digital products, with a portfolio of shipped work.'],
      [
        'p',
        'Fluent in Figma, and comfortable reasoning about states, edge cases and accessibility — not just the happy path.',
      ],
    ],
  },
  {
    slug: 'technical-recruiter',
    title: 'Technical Recruiter',
    summary: 'Find the top 3% — and give every candidate a process worth recommending.',
    department: 'Talent',
    location: 'Dubai, United Arab Emirates',
    city: 'Dubai',
    countryCode: 'AE',
    workModel: 'hybrid',
    employmentType: 'FULL_TIME',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will run technical hiring end to end — sourcing, screening, and keeping candidates genuinely informed from first message to offer.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '3+ years recruiting software engineers, ideally for an agency or consultancy.'],
      ['p', 'Enough technical literacy to hold a real conversation about a candidate’s stack.'],
    ],
  },
  {
    slug: 'qa-automation-engineer',
    title: 'QA Automation Engineer',
    summary: 'Catch it before the client does.',
    department: 'Quality',
    location: 'Remote — EMEA',
    city: 'Cairo',
    countryCode: 'EG',
    workModel: 'remote',
    employmentType: 'CONTRACTOR',
    about: [
      ['h2', 'About the role'],
      [
        'p',
        'You will build and own the automated test suites that let our delivery teams release weekly without holding their breath.',
      ],
    ],
    requirements: [
      ['h2', 'What we are looking for'],
      ['p', '3+ years in test automation with Playwright, Cypress or similar.'],
      ['p', 'An eye for the test that would have caught the bug, rather than the one that is easy to write.'],
    ],
  },
]

/**
 * Upserts every sample role. Keyed by slug, so re-running updates in place
 * rather than creating duplicates. `article` and `now` are passed in so this
 * module stays free of the seed's lexical helpers and clock.
 */
export async function seedJobs(
  payload: { find: (a: never) => Promise<{ docs: { id: number }[] }>; create: (a: never) => Promise<unknown>; update: (a: never) => Promise<unknown> },
  article: (lines: Line[]) => unknown,
  now: number,
): Promise<void> {
  await Promise.all(
    sampleJobs.map(async (job, index) => {
      const data = {
        title: job.title,
        summary: job.summary,
        description: article(job.about),
        requirements: article(job.requirements),
        ...(job.benefits ? { benefits: article(job.benefits) } : {}),
        department: job.department,
        location: job.location,
        workModel: job.workModel,
        employmentType: job.employmentType,
        countryCode: job.countryCode,
        city: job.city,
        roleStatus: 'open',
        availableLocales: ['en'],
        // Stagger so "newest first" has a believable order.
        publishedAt: new Date(now - index * 3 * 864e5).toISOString(),
        _status: 'published',
      }
      const args = { collection: 'jobs', context: { disableRevalidate: true } }
      const existing = await payload.find({ ...args, where: { slug: { equals: job.slug } }, limit: 1, depth: 0 } as never)
      const first = existing.docs[0]
      if (first) await payload.update({ ...args, id: first.id, data } as never)
      else await payload.create({ ...args, data: { ...data, slug: job.slug } } as never)
    }),
  )
}
