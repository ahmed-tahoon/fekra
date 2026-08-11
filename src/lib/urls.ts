import { DEFAULT_LOCALE, LOCALES, type Locale, localeHref } from '@/i18n/routing'

/** Collection slug -> public path prefix. Single source of truth for URLs. */
export const PATH_PREFIX = {
  pages: '',
  posts: '/blog',
  services: '/services',
  jobs: '/careers',
} as const

export type LinkableCollection = keyof typeof PATH_PREFIX

/** Path without locale prefix, e.g. `/blog/hello` or `/about`. */
export function documentPath(collection: LinkableCollection, slug: string): string {
  if (collection === 'pages') return slug === 'home' ? '/' : `/${slug}`
  return `${PATH_PREFIX[collection]}/${slug}`
}

/** Public href for one locale, e.g. `/ar/blog/hello`. */
export function documentHref(collection: LinkableCollection, slug: string, locale: Locale): string {
  return localeHref(locale, documentPath(collection, slug))
}

/** Every locale variant of a path — used for hreflang and cache revalidation. */
export function allLocaleHrefs(path: string): Record<Locale, string> {
  return Object.fromEntries(LOCALES.map((l) => [l, localeHref(l, path)])) as Record<Locale, string>
}

export const siteUrl = (): string =>
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

/**
 * Absolute URL for canonical tags, sitemaps, OG and JSON-LD (18.3).
 * The root is emitted without a trailing slash so the canonical tag, the
 * sitemap and the schema all agree on one spelling (19.11).
 */
export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const href = localeHref(locale, path)
  return `${siteUrl()}${href === '/' ? '' : href}`
}
