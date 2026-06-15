import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';
import type { Locale } from '@/i18n/routing';

export type Heading = { depth: 2 | 3; text: string; id: string };

/**
 * Extract H2/H3 headings with the SAME slugs rehype-slug produces, so the
 * table of contents anchors line up with the rendered heading ids.
 */
export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  // Ignore fenced code blocks so "# comments" inside code aren't treated as headings.
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const depth = match[1]!.length;
    const text = match[2]!.replace(/[*_`]/g, '').trim();
    const id = slugger.slug(text); // advance slugger for every heading to match rehype-slug
    if (depth === 2 || depth === 3) headings.push({ depth, text, id });
  }
  return headings;
}

/**
 * Blog content reader (Item 6.1 — MDX in-repo). Swapping to a headless CMS
 * later only changes this file.
 */

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostMeta = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage?: string;
  readingTime: number; // minutes
};

export type Post = PostMeta & { content: string };

function localeDir(locale: Locale) {
  return path.join(BLOG_DIR, locale);
}

function readingTimeFor(content: string) {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const COVER_COUNT = 8;
function hashStr(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}
/** Deterministic real cover photo per post (slug-stable). */
function coverFor(slug: string): string {
  return `/images/blog/cover-${(hashStr(slug) % COVER_COUNT) + 1}.webp`;
}

function parseFile(locale: Locale, slug: string): Post | null {
  const file = path.join(localeDir(locale), `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug,
    locale,
    title: String(data.title ?? slug),
    description: String(data.description ?? ''),
    date: String(data.date ?? ''),
    author: String(data.author ?? 'Fekra'),
    category: String(data.category ?? 'General'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    coverImage: data.coverImage ? String(data.coverImage) : coverFor(slug),
    readingTime: readingTimeFor(content),
    content,
  };
}

export function getAllSlugs(locale: Locale): string[] {
  const dir = localeDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPost(locale: Locale, slug: string): Post | null {
  return parseFile(locale, slug);
}

function toMeta(p: Post): PostMeta {
  return {
    slug: p.slug,
    locale: p.locale,
    title: p.title,
    description: p.description,
    date: p.date,
    author: p.author,
    category: p.category,
    tags: p.tags,
    coverImage: p.coverImage,
    readingTime: p.readingTime,
  };
}

/** All posts for a locale, newest first (metadata only — no body). */
export function getAllPosts(locale: Locale): PostMeta[] {
  return getAllSlugs(locale)
    .map((slug) => parseFile(locale, slug))
    .filter((p): p is Post => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(toMeta);
}

export function getCategories(locale: Locale): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts(locale)) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

/** Related posts: same category first, then most-recent, excluding the current. */
export function getRelatedPosts(locale: Locale, slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts(locale);
  const current = all.find((p) => p.slug === slug);
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
