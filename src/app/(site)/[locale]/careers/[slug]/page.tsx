import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { ApplicationForm } from '@/components/forms/ApplicationForm'
import { getDictionary } from '@/i18n/getDictionary'
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/i18n/routing'
import { breadcrumbSchema, jobPostingSchema } from '@/lib/jsonld'
import { findDoc, findDocs, getGlobal, staticSlugs } from '@/lib/payload'
import { buildMetadata, notFoundMetadata } from '@/lib/seo'

import type { JobDoc, SettingsLite } from '../../page-types'
import { HiringProcess, JobMeta, RoleRow, SectionLabel } from '../parts'

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

  // Other open roles, this one dropped. Fetched one over the display count so a
  // full row survives removing the current role from the results.
  const { docs: siblings } = await findDocs<JobDoc>({
    collection: 'jobs',
    locale,
    limit: 4,
    sort: '-publishedAt',
    where: { roleStatus: { equals: 'open' } },
  })
  const related = siblings.filter((other) => other.slug !== job.slug).slice(0, 3)

  return (
    <>
      {/* Hero band — the gradient wash and type scale the home page opens with. */}
      <section className="relative isolate mt-[calc(var(--header-block)*-1)] overflow-hidden pt-[calc(var(--header-block)+clamp(1.5rem,4.5vw,3.5rem))] pb-10 md:pb-14">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(117.67deg,rgba(238,252,243,0.55)_3.72%,rgba(220,239,247,0.55)_103.6%)] dark:hidden"
        />
        <div className="container-site">
          <nav aria-label={dict.common.breadcrumb}>
            <Link
              href={localeHref(locale, '/careers')}
              className="inline-flex items-center gap-2 text-sm text-ink-500 transition-colors hover:text-primary dark:text-muted-foreground"
            >
              <ArrowLeft className="icon-flip size-4" aria-hidden />
              {dict.careers.backToRoles}
            </Link>
          </nav>

          <div className="mt-6 max-w-[760px]">
            {job.department ? (
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{job.department}</p>
            ) : null}
            <h1 className="mt-3 font-display text-[clamp(1.875rem,4.4vw,3.25rem)] leading-[1.08] font-bold tracking-[-0.5px] text-balance text-navy-800 md:tracking-[-1px] dark:text-foreground">
              {job.title}
            </h1>
            {job.summary ? (
              <p className="mt-4 text-[15px]/6 text-ink-500 md:text-lg/7 dark:text-muted-foreground">{job.summary}</p>
            ) : null}
            <JobMeta job={job} dict={dict} className="mt-6" />

            {isOpen ? (
              <a
                href="#apply"
                className="mt-8 inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
              >
                {dict.careers.applyNow}
                <ArrowRight className="icon-flip size-4" aria-hidden />
              </a>
            ) : (
              <p className="mt-8 text-sm text-ink-500 dark:text-muted-foreground">
                {dict.careers.closed}
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="section pt-10 md:pt-14">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
          <div className="min-w-0">
            <div className="flex flex-col gap-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy-800 dark:[&_h2]:text-foreground [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold">
              <RichText data={job.description} />
              {job.requirements ? <RichText data={job.requirements} /> : null}
              {job.benefits ? <RichText data={job.benefits} /> : null}
            </div>

            {/* What happens next — the same four steps as the index, compact.
                Answers the question every candidate has before they upload. */}
            <div className="mt-14 border-t border-border pt-8">
              <h2 className="font-display text-lg font-bold text-navy-800 dark:text-foreground">
                {dict.careers.whatNextTitle}
              </h2>
              <div className="mt-6">
                <HiringProcess dict={dict} compact />
              </div>
            </div>
          </div>

          <aside
            id="apply"
            className="h-fit scroll-mt-28 rounded-panel border border-border bg-card p-6 lg:sticky lg:top-28"
          >
            <h2 className="font-display text-2xl font-bold text-navy-800 dark:text-foreground">
              {dict.careers.applyNow}
            </h2>
            <p className="mt-2 text-sm/6 text-ink-500 dark:text-muted-foreground">{dict.careers.applyAside}</p>
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
      </div>

      {related.length ? (
        <section className="section pt-0">
          <div className="container-site">
            <SectionLabel eyebrow={dict.careers.title} heading={dict.careers.relatedTitle} />
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {related.map((other) => (
                <RoleRow key={other.id} job={other} locale={locale} dict={dict} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}

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
    </>
  )
}
