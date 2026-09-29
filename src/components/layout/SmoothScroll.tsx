'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect, useLayoutEffect, useRef } from 'react'

import { splitLocale } from '@/i18n/routing'

/** Keeps route changes deterministic: every page opens at its beginning. */
export function SmoothScroll() {
  const pathname = usePathname()
  const lenis = useRef<Lenis | null>(null)

  useEffect(() => {
    const previous = history.scrollRestoration
    history.scrollRestoration = 'manual'
    return () => {
      history.scrollRestoration = previous
    }
  }, [])

  /*
   * Eased wheel/touch scrolling. `scroll-behavior: smooth` in globals.css only
   * ever animated anchor jumps — the wheel stayed native — and the .lenis rules
   * there were already written for this, waiting on the instance that creates
   * them.
   *
   * `autoRaf` runs the frame loop, `anchors` takes over hash links; the -96px
   * offset is the same 6rem scroll-padding-top the CSS fallback uses, because
   * Lenis scrolls the window itself and scroll-padding no longer applies.
   *
   * Reduced motion gets no instance at all rather than a shorter animation:
   * this hijacks the wheel, which is exactly what that preference is asking us
   * not to do, and the CSS media query cannot switch off a JS scroller.
   */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const instance = new Lenis({ autoRaf: true, anchors: { offset: -96 } })
    lenis.current = instance
    return () => {
      lenis.current = null
      instance.destroy()
    }
  }, [])

  useEffect(() => {
    const returnHome = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const target = new URL(anchor.href, location.href)
      if (target.origin !== location.origin || target.pathname !== location.pathname || splitLocale(target.pathname).rest !== '/' || target.hash) return
      if (lenis.current) lenis.current.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo({ top: 0, behavior: 'instant' })
    }
    // Capture runs before Next Link handles an already-active route.
    document.addEventListener('click', returnHome, true)
    return () => document.removeEventListener('click', returnHome, true)
  }, [])

  useLayoutEffect(() => {
    const reset = () => {
      // Lenis holds its own scroll position and animates towards it, so writing
      // scrollTop behind its back leaves the two disagreeing: the page sits at
      // the top while Lenis still believes it is wherever the last page was,
      // and the first wheel tick snaps back down. `immediate` keeps the jump
      // instant — a new page gliding up from the previous page's offset is the
      // opposite of deterministic.
      if (lenis.current) {
        lenis.current.scrollTo(0, { immediate: true, force: true })
        return
      }
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
