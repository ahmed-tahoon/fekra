import Image from 'next/image'

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
          <Heading className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(142deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading ?? dict.contact.title}
            </span>
          </Heading>
          {block.body ? <p className="max-w-2xl text-lg text-muted-foreground">{block.body}</p> : null}
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,489fr)_minmax(0,655fr)]">
          {block.showForm !== false ? <ContactForm dict={dict} locale={locale} /> : null}

          {block.showOffices !== false && offices?.length ? (
            <div className="relative">
              {/* The map carries its own city pills and caption, so it is
                  decorative here — the offices themselves are real content and
                  are exposed to assistive tech as a plain list instead. */}
              <Image
                src="/images/decor/global-presence-map.png"
                alt=""
                aria-hidden
                width={655}
                height={374}
                className="h-auto w-full"
              />
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
