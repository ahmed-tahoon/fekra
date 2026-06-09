import type { Locale } from '@/i18n/routing';

export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  tags?: string[];
  coverImage?: string;
  locale: Locale;
  /** SEO overrides (9.3) */
  seoTitle?: string;
  seoDescription?: string;
  draft?: boolean;
}

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  body: string;
  readingTimeMinutes: number;
}

export interface JobFrontmatter {
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  summary: string;
  datePosted: string;
  locale: Locale;
  draft?: boolean;
}

export interface Job extends JobFrontmatter {
  slug: string;
  body: string;
}
