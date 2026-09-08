/**
 * Proves a CMS page is actually translated in every public locale (9.4 / 14.6).
 *
 *   node scripts/check-locale-page.mjs about [baseUrl]
 *
 * Fetches the page per locale and asserts, for every string in
 * scripts/translations/<slug>.json: the translation is on the page and the
 * English original is gone. That is stricter than "the page returns 200" —
 * a locale that silently falls back to English still renders fine, which is
 * exactly the failure this exists to catch. Also checks lang/dir, so the RTL
 * pass has something that fails loudly instead of a screenshot to squint at.
 *
 * Exits non-zero on any failure so it can gate a release.
 */
import { readFileSync } from 'node:fs'

const slug = process.argv[2] ?? 'about'
const BASE = process.argv[3] ?? 'http://localhost:3000'
const LOCALES = ['ar', 'de', 'fr', 'es']
const RTL = new Set(['ar'])

const RAW = JSON.parse(readFileSync(`scripts/translations/${slug}.json`, 'utf8'))
const MAP = Object.entries(RAW).filter(([k]) => !k.startsWith('_'))

/** Page text as a reader sees it: no markup, no entities, whitespace collapsed. */
const textOf = (html) =>
  html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')

// Markdown emphasis is rendered away, and long copy is split across elements —
// compare on the same collapsed, marker-free basis on both sides.
const norm = (s) => s.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()

const failures = []
const fail = (locale, msg) => failures.push(`${locale}: ${msg}`)

for (const locale of LOCALES) {
  const path = `/${locale}/${slug}`
  const res = await fetch(BASE + path, { headers: { 'accept-language': locale } })
  if (res.status !== 200) {
    fail(locale, `${path} -> HTTP ${res.status}`)
    continue
  }
  const html = await res.text()
  const text = textOf(html)

  const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1]
  const dir = html.match(/<html[^>]*\bdir="([^"]+)"/)?.[1]
  if (lang !== locale) fail(locale, `<html lang> is "${lang}", expected "${locale}"`)
  const wantDir = RTL.has(locale) ? 'rtl' : 'ltr'
  if (dir !== wantDir) fail(locale, `<html dir> is "${dir}", expected "${wantDir}"`)

  let translated = 0
  const missing = []
  const leftEnglish = []
  // A brand name is its own key AND a phrase inside longer copy ("...como ISTQB
  // Platinum Partner."). Finding it on the page is only a fallback if it is not
  // already accounted for by a translation that legitimately contains it.
  const translatedBlob = MAP.map(([, t]) => norm(t[locale] ?? '')).join(' ')
  for (const [en, t] of MAP) {
    const want = t[locale]
    if (!want) continue // deliberately kept in English (proper nouns)
    if (text.includes(norm(want))) translated += 1
    else missing.push(norm(want).slice(0, 60))
    if (text.includes(norm(en)) && !translatedBlob.includes(norm(en))) leftEnglish.push(norm(en).slice(0, 60))
  }
  if (missing.length) fail(locale, `${missing.length} translated strings not on the page, e.g. "${missing[0]}"`)
  if (leftEnglish.length) fail(locale, `${leftEnglish.length} English originals still rendered, e.g. "${leftEnglish[0]}"`)

  console.log(
    `${path.padEnd(14)} 200  lang=${lang}  dir=${dir}  translated=${translated}/${MAP.filter(([, t]) => t[locale]).length}` +
      `${missing.length ? `  MISSING ${missing.length}` : ''}${leftEnglish.length ? `  ENGLISH ${leftEnglish.length}` : ''}`,
  )
}

// English must survive every locale write — it is the source the clones come from.
const enRes = await fetch(`${BASE}/${slug}`)
const enText = textOf(await enRes.text())
if (enRes.status !== 200) fail('en', `/${slug} -> HTTP ${enRes.status}`)
else {
  const gone = MAP.filter(([en]) => !enText.includes(norm(en)))
  if (gone.length) fail('en', `${gone.length} English strings vanished, e.g. "${norm(gone[0][0]).slice(0, 60)}"`)
  console.log(`/${slug}`.padEnd(14) + `200  lang=en   dir=ltr  english=${MAP.length - gone.length}/${MAP.length}`)
}

if (failures.length) {
  console.error(`\n${failures.length} failure(s):`)
  for (const f of failures) console.error('  ✗ ' + f)
  process.exit(1)
}
console.log(`\nOK — ${slug} is translated in ${LOCALES.join(', ')} and intact in en.`)
