# FEKRA batch 4

Implemented from `FEKRA batch 4.docx` supplied on September 26, 2026.

## Changes

1. Removed the Services mega-menu close icon.
2. Rendered the three home hero feature icons as inline SVGs, independent of remote image loading and navigation caches.
3. Matched the English client statement to the reference's three lines, with “top 3%” starting line two.
4. Enlarged client logos and cells while preserving aspect ratios and optical sizing.
5. Made process numbers and bars selectable. Every selection restarts the three-second timer, including repeat clicks. The Done state gets a full three seconds. Reduced-motion users retain manual control.
6. Routed every menu role to its own group's main category, including Arabic and mobile navigation.
7. Removed the locations label's background and enlarged the text. Transparently masked the English caption baked into the map artwork so it does not overlap localized labels.
8. Added immediate, independent field validation and disabled-until-valid behavior to consultation forms, including required phone and hiring model.
9. Made service layouts use the home Industry Leaders carousel directly after Industries. The content, photos, statistics and controls come from the same source and renderer.
10. Confirmed that the current CMS already holds all six approved FAQ items and their translations. Kept the original content and exclusive accordion.
11. Used transparent certification originals consistently in both the home strip and compliance rows; removed background discs and theme-specific logo padding.
12. Strengthened shared button hover, active, selected and disabled states, including custom CTAs, navigation controls, tabs and Careers shortcuts.
13. Added shared CAPTCHA and signed arithmetic verification to every Careers application variant, alongside required fields, consent and CV checks.
14. Added the same validation and bot protection to Contact Us. Newsletter forms also use the shared verification so the public signup endpoint remains protected.
15. Replaced the Careers city-illustration strip with the current localized presence map.
16. Removed the link from the entire Careers “You?” card.

## Activate live CAPTCHA

Create a Cloudflare Turnstile widget for the deployment's domains and configure:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<public site key>
TURNSTILE_SECRET_KEY=<server secret>
TURNSTILE_HOSTNAMES=<comma-separated production and preview hostnames>
```

Rebuild after setting the public key. Keys are deliberately absent from the repository. Without configuration, verification fails closed and public submit buttons stay disabled. Cloudflare's public test keys were used only in the local test server process, not saved in an environment file.

The server validates the CAPTCHA with Cloudflare before any database write, CV upload or notification. It checks the hostname, form action and challenge nonce. The arithmetic challenge is signed and expires after five minutes. Wrong answers, forged challenges, expired or rejected CAPTCHA tokens, and provider outages cannot bypass verification. Rate limits and honeypots remain in place. The widget supports five languages, localized field errors, token expiry, retry and compact rendering in narrow cards.

References: [Cloudflare server verification](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/), [Cloudflare test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/), [requested process reference](https://www.bairesdev.com/top-1-percent/).

## Verification

- `pnpm typecheck`
- `pnpm exec next build --experimental-build-mode compile` — production compilation passed; this does not perform the final CMS-dependent static generation or deployment
- ESLint on changed code
- `pnpm exec tsx scripts/check-batch-four-security.ts` — mocked provider responses; no external writes
- `node scripts/check-batch-four-api.mjs` — real local HTTP endpoints reject requests without verification
- `node scripts/check-batch-four.mjs` — browser coverage across English, Arabic, German, French and Spanish, desktop/mobile and light/dark; all successful form POSTs intercepted to prevent stored submissions or emails

Browser coverage completed in targeted runs after remote CMS connection timeouts interrupted the long run. The remaining Spanish forms and German consultation flow passed on rerun. Final screenshots also cover the English/Arabic consultation form in both themes and narrow viewports. Six approved FAQ items rendered in every language, with exclusive opening behavior; hero icons survived client navigation and Back/Forward visits. API rejection checks and the mocked-provider security suite passed. No test data was persisted.

Live-domain CAPTCHA acceptance and real delivery still require production keys and a configured notification provider. No deployment or production submission is performed by these checks.
