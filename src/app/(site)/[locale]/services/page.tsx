import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check } from 'lucide-react'

import { getDictionary } from '@/i18n/getDictionary'
import { isLocale, localeHref } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { ServiceDoc } from '../page-types'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({
    title: dict.nav.services,
    description: dict.services.subtitle,
    path: '/services',
    locale,
  })
}

export default async function ServicesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { docs } = await findDocs<ServiceDoc>({
    collection: 'services',
    locale,
    limit: 100,
    sort: 'order',
    depth: 0,
    // The card grid needs five fields; without a select this query joins
    // every block table for every service and times out on the pooler.
    select: { title: true, slug: true, summary: true, parent: true, order: true },
  })

  // 7.1 — top-level services first; landing pages nest under their parent.
  const roots = docs.filter((s) => !s.parent)
  const childrenOf = (id: string | number) =>
    docs.filter((s) => (typeof s.parent === 'object' ? s.parent?.id : s.parent) === id)
  const specialistFamilies = roots.filter((service) => childrenOf(service.id).length)
  const deliveryServices = roots.filter((service) => !childrenOf(service.id).length)

  const ServiceCard = ({
    service,
    featured = false,
  }: {
    service: ServiceDoc
    featured?: boolean
  }) => {
    const children = childrenOf(service.id)
    return (
      <article
        className={`group relative flex h-full flex-col rounded-panel border bg-card p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lift dark:border-border ${
          featured ? 'border-brand-200 md:p-7' : 'border-panel-grey'
        }`}
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <h3 className="font-display text-xl leading-7 font-bold text-navy-800 dark:text-foreground">
              <Link
                href={localeHref(locale, `/services/${service.slug}`)}
                className="after:absolute after:inset-0 focus-visible:outline-none"
              >
                {service.title}
              </Link>
            </h3>
            {service.summary ? (
              <p className="mt-3 text-sm/6 text-ink-500 dark:text-muted-foreground">
                {service.summary}
              </p>
            ) : null}
          </div>
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-50 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white dark:bg-background-subtle"
          >
            <ArrowUpRight className="size-4" strokeWidth={2.25} />
          </span>
        </div>

        {children.length ? (
          <ul className="relative z-10 mt-6 grid gap-1 border-t border-border pt-4 sm:grid-cols-2">
            {children.map((child) => (
              <li key={child.id}>
                <Link
                  href={localeHref(locale, `/services/${child.slug}`)}
                  className="flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm text-ink-500 transition-colors hover:bg-brand-50 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-muted-foreground dark:hover:bg-background-subtle"
                >
                  <Check className="size-3.5 shrink-0 text-primary" aria-hidden />
                  <span>{child.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </article>
    )
  }

  return (
    <>
      <section className="relative isolate mt-[calc(var(--header-block)*-1)] overflow-hidden pt-[calc(var(--header-block)+clamp(3rem,7vw,6rem))] pb-16 md:pb-24">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(117.67deg,rgba(238,252,243,0.78)_3.72%,rgba(220,239,247,0.78)_103.6%)] dark:bg-[linear-gradient(117.67deg,rgba(32,162,188,0.10)_3.72%,rgba(39,57,105,0.16)_103.6%)]"
        />
        <div className="container-site grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[780px]">
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              FEKRA Services
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.25rem,5.4vw,4.25rem)] leading-[1.02] font-bold tracking-[-1px] text-balance text-navy-800 dark:text-foreground">
              Build, scale, and ship with the right technology partner.
            </h1>
            <p className="mt-6 max-w-[66ch] text-base/7 text-ink-500 md:text-lg/8 dark:text-muted-foreground">
              Bespoke product development, IT consulting, quality engineering, and vetted
              specialists—organized around the way you want to build.
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-3 sm:gap-5">
            {[
              ['7+', 'Years delivering'],
              ['6–14', 'Days to staff'],
              ['30–60%', 'Cost savings'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="min-w-0 rounded-card border border-white/80 bg-white/70 p-4 text-center shadow-card backdrop-blur-sm dark:border-border dark:bg-card/70"
              >
                <dt className="text-[11px] leading-4 text-ink-500 dark:text-muted-foreground">
                  {label}
                </dt>
                <dd className="font-display text-xl font-bold text-navy-800 sm:text-2xl dark:text-foreground">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {specialistFamilies.length ? (
        <section className="section">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Hire specialists
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-bold text-navy-800 dark:text-foreground">
                Choose a team by platform or discipline.
              </h2>
              <p className="mt-4 text-base/7 text-ink-500 dark:text-muted-foreground">
                Start with a service family, then explore the role-specific landing pages for the
                exact expertise you need.
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {specialistFamilies.map((service) => (
                <ServiceCard key={service.id} service={service} featured />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {deliveryServices.length ? (
        <section className="section bg-background-subtle dark:bg-background">
          <div className="container-site">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Delivery & consulting
              </p>
              <h2 className="mt-3 font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-tight font-bold text-navy-800 dark:text-foreground">
                Bring in a complete, accountable delivery capability.
              </h2>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {deliveryServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
