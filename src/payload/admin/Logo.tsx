/**
 * FEKRA brand mark for the Payload admin (login screen, nav, breadcrumb).
 *
 * Markup only. The styling lives in `src/app/(payload)/custom.css` — an inline
 * <style> here was rendered as visible text in the breadcrumb slot, and a
 * stylesheet is the only place CSS is reliably parsed as CSS.
 */
function Brand({ variant }: { variant: 'full' | 'mark' }) {
  // Decorative box carrying the artwork; the accessible name is on the element.
  return <span className={`fk-brand fk-brand--${variant}`} role="img" aria-label="FEKRA" />
}

/** Large lockup, used on the login and unauthorised screens. */
export function Logo() {
  return <Brand variant="full" />
}

/** Small mark, used in the admin nav and breadcrumb. */
export function Icon() {
  return <Brand variant="mark" />
}
