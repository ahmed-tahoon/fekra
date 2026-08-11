import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin } from 'lucide-react'

import { getDictionary } from '@/i18n/getDictionary'
import { isLocale, localeHref } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { JobDoc } from '../page-types'

export const revalidate = 900

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({ title: dict.careers.title, description: dict.careers.subtitle, path: '/careers', locale })
}

export default async function CareersIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, { docs }] = await Promise.all([
    getDictionary(locale),
    findDocs<JobDoc>({
      collection: 'jobs',
      locale,
      limit: 100,
      sort: '-publishedAt',
      where: { roleStatus: { equals: 'open' } },
    }),
  ])

  return (
    <div className="section">
      <div className="container-site">
        <header className="max-w-2xl">
          <h1 className="text-5xl">{dict.careers.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{dict.careers.subtitle}</p>
        </header>

        <h2 className="mt-14 text-2xl">{dict.careers.openRoles}</h2>

        {docs.length ? (
          <ul className="mt-6 divide-y divide-border border-y border-border">
            {docs.map((job) => (
              <li key={job.id}>
                <Link
                  href={localeHref(locale, `/careers/${job.slug}`)}
                  className="flex flex-col gap-2 py-6 transition-colors hover:bg-background-subtle md:flex-row md:items-center md:justify-between md:px-4"
                >
                  <div>
                    <h3 className="text-xl">{job.title}</h3>
                    {job.summary ? (
                      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{job.summary}</p>
                    ) : null}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    {job.department ? (
                      <span className="rounded-pill border border-border px-3 py-1">{job.department}</span>
                    ) : null}
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-4" aria-hidden />
                      {job.location}
                    </span>
                    {job.workModel ? (
                      <span className="rounded-pill bg-primary/10 px-3 py-1 text-primary capitalize">
                        {job.workModel}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 rounded-card border border-border bg-background-subtle p-10 text-center text-muted-foreground">
            {dict.careers.empty}
          </p>
        )}
      </div>
    </div>
  )
}
