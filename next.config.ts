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
  'upgrade-insecure-requests',
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
  // Trailing-slash policy is a canonical signal — keep it fixed forever (18.1/18.3).
  trailingSlash: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    // Setting localPatterns at all makes it an allow-list: anything not listed
    // is a 400 from /_next/image. Both CMS uploads and static brand assets.
    localPatterns: [{ pathname: '/cms-api/media/file/**' }, { pathname: '/images/**' }],
    remotePatterns: [
      ...(S3_HOST ? [{ protocol: 'https' as const, hostname: S3_HOST }] : []),
      { protocol: 'https', hostname: new URL(SITE_URL).hostname },
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
