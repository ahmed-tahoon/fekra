import { DEFAULT_LOCALE, isLocale } from '@/i18n/routing'
import { documentHref, siteUrl, type LinkableCollection } from '@/lib/urls'

/**
 * Draft preview link (4.8). The token is a shared secret checked by
 * /api/preview, which then enables Next's draft mode — no unpublished content
 * is reachable without it.
 */
export function previewUrl(
  collection: LinkableCollection,
  slug: string | undefined,
  locale: string | undefined,
): string {
  const resolved = isLocale(locale) ? locale : DEFAULT_LOCALE
  const path = documentHref(collection, slug ?? '', resolved)
  const params = new URLSearchParams({
    secret: process.env.PREVIEW_SECRET ?? '',
    path,
    collection,
  })
  return `${siteUrl()}/api/preview?${params.toString()}`
}
