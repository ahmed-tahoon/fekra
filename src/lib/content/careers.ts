import 'server-only';
import type { Locale } from '@/i18n/routing';
import type { Job, JobFrontmatter } from './types';
import { readCollectionSlugs, readEntry } from './mdx';

const COLLECTION = 'careers';
const isProd = process.env.NODE_ENV === 'production';

function toJob(slug: string, data: JobFrontmatter, body: string): Job {
  return { ...data, slug, body };
}

export function getAllJobs(locale: Locale): Job[] {
  return readCollectionSlugs(COLLECTION, locale)
    .map((slug) => {
      const entry = readEntry(COLLECTION, locale, slug);
      if (!entry) return null;
      return toJob(slug, entry.data as JobFrontmatter, entry.body);
    })
    .filter((j): j is Job => j !== null)
    .filter((j) => !isProd || !j.draft)
    .sort((a, b) => +new Date(b.datePosted) - +new Date(a.datePosted));
}

export function getJobBySlug(locale: Locale, slug: string): Job | null {
  const entry = readEntry(COLLECTION, locale, slug);
  if (!entry) return null;
  return toJob(slug, entry.data as JobFrontmatter, entry.body);
}
