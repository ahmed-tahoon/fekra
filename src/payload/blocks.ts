import type { Block, Field } from 'payload'

import { linkField, linksArray } from './fields/link'

/**
 * Page-builder blocks. Each one maps to an approved section in the Figma file,
 * so editors compose pages from the design system instead of free-form HTML
 * (2.2 / 5.6). Every text field is localized (14.6).
 */

const heading: Field[] = [
  { name: 'eyebrow', type: 'text', localized: true },
  { name: 'heading', type: 'text', localized: true, required: true },
  {
    name: 'headingAccent',
    type: 'text',
    localized: true,
    admin: { description: 'Optional second line rendered in the brand colour.' },
  },
  { name: 'body', type: 'textarea', localized: true },
]

const anchor: Field = {
  name: 'anchor',
  type: 'text',
  admin: {
    position: 'sidebar',
    description: 'Optional #id for in-page links. Lowercase, no spaces.',
  },
}

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    ...heading,
    { name: 'trustLine', type: 'text', localized: true },
    {
      // The headline's last word cycles: "Scale Your Team Faster With
      // <AI Engineers | Backend Engineers | …>". One entry renders as static
      // text, so this doubles as a plain accent line.
      name: 'rotatingWords',
      type: 'array',
      maxRows: 10,
      labels: { singular: 'Rotating word', plural: 'Rotating words' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true }],
      admin: { description: 'Cycled in the headline. Leave empty to use the accent line instead.' },
    },
    {
      name: 'bullets',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [
        { name: 'text', type: 'text', localized: true, required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    linksArray('ctas'),
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      admin: { description: 'Simple stat row. Use the mosaic below for the bento layout instead.' },
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
    {
      // The bento grid under the hero. Each tile is an image, a stat card, or
      // an image with a stat card sitting on it.
      name: 'mosaic',
      type: 'array',
      // The approved collage is 13 tiles; leave room to extend it.
      maxRows: 16,
      labels: { singular: 'Tile', plural: 'Mosaic tiles' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'kind',
              type: 'select',
              defaultValue: 'image',
              options: [
                { label: 'Image', value: 'image' },
                { label: 'Stat card', value: 'stat' },
              ],
              admin: { width: '34%' },
            },
            {
              name: 'span',
              type: 'select',
              defaultValue: 'normal',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'Tall', value: 'tall' },
                { label: 'Wide', value: 'wide' },
              ],
              admin: { width: '33%' },
            },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'green',
              options: [
                { label: 'Green', value: 'green' },
                { label: 'Emerald', value: 'emerald' },
                { label: 'Indigo', value: 'indigo' },
                { label: 'Teal', value: 'teal' },
              ],
              admin: { width: '33%', condition: (_, sibling) => sibling?.kind === 'stat' },
            },
          ],
        },
        {
          // Every tile rounds exactly one corner by 80px; the comp alternates
          // which one, and that alternation is what gives the collage its
          // rhythm. It is a content decision, so the editor owns it.
          name: 'corner',
          type: 'select',
          defaultValue: 'tl',
          options: [
            { label: 'Top left', value: 'tl' },
            { label: 'Top right', value: 'tr' },
            { label: 'Bottom left', value: 'bl' },
            { label: 'Bottom right', value: 'br' },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, sibling) => sibling?.kind === 'image' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'value',
              type: 'text',
              admin: { width: '40%', condition: (_, sibling) => sibling?.kind === 'stat' },
            },
            {
              name: 'label',
              type: 'text',
              localized: true,
              admin: { width: '60%', condition: (_, sibling) => sibling?.kind === 'stat' },
            },
          ],
        },
      ],
    },
    anchor,
  ],
}

export const LogoCloudBlock: Block = {
  slug: 'logoCloud',
  interfaceName: 'LogoCloudBlock',
  labels: { singular: 'Logo strip', plural: 'Logo strips' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      // "50+ companies rely on our top 3% talent…" — sits left of the grid.
      name: 'statement',
      type: 'group',
      fields: [
        { name: 'before', type: 'text', localized: true },
        { name: 'highlight', type: 'text', localized: true, admin: { description: 'Rendered in the brand colour.' } },
        { name: 'after', type: 'text', localized: true },
      ],
    },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'url', type: 'text' },
      ],
    },
    { name: 'marquee', type: 'checkbox', defaultValue: true, label: 'Scroll continuously' },
    anchor,
  ],
}

