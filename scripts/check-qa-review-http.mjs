import assert from 'node:assert/strict'
import { writeFileSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3006'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local QA only')
const findings = []
for (const locale of ['en', 'ar', 'de', 'fr', 'es']) {
  const prefix = locale === 'en' ? '' : `/${locale}`
  for (const suffix of ['/qa-missing-review', '/qa-missing-review/deeper', '/services/qa-missing-review']) {
    const start = Date.now()
    const response = await fetch(`${base}${prefix}${suffix}`, { signal: AbortSignal.timeout(6000) })
    const html = await response.text()
    const ms = Date.now() - start
    const csp = response.headers.get('content-security-policy') || ''
    const result = { path: prefix + suffix, status: response.status, ms, localized: html.includes(`lang="${locale}"`), heading: /<h1[^>]*>[^<]+<\/h1>/.test(html), csp: csp.includes("frame-ancestors 'self'") && !csp.includes('unsafe-eval'), xframe: response.headers.get('x-frame-options') }
    result.pass = result.status === 404 && ms < 3000 && result.localized && result.heading && result.csp && result.xframe === 'SAMEORIGIN'
    findings.push(result)
    console.log(result.pass ? 'PASS' : 'FAIL', JSON.stringify(result))
  }
}
for (const path of ['/about', '/fika', '/services/hire-front-end-developers', '/de/about', '/fr/fika']) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(30000) })
  await response.arrayBuffer()
  const result = { path, status: response.status, pass: response.status === 200 }
  findings.push(result)
  console.log(result.pass ? 'PASS' : 'FAIL', JSON.stringify(result))
}
for (const path of ['/api/contact', '/api/newsletter']) {
  const response = await fetch(base + path, { method: 'POST', body: new URLSearchParams({ email: 'qa-no-js@example.invalid' }) })
  const result = { path, status: response.status, pass: [400, 422, 429].includes(response.status) && !response.url.includes('?') }
  findings.push(result)
  console.log(result.pass ? 'PASS' : 'FAIL', JSON.stringify(result))
}
writeFileSync('/private/tmp/fekra-qa-http-results.json', JSON.stringify(findings, null, 2))
assert.ok(findings.every(result => result.pass), 'One or more HTTP checks failed')
