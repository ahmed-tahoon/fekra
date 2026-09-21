import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, Users } from 'lucide-react'

import { getDictionary } from '@/i18n/getDictionary'
import { isLocale } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { JobDoc } from '../page-types'
import { LegacyCareers } from './LegacyCareers'

export const revalidate = 900

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({
    title: dict.careers.title,
    description: dict.careers.heroBody,
    path: '/careers',
    locale,
  })
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
    <>
      {/* A team-led hero with a direct jump to the current openings. */}
      <section className="relative isolate mt-[calc(var(--header-block)*-1)] overflow-hidden pt-[calc(var(--header-block)+clamp(2.5rem,7vw,5.5rem))] pb-14 md:pb-20">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(117.67deg,rgba(238,252,243,0.45)_3.72%,rgba(220,239,247,0.45)_103.6%)] dark:bg-none"
        />
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-[680px]">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              {dict.careers.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.8vw,3.5rem)] leading-[1.08] font-bold tracking-[-0.5px] text-balance text-navy-800 md:tracking-[-1px] dark:text-foreground">
              {dict.careers.heroTitle}
            </h1>
            <p className="mt-5 text-[15px]/7 text-ink-500 md:text-lg/8 dark:text-muted-foreground">
              {dict.careers.heroBody}
            </p>
            <a href="#open-roles" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-pill bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover">{dict.careers.openRoles}<ArrowRight className="icon-flip size-4" aria-hidden /></a>
          </div>
          <div className="grid grid-cols-2 items-center gap-4" aria-hidden>
            <Image src="/images/team/team-planning-session.webp" alt="" width={360} height={440} priority className="aspect-[4/5] w-full rounded-tl-[64px] rounded-br-[32px] object-cover" />
            <div className="flex flex-col gap-4 pt-10">
              <Image src="/images/team/team-pairing-session.webp" alt="" width={320} height={240} priority className="aspect-[4/3] w-full rounded-tr-[40px] rounded-bl-[32px] object-cover" />
              <div className="rounded-tr-[32px] rounded-bl-[32px] bg-brand-100 p-5 text-navy-800 dark:bg-card dark:text-foreground"><Users className="mb-3 size-6 text-primary" /><p className="font-display text-lg font-semibold">{dict.careers.whyTitle}</p></div>
            </div>
          </div>
        </div>
      </section>

      <LegacyCareers jobs={docs} dict={dict} locale={locale} />
    </>
  )
}
