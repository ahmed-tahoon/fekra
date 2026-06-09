'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Label, Input, Textarea, Honeypot } from './field';
import { track } from '@/lib/analytics/track';

type Status = 'idle' | 'submitting' | 'success' | 'error';

// Section 8 — candidate application with optional CV upload (8.3 / 8.4).
export function ApplicationForm({ roleSlug }: { roleSlug: string }) {
  const t = useTranslations('ApplicationForm');
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const data = new FormData(form); // multipart — carries the CV file

    try {
      const res = await fetch('/api/careers', { method: 'POST', body: data });
      if (!res.ok) throw new Error('request_failed');
      track('application_submit', { role: roleSlug });
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
      <input type="hidden" name="roleSlug" value={roleSlug} />
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input id="name" name="name" required minLength={2} autoComplete="name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <Label htmlFor="phone">{t('phone')}</Label>
          <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <div>
        <Label htmlFor="linkedin">{t('linkedin')}</Label>
        <Input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
      </div>
      <div>
        <Label htmlFor="cv">{t('cv')}</Label>
        <Input id="cv" name="cv" type="file" accept="application/pdf" />
      </div>
      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea id="message" name="message" />
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
