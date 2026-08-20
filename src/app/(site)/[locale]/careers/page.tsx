import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

import { getDictionary } from '@/i18n/getDictionary'
import { isLocale, localeHref } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { JobDoc } from '../page-types'
import { CareersCta, HiringProcess, RoleRow, SectionLabel } from './parts'

export const revalidate = 900

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({ title: dict.careers.title, description: dict.careers.heroBody, path: '/careers', locale })
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

  /*
   * Grouped by team, but only once there are enough roles for grouping to help.
   * Below that it is a heading per role, which is noise, not structure.
   */
  const byTeam = new Map<string, JobDoc[]>()
  for (const job of docs) {
    const team = job.department?.trim() || dict.careers.allDepartments
    const bucket = byTeam.get(team)
    if (bucket) bucket.push(job)
    else byTeam.set(team, [job])
  }
  const grouped = docs.length >= 5 && byTeam.size > 1

  const why = [
    { title: dict.careers.why1Title, body: dict.careers.why1Body },
    { title: dict.careers.why2Title, body: dict.careers.why2Body },
    { title: dict.careers.why3Title, body: dict.careers.why3Body },
  ]

  return (
    <>
      {/* Hero: eyebrow, headline, one paragraph. No stat counters, no jump
          button — the roles are the next thing on the page anyway. */}
      <section className="relative isolate mt-[calc(var(--header-block)*-1)] overflow-hidden pt-[calc(var(--header-block)+clamp(2.5rem,7vw,5.5rem))] pb-14 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(117.67deg,rgba(238,252,243,0.45)_3.72%,rgba(220,239,247,0.45)_103.6%)] dark:bg-[linear-gradient(117.67deg,rgba(32,162,188,0.10)_3.72%,rgba(39,57,105,0.16)_103.6%)]"
        />
        <div className="container-site">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{dict.careers.eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.5px] text-balance text-navy-800 md:tracking-[-1px] dark:text-foreground">
              {dict.careers.heroTitle}
            </h1>
            <p className="mt-5 text-[15px]/7 text-ink-500 md:text-lg/8 dark:text-muted-foreground">
              {dict.careers.heroBody}
            </p>
          </div>
        </div>
      </section>

      {/* Open roles lead — it is what people came for. */}
      <section className="section pt-14 md:pt-20">
        <div className="container-site">
          <SectionLabel eyebrow={dict.careers.title} heading={dict.careers.openRoles} />

          {docs.length ? (
            grouped ? (
              <div className="mt-8 flex flex-col gap-10">
                {[...byTeam.entries()].map(([team, roles]) => (
                  <div key={team}>
                    <h3 className="text-xs font-semibold tracking-[0.16em] text-ink-500 uppercase dark:text-muted-foreground">
                      {team}
                    </h3>
                    <ul className="mt-1 divide-y divide-border border-t border-border">
                      {roles.map((job) => (
                        <RoleRow key={job.id} job={job} locale={locale} dict={dict} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="mt-8 divide-y divide-border border-y border-border">
                {docs.map((job) => (
                  <RoleRow key={job.id} job={job} locale={locale} dict={dict} />
                ))}
              </ul>
            )
          ) : (
            <div className="mt-8 border-y border-border py-16 text-center">
              <p className="text-ink-500 dark:text-muted-foreground">{dict.careers.empty}</p>
              <Link
                href={localeHref(locale, '/contact')}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                {dict.careers.noFitCta}
                <ArrowRight className="icon-flip size-4" aria-hidden />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Three plain claims, no cards. */}
      <section className="section pt-0">
        <div className="container-site">
          <SectionLabel eyebrow={dict.careers.whyEyebrow} heading={dict.careers.whyTitle} />
          <ul className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {why.map((item) => (
              <li key={item.title}>
                <h3 className="font-display text-base font-bold text-navy-800 dark:text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm/6 text-ink-500 dark:text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HiringProcess dict={dict} />
      <CareersCta dict={dict} locale={locale} />
    </>
  )
}
