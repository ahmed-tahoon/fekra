import type { ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Shared blog cover band — the brand-blue tinted hero used by BOTH the blog
 * index and every article page, so the cover treatment lives in one place.
 *
 * Unlike the reference site this header is sticky rather than fixed-overlay, so
 * the band is not pulled up under it; everything else is identical.
 */
export function HeroBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        'relative bg-gradient-to-b from-blog-band-from via-blog-band-via to-blog-surface',
        'dark:from-blog-ink dark:via-blog-ink dark:to-blog-ink',
        className,
      )}
    >
      {/* decor clipped to the band; the section itself does NOT clip, so the
          topic dropdown can overflow below it instead of being cut off */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 end-1/4 h-80 w-80 rounded-full bg-blog-500/20 blur-3xl dark:bg-blog-500/12" />
        <div className="absolute -bottom-32 start-[-5rem] h-80 w-80 rounded-full bg-blog-300/15 blur-3xl dark:bg-blog-500/8" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
