/**
 * Writes ar/de/fr/es translations for the home page and its chrome (14.6/14.10).
 *
 *   pnpm tsx scripts/translate-home.ts          # dry run: coverage report
 *   pnpm tsx scripts/translate-home.ts --write  # apply
 *
 * Method: fetch each document in ENGLISH at depth 0, deep-clone it, replace
 * every string that has an entry in scripts/translations/home.json, and update
 * the document per locale. Payload stores localized fields per locale keyed by
 * the SAME row ids, so the clone must — and does — carry every `id` through
 * untouched; only string values change. Strings with no map entry (tech names,
 * brand names, emails) stay English and fall back cleanly.
 *
 * Covers: the home page document (all blocks, lexical answers included), the
 * header and footer globals, site-settings office names, and the 13 service
 * titles the mega menu shows. Job/blog documents stay English-only for now —
 * their availableLocales still say so, which keeps hreflang honest (14.9).
 */
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { getPayload } from 'payload'

import config from '../src/payload.config'

const LOCALES = ['ar', 'de', 'fr', 'es'] as const

const MAP: Record<string, Record<(typeof LOCALES)[number], string>> = JSON.parse(
  readFileSync(path.resolve(process.cwd(), 'scripts/translations/home.json'), 'utf8'),
)

const META = {
  ar: { title: 'الرئيسية', description: 'تساعد فكرة الشركات على التوسّع بمهندسي برمجيات مختارين بعناية وتقييم تقني منظم وعملية تسليم شفافة.' },
  de: { title: 'Startseite', description: 'Fekra hilft Unternehmen zu skalieren – mit geprüften Softwareingenieuren, strukturierter Bewertung und transparenter Lieferung.' },
  fr: { title: 'Accueil', description: "Fekra aide les entreprises à évoluer grâce à des ingénieurs rigoureusement sélectionnés et un processus de livraison transparent." },
  es: { title: 'Inicio', description: 'Fekra ayuda a las empresas a escalar con ingenieros evaluados, evaluación técnica estructurada y una entrega transparente.' },
} as const

/** Deep-clone `value`, translating every mapped string. Counts hits/misses. */
function translate(value: unknown, locale: (typeof LOCALES)[number], stats: { hit: number; miss: Set<string> }): unknown {
  if (typeof value === 'string') {
    const entry = MAP[value]
    if (entry) {
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
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  const en = {
    page: (await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0, locale: 'en' })).docs[0]!,
    header: await payload.findGlobal({ slug: 'header', depth: 0, locale: 'en' }),
    footer: await payload.findGlobal({ slug: 'footer', depth: 0, locale: 'en' }),
    settings: await payload.findGlobal({ slug: 'site-settings', depth: 0, locale: 'en' }),
    services: (await payload.find({ collection: 'services', limit: 30, depth: 0, locale: 'en' })).docs,
  }

  for (const locale of LOCALES) {
    const stats = { hit: 0, miss: new Set<string>() }
    const layout = translate(en.page.layout, locale, stats)
    const headerData = translate({ items: en.header.items, ctas: en.header.ctas, announcement: en.header.announcement }, locale, stats) as Record<string, unknown>
    const f = en.footer as unknown as Record<string, unknown>
    // `newsletter` and `copyright` are the footer's real field names — an earlier
    // subset guessed `legal` and silently skipped both, which is how the CTA
    // band and the copyright line stayed English on translated pages.
    const footerData = translate(
      { tagline: f.tagline, blurb: f.blurb, columns: f.columns, newsletter: f.newsletter, copyright: f.copyright },
      locale,
      stats,
    ) as Record<string, unknown>
    const officesData = translate({ offices: en.settings.offices }, locale, stats) as Record<string, unknown>

    console.log(`\n${locale}: ${stats.hit} strings translated, ${stats.miss.size} left in English`)
    if (!write && stats.miss.size) {
      for (const m of [...stats.miss].slice(0, 8)) console.log(`   en: ${m.slice(0, 90)}`)
    }

    if (!write) continue

    await payload.update({
      collection: 'pages',
      id: en.page.id,
      locale,
      data: {
        title: META[locale].title,
        layout,
        meta: { ...(en.page.meta ?? {}), title: `${META[locale].title} | FEKRA`, description: META[locale].description },
        availableLocales: ['en', 'ar', 'de', 'fr', 'es'],
        _status: 'published',
      } as never,
    })
    await payload.updateGlobal({ slug: 'header', locale, data: headerData as never })
    await payload.updateGlobal({ slug: 'footer', locale, data: footerData as never })
    await payload.updateGlobal({ slug: 'site-settings', locale, data: officesData as never })

    for (const svc of en.services) {
      const s2 = { hit: 0, miss: new Set<string>() }
      /*
       * The WHOLE document, not just title+menuRoles: services are
       * draft-enabled, so publishing a locale validates every required
       * localized field. A partial update fails validation on summary and
       * every block heading. Sending the full translated doc gives each
       * required field a value — translated where the map covers it, English
       * where it does not — and the service pages pick up the shared strings
       * (process steps, industries, tech groups) as a side benefit.
       */
      const data = translate(
        { title: svc.title, summary: svc.summary, layout: svc.layout, menuRoles: svc.menuRoles ?? [] },
        locale,
        s2,
      ) as Record<string, unknown>
      await payload.update({
        collection: 'services',
        id: svc.id,
        locale,
        data: { ...data, _status: svc._status ?? 'published' } as never,
      })
    }
    console.log(`   ${locale} applied: page + header + footer + offices + services`)
  }

  if (write) {
    const check = await payload.findByID({ collection: 'pages', id: en.page.id, depth: 0, locale: 'en' })
    if (check._status !== 'published') throw new Error(`EN page left as "${check._status}"!`)
    const ar = await payload.findByID({ collection: 'pages', id: en.page.id, depth: 0, locale: 'ar' })
    console.log(`\nEN intact ("${check.title}", ${check._status}); AR title "${ar.title}".`)
  }
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
