import type { Locale } from '@/i18n/routing';

/** Localised, readable date (Arabic gets Arabic month names + digits). */
export function formatDate(date: string, locale: Locale): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}
