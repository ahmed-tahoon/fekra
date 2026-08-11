export type ConsentState = { analytics: boolean; marketing: boolean }

export const CONSENT_COOKIE = 'fekra_consent'
const EVENT = 'fekra:consent'

export const DENIED: ConsentState = { analytics: false, marketing: false }

/** Returns null when the visitor has not answered yet — the banner needs that. */
export function readConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const raw = document.cookie
    .split('; ')
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.split('=')[1]
  if (!raw) return null
  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as Partial<ConsentState>
    return { analytics: Boolean(parsed.analytics), marketing: Boolean(parsed.marketing) }
  } catch {
    return null
  }
}

export function writeConsent(state: ConsentState) {
  const value = encodeURIComponent(JSON.stringify(state))
  // 6 months, then ask again — matches the usual EU guidance.
  document.cookie = `${CONSENT_COOKIE}=${value}; path=/; max-age=${60 * 60 * 24 * 180}; samesite=lax${
    location.protocol === 'https:' ? '; secure' : ''
  }`
  // Google Consent Mode v2 update — tags already on the page react immediately.
  window.gtag?.('consent', 'update', {
    analytics_storage: state.analytics ? 'granted' : 'denied',
    ad_storage: state.marketing ? 'granted' : 'denied',
    ad_user_data: state.marketing ? 'granted' : 'denied',
    ad_personalization: state.marketing ? 'granted' : 'denied',
  })
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT, { detail: state }))
}

export function onConsentChange(handler: (state: ConsentState) => void): () => void {
  const listener = (event: Event) => handler((event as CustomEvent<ConsentState>).detail)
  window.addEventListener(EVENT, listener)
  return () => window.removeEventListener(EVENT, listener)
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
