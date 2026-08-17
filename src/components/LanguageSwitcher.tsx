'use client'

import { Check, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { LOCALES, LOCALE_META, type Locale, localeHref, splitLocale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

/**
 * 14.3 — switching language keeps the user on the equivalent page. Locales
 * without an approved translation for this page are shown disabled rather than
 * hidden, so the user learns the page exists but not in their language (14.9).
 */
export function LanguageSwitcher({
  current,
  available,
  labels,
}: {
  current: Locale
  available?: Locale[]
  labels: { switch: string; unavailable: string }
}) {
  const pathname = usePathname() ?? '/'
  const { rest } = splitLocale(pathname)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const enabled = new Set<Locale>(available?.length ? available : [...LOCALES])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={labels.switch}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex h-11 items-center gap-2 rounded-pill px-3 text-sm font-medium text-foreground transition-colors hover:bg-background-subtle"
      >
        <Globe className="size-4" aria-hidden />
        <span className="uppercase">{current}</span>
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute end-0 z-50 mt-2 min-w-44 rounded-card border border-border bg-card p-1 shadow-lift"
        >
          {LOCALES.map((locale) => {
            const isAvailable = enabled.has(locale)
            const label = LOCALE_META[locale].label

            if (!isAvailable) {
              return (
                <span
                  key={locale}
                  role="menuitem"
                  aria-disabled
                  title={labels.unavailable}
                  className="flex cursor-not-allowed items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground/60"
                >
                  {label}
                </span>
              )
            }

            return (
              <Link
                key={locale}
                role="menuitem"
                href={localeHref(locale, rest)}
                hrefLang={LOCALE_META[locale].hreflang}
                onClick={() => {
                  // Explicit choice must beat the remembered locale, or the "/"
                  // redirect in proxy.ts bounces English home back to the old one.
                  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`
                  setOpen(false)
                }}
                className={cn(
                  'flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-background-subtle',
                  locale === current && 'font-semibold text-primary',
                )}
              >
                {label}
                {locale === current ? <Check className="size-4" aria-hidden /> : null}
              </Link>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
