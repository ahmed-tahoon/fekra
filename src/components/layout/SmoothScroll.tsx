'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect } from 'react'

/** Keeps route changes deterministic: every page opens at its beginning. */
export function SmoothScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  useLayoutEffect(() => {
    const reset = () => {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      window.scrollTo(0, 0)
    }

    // Reset before paint, then once more after Next commits the destination.
    // The second pass handles pages whose streamed content changes the scroll
    // range during the same navigation without producing a visible glide.
    reset()
    const frame = requestAnimationFrame(reset)
    return () => cancelAnimationFrame(frame)
  }, [pathname])

  return null
}
