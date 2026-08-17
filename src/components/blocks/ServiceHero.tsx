import Image from 'next/image'

import { ConsultationForm } from '@/components/forms/ConsultationForm'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'

import type { BlockProps, MediaDoc } from './types'
import { mediaUrl } from './types'

/* Band tints from the service-page comps — one per service. */
const HERO_TONE = {
  mint: 'bg-[#d9f3cf]',
  blue: 'bg-[#d5dff7]',
  blush: 'bg-[#fcdeda]',
  amber: 'bg-[#fbd9a3]',
  sky: 'bg-[#9ed2f0]',
  coral: 'bg-[#f4a26e]',
  teal: 'bg-[#8fd7c2]',
  gold: 'bg-[#f5da90]',
  lilac: 'bg-[#c9abdb]',
} as const

/**
 * Service-page hero: copy and highlight cards on a pastel band, with the
 * "Get Free Consultation" card floating on the right and dropping ~50px past
 * the band's bottom edge, as the comp draws it.
 */
export function ServiceHeroSection({
  block,
  locale,
  dict,
  isFirst,
}: {
  block: BlockProps
  locale: Locale
  dict: Dictionary
  isFirst: boolean
}) {
  const Title = isFirst ? 'h1' : 'h2'
  const paragraphs = (block.body ?? '').split('\n').filter(Boolean)

  return (
    <section
      id={block.anchor ?? undefined}
      className={cn('mt-2.5 lg:mb-10 dark:bg-background-subtle', HERO_TONE[block.heroTone ?? 'mint'])}
    >
      <div className="container-site grid items-start gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_414px] lg:gap-16">
        <div className="pt-2">
          <Title className="font-display text-4xl font-bold text-[#001033] dark:text-foreground">
            {block.heading}
          </Title>

          {paragraphs.length ? (
            <div className="mt-6 flex flex-col text-base/6 text-[#001033] dark:text-muted-foreground">
              {paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          ) : null}

          {block.closer ? (
            <p className="mt-4 text-base/6 font-bold text-[#001033] dark:text-foreground">{block.closer}</p>
          ) : null}

          {block.highlights?.length ? (
            <ul className="mt-14 grid gap-2.5 sm:grid-cols-3">
              {block.highlights.map((item) => {
                const icon = item.icon as MediaDoc | undefined
                return (
                  <li
                    key={item.text}
                    className="flex min-h-[95px] items-center gap-3 rounded-[15px] border border-[#001033]/20 bg-white/30 p-2.5 dark:border-border dark:bg-card/40"
                  >
                    {icon?.url ? (
                      <span className="flex size-8 shrink-0 items-center justify-center">
                        <Image src={mediaUrl(icon)} alt="" width={31} height={31} aria-hidden className="size-[31px]" />
                      </span>
                    ) : null}
                    <span className="text-sm/[21px] text-[#001033] dark:text-foreground">{item.text}</span>
                  </li>
                )
              })}
            </ul>
          ) : null}
        </div>

        {/* No overhang: the card's depth varies per service, so a fixed -mb
            left some pages with the card flush against the band's bottom edge. */}
        <div>
          <ConsultationForm
            title={block.formTitle ?? 'Get Free Consultation'}
            service={block.heading ?? 'our services'}
            dict={dict}
            locale={locale}
          />
        </div>
      </div>
    </section>
  )
}
