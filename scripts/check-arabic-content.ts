/** Checks published Arabic content without English fallback. Run after CMS edits. */
import { writeFileSync } from 'node:fs'
import { getPayload, type Field } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const failures: string[] = []
// Technology names, certifications, and brand names intentionally retain Latin spelling.
const terms = /^(?:[\d\s+%/.,-]+|\s*\|?\s*FEKRA|Fekra|Fika|AR\/VR|SOC 2 Type II|DevOps|Full[ -]Stack|Back[ -]?End|Front[ -]?End|AI|QA|UI\/UX|AWS|Azure|Google Cloud|Kubernetes|React(?: Native)?|Node\.js|Next\.js|Vue\.js|\.NET|Microsoft|WordPress|Python|JavaScript|TypeScript|Go|Golang|Java|PHP|Laravel|Flutter|iOS|Android|MERN(?: Stack)?|MEAN(?: Stack)?)$/i
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {}
function inspectText(en: unknown, ar: unknown, path: string) {
  if (typeof en === 'string') {
    if (!en.trim() || /^(?:https?:|\/|#)/.test(en) || terms.test(en)) return
    if (typeof ar !== 'string' || !ar.trim()) failures.push(`${path}: missing translation`)
    else if (/[a-z]/i.test(ar) && !/[\u0600-\u06ff]/.test(ar) && !terms.test(ar)) failures.push(`${path}: ${ar.slice(0, 100)}`)
  } else if (Array.isArray(en)) en.forEach((value, index) => inspectText(value, Array.isArray(ar) ? ar[index] : undefined, `${path}.${index}`))
  else {
    const value = record(en), translated = record(ar)
    for (const key of ['text', 'children', 'root']) if (key in value) inspectText(value[key], translated[key], `${path}.${key}`)
  }
}
function inspect(schema: Field[], source: unknown, translated: unknown, path: string) {
  const en = record(source), ar = record(translated)
  for (const field of schema) {
    if (field.type === 'tabs') for (const tab of field.tabs) {
      if ('name' in tab && tab.name) inspect(tab.fields, en[tab.name], ar[tab.name], `${path}.${tab.name}`)
      else inspect(tab.fields, en, ar, path)
    }
    else if (!('name' in field)) { if ('fields' in field) inspect(field.fields, en, ar, path) }
    else if ('localized' in field && field.localized) inspectText(en[field.name], ar[field.name], `${path}.${field.name}`)
    else if (field.type === 'group') inspect(field.fields, en[field.name], ar[field.name], `${path}.${field.name}`)
    else if (field.type === 'array' || field.type === 'blocks') {
      const rows = en[field.name], counterparts = ar[field.name]
      if (!Array.isArray(rows)) continue
      for (const [index, row] of rows.entries()) {
        const data = record(row)
        const target = Array.isArray(counterparts) ? counterparts.find((r) => record(r).id === data.id) : undefined
        const schema = field.type === 'array' ? field.fields : field.blocks.find((b) => typeof b === 'object' && b.slug === data.blockType)
        if (Array.isArray(schema)) inspect(schema, data, target, `${path}.${field.name}.${index}`)
        else if (schema && typeof schema === 'object') inspect(schema.fields, data, target, `${path}.${field.name}.${index}`)
      }
    }
  }
}
let documents = 0
for (const collection of ['pages', 'services', 'jobs', 'posts'] as const) {
  const en = await payload.find({ collection, locale: 'en', fallbackLocale: false, depth: 0, pagination: false, limit: 200, where: { _status: { equals: 'published' } } })
  const ar = await payload.find({ collection, locale: 'ar', fallbackLocale: false, depth: 0, pagination: false, limit: 200, where: { _status: { equals: 'published' } } })
  for (const doc of en.docs) {
    if (!doc.availableLocales?.includes('ar')) continue
    inspect(payload.collections[collection].config.fields, doc, ar.docs.find((d) => d.id === doc.id), `${collection}/${doc.slug}`)
    documents++
  }
}
for (const slug of ['header', 'footer', 'site-settings'] as const) {
  const en = await payload.findGlobal({ slug, locale: 'en', fallbackLocale: false, depth: 0 })
  const ar = await payload.findGlobal({ slug, locale: 'ar', fallbackLocale: false, depth: 0 })
  const schema = payload.config.globals.find((global) => global.slug === slug)!
  inspect(schema.fields, en, ar, slug)
}
console.log(`${documents} Arabic documents and 3 globals checked; ${failures.length} issues.`)
writeFileSync('/private/tmp/fekra-arabic-content-check.json', JSON.stringify({ documents, failures }, null, 2))
for (const failure of failures) console.error(failure)
await payload.destroy()
if (failures.length) process.exitCode = 1
