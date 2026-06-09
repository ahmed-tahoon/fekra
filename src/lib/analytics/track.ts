'use client';

/**
 * Section 17.5 / 17.8 — consistent client-side event tracking.
 * Pushes to dataLayer (GTM) and gtag (GA4) with a stable naming convention:
 *   <object>_<action>  e.g. contact_submit, application_submit, cta_click
 */
type EventName =
  | 'contact_submit'
  | 'application_submit'
  | 'booking_open'
  | 'cta_click'
  | 'blog_read';

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer?.push({ event, ...params });
  w.gtag?.('event', event, params);
}
