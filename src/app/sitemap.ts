import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo/config';

// Single-page landing — only the localized home routes.
export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}`)])),
    },
  }));
}
