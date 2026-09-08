/**
 * Writes ar/de/fr/es translations for one CMS page (14.6/14.10/9.4).
 *
 *   pnpm tsx scripts/translate-page.ts about --init   # write an empty key skeleton
 *   pnpm tsx scripts/translate-page.ts about          # dry run: coverage report
 *   pnpm tsx scripts/translate-page.ts about --write  # apply
 *
 * Same method as translate-home.ts, narrowed to a single page document: fetch
 * it in ENGLISH at depth 0, deep-clone, replace every string that has an entry
 * in scripts/translations/<slug>.json, write the clone back per locale. Row ids
 * ride through untouched — Payload keys localized values off them, so a changed
 * id would orphan the English copy.
 *
 * `sharedSection` blocks need no entries: they resolve against the home page in
 * the reader's locale at render time, so they are already translated.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const LOCALES = ['ar', 'de', 'fr', 'es'] as const
type Loc = (typeof LOCALES)[number]

const slug = process.argv[2]
const write = process.argv.includes('--write')
if (!slug || slug.startsWith('--')) {
  console.error('usage: tsx scripts/translate-page.ts <page-slug> [--write]')
  process.exit(1)
}

const FILE = path.resolve(process.cwd(), `scripts/translations/${slug}.json`)

/*
 * --init dumps the page's own copy as an empty skeleton, so the keys are always
 * byte-identical to what is in the database. Retyping them by hand is how a
 * translation silently never matches and the locale quietly falls back to
 * English — the exact failure this script exists to fix.
 */
const init = process.argv.includes('--init')

// Select values and design tokens, never copy.
const NOT_COPY = new Set([
  'primary', 'secondary', 'brand', 'panel', 'compliance', 'none', 'left', 'right', 'center',
  'faq', 'posts', 'contact', 'ctaBand', 'default', 'small', 'large', 'light', 'dark',
  'numbered', 'bullet', 'check',
])
// Structural lexical/Payload keys whose string values are never shown to a reader.
const NOT_COPY_FIELD = new Set([
  'id', 'blockType', 'blockName', 'type', 'format', 'version', 'direction', 'mode', 'style',
  'relationTo', 'value', 'tag', 'listType', 'indent', 'textFormat', 'textStyle',
])

function collectCopy(node: unknown, out: string[], seen: Set<string>): void {
  if (typeof node === 'string') {
    const ok = node.length > 1 && /[a-zA-Z]/.test(node) && !/^(https?:|\/|#)/.test(node)
    if (ok && !NOT_COPY.has(node) && !seen.has(node)) {
      seen.add(node)
      out.push(node)
    }
    return
  }
  if (Array.isArray(node)) return node.forEach((n) => collectCopy(n, out, seen))
  if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) if (!NOT_COPY_FIELD.has(k)) collectCopy(v, out, seen)
  }
}

if (init) {
  const payload = await getPayload({ config })
  const doc = (
    await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, locale: 'en' })
  ).docs[0]
  if (!doc) throw new Error(`No page with slug "${slug}"`)
  const strings: string[] = []
  collectCopy(doc.layout, strings, new Set())
  const blank = Object.fromEntries(LOCALES.map((l) => [l, '']))
  const skeleton = {
    _title: blank,
    _description: blank,
    ...Object.fromEntries(strings.map((s) => [s, { ...blank }])),
  }
  writeFileSync(FILE, JSON.stringify(skeleton, null, 2) + '\n')
  console.log(`${FILE}: ${strings.length} keys (blank). Fill them, then re-run without --init.`)
  process.exit(0)
}

const RAW: Record<string, Record<Loc, string>> = JSON.parse(readFileSync(FILE, 'utf8'))
// `_`-prefixed keys are document metadata, not body copy. Missing them would
// otherwise write `undefined` as the localized title on every locale.
if (!RAW._title || !RAW._description) {
  throw new Error(`${FILE} needs "_title" and "_description" entries (one per locale).`)
}
const META = { title: RAW._title, description: RAW._description }
const MAP = Object.fromEntries(Object.entries(RAW).filter(([k, v]) => !k.startsWith('_') && v.ar))

/** Deep-clone `value`, translating every mapped string. Counts hits/misses. */
function translate(value: unknown, locale: Loc, stats: { hit: number; miss: Set<string> }): unknown {
  if (typeof value === 'string') {
    const entry = MAP[value]
    if (entry?.[locale]) {
      stats.hit += 1
      return entry[locale]
    }
    // Only surface plausible copy as untranslated, not slugs/urls/tokens.
    if (value.length > 12 && /[a-z] [a-z]/i.test(value) && !value.startsWith('http') && !value.startsWith('/')) {
      stats.miss.add(value)
    }
    return value
  }
  if (Array.isArray(value)) return value.map((v) => translate(v, locale, stats))
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value)) out[k] = translate(v, locale, stats)
    return out
  }
  return value
}

const run = async () => {
  const payload = await getPayload({ config })
  const en = (
    await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, depth: 0, locale: 'en' })
  ).docs[0]
  if (!en) throw new Error(`No page with slug "${slug}"`)

  for (const locale of LOCALES) {
    const stats = { hit: 0, miss: new Set<string>() }
    const layout = translate(en.layout, locale, stats)

    console.log(`\n${locale}: ${stats.hit} strings translated, ${stats.miss.size} left in English`)
    for (const m of [...stats.miss].slice(0, 8)) console.log(`   en: ${m.slice(0, 90)}`)
    if (!write) continue

    await payload.update({
      collection: 'pages',
      id: en.id,
      locale,
      data: {
        title: META.title[locale],
        layout,
        meta: {
          ...(en.meta ?? {}),
          title: `${META.title[locale]} | FEKRA`,
          description: META.description[locale],
        },
        availableLocales: ['en', 'ar', 'de', 'fr', 'es'],
        _status: 'published',
      } as never,
    })
    console.log(`   ${locale} applied`)
  }

  if (write) {
    // The English document is the source every locale is cloned from — a write
    // that demoted or overwrote it would be silent until someone loaded /about.
    const check = await payload.findByID({ collection: 'pages', id: en.id, depth: 0, locale: 'en' })
    if (check._status !== 'published') throw new Error(`EN page left as "${check._status}"!`)
    if (check.title !== en.title) throw new Error(`EN title changed: "${en.title}" -> "${check.title}"`)
    const ar = await payload.findByID({ collection: 'pages', id: en.id, depth: 0, locale: 'ar' })
    console.log(`\nEN intact ("${check.title}", ${check._status}); AR title "${ar.title}".`)
  }
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
