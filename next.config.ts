import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

type RedirectEntry = { from: string; to: string; permanent?: boolean }
const redirectMap: RedirectEntry[] = JSON.parse(
  readFileSync(path.join(dirname, 'redirects.json'), 'utf8'),
)

/*
 * Say out loud which mode this build is in. Without it, a deploy missing
 * PAYLOAD_SECRET quietly ships a holding page and everyone wonders why the
 * site is "down".
 */
const isPostgresUrl = /^postgres(ql)?:\/\//.test(process.env.DATABASE_URL?.trim() ?? '')
const cmsConfigured = Boolean(process.env.PAYLOAD_SECRET?.trim()) && isPostgresUrl
const missingEnv = [
  !process.env.PAYLOAD_SECRET?.trim() && 'PAYLOAD_SECRET',
  !process.env.DATABASE_URL?.trim() && 'DATABASE_URL',
  process.env.DATABASE_URL?.trim() && !isPostgresUrl &&
    'DATABASE_URL (must start with postgres:// — the Supabase *project URL* is not a connection string)',
].filter(Boolean)

if (process.env.COMING_SOON === 'true') {
  console.log('\n  FEKRA build mode: HOLDING PAGE  (COMING_SOON=true)\n')
} else if (!cmsConfigured) {
  console.log(
    `\n  FEKRA build mode: HOLDING PAGE  — the CMS is not configured.\n` +
      `  Missing: ${missingEnv.join(', ')}\n` +
      `  Set them in your hosting provider to build the full site and enable /admin.\n`,
  )
} else {
  console.log('\n  FEKRA build mode: FULL SITE\n')
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
const S3_HOST = process.env.S3_PUBLIC_HOST // e.g. media.fekra-egy.com or <bucket>.r2.dev

/**
 * Baseline security headers (checklist 21.5).
 * CSP ships report-only until the real third-party inventory is frozen; flip
 * CSP_ENFORCE=true once GTM/Calendly/analytics hosts are confirmed on staging.
 */
const CSP = [
  "default-src 'self'",
  // next/script + GTM require inline+eval; Payload admin requires blob:.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://snap.licdn.com",
  "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.calendly.com https://px.ads.linkedin.com",
  "frame-src 'self' https://calendly.com https://*.calendly.com https://www.googletagmanager.com",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  /*
   * Only when enforcing: browsers ignore upgrade-insecure-requests in a
   * report-only policy and log a console warning for it on every page load.
   */
  ...(process.env.CSP_ENFORCE === 'true' ? ['upgrade-insecure-requests'] : []),
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: process.env.CSP_ENFORCE === 'true' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only',
    value: CSP,
  },
]

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /*
   * Prerender reads from Supabase through the transaction pooler, and nine
   * build workers hitting it at once can push a page past the 60s default.
   * That is a timeout, never a real error, but it fails the build all the same.
   */
  staticPageGenerationTimeout: 180,
  /*
   * Same pooler budget: it holds ~15 backend connections for the whole
   * project, and each build worker opens its own Payload pool (max 4). Nine
   * workers = 36 clients fighting for 15 slots → ECHECKOUTTIMEOUT after 60s.
   * Three workers (12 clients) leave room for a dev server alongside.
   */
  experimental: { cpus: 3 },
  // Trailing-slash policy is a canonical signal — keep it fixed forever (18.1/18.3).
  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    /*
     * Next 16 defaults this to 4 hours, so every optimised image is
     * re-requested several times a day — that is the bulk of Lighthouse's
     * "use efficient cache lifetimes". A /_next/image URL is keyed on its
     * source URL plus width and quality, so it only goes stale when the
     * source does, and CMS uploads get a fresh filename when re-uploaded.
     */
    minimumCacheTTL: 2678400, // 31 days
    // Setting localPatterns at all makes it an allow-list: anything not listed
    // is a 400 from /_next/image. Both CMS uploads and static brand assets.
    localPatterns: [{ pathname: '/cms-api/media/file/**' }, { pathname: '/images/**' }],
    /*
     * Payload returns ABSOLUTE media URLs (it knows its serverURL), so uploads
     * are matched here rather than by localPatterns. The protocol has to come
     * from SITE_URL — hardcoding https 400s every image in local development.
     */
    remotePatterns: [
      ...(S3_HOST ? [{ protocol: 'https' as const, hostname: S3_HOST }] : []),
      {
        protocol: new URL(SITE_URL).protocol.replace(':', '') as 'http' | 'https',
        hostname: new URL(SITE_URL).hostname,
        port: new URL(SITE_URL).port || undefined,
      },
    ],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Immutable, fingerprinted assets (17.10).
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      /*
       * Static brand assets. Next serves /public with `max-age=0`, so the
       * logos, icons and decor were revalidated on every navigation.
       * ponytail: these filenames are not content-hashed — rename the file
       * when you replace one, or a year-old copy stays in browser caches.
       */
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      /*
       * Internal working documents served from /public. They are readable by
       * anyone with the link — that is the point — but they are not part of the
       * marketing site, so keep them out of every index. robots.txt only covers
       * /admin, /cms-api and /api, and the proxy matcher skips anything with a
       * file extension, so this header is the only thing standing between an
       * internal board and a Google result.
       */
      {
        source: '/feedback-tasks.html',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ]
  },

  /**
   * WordPress -> Next 301 map (checklist 20.2/20.4). Single source of truth is
   * redirects.json so every redirect is single-hop and compiled into the router
   * with no runtime DB lookup. Regenerate with `pnpm check:links`.
   */
  async redirects() {
    return redirectMap.map((r) => ({
      source: r.from,
      destination: r.to,
      permanent: r.permanent !== false,
    }))
  },

  turbopack: { root: path.resolve(dirname) },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
