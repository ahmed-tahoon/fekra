import Image from 'next/image'
import Link from 'next/link'

import { BrandLogo } from './BrandLogo'


import type { Dictionary } from '@/i18n/getDictionary'
import { type Locale, localeHref } from '@/i18n/routing'
import { resolveLink, type PayloadLink } from '@/lib/resolveLink'

/*
 * The comp draws real marks, not initials. This lucide build ships no brand
 * icons, and pulling a whole icon pack for four glyphs is not worth it, so the
 * paths are inline. Anything unmapped falls back to a text label.
 */
const SOCIAL_PATH: Record<string, string> = {
  linkedin:
    'M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z',
  facebook:
    'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7H7.9v-2.94h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78L15.9 22c4.34-.79 8-4.94 8-9.94z',
  youtube:
    'M21.58 7.19a2.51 2.51 0 0 0-1.77-1.78C18.25 5 12 5 12 5s-6.25 0-7.81.41a2.51 2.51 0 0 0-1.77 1.78A26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.51 2.51 0 0 0 1.77 1.78C5.75 19 12 19 12 19s6.25 0 7.81-.41a2.51 2.51 0 0 0 1.77-1.78A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81zM10 15.02V8.98L15.2 12 10 15.02z',
  whatsapp:
    'M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2zm5.83 14.24c-.24.68-1.42 1.31-1.95 1.36-.52.05-1 .24-3.38-.71-2.85-1.13-4.66-4.05-4.8-4.24-.14-.19-1.15-1.53-1.15-2.92s.73-2.07 1-2.36c.26-.28.57-.35.76-.35h.55c.17 0 .42-.07.65.5.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.29 1.41.28.14.45.12.62-.07.17-.19.71-.83.9-1.12.19-.28.38-.24.64-.14.26.09 1.66.78 1.94.93.28.14.47.21.54.33.07.12.07.68-.17 1.36z',
}

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
  // The comp's "Contact Us" column is the head office's phone and email.
  const contact = offices?.find((o) => o.isHeadquarters) ?? offices?.[0]

  return (
    /*
     * Figma 1:14023. No top margin: the navy band sits directly on the footer
     * in the design, so any gap here breaks that join.
     */
    <footer className="border-t border-border bg-brand-50 dark:bg-background-subtle">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-20">
        <div className="max-w-[340px]">
          <Link href={localeHref(locale, '/')} aria-label={siteName}>
            <BrandLogo />
          </Link>
          {data.blurb ? <p className="mt-5 text-sm text-muted-foreground">{data.blurb}</p> : null}

          {socials?.length ? (
            <ul className="mt-6 flex flex-wrap gap-3">
              {socials.map((s) => {
                const path = SOCIAL_PATH[s.platform.toLowerCase()]
                return (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      aria-label={s.platform}
                      className="inline-grid size-9 place-items-center rounded-lg bg-card text-navy-800 shadow-card transition-colors hover:text-primary dark:text-foreground"
                    >
                      {path ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]" aria-hidden>
                          <path d={path} />
                        </svg>
                      ) : (
                        <span className="text-xs capitalize">{s.platform.slice(0, 2)}</span>
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        {offices?.length ? (
          <div>
            <h2 className="font-display text-sm font-bold tracking-[0.35px] text-navy-800 dark:text-foreground">
              {dict.contact.offices}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {offices.map((office) => (
                <li key={`${office.city}-${office.country}`}>
                  {office.country}, {office.city}
                  {office.isHeadquarters ? ` (${dict.contact.headquarters})` : ''}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {contact ? (
          <div>
            <h2 className="font-display text-sm font-bold tracking-[0.35px] text-navy-800 dark:text-foreground">
              {dict.nav.contact}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              {contact.phone ? (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="transition-colors hover:text-foreground">
                    <span dir="ltr">{contact.phone}</span>
                  </a>
                </li>
              ) : null}
              {contact.email ? (
                <li>
                  <a href={`mailto:${contact.email}`} className="transition-colors hover:text-foreground">
                    <span dir="ltr">{contact.email}</span>
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}

        {(data.columns ?? []).map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="font-display text-sm font-bold tracking-[0.35px] text-navy-800 dark:text-foreground">{column.title}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {(column.links ?? []).map((entry) => {
                const link = resolveLink(entry.link, locale)
                if (!link) return null
                return (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}
      </div>

      {data.newsletter?.enabled ? (
        <div className="container-site grid items-center gap-10 pb-16 lg:grid-cols-2">
          <div className="flex items-start gap-6">
            <Image
              aria-hidden
              src="/images/decor/footer-promo.png"
              alt=""
              width={160}
              height={120}
              className="hidden h-[120px] w-40 shrink-0 rounded-xl object-cover sm:block"
            />
            <div>
              {data.newsletter.heading ? (
                <h2 className="font-display text-xl leading-snug font-bold text-navy-800 dark:text-foreground">
                  {data.newsletter.heading}
                </h2>
              ) : null}
              {data.newsletter.body ? (
                <p className="mt-2 text-sm text-muted-foreground">{data.newsletter.body}</p>
              ) : null}
            </div>
          </div>
          {/* min-w-0: without it the grid track takes the form's max-content
              width and the footer overflows narrow phones. */}
          <div className="flex min-w-0 flex-col gap-3 lg:w-[420px] lg:justify-self-end">
            {/* Comp: the form carries its own line, separate from the promo body. */}
            <p className="ps-1 text-sm text-muted-foreground">{dict.form.newsletterHint}</p>
            <NewsletterForm dict={dict} locale={locale} />
          </div>
        </div>
      ) : null}

      {/* Comp: the bottom rule is navy, and the socials repeat as small muted marks. */}
      <div className="border-t border-navy-800 dark:border-border">
        <div className="container-site flex flex-col gap-4 py-5 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>{data.copyright ?? `© ${new Date().getFullYear()} ${siteName}. All rights reserved.`}</p>
          <div className="flex flex-wrap items-center gap-5">
            <ul className="flex flex-wrap gap-4">
              {legal.map((link) => (
                <li key={link!.href}>
                  <Link href={link!.href} className="transition-colors hover:text-foreground">
                    {link!.label}
                  </Link>
                </li>
              ))}
            </ul>
            {socials?.length ? (
              <ul className="flex items-center gap-5">
                {socials.map((s) => {
                  const path = SOCIAL_PATH[s.platform.toLowerCase()]
                  if (!path) return null
                  return (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        aria-label={s.platform}
                        className="transition-colors hover:text-foreground"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden>
                          <path d={path} />
                        </svg>
                      </a>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}
