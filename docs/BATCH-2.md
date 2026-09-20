# Batch 2 implementation — 20 September 2026

Source: `fekra batch 2 .docx` supplied by the client.

## Implemented

- Active navigation on home, section pages and their detail pages; retained the existing locale-aware fix.
- Color client-logo originals with grayscale rest state, color hover and optical size corrections. SLB, GOSI and Alfanar replace the last three marks.
- Compared three- and four-column logo grids; retained three columns. English statement uses the requested three lines.
- Services mega menu uses the reference's eight groups, five columns, rounded corners and Hire Now placement. Height is bounded; Escape and close button dismiss it.
- Services links directly to the Hire Dedicated Developers landing page, confirmed by the client's follow-up screenshot. The section stays active on all service detail pages.
- Schedule a Call and Book a 30-Min. Call go directly to Calendly. The booking drawer is no longer mounted; old meeting URLs redirect.
- Retained and checked the existing erase/type animation and restored trust avatars; reduced-motion preferences remain respected.
- Tighter talent-section spacing, check markers, and wider business-types supporting text.
- Process completion shows “Done!” and the requested delivery-ready message; the result can also be selected manually.
- All 15 testimonials are accessible in three groups of five, with arrows and group selectors.
- Statistics now show 4.9/5 Client Rating, 98% Client Retention and 12+ Countries Served, with a clean star icon.
- FAQ answers use available width, reduced spacing and single-open behavior.
- Footer includes working Privacy Policy, Terms & Conditions, Cookie Policy and Cookie Preferences. Preferences reopen saved, independent analytics/marketing choices.
- Careers has a team-photo hero, direct openings CTA, grouped live roles, benefit icons and the existing hiring/application flow.
- All four currently published articles have Arabic, German, French and Spanish titles, excerpts, bodies, tags and metadata. Categories are localized; Arabic content uses RTL. Unpublished content was not changed. Future untranslated posts are excluded from non-English listings.
- Global-presence cards use accurate Egypt, Saudi Arabia, UAE, UK and US flag vectors.

## Content operations and maintenance

CMS changes were applied to the configured database, with backups before writes:

- Blog: `/private/tmp/fekra-blog-backup-1789868340668/content.json`
- Legal pages: `/private/tmp/fekra-legal-backup-1789868544813/pages.json`

`scripts/translate-blog.ts` and `scripts/batch-two-legal.ts` default to dry runs; `--write` applies their changes. Translation text is versioned in `scripts/translations/blog.json`. Legal copy should receive the usual business/legal sign-off before release.

Keep `NEXT_PUBLIC_BOOKING_URL` aligned with the CMS Calendly URL. Default: `https://calendly.com/fekra-egy-info/30min`.

Official replacement logo sources:

- SLB: `https://www.slb.com/-/media/images/logo/SLB_Logo_Positive_RGB_TM.svg`
- GOSI: `https://cdn.gosi.gov.sa/gptscripts/GOSILogo.eb4de07c6f398bc1.svg`
- Alfanar: `https://www.alfanar.com/assets/images/logo-blue.svg`

## Verification

- `pnpm typecheck`
- Targeted ESLint on changed source and scripts
- `pnpm check:i18n` — five locales, 157 dictionary keys each
- `pnpm exec next build` — production build, 110 static pages; bypasses the package build command's unrelated migration step
- `node scripts/check-batch-two.mjs http://localhost:3000 /private/tmp/fekra-batch2.tHQYbA/acceptance-final` — 38/38 checks passed, covering interactions, responsive widths, localized articles, consent persistence, typewriter animation and Arabic dark mode
- Additional viewport sweep of home, Careers and an Arabic article

Local screenshots and machine-readable results are in `/private/tmp/fekra-batch2.tHQYbA/acceptance-final`. The experimental background pattern was removed at the client's request; original plain backgrounds remain in both themes. CMS backups and screenshots are local verification artifacts, not deployment assets.
