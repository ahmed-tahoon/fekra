'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

export type Step = { title: string; body: string }

const DWELL_MS = 5000

/**
 * The hiring process, advancing on its own from the first step to the last and
 * then looping.
 *
 * It is still an ordered list: the sequence is the meaning, and every step's
 * text is in the DOM at all times, so this reads correctly with no JS, to a
 * screen reader, and to a crawler (19.1). The animation only moves emphasis.
 *
 * Auto-advance stops on hover or keyboard focus — a panel that changes under
 * someone mid-sentence is worse than no motion — and never starts at all under
 * prefers-reduced-motion, where every step simply renders at full strength.
 */
export function ProcessStepper({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(false)
  const held = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setAuto(!media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!auto || steps.length < 2) return
    const id = setInterval(() => {
      if (!held.current) setActive((i) => (i + 1) % steps.length)
    }, DWELL_MS)
    return () => clearInterval(id)
  }, [auto, steps.length])

  if (!steps.length) return null

  return (
    <ol
      className="flex w-full flex-col gap-3"
      onMouseEnter={() => (held.current = true)}
      onMouseLeave={() => (held.current = false)}
      onFocusCapture={() => (held.current = true)}
      onBlurCapture={() => (held.current = false)}
    >
      {steps.map((step, i) => {
        const on = i === active || !auto
        return (
          <li key={step.title}>
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-current={auto && i === active ? 'step' : undefined}
              className={cn(
                'flex w-full gap-5 rounded-card border p-5 text-start transition-all duration-500 sm:p-6',
                on
                  ? 'border-panel-grey bg-card shadow-card dark:border-border'
                  : 'border-transparent bg-transparent opacity-55 hover:opacity-80',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'grid size-10 shrink-0 place-items-center rounded-pill font-display text-sm font-bold transition-colors duration-500',
                  on ? 'bg-primary text-primary-foreground' : 'bg-panel-grey text-ink-500 dark:bg-card',
                )}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-[2.8px] text-primary uppercase">
                  Step {i + 1}
                </span>
                <span className="mt-1 block font-display text-lg font-bold text-navy-800 dark:text-foreground">
                  {step.title}
                </span>
                <span className="mt-2 block text-base/6 text-ink-500 dark:text-muted-foreground">{step.body}</span>
              </span>
            </button>

            {/* Timing bar for the active step. Width is animated in CSS so the
                countdown costs no re-render, and it is keyed on the step so it
                restarts cleanly each advance. */}
            {auto ? (
              <span aria-hidden className="mt-1 block h-0.5 w-full overflow-hidden rounded-pill bg-panel-grey dark:bg-card">
                {i === active ? (
                  <span
                    key={`${i}-${active}`}
                    className="fk-step-progress block h-full bg-primary"
                    style={{ animationDuration: `${DWELL_MS}ms` }}
                  />
                ) : null}
              </span>
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}
