'use client'

import { useState } from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { EVENTS, track } from '@/lib/analytics'

type Status = 'idle' | 'sending' | 'success' | 'error'

/** Brand panel wrapping the same /api/newsletter endpoint the footer uses. */
export function NewsletterPanel({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...data, locale, path: window.location.pathname }),
      })
      if (!res.ok) throw new Error('failed')
      track(EVENTS.newsletterSubmit, { source: 'blog', locale })
      form.reset()
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blog-800 via-blog-500 to-blog-700 px-6 py-10 text-white shadow-[0_30px_70px_-40px_rgba(72,155,194,0.9)] sm:px-12 sm:py-14">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px]"
      />
      <div aria-hidden className="absolute -end-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{dict.blog.newsletterTitle}</h2>
        <p className="mt-2 text-white/85">{dict.blog.newsletterBody}</p>

        {status === 'success' ? (
          <p role="status" className="mt-6 inline-block rounded-full bg-white/15 px-5 py-3 text-sm font-medium backdrop-blur">
            {dict.form.success}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            {/* Honeypot — same trap as every other form (11.3). */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

            <label htmlFor="blog-newsletter-email" className="sr-only">
              {dict.form.email}
            </label>
            <input
              id="blog-newsletter-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder={dict.form.email}
              className="h-12 flex-1 rounded-full border border-white/30 bg-white/15 px-5 text-sm text-white backdrop-blur outline-none placeholder:text-white/70 focus:border-white focus:bg-white/20"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="h-12 shrink-0 rounded-full bg-white px-6 text-sm font-bold text-blog-700 transition-transform hover:scale-[1.03] disabled:opacity-70"
            >
              {status === 'sending' ? dict.form.submitting : dict.form.submit}
            </button>
          </form>
        )}

        {status === 'error' ? (
          <p role="alert" className="mt-3 text-sm text-rose-100">
            {dict.form.error}
          </p>
        ) : null}
      </div>
    </section>
  )
}
