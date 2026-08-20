/**
 * Fills the eight empty Technologies categories (task TS-2).
 *
 *   pnpm tsx scripts/fill-tech-stack.ts          # dry run
 *   pnpm tsx scripts/fill-tech-stack.ts --write  # apply
 *
 * Names are taken from the technology stack CMARIX publishes, mapped onto the
 * category names already approved in Figma — the feedback asks for CMARIX's
 * technologies presented in FEKRA's own tab order, not CMARIX's categories.
 *
 * Only groups that are currently EMPTY are touched. AI / ML already has 11
 * items with real logos and is left exactly as it is.
 *
 * LOGOS ARE NOT SET HERE — none exist in Media for these. The grid renders a
 * name chip when a technology has no logo, so the section reads as intentional
 * rather than as broken images, and each logo can be attached in /admin later.
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'

/** Category name (as it already reads in the CMS) -> technologies. */
const TECHNOLOGIES: Record<string, string[]> = {
  Frontend: ['React.js', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS'],
  Backend: ['Node.js', 'Express.js', 'NestJS', 'ASP.NET Core', 'Django', 'FastAPI'],
  Mobile: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
  'Cloud & DevOps': ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform'],
  Databases: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Cassandra', 'DynamoDB'],
  'QA & Testing': ['Selenium', 'Playwright', 'Cypress', 'Jest', 'Postman', 'Appium'],
  'CMS & E-commerce': ['WordPress', 'WooCommerce', 'Magento', 'Shopify', 'BigCommerce'],
  // CMARIX has no equivalent category; these are the common tools in the space
  // and need FEKRA's sign-off more than the others do.
  'Low-Code & Automation': ['Power Automate', 'Zapier', 'n8n', 'Make', 'Retool', 'OutSystems'],
}

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No home page.')

  const layout = [...((page.layout ?? []) as { blockType?: string; groups?: unknown }[])]
  const index = layout.findIndex((b) => b.blockType === 'techStack')
  const block = layout[index]
  if (!block) throw new Error('No techStack block.')

  const groups = [...((block.groups ?? []) as { name?: string; items?: { name: string }[] }[])]
  let changed = 0

  for (const group of groups) {
    const wanted = TECHNOLOGIES[group.name ?? '']
    const current = group.items ?? []
    if (!wanted) {
      console.log(`  ${String(group.name).padEnd(24)} ${current.length} items — no mapping, left alone`)
      continue
    }
    if (current.length) {
      console.log(`  ${String(group.name).padEnd(24)} ${current.length} items — already populated, left alone`)
      continue
    }
    group.items = wanted.map((name) => ({ name }))
    changed += wanted.length
    console.log(`  ${String(group.name).padEnd(24)} 0 -> ${wanted.length}: ${wanted.join(', ')}`)
  }

  console.log(`\n${changed} technologies to add, all without logos (see the header note).`)
  if (!write) {
    console.log('Dry run. Re-run with --write to apply.')
    process.exit(0)
  }

  layout[index] = { ...block, groups } as (typeof layout)[number]
  // _status must ride along or Pages saves a draft and unpublishes the page.
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: page._status ?? 'published' } as never })

  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}".`)
  console.log(`Applied. Page _status ${after._status}.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
