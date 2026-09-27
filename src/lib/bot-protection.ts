import { createHmac, randomInt, randomUUID, timingSafeEqual } from 'node:crypto'

export type BotAction = 'contact' | 'consultation' | 'application' | 'newsletter'
const actions: BotAction[] = ['contact', 'consultation', 'application', 'newsletter']
const secret = () => process.env.TURNSTILE_SECRET_KEY
const signature = (value: string) => createHmac('sha256', secret()!).update(value).digest('base64url')

export function createChallenge(action: string) {
  if (!secret() || !actions.includes(action as BotAction)) return null
  const a = randomInt(1, 10), b = randomInt(1, 10)
  const nonce = randomUUID()
  const payload = Buffer.from(JSON.stringify({ a, b, nonce, action, expires: Date.now() + 300_000 })).toString('base64url')
  return { a, b, nonce, challenge: `${payload}.${signature(payload)}` }
}

/** Fail closed before any database write or notification. Turnstile tokens are
 * single-use; action + cdata bind the token to this signed, expiring challenge. */
export async function verifyBot(request: Request, body: Record<string, unknown>, action: BotAction) {
  if (!secret()) return false
  try {
    if (typeof body.botChallenge !== 'string' || body.botChallenge.length > 2048) return false
    const [payload, signed, extra] = body.botChallenge.split('.')
    if (!payload || !signed || extra) return false
    const expected = Buffer.from(signature(payload)), received = Buffer.from(signed)
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return false
    const challenge = JSON.parse(Buffer.from(payload, 'base64url').toString())
    if (challenge.action !== action || challenge.expires < Date.now() || challenge.expires > Date.now() + 300_000) return false
    if (typeof body.botAnswer !== 'string' || !/^\d{1,2}$/.test(body.botAnswer.trim()) || Number(body.botAnswer) !== challenge.a + challenge.b) return false
    if (typeof body.botToken !== 'string' || !body.botToken || body.botToken.length > 2048) return false
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret: secret()!, response: body.botToken }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) return false
    const result = await response.json() as { success?: boolean; action?: string; cdata?: string; hostname?: string }
    const hosts = (process.env.TURNSTILE_HOSTNAMES || new URL(request.url).hostname).split(',').map((host) => host.trim())
    return result.success === true && result.action === action && result.cdata === challenge.nonce && hosts.includes(result.hostname ?? '')
  } catch {
    return false
  }
}
