# Batch 5

Implemented the requests from `FEKRA batch 5.docx`.

| Request | Change |
| --- | --- |
| Home and logo | Same-page Home links reset both native scrolling and Lenis. The mobile dialog logo is also a Home link. Modifier clicks retain normal browser behavior. |
| Blue rectangles | Removed the global hover and selected-state box shadows that outlined tabs and process steps. Pointer focus has no outline; keyboard focus remains visible. |
| Full-stack service | Restored original English heading, paragraphs, supporting sentence and benefit text; restored the peach band and original benefit artwork. |
| Mobile service | Restored the original service-specific English copy and benefit artwork; retained its original amber design token. |
| Front-end service | Restored the original English copy and coral design token instead of the generic web-family mint treatment. |
| QA service | Restored the original English paragraphs and supporting sentence, with the original lilac design token and benefit artwork. |
| Other services | Restored back-end copy and teal color. Dedicated, in-demand, DevOps and AI definitions already matched. All service heroes share the icon fallback, spacing and consultation layout. |
| Hire Now | Desktop Services CTA and the mobile Services CTA link to the localized Contact page. The existing menu dismissal behavior applies. |
| Global interactions | Shared button hover colors, pressed feedback and disabled states cover native buttons and CTA links. Tabs and shaped process controls retain their own visual treatment. |
| Meet Fika | Shared Fika feature CTAs, legacy Fika route links and the floating Fika invitation use the localized Fika page. |
| About CTA | Hover changes to a contrasting fill with readable text and arrow. |
| Careers fields | Open roles, internships and future opportunities have bordered inputs. The math answer has a two-pixel box border and a minimum 48px height, including dark mode. |
| Hiring benefits | Reduced the desktop gap from 80px to 32px and tightened the bottom spacing. |

## Content and source

The full-stack reference embedded in the supplied document matches the original English service definitions in the repository. Those definitions now live in `src/seed/service-designs.ts`; both seed paths use them, preventing family data from replacing reviewed service heroes. The original local artwork lives under `public/images/services/`.

The targeted `scripts/restore-batch-five.ts` update preserves layout IDs, other sections, relationships, publication state and existing translations. It saves an all-locale backup before each changed document. English copy is restored; existing translated copy is retained. No new Figma export was available or used: visual checks use the supplied reference and the repository's original design definitions.

## Validation

- TypeScript and targeted ESLint checks.
- Browser checks at 1440px and 390px, in light and dark themes.
- Home/logo navigation, mobile menu dismissal, Hire Now destination, Fika links, hover feedback and overflow checked in English, Arabic, German, French and Spanish.
- Service hero screenshots, three benefit icons per hero, restored English copy, color tokens and 32px Benefits gap.
- About CTA hover and keyboard focus checks.
- Careers math fields checked using a mocked challenge response. No forms submitted and no leads or applications created.

Local CAPTCHA keys are not configured. The checks validate input appearance and focus, not a live CAPTCHA submission. Website code changes are local; the targeted service content restoration is applied to the configured CMS.

## Global button follow-up

Filled CTAs now use the Careers reference interaction: colored fill changes to white, with a readable accent label and an inset border. Outline and white buttons change to a solid contrasting fill. The original orange, blue and navy Careers defaults are retained, with shared hover and pressed rules instead of separate component hover implementations.

The system is in `src/app/(site)/globals.css`. New CTAs should use `Button`, `LinkButton`, or `buttonClass`; custom link buttons use `fk-button` and a `fk-button--primary`, `--secondary`, `--inverse`, or `--on-dark` variant. Native buttons receive shared interaction states automatically. CSS module overrides set only default colors and the `--button-hover-*` variables.

Coverage includes the header, Services menu, service CTAs, About CTA, blog newsletter and share controls, Careers shortcuts and all three application types, contact and newsletter forms, footer social buttons, and language menu items. Pressed colors apply outside the hover media query for touch devices. Disabled buttons retain their defaults and show reduced opacity; keyboard focus stays visible.

`node scripts/check-button-system.mjs http://localhost:3000` inspects rendered default, hover, pressed and disabled styles on the core pages in both themes. It also checks hover text contrast and mobile pressed feedback. Additional paths can be passed as a comma-separated fourth argument, following the output directory. Browser submissions are intercepted.
