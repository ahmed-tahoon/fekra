'use client'

import { useEffect, useRef, useState } from 'react'

import { Field, Input, Textarea } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { EVENTS, captureAttribution, track } from '@/lib/analytics'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  // Render must stay pure — the render timestamp is stamped after mount.
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>

    setStatus('sending')
    setErrors({})

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          ...data,
          consent: data.consent === 'on',
          startedAt: startedAt.current,
          locale,
          sourcePath: window.location.pathname,
          ...captureAttribution(),
        }),
      })

      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { fields?: Record<string, string> }
        setErrors(body.fields ?? {})
        setStatus('error')
        return
      }

      // 11.7 / 22.6 — fired only after a confirmed 2xx, never on render.
      track(EVENTS.contactSubmit, { form: 'contact', locale })
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card border border-primary/40 bg-primary/5 p-6">
        <p className="font-medium text-foreground">{dict.form.success}</p>
      </div>
    )
  }

  const messageFor = (field: string) =>
    errors[field] ? (dict.form.errors[errors[field] as keyof typeof dict.form.errors] ?? errors[field]) : undefined

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — hidden from users and screen readers, irresistible to bots. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Four stacked fields, as the comp draws them. Phone and company are
          gone from the form; the API still accepts them, so nothing breaks. */}
      <Field hideLabel label={dict.form.name} required error={messageFor('fullName')}>
        {(props) => <Input {...props} name="fullName" autoComplete="name" />}
      </Field>

      <Field hideLabel label={dict.form.email} required error={messageFor('email')}>
        {(props) => <Input {...props} name="email" type="email" autoComplete="email" inputMode="email" />}
      </Field>

      <Field hideLabel label={dict.form.subject} required error={messageFor('subject')}>
        {(props) => <Input {...props} name="subject" />}
      </Field>

      <Field hideLabel label={dict.form.message} required error={messageFor('message')}>
        {(props) => <Textarea {...props} name="message" rows={6} />}
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-1 size-4" />
        <span>{dict.form.consent}</span>
      </label>

      {status === 'error' ? (
        <p role="alert" className="text-sm font-medium text-danger-600">
          {dict.form.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="w-full justify-center">
        {status === 'sending' ? dict.form.submitting : dict.form.submit}
      </Button>
    </form>
  )
}