export const CardGridBlock: Block = {
  slug: 'cardGrid',
  interfaceName: 'CardGridBlock',
  labels: { singular: 'Card grid', plural: 'Card grids' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'plain',
      options: [
        { label: 'Plain cards', value: 'plain' },
        { label: 'Business cards (gradient wash, 2 over 3)', value: 'business' },
      ],
      admin: { description: 'Business styles the cards like the "All Businesses Types" section.' },
    },
    ...heading,
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'].map((v) => ({ label: `${v} columns`, value: v })),
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'icon', type: 'upload', relationTo: 'media' },
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true },
        linkField({ name: 'link', label: 'Card link (optional)' }),
      ],
    },
    linksArray('ctas', 1),
    anchor,
  ],
}

export const IndustriesBlock: Block = {
  slug: 'industries',
  interfaceName: 'IndustriesBlock',
  labels: { singular: 'Industry grid', plural: 'Industry grids' },
  fields: [
    ...heading,
    {
      name: 'industries',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Industry', plural: 'Industries' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', localized: true, required: true, admin: { width: '60%' } },
            {
              name: 'tone',
              type: 'select',
              defaultValue: 'teal',
              options: [
                { label: 'Pink', value: 'pink' },
                { label: 'Mint', value: 'mint' },
                { label: 'Lilac', value: 'lilac' },
                { label: 'Teal', value: 'teal' },
                { label: 'Blue', value: 'blue' },
              ],
              admin: { width: '40%' },
            },
          ],
        },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    anchor,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  labels: { singular: 'Stats band', plural: 'Stats bands' },
  fields: [
    { name: 'heading', type: 'text', localized: true },
    {
      name: 'items',
      type: 'array',
      minRows: 2,
      maxRows: 6,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, required: true },
      ],
    },
    anchor,
  ],
}

export const ProcessBlock: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  labels: { singular: 'Process steps', plural: 'Process steps' },
  fields: [
    ...heading,
    {
      name: 'steps',
      type: 'array',
      minRows: 2,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'body', type: 'textarea', localized: true, required: true },
      ],
      admin: { description: 'Rendered as an ordered list — step numbers come from the order.' },
    },
    anchor,
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Testimonials', plural: 'Testimonials' },
  fields: [
    ...heading,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', localized: true, required: true },
        { name: 'authorName', type: 'text', required: true },
        { name: 'authorRole', type: 'text', localized: true, required: true },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      // The proof bar under the quotes (Figma 1:11493).
      name: 'stats',
      type: 'array',
      maxRows: 4,
      labels: { singular: 'Proof stat', plural: 'Proof stats' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '40%' } },
            { name: 'label', type: 'text', localized: true, required: true, admin: { width: '45%' } },
            { name: 'star', type: 'checkbox', admin: { width: '15%', description: 'Star icon' } },
          ],
        },
      ],
    },
    anchor,
  ],
}

export const FaqBlock: Block = {
  slug: 'faq',
  interfaceName: 'FaqBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    ...heading,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', localized: true, required: true },
        { name: 'answer', type: 'richText', localized: true, required: true },
      ],
    },
    {
      name: 'emitSchema',
      type: 'checkbox',
      defaultValue: true,
      label: 'Emit FAQPage structured data',
      admin: { description: 'Only enable on pages where the FAQ is the primary content (18.8/19.3).' },
    },
    anchor,
  ],
}

export const PostsTeaserBlock: Block = {
  slug: 'postsTeaser',
  interfaceName: 'PostsTeaserBlock',
  labels: { singular: 'Latest posts', plural: 'Latest posts' },
  fields: [
    ...heading,
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 9 },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    linksArray('ctas', 1),
    anchor,
  ],
}

export const CtaBlock: Block = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
  labels: { singular: 'CTA band', plural: 'CTA bands' },
  fields: [
    { name: 'heading', type: 'text', localized: true, required: true },
    { name: 'body', type: 'textarea', localized: true },
    linksArray('ctas'),
    {
      name: 'tone',
      type: 'select',
      defaultValue: 'brand',
      options: [
        { label: 'Brand', value: 'brand' },
        { label: 'Ink', value: 'ink' },
        { label: 'Subtle', value: 'subtle' },
      ],
    },
    anchor,
  ],
}

