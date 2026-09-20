'use client'

import { useRef, useState } from 'react'
import { X } from 'lucide-react'
import type { Locale } from '@/i18n/routing'
import { batchTwo } from '@/i18n/batch-two'
import { DENIED, readConsent, writeConsent, type ConsentState } from '@/lib/consent'

export function CookiePreferences({ locale }: { locale: Locale }) {
  const labels = batchTwo[locale]
  const dialog = useRef<HTMLDialogElement>(null)
  const [choice, setChoice] = useState<ConsentState>(DENIED)
  const open = () => {
    setChoice(readConsent() ?? DENIED)
    dialog.current?.showModal()
  }
  const save = () => {
    const previous = readConsent()
    writeConsent(choice)
    dialog.current?.close()
    // Already executed third-party scripts cannot be unloaded by removing
    // their script tag. Reload after revocation so no denied tag runs again.
    if ((previous?.analytics && !choice.analytics) || (previous?.marketing && !choice.marketing)) window.location.reload()
  }
  return <>
    <button type="button" onClick={open} className="inline-flex min-h-11 items-center text-start transition-colors hover:text-foreground">{labels.preferences}</button>
    <dialog ref={dialog} aria-labelledby="cookie-preferences-title" onClick={(event) => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close()
    }} className="fixed inset-0 m-auto w-[min(480px,calc(100%_-_32px))] max-w-none rounded-3xl border border-border bg-card p-6 text-foreground shadow-lift backdrop:bg-navy-800/40">
      <div className="flex items-center justify-between gap-3">
        <h2 id="cookie-preferences-title" className="text-xl font-bold">{labels.preferences}</h2>
        <button type="button" onClick={() => dialog.current?.close()} aria-label={labels.close} className="grid size-11 shrink-0 place-items-center rounded-full hover:bg-background-subtle"><X aria-hidden className="size-5" /></button>
      </div>
      <p className="mt-3 text-sm/6 text-muted-foreground">{labels.essential}</p>
      <div className="my-5 divide-y divide-border">
        {(['analytics', 'marketing'] as const).map((category) => <label key={category} className="flex min-h-14 cursor-pointer items-center justify-between gap-4 text-base">
          {labels[category]}
          <input type="checkbox" checked={choice[category]} onChange={(event) => setChoice((state) => ({ ...state, [category]: event.target.checked }))} className="size-5 accent-primary" />
        </label>)}
      </div>
      <button type="button" onClick={save} className="min-h-11 w-full rounded-pill bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">{labels.save}</button>
    </dialog>
  </>
}
