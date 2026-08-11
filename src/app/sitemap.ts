import type { MetadataRoute } from 'next'

import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/i18n/routing'
import { payloadClient } from '@/lib/payload'
import { absoluteUrl, documentPath, type LinkableCollection } from '@/lib/urls'

export const revalidate = 3600

type Indexable = {
  slug: string
  updatedAt?: string
  availableLocales?: string[] | null
  hideFromSitemap?: boolean | null
  meta?: { noindex?: boolean }
  roleStatus?: string
}

/** One entry per canonical URL with its hreflang alternates (18.5 / 19.11). */
function entry(path: string, locales: Locale[], lastModified?: string, priority = 0.7): MetadataRoute.Sitemap[number] {
  const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(path, l)]))
  return {
    url: absoluteUrl(path, DEFAULT_LOCALE),
    lastModified: lastModified ? new Date(lastModified) : undefined,
    changeFrequency: 'weekly',
    priority,
    alternates: { languages },
  }
}

const localesOf = (doc: Indexable): Locale[] => {
  const declared = (doc.availableLocales ?? [DEFAULT_LOCALE]).filter((l): l is Locale =>
    (LOCALES as readonly string[]).includes(l),
  )
  return declared.length ? declared : [DEFAULT_LOCALE]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await payloadClient()

  const query = async (collection: LinkableCollection) => {
    const { docs } = await payload.find({
      collection,
      limit: 1000,
      depth: 0,
      locale: DEFAULT_LOCALE,
      where: { _status: { equals: 'published' } },
      // Only what the sitemap needs — this runs on every revalidation.
      select: { slug: true, updatedAt: true, availableLocales: true, hideFromSitemap: true, meta: true, roleStatus: true },
    })
    return docs as unknown as Indexable[]
  }

  const [pages, posts, services, jobs] = await Promise.all([
    query('pages'),
    query('posts'),
    query('services'),
    query('jobs'),
  ])

  const listings: MetadataRoute.Sitemap = [
    entry('/blog', [...LOCALES], undefined, 0.8),
    entry('/services', [...LOCALES], undefined, 0.9),
    entry('/careers', [...LOCALES], undefined, 0.8),
    entry('/contact', [...LOCALES], undefined, 0.8),
    entry('/meeting', [...LOCALES], undefined, 0.7),
  ]

  const fromCollection = (docs: Indexable[], collection: LinkableCollection, priority: number) =>
    docs
      // noindex, hidden and closed roles never appear — the sitemap and the
      // robots directives must not contradict each other (19.11).
      .filter((doc) => !doc.meta?.noindex && !doc.hideFromSitemap && doc.roleStatus !== 'closed')
      .map((doc) => entry(documentPath(collection, doc.slug), localesOf(doc), doc.updatedAt, priority))

  return [
    entry('/', [...LOCALES], undefined, 1),
    ...listings,
    ...fromCollection(
      pages.filter((p) => p.slug !== 'home'),
      'pages',
      0.7,
    ),
    ...fromCollection(services, 'services', 0.9),
    ...fromCollection(posts, 'posts', 0.6),
    ...fromCollection(jobs, 'jobs', 0.6),
  ]
}
