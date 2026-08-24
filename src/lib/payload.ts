import { cache } from 'react'

import { draftMode } from 'next/headers'
import { getPayload, type SelectType, type Where } from 'payload'
import configPromise from '@payload-config'

import type { Locale } from '@/i18n/routing'
import { isComingSoon } from './site-mode'

/** One Payload instance per server process. */
export const payloadClient = async () => getPayload({ config: configPromise })

type FindArgs = {
  collection: 'pages' | 'posts' | 'services' | 'jobs' | 'categories'
  locale: Locale
  slug?: string
  limit?: number
  page?: number
  where?: Where
  sort?: string
  depth?: number
  /** Column allow-list. Skips the block-table joins entirely — the full-layout
      query for a list of services is heavy enough to hit statement timeouts. */
  select?: SelectType
}

/**
 * `draftMode()` throws outside a request — `generateStaticParams` runs at build
 * time with no HTTP context. Every caller routes through here, so the guard
 * lives here once instead of at each call site.
 */
async function isDraft(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    return false
  }
}

/**
 * Draft mode reads unpublished versions; published reads are cached by the
 * route segment itself (`export const revalidate` + the revalidatePath calls in
 * the afterChange hooks).
 *
 * Deliberately NOT wrapped in `unstable_cache`: that stores entries under cache
 * *tags*, while publishing invalidates by *path*. Two namespaces meant a
 * published article stayed invisible until its timer expired. One cache layer,
 * one invalidation mechanism (17.4 / 4.3).
 */
export async function findDocs<T = unknown>({
  collection,
  locale,
  limit = 12,
  page = 1,
  where = {} as Where,
  sort,
  depth = 2,
  select,
}: FindArgs): Promise<{ docs: T[]; totalPages: number; totalDocs: number }> {
  const draft = await isDraft()
  const payload = await payloadClient()

  // Only draft-enabled collections have a queryable `_status`; asking for it on
  // e.g. `categories` is a 400. Read it from the config so it cannot drift.
  const hasDrafts = Boolean(payload.collections[collection]?.config.versions?.drafts)

  const result = await payload.find({
    collection,
    locale,
    fallbackLocale: 'en',
    draft,
    overrideAccess: draft,
    depth,
    limit,
    page,
    sort,
    select,
    where: draft || !hasDrafts ? where : { ...where, _status: { equals: 'published' } },
  })

  return { docs: result.docs as T[], totalPages: result.totalPages, totalDocs: result.totalDocs }
}

/*
 * `cache()` dedupes within one request: generateMetadata and the page both ask
 * for the same document, and the layout and page both ask for site-settings —
 * without it each render paid for every query twice. It only memoizes on
 * primitive-arg identity, which is why findDoc/getGlobal are wrapped and the
 * object-arg findDocs is not.
 *
 * Depth 2, not 3: the deepest chain any renderer follows is block -> media (or
 * block -> category.slug), one level. resolveLink reads reference.value.slug,
 * also one level. Each extra depth fans out into per-relationship queries
 * against a remote database.
 */
export const findDoc = cache(async function findDoc<T = unknown>(
  collection: FindArgs['collection'],
  slug: string,
  locale: Locale,
  depth = 2,
): Promise<T | null> {
  const { docs } = await findDocs<T>({
    collection,
    locale,
    limit: 1,
    depth,
    where: { slug: { equals: slug } },
  })
  return docs[0] ?? null
})

// Depth 1: header/footer links need reference.value.slug and nothing deeper.
// Depth 2 made the header global populate its referenced pages' own relations
// — a full second per request on its own.
export const getGlobal = cache(async function getGlobal<T = unknown>(
  slug: 'header' | 'footer' | 'site-settings',
  locale: Locale,
): Promise<T> {
  const payload = await payloadClient()
  return (await payload.findGlobal({ slug, locale, fallbackLocale: 'en', depth: 1 })) as T
})

/**
 * Slug list for `generateStaticParams`. A build must not die because the
 * database is briefly unreachable or empty on a first deploy — the pages still
 * render on demand and get cached, they just are not prerendered. The failure
 * is logged rather than swallowed silently.
 */
export async function staticSlugs(
  collection: FindArgs['collection'],
  locale: Locale,
  limit = 500,
): Promise<{ slug: string }[]> {
  // Behind the holding page these routes are rewritten before they render,
  // so asking the CMS for slugs is only a slower build and noisier logs.
  if (isComingSoon()) return []

  try {
    const { docs } = await findDocs<{ slug: string }>({
      collection,
      locale,
      limit,
      depth: 0,
      select: { slug: true },
    })
    return docs.map(({ slug }) => ({ slug }))
  } catch (error) {
    console.warn(`generateStaticParams: skipping prerender for "${collection}" —`, error)
    return []
  }
}
