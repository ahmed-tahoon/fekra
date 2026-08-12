/**
 * Is the public site closed?
 *
 * Two ways in, and the second one matters more than it looks:
 *
 *  1. `COMING_SOON=true` — a deliberate choice, works with a healthy CMS.
 *  2. The CMS is not configured at all.
 *
 * Without `PAYLOAD_SECRET` and `DATABASE_URL` there is no site to serve: every
 * page reads content from Payload, so the alternatives are a holding page or a
 * build that dies partway through prerendering with 43 identical stack traces.
 * A holding page is strictly better than a 500, and it means a fresh Vercel
 * project deploys successfully before any infrastructure exists.
 *
 * This is not a silent default — `describeSiteMode()` is printed during the
 * build so nobody has to guess which branch they are on.
 */
export const isCmsConfigured = (): boolean =>
  Boolean(process.env.PAYLOAD_SECRET?.trim()) && Boolean(process.env.DATABASE_URL?.trim())

export const isComingSoon = (): boolean => process.env.COMING_SOON === 'true' || !isCmsConfigured()

export function describeSiteMode(): string {
  if (process.env.COMING_SOON === 'true') return 'holding page (COMING_SOON=true)'
  if (!isCmsConfigured()) {
    const missing = [
      !process.env.PAYLOAD_SECRET?.trim() && 'PAYLOAD_SECRET',
      !process.env.DATABASE_URL?.trim() && 'DATABASE_URL',
    ].filter(Boolean)
    return `holding page — CMS not configured, missing: ${missing.join(', ')}`
  }
  return 'full site'
}
