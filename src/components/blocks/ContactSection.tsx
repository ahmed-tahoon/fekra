import Image from 'next/image'

import { ContactForm } from '@/components/forms/ContactForm'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'

import type { BlockProps } from './types'

type Office = {
  countryCode?: string | null
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
    /*
     * Figma 1:11725 — 140/120 padding, heading centred over a row of form (489)
     * beside the presence map (655), 56px apart.
     */
    <section id={block.anchor ?? 'contact'} className="section">
      <div className="container-site flex flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          {block.eyebrow ? (
            <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          <Heading className="font-display text-[clamp(1.75rem,2.92vw,2.625rem)] leading-[1.19] font-bold">
            <span className="bg-[linear-gradient(142deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading ?? dict.contact.title}
            </span>
          </Heading>
          {block.body ? (
            <p className="max-w-2xl text-lg text-muted-foreground">{block.body}</p>
          ) : null}
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,489fr)_minmax(0,655fr)]">
          {block.showForm !== false ? <ContactForm dict={dict} locale={locale} /> : null}

          {block.showOffices !== false && offices?.length ? (
            <div className="relative">
              {/* One map and one set of localized overlays in both themes. */}
              <div data-presence-map className="relative">
                <Image src="/images/decor/global-presence-map.png" alt="" aria-hidden width={1449} height={881} className="h-auto w-full" />
                {[
                  { code: 'US', left: 11, top: 1.2, width: 14.2 },
                  { code: 'GB', left: 45.5, top: 11.2, width: 14 },
                  { code: 'SA', left: 63.5, top: 28, width: 14.2 },
                  { code: 'EG', left: 46.3, top: 44.6, width: 14.1 },
                  { code: 'AE', left: 61.7, top: 46.3, width: 14 },
                ].map((pin) => {
                  const office = offices.find((office) => office.countryCode === pin.code)
                  return <div key={pin.code} className="absolute flex items-center justify-center gap-[5%] rounded-[3px] bg-white px-[0.7%] text-navy-800" style={{ left: `${pin.left}%`, top: `${pin.top}%`, width: `${pin.width}%`, height: '12.8%' }}>
                    <Image src={`/images/flags/${pin.code.toLowerCase()}.svg`} alt="" aria-hidden width={32} height={22} className="h-auto w-[32%] shrink-0 object-contain" />
                    <span className="text-center text-[clamp(0.5rem,1.05vw,0.9375rem)] leading-tight">{office?.city}</span>
                  </div>
                })}
                <p className="absolute inset-x-[25%] top-[76%] grid h-[9%] place-items-center bg-background text-center text-[clamp(0.625rem,1.1vw,1rem)] font-semibold text-navy-800 dark:text-foreground">{dict.contact.offices}</p>
              </div>
              <ul className="sr-only">
                {offices.map((office) => (
                  <li key={`${office.city}-${office.country}`}>
                    {office.city}, {office.country}
                    {office.phone ? ` — ${office.phone}` : ''}
                    {office.email ? ` — ${office.email}` : ''}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
