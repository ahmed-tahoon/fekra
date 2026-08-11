import 'server-only'

import type { Locale } from './routing'
import en from './dictionaries/en.json'

export type Dictionary = typeof en

/**
 * UI-chrome strings only. Page content lives in Payload with per-locale fields
 * (14.6/14.10) — this file never duplicates editorial copy.
 *
 * Dynamic import keeps the four non-active locales out of every server bundle.
 */
const loaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: async () => ({ default: en }),
  ar: () => import('./dictionaries/ar.json') as Promise<{ default: Dictionary }>,
  de: () => import('./dictionaries/de.json') as Promise<{ default: Dictionary }>,
  fr: () => import('./dictionaries/fr.json') as Promise<{ default: Dictionary }>,
  es: () => import('./dictionaries/es.json') as Promise<{ default: Dictionary }>,
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return (await loaders[locale]()).default
}

export { t } from './format'
