/**
 * Equal-area sizing for logo walls (tasks CL-1 and TS-3).
 *
 * `object-contain` fits a mark to its cell's bounding box, which is not the same
 * as giving every mark the same visual weight: it rewards square logos and
 * starves wide or tall ones. Measured against the real client uploads, contain
 * left a 1.70x spread between the largest and smallest rendered mark — Al Rajhi
 * (738x738) filled its box while ADNOC (198x288) covered barely half of it.
 * Sizing by area instead brings that to about 1.01x.
 *
 * Lives in lib/ rather than beside either logo wall: TechTabs is a client
 * component, so importing this from sections.tsx would drag that whole server
 * module — next/image, RichText, JsonLd and all — into the client bundle.
 */

/** Share of the cell's area each mark covers. Raise it and the wall gets denser. */
const AREA_FILL = 0.52

/**
 * Width and height, as percentages of the cell, chosen so every mark covers the
 * same area regardless of its proportions.
 *
 * `cellAspect` is the cell's own width/height — 4/3 for the client-logo board,
 * 1 for the square tech tiles. Getting it wrong skews every result, because the
 * target area is a fraction of the cell, not of a notional square.
 *
 * Returns undefined when the upload has no intrinsic dimensions; callers fall
 * back to plain contain-with-padding.
 */
export function logoMarkSize(
  width?: number | null,
  height?: number | null,
  cellAspect = 4 / 3,
): { width: string; height: string } | undefined {
  if (!width || !height) return undefined

  const aspect = width / height
  const cellRatio = 1 / cellAspect
  let w = Math.sqrt(AREA_FILL * cellRatio * aspect)
  let h = Math.sqrt(AREA_FILL / (cellRatio * aspect))

  // A very wide or very tall mark would spill past the cell — pull both back.
  const clamp = Math.min(1, 1 / w, 1 / h)
  w *= clamp
  h *= clamp

  return { width: `${(w * 100).toFixed(1)}%`, height: `${(h * 100).toFixed(1)}%` }
}
