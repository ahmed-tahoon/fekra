/**
 * Migrates the FAQ from the old FEKRA site into the CMS (task FQ-1).
 *
 *   pnpm tsx scripts/migrate-faq.ts          # dry run
 *   pnpm tsx scripts/migrate-faq.ts --write  # apply
 *
 * Source: the "Some of FAQs" Elementor accordion on https://fekra-egy.com/.
 * Six unique questions — the markup renders one of them twice (Elementor emits
 * a duplicate tab), which is deduped here rather than carried across.
 *
 * The answers are bulleted lists on the old site, so they are rebuilt as real
 * lexical lists rather than flattened into one long paragraph. That keeps them
 * scannable and keeps the FAQPage structured data meaningful (18.8 / 19.3).
 *
 * Wording is transferred verbatim; only the surrounding markup changes, which
 * is exactly what the feedback asks for.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const textNode = (text: string) => ({
  type: 'text',
  text,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
  version: 1,
})

const paragraph = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: [textNode(text)],
})

const bulletList = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr' as const,
  children: items.map((item, i) => ({
    type: 'listitem',
    value: i + 1,
    checked: false,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [textNode(item)],
  })),
})

const answer = (intro: string, items: string[], paras: string[] = []) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      ...(intro ? [paragraph(intro)] : []),
      ...paras.map(paragraph),
      ...(items.length ? [bulletList(items)] : []),
    ],
  },
})

const FAQ: { question: string; intro?: string; items?: string[]; paras?: string[] }[] = [
  {
    question: 'What makes FEKRA different?',
    items: [
      'Access to Top Talent: Fekra provides highly qualified professionals with the expertise to deliver outstanding results.',
      'Rapid Staffing Solutions: Fekra assembles specialized teams within 14 days to meet project needs.',
      'Bilingual Communication: Fekra’s multilingual team ensures seamless communication and transparency throughout.',
      'Global Standards + Local Expertise: Fekra combines international best practices with regional insights for optimal results.',
      'Scalable Quality Assurance: Fekra’s quality assurance process adapts to evolving project requirements, ensuring superior outcomes.',
      'Agile Methodology: Fekra swiftly adapts to changing customer needs and project demands.',
      'Ethical & Reliable Operations: Fekra emphasizes integrity, reliability, and delivering added value for clients.',
      'Long-Term Partnership Focus: Fekra prioritizes value over cost to foster sustainable business relationships.',
      'Customized Onboarding & Security: Fekra offers tailored training and secure infrastructure to promote seamless team integration.',
      '24/7 Support: Fekra provides round-the-clock assistance to keep projects on track without disruptions.',
    ],
  },
  {
    question: 'Why outsource?',
    items: [
      'Focus on Core Operations: Outsourcing allows businesses to concentrate on essential activities.',
      'Lower Operational Costs: Outsourcing reduces expenses on infrastructure, recruitment, and training.',
      'Boost Efficiency: Outsourcing accelerates development and implementation timelines.',
      'Access Global Talent: Companies benefit from the expertise of top professionals worldwide.',
      'Adopt New Technologies Fast: Outsourcing enables the rapid integration of new technologies.',
      'Mitigate Risks & Ensure Compliance: Outsourcing minimizes risks and ensures regulatory compliance.',
      'Flexible Cost Models: Fixed costs are transformed into scalable, variable expenses.',
      'Level the Playing Field: Small businesses gain competitive advantages against larger enterprises.',
      'Enhance Profitability: Time and resource savings translate into higher profitability.',
      'Scalable Operations: Outsourcing provides the flexibility to adjust resources as needed.',
    ],
  },
  {
    question: 'Why Egypt?',
    items: [
      'Competitive Costs: Egypt offers lower wage levels compared to India and Eastern Europe.',
      'Proven Success: Global companies like Cisco, IBM, and Microsoft leverage Egypt’s IT talent.',
      'Vast Talent Supply: Egypt produces over 250,000 IT and language graduates annually.',
      'Emerging IT Hub: Egypt is becoming a recognized hub for IT outsourcing and business process outsourcing (BPO).',
      'Time Zone Advantage: Egypt offers real-time collaboration with Europe and the U.S.',
      'Young & Motivated Workforce: Egypt’s workforce is eager for international opportunities.',
      'English Proficiency: Egyptian professionals are well-educated and fluent in English.',
      'Cost-Effective Services: Global companies benefit from high-quality services at affordable rates.',
      'Government Support: The Egyptian government actively supports the IT and outsourcing sectors.',
      'Access to Specialists: Egypt offers a large pool of qualified IT professionals.',
    ],
  },
  {
    question: 'What is the estimated cost of hiring a dedicated development team?',
    paras: [
      'The cost of hiring a specialized development team varies based on team size, technology stack, project complexity, and required roles such as designers, developers, and project managers. Fekra offers flexible pricing models tailored to each project’s specific needs. For a detailed, customized quote aligned with your requirements, contact Fekra to explore cost-efficient solutions.',
    ],
  },
  {
    question: 'How does FEKRA protect client rights and ensure data confidentiality?',
    paras: [
      'Fekra prioritizes data security and client confidentiality. Comprehensive agreements ensure transparency and accountability for all parties involved. Fekra enforces strict Non-Disclosure Agreements (NDAs) to prevent unauthorized sharing or disclosure of sensitive information, safeguarding clients’ rights and project data at all times.',
    ],
  },
  {
    question: 'What hiring models does FEKRA offer, and how do they work?',
    intro: 'Fekra provides three flexible hiring models to meet diverse project needs:',
    items: [
      'Full-Time Monthly Hire: A dedicated developer works 8 hours per day, 160 hours per month. Ideal for continuous development and long-term projects.',
      'Part-Time Monthly Hire: Developers work 4 hours per day, 80 hours per month. Suitable for smaller projects or supplementary support.',
      'Hourly Hire: Flexible packages ranging from 50 to 400 hours. Perfect for ad-hoc tasks, maintenance, or short-term needs.',
      'Cost savings through optimized staffing.',
      '24/7 support to ensure uninterrupted progress.',
      'Daily reporting for full transparency.',
      'SCRUM-based execution to maintain agile and efficient workflows.',
    ],
  },
]

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No home page.')

  const layout = [...((page.layout ?? []) as { blockType?: string; items?: unknown[] }[])]
  const index = layout.findIndex((b) => b.blockType === 'faq')
  const block = layout[index]
  if (!block) throw new Error('No faq block on the home page.')

  console.log(`\ncurrent: ${(block.items ?? []).length} placeholder items`)
  console.log(`migrating: ${FAQ.length} questions from fekra-egy.com\n`)
  FAQ.forEach((f, i) => {
    const shape = f.items?.length ? `${f.items.length} bullets` : `${f.paras?.length ?? 0} paragraph(s)`
    console.log(`  ${i + 1}. ${f.question}  (${shape})`)
  })

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  block.items = FAQ.map((f) => ({
    question: f.question,
    answer: answer(f.intro ?? '', f.items ?? [], f.paras ?? []),
  }))

  layout[index] = block as (typeof layout)[number]
  // _status must ride along or Pages saves a draft and unpublishes the page.
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: page._status ?? 'published' } as never })

  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}".`)
  console.log(`\nApplied ${FAQ.length} questions. Page _status ${after._status}.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
