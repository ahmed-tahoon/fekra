import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { absoluteUrl } from '@/lib/seo/config';
import { getAllPosts } from '@/lib/content/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(`/${l}`)]));
    entries.push({ url: absoluteUrl(`/${locale}`), lastModified: new Date(), alternates: { languages } });
    entries.push({ url: absoluteUrl(`/${locale}/blog`), lastModified: new Date() });

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: absoluteUrl(`/${locale}/blog/${post.slug}`),
        lastModified: post.date ? new Date(post.date) : new Date(),
      });
    }
  }

  return entries;
}
