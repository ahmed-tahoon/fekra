'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * The header is a floating pill at rest and spans the full width once the page
 * scrolls, per the approved design.
 *
 * Scroll state is written to a data attribute and styled in CSS rather than
 * held in React state. Two reasons, and the first one is not theoretical:
 * `useSyncExternalStore` reads the snapshot during render and React reads it
 * twice to check consistency — mid-scroll those reads disagree, and the retry
 * loop throws inside the layout, which escapes every error boundary and takes
 * the whole page down. Second, this way a scroll never re-renders the tree at
 * all, so it costs nothing on the main thread (17.8).
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const shell = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      shell.current?.setAttribute('data-scrolled', String(window.scrollY > 8))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      ref={shell}
      data-scrolled="false"
      className="group/header sticky top-0 z-50 px-3 pt-4 transition-[padding] duration-300 ease-[var(--ease-out-soft)] data-[scrolled=true]:px-0 data-[scrolled=true]:pt-0 sm:px-5 sm:pt-6 sm:data-[scrolled=true]:px-0 sm:data-[scrolled=true]:pt-0"
    >
      <div
        className={[
          'mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-6 rounded-[40px]',
          'border border-transparent bg-white/70 px-4 shadow-[0_1px_4px_0_rgba(25,33,61,0.06)] backdrop-blur-md sm:px-6 dark:bg-card/70',
          'transition-[max-width,border-radius,background-color,box-shadow,height,padding] duration-300 ease-[var(--ease-out-soft)]',
          // Scrolled: edge to edge, squared off, sitting on a hairline.
          'group-data-[scrolled=true]/header:h-16 group-data-[scrolled=true]/header:max-w-none',
          'group-data-[scrolled=true]/header:rounded-none group-data-[scrolled=true]/header:border-b-border',
          'group-data-[scrolled=true]/header:bg-background/85 group-data-[scrolled=true]/header:shadow-none',
          'group-data-[scrolled=true]/header:lg:px-12',
        ].join(' ')}
      >
        {children}
      </div>
    </div>
  )
}
