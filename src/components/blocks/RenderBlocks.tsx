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
  LogoCloudSection,
  MediaSection,
  ProcessSection,
  RichTextSection,
  StatsSection,
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

        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={key} block={block} locale={locale} isFirst={isFirst} />
          case 'logoCloud':
            return <LogoCloudSection key={key} block={block} />
          case 'cardGrid':
            return <CardGridSection key={key} block={block} locale={locale} />
          case 'stats':
            return <StatsSection key={key} block={block} />
          case 'process':
            return <ProcessSection key={key} block={block} />
          case 'testimonials':
            return <TestimonialsSection key={key} block={block} />
          case 'faq':
            return <FaqSection key={key} block={block} />
          case 'postsTeaser':
            return <PostsTeaser key={key} block={block} locale={locale} />
          case 'techStack':
            return <TechStackSection key={key} block={block} />
          case 'cta':
            return <CtaSection key={key} block={block} locale={locale} />
          case 'richText':
            return <RichTextSection key={key} block={block} />
          case 'mediaBlock':
            return <MediaSection key={key} block={block} />
          case 'contact':
            return (
              <ContactSection
                key={key}
                block={block}
                locale={locale}
                dict={dict}
                offices={context?.offices as never}
              />
            )
          case 'booking':
            return (
              <BookingSection
                key={key}
                block={block}
                dict={dict}
                fallbackUrl={context?.calendlyUrl ?? undefined}
              />
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
