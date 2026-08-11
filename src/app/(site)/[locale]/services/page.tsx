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
  return buildMetadata({ title: dict.nav.services, path: '/services', locale })
}

export default async function ServicesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, { docs }] = await Promise.all([
    getDictionary(locale),
    findDocs<ServiceDoc>({ collection: 'services', locale, limit: 100, sort: 'order' }),
  ])

  // 7.1 — top-level services first; landing pages nest under their parent.
  const roots = docs.filter((s) => !s.parent)
  const childrenOf = (id: string | number) =>
    docs.filter((s) => (typeof s.parent === 'object' ? s.parent?.id : s.parent) === id)

  return (
    <div className="section">
      <div className="container-site">
        <h1 className="text-5xl">{dict.nav.services}</h1>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roots.map((service) => {
            const children = childrenOf(service.id)
            return (
              <section key={service.id} className="rounded-card border border-border bg-card p-6">
                <h2 className="text-xl">
                  <Link href={localeHref(locale, `/services/${service.slug}`)}>{service.title}</Link>
                </h2>
                {service.summary ? (
                  <p className="mt-2 text-sm text-muted-foreground">{service.summary}</p>
                ) : null}
                {children.length ? (
                  // 18.10 — crawlable contextual links between overview and detail pages.
                  <ul className="mt-4 flex flex-col gap-1">
                    {children.map((child) => (
                      <li key={child.id}>
                        <Link
                          href={localeHref(locale, `/services/${child.slug}`)}
                          className="text-sm text-primary underline underline-offset-4"
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
