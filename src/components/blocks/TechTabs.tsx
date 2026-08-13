'use client'

import Image from 'next/image'
import { useId, useRef, useState } from 'react'

import { cn } from '@/lib/cn'

export type TechGroup = {
  name: string
  items: { name: string; src?: string | null }[]
}

/**
 * The tabbed technology grid (Figma 3:1656).
 *
 * A real tablist rather than a set of buttons: arrow keys move between tabs and
 * only the selected one is in the tab order, which is what screen readers and
 * keyboard users expect from this pattern (23.1 / 23.3). Panels are rendered
 * for the selected group only — nine hidden grids of logos would cost every
 * visitor the download for content most never open.
 */
export function TechTabs({ groups }: { groups: TechGroup[] }) {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  if (!groups.length) return null

  const move = (event: React.KeyboardEvent, index: number) => {
    const last = groups.length - 1
    const next =
      event.key === 'ArrowRight' ? (index === last ? 0 : index + 1)
      : event.key === 'ArrowLeft' ? (index === 0 ? last : index - 1)
      : event.key === 'Home' ? 0
      : event.key === 'End' ? last
      : null
    if (next === null) return
    event.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  // `active` is only ever set from an index into `groups`, but the compiler
  // cannot know that; falling back to the first keeps it total.
  const group = groups[active] ?? groups[0]!

  return (
    <div className="mt-12">
      {/* The bar scrolls rather than wraps: nine labels do not fit a phone, and
          a wrapped tab row stops reading as one control. */}
      <div className="overflow-x-auto rounded-t-2xl bg-tab-bar px-6 pt-6 pb-4 dark:bg-background-subtle">
        <div role="tablist" aria-label="Technology areas" className="flex min-w-max gap-8 lg:min-w-0 lg:justify-between">
          {groups.map((g, i) => (
            <button
              key={g.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`${id}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => move(e, i)}
              className={cn(
                'shrink-0 border-b-2 px-1 pb-4 text-sm font-semibold whitespace-nowrap transition-colors',
                i === active
                  ? 'border-brand-500 text-brand-500'
                  : 'border-transparent text-ink-500 hover:text-foreground dark:text-muted-foreground',
              )}
            >
              {g.name}
            </button>
          ))}
        </div>
        <div aria-hidden className="mt-0 h-px w-full bg-card" />
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${active}`}
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
        className="rounded-b-3xl bg-tab-panel px-5 py-14 dark:bg-card"
      >
        {group.items.length ? (
          <ul className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {group.items.map((item) => (
              <li key={item.name} className="flex flex-col items-center gap-4 text-center">
                <span className="flex h-[88px] items-center justify-center">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt=""
                      width={88}
                      height={88}
                      aria-hidden
                      className="max-h-[88px] w-auto object-contain"
                    />
                  ) : null}
                </span>
                <span className="text-lg/7 text-ink-700 dark:text-muted-foreground">{item.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-ink-500 dark:text-muted-foreground">
            Nothing listed for {group.name} yet.
          </p>
        )}
      </div>
    </div>
  )
}
