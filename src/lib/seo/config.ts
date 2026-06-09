import type { Locale } from '@/i18n/routing';

export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  name: 'Fekra',
  legalName: 'Fekra',
  twitter: '@fekra',
  defaultOgImage: '/og/default.png',
  sameAs: [
    // 14.5 — organization schema sameAs profiles
    'https://www.linkedin.com/company/fekra',
  ],
} as const;

export function absoluteUrl(path = '') {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** hreflang alternates for a given path (11.x / 14.x international SEO). */
export function localeAlternates(pathWithoutLocale: string) {
  const languages: Record<string, string> = {};
  (['en', 'ar'] as Locale[]).forEach((l) => {
    languages[l] = absoluteUrl(`/${l}${pathWithoutLocale}`);
  });
  return { languages };
}
