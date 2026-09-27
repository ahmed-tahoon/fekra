import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import { createChallenge, verifyBot } from '../src/lib/bot-protection'
import { consultationSchema, contactSchema, applicationSchema, validateCv } from '../src/lib/validation'

// No network, uploads, database writes or notifications in these tests.
const originalFetch = globalThis.fetch
const originalSecret = process.env.TURNSTILE_SECRET_KEY
const originalHosts = process.env.TURNSTILE_HOSTNAMES
process.env.TURNSTILE_SECRET_KEY = 'unit-test-secret'
process.env.TURNSTILE_HOSTNAMES = 'fekra.example'
const request = new Request('https://fekra.example/api/contact')
let calls = 0
try {
  for (const action of ['contact', 'consultation', 'application', 'newsletter'] as const) {
    const challenge = createChallenge(action)!
    const body = { botChallenge: challenge.challenge, botAnswer: String(challenge.a + challenge.b), botToken: 'valid-token' }
    const provider = { success: true, action, cdata: challenge.nonce, hostname: 'fekra.example' }
    globalThis.fetch = async () => { calls++; return Response.json(provider) }
    assert.equal(await verifyBot(request, body, action), true)
    const before = calls
    assert.equal(await verifyBot(request, { ...body, botAnswer: '' }, action), false)
    assert.equal(await verifyBot(request, { ...body, botAnswer: '99' }, action), false)
    assert.equal(await verifyBot(request, { ...body, botToken: '' }, action), false)
    assert.equal(await verifyBot(request, { ...body, botChallenge: `${body.botChallenge}x` }, action), false)
    assert.equal(await verifyBot(request, { ...body, botChallenge: `${body.botChallenge}.extra` }, action), false)
    assert.equal(await verifyBot(request, {}, action), false)
    const [encoded] = body.botChallenge.split('.')
    const expired = { ...JSON.parse(Buffer.from(encoded!, 'base64url').toString()), expires: Date.now() - 1 }
    const payload = Buffer.from(JSON.stringify(expired)).toString('base64url')
    const signature = createHmac('sha256', 'unit-test-secret').update(payload).digest('base64url')
    assert.equal(await verifyBot(request, { ...body, botChallenge: `${payload}.${signature}` }, action), false)
    assert.equal(calls, before, 'Reject invalid challenges before contacting provider')
    for (const override of [{ success: false }, { action: 'wrong-action' }, { cdata: 'wrong-challenge' }, { hostname: 'attacker.example' }]) {
      globalThis.fetch = async () => Response.json({ ...provider, ...override })
      assert.equal(await verifyBot(request, body, action), false)
    }
    globalThis.fetch = async () => { throw new Error('provider unavailable') }
    assert.equal(await verifyBot(request, body, action), false)
    console.log(`PASS ${action}: valid, missing, wrong answer, tampered, expired, rejected/replayed token, action, hostname, challenge binding, provider outage`)
  }
  const contact = { fullName: 'QA Person', email: 'qa@example.com', subject: 'QA subject', message: 'A complete message for validation.', consent: true }
  assert.equal(contactSchema.safeParse(contact).success, true)
  for (const field of ['fullName', 'email', 'subject', 'message', 'consent']) assert.equal(contactSchema.safeParse({ ...contact, [field]: '' }).success, false)
  const consultation = { ...contact, phone: '+20 100 123 4567', model: 'Full Time' }
  assert.equal(consultationSchema.safeParse(consultation).success, true)
  for (const field of ['fullName', 'email', 'phone', 'model', 'consent']) assert.equal(consultationSchema.safeParse({ ...consultation, [field]: '' }).success, false)
  assert.equal(consultationSchema.safeParse({ ...consultation, phone: '-------' }).success, false)
  assert.equal(applicationSchema.safeParse({ ...contact, phone: '+20 100 123 4567', jobId: 1 }).success, true)
  assert.equal(validateCv(new File(['x'], 'resume.exe', { type: 'application/pdf' })), 'fileType')
  assert.equal(validateCv(new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'resume.pdf', { type: 'application/pdf' })), 'fileSize')
  delete process.env.TURNSTILE_SECRET_KEY
  assert.equal(createChallenge('contact'), null)
  assert.equal(await verifyBot(request, {}, 'contact'), false)
  console.log('PASS required fields, phone, CV limits, missing configuration fails closed')
} finally {
  globalThis.fetch = originalFetch
  if (originalSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY
  else process.env.TURNSTILE_SECRET_KEY = originalSecret
  if (originalHosts === undefined) delete process.env.TURNSTILE_HOSTNAMES
  else process.env.TURNSTILE_HOSTNAMES = originalHosts
}
