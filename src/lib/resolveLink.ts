import { type Locale, localeHref } from '@/i18n/routing'
import { documentHref, type LinkableCollection } from './urls'

export type PayloadLink = {
  type?: 'internal' | 'route' | 'external' | null
  label?: string | null
  route?: string | null
  url?: string | null
  newTab?: boolean | null
  analyticsId?: string | null
  reference?: { relationTo: string; value: { slug?: string } | string } | null
}

export type ResolvedLink = {
  href: string
  label: string
  external: boolean
  newTab: boolean
  analyticsId?: string
}

/**
 * Resolves a CMS link to its *final* URL. Internal links always render the
 * destination path, never a path that would 301 (20.7); an internal link whose
 * target was deleted returns null so the renderer can drop it instead of
 * shipping a dead `#` (5.8).
 */
export function resolveLink(link: PayloadLink | null | undefined, locale: Locale): ResolvedLink | null {
  if (!link?.label) return null

  const common = {
    label: link.label,
    newTab: Boolean(link.newTab),
    analyticsId: link.analyticsId ?? undefined,
  }

  if (link.type === 'external') {
    return link.url ? { ...common, href: link.url, external: true } : null
  }

  if (link.type === 'route') {
    return link.route ? { ...common, href: localeHref(locale, link.route), external: false } : null
  }

  const ref = link.reference
  if (!ref) return null
  const slug = typeof ref.value === 'string' ? undefined : ref.value?.slug
  if (!slug) return null

  return {
    ...common,
    href: documentHref(ref.relationTo as LinkableCollection, slug, locale),
    external: false,
  }
}
