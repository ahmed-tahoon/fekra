'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { Field, Input, Textarea } from '@/components/ui/Field'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { localeHref } from '@/i18n/routing'
import { EVENTS, captureAttribution, track } from '@/lib/analytics'
import { applicationSchema, CV, validateCv } from '@/lib/validation'

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
    const values = Object.fromEntries(formData)

    const parsed = applicationSchema.safeParse({
      ...values,
      jobId: String(jobId),
      consent: values.consent === 'on',
    })
    const nextErrors: Record<string, string> = {}
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0] ?? 'form')
        nextErrors[field] =
          field === 'email' ? 'email' : field === 'phone' ? 'phone' : field === 'linkedin' ? 'url' : 'required'
      }
    }

    // 10.4 — reject bad files before uploading 5 MB the server will discard.
    const file = formData.get('cv')
    if (file instanceof File) {
      if (file.size === 0) {
        nextErrors.cv = 'required'
      } else {
        const problem = validateCv(file)
        if (problem) nextErrors.cv = problem
      }
    } else {
      nextErrors.cv = 'required'
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors)
      setStatus('idle')
      const firstField = Object.keys(nextErrors)[0]
      requestAnimationFrame(() =>
        form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus(),
      )
      return
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
        const nextErrors = body.fields ?? {}
        setErrors(nextErrors)
        setStatus(Object.keys(nextErrors).length ? 'idle' : 'error')
        requestAnimationFrame(() => {
          const firstField = Object.keys(nextErrors)[0]
          if (firstField) form.querySelector<HTMLElement>(`[name="${firstField}"]`)?.focus()
        })
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
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border border-primary/40 bg-primary/5 p-6"
      >
        <p className="font-display text-xl font-bold text-navy-800 dark:text-foreground">
          {dict.form.applicationSuccess}
        </p>
        <Link
          href={localeHref(locale, '/careers')}
          className="mt-5 inline-flex min-h-11 items-center rounded-pill border border-navy-800 px-5 text-sm font-semibold text-navy-800 transition-colors hover:bg-navy-800/5 dark:border-foreground dark:text-foreground"
        >
          {dict.careers.backToRoles}
        </Link>
      </div>
    )
  }

  const messageFor = (field: string) =>
    errors[field]
      ? (dict.form.errors[errors[field] as keyof typeof dict.form.errors] ?? errors[field])
      : undefined

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      encType="multipart/form-data"
      aria-busy={status === 'sending'}
      className="@container flex flex-col gap-4 @md:gap-5"
    >
      <div aria-hidden className="sr-only">
        <label htmlFor="apply-website">Website</label>
        <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 @md:grid-cols-2 @md:gap-5">
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
          {(props) => (
            <Input {...props} name="linkedin" type="url" dir="ltr" placeholder="https://" />
          )}
        </Field>
      </div>

      <Field label={dict.form.cv} required hint={dict.form.cvHint} error={messageFor('cv')}>
        {(props) => (
          <Input
            {...props}
            name="cv"
            type="file"
            accept={[...CV.mimeTypes, ...CV.extensions].join(',')}
            className={cn(
              props.className,
              'cursor-pointer px-2 py-2 text-sm @md:px-3 @md:py-3 @md:text-base',
              'file:me-3 file:cursor-pointer file:rounded-pill file:border-0 file:bg-primary',
              'file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground',
            )}
          />
        )}
      </Field>

      <Field label={dict.form.message} error={messageFor('coverNote')}>
        {(props) => <Textarea {...props} name="coverNote" rows={4} />}
      </Field>

      <label className="flex min-h-11 items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          aria-invalid={Boolean(errors.consent)}
          aria-describedby={errors.consent ? 'application-consent-error' : undefined}
          className="mt-0.5 size-5 accent-primary"
        />
        <span>
          {dict.form.consent}
          {errors.consent ? (
            <span
              id="application-consent-error"
              role="alert"
              className="mt-1 block text-xs font-medium text-danger-600"
            >
              {messageFor('consent')}
            </span>
          ) : null}
        </span>
      </label>

      {status === 'error' ? (
        <p role="alert" className="text-sm font-medium text-danger-600">
          {dict.form.error}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'sending'}
        className="w-full @md:w-auto @md:self-start"
      >
        {status === 'sending' ? dict.form.submitting : dict.form.apply}
      </Button>
      <p className="sr-only" role="status" aria-live="polite">
        {status === 'sending' ? dict.form.submitting : ''}
      </p>
    </form>
  )
}
