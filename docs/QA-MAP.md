# Checklist → Implementation Map

Maps each section of *FEKRA Website Production & QA Acceptance Checklist v1.1* to where it
is implemented and how to verify it. Use this during QA (§24) and at handover (§25.12).

**Status key:** ✅ built and verified · 🔧 mechanism built, needs content/config · ⬜ not
started (content, credentials or a business decision is the blocker)

---

## 1. Scope, sitemap & required pages — 🔧

Routes exist for Home, Blog (list + article), Services (list + detail), About, Careers
(list + detail), Contact, Meeting, 404, plus any CMS page at `/[slug]`. Fika is a CMS page
(`/fika`) so it can gain a coded route later without a URL change (13.4).
Remaining: the approved page inventory has to be entered in the CMS (1.12).

**Verify:** `pnpm check:links http://localhost:3000` — crawls the sitemap and every internal link.

## 2. Approved design implementation — 🔧

Tokens are extracted from the Figma file into `src/app/(site)/globals.css` (brand ramp,
type scale, radii, shadows). Components consume semantic tokens only, so light/dark is a
token swap. Interaction states (hover/focus/active/disabled/loading/success/error) exist on
buttons and form fields.
Remaining: section-by-section visual QA against the comps once real assets are loaded (2.1, 2.7).

## 3. Project setup & environments — ✅ / ⬜

`README.md` covers structure and commands; `docs/HANDOVER.md` covers environments, build,
rollback and secrets. `.env.example` documents every variable with no secret values.
⬜ Repository ownership, branch protection and the staging project are account actions (3.2, 3.3).

## 4. CMS & content management — ✅

Payload admin at `/admin`. Collections: Pages, Posts, Categories, Services, Jobs, Media,
plus write-only Submissions. Drafts + autosave + live preview on all content types. SEO
fields (title, description, image, canonical override, noindex) on every indexable
collection. Per-locale fields for all five languages. Admin is authenticated and
`noindex`-headered.

**Verify:** save a draft → *Preview* → the page renders unpublished; log out → the draft is
not reachable via `/cms-api`.

## 5. Navigation, header, footer — ✅

Header/Footer are CMS globals. Nav supports dropdowns; the meeting CTA is a first-class
field. Mobile nav is a native `<dialog>` (focus trap, Escape, scroll lock from the platform).
Internal links are stored as *relationships*, so a deleted target drops the link instead of
rendering a dead `#`.

## 6–9, 13. Home, Services, Blog, About, Fika — 🔧

Templates, blocks and structured data are built. Content entry is the remaining work.
Services support a parent/child hierarchy for SEO landing pages with breadcrumbs (7.4, 18.9).

## 10. Careers & applications — ✅

Job collection with schema-ready fields; listing filters to open roles; detail page renders
JobPosting schema only while the role is open. Application flow: client + server validation,
MIME **and** extension allow-list, 5 MB cap, derived filename, private storage, unique index
for duplicate prevention, internal notification email.

**Verified:** `.exe` rejected with `fileType`; valid PDF stored; duplicate blocked by
`job_applications_dedupe_key_idx`; 4th submission in a minute returns 429.

## 11. Contact — ✅

Validation accepts international phone formats. Honeypot + minimum fill time + per-IP rate
limit. Success/error/retry states. The conversion event fires only after a 2xx.

**Verified:** honeypot and sub-2s submissions return 200 and store nothing; a genuine
submission is stored.

## 12. Booking — 🔧

Calendly embed loads only after marketing consent, with a direct link as the always-available
fallback. `calendly.event_scheduled` is tracked separately from the CTA click.
⬜ Needs the real Calendly URL in Site Settings.

## 14. Multilingual (5 locales) — ✅

English unprefixed, `ar/de/fr/es` prefixed; `/en/*` 308-redirects to the canonical form.
`lang` and `dir` are server-rendered per locale. hreflang lists only locales marked
available on the document, and includes `x-default`. UI dictionaries are complete and
key-identical across all five languages.

**Verified:** `pnpm check:i18n` (routing inverses, RTL, Accept-Language negotiation, slug
normalisation, 94 keys × 5 locales). `/ar` renders `lang="ar" dir="rtl"` with Arabic chrome.

## 15. Dark / light mode — ✅

`next-themes` writes the class before paint, so no theme flash. System default on first
visit, manual choice remembered. Full semantic token set for both themes; the dark primary
uses a dark foreground to stay above 4.5:1. Logo has separate light/dark slots.

## 16. Responsive — 🔧

