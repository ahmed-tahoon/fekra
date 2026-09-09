import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { findDoc } from '@/lib/payload'
import { findSharedSection } from '@/lib/shared-sections'

import { BookingSection } from './BookingSection'
import { ContactSection } from './ContactSection'
import { HiringModelsSection } from './HiringModels'
import { PostsTeaser } from './PostsTeaser'
import { ServiceHeroSection } from './ServiceHero'
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
 * Swaps every `sharedSection` reference for the real block it names on the
 * home page, so a section lives in exactly one place and every page that uses
 * it stays in step. `findDoc` is request-cached, so N references cost one
 * query, and home is only fetched when a page actually references something.
 *
 * A reference whose section has since been removed from home is dropped rather
 * than rendered empty — a CMS edit must not be able to break another page.
 */
async function resolveShared(blocks: BlockProps[], locale: Locale): Promise<BlockProps[]> {
  if (!blocks.some((block) => block.blockType === 'sharedSection')) return blocks

  const home = await findDoc<{ layout?: BlockProps[] }>('pages', 'home', locale)

  return blocks.flatMap((block) => {
    if (block.blockType !== 'sharedSection') return [block]
    const source = findSharedSection(block.section, home?.layout)
    return source ? [{ ...source, id: block.id ?? source.id }] : []
  })
}

/**
 * Renders the CMS layout array. An unknown block type is skipped silently in
 * production rather than crashing the page — a stale draft must never take the
 * site down.
 */
export async function RenderBlocks({
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

  const layout = await resolveShared(blocks, locale)

  return (
    <>
      {layout.map((block, index) => {
        const key = block.id ?? `${block.blockType}-${index}`
        const isFirst = index === 0

        switch (block.blockType) {
          case 'hero':
            return <HeroSection key={key} block={block} locale={locale} isFirst={isFirst} />
          case 'serviceHero':
            return (
              <ServiceHeroSection key={key} block={block} locale={locale} dict={dict} isFirst={isFirst} />
            )
          case 'hiringModels':
            return <HiringModelsSection key={key} block={block} locale={locale} />
          case 'logoCloud':
            return <LogoCloudSection key={key} block={block} />
          case 'talentShowcase':
            return <TalentShowcaseSection key={key} block={block} locale={locale} />
          case 'cardGrid':
            return <CardGridSection key={key} block={block} locale={locale} />
          case 'stats':
            return <StatsSection key={key} block={block} />
          case 'process':
            return <ProcessSection key={key} block={block} />
          case 'testimonials':
            return <TestimonialsSection key={key} block={block} />
          case 'faq':
            return <FaqSection key={key} block={block} locale={locale} />
          case 'postsTeaser':
            return <PostsTeaser key={key} block={block} locale={locale} />
          case 'industries':
            return <IndustriesSection key={key} block={block} />
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
