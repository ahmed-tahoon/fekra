'use client'

import { Button } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import { writeConsent } from '@/lib/consent'
import { useConsent } from '@/lib/useConsent'

export function ConsentBanner({ dict, enabled }: { dict: Dictionary; enabled: boolean }) {
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
      <p className="mt-2 text-sm text-muted-foreground">{dict.consent.body}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => decide(true, true)}>{dict.consent.acceptAll}</Button>
        <Button variant="secondary" onClick={() => decide(false, false)}>
          {dict.consent.essentialOnly}
        </Button>
      </div>
    </div>
  )
}
