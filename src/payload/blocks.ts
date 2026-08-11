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
    linksArray('ctas'),
    { name: 'media', type: 'upload', relationTo: 'media' },
    {
      name: 'stats',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', localized: true, required: true },
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

export const allBlocks = [
  HeroBlock,
  LogoCloudBlock,
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