Mobile-first layouts, 44px minimum touch targets, `overflow-x: clip` on body, logical
properties throughout so RTL mirrors automatically.
⬜ Real-device passes on iOS Safari and Android Chrome (16.9).

## 17. Performance & Core Web Vitals — 🔧

Static generation with on-publish revalidation; hero image marked `priority`, everything
else lazy; AVIF/WebP with size variants matched to the layout; only the used font weights,
Arabic not preloaded; GTM deferred behind consent; `prefers-reduced-motion` honoured.
⬜ Lighthouse/field measurement on the real domain with production integrations enabled (17.3, 17.12).

## 18. Technical SEO — ✅

Every page's metadata goes through one builder, so canonical, hreflang, OG and robots
directives cannot disagree. Sitemap includes `xhtml:link` alternates and excludes
noindex/hidden/closed documents. Robots is driven by CMS policy. Correct 404 status (no
soft-404). Root URL has one spelling across canonical, sitemap and schema.

**Verified:** canonical `http://localhost:3000` == sitemap `<loc>`; `/nope` returns 404.

## 19. AEO / GEO / AI readiness — ✅

Semantic HTML (real `<ol>` for process steps, `<details>` for FAQ, `<figure>`/`<blockquote>`
for testimonials). All content is in the server-rendered HTML — nothing meaningful requires
JS. Organization / WebSite / BlogPosting / Service / JobPosting / BreadcrumbList / FAQPage
schema. `robots.txt` treats search bots, AI-search bots and AI-training bots as three
separate decisions, editable in Site Settings. `/llms.txt` returns 404 until explicitly enabled.

## 20. WordPress migration — 🔧

`redirects.json` compiles into the router: one hop, no runtime lookup. Internal links render
final destinations, never redirect sources.
⬜ The actual old-URL inventory and mapping (20.1, 20.2) — the file currently holds only the
three structural WordPress patterns.

## 21. Security & privacy — ✅ / 🔧

HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
and a CSP (report-only until the third-party inventory is frozen — flip `CSP_ENFORCE=true`).
Server-side validation on every endpoint. CVs are private with signed 5-minute URLs. Errors
return a digest, never a stack trace. Admin and `/cms-api` are `noindex` and CORS-locked.
⬜ Privacy/cookie policy content (21.7) and an agreed data-retention period (21.12).

**Verified:** security headers present on every response.

## 22. Analytics — 🔧

Event names live in one file (`src/lib/analytics.ts`) and are the measurement map. GTM and
direct GA4 are mutually exclusive so page views cannot double. Conversions fire only after a
confirmed success. UTM values are captured on entry and stored with the lead, not the event.
⬜ Needs real GA4/GTM/LinkedIn IDs in Site Settings.

## 23. Accessibility & global access — 🔧

Skip link, visible focus ring in both themes, `aria-current` navigation, labelled fields with
`aria-invalid`/`aria-describedby` and `role="alert"` errors, reduced-motion support.
⬜ Full axe/manual audit (23.1), browser matrix (23.6–23.7) and regional reachability checks
(23.10) are QA activities.

## 24. QA & pre-launch — 🔧

Automated gates available now: `pnpm typecheck`, `pnpm check:i18n`, `pnpm check:links`.
⬜ The manual passes (visual, forms, booking, browsers, performance, content completeness)
run against staging with real content.

## 25. Deployment & handover — 🔧

`docs/HANDOVER.md` covers architecture, environments, deploy, rollback, integrations, CMS
workflow, monitoring and backups. `GET /api/health` checks the database for uptime monitoring.
⬜ Credential transfer, launch-day smoke test and the warranty window are sign-off items.

---

## Verified in this build

```
pnpm typecheck                                     clean
pnpm check:i18n                                    5 locales, 94 keys each
pnpm build                                         46 static pages generated
GET  /                                             200, single H1, Organization+WebSite+FAQPage JSON-LD
GET  /ar                                           200, lang="ar" dir="rtl", Arabic UI
GET  /en/contact                                   308 → /contact
GET  /nope                                         404 (real status)
GET  /sitemap.xml                                  200, hreflang alternates for all locales
GET  /robots.txt                                   200, disallow-all on non-production
GET  /llms.txt                                     404 (disabled in Site Settings)
GET  /admin                                        200
POST /api/contact  (valid)                         200, stored
POST /api/contact  (honeypot / <2s)                200, not stored
POST /api/contact  (6th in a minute)               429
POST /api/apply    (.exe)                          422 fileType
POST /api/apply    (valid PDF)                     200, stored with derived filename
                    duplicate                      blocked by unique index
```
