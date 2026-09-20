/** Stored Arabic content; dry run by default. Never translates at request time.
 * node --env-file=.env.local --import=tsx/esm scripts/localize-batch-three.ts [--write]
 * Walk the CMS schema so shared IDs, names, numbers and media stay unchanged.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { getPayload, type Field } from 'payload'
import config from '../src/payload.config'

const copy: Record<string, string> = JSON.parse(
  readFileSync('scripts/translations/batch-three-ar.json', 'utf8'),
)
const write = process.argv.includes('--write')
const only = process.argv.find((arg) => arg.startsWith('--only='))?.slice(7)
const payload = await getPayload({ config })
const backup = `/private/tmp/fekra-batch3-backup-${Date.now()}`
const missing = new Set<string>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- shape is supplied by the CMS schema below.
type Content = any
type Doc = Record<string, Content> // CMS schemas determine the shape of each nested block.

function text(en: Content, ar: Content): Content {
  if (typeof en === 'string') {
    if (copy[en]) return copy[en]
    if (typeof ar === 'string' && /[\u0600-\u06ff]/.test(ar)) return ar
    if (/[a-z] [a-z]/i.test(en) && !/^(https?:|\/)/.test(en)) missing.add(en)
    return ar || en
  }
  if (Array.isArray(en)) return en.map((v, i) => text(v, ar?.[i]))
  if (en && typeof en === 'object') {
    // Lexical content: only text and block direction are locale-dependent.
    return Object.fromEntries(
      Object.entries(en).map(([k, v]) => [
        k,
        k === 'text'
          ? text(v, ar?.[k])
          : k === 'direction'
            ? 'rtl'
            : k === 'children' || k === 'root'
              ? text(v, ar?.[k])
              : v,
      ]),
    )
  }
  return en
}
function fields(schema: Field[], en: Doc, ar: Doc = {}): Doc {
  const out: Doc = {}
  for (const f of schema) {
    if (f.type === 'tabs') {
      for (const tab of f.tabs) {
        if ('name' in tab && tab.name)
          out[tab.name] = fields(tab.fields, en?.[tab.name] ?? {}, ar?.[tab.name] ?? {})
        else Object.assign(out, fields(tab.fields, en, ar))
      }
    } else if (!('name' in f)) {
      if ('fields' in f) Object.assign(out, fields(f.fields, en, ar))
    } else {
      const value = en?.[f.name]
      if (value === undefined) continue
      if ('localized' in f && f.localized) out[f.name] = text(value, ar?.[f.name])
      else if (f.type === 'group') out[f.name] = fields(f.fields, value ?? {}, ar?.[f.name] ?? {})
      else if (f.type === 'array')
        out[f.name] =
          value?.map((row: Doc) => ({
            ...row,
            ...fields(f.fields, row, ar?.[f.name]?.find((r: Doc) => r.id === row.id) ?? {}),
          })) ?? value
      else if (f.type === 'blocks')
        out[f.name] =
          value?.map((row: Doc) => {
            const block = f.blocks.find((b) => typeof b !== 'string' && b.slug === row.blockType)
            return typeof block === 'object'
              ? {
                  ...row,
                  ...fields(
                    block.fields,
                    row,
                    ar?.[f.name]?.find((r: Doc) => r.id === row.id) ?? {},
                  ),
                }
              : row
          }) ?? value
      else out[f.name] = value
    }
  }
  return out
}

if (write) mkdirSync(backup, { recursive: true })
let changes = 0
for (const collection of ['pages', 'services', 'jobs'] as const) {
  const source = await payload.find({
    collection,
    locale: 'en',
    fallbackLocale: false,
    depth: 0,
    pagination: false,
    limit: 200,
    where: { _status: { equals: 'published' } },
  })
  for (const en of source.docs) {
    if (only && `${collection}/${en.slug}` !== only) continue
    const ar = await payload.findByID({
      collection,
      id: en.id,
      locale: 'ar',
      fallbackLocale: false,
      depth: 0,
    })
    const data = fields(payload.collections[collection].config.fields, en, ar)
    // Limit top-level writes to content and translation availability.
    const allowed = [
      'title',
      'summary',
      'layout',
      'menuRoles',
      'description',
      'requirements',
      'benefits',
      'department',
      'location',
      'meta',
    ]
    const update = Object.fromEntries(Object.entries(data).filter(([k]) => allowed.includes(k)))
    if (collection === 'pages' && en.slug === 'home') {
      for (const block of update.layout as Doc[]) {
        if (block.blockType === 'hero') {
          block.heading = 'وسّع فريقك بسرعة مع'
          block.headingAccent = 'مهندسي الذكاء الاصطناعي'
          block.trustLine = 'تثق بنا أكثر من 50 شركة مبتكرة'
          const roles = [
            'مهندسي الذكاء الاصطناعي',
            'مهندسي Full-Stack',
            'مهندسي Backend',
            'مهندسي تطبيقات الجوال',
            'مهندسي ضمان الجودة',
            'مهندسي DevOps',
            'مهندسي البيانات',
          ]
          block.rotatingWords = (block.rotatingWords ?? []).map((word: Doc, index: number) => ({
            ...word,
            text: roles[index] ?? word.text,
          }))
          for (const tile of block.mosaic ?? []) {
            if (tile.kind === 'stat')
              tile.label =
                (
                  {
                    '100+': 'أفضل الكفاءات',
                    '80+': 'مشاريع',
                    '8+': 'سنوات خبرة',
                    '20+': 'تقنيات',
                  } as Record<string, string>
                )[tile.value] ?? tile.label
          }
        }
      }
    }
    if (!allowed.some((key) => JSON.stringify(update[key]) !== JSON.stringify((ar as Doc)[key])))
      continue
    changes++
    if (write) {
      writeFileSync(`${backup}/${collection}-${en.id}.json`, JSON.stringify({ en, ar }, null, 2))
      await payload.update({
        collection,
        id: en.id,
        locale: 'ar',
        depth: 0,
        select: { slug: true },
        context: { disableRevalidate: true },
        data: {
          ...update,
          availableLocales: Array.from(new Set([...(en.availableLocales ?? ['en']), 'ar'])),
        } as never,
      })
    }
    console.log(`${write ? 'Saved' : 'Would update'} ${collection}/${en.slug}`)
  }
}
if (!only) for (const slug of ['header', 'footer', 'site-settings'] as const) {
  const en = await payload.findGlobal({ slug, locale: 'en', fallbackLocale: false, depth: 0 })
  const ar = await payload.findGlobal({ slug, locale: 'ar', fallbackLocale: false, depth: 0 })
  const schema = payload.config.globals.find((global) => global.slug === slug)!
  const data = fields(schema.fields, en, ar)
  if (write) {
    writeFileSync(`${backup}/global-${slug}.json`, JSON.stringify({ en, ar }, null, 2))
    await payload.updateGlobal({ slug, locale: 'ar', depth: 0, context: { disableRevalidate: true }, data: data as never })
  }
  console.log(`${write ? 'Saved' : 'Would update'} global/${slug}`)
}
writeFileSync('/private/tmp/fekra-batch3-unmapped.json', JSON.stringify([...missing], null, 2))
console.log(
  JSON.stringify({ changes, write, backup: write ? backup : null, unmapped: missing.size }),
)
await payload.destroy()
