import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * Section 11 — Arabic / English support.
 * Locale-prefixed routing (/en/..., /ar/...). English is the default.
 */
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

/** Text direction per locale (11.3 — LTR / RTL). */
export const localeDirection: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  ar: 'rtl',
};

/** Runtime type guard for an incoming locale segment. */
export function isValidLocale(value: unknown): value is Locale {
  return (
    typeof value === 'string' &&
    (routing.locales as readonly string[]).includes(value)
  );
}

// Locale-aware navigation helpers — use these instead of next/link & next/navigation.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
