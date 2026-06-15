'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/i18n/routing';
import type { PostMeta } from '@/lib/content/blog';
import { Container } from '@/components/ui/container';
import { PostCard } from './post-card';
import { BlogHeroBand } from './blog-hero';
import { TopicPills } from './topic-pills';

/** A post belongs to a topic if its category or any tag matches (case-insensitive). */
function matchesTopic(post: PostMeta, topic: string): boolean {
  const t = topic.toLowerCase();
  return post.category.toLowerCase() === t || post.tags.some((tag) => tag.toLowerCase() === t);
}

export function BlogIndex({ posts, locale }: { posts: PostMeta[]; locale: Locale }) {
  const t = useTranslations('Blog');
  const [active, setActive] = useState<string>('all');
  const [query, setQuery] = useState('');
  const minRead = t('minRead');
  const topics = t.raw('topics') as string[];
  const moreTopics = t.raw('moreTopics') as string[];

  const q = query.trim().toLowerCase();

  const grid = useMemo(() => {
    const base = active === 'all' ? posts : posts.filter((p) => matchesTopic(p, active));
    return q
      ? base.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.tags.some((tag) => tag.toLowerCase().includes(q)),
        )
      : base;
  }, [active, posts, q]);

  return (
    <>
      {/* ── Cover band (shared, brand-blue) ── */}
      <BlogHeroBand>
        <Container className="max-w-[1700px] py-14 sm:py-20 lg:px-12">
          <div className="grid items-start gap-8 lg:grid-cols-[1.5fr_minmax(0,1fr)]">
            <h1 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white">
              {t('heroCountPre')} <span className="text-[#489bc2]">{posts.length}+</span>
              <br />
              <span className="text-[#489bc2]">{t('heroCountWord')}</span> {t('heroCountPost')}
            </h1>
            <div className="relative w-full max-w-md lg:justify-self-end">
              <svg viewBox="0 0 24 24" className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                <path d="m20 20-3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                aria-label={t('searchPlaceholder')}
                className="w-full rounded-full border border-slate-200 bg-white py-3 pe-4 ps-11 text-base text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#489bc2] focus:ring-2 focus:ring-[#489bc2]/20 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              />
            </div>
          </div>

          {/* static topic taxonomy + More dropdown */}
          <div className="mt-9">
            <TopicPills
              topics={topics}
              moreTopics={moreTopics}
              allLabel={t('allCategories')}
              moreLabel={t('more')}
              active={active}
              onSelect={setActive}
            />
          </div>
        </Container>
      </BlogHeroBand>

      {/* ── Posts ── */}
      <section className="bg-[#f5f9fc] py-14 dark:bg-[#0b1120]">
        <Container className="max-w-[1700px] lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {grid.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} minReadLabel={minRead} />
            ))}
          </div>

          {grid.length === 0 && <p className="mt-16 text-center text-slate-500 dark:text-slate-400">{t('noPosts')}</p>}
        </Container>
      </section>
    </>
  );
}
