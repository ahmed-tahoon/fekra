/**
 * Populates the Technologies section with names AND logos (task TS-2).
 *
 *   pnpm tsx scripts/fill-tech-stack.ts          # dry run
 *   pnpm tsx scripts/fill-tech-stack.ts --write  # apply
 *
 * NAMES come from the technology stack CMARIX publishes on cmarix.com (their
 * markup lazy-loads every icon through a placeholder, but the `alt` text lists
 * all 164 technologies in tab order). They are mapped onto the nine category
 * names already approved in Figma — the feedback asks for CMARIX's
 * technologies in FEKRA's tab order, not for CMARIX's own categories.
 *
 * LOGOS come from devicon (MIT licensed, full colour, 578 icons), not from
 * CMARIX's CDN. Two reasons: their asset files are theirs, whereas these marks
 * belong to the technology vendors; and one consistent icon set is what makes
 * the grid look like a system, which is the actual complaint behind TS-3/4/5.
 *
 * Every technology listed here has a colour logo. Where devicon had no icon —
 * Shopify, Strapi, Contentful, Appium, Wix, Squarespace, Zapier, n8n — the
 * entry was dropped rather than shipped as a bare name or a mismatched
 * monochrome glyph, since a mixed set is the inconsistency being fixed.
 *
 * AI / ML already has 11 items with logos and is left untouched.
 */
import { readdirSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const LOGO_DIR = path.resolve(process.cwd(), 'public/images/tech')

/** Category (as it reads in the CMS) -> [display name, devicon file stem]. */
const TECHNOLOGIES: Record<string, [string, string][]> = {
  Frontend: [
    ['React.js', 'react-original'],
    ['Angular', 'angularjs-original'],
    ['Vue.js', 'vuejs-original'],
    ['Next.js', 'nextjs-original'],
    ['TypeScript', 'typescript-original'],
    ['Tailwind CSS', 'tailwindcss-original'],
    ['Redux', 'redux-original'],
    ['Bootstrap', 'bootstrap-original'],
  ],
  Backend: [
    ['Node.js', 'nodejs-original'],
    ['Express.js', 'express-original'],
    ['NestJS', 'nestjs-original'],
    ['ASP.NET Core', 'dotnetcore-original'],
    ['Python', 'python-original'],
    ['Django', 'django-plain'],
    ['FastAPI', 'fastapi-original'],
  ],
  Mobile: [
    ['Swift', 'swift-original'],
    ['Kotlin', 'kotlin-original'],
    ['Java', 'java-original'],
    // React Native's own mark is the React atom.
    ['React Native', 'react-original'],
    ['Flutter', 'flutter-original'],
    ['Objective-C', 'objectivec-plain'],
  ],
  'Cloud & DevOps': [
    ['AWS', 'amazonwebservices-original-wordmark'],
    ['Microsoft Azure', 'azure-original'],
    ['Google Cloud', 'googlecloud-original'],
    ['Kubernetes', 'kubernetes-original'],
    ['Docker', 'docker-original'],
    ['Terraform', 'terraform-original'],
    ['Ansible', 'ansible-original'],
    ['Jenkins', 'jenkins-original'],
  ],
  Databases: [
    ['MySQL', 'mysql-original'],
    ['PostgreSQL', 'postgresql-original'],
    ['MongoDB', 'mongodb-original'],
    ['Redis', 'redis-original'],
    ['Cassandra', 'cassandra-original'],
    ['Elasticsearch', 'elasticsearch-original'],
    ['Firebase', 'firebase-plain'],
    ['Microsoft SQL Server', 'microsoftsqlserver-plain'],
  ],
  'QA & Testing': [
    ['Selenium', 'selenium-original'],
    ['Playwright', 'playwright-original'],
    ['Cypress', 'cypressio-original'],
    ['Jest', 'jest-plain'],
    ['Postman', 'postman-original'],
    ['JUnit', 'junit-original'],
    ['SonarQube', 'sonarqube-original'],
    ['Puppeteer', 'puppeteer-original'],
  ],
  'CMS & E-commerce': [
    ['WordPress', 'wordpress-plain'],
    ['WooCommerce', 'woocommerce-original'],
    ['Magento', 'magento-original'],
    ['Sanity', 'sanity-original'],
  ],
  'Low-Code & Automation': [
    ['Webflow', 'webflow-original'],
    ['Supabase', 'supabase-original'],
    ['Appwrite', 'appwrite-original'],
    ['Apollo GraphQL', 'apollographql-original'],
    ['Swagger', 'swagger-original'],
    ['GitHub Actions', 'githubactions-original'],
  ],
}

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const available = new Set(readdirSync(LOGO_DIR).filter((f) => f.endsWith('.svg')))
  const wanted = Object.values(TECHNOLOGIES).flat()
  const missing = wanted.filter(([, slug]) => !available.has(`${slug}.svg`))
  if (missing.length) throw new Error('Missing logo files:\n  ' + missing.map(([n, s]) => `${n} (${s}.svg)`).join('\n  '))

  const page = (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })).docs[0]
  if (!page) throw new Error('No home page.')
  const layout = [...((page.layout ?? []) as { blockType?: string; groups?: unknown }[])]
  const index = layout.findIndex((b) => b.blockType === 'techStack')
  const block = layout[index]
  if (!block) throw new Error('No techStack block.')

  const groups = [...((block.groups ?? []) as { name?: string; items?: unknown[] }[])]
  for (const group of groups) {
    const list = TECHNOLOGIES[group.name ?? '']
    console.log(`  ${String(group.name).padEnd(24)} ${list ? `${(group.items ?? []).length} -> ${list.length}` : `${(group.items ?? []).length} — left alone`}`)
  }
  console.log(`\n${wanted.length} technologies, every one with a colour logo.`)

  if (!write) {
    console.log('Dry run. Re-run with --write to apply.')
    process.exit(0)
  }

  /** Upload once per file; matched on the stem because Payload renames on re-upload. */
  const mediaFor = async (slug: string, name: string) => {
    const file = `${slug}.svg`
    const found = await payload.find({ collection: 'media', where: { filename: { like: slug } }, limit: 1, sort: 'id', depth: 0 })
    if (found.docs[0]) return found.docs[0].id as number
    const created = await payload.create({
      collection: 'media',
      filePath: path.join(LOGO_DIR, file),
      data: { alt: `${name} logo` } as never,
    })
    return created.id as number
  }

  for (const group of groups) {
    const list = TECHNOLOGIES[group.name ?? '']
    if (!list) continue
    const items = []
    for (const [name, slug] of list) items.push({ name, logo: await mediaFor(slug, name) })
    group.items = items
    console.log(`  ${group.name}: ${items.length} items wired`)
  }

  layout[index] = { ...block, groups } as (typeof layout)[number]
  // _status must ride along or Pages saves a draft and unpublishes the page.
  await payload.update({ collection: 'pages', id: page.id, data: { layout, _status: page._status ?? 'published' } as never })
  const after = await payload.findByID({ collection: 'pages', id: page.id, depth: 0 })
  if (after._status !== 'published') throw new Error(`Page left as "${after._status}".`)
  console.log(`\nApplied. Page _status ${after._status}.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
