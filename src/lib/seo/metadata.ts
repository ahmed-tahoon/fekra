import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { siteConfig, absoluteUrl, localeAlternates } from './config';

type BuildMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  /** Path WITHOUT the locale prefix, e.g. "/blog/my-post". */
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
};

/**
 * Section 14.2 — centralised metadata builder.
 * Produces canonical, Open Graph, Twitter, and hreflang alternates consistently.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  ogImage = siteConfig.defaultOgImage,
  type = 'website',
}: BuildMetadataArgs): Metadata {
  const canonical = absoluteUrl(`/${locale}${path}`);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: localeAlternates(path).languages,
    },
    openGraph: {
      type,
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      locale: locale === 'ar' ? 'ar_AR' : 'en_US',
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  };
}
