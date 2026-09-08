'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { CalendlyEmbed } from '@/components/booking/CalendlyEmbed'
import type { Dictionary } from '@/i18n/getDictionary'
import { EVENTS, track } from '@/lib/analytics'

/**
 * Opens the booking flow in a side drawer instead of navigating to /meeting.
 *
 * The "Book a 30-minute meeting" call to action is rendered from CMS content in
 * a dozen places — hero, CTA band, header, footer, service pages — all of them
 * plain links produced by one `link` field. Rather than teach every renderer
 * about a drawer (and re-teach it for each new block), this listens once, in
 * the layout, and intercepts clicks whose destination is the meeting route.
 *
 * /meeting keeps working as a real page: it is what a middle-click, a shared
 * link, a crawler and a no-JS visitor all get. The drawer is an enhancement on
 * top of a working URL, never a replacement for one (12.4 — no dead end).
 */
export function BookingDrawer({ url, dict }: { url?: string; dict: Dictionary }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  const close = useCallback(() => {
    dialogRef.current?.close()
    setOpen(false)
  }, [])

  useEffect(() => {
    if (!url) return

    const onClick = (event: MouseEvent) => {
      // Leave the browser's own affordances alone: new tab, new window, download.
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return

      let destination: URL
      try {
        destination = new URL(anchor.href, window.location.href)
      } catch {
        return
      }
      if (destination.origin !== window.location.origin) return
      // `/meeting` in English, `/<locale>/meeting` everywhere else.
      if (!/^\/(?:[a-z]{2}\/)?meeting\/?$/.test(destination.pathname)) return

      // Next's <Link> preventDefaults and routes from its own handler, so this
      // has to win outright: stop the event before React's delegated listener
      // on the root container ever sees it.
      event.preventDefault()
      event.stopPropagation()
      track(EVENTS.bookingClick, { mode: 'drawer' })
      setOpen(true)
      dialogRef.current?.showModal()
    }

    // Capture phase on the document: React attaches to the root container, which
    // is below this, so capturing here is the only point that runs first.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [url])

  // The body must not scroll behind an open drawer, and it must be released
  // again on close — including a close the dialog does itself (Escape).
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!url) return null

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      /* Clicking the backdrop closes. The dialog element itself is the click
         target for the backdrop, so compare against the panel's bounds. */
      onClick={(event) => {
        const box = event.currentTarget.getBoundingClientRect()
        const outside =
          event.clientX < box.left ||
          event.clientX > box.right ||
          event.clientY < box.top ||
          event.clientY > box.bottom
        if (outside) close()
      }}
      aria-label={dict.meeting.title}
      className="
        ms-auto me-0 h-dvh max-h-none w-full max-w-[560px] bg-background p-0 text-foreground
        backdrop:bg-[var(--overlay)]
      "
    >
      {open ? (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-start justify-between gap-4 border-b border-border px-5 py-4">
            <div className="min-w-0">
              <h2 className="font-display text-lg font-bold">{dict.meeting.title}</h2>
              {/* The booking URL itself, visible and copyable — the drawer is an
                  iframe, so without this there is nothing to copy or share. */}
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track(EVENTS.bookingClick, { mode: 'external' })}
                className="mt-1 block truncate text-xs text-primary underline underline-offset-4"
                dir="ltr"
              >
                {url.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={dict.nav.closeMenu}
              className="grid size-11 shrink-0 place-items-center rounded-pill text-foreground hover:bg-background-subtle"
            >
              <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* CalendlyEmbed carries the consent gate and the no-consent fallback
              already; mounting it here inherits both rather than restating them. */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
            <CalendlyEmbed url={url} dict={dict} />
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
