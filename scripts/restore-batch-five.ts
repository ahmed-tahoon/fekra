/** Restore reviewed English service heroes without replacing localized copy,
 * page layouts, relationships, or publishing state. Back up before each write.
 * node --env-file=.env.local --import=tsx/esm scripts/restore-batch-five.ts [--write]
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'
import { serviceDesigns, serviceHighlights } from '../src/seed/service-designs'

const write = process.argv.includes('--write')
const backup = `/private/tmp/fekra-batch-five-backup-${Date.now()}`
const payload = await getPayload({ config })
if (write) mkdirSync(backup, { recursive: true })
for (const design of serviceDesigns) {
  const { docs } = await payload.find({ collection: 'services', locale: 'en', depth: 0, limit: 1, where: { slug: { equals: design.slug } } })
  const doc = docs[0]
  if (!doc) throw new Error(`Missing service: ${design.slug}`)
  const hero = doc.layout?.find((block) => block.blockType === 'serviceHero')
  if (!hero || hero.blockType !== 'serviceHero' || hero.highlights?.length !== 3) throw new Error(`Unexpected hero structure: ${design.slug}`)
  const layout = doc.layout!.map((block) => block.id === hero.id ? {
    ...hero, heading: design.title, body: design.body, closer: design.summary, heroTone: design.heroTone,
    highlights: hero.highlights!.map((item, index) => ({ ...item, text: serviceHighlights[index] })),
  } : block)
  const changed = JSON.stringify(layout) !== JSON.stringify(doc.layout)
  console.log(`${write ? 'WRITE' : 'PLAN'} ${design.slug}: ${changed ? 'restore hero' : 'already matches'}`)
  if (write && changed) {
    const allLocales = await payload.findByID({ collection: 'services', id: doc.id, locale: 'all', depth: 0 })
    writeFileSync(`${backup}/${design.slug}.json`, JSON.stringify(allLocales, null, 2), { mode: 0o600 })
    await payload.update({ collection: 'services', id: doc.id, locale: 'en', context: { disableRevalidate: true }, data: { layout } })
    const saved = await payload.findByID({ collection: 'services', id: doc.id, locale: 'en', depth: 0 })
    const result = saved.layout?.find((block) => block.blockType === 'serviceHero')
    if (result?.blockType !== 'serviceHero' || result.body !== design.body || result.heroTone !== design.heroTone) throw new Error(`Verification failed: ${design.slug}`)
  }
}
console.log(write ? `Backup: ${backup}` : 'Dry run complete; pass --write to restore.')
await payload.destroy()

process.exit(0)
