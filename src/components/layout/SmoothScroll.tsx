'use client'

import type Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

/** Lerp-based smooth scrolling. Renders nothing; native scroll stays the source
 *  of truth, so scroll-driven CSS animations keep working. */
export function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // 17.8 / 23.5 — someone who asked for less motion gets untouched scrolling.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Imported here, not at module scope: nothing needs the library until after
    // hydration, and reduced-motion visitors never need it at all.
    let cancelled = false
    void import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return
      lenisRef.current = new LenisCtor({
        autoRaf: true,
        anchors: true,
        allowNestedScroll: true,
        // Calmer than the 0.1 default: the page keeps gliding a beat after the
        // wheel stops. Much below this and it reads as lag, not smoothness.
        lerp: 0.075,
        wheelMultiplier: 0.9,
      })
    })
    return () => {
      cancelled = true
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  /*
   * Next resets window scroll on soft navigation, but Lenis would lerp right
   * back to where it was — resync it to the top explicitly. Skips the initial
   * render (deep links, back/forward restore) and anchor navigations.
   */
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true, force: true })
  }, [pathname])

  return null
}
