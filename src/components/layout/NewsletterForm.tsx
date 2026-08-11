'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'

export function NewsletterForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get('email')
    setState('sending')
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, locale, path: window.location.pathname }),
    })
    setState(res.ok ? 'done' : 'error')
    if (res.ok) form.reset()
  }

  if (state === 'done') {
    return (
      <p role="status" className="text-sm font-medium text-primary">
        {dict.form.success}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        {dict.form.email}
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={dict.form.email}
        className="min-h-11 flex-1 rounded-pill border border-input bg-card px-4 text-sm"
      />
      <Button type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? dict.form.submitting : dict.form.submit}
      </Button>
      {state === 'error' ? (
        <p role="alert" className="sr-only">
          {dict.form.error}
        </p>
      ) : null}
    </form>
  )
}