export const TechStackBlock: Block = {
  slug: 'techStack',
  interfaceName: 'TechStackBlock',
  labels: { singular: 'Tech stack', plural: 'Tech stacks' },
  fields: [
    ...heading,
    {
      name: 'groups',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', localized: true, required: true },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'logo', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    anchor,
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  labels: { singular: 'Rich text', plural: 'Rich text' },
  fields: [
    { name: 'content', type: 'richText', localized: true, required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'prose',
      options: [
        { label: 'Reading width', value: 'prose' },
        { label: 'Full container', value: 'full' },
      ],
    },
    anchor,
  ],
}

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: { singular: 'Media', plural: 'Media' },
  fields: [
    { name: 'media', type: 'upload', relationTo: 'media', required: true },
    { name: 'caption', type: 'text', localized: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'container',
      options: [
        { label: 'Container', value: 'container' },
        { label: 'Full bleed', value: 'full' },
      ],
    },
    anchor,
  ],
}

export const ContactBlock: Block = {
  slug: 'contact',
  interfaceName: 'ContactBlock',
  labels: { singular: 'Contact section', plural: 'Contact sections' },
  fields: [
    ...heading,
    { name: 'showOffices', type: 'checkbox', defaultValue: true },
    { name: 'showForm', type: 'checkbox', defaultValue: true },
    anchor,
  ],
}

export const BookingBlock: Block = {
  slug: 'booking',
  interfaceName: 'BookingBlock',
  labels: { singular: 'Booking embed', plural: 'Booking embeds' },
  fields: [
    ...heading,
    {
      name: 'calendlyUrl',
      type: 'text',
      admin: { description: 'Overrides the default booking URL from Site Settings.' },
    },
    anchor,
  ],
}

export const TalentShowcaseBlock: Block = {
  slug: 'talentShowcase',
  interfaceName: 'TalentShowcaseBlock',
  labels: { singular: 'Talent showcase', plural: 'Talent showcases' },
  fields: [
    ...heading,
    {
      name: 'bullets',
      type: 'array',
      labels: { singular: 'Selling point', plural: 'Selling points' },
      fields: [{ name: 'text', type: 'text', localized: true, required: true }],
    },
    {
      name: 'roles',
      type: 'array',
      labels: { singular: 'Role pill', plural: 'Role pills' },
      fields: [{ name: 'label', type: 'text', localized: true, required: true }],
    },
    { name: 'panelTitle', type: 'text', localized: true },
    {
      type: 'row',
      fields: [
        {
          name: 'panelTone',
          type: 'select',
          defaultValue: 'grey',
          options: [
            { label: 'Grey', value: 'grey' },
            { label: 'Mint', value: 'mint' },
          ],
          admin: { width: '50%', description: 'Background of the engineer panel.' },
        },
        {
          name: 'side',
          type: 'select',
          defaultValue: 'copyLeft',
          options: [
            { label: 'Copy left, panel right', value: 'copyLeft' },
            { label: 'Panel left, copy right', value: 'copyRight' },
          ],
          admin: { width: '50%', description: 'Alternate this between stacked showcases.' },
        },
      ],
    },
    {
      name: 'people',
      type: 'array',
      labels: { singular: 'Engineer', plural: 'Engineers' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'role', type: 'text', localized: true, required: true, admin: { width: '50%' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'experience', type: 'text', admin: { width: '33%', description: 'e.g. 5+ Years' } },
            { name: 'match', type: 'number', min: 0, max: 100, admin: { width: '33%', description: 'Match %' } },
            { name: 'evaluated', type: 'checkbox', defaultValue: true, admin: { width: '33%' } },
          ],
        },
        { name: 'avatar', type: 'upload', relationTo: 'media' },
      ],
    },
    linksArray('ctas', 1),
    anchor,
  ],
}

export const allBlocks = [
  HeroBlock,
  LogoCloudBlock,
  IndustriesBlock,
  TalentShowcaseBlock,
  CardGridBlock,
  StatsBlock,
  ProcessBlock,
  TestimonialsBlock,
  FaqBlock,
  PostsTeaserBlock,
  TechStackBlock,
  CtaBlock,
  RichTextBlock,
  MediaBlock,
  ContactBlock,
  BookingBlock,
]

export const layoutField: Field = {
  name: 'layout',
  type: 'blocks',
  blocks: allBlocks,
  admin: { initCollapsed: true },
}
