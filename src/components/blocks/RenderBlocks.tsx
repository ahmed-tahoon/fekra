import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'

import { BookingSection } from './BookingSection'
import { ContactSection } from './ContactSection'
import { PostsTeaser } from './PostsTeaser'
import {
  CardGridSection,
  CtaSection,
  FaqSection,
  HeroSection,
  IndustriesSection,
  LogoCloudSection,
  MediaSection,
  ProcessSection,
  RichTextSection,
  StatsSection,
  TalentShowcaseSection,
  TechStackSection,
  TestimonialsSection,
} from './sections'
import type { BlockProps } from './types'

/**
 * Renders the CMS layout array. An unknown block type is skipped silently in
 * production rather than crashing the page — a stale draft must never take the
 * site down.
 */
export function RenderBlocks({
  blocks,
  locale,
  dict,
  context,
}: {
  blocks?: BlockProps[] | null
  locale: Locale
  dict: Dictionary
  context?: { offices?: unknown[]; calendlyUrl?: string | null }
}) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        const isFirst = index === 0

        /*
         * Everything below the hero rises as it enters the viewport. Wrapping
         * here rather than in each section keeps the behaviour in one place —
         * and the hero is excluded because it already has its own entrance.
         */
        const reveal = (node: React.ReactNode) =>
          isFirst ? node : <div className="fk-reveal">{node}</div>

        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={key} block={block} locale={locale} isFirst={isFirst} />
          case 'logoCloud':
            return reveal(<LogoCloudSection key={key} block={block} />)
          case 'talentShowcase':
            return reveal(<TalentShowcaseSection key={key} block={block} locale={locale} />)
          case 'cardGrid':
            return reveal(<CardGridSection key={key} block={block} locale={locale} />)
          case 'stats':
            return reveal(<StatsSection key={key} block={block} />)
          case 'process':
            return reveal(<ProcessSection key={key} block={block} />)
          case 'testimonials':
            return reveal(<TestimonialsSection key={key} block={block} />)
          case 'faq':
            return reveal(<FaqSection key={key} block={block} />)
          case 'postsTeaser':
            return reveal(<PostsTeaser key={key} block={block} locale={locale} />)
          case 'industries':
            return reveal(<IndustriesSection key={key} block={block} />)
          case 'techStack':
            return reveal(<TechStackSection key={key} block={block} />)
          case 'cta':
            return reveal(<CtaSection key={key} block={block} locale={locale} />)
          case 'richText':
            return reveal(<RichTextSection key={key} block={block} />)
          case 'mediaBlock':
            return reveal(<MediaSection key={key} block={block} />)
          case 'contact':
            return reveal(
              <ContactSection
                key={key}
                block={block}
                locale={locale}
                dict={dict}
                offices={context?.offices as never}
              />,
            )
          case 'booking':
            return reveal(
              <BookingSection
                key={key}
                block={block}
                dict={dict}
                fallbackUrl={context?.calendlyUrl ?? undefined}
              />,
            )
          default:
            if (process.env.NODE_ENV !== 'production') {
              throw new Error(`RenderBlocks: no renderer for block type "${block.blockType}"`)
            }
            return null
        }
      })}
    </>
  )
}
