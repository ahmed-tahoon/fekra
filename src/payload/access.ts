import type { Access, FieldAccess } from 'payload'

/**
 * Access rules. Public reads are always filtered to published documents so an
 * unpublished draft can never leak through the REST/GraphQL API (4.8 / 21.10).
 */

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => Boolean(req.user)

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

/** Logged-in users see everything; the public sees only published documents. */
export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true
  return {
    _status: { equals: 'published' },
  }
}

/**
 * Applications and contact submissions are write-only from the outside: the
 * public route handler creates them with `overrideAccess`, nobody can read them
 * back over the API (21.12).
 */
export const noPublicRead: Access = ({ req }) => Boolean(req.user)
