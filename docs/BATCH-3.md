# Batch 3 — 20 September 2026

Implemented the requests in `fekra batch 3.docx`.

| Request | Implementation |
| --- | --- |
| Active navigation in dark mode | Current route has a bold underlined desktop link; mobile menu retains its active state. |
| Logistics icon | Replaced the broken artwork with a transparent vector that works in both themes. |
| Testimonials layout | Side arrows, closer statistics, localized quotes, roles, and countries. |
| Certification backgrounds | Pure white artwork surfaces in dark mode. |
| Process timing | Every automatic stage, including completion, lasts three seconds; hover, keyboard focus, and reduced motion remain supported. |
| Contact map | The same map and white office cards remain visible in both themes, with localized city labels. |
| Client logos | Equal card dimensions, padding, rounding, alignment, and white backgrounds; balanced logo sizing. Follow-up: grayscale in light mode, original colors on hover; dark mode remains fully colored. |
| Arabic Services menu | Uses the document’s supplied terminology and CTA; technology names retain their English spelling. Follow-up: scrollbar hidden while scrolling remains available. |
| Arabic site content | Stored Arabic CMS fields for pages, services, job details, FAQs, policies, metadata, and global content; localized forms and status messages. |
| Arabic testimonials | All 15 quotes, job roles, and countries translated; English names and photos preserved. |
| Arabic hero statistics | Consistent tile composition and number typography; requested labels applied. |
| Experience and Scrum labels | Numeric experience notation and the requested Scrum role wording; mixed-language text isolated for RTL. |
| Language switching | All five locales supported through repeated switching, normal navigation, refresh, Back/Forward, and retained query/hash values. |

## Content maintenance

Arabic copy is stored independently in Payload localized fields. The supplied Services terminology is in `src/i18n/dictionaries/ar-services.json`; additional authored copy is in `scripts/translations/batch-three-ar.json`. UI dictionaries have 172 matching keys across five languages. There is no request-time translation service.

`scripts/localize-batch-three.ts` walks the CMS schema and updates localized content while retaining shared fields. It defaults to a dry run; `--write` saves backups before updating. `--only=pages/home` limits the collection/document target. Testimonial display copy for all five languages lives in `src/i18n/testimonials.json`.

CMS backups from this task:

- `/private/tmp/fekra-batch3-backup-1789895146554`
- `/private/tmp/fekra-batch3-backup-1789896257302`

## Verification

- `pnpm check:i18n`: five locales, 172 keys each.
- `pnpm typecheck` and targeted ESLint: passed.
- `pnpm exec next build`: passed; all 374 static pages generated.
- `pnpm check:content-ar`: 68 published Arabic documents and three globals, zero missing/English-only localized text findings. Technology and brand names are intentionally allowed.
- `scripts/audit-batch-three.ts`: 64 English source documents unchanged, excluding timestamps and locale availability.
- `scripts/check-language-routing.mjs`: 31 HTTP routing checks passed.
- `scripts/check-batch-three.mjs`: 71 browser checks passed, including both rounds of all-five-language switching and actual process timing. Six additional mobile-menu and theme checks passed.
- Screenshots reviewed at desktop and mobile sizes in English and Arabic, in both themes. Evidence is in `/private/tmp/fekra-batch-three-final` and `/private/tmp/fekra-batch-three-details`.

Application changes are local and have not been deployed. CMS content updates were applied to the configured database.
