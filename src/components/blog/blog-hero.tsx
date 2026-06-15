import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Shared blog cover band — the brand-blue tinted hero used by BOTH the blog
 * index and every article page, so the cover treatment lives in one place.
 * Pass the band's content (title, search, topics, or article header) as children.
 */
export function BlogHeroBand({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        // pull up under the fixed header's h-24 spacer + re-add the clearance as
        // padding, so the pale-blue cover sits seamlessly *under* the floating header
        'relative -mt-24 pt-24 bg-gradient-to-b from-[#e7f2fb] via-[#eef6fb] to-[#f5f9fc] dark:from-[#0b1120] dark:via-[#0b1120] dark:to-[#0b1120]',
        className,
      )}
    >
      {/* decor clipped to the band; the section itself does NOT clip, so dropdowns
          inside the cover can overflow below it instead of being cut off */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 end-1/4 h-80 w-80 rounded-full bg-[#489bc2]/20 blur-3xl dark:bg-[#489bc2]/12" />
        <div className="absolute -bottom-32 start-[-5rem] h-80 w-80 rounded-full bg-[#6fb4d4]/15 blur-3xl dark:bg-[#489bc2]/8" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
