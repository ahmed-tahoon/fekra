'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import type { PostMeta } from '@/lib/content/blog';
import { Cover } from './cover';
import { MagicLoader } from './magic-loader';
import { formatDate } from './format';

export function PostCard({
  post,
  locale,
}: {
  post: PostMeta;
  locale: Locale;
  // kept optional so the (currently commented-out) reading-time footer can be re-enabled
  minReadLabel?: string;
}) {
  const [loading, setLoading] = useState(false);

  // Show the loader on THIS card the moment one of its links is clicked (ignore
  // new-tab/modifier clicks and clicks on non-link areas, which don't navigate).
  // The card unmounts when the article opens, so the loader clears itself.
  const onClick = (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (!(e.target as HTMLElement).closest('a')) return;
    setLoading(true);
  };

  return (
    <article
      onClick={onClick}
      className="group relative flex flex-col rounded-3xl bg-white p-3 shadow-[0_10px_40px_-28px_rgba(15,23,42,0.35)] ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)] dark:bg-white/[0.04] dark:ring-white/10"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden rounded-2xl shadow-[0_16px_36px_-22px_rgba(15,23,42,0.5)] ring-1 ring-black/[0.04] dark:ring-white/5"
      >
        <Cover
          category={post.category}
          title={post.title}
          image={post.coverImage}
          className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.06]"
        />
      </Link>

      <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full border border-[#489bc2]/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-[#2f7fb0]">
            {post.category}
          </span>
          <span className="text-sm text-slate-400">{formatDate(post.date, locale)}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-[#2f7fb0] dark:text-white">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        <p className="mt-3 line-clamp-3 text-[15px] leading-7 text-slate-500 dark:text-slate-400">
          {post.description}
        </p>
      </div>

      {/* in-card magic loader — appears on click, stays until the article opens */}
      {loading && (
        <div
          className="vf-step-in absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-white/75 backdrop-blur-sm dark:bg-[#0b1120]/75"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <MagicLoader className="w-28" />
        </div>
      )}
    </article>
  );
}
