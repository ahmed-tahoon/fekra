'use client'

import { useEffect, useRef } from 'react'

/**
 * Thin brand bar that fills as the article is read.
 *
 * Writes the width straight to the DOM instead of through state: this fires on
 * every scroll frame, and a re-render per frame is exactly the kind of
 * main-thread work that shows up as poor INP (17.8).
 */
export function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const pct = max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0
      if (bar.current) bar.current.style.transform = `scaleX(${pct / 100})`
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
    <div className="fixed inset-x-0 top-0 z-[60] h-1" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left rounded-r-full bg-gradient-to-r from-blog-400 via-blog-500 to-blog-700 rtl:origin-right"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  )
}
