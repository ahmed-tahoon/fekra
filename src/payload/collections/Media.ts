import type { CollectionConfig } from 'payload'

import { anyone, authenticated } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { group: 'Content', useAsTitle: 'filename' },
  access: { read: anyone, create: authenticated, update: authenticated, delete: authenticated },
  upload: {
    staticDir: '.uploads/media',
    mimeTypes: ['image/*', 'video/mp4', 'application/pdf'],
    // Widths mirror the layout container and card grid so `sizes` in next/image
    // always has an exact match — no upscaling, no oversized download (17.5).
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768 },
      { name: 'content', width: 1200 },
      { name: 'hero', width: 1920 },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    formatOptions: { format: 'webp', options: { quality: 82 } },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description:
          'Describe the image for screen readers and search (18.11). Leave empty ONLY for purely decorative images.',
      },
    },
    {
      name: 'decorative',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Decorative image — renders with an empty alt attribute.' },
    },
    { name: 'caption', type: 'text', localized: true },
    { name: 'credit', type: 'text' },
  ],
}
