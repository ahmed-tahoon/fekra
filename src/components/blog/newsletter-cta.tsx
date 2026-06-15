'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function NewsletterCta() {
  const t = useTranslations('Blog');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#3a8ab0] via-[#489bc2] to-[#2f6d8c] px-6 py-10 text-white shadow-[0_30px_70px_-40px_rgba(72,155,194,0.9)] sm:px-12 sm:py-14">
      <div aria-hidden className="absolute inset-0 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] opacity-10" />
      <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{t('newsletterTitle')}</h2>
        <p className="mt-2 text-white/85">{t('newsletterSubtitle')}</p>

        {status === 'success' ? (
          <p role="status" className="mt-6 rounded-full bg-white/15 px-5 py-3 text-sm font-medium backdrop-blur">
            {t('newsletterSuccess')}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="hidden"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t('newsletterPlaceholder')}
              className="h-12 flex-1 rounded-full border border-white/30 bg-white/15 px-5 text-sm text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white focus:bg-white/20"
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="h-12 shrink-0 rounded-full bg-white px-6 text-sm font-bold text-[#2f6d8c] transition-transform hover:scale-[1.03] disabled:opacity-70"
            >
              {status === 'submitting' ? '…' : t('newsletterCta')}
            </button>
          </form>
        )}
        {status === 'error' && <p className="mt-3 text-sm text-rose-100">{t('newsletterError')}</p>}
      </div>
    </section>
  );
}
