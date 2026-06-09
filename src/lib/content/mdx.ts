import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * File-based content layer (sections 9, 8).
 *
 * Content lives in /content/<collection>/<locale>/<slug>.mdx.
 * This module is the single seam between the site and its content source —
 * swapping to a headless CMS later means re-implementing only these readers.
 */
const CONTENT_ROOT = path.join(process.cwd(), 'content');

function collectionDir(collection: string, locale: string) {
  return path.join(CONTENT_ROOT, collection, locale);
}

export function readCollectionSlugs(collection: string, locale: string): string[] {
  const dir = collectionDir(collection, locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function readEntry(collection: string, locale: string, slug: string) {
  const file = path.join(collectionDir(collection, locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { data, body: content };
}

export function estimateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
