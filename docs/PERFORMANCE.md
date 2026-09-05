# Performance & Core Web Vitals

Checklist 17.1 (speed measured during development, not optimised after), 17.2
(Core Web Vitals "good" thresholds with lab evidence) and 17.3 (Lighthouse ≥ 90
on key public pages, mobile and desktop).

## How to measure

```
pnpm perf                          # the deployed site
pnpm perf http://localhost:3000    # after `pnpm build && pnpm start`
```

`scripts/check-perf.mjs` runs Lighthouse over the six key public pages in both
form factors, keeps the raw reports in `.lighthouse/` (gitignored, ~1 MB each)
and exits non-zero if anything is outside budget — so it can gate a release
rather than being a thing someone remembers to do. Delete a report to
re-measure just that page.

Never point it at `pnpm dev`. An unminified development build measures nothing
a visitor will ever see.

## Budget

| Metric | Target | Source |
|--------|--------|--------|
| LCP | ≤ 2.5 s | 17.2 |
| INP | ≤ 200 ms (lab proxy: TBT ≤ 200 ms) | 17.2 |
| CLS | ≤ 0.1 | 17.2 |
| Lighthouse performance | ≥ 90 mobile and desktop | 17.3 |

## Run of 5 September 2026

`https://fekra-beige.vercel.app`, Lighthouse 12.8.2, headless Chrome, default
throttling (mobile: Moto G Power, 4× CPU slowdown, simulated Slow 4G).

| Page | Form factor | Perf | A11y | BP | SEO | LCP | CLS | TBT | Budget |
|------|-------------|-----:|-----:|---:|----:|----:|----:|----:|--------|
| home | mobile | 84 | 100 | 96 | 92 | 4.17s | 0.000 | 28ms | FAIL |
| home | desktop | 75 | 97 | 96 | 92 | 3.46s | 0.000 | 0ms | FAIL |
| services | mobile | 96 | 100 | 96 | 92 | 2.49s | 0.000 | 45ms | pass |
| services | desktop | 99 | 100 | 96 | 92 | 0.77s | 0.000 | 0ms | pass |
| blog | mobile | 80 | 94 | 96 | 100 | 4.40s | 0.000 | 9ms | FAIL |
| blog | desktop | 96 | 94 | 96 | 100 | 1.36s | 0.000 | 0ms | pass |
| about | mobile | 69 | 100 | 96 | 100 | 6.51s | 0.000 | 19ms | FAIL |
| about | desktop | 88 | 100 | 96 | 100 | 2.27s | 0.000 | 0ms | FAIL |
| careers | mobile | 81 | 96 | 96 | 100 | 4.16s | 0.000 | 23ms | FAIL |
| careers | desktop | 99 | 96 | 96 | 100 | 0.77s | 0.000 | 0ms | pass |
| contact | mobile | 81 | 100 | 96 | 100 | 4.13s | 0.000 | 18ms | FAIL |
| contact | desktop | 97 | 100 | 96 | 100 | 1.27s | 0.002 | 0ms | pass |

**5 of 12 within budget.** This is the pre-fix baseline: it was taken before
the changes listed under *Fixed in this pass*, which are not deployed yet.

### What passes outright

- **CLS: 0.000 everywhere** except a 0.002 blip on desktop contact. Reserved
  boxes on every image and the pre-paint theme write are doing their job.
- **TBT: 0–45 ms** against a 200 ms budget, so INP has a large margin before
  real interaction handlers are added.
- **Accessibility 94–100, best practices 96, SEO 92–100** on every page.

### Why the mobile LCP fails — one cause, five pages

Every failing page shows the same shape in the trace: a long render delay or a
long image load delay while the first-visit splash screen
(`src/app/(site)/[locale]/layout.tsx`) holds the viewport. The splash fades on
`load`, with a 700 ms floor and a 2.5 s cap, so on a throttled mobile
connection it *is* the largest contentful paint budget.

| Page | LCP element | Phase that dominates |
|------|-------------|----------------------|
| about (6.51s) | the splash logo itself | 1.7 s load delay + 3.4 s load |
| blog (4.40s) | first post card image | 3.1 s render delay |
| careers (4.16s) | intro paragraph | 3.5 s render delay |
| contact (4.13s) | form heading | 3.5 s render delay |
| home (4.17s) | hero mosaic image | 1.9 s load delay |

Lighthouse always arrives with an empty `sessionStorage`, so it always pays for
the splash; a returning visitor in the same tab skips it entirely. That makes
the lab number the worst case rather than the typical one — but it is also
exactly what a first-time visitor from a search result gets, which is the
audience these pages exist for.

Removing or shortening the splash is a **design decision, not a code decision** —
see `docs/DESIGN-CONFLICTS.md` §1, which carries the recommendation and needs
FEKRA sign-off before anyone changes it.

### Smaller, cheaper items

| Finding | Pages | Status |
|---------|-------|--------|
| `/favicon.ico` 404 on every request (console error, best practices 96) | all | fixed — `src/app/icon.svg` |
| Dark splash logo marked `loading="lazy"`; Chrome fetched it anyway and it became the LCP element on /about | all | fixed — both splash logos are `fetchpriority="high"` |
| No meta description on `/services` (`buildMetadata` was never given one) | services | fixed |
| No meta description on `/` (CMS field is empty) | home | **content task** — Pages → Home → SEO |
| `label-content-name-mismatch`: the brand link is `aria-label="FEKRA"` but reads "Loyalty . Innovation . Expansion"; the language button is `aria-label="Change language"` but reads "EN" | all | 23.x, see `docs/DESIGN-CONFLICTS.md` §3 |
| Category pills on `/blog` fail colour contrast; a card `h3` follows no `h2` | blog | 23.x |
| Unused JavaScript 24–89 KiB, legacy JS 14 KiB | all | accepted — under 100 KiB, not what is costing the LCP |

### Fixed in this pass

- `src/app/icon.svg` — removes the `/favicon.ico` 404 on every page.
- Both splash logos are eager with `fetchpriority="high"`. The `loading="lazy"`
  on the dark one never saved anything: Chrome downloads a lazy image it cannot
  position, which the trace confirms, and the deferred fetch was the LCP element
  on /about.
- `/services` now sends a meta description.

Expected effect: best practices 96 → 100 everywhere, and /about mobile LCP down
by the ~1.7 s the deferred logo fetch was adding. It does **not** fix the splash
itself, so the mobile pages stay outside the 2.5 s budget until §1 of the design
conflicts register is decided.

## Field data (17.2)

None yet. The site is on a preview host with no real traffic, so there is no
CrUX history to read. After cutover to the production domain, monitor field LCP,
INP and CLS for 28 days before treating the lab numbers as representative.

## Re-run before sign-off

The table above is the *pre-fix, preview-domain* baseline. Re-run `pnpm perf`
against the production domain after cutover, with the real GA4/GTM and Calendly
IDs in Site Settings — third-party tags are the usual difference between a clean
staging number and a disappointing production one.
