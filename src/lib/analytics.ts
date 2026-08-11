/**
 * Analytics event names live here, once (22.10). The measurement map in
 * docs/ANALYTICS.md is generated from this object — if you add an event, add it
 * here and it is documented.
 */
export const EVENTS = {
  contactSubmit: 'contact_form_submit',
  applicationSubmit: 'job_application_submit',
  bookingClick: 'booking_cta_click',
  bookingComplete: 'booking_scheduled',
  newsletterSubmit: 'newsletter_signup',
  ctaClick: 'cta_click',
  languageSwitch: 'language_switch',
} as const

export type EventName = (typeof EVENTS)[keyof typeof EVENTS]

/**
 * Fires a GA4 event through the dataLayer. Never called on page load — only
 * from a confirmed success path, so a refresh cannot double-count a conversion
 * (11.7 / 22.6 / 22.7).
 */
export function track(event: EventName, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}

/** UTM values captured on entry and attached to the lead, not to the event (22.9). */
export function captureAttribution() {
  if (typeof window === 'undefined') return {}
  const params = new URLSearchParams(window.location.search)
  const stored = sessionStorage.getItem('fekra_attribution')
  const fresh = {
    utmSource: params.get('utm_source') ?? undefined,
    utmMedium: params.get('utm_medium') ?? undefined,
    utmCampaign: params.get('utm_campaign') ?? undefined,
    referrer: document.referrer || undefined,
  }
  const hasFresh = Object.values(fresh).some(Boolean)
  if (hasFresh) {
    sessionStorage.setItem('fekra_attribution', JSON.stringify(fresh))
    return fresh
  }
  return stored ? (JSON.parse(stored) as typeof fresh) : {}
}
