import type { BlockProps } from '@/components/blocks/types'

/**
 * Sections that exist once — on the home page — and are reused verbatim
 * anywhere else via the "Shared section" block.
 *
 * Home is the source because every one of these already lives there, and
 * reading them back at render time is what stops the copies drifting: the
 * About and Meet Fika pages used to restate the same blocks, so editing the
 * FAQ meant editing it three times and remembering the third.
 *
 * Each entry picks its block out of home's layout the same way the page-build
 * scripts already did by hand — by block type, plus the tone/variant that
 * distinguishes the two CTAs and the two logo strips from each other.
 */
export const SHARED_SECTIONS = {
  techStack: {
    label: 'Technologies We Work With',
    match: (b: BlockProps) => b.blockType === 'techStack',
  },
  process: {
    label: 'Our Process',
    match: (b: BlockProps) => b.blockType === 'process',
  },
  industries: {
    label: 'Our Industry Expertises',
    match: (b: BlockProps) => b.blockType === 'industries',
  },
  fika: {
    label: 'Meet Fika',
    match: (b: BlockProps) => b.blockType === 'cta' && b.tone === 'feature',
  },
  certifications: {
    label: 'Partnerships & Certifications',
    match: (b: BlockProps) => b.blockType === 'logoCloud' && b.variant === 'badges',
  },
  faq: {
    label: 'Frequently Asked Questions',
    match: (b: BlockProps) => b.blockType === 'faq',
  },
  posts: {
    label: 'Our Recent Blogs',
    match: (b: BlockProps) => b.blockType === 'postsTeaser',
  },
  contact: {
    label: 'Contact us',
    match: (b: BlockProps) => b.blockType === 'contact',
  },
  ctaBand: {
    label: 'Closing CTA band',
    match: (b: BlockProps) => b.blockType === 'cta' && b.tone === 'band',
  },
} satisfies Record<string, { label: string; match: (b: BlockProps) => boolean }>

export type SharedSectionKey = keyof typeof SHARED_SECTIONS

/** Select options for the CMS field — labels are the editor-facing names. */
export const SHARED_SECTION_OPTIONS = Object.entries(SHARED_SECTIONS).map(([value, { label }]) => ({
  label,
  value,
}))

/** The home block a shared-section reference points at, or undefined if home no longer has it. */
export const findSharedSection = (
  section: string | null | undefined,
  homeLayout: BlockProps[] | null | undefined,
): BlockProps | undefined => {
  const spec = SHARED_SECTIONS[section as SharedSectionKey]
  return spec ? homeLayout?.find(spec.match) : undefined
}
