import { createChallenge } from '@/lib/bot-protection'
import { clientIp, rateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export async function GET(request: Request) {
  const limit = rateLimit(`challenge:${clientIp(request)}`, 60, 60_000)
  if (!limit.ok) return Response.json({ error: 'rate_limited' }, { status: 429 })
  const challenge = createChallenge(new URL(request.url).searchParams.get('action') ?? '')
  return Response.json(challenge ?? { error: 'unavailable' }, {
    status: challenge ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  })
}
