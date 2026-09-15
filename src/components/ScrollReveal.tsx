'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const TARGETS = 'section h2, section h3, section p, section .grid > *, [data-scroll-reveal]'

/** Progressive enhancement: only off-screen content is armed, once per route.
 * No scroll listeners or React updates; SSR and reduced-motion stay visible. */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main || !('IntersectionObserver' in window)) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const seen = new WeakSet<HTMLElement>()
    const armed = new Set<HTMLElement>()
    let frame = 0

    const reveal = (element: HTMLElement, animate = true) => {
      element.classList.remove('fk-reveal-pending')
      if (animate) element.classList.add('fk-reveal-in')
      else element.classList.remove('fk-reveal-in')
      armed.delete(element)
      observer.unobserve(element)
    }

    const observer = new IntersectionObserver((entries) => {
      // Stagger cards sharing a row, with a short cap so fast scrolling keeps up.
      let row = -Infinity
      let column = 0
      entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        .forEach((entry) => {
          if (Math.abs(entry.boundingClientRect.top - row) > 32) column = 0
          row = entry.boundingClientRect.top
          const element = entry.target as HTMLElement
          element.style.setProperty('--reveal-delay', `${Math.min(column++, 3) * 65}ms`)
          reveal(element, !motion.matches)
        })
    }, { rootMargin: '0px 0px -32px 0px', threshold: 0 })

    const scan = () => {
      frame = 0
      if (motion.matches) return
      const candidates = Array.from(main.querySelectorAll<HTMLElement>(TARGETS)).filter((element) =>
        !element.closest('[data-motion="hero"], [role="dialog"], [aria-hidden="true"]') ||
        element.hasAttribute('data-scroll-reveal'),
      )
      const selected = new Set(candidates)
      for (const element of candidates) {
        if (seen.has(element)) continue
        // A grid card owns its heading and copy; don't animate nested layers.
        let parent = element.parentElement
        while (parent && parent !== main && !selected.has(parent)) parent = parent.parentElement
        if (parent && selected.has(parent)) continue
        const rect = element.getBoundingClientRect()
        if (!rect.width || !rect.height) continue
        seen.add(element)
        // Never hide content already being read, including browser history restores.
        if (rect.top < window.innerHeight) continue
        element.classList.add('fk-reveal-pending')
        armed.add(element)
        observer.observe(element)
      }
    }

    const scheduleScan = () => {
      if (!frame) frame = requestAnimationFrame(scan)
    }
    // Covers streamed CMS sections and client-side route content.
    const mutations = new MutationObserver(scheduleScan)
    mutations.observe(main, { childList: true, subtree: true })
    const onPreference = () => {
      if (motion.matches) {
        armed.forEach((element) => reveal(element, false))
        main.querySelectorAll<HTMLElement>('.fk-reveal-in').forEach((element) => reveal(element, false))
      } else scheduleScan()
    }
    // Keyboard navigation must never land in a visually hidden card.
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const element = event.target.closest<HTMLElement>('.fk-reveal-pending')
        if (element) reveal(element, false)
      }
    }
    motion.addEventListener('change', onPreference)
    main.addEventListener('focusin', onFocus)
    scheduleScan()

    return () => {
      cancelAnimationFrame(frame)
      mutations.disconnect()
      observer.disconnect()
      motion.removeEventListener('change', onPreference)
      main.removeEventListener('focusin', onFocus)
      main.querySelectorAll<HTMLElement>('.fk-reveal-pending, .fk-reveal-in').forEach((element) => {
        element.classList.remove('fk-reveal-pending', 'fk-reveal-in')
        element.style.removeProperty('--reveal-delay')
      })
    }
  }, [pathname])

  return null
}
