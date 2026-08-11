/**
 * FEKRA branding for the Payload admin (login screen + nav).
 *
 * ONE element, not two <img> tags toggled with `display`. The two-image
 * approach rendered both marks side by side: Payload's own admin CSS sets a
 * display value on images inside the graphic slots, and fighting that with
 * specificity is a game you lose again on the next upgrade. A single element
 * whose background-image swaps on `html[data-theme]` cannot duplicate — there
 * is only ever one box.
 *
 * Styles are scoped to this component rather than a global admin stylesheet, so
 * the logo is the only thing customised about the admin.
 */
const LIGHT = '/images/fekra-logo.webp'
const DARK = '/images/fekra-logo-white.webp'

// Source artwork is 663x198 — keep the box on that ratio so nothing distorts.
const RATIO = 663 / 198

const STYLES = `
.fk-brand {
  display: block;
  background-image: url('${LIGHT}');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: contain;
}
html[data-theme='dark'] .fk-brand { background-image: url('${DARK}'); }

/* Login / unauthorised screens: the full lockup. */
.fk-brand--full { width: ${Math.round(64 * RATIO)}px; height: 64px; max-width: 62vw; }

/*
 * The nav slot is small and roughly square, so the wide lockup would shrink to
 * an illegible smear. Widen the painted artwork past the box and let the box
 * clip it — what is left is the building glyph on its own.
 */
.fk-brand--mark { width: 30px; height: 32px; background-size: auto 100%; }
`

function Brand({ variant }: { variant: 'full' | 'mark' }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      {/* Decorative box carrying the artwork — the name is on the element. */}
      <span className={`fk-brand fk-brand--${variant}`} role="img" aria-label="FEKRA" />
    </>
  )
}

/** Large lockup, used on the login and unauthorised screens. */
export function Logo() {
  return <Brand variant="full" />
}

/** Small mark, used in the admin nav. */
export function Icon() {
  return <Brand variant="mark" />
}
