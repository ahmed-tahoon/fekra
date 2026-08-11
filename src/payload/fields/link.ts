import type { Field } from 'payload'

/**
 * One link primitive for nav, cards, CTAs and the footer.
 *
 * Internal links store a *relationship*, not a string, so a slug change can
 * never silently create a dead link (5.8) and the renderer always resolves the
 * final URL — pages link to destinations, not to redirects (20.7).
 */
export const linkField = (overrides: { name?: string; label?: string } = {}): Field => ({
  name: overrides.name ?? 'link',
  type: 'group',
  label: overrides.label ?? 'Link',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'radio',
          defaultValue: 'internal',
          options: [
            { label: 'Internal page', value: 'internal' },
            { label: 'Built-in route', value: 'route' },
            { label: 'External URL', value: 'external' },
          ],
          admin: { layout: 'horizontal', width: '50%' },
        },
        {
          // Not `required`: this group is reused inside optional groups (the
          // header announcement) where a blank link must stay blank. A link
          // without a label is simply not rendered — see resolveLink.
          name: 'label',
          type: 'text',
          localized: true,
          admin: { width: '50%', description: 'Visible link text. A link with no label is not rendered.' },
        },
      ],
    },
    {
      name: 'reference',
      type: 'relationship',
      relationTo: ['pages', 'posts', 'services', 'jobs'],
      admin: { condition: (_, sibling) => sibling?.type === 'internal' },
    },
    {
      // Routes that exist in code rather than as CMS documents. Selecting them
      // here keeps the locale prefix correct in every language (14.3).
      name: 'route',
      type: 'select',
      options: [
        { label: 'Home', value: '/' },
        { label: 'Blog', value: '/blog' },
        { label: 'Services', value: '/services' },
        { label: 'Careers', value: '/careers' },
        { label: 'Contact', value: '/contact' },
        { label: 'Book a meeting', value: '/meeting' },
      ],
      admin: { condition: (_, sibling) => sibling?.type === 'route' },
    },
    {
      name: 'url',
      type: 'text',
      admin: { condition: (_, sibling) => sibling?.type === 'external' },
      validate: (value: string | null | undefined, { siblingData }: { siblingData: unknown }) => {
        const sibling = siblingData as { type?: string } | undefined
        if (sibling?.type !== 'external') return true
        if (!value) return 'An external link needs a URL.'
        try {
          new URL(value)
          return true
        } catch {
          return 'Enter a full URL including https://'
        }
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in a new tab',
          admin: { width: '50%' },
        },
        {
          name: 'analyticsId',
          type: 'text',
          label: 'Analytics event name',
          admin: {
            width: '50%',
            description: 'Optional. Sent as the GA4 event name when clicked (22.5).',
          },
        },
      ],
    },
  ],
})

export const linksArray = (name = 'links', maxRows = 2): Field => ({
  name,
  type: 'array',
  maxRows,
  labels: { singular: 'Button', plural: 'Buttons' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Ghost', value: 'ghost' },
      ],
    },
    linkField(),
  ],
})
