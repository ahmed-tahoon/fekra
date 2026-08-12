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
/**
 * Payload speaks Postgres, not the Supabase REST API. Pasting the project URL
 * (https://<ref>.supabase.co) into DATABASE_URL is an easy mistake and the
 * runtime error for it is a bare "cannot connect to Postgres. Details:".
 */
export const isPostgresUrl = (url: string | undefined): boolean =>
  /^postgres(ql)?:\/\//.test(url?.trim() ?? '')

export const isCmsConfigured = (): boolean =>
  Boolean(process.env.PAYLOAD_SECRET?.trim()) && isPostgresUrl(process.env.DATABASE_URL)

export const isComingSoon = (): boolean => process.env.COMING_SOON === 'true' || !isCmsConfigured()

export function describeSiteMode(): string {
  if (process.env.COMING_SOON === 'true') return 'holding page (COMING_SOON=true)'
  if (!isCmsConfigured()) {
    if (process.env.DATABASE_URL?.trim() && !isPostgresUrl(process.env.DATABASE_URL)) {
      return (
        'holding page — DATABASE_URL is not a Postgres connection string. ' +
        'It must start with postgres:// — the Supabase project URL is not it; ' +
        'use Settings > Database > Connection string (Transaction pooler).'
      )
    }
    const missing = [
      !process.env.PAYLOAD_SECRET?.trim() && 'PAYLOAD_SECRET',
      !process.env.DATABASE_URL?.trim() && 'DATABASE_URL',
    ].filter(Boolean)
    return `holding page — CMS not configured, missing: ${missing.join(', ')}`
  }
  return 'full site'
}

/**
 * Is DATABASE_URL pointing at a database on this machine?
 *
 * Drizzle's dev-mode `push` diffs the config against the live schema on every
 * start. Against a local database that is instant and convenient; against a
 * remote one it introspects 407 tables over the network — slow enough to hang
 * the dev server — and, far worse, it would happily push schema changes into
 * production. Schema changes belong in migrations.
 */
export const isLocalDatabase = (): boolean =>
  /@(localhost|127\.0\.0\.1|\[::1\]|db|host\.docker\.internal)[:/]/.test(process.env.DATABASE_URL ?? '')
