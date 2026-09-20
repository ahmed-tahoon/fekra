'use client'

import { useId, type ReactNode } from 'react'

export function FaqAccordion({ items }: { items: { question?: string; answer: ReactNode }[] }) {
  const name = useId()
  return <div className="flex w-full flex-col gap-3">
    {items.map((item, i) => <details key={i} name={name}
      onToggle={(event) => {
        // Also supports browsers predating exclusive <details name> groups.
        const current = event.currentTarget
        if (current.open) current.parentElement?.querySelectorAll('details').forEach((other) => {
          if (other !== current) other.open = false
        })
      }}
      className="group rounded-card border border-panel-grey bg-card px-5 py-3 shadow-card sm:px-7 dark:border-border">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-5 [&::-webkit-details-marker]:hidden">
        <span className="text-base/6 font-semibold text-navy-800 sm:text-lg dark:text-foreground">{item.question}</span>
        <span aria-hidden className="grid size-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-90 group-open:bg-primary group-open:text-white">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4"><path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </summary>
      <div className="pt-2 pb-2">{item.answer}</div>
    </details>)}
  </div>
}
