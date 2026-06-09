'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label, Input, Textarea, Honeypot } from './field';
import { track } from '@/lib/analytics/track';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const t = useTranslations('Contact');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('request_failed');
      track('contact_submit');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-xl border border-border bg-muted/40 p-6">
        <h3 className="text-lg font-semibold">{t('successTitle')}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <Honeypot />
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" name="name" required minLength={2} autoComplete="name" />
      </div>
      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="company">{t('company')}</Label>
        <Input id="company" name="company" autoComplete="organization" />
      </div>
      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" name="message" required minLength={10} />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-500">
          {t('errorGeneric')}
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'}>
        {status === 'submitting' ? t('submitting') : t('submit')}
      </Button>
    </form>
  );
}
