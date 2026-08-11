import Link from 'next/link'
import { notFound } from 'next/navigation'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { ApplicationForm } from '@/components/forms/ApplicationForm'
import { getDictionary } from '@/i18n/getDictionary'
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/i18n/routing'
import { breadcrumbSchema, jobPostingSchema } from '@/lib/jsonld'
import { findDoc, getGlobal, staticSlugs } from '@/lib/payload'
import { buildMetadata, notFoundMetadata } from '@/lib/seo'

import type { JobDoc, SettingsLite } from '../../page-types'

export const revalidate = 900

export async function generateStaticParams() {
  const slugs = await staticSlugs('jobs', DEFAULT_LOCALE, 200)
  return slugs.map(({ slug }) => ({ locale: DEFAULT_LOCALE, slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) return notFoundMetadata
  const job = await findDoc<JobDoc>('jobs', slug, locale)
  if (!job) return notFoundMetadata

  return buildMetadata({
    title: job.meta?.title ?? job.title,
    description: job.meta?.description ?? job.summary ?? undefined,
    path: `/careers/${slug}`,
    locale,
    availableLocales: job.availableLocales,
    // A closed role stays reachable but leaves the index (10.9).
    noindex: job.meta?.noindex || job.roleStatus === 'closed',
    canonicalOverride: job.meta?.canonicalOverride,
  })
}

export default async function JobPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  if (!isLocale(locale)) notFound()

  const [job, dict, settings] = await Promise.all([
    findDoc<JobDoc>('jobs', slug, locale),
    getDictionary(locale),
    getGlobal<SettingsLite>('site-settings', locale),
  ])
  if (!job) notFound()

  const isOpen = job.roleStatus !== 'closed'

  return (
    <div className="section">
      <div className="container-site grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <nav aria-label={dict.common.breadcrumb} className="text-sm text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href={localeHref(locale, '/')}>{dict.nav.home}</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={localeHref(locale, '/careers')}>{dict.careers.title}</Link>
              </li>
            </ol>
          </nav>

          <h1 className="mt-6 text-4xl md:text-5xl">{job.title}</h1>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            {job.department ? (
              <div>
                <dt className="text-muted-foreground">{dict.careers.department}</dt>
                <dd className="font-medium">{job.department}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-muted-foreground">{dict.careers.location}</dt>
              <dd className="font-medium">{job.location}</dd>
            </div>
            {job.workModel ? (
              <div>
                <dt className="text-muted-foreground">{dict.careers.workModel}</dt>
                <dd className="font-medium capitalize">{job.workModel}</dd>
              </div>
            ) : null}
            {job.employmentType ? (
              <div>
                <dt className="text-muted-foreground">{dict.careers.employmentType}</dt>
                <dd className="font-medium lowercase">{job.employmentType.replace('_', ' ')}</dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-10 flex flex-col gap-10">
            <RichText data={job.description} />
            {job.requirements ? <RichText data={job.requirements} /> : null}
            {job.benefits ? <RichText data={job.benefits} /> : null}
          </div>
        </div>

        <aside id="apply" className="h-fit rounded-panel border border-border bg-card p-6 lg:sticky lg:top-28">
          <h2 className="text-2xl">{dict.careers.applyNow}</h2>
          <div className="mt-6">
            <ApplicationForm
              jobId={job.id}
              jobTitle={job.title}
              dict={dict}
              locale={locale}
              disabled={!isOpen}
            />
          </div>
        </aside>
      </div>

      <JsonLd
        data={[
          ...(isOpen
            ? [
                jobPostingSchema({
                  title: job.title,
                  description: job.summary ?? job.title,
                  path: `/careers/${slug}`,
                  locale,
                  publishedAt: job.publishedAt,
                  validThrough: job.validThrough,
                  employmentType: job.employmentType,
                  workModel: job.workModel,
                  city: job.city ?? job.location,
                  countryCode: job.countryCode,
                  organizationName: settings.siteName ?? 'FEKRA',
                }),
              ]
            : []),
          breadcrumbSchema(
            [
              { name: dict.nav.home, path: '/' },
              { name: dict.careers.title, path: '/careers' },
              { name: job.title, path: `/careers/${slug}` },
            ],
            locale,
          ),
        ]}
      />
    </div>
  )
}
