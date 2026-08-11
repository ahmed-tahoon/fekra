type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

/**
 * Fixed-window limiter keyed by IP + route.
 *
 * ponytail: in-process Map — on serverless each instance keeps its own counter,
 * so the real ceiling is `limit x instances`. That is enough to stop a naive
 * script and it costs nothing. Swap in Upstash/Redis if a distributed limit is
 * ever needed (21.3).
 */
export function rateLimit(key: string, limit = 5, windowMs = 60_000): { ok: boolean; retryAfter: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, retryAfter: 0 }
  }

  bucket.count += 1
  if (bucket.count > limit) {
    return { ok: false, retryAfter: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  // Cheap eviction so the map cannot grow without bound.
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.resetAt <= now) buckets.delete(k)
  }

  return { ok: true, retryAfter: 0 }
}

/** Client IP behind Vercel/Cloudflare. Falls back to a constant, never throws. */
export function clientIp(request: Request): string {
  const direct = request.headers.get('cf-connecting-ip')?.trim()
  if (direct) return direct
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || 'unknown'
}
