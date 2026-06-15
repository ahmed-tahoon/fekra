'use client';

import { useEffect, useState } from 'react';
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { SiteNav } from './site-nav';

/**
 * Floating homepage header. It starts life as a centered, rounded "pill" that
 * sits a little below the top edge, and on scroll it smoothly *expands to the
 * full viewport width* — corners flatten, the side gutters close, and a solid
 * glass background + bottom hairline fade in. All driven by CSS transitions on
 * a single `scrolled` flag for a buttery motion.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // The homepage hero sits *under* the fixed header (it has its own top padding).
  // Every other page needs a spacer so content isn't hidden behind it.
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
      {/* Outer track: animates the side gutters + top offset shut on scroll. */}
      <div
        className={cn(
          'mx-auto transition-[max-width,padding] duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)]',
          scrolled ? 'max-w-full px-0 pt-0' : 'max-w-6xl px-4 pt-3 sm:pt-4',
        )}
      >
        {/* Inner bar: animates border-radius, background + shadow on scroll. */}
        <div
          className={cn(
            'relative flex items-center justify-between gap-4 border transition-[border-radius,background-color,box-shadow,padding,border-color] duration-500 ease-[cubic-bezier(0.22,0.8,0.24,1)]',
            scrolled
              ? 'rounded-none border-x-0 border-t-0 border-slate-200/80 bg-white/85 px-4 py-2.5 shadow-[0_6px_24px_-14px_rgba(15,23,42,0.35)] backdrop-blur-xl sm:px-8 dark:border-white/10 dark:bg-[#0b1120]/85'
              : 'rounded-full border-slate-200/70 bg-white/80 px-3 py-2 shadow-[0_18px_50px_-22px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:px-4 dark:border-white/10 dark:bg-[#0b1120]/75',
          )}
        >
          <SiteNav scrolled={scrolled} />
        </div>
      </div>
      </header>
      {!isHome && <div aria-hidden className="h-24" />}
    </>
  );
}
