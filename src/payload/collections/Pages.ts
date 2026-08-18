import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { layoutField } from '../blocks'
import { slugField } from '../fields/slug'
import { revalidateDocument, revalidateOnDelete } from '../hooks/revalidate'
import { previewUrl } from '../preview'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    group: 'Content',
    livePreview: { url: ({ data, locale }) => previewUrl('pages', data?.slug, locale?.code) },
    preview: (data, { locale }) => previewUrl('pages', data?.slug as string, locale),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  // 4.8 — editors review unpublished content before it goes public.
  /*
   * 2s, not Payload's 350ms sample value. Every autosave is a full version
   * write into the _v table plus its block/locale children, then a prune to
   * maxPerDoc — hundreds of ms against a pooled remote Postgres. Fired every
   * 350ms it queues faster than it drains, the pool (2 connections on Vercel)
   * starves, and the admin sits on "Saving..." forever with Publish disabled.
   */
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidateDocument('pages')],
    afterDelete: [revalidateOnDelete('pages')],
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        { label: 'Content', fields: [layoutField] },
        {
          label: 'Settings',
          fields: [
            {
              name: 'hideFromSitemap',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Excludes this page from sitemap.xml (18.5).' },
            },
            {
              name: 'availableLocales',
              type: 'select',
              hasMany: true,
              options: ['en', 'ar', 'de', 'fr', 'es'],
              defaultValue: ['en'],
              admin: {
                description:
                  'Locales with approved translations. Drives hreflang and the language switcher (14.8/14.9).',
              },
            },
          ],
        },
      ],
    },
    { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
