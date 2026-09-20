/** Verify English source content against the read-only pre-localization snapshot. */
import { readFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'
const payload = await getPayload({ config })
const snapshot = JSON.parse(readFileSync(process.argv[2] || '/private/tmp/fekra-batch3-content.json', 'utf8'))
function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value).filter(([key]) => !['updatedAt', 'createdAt', 'availableLocales'].includes(key)).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, normalize(child)]))
}
let checked = 0
let failures = 0
for (const collection of ['pages', 'services', 'jobs'] as const) {
  const result = await payload.find({ collection, locale: 'en', fallbackLocale: false, depth: 0, limit: 200, pagination: false })
  const before = snapshot[`${collection}-en`] as { id: number; slug: string }[]
  for (const source of before) {
    const current = result.docs.find((doc) => doc.id === source.id)
    if (JSON.stringify(normalize(source)) !== JSON.stringify(normalize(current))) {
      console.error(`English source changed: ${collection}/${source.slug}`)
      failures++
    }
    checked++
  }
}
console.log(`${checked} English source documents checked; ${failures} differences (excluding timestamps and locale availability).`)
await payload.destroy()
if (failures) process.exitCode = 1
