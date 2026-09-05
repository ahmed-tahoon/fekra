# Design conflict register

Checklist 2.10: where the approved design conflicts with accessibility,
responsiveness or performance, the conflict is written down with a recommended
solution and **approved before anyone deviates from the comp**.

Every entry below is backed by a measurement in `docs/PERFORMANCE.md` or
`docs/RESPONSIVE.md`, not by an opinion about the design. Nothing here is a
complaint about the comps; each one is a place where two good requirements
disagree and someone at FEKRA has to pick.

**Status key:** 🔴 open, needs a FEKRA decision · 🟡 decided, not built ·
🟢 resolved

---

## 1. First-visit splash screen vs. Core Web Vitals — 🔴

**The design asks for** a branded loading screen on first visit: the FEKRA
logo pulsing over the page background, fading out on `load` with a 700 ms floor
and a 2.5 s cap (`src/app/(site)/[locale]/layout.tsx`).

**The conflict.** The splash covers the viewport, so nothing behind it can be
the largest contentful paint until it clears. On the 5 September Lighthouse run
it is the single reason five of six pages miss the 2.5 s mobile LCP target —
`/about` 6.5 s, `/blog` 4.4 s, `/careers` 4.2 s, `/contact` 4.1 s, `/` 4.2 s —
with a 3.0–3.5 s render delay on the pages whose LCP is text. 17.2 wants LCP
≤ 2.5 s and 17.3 wants Lighthouse ≥ 90; neither is reachable while the splash
holds the first paint.

It is worth saying what the splash does *not* cost: CLS is 0.000, the splash is
removed from the DOM rather than left behind, it is skipped on repeat views in
the same tab, and `<noscript>` hides it. This is a first-visit-only cost — but
first visits from search are exactly the traffic these pages are for.

**Recommended solution**, in order of preference:

1. **Drop the 700 ms floor and lower the cap to ~1 s.** The splash still covers
   a genuinely slow load and disappears the moment the page is ready. Cheapest
   change, keeps the brand moment, most of the LCP back.
2. **Show it only on the home page.** A visitor landing on `/blog` from a search
   result never asked for an intro.
3. **Keep it exactly as designed and accept the exception**, recording it under
   17.3 as "material exception, explained and approved". Defensible if the
   splash is considered part of the brand experience — but it must be a decision
   on the record, not a number nobody looked at.

**Decision:** _pending FEKRA_ · **Owner:** _brand + delivery_

---

## 2. Floating "Talk to Fika" launcher over hero copy — 🔴

**The design asks for** a persistent chat launcher pinned to the lower-right of
the viewport.

**The conflict.** At 768 px it sits on top of the hero's third value bullet
("Transparent delivery process"); at 1024 px it covers the end of the hero
paragraph. The text underneath is not just decoration — it is the hero's
supporting copy, and it is unreadable at exactly the widths tablets use.

**Recommended solution.** Collapse the launcher to its 56 px avatar bubble below
`xl`, expanding to the full "Talk to Fika" pill only where there is margin for
it; or raise its bottom offset above the hero on small viewports. Either keeps
the launcher present without covering copy.

**Decision:** _pending FEKRA_ · **Owner:** _design_

---

## 3. Brand lockup and language button accessible names — 🔴

**The design asks for** a logo lockup whose visible text is the tagline
"Loyalty . Innovation . Expansion", and a compact language control showing just
the current language code ("EN").

**The conflict.** Both carry an accessible name that does not contain their
visible text — the lockup is `aria-label="FEKRA"`, the button is
`aria-label="Change language"`. That is a WCAG 2.5.3 *Label in Name* failure,
flagged by Lighthouse on every page. Someone using voice control who says "click
Loyalty" or "click E N" gets nothing, because the name the browser exposes has
no such words in it.

**Recommended solution.** Extend the names rather than change the design:
`aria-label="FEKRA — Loyalty . Innovation . Expansion"` on the lockup, and
`aria-label="EN — change language"` on the switcher. Nothing moves on screen;
the visible text becomes part of the spoken name.

**Decision:** _pending FEKRA_ · **Owner:** _front-end, no visual change_

---

## 4. Blog accent colour fails contrast in dark mode — 🔴

**The design asks for** category pills on post cards in the blog accent blue
(`--blog-600`, `#2f7fb0`) at 11 px.

**The conflict.** Against the dark card background (`#151b29`) that is a
contrast ratio of **3.91:1**, below the 4.5:1 WCAG AA minimum for text this
size. Light mode passes. The pill is the only thing telling a reader what a post
is about before they open it.

**Recommended solution.** Give `--blog-600` a lighter dark-mode value — the
token set already swaps per theme, so this is a one-line token change with no
effect on the light comps. Raising the pill to 12 px and semibold does not fix
it on its own; the ratio is still short of AA.

**Decision:** _pending FEKRA_ · **Owner:** _design tokens_

---

## 5. No pressed state anywhere in the UI — 🔴

**The design specifies** hover, focus, disabled, loading, success and error
states. It does not specify a pressed state, and there are correspondingly zero
`:active` rules in `globals.css` and none in the component tree.

**The conflict.** 2.4 asks for interaction states to be complete. On a touch
device with no hover, the pressed state is the *only* immediate feedback that a
tap registered — its absence is most noticeable on exactly the tablets covered
by 16.3.

**Recommended solution.** One global rule: `:active` scales interactive
elements to 0.98 and darkens the surface one step, honoured under
`prefers-reduced-motion`. It needs no per-component design work and no new
tokens.

**Decision:** _pending FEKRA_ · **Owner:** _design sign-off, then front-end_

---

## 6. Scroll-linked reveals hide content from anything that does not scroll — 🟡

**The design asks for** sections that fade and rise into view as the page
scrolls (`.fk-reveal`).

**The conflict.** The animations are scroll-linked, so an off-screen section
sits at `opacity: 0` until the scroll position reaches it. Any consumer that
renders the page without scrolling — print and "Save as PDF", a full-page
screenshot, some archiving crawlers — gets a page that is blank below the fold.
This is a robustness rather than an accessibility failure: screen readers read
the DOM, the content is all server-rendered, and `prefers-reduced-motion` already
switches the reveals off completely.

**Decision:** accepted as designed, with a print stylesheet that forces
`.fk-reveal` content visible. The same escape hatch already exists for reduced
motion, so this is a two-line addition, not a rework.

**Owner:** _front-end_ · **Not built yet.**

---

## 7. Desktop navigation breakpoint moved from 1024 to 1280 — 🟢

**The design shows** the full horizontal navigation on a desktop frame, with the
burger on tablet and phone frames; the comps do not name the switching width, so
the build used the `lg` default of 1024 px.

**The conflict.** At 1024 px the header bar has about 940 px of usable width and
the full nav needs roughly 1150 px, so "Contact Us" wrapped onto two lines and
"Meet Fika AI" onto three — a broken two-storey header on every page at iPad
landscape (16.3).

**Resolved** by switching at `xl` (1280 px) instead. 1024–1279 gets the burger,
which is the right control for a touch device; 1280 and up gets the comp's
header on one line. The talent-marquee row was moved to the same breakpoint for
the same reason. No visual change at any width the comps actually show.

See `docs/RESPONSIVE.md` for the before/after evidence.
