import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import type { Dictionary } from '@/i18n/getDictionary'
import { type Locale, localeHref } from '@/i18n/routing'
import { resolveLink, type PayloadLink } from '@/lib/resolveLink'

import { NewsletterForm } from './NewsletterForm'

export type FooterData = {
  tagline?: string | null
  blurb?: string | null
  columns?: { title: string; links?: { link?: PayloadLink }[] }[] | null
  newsletter?: { enabled?: boolean; heading?: string | null; body?: string | null } | null
  legalLinks?: { link?: PayloadLink }[] | null
  copyright?: string | null
}

type Office = {
  city?: string | null
  country?: string | null
  phone?: string | null
  email?: string | null
  isHeadquarters?: boolean | null
}

export function Footer({
  data,
  locale,
  dict,
  siteName,
  offices,
  socials,
}: {
  data: FooterData
  locale: Locale
  dict: Dictionary
  siteName: string
  offices?: Office[] | null
  socials?: { platform: string; url: string }[] | null
}) {
  const legal = (data.legalLinks ?? []).map((l) => resolveLink(l.link, locale)).filter(Boolean)

  return (
    <footer className="mt-24 border-t border-border bg-brand-50 dark:bg-background-subtle">
      <div className="container-wide grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href={localeHref(locale, '/')} className="font-display text-2xl font-bold">
            {siteName}
          </Link>
          {data.tagline ? <p className="mt-3 text-sm font-medium text-primary">{data.tagline}</p> : null}
          {data.blurb ? <p className="mt-3 text-sm text-muted-foreground">{data.blurb}</p> : null}

          {socials?.length ? (
            <ul className="mt-6 flex gap-3">
              {socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-grid size-11 place-items-center rounded-pill border border-border capitalize transition-colors hover:bg-card"
                    aria-label={s.platform}
                  >
                    {s.platform.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {(data.columns ?? []).map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold tracking-wide uppercase">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {(column.links ?? []).map((entry) => {
                const link = resolveLink(entry.link, locale)
                if (!link) return null
                return (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}

        {offices?.length ? (
          <div>
            <h2 className="text-sm font-semibold tracking-wide uppercase">{dict.contact.offices}</h2>
            <ul className="mt-4 flex flex-col gap-4 text-sm text-muted-foreground">
              {offices.map((office) => (
                <li key={`${office.city}-${office.country}`} className="flex gap-2">
                  <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">
                      {office.country}, {office.city}
                      {office.isHeadquarters ? ` (${dict.contact.headquarters})` : ''}
                    </p>
                    {office.phone ? (
                      <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-1.5">
                        <Phone className="size-3.5" aria-hidden />
                        <span dir="ltr">{office.phone}</span>
                      </a>
                    ) : null}
                    {office.email ? (
                      <a href={`mailto:${office.email}`} className="mt-1 flex items-center gap-1.5">
                        <Mail className="size-3.5" aria-hidden />
                        <span dir="ltr">{office.email}</span>
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {data.newsletter?.enabled ? (
        <div className="border-t border-border">
          <div className="container-wide flex flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              {data.newsletter.heading ? (
                <h2 className="font-display text-xl font-bold">{data.newsletter.heading}</h2>
              ) : null}
              {data.newsletter.body ? (
                <p className="mt-1 text-sm text-muted-foreground">{data.newsletter.body}</p>
              ) : null}
            </div>
            <NewsletterForm dict={dict} locale={locale} />
          </div>
        </div>
      ) : null}

      <div className="border-t border-border">
        <div className="container-wide flex flex-col gap-4 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{data.copyright ?? `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}</p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((link) => (
              <li key={link!.href}>
                <Link href={link!.href} className="transition-colors hover:text-foreground">
                  {link!.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
