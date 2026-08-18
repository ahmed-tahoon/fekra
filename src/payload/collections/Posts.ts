import type { CollectionConfig } from 'payload'

import { authenticated, publishedOrAuthenticated } from '../access'
import { allBlocks } from '../blocks'
import { slugField } from '../fields/slug'
import { revalidateDocument, revalidateOnDelete } from '../hooks/revalidate'
import { previewUrl } from '../preview'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Article', plural: 'Blog' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', '_status'],
    group: 'Content',
    livePreview: { url: ({ data, locale }) => previewUrl('posts', data?.slug, locale?.code) },
    preview: (data, { locale }) => previewUrl('posts', data?.slug as string, locale),
  },
  access: {
    read: publishedOrAuthenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  /*
   * 2s, not Payload's 350ms sample value. Every autosave is a full version
   * write into the _v table plus its block/locale children, then a prune to
   * maxPerDoc — hundreds of ms against a pooled remote Postgres. Fired every
   * 350ms it queues faster than it drains, the pool (2 connections on Vercel)
   * starves, and the admin sits on "Saving..." forever with Publish disabled.
   */
  versions: { drafts: { autosave: { interval: 2000 } }, maxPerDoc: 25 },
  hooks: {
    afterChange: [revalidateDocument('posts', '/blog')],
    afterDelete: [revalidateOnDelete('posts', '/blog')],
    beforeChange: [
      ({ data }) => {
        // 8.2 — a published article always has a date, even if the editor forgot.
        if (data._status === 'published' && !data.publishedAt) data.publishedAt = new Date().toISOString()
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', localized: true, required: true },
    slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'excerpt', type: 'textarea', localized: true, maxLength: 320 },
            { name: 'heroImage', type: 'upload', relationTo: 'media' },
            { name: 'content', type: 'richText', localized: true, required: true },
            {
              name: 'layout',
              type: 'blocks',
              label: 'Extra sections (optional)',
              blocks: allBlocks,
              admin: {
                initCollapsed: true,
                description: 'CTA, FAQ or related blocks under the article body.',
              },
            },
          ],
        },
        {
          label: 'Meta',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'category', type: 'relationship', relationTo: 'categories', admin: { width: '50%' } },
                {
                  name: 'author',
                  type: 'relationship',
                  relationTo: 'users',
                  admin: { width: '50%', description: 'Shown as the byline and used in Article schema (19.4).' },
                },
              ],
            },
            { name: 'tags', type: 'text', hasMany: true, localized: true },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'posts',
              hasMany: true,
              maxDepth: 1,
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
            {
              name: 'availableLocales',
              type: 'select',
              hasMany: true,
              options: ['en', 'ar', 'de', 'fr', 'es'],
              defaultValue: ['en'],
            },
          ],
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
