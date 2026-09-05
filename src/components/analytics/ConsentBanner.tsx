'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import { type Locale, localeHref } from '@/i18n/routing'
import { writeConsent } from '@/lib/consent'
import { useConsent } from '@/lib/useConsent'

export function ConsentBanner({ dict, locale, enabled }: { dict: Dictionary; locale: Locale; enabled: boolean }) {
  const consent = useConsent()

  // Server render and any answered visitor render nothing.
  if (!enabled || consent !== null) return null

  const decide = (analytics: boolean, marketing: boolean) => writeConsent({ analytics, marketing })

  return (
    <div
      role="dialog"
      aria-label={dict.consent.title}
      className="fixed inset-x-4 bottom-4 z-100 rounded-panel border border-border bg-card p-6 shadow-lift md:inset-x-auto md:end-6 md:max-w-md"
    >
      <h2 className="font-display text-lg font-bold">{dict.consent.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {dict.consent.body}{' '}
        {/* Consent is not informed without the detail behind it (1.10 / 21.8). */}
        <Link href={localeHref(locale, '/cookie-policy')} className="font-semibold text-primary underline underline-offset-4">
          {dict.consent.cookiePolicy}
        </Link>
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => decide(true, true)}>{dict.consent.acceptAll}</Button>
        <Button variant="secondary" onClick={() => decide(false, false)}>
          {dict.consent.essentialOnly}
        </Button>
      </div>
    </div>
  )
}
