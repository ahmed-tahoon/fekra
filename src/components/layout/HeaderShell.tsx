'use client'

import { useSyncExternalStore, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/**
 * Scroll position is browser state, not React state, so it is read with the
 * primitive built for that rather than a state-plus-effect pair — which is also
 * what keeps the initial render from flashing the wrong shape.
 */
const subscribe = (notify: () => void) => {
  window.addEventListener('scroll', notify, { passive: true })
  window.addEventListener('resize', notify)
  return () => {
    window.removeEventListener('scroll', notify)
    window.removeEventListener('resize', notify)
  }
}

// A boolean snapshot is referentially stable, so this never loops.
const getSnapshot = () => window.scrollY > 8
const getServerSnapshot = () => false

/**
 * The header is a floating pill at rest and spans the full width once the page
 * scrolls, per the approved design. Both states render the same markup — only
 * the shell's shape changes — so nothing remounts and focus is never lost
 * mid-interaction.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div
      data-scrolled={scrolled ? '' : undefined}
      className={cn(
        'sticky top-0 z-50 transition-[padding] duration-300 ease-[var(--ease-out-soft)]',
        scrolled ? 'px-0 pt-0' : 'px-3 pt-4 sm:px-5 sm:pt-6',
      )}
    >
      <div
        className={cn(
          'mx-auto flex items-center justify-between gap-6 backdrop-blur-md',
          'transition-[max-width,border-radius,background-color,box-shadow,padding] duration-300 ease-[var(--ease-out-soft)]',
          scrolled
            ? 'h-16 max-w-none rounded-none border-b border-border bg-background/85 px-4 shadow-none sm:px-8 lg:px-12'
            : 'h-20 max-w-[1200px] rounded-[40px] border border-transparent bg-white/70 px-4 shadow-[0_1px_4px_0_rgba(25,33,61,0.06)] sm:px-6 dark:bg-card/70',
        )}
      >
        {children}
      </div>
    </div>
  )
}
