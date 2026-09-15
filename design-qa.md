# Hero collage design QA

final result: passed

Scope: the hero collage component and its supplied default photo set. This is a component visual pass, not a claim that CMS-backed page loading or booking submission was tested.

## Source and implementation evidence

- Source visual truth: `docs/hero-refresh/reference.png` (user-supplied Vivasoft screenshot, 2048 × 700).
- Live reference reviewed: https://vivasoftltd.com/.
- Combined comparison: `docs/hero-refresh/reference-comparison.png`.
- Focused implementation: `docs/hero-refresh/hero-collage.png` (1473 × 497, browser chrome excluded).
- Full hero with CTA: `docs/hero-refresh/hero-desktop.png`.
- Mobile light and dark: `docs/hero-refresh/hero-mobile.png`.
- Preview generated from the real `HeroSection`, using seeded FEKRA copy, actual generated assets, compiled project Tailwind CSS, and cached Inter/Urbanist fonts.
- Comparison viewport: source 2048 × 700 and implementation iframe 2048 × 700. Both displayed at 1024 × 350 CSS px in the same browser capture, so composition is normalized before comparison. CUA captures were 1473 × 769; browser chrome was cropped afterward without changing content scale. Native full-hero capture is supplemental, not the basis for dimensional matching.
- Mobile: two 390 × 900 CSS px iframes, one per theme.
- State: images fully loaded; entrance and count animations held at their final static state. The production collage retains its entrance animation, but independent scroll drift was removed.

## Findings and required fidelity surfaces

No actionable P0/P1/P2 visual findings remain in the scoped component.

- **Fonts / typography:** project Inter/Urbanist retained; stat labels and numbers scale with the tile. FEKRA’s headline and CTA remain its own, not copied from the reference.
- **Spacing / layout rhythm:** the 1408 × 448 board follows the source’s thirteen positions. Equal outer portraits, consistent 10–12 unit gutters, aligned lower edges, stepped center, and large single-corner rounding. Minor width/position differences intentionally regularize the supplied reference per the request for better symmetry.
- **Colors / tokens:** reference-like sky, pink, mint, and lavender stat backgrounds in light mode; prior charcoal page palette and subdued stat backgrounds remain in dark mode.
- **Images / crops:** nine distinct generated photos, with office work, collaboration, a courtyard and a terrace. All original abstract/default imagery is replaced. Faces and laptops are visible in the full-width comparison. Mobile focal points shifted to 35% vertically to protect heads in wider crops. No identities are presented as actual employees.
- **Copy / content:** original FEKRA figures and labels retained. All four statistics appear on mobile. Neutral image alt text avoids claiming the depicted people are FEKRA staff.

## Comparison history

1. Initial comparison: two right-side images were not yet loaded in the transformed static iframe. Forced eager loading in the review harness only and repeated the comparison; all nine images are present. No production lazy-loading behavior was changed.
2. Mobile inspection: portrait crop was too tight above the first developer’s head. Shifted mobile-only object position upward and recaptured. Final mobile evidence shows the complete face.
3. Final combined / focused checks: shared baseline, balanced edge portraits, readable statistics, loaded imagery, and no overlapping tiles.

## Implementation checklist and validation

- [x] Generate, inspect, optimize and save nine WebP assets (approximately 800 KB total).
- [x] Preserve per-image prompts in `docs/hero-refresh/`.
- [x] Integrate the new set through a shared manifest and legacy-photo fallback.
- [x] Preserve custom CMS uploads and existing stat content.
- [x] Update fresh seeds and the optional CMS image migration script.
- [x] Verify nine assets exist; check legacy filename variants and preservation of unrelated uploads.
- [x] Verify thirteen rectangles do not overlap or extend outside the board; verify equal outer portrait dimensions and aligned bottom edges.
- [x] TypeScript, targeted ESLint, and `git diff --check` pass.
- [x] Verify the existing CTA resolves to `/meeting` in rendered markup; link behavior was not changed.

## Motion and spacing follow-up — 2026-09-15

The CMS-backed localhost homepage now loads. Reviewed the hydrated hero in light and dark themes and scrolled through the collage, logo band, talent content, and business cards.

- Rotating phrases now share a measured grid cell, reserving space for the widest/wrapped phrase. Extra gradient painting space and a 1.15 line height preserve descenders.
- Connected the previously unmounted scroll-reveal component. Headings, copy, grid cards and hero tiles below the viewport receive a one-time 750ms upward fade, with up to 195ms row staggering. Already-visible content remains visible; reduced motion, keyboard focus and route cleanup have explicit visibility fallbacks.
- Final desktop spacing follows the user's live feedback: the center-left photo sits approximately 48px below the CTA at widths >=1280px, 24px lower than the closest iteration. Tablet overlap remains limited to 56px. Mobile retains separate tiles with a 20px CTA gap.
- `docs/hero-refresh/hero-motion-desktop.png` records the initial motion follow-up before the final spacing adjustment; earlier static comparisons describe the collage geometry, not the final CTA gap.
- TypeScript, targeted ESLint and whitespace checks pass. Mobile motion and OS reduced-motion behavior were reviewed in code; this follow-up did not complete a fresh live mobile capture.

No CMS writes, database migration, deployment, or booking submission was performed.
