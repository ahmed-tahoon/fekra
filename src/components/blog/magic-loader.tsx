import { cn } from '@/lib/utils';

/**
 * Loader — the supplied bouncing-dots animation (SMIL plays via <img>), served
 * as a static asset. Shared by the article route's loading.tsx and the in-card
 * loader. Size it with `className` (defaults to a card-friendly width).
 */
export function MagicLoader({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static animated SVG; no optimization needed
    <img src="/images/blog/loader.svg" alt="" aria-hidden className={cn('h-auto w-24 select-none', className)} />
  );
}
