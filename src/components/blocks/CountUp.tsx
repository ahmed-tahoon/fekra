'use client'

import { useEffect, useRef, useState } from 'react'

/* Leading label, the digits, then whatever trails them: "100+" -> "", "100", "+"
   and "$1.2M" -> "$", "1.2", "M". Anything with no digits at all falls through
   untouched — the component then just renders the string. */
const PARTS = /^(\D*?)([\d][\d,.]*)(.*)$/s

const DURATION_MS = 1400

/**
 * Counts a stat value up when it scrolls into view.
 *
 * The final value is what renders on the server and what a crawler reads
 * (19.2) — the count only ever runs after hydration. It runs once, never under
 * prefers-reduced-motion, and the original string's thousands separators and
 * decimal places are preserved on every frame so the number cannot change
 * width mid-count and shove the tile around.
 */
export function CountUp({
  value,
  className,
  dir,
}: {
  value: string
  className?: string
  dir?: string
}) {
  const [shown, setShown] = useState(value)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const parts = PARTS.exec(value)
    if (!parts) return
    const [, prefix = '', digits = '', suffix = ''] = parts
    const target = Number(digits.replace(/,/g, ''))
    if (!Number.isFinite(target)) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const decimals = digits.includes('.') ? (digits.split('.')[1]?.length ?? 0) : 0
    const grouped = digits.includes(',')
    const format = (n: number) =>
      prefix +
      (grouped
        ? n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals)) +
      suffix

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION_MS)
          // Ease-out cubic: quick off the mark, settles on the number.
          setShown(format(target * (1 - (1 - t) ** 3)))
          if (t < 1) frame = requestAnimationFrame(tick)
          else setShown(value)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} dir={dir} className={className}>
      {shown}
    </span>
  )
}
