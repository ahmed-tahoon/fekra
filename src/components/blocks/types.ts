import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import type { PayloadLink } from '@/lib/resolveLink'

export type MediaDoc = {
  id?: string | number
  url?: string | null
  alt?: string | null
  decorative?: boolean | null
  width?: number | null
  height?: number | null
}

export const mediaUrl = (media: MediaDoc): string => media.url ?? ''

/** 18.11 — decorative images get an empty alt; everything else must have one. */
export const mediaAlt = (media: MediaDoc): string => (media.decorative ? '' : (media.alt ?? ''))

/** `items` is reused by the stats, testimonials and FAQ blocks. */
export type BlockItem = {
  value?: string
  label?: string
  quote?: string
  authorName?: string
  authorRole?: string
  avatar?: unknown
  question?: string
  answer?: SerializedEditorState | null
}

/**
 * The union of every block's fields. Loose on purpose: `RenderBlocks` narrows
 * by `blockType` before handing the object to a section, and generated
 * payload-types stay authoritative on the CMS side.
 */
export type BlockProps = {
  blockType: string
  id?: string
  anchor?: string | null
  eyebrow?: string | null
  heading?: string | null
  headingAccent?: string | null
  body?: string | null
  trustLine?: string | null
  media?: unknown
  caption?: string | null
  width?: 'prose' | 'full' | 'container'
  content?: SerializedEditorState | null
  columns?: '2' | '3' | '4'
  tone?: 'brand' | 'ink' | 'subtle'
  marquee?: boolean | null
  emitSchema?: boolean | null
  limit?: number | null
  category?: { slug?: string } | string | null
  calendlyUrl?: string | null
  showOffices?: boolean | null
  showForm?: boolean | null
  ctas?: { variant?: 'primary' | 'secondary' | 'ghost'; link?: PayloadLink }[] | null
  stats?: { value: string; label: string }[] | null
  items?: BlockItem[] | null
  cards?: { icon?: unknown; title: string; body?: string | null; link?: PayloadLink }[] | null
  steps?: { title: string; body: string }[] | null
  logos?: { image?: unknown; name: string; url?: string | null }[] | null
  groups?: { name: string; items?: { name: string; logo?: unknown }[] }[] | null

  /** Hero: cycled headline phrases, feature bullets, bento mosaic. */
  rotatingWords?: { text: string }[] | null
  bullets?: { text: string; icon?: unknown }[] | null
  mosaic?:
    | {
        kind?: 'image' | 'stat'
        span?: 'normal' | 'tall' | 'wide'
        tone?: 'green' | 'emerald' | 'indigo' | 'teal'
        corner?: 'tl' | 'tr' | 'bl' | 'br'
        image?: unknown
        value?: string | null
        label?: string | null
      }[]
    | null

  /** Logo cloud: the statement beside the grid. */
  statement?: { before?: string | null; highlight?: string | null; after?: string | null } | null

  /** Talent showcase. */
  roles?: { label: string }[] | null
  panelTitle?: string | null
  people?:
    | {
        name: string
        role: string
        experience?: string | null
        match?: number | null
        evaluated?: boolean | null
        avatar?: unknown
      }[]
    | null
}
