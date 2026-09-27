import assert from 'node:assert/strict'

const base = process.argv[2] || 'http://localhost:3000'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local server only')
const contact = { fullName: 'QA Rejection', email: 'qa@example.com', subject: 'Security rejection test', message: 'This request must never be stored.', consent: true }
const post = (path, body) => fetch(`${base}${path}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })

// Every request deliberately lacks valid verification; no successful POSTs.
for (const body of [contact, { ...contact, formKind: 'consultation', phone: '+20 100 123 4567', model: 'Full Time' }]) {
  const response = await post('/api/contact', body)
  assert.equal(response.status, 422)
  assert.equal((await response.json()).error, 'verification_failed')
}
const incomplete = await post('/api/contact', { ...contact, formKind: 'consultation' })
assert.equal(incomplete.status, 422)
const fields = (await incomplete.json()).fields
assert.ok(fields.phone && fields.model)
const newsletter = await post('/api/newsletter', { email: 'qa@example.com' })
assert.equal(newsletter.status, 422)
assert.equal((await newsletter.json()).error, 'verification_failed')
const form = new FormData()
for (const [key, value] of Object.entries({ fullName: 'QA Rejection', email: 'qa@example.com', phone: '+20 100 123 4567', jobId: '1', consent: 'on' })) form.set(key, value)
form.set('cv', new File(['%PDF-1.4\nQA rejection only'], 'qa.pdf', { type: 'application/pdf' }))
const application = await fetch(`${base}/api/apply`, { method: 'POST', body: form })
assert.equal(application.status, 422)
assert.equal((await application.json()).error, 'verification_failed')
console.log('PASS HTTP rejection: contact, consultation, newsletter, application, consultation required phone/model; no successful submissions')
