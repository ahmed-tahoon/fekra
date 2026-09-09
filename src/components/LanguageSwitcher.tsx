'use client'

import { Check, Globe } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { LOCALES, PUBLIC_LOCALES, LOCALE_META, type Locale, localeHref, splitLocale } from '@/i18n/routing'
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
  const router = useRouter()

  /*
   * Links inside a closed dropdown are never in the viewport, so automatic
   * prefetch cannot help here. Warm language targets when the browser is idle,
   * again on visible user intent, and immediately when the menu opens. In
   * production this gets the RSC payloads into the router cache before the
   * click; in dev, Next.js keeps prefetch intentionally limited.
   */
  const approved = useMemo(
    () => new Set<Locale>(available?.length ? (available as Locale[]) : [...PUBLIC_LOCALES]),
    [available],
  )
  const enabled = useMemo(
    () => new Set<Locale>([...PUBLIC_LOCALES].filter((l) => approved.has(l))),
    [approved],
  )
  const switchTargets = useMemo(
    () =>
      [...PUBLIC_LOCALES]
        .filter((l) => enabled.has(l) && l !== current)
        .map((locale) => localeHref(locale, rest)),
    [current, enabled, rest],
  )
  const prefetchTargets = useCallback(() => {
    for (const href of switchTargets) router.prefetch(href)
  }, [router, switchTargets])

  useEffect(() => {
    if (!switchTargets.length) return

    let cancelled = false
    const warm = () => {
      if (cancelled) return
      prefetchTargets()
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm, { timeout: 1500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    const id = globalThis.setTimeout(warm, 750)
    return () => {
      cancelled = true
      globalThis.clearTimeout(id)
    }
  }, [prefetchTargets, switchTargets.length])

  useEffect(() => {
    if (!open) return
    prefetchTargets()
  }, [open, prefetchTargets])

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

  if (LOCALES.length < 2) return null

  /*
   * The menu lists ALL five languages; only the ones we can actually serve are
   * clickable. Two separate gates decide that:
   *
   *   PUBLIC_LOCALES  - the locales the router serves at all
   *   available       - the locales THIS document has an approved translation in
   *
   * Listing every language answers "where is the language menu?" while an
   * unserved locale stays visibly disabled rather than silently handing the
   * visitor translated chrome wrapped around English content (14.9).
   */
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onFocus={prefetchTargets}
        onPointerEnter={prefetchTargets}
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
