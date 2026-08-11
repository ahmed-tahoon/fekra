import { NextResponse, type NextRequest } from 'next/server'

import { DEFAULT_LOCALE, LOCALES, isLocale, negotiateLocale } from '@/i18n/routing'

const LOCALE_COOKIE = 'NEXT_LOCALE'

/**
 * Holding-page mode. Opt-in via env so it can never switch itself on at launch:
 * an unset variable means the real site. The CMS (/admin, /cms-api) and the API
 * routes are already excluded by the matcher below, so editors keep working
 * while the public site is closed.
 */
const COMING_SOON = process.env.COMING_SOON === 'true'
const SOON_PATH = '/coming-soon'

/**
 * Locale routing + staging indexing guard (Next 16 `proxy` convention).
 *
 * URL policy (see i18n/routing.ts): English is unprefixed, other locales are
 * prefixed. Internally every page renders under /[locale]/..., so unprefixed
 * requests are *rewritten* (URL stays clean) and /en/* is *redirected* away so
 * only one indexable URL exists per page (18.3).
 */
export default function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (COMING_SOON) {
    // Rewrite, not redirect: every URL keeps working and starts serving the
    // real page the moment the flag is turned off, with nothing cached as a 3xx.
    if (pathname === SOON_PATH) return NextResponse.next()
    const response = NextResponse.rewrite(new URL(SOON_PATH, request.url))
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  // /en/about -> /about (301). Never leave two live URLs for the same content.
  if (pathname === `/${DEFAULT_LOCALE}` || pathname.startsWith(`/${DEFAULT_LOCALE}/`)) {
    const stripped = pathname.slice(`/${DEFAULT_LOCALE}`.length) || '/'
    return withGuards(NextResponse.redirect(new URL(stripped + search, request.url), 308), request)
  }

  const segment = pathname.split('/')[1]

  // Already a prefixed locale (/ar/..., /de/...) — render as-is.
  if (isLocale(segment) && segment !== DEFAULT_LOCALE) {
    const response = NextResponse.next()
    response.cookies.set(LOCALE_COOKIE, segment, { path: '/', sameSite: 'lax', maxAge: 31536000 })
    return withGuards(response, request)
  }

  // Bare "/" with a remembered or negotiated non-default locale -> send there once.
  if (pathname === '/') {
    const remembered = request.cookies.get(LOCALE_COOKIE)?.value
    const preferred = isLocale(remembered)
      ? remembered
      : negotiateLocale(request.headers.get('accept-language'))
    if (preferred !== DEFAULT_LOCALE) {
      return withGuards(NextResponse.redirect(new URL(`/${preferred}${search}`, request.url), 307), request)
    }
  }

  // Unprefixed path -> render the English tree without changing the visible URL.
  const response = NextResponse.rewrite(new URL(`/${DEFAULT_LOCALE}${pathname}${search}`, request.url))
  return withGuards(response, request)
}

/** Staging must never be indexable (3.4) — enforced at the edge, not in a meta tag. */
function withGuards(response: NextResponse, request: NextRequest) {
  if (process.env.NEXT_PUBLIC_ENV !== 'production') {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  response.headers.set('x-pathname', request.nextUrl.pathname)
  return response
}

export const config = {
  // Everything except Payload admin/API, Next internals, and files with an extension.
  matcher: ['/((?!api|cms-api|admin|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
}

export const SUPPORTED = LOCALES
