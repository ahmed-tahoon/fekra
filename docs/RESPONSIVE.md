# Responsive pass — tablets and laptops

Checklist 16.3 (tablet portrait and landscape) and 16.4 (13–15" laptops).
Mobile phones are 16.1–16.2 and real-device testing is 16.9; neither is covered
here.

## How to run it

```
pnpm check:viewports                          # the deployed site
pnpm check:viewports http://localhost:3000    # after `pnpm build && pnpm start`
```

`scripts/check-viewports.mjs` drives headless Chrome over the DevTools protocol
with nothing but Node's built-in `fetch` and `WebSocket` — no Puppeteer, no
Playwright. For every page × viewport it writes a full-page PNG to
`viewport-shots/` (gitignored) and measures the things a screenshot is bad at
judging:

- **horizontal overflow** — `body` has `overflow-x: clip`, so an element that
  sticks out is silently cut off instead of producing a scrollbar. It has to be
  measured, and elements inside a container that handles its own horizontal
  overflow (a marquee, a scrolling tab strip) are excluded as intentional.
- **tap targets under 44 px**, skipping screen-reader-only links, honeypots and
  links whose card is the real target.
- **which navigation the breakpoint chose**, burger or desktop.
- **text under 12 px**.

Two emulated media settings, both deliberate: `prefers-color-scheme: light`,
because the comps are light and headless Chrome reports dark by default; and
`prefers-reduced-motion: reduce`, because the reveal animations are
scroll-linked, so a full-page capture would otherwise render every off-screen
section at its `opacity: 0` start state and come out blank below the fold.

## Coverage

| Viewport | Size | Stands for |
|----------|------|------------|
| tablet-portrait-768 | 768 × 1024 | iPad / iPad mini portrait |
| tablet-portrait-834 | 834 × 1194 | iPad Pro 11" portrait |
| tablet-landscape-1024 | 1024 × 768 | iPad landscape |
| laptop-1280 | 1280 × 800 | 13" MacBook Air |
| laptop-1440 | 1440 × 900 | 14" MacBook Pro, common Mac default |
| laptop-1536 | 1536 × 864 | 15" Windows, the most common desktop width |

Pages: `/`, `/services`, `/blog`, `/about`, `/careers`, `/contact`,
`/services/hire-front-end-developers`. 42 combinations.

## Result — 5 September 2026

**42 of 42 combinations: no horizontal overflow, no clipped section, navigation
correct for the width.** Screenshots reviewed page by page against the comps.

| Breakpoint band | Navigation | Layout |
|-----------------|------------|--------|
| 768 – 1279 | burger + full-screen dialog | single column; text and marquee panels stack |
| ≥ 1280 | full horizontal nav + "Book a 30-Min. Call" | two-column copy/panel rows, 3-up card grids |

### Two defects found and fixed

**1. The header did not fit at iPad-landscape width (16.3).**
The burger switched to the full desktop nav at `lg` (1024 px), but the header
pill is `max-w-[min(1400px,92vw)]` — about 940 px of usable bar at that width.
The logo, seven links, the language and theme controls and the CTA needed
roughly 1150 px, so "Contact Us" wrapped onto two lines and "Meet Fika AI" onto
three, leaving a broken two-storey header on every page.

Fixed by moving the switch to `xl` (1280 px) in `Header.tsx` and
`MobileNav.tsx`. 1024–1279 now gets the burger, which is the right control for a
touch device anyway; 1280 fits the full nav on one line with room to spare.

**2. The talent marquee bled off both screen edges at 1024–1279 (16.3).**
`sections.tsx` put the copy column and the marquee panel side by side from `lg`,
with the panel fixed at the comp's `w-[652px] shrink-0`. In a 1024 px window the
row came to ~1230 px, so both marquee panels lost their left and right rounding
off-screen — invisible as a scrollbar because the body clips.

Fixed by moving that row to `xl` as well, so 1024–1279 stacks the copy above a
full-width panel, exactly as 768 already did.

Both were verified at 1024, 1180 and 1280 after the change: document
`scrollWidth` equals the viewport width at every one.

### Observations, not defects

- **Tap targets between 36 and 43 px** on the footer social icons (36 × 36), the
  blog topic pills and tech-stack tabs (38 px tall), and the brand lockup
  (35 px tall). These are 16.2 items, not 16.3/16.4, and tablets are touch
  devices — worth a decision before launch. Listed per page in
  `viewport-shots/results.json` after a run.
- **Checkbox and radio inputs are 16–18 px.** Their labels are usually the real
  target; the probe cannot see that, so treat these as needing manual review
  rather than as findings.
- **The "Talk to Fika" launcher overlaps hero body copy** at 768 and 1024. It is
  a floating widget, so this is a design call — `docs/DESIGN-CONFLICTS.md` §2.
- **The hiring-model card strip on service detail pages scrolls horizontally**
  at 768. Intended: it is inside its own `overflow-x` container.

## Still outstanding

16.9 — real-device passes on iOS Safari and Android Chrome. Emulation gets
layout right; it does not catch Safari-specific rendering, momentum scrolling,
`100dvh` behaviour under the iOS toolbar, or how the burger dialog feels under
a real thumb.
