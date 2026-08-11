'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { LinkButton } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { ResolvedLink } from '@/lib/resolveLink'

type Item = { link: ResolvedLink | null; children: { link: ResolvedLink | null; description?: string }[] }

/**
 * 5.4 — open/close, nested items, focus containment, scroll lock and Escape.
 * Rendered as a <dialog> so focus trapping and inertness come from the platform
 * instead of a hand-rolled keydown loop.
 */
export function MobileNav({
  items,
  ctas,
  dict,
}: {
  items: Item[]
  ctas: { variant?: 'primary' | 'secondary' | 'ghost'; link: ResolvedLink | null }[]
  dict: Dictionary
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.nav.openMenu}
        aria-expanded={open}
        className="grid size-11 place-items-center rounded-pill text-foreground hover:bg-background-subtle lg:hidden"
      >
        <Menu className="size-6" aria-hidden />
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        aria-label="Main"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-[--overlay] lg:hidden"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-end px-5">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dict.nav.closeMenu}
              className="grid size-11 place-items-center rounded-pill hover:bg-background-subtle"
            >
              <X className="size-6" aria-hidden />
            </button>
          </div>

          {/* Any link closes the menu — otherwise it stays open over the new page. */}
          <nav className="flex-1 overflow-y-auto px-5 pb-8" onClick={() => setOpen(false)}>
            <ul className="flex flex-col gap-1">
              {items.map((item) =>
                item.link ? (
                  <li key={item.link.href}>
                    <Link href={item.link.href} className="block rounded-card px-4 py-3 text-lg font-semibold">
                      {item.link.label}
                    </Link>
                    {item.children.length ? (
                      <ul className="ms-4 flex flex-col border-s border-border ps-3">
                        {item.children.map((child) =>
                          child.link ? (
                            <li key={child.link.href}>
                              <Link href={child.link.href} className="block px-3 py-2 text-muted-foreground">
                                {child.link.label}
                              </Link>
                            </li>
                          ) : null,
                        )}
                      </ul>
                    ) : null}
                  </li>
                ) : null,
              )}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              {ctas.map((cta) =>
                cta.link ? (
                  <LinkButton key={cta.link.href} link={cta.link} variant={cta.variant} size="lg" />
                ) : null,
              )}
            </div>
          </nav>
        </div>
      </dialog>
    </>
  )
}
