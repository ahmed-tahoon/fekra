/**
 * Pre-launch guard for the localisation layer (14.6 / 14.9 / 24.5).
 * Run with `pnpm check:i18n`. Exits non-zero on any failure so CI can gate on it.
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { DEFAULT_LOCALE, LOCALES, dir, isLocale, localeHref, negotiateLocale, splitLocale } from '../src/i18n/routing'
import { slugify } from '../src/payload/fields/slug'

// --- URL policy: English unprefixed, everything else prefixed ---------------
assert.equal(localeHref('en', '/about'), '/about')
assert.equal(localeHref('en', '/'), '/')
assert.equal(localeHref('ar', '/about'), '/ar/about')
assert.equal(localeHref('ar', '/'), '/ar')
assert.equal(localeHref('de', 'blog/post'), '/de/blog/post')

assert.deepEqual(splitLocale('/ar/blog/x'), { locale: 'ar', rest: '/blog/x' })
assert.deepEqual(splitLocale('/blog/x'), { locale: 'en', rest: '/blog/x' })
assert.deepEqual(splitLocale('/ar'), { locale: 'ar', rest: '/' })
// A path segment that merely looks like a locale must not be swallowed.
assert.deepEqual(splitLocale('/english/x'), { locale: 'en', rest: '/english/x' })

// localeHref and splitLocale are inverses for every locale.
for (const locale of LOCALES) {
  assert.deepEqual(splitLocale(localeHref(locale, '/services/team')), { locale, rest: '/services/team' })
}

// --- Direction --------------------------------------------------------------
assert.equal(dir('ar'), 'rtl')
for (const locale of LOCALES.filter((l) => l !== 'ar')) assert.equal(dir(locale), 'ltr')

// --- Accept-Language negotiation -------------------------------------------
assert.equal(negotiateLocale('de-DE,de;q=0.9,en;q=0.8'), 'de')
assert.equal(negotiateLocale('en-US,en;q=0.9'), 'en')
assert.equal(negotiateLocale('ar-EG'), 'ar')
assert.equal(negotiateLocale('pt-BR,pt;q=0.9'), DEFAULT_LOCALE, 'unsupported language falls back')
assert.equal(negotiateLocale(null), DEFAULT_LOCALE)
// q-values decide, not source order.
assert.equal(negotiateLocale('fr;q=0.2,es;q=0.9'), 'es')

assert.equal(isLocale('ar'), true)
assert.equal(isLocale('pt'), false)
assert.equal(isLocale(undefined), false)

// --- Slugs ------------------------------------------------------------------
assert.equal(slugify('Hire Front-End Developers'), 'hire-front-end-developers')
assert.equal(slugify('  Développeurs  Full Stack '), 'developpeurs-full-stack')
assert.equal(slugify('C++ & .NET'), 'c-net')

// --- Dictionary parity ------------------------------------------------------
const flatten = (obj: unknown, prefix = ''): string[] =>
  Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
    value && typeof value === 'object' ? flatten(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  )

const load = (locale: string) =>
  JSON.parse(readFileSync(join(process.cwd(), 'src/i18n/dictionaries', `${locale}.json`), 'utf8'))

const reference = flatten(load(DEFAULT_LOCALE)).sort()

for (const locale of LOCALES) {
  const keys = flatten(load(locale)).sort()
  const missing = reference.filter((k) => !keys.includes(k))
  const extra = keys.filter((k) => !reference.includes(k))
  assert.deepEqual(missing, [], `${locale}.json is missing keys: ${missing.join(', ')}`)
  assert.deepEqual(extra, [], `${locale}.json has unknown keys: ${extra.join(', ')}`)
}

console.log(`i18n OK — ${LOCALES.length} locales, ${reference.length} keys each.`)
