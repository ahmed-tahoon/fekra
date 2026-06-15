'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/content/blog';
import { cn } from '@/lib/utils';

export function TableOfContents({ headings, title }: { headings: Heading[]; title: string }) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (headings.length === 0) return;
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: [0, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={title} className="text-[0.95rem]">
      <p className="mb-4 flex items-center gap-2.5 text-lg font-bold text-slate-900 dark:text-white">
        <span className="inline-block h-5 w-1.5 rounded-full bg-[#489bc2]" aria-hidden />
        {title}
      </p>
      <ul className="relative space-y-3">
        {/* vertical rail connecting the markers */}
        <span aria-hidden className="absolute inset-y-1.5 start-[4.5px] z-0 w-0.5 rounded-full bg-slate-200 dark:bg-white/10" />
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className="relative z-10">
              <a
                href={`#${h.id}`}
                className={cn(
                  'flex gap-3 leading-relaxed transition-colors',
                  h.depth === 3 && 'ps-6',
                  isActive
                    ? 'font-semibold text-[#2f7fb0] dark:text-[#7cc3e3]'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'mt-[0.45em] shrink-0 rounded-full transition-all',
                    h.depth === 3
                      ? cn('h-1.5 w-1.5', isActive ? 'bg-[#489bc2]' : 'bg-slate-300 dark:bg-white/25')
                      : cn('h-2.5 w-2.5', isActive ? 'bg-[#489bc2] ring-4 ring-[#489bc2]/15' : 'bg-[#489bc2]/45'),
                  )}
                />
                <span>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
