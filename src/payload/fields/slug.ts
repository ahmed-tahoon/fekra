import type { Field } from 'payload'

// One implementation, shared with the article heading anchors (18.1).
export { slugify } from '@/lib/slug'
import { slugify } from '@/lib/slug'

/**
 * Slugs are intentionally NOT localized: one URL path per document keeps
 * hreflang reciprocal and canonical resolution unambiguous (14.8 / 18.3).
 * Locale lives in the prefix, not the slug.
 */
export const slugField = (sourceField = 'title'): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description: 'URL path segment. Changing this on a live page needs a redirect entry.',
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        const source = value || (data?.[sourceField] as string | undefined)
        return source ? slugify(source) : value
      },
    ],
  },
})
