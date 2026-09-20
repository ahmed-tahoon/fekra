/** HTTP regression for locale-prefetch poisoning and cold localized pages.
 * node scripts/check-language-routing.mjs http://localhost:3005
 */
import assert from 'node:assert/strict'

const base = process.argv[2] ?? 'http://localhost:3000'
let checks = 0
const test = (name, result) => { assert.ok(result, name); checks++; console.log(`PASS ${name}`) }

for (const locale of ['ar', 'de', 'fr', 'es']) {
  const headers = { cookie: `NEXT_LOCALE=${locale}`, 'sec-fetch-dest': 'empty' }
  const start = performance.now()
  const response = await fetch(`${base}/`, { headers })
  const html = await response.text()
  test(`English client navigation with ${locale} preference`, response.status === 200 && new URL(response.url).pathname === '/' && /<html[^>]*lang="en"/.test(html))
  test(`Client navigation does not overwrite ${locale} preference`, !response.headers.get('set-cookie')?.includes('NEXT_LOCALE='))
  console.log(`  English response: ${Math.round(performance.now()-start)}ms`)

  const prefetch = await fetch(`${base}/`, { headers: { ...headers, rsc: '1', 'next-router-prefetch': '1' } })
  await prefetch.text()
  test(`English RSC prefetch cannot redirect to ${locale}`, prefetch.status === 200 && new URL(prefetch.url).pathname === '/')

  const document = await fetch(`${base}/`, { headers: { ...headers, 'sec-fetch-dest': 'document' }, redirect: 'manual' })
  test(`Document visit retains ${locale} preference`, document.status === 307 && new URL(document.headers.get('location'), base).pathname === `/${locale}`)
}

for (const locale of ['en', 'ar', 'de', 'fr', 'es']) {
  for (const route of ['/', '/services/hire-dedicated-developers', '/blog/how-we-vet-the-top-3-percent']) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    const path = `${prefix}${route === '/' ? '' : route}` || '/'
    const start = performance.now()
    const response = await fetch(`${base}${path}`, { headers: { cookie: `NEXT_LOCALE=${locale}`, 'sec-fetch-dest': 'document' } })
    const html = await response.text()
    test(`Localized document ${path}`, response.status === 200 && html.includes(`lang="${locale}"`) && html.includes(`dir="${locale==='ar'?'rtl':'ltr'}"`) && !html.includes('NEXT_HTTP_ERROR_FALLBACK;404') && !html.includes('Application error'))
    console.log(`  ${Math.round(performance.now()-start)}ms`)
  }
}
console.log(`${checks} language routing checks passed.`)
