/**
 * Targeted service migration. Safe to run without rewriting pages, posts, or
 * global navigation:
 *
 *   pnpm seed:services
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { seedApprovedServices, type ServiceSeed } from '../src/seed/services'

const stripIds = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(stripIds)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !['id', 'createdAt', 'updatedAt'].includes(key))
      .map(([key, entry]) => [key, stripIds(entry)]),
  )
}

const run = async () => {
  const payload = await getPayload({ config })
  const template = await payload.find({
    collection: 'services',
    where: { slug: { equals: 'hire-front-end-developers' } },
    limit: 1,
    // Relationships stay as IDs; recursively stripping IDs from expanded
    // media documents would erase the hero and section artwork references.
    depth: 0,
    draft: false,
  })
  const templateLayout = stripIds(template.docs[0]?.layout ?? []) as Array<Record<string, unknown>>

  const makeLayout = (service: ServiceSeed) => {
    const rest = templateLayout.filter((block) => block.blockType !== 'serviceHero')
    return [
      {
        blockType: 'serviceHero',
        heading: service.title,
        heroTone: service.tone,
        body: service.body,
        closer: service.summary,
        highlights: [
          { text: 'Save 30% to 60% per talent hired through FEKRA.' },
          { text: 'Start with an individual or complete team in 6 to 14 days.' },
          { text: 'Access a vetted, highly skilled international talent pool.' },
        ],
        formTitle: 'Get Free Consultation',
      },
      ...rest,
    ]
  }

  await seedApprovedServices(payload as never, makeLayout)
  const { totalDocs } = await payload.find({ collection: 'services', limit: 0, depth: 0 })
  console.log(`Approved service catalog loaded — ${totalDocs} service documents are now available.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
