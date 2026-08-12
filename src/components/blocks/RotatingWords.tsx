'use client'

import { useEffect, useState } from 'react'

/**
 * Cycles the last phrase of the hero headline.
 *
 * The first word is server-rendered inside the heading, so the H1 is complete
 * text for crawlers and for anyone with JS off — the animation only swaps what
 * is already there (19.2).
 *
 * Honours prefers-reduced-motion by not rotating at all: a word changing under
 * you every few seconds is exactly the kind of motion that setting exists for
 * (17.8 / 23.5).
 */
export function RotatingWords({ words, intervalMs = 2600 }: { words: string[]; intervalMs?: number }) {
  const [index, setIndex] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (words.length < 2) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setEnabled(!media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [words.length])

  useEffect(() => {
    if (!enabled) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), intervalMs)
    return () => clearInterval(timer)
  }, [enabled, intervalMs, words.length])

  const current = words[enabled ? index : 0] ?? ''

  return (
    <span className="relative inline-block text-primary">
      {/* Reserves the width of the longest word so the headline never reflows
          as it cycles — that would be a CLS hit on the largest element (2.6). */}
      <span aria-hidden className="invisible block h-0 overflow-hidden">
        {words.reduce((a, b) => (b.length > a.length ? b : a), '')}
      </span>
      <span key={current} className="fk-rotate-in inline-block">
        {current}
      </span>
    </span>
  )
}
