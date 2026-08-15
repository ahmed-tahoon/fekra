'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Marks `.fk-reveal` wrappers with `.is-in` as they enter the viewport; the
 * transitions themselves live in globals.css. One-shot per section — content
 * never hides again on scroll-up. Re-runs per route so new sections observe.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        }
      },
      // A section counts as "in" once its top clears ~12% above the fold.
      { rootMargin: '0px 0px -12% 0px' },
    )
    document.querySelectorAll('.fk-reveal:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
