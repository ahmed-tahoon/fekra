'use client'

import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { Field, Input, Textarea } from '@/components/ui/Field'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { EVENTS, captureAttribution, track } from '@/lib/analytics'
import { CV, validateCv } from '@/lib/validation'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ApplicationForm({
  jobId,
  jobTitle,
  dict,
  locale,
  disabled,
}: {
  jobId: string | number
  jobTitle: string
  dict: Dictionary
  locale: Locale
  disabled?: boolean
}) {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  // Render must stay pure — the render timestamp is stamped after mount.
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  if (disabled) {
    return (
      <p className="rounded-card border border-border bg-background-subtle p-6 text-sm text-muted-foreground">
        {dict.careers.closed}
      </p>
    )
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    // 10.4 — reject bad files before uploading 5 MB the server will discard.
    const file = formData.get('cv')
    if (file instanceof File) {
      const problem = validateCv(file)
      if (problem) {
        setErrors({ cv: problem })
        return
      }
    }

    formData.set('jobId', String(jobId))
    formData.set('startedAt', String(startedAt.current))
    formData.set('locale', locale)
    formData.set('sourcePath', window.location.pathname)
    for (const [key, value] of Object.entries(captureAttribution())) {
      if (typeof value === 'string' && value) formData.set(key, value)
    }

    setStatus('sending')
    setErrors({})

    try {
      const res = await fetch('/api/apply', { method: 'POST', body: formData })
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { fields?: Record<string, string> }
        setErrors(body.fields ?? {})
        setStatus('error')
        return
      }
      // 22.7 — no candidate PII in the event payload, only the role.
      track(EVENTS.applicationSubmit, { job: jobTitle, locale })
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-card border border-primary/40 bg-primary/5 p-6">
        <p className="font-medium">{dict.form.applicationSuccess}</p>
      </div>
    )
  }

  const messageFor = (field: string) =>
    errors[field] ? (dict.form.errors[errors[field] as keyof typeof dict.form.errors] ?? errors[field]) : undefined

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="flex flex-col gap-5">
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label={dict.form.name} required error={messageFor('fullName')}>
          {(props) => <Input {...props} name="fullName" autoComplete="name" />}
        </Field>
        <Field label={dict.form.email} required error={messageFor('email')}>
          {(props) => <Input {...props} name="email" type="email" autoComplete="email" />}
        </Field>
        <Field label={dict.form.phone} required error={messageFor('phone')}>
          {(props) => <Input {...props} name="phone" type="tel" autoComplete="tel" dir="ltr" />}
        </Field>
        <Field label={dict.form.linkedin} error={messageFor('linkedin')}>
          {(props) => <Input {...props} name="linkedin" type="url" dir="ltr" placeholder="https://" />}
        </Field>
      </div>

      <Field label={dict.form.cv} required hint={dict.form.cvHint} error={messageFor('cv')}>
        {(props) => (
          <Input
            {...props}
            name="cv"
            type="file"
            accept={[...CV.mimeTypes, ...CV.extensions].join(',')}
            className="w-full rounded-card border border-input bg-card p-3 text-sm file:me-4 file:rounded-pill file:border-0 file:bg-primary file:px-4 file:py-2 file:text-primary-foreground"
          />
        )}
      </Field>

      <Field label={dict.form.message} error={messageFor('coverNote')}>
        {(props) => <Textarea {...props} name="coverNote" rows={4} />}
      </Field>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input type="checkbox" name="consent" required className="mt-1 size-4" />
        <span>{dict.form.consent}</span>
      </label>

      {status === 'error' ? (
        <p role="alert" className="text-sm font-medium text-[--color-danger-600]">
          {dict.form.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === 'sending'} className="self-start">
        {status === 'sending' ? dict.form.submitting : dict.form.apply}
      </Button>
    </form>
  )
}
