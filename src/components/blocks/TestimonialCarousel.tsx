'use client'

import { Children, useId, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function TestimonialCarousel({ children, labels }: {
  children: ReactNode
  labels: { previous: string; next: string; group: string }
}) {
  const cards = Children.toArray(children)
  const total = Math.ceil(cards.length / 5)
  const [page, setPage] = useState(0)
  const id = useId()
  const move = (delta: number) => setPage((current) => (current + delta + total) % total)

  return (
    <div className="min-w-0 w-full" role="region" aria-roledescription="carousel" aria-label={labels.group}>
      <div id={id} aria-live="polite" aria-atomic="false">
        {Array.from({ length: total }, (_, group) => (
          <ul key={group} hidden={page !== group} aria-label={`${labels.group} ${group + 1} / ${total}`}
            className="grid min-w-0 grid-cols-1 gap-6 motion-safe:animate-[fk-enter_0.3s_ease-out] md:grid-cols-6">
            {cards.slice(group * 5, group * 5 + 5)}
          </ul>
        ))}
      </div>
      {total > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button type="button" onClick={() => move(-1)} aria-label={labels.previous} aria-controls={id}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-primary hover:bg-primary/10">
            <ChevronLeft className="icon-flip size-5" aria-hidden />
          </button>
          {Array.from({ length: total }, (_, group) => (
            <button key={group} type="button" onClick={() => setPage(group)} aria-controls={id}
              aria-label={`${labels.group} ${group + 1} / ${total}`} aria-current={page === group ? 'true' : undefined}
              className="grid size-11 place-items-center rounded-full hover:bg-primary/10">
              <span className={`h-2 rounded-full transition-all ${page === group ? 'w-6 bg-primary' : 'w-2 bg-primary/30'}`} />
            </button>
          ))}
          <button type="button" onClick={() => move(1)} aria-label={labels.next} aria-controls={id}
            className="grid size-11 place-items-center rounded-full border border-border bg-card text-primary hover:bg-primary/10">
            <ChevronRight className="icon-flip size-5" aria-hidden />
          </button>
        </div>
      ) : null}
    </div>
  )
}
