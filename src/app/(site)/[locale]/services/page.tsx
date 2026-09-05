import Link from 'next/link'
import { notFound } from 'next/navigation'

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

  const [dict, { docs }] = await Promise.all([
    getDictionary(locale),
    findDocs<ServiceDoc>({
      collection: 'services',
      locale,
      limit: 100,
      sort: 'order',
      depth: 0,
      // The card grid needs five fields; without a select this query joins
      // every block table for every service and times out on the pooler.
      select: { title: true, slug: true, summary: true, parent: true, order: true },
    }),
  ])

  // 7.1 — top-level services first; landing pages nest under their parent.
  const roots = docs.filter((s) => !s.parent)
  const childrenOf = (id: string | number) =>
    docs.filter((s) => (typeof s.parent === 'object' ? s.parent?.id : s.parent) === id)

  return (
    <div className="section">
      <div className="container-site flex flex-col items-center gap-10 md:gap-14">
        {/* Same treatment as the home sections: gradient display heading over a
            muted standfirst, centred. */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(137.53deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {dict.nav.services}
            </span>
          </h1>
          <p className="max-w-2xl text-lg/7 text-ink-500 dark:text-muted-foreground">
            {dict.services.subtitle}
          </p>
        </div>

        <div className="grid w-full gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roots.map((service) => {
            const children = childrenOf(service.id)
            return (
              <section
                key={service.id}
                className="group relative flex flex-col gap-3 rounded-card border border-panel-grey bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift dark:border-border"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="font-display text-xl leading-7 font-bold text-navy-800 dark:text-foreground">
                    {/* Stretched link: the whole card is the target, only one
                        link in the tab order (23.2). */}
                    <Link
                      href={localeHref(locale, `/services/${service.slug}`)}
                      className="after:absolute after:inset-0"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <span
                    aria-hidden
                    className="grid size-[34px] shrink-0 place-items-center rounded-pill bg-[linear-gradient(135deg,rgba(72,155,194,0.4)_0%,rgba(142,142,142,0.1)_100%)] text-navy-800 transition-colors duration-300 group-hover:bg-primary group-hover:bg-none group-hover:text-white dark:text-foreground"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="icon-flip size-4"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
                {service.summary ? (
                  <p className="text-sm/6 text-ink-500 dark:text-muted-foreground">{service.summary}</p>
                ) : null}
                {children.length ? (
                  // 18.10 — crawlable contextual links between overview and detail
                  // pages. z-10 lifts them above the card's stretched link.
                  <ul className="relative z-10 mt-auto flex flex-wrap gap-2 border-t border-border pt-4">
                    {children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={localeHref(locale, `/services/${child.slug}`)}
                          className="inline-block rounded-pill border border-border bg-background-subtle px-3 py-1.5 text-xs text-ink-500 transition-colors hover:border-brand-500 hover:text-primary dark:text-muted-foreground"
                        >
                          {child.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
