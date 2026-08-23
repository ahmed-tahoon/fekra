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

/**
 * Share of the cell's area each mark covers.
 *
 * 0.38, not something larger, because of the clamp below. A mark wider than the
 * cell can take gets pinned to the cell's width and never reaches the target
 * area, so it renders SMALLER than everything else — the exact defect this
 * function exists to remove. QNB's lockup is 3.43:1; at 0.52 it came out 25%
 * short and the spread across the twelve client logos was 1.34x. 0.38 is the
 * largest fill at which nothing clamps (1 / (0.75 x 3.43)), giving 1.00x.
 *
 * Raise it only if the widest mark on the board gets narrower.
 */
const AREA_FILL = 0.38

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
