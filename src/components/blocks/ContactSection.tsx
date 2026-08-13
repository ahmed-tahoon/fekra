import { Mail, MapPin, Phone } from 'lucide-react'

import { ContactForm } from '@/components/forms/ContactForm'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'

import type { BlockProps } from './types'

type Office = {
  city?: string | null
  country?: string | null
  addressLine?: string | null
  phone?: string | null
  email?: string | null
  mapUrl?: string | null
  isHeadquarters?: boolean | null
}

export function ContactSection({
  block,
  locale,
  dict,
  offices,
  as: Heading = 'h2',
}: {
  block: BlockProps
  locale: Locale
  dict: Dictionary
  offices?: Office[] | null
  /** `h1` when this section IS the page (the /contact route), `h2` inside a page. */
  as?: 'h1' | 'h2'
}) {
  return (
    <section id={block.anchor ?? 'contact'} className="section">
      <div className="container-site grid gap-12 lg:grid-cols-2">
        <div>
          {block.eyebrow ? (
            <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          {/* Same gradient lockup as every other section heading (Figma 1:11728). */}
          <Heading className="mt-2 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(142deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading ?? dict.contact.title}
            </span>
          </Heading>
          <p className="mt-4 max-w-lg text-lg text-muted-foreground">{block.body ?? dict.contact.subtitle}</p>

          {block.showOffices !== false && offices?.length ? (
            <div className="mt-10">
              <h3 className="text-sm font-semibold tracking-wide uppercase">{dict.contact.offices}</h3>
              <ul className="mt-4 grid gap-5 sm:grid-cols-2">
                {offices.map((office) => (
                  <li key={`${office.city}-${office.country}`} className="rounded-card border border-border p-5">
                    <p className="flex items-center gap-2 font-medium">
                      <MapPin className="size-4 text-primary" aria-hidden />
                      {office.city}, {office.country}
                    </p>
                    {office.addressLine ? (
                      <p className="mt-2 text-sm text-muted-foreground">{office.addressLine}</p>
                    ) : null}
                    {office.phone ? (
                      <a
                        href={`tel:${office.phone.replace(/\s/g, '')}`}
                        className="mt-2 flex items-center gap-2 text-sm"
                      >
                        <Phone className="size-3.5" aria-hidden />
                        <span dir="ltr">{office.phone}</span>
                      </a>
                    ) : null}
                    {office.email ? (
                      <a href={`mailto:${office.email}`} className="mt-1 flex items-center gap-2 text-sm">
                        <Mail className="size-3.5" aria-hidden />
                        <span dir="ltr">{office.email}</span>
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {block.showForm !== false ? (
          <div className="rounded-panel border border-border bg-card p-6 md:p-10">
            <ContactForm dict={dict} locale={locale} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
