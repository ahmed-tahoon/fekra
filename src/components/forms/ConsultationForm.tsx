'use client'

import { useEffect, useRef, useState } from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { EVENTS, captureAttribution, track } from '@/lib/analytics'

type Status = 'idle' | 'sending' | 'success' | 'error'

const MODELS = ['fullTime', 'partTime', 'hourly'] as const

/*
 * The "Get Free Consultation" card from the Figma service heroes: underline
 * inputs, a hiring-model choice and a solid brand button. Submits to the
 * existing /api/contact endpoint — subject and message are synthesised from
 * the service name and chosen model, so no new API surface is needed.
 *
 * ponytail: the comp's reCAPTCHA + "3 + 9 =" widgets are not reproduced — the
 * endpoint already has a honeypot, fill-time check and rate limit. Add a real
 * captcha service if spam ever gets through them.
 */
export function ConsultationForm({
  title,
  service,
  dict,
  locale,
}: {
  title: string
  service: string
  dict: Dictionary
  locale: Locale
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          website: data.website,
          subject: `Free consultation — ${service}`,
          message: `Consultation request from the ${service} page. Hiring model: ${data.model ?? 'not specified'}.`,
          consent: data.consent === 'on',
          startedAt: startedAt.current,
          locale,
          sourcePath: window.location.pathname,
          ...captureAttribution(),
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { fields?: Record<string, string> }
        setErrors(body.fields ?? {})
        const first = Object.keys(body.fields ?? {})[0]
        if (first) requestAnimationFrame(() => (form.elements.namedItem(first) as HTMLElement | null)?.focus())
        setStatus('error')
        return
      }
      track(EVENTS.contactSubmit, { form: 'consultation', locale })
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const input =
    'w-full border-b border-[#bcbcbc] bg-transparent px-2 py-3 text-sm text-ink-900 placeholder:text-ink-900/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-input dark:text-foreground dark:placeholder:text-muted-foreground'

  return (
    <div className="rounded-[25px] bg-white p-[30px] shadow-[0_0_5px_rgba(0,0,0,0.2)] dark:bg-card dark:ring-1 dark:ring-border">
      <h2 className="font-display text-2xl font-bold text-black dark:text-foreground">{title}</h2>

      {status === 'success' ? (
        <p role="status" className="mt-6 rounded-card border border-primary/40 bg-primary/5 p-4 font-medium">
          {dict.form.success}
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="@container mt-4 flex flex-col gap-2">
          {/* Honeypot — hidden from users and screen readers, irresistible to bots. */}
          <div aria-hidden className="sr-only">
            <label htmlFor="consult-website">Website</label>
            <input id="consult-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="sr-only" htmlFor="consult-name">
            {dict.form.name}
          </label>
          <input
            id="consult-name"
            name="fullName" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'consult-errors' : undefined}
            required
            autoComplete="name"
            placeholder={`${dict.form.name} *`}
            className={input}
          />

          <label className="sr-only" htmlFor="consult-email">
            {dict.form.email}
          </label>
          <input
            id="consult-email"
            name="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'consult-errors' : undefined}
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={`${dict.form.email} *`}
            className={input}
          />

          <label className="sr-only" htmlFor="consult-phone">
            {dict.form.phone}
          </label>
          <input
            id="consult-phone"
            name="phone" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'consult-errors' : undefined}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={dict.form.phone}
            className={input}
          />

          <fieldset className="mt-4">
            <legend className="text-base text-ink-900 dark:text-foreground">{dict.form.hiringModel}</legend>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {MODELS.map((model) => (
                <label key={model} className="flex min-h-11 items-center gap-2 text-sm text-ink-900 dark:text-foreground">
                  <input type="radio" name="model" value={{ fullTime: 'Full Time', partTime: 'Part Time', hourly: 'Hourly Time' }[model]} className="size-[18px] accent-primary" />
                  {dict.form.hiringModels[model]}
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-4 flex min-h-11 items-start gap-3 text-sm text-muted-foreground">
            <input type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consult-errors' : undefined} required className="mt-0.5 size-5" />
            <span>{dict.form.consent}</span>
          </label>

          {status === 'error' ? (
            <p id="consult-errors" role="alert" className="text-sm font-medium text-danger-600">
              {Object.keys(errors).length ? Object.values(errors).map((code, index) => <span key={index} className="block">{dict.form.errors[code as keyof typeof dict.form.errors] ?? dict.form.error}</span>) : dict.form.error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-4 min-h-11 w-full rounded-[10px] bg-primary text-base text-primary-foreground transition-colors hover:bg-primary-hover disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {status === 'sending' ? dict.form.submitting : dict.form.hireDevelopers}
          </button>
        </form>
      )}
    </div>
  )
}
