/**
 * Locale contract for the whole app (checklist 14.1 - 14.5).
 *
 * URL policy: `as-needed` prefixing. English is served unprefixed so every
 * existing WordPress English URL is preserved byte-for-byte (20.3); every other
 * locale gets a stable crawlable prefix (14.2).
 *
 *   /about        -> en
 *   /ar/about     -> ar   (dir=rtl)
 *   /de/about     -> de
 */
export const LOCALES = ['en', 'ar', 'de', 'fr', 'es'] as const
export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** Locales that render right-to-left (14.4). */
const RTL_LOCALES = new Set<Locale>(['ar'])

export const LOCALE_META: Record<Locale, { label: string; english: string; hreflang: string }> = {
  en: { label: 'English', english: 'English', hreflang: 'en' },
  ar: { label: 'العربية', english: 'Arabic', hreflang: 'ar' },
  de: { label: 'Deutsch', english: 'German', hreflang: 'de' },
  fr: { label: 'Français', english: 'French', hreflang: 'fr' },
  es: { label: 'Español', english: 'Spanish', hreflang: 'es' },
}

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value)

/**
 * The locales the public site actually serves. LOCALES is what the CMS stores
 * content in; this is the subset that gets routed, linked, advertised in
 * hreflang/sitemap, and offered in the switcher.
 *
 * English only for now. Widen this one array to bring the others back — the
 * switcher hides itself while there is nothing to switch to.
 */
export const PUBLIC_LOCALES: readonly Locale[] = ['en']

/* Plain boolean, not a type predicate: PUBLIC_LOCALES is a runtime subset of
   the same type, so narrowing on it would collapse the negated branch to never. */
export const isPublicLocale = (value: string | undefined): boolean =>
  !!value && (PUBLIC_LOCALES as readonly string[]).includes(value)

export const dir = (locale: Locale): 'rtl' | 'ltr' => (RTL_LOCALES.has(locale) ? 'rtl' : 'ltr')

/** Build a public href for a locale. `/about` for en, `/ar/about` for the rest. */
export function localeHref(locale: Locale, pathname = '/'): string {
  const clean = pathname === '/' ? '' : pathname.startsWith('/') ? pathname : `/${pathname}`
  return locale === DEFAULT_LOCALE ? clean || '/' : `/${locale}${clean}`
}

/** Inverse of localeHref: split an incoming pathname into locale + rest. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const [, maybe, ...others] = pathname.split('/')
  if (isLocale(maybe)) {
    const rest = `/${others.join('/')}`.replace(/\/$/, '')
    return { locale: maybe, rest: rest || '/' }
  }
  return { locale: DEFAULT_LOCALE, rest: pathname || '/' }
}

/**
 * Pick the best locale from an Accept-Language header. Used only for the very
 * first visit to `/`; never overrides an explicit locale in the URL (14.9).
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE
  const ranked = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag = '', ...params] = part.trim().split(';')
      const q = params.find((p) => p.trim().startsWith('q='))
      return { tag: tag.toLowerCase(), q: q ? Number(q.split('=')[1]) || 0 : 1 }
    })
    .sort((a, b) => b.q - a.q)

  for (const { tag } of ranked) {
    const base = tag.split('-')[0]
    if (isLocale(base)) return base
  }
  return DEFAULT_LOCALE
}
