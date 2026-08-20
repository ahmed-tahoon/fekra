# Client logo SVG candidates — NOT approved, NOT in use

Task CL-6 asks for high-quality SVG versions of the client logos. This folder
holds what could be found, and why none of it was swapped in.

Deliberately **outside `public/`** so nothing here is served or published.
See `comparison.png` — left column is the SVG candidate, right is what the site
currently uses.

## Where SVGs were looked for

| Source | Result |
|---|---|
| Figma `1:10298` | every fill is raster (`.jpg` frames, `image` fills). No vectors exist in the design. |
| CMS Media | all 10 uploads are raster WebP |
| `public/images/logos/` | all raster PNG |
| Wikimedia Commons | SVGs found for 3 of 9 brands |

## Why the 3 that exist were not used

Each is a **different lockup** of the same brand, not a higher-fidelity copy of
the one the approved design uses. Substituting them changes how the client's
brand is presented, which is a client decision, not a silent quality fix.

| Brand | Candidate | Current | Conflict |
|---|---|---|---|
| Allianz | reversed lockup — white text on a solid blue block | emblem stacked over wordmark, transparent | a blue rectangle on a white logo wall breaks the row |
| Al Rajhi Bank | horizontal — text beside the emblem | stacked — emblem over text | horizontal renders much smaller in a 4:3 cell |
| stc | wordmark with the square accents | plain wordmark | different generation of the identity |

No candidate at all for: **ADNOC, Kuwait Finance House, Codewave Systems,
DataFusion Software, Pitman Training, Smart Management Systems.**

## What would actually close CL-6

Vector files from the client, or from each brand's own press/media kit, in the
**same lockup as the approved design**. Nothing available to us can substitute
for that.

## Worth knowing before chasing it

At the size these render (43–73 CSS px wide after the CL-1 equal-area sizing),
every current raster is already sufficient through 3x DPR — a 262x147 source
covers the 219px needed at 3x. So SVG would buy crispness at very large zoom,
not visible sharpness at the size used.

The two that genuinely read as poor — **Kuwait Finance House** and **Smart
Management Systems** — are complex lockups whose internal text is being drawn
at roughly 8px. No format fixes that; it needs either a simplified/wordmark-only
variant from those clients, or a larger cell for them.
