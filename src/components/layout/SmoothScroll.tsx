'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'

/** Lerp-based smooth scrolling. Renders nothing; native scroll stays the source
 *  of truth, so scroll-driven CSS animations keep working. */
export function SmoothScroll() {
  useEffect(() => {
    // 17.8 / 23.5 — someone who asked for less motion gets untouched scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true })
    return () => lenis.destroy()
  }, [])
  return null
}
