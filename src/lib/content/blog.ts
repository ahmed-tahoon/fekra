import 'server-only';
import type { Locale } from '@/i18n/routing';
import type { BlogFrontmatter, BlogPost } from './types';
import {
  readCollectionSlugs,
  readEntry,
  estimateReadingTime,
} from './mdx';

const COLLECTION = 'blog';
const isProd = process.env.NODE_ENV === 'production';

function toPost(slug: string, data: BlogFrontmatter, body: string): BlogPost {
  return {
    ...data,
    slug,
    body,
    readingTimeMinutes: estimateReadingTime(body),
  };
}

export function getAllPosts(locale: Locale): BlogPost[] {
  return readCollectionSlugs(COLLECTION, locale)
    .map((slug) => {
      const entry = readEntry(COLLECTION, locale, slug);
      if (!entry) return null;
      return toPost(slug, entry.data as BlogFrontmatter, entry.body);
    })
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => !isProd || !p.draft)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | null {
  const entry = readEntry(COLLECTION, locale, slug);
  if (!entry) return null;
  return toPost(slug, entry.data as BlogFrontmatter, entry.body);
}

/** 9.2 — related posts by shared category/tags. */
export function getRelatedPosts(locale: Locale, post: BlogPost, limit = 3) {
  return getAllPosts(locale)
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const sharedTags = (p.tags ?? []).filter((t) =>
        (post.tags ?? []).includes(t),
      ).length;
      const sameCategory = p.category === post.category ? 1 : 0;
      return { post: p, score: sharedTags + sameCategory };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}
