'use client'

import { useSyncExternalStore } from 'react'

import { onConsentChange, readConsent, type ConsentState } from './consent'

/**
 * The consent cookie is an external store, so it is read with the primitive
 * built for that job instead of a state-plus-effect pair. Server render returns
 * `null` (unknown), which is what makes the banner appear only after hydration
 * and keeps every consent-gated script off the server-rendered HTML.
 *
 * `null` = the visitor has not answered yet.
 */
let cached: ConsentState | null | undefined

const getSnapshot = (): ConsentState | null => {
  // Cached so the snapshot is referentially stable between renders.
  if (cached === undefined) cached = readConsent()
  return cached
}

const subscribe = (notify: () => void) =>
  onConsentChange((state) => {
    cached = state
    notify()
  })

const getServerSnapshot = (): ConsentState | null => null

export const useConsent = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
