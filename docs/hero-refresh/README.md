# Hero photo refresh

Reference: [Vivasoft](https://vivasoftltd.com/) and the user-supplied screenshot.

Nine images generated with the built-in ImageGen tool. These are synthetic editorial scenes, not photographs of FEKRA employees. Exact prompts are saved alongside this document.

The 1408 × 448 desktop composition uses matching outer portraits, a stepped center, large single rounded corners, and a common lower baseline. Mobile shows four photo/stat pairs. Existing FEKRA copy and figures are preserved.

## Assets and exact prompts

| Asset | Prompt |
| --- | --- |
| [egypt-courtyard-pair.webp](../../public/images/hero/egypt-courtyard-pair.webp) | [Exact prompt](egypt-courtyard-pair.prompt.txt) |
| [egypt-developer-focus.webp](../../public/images/hero/egypt-developer-focus.webp) | [Exact prompt](egypt-developer-focus.prompt.txt) |
| [egypt-developer-window.webp](../../public/images/hero/egypt-developer-window.webp) | [Exact prompt](egypt-developer-window.prompt.txt) |
| [egypt-engineer-office.webp](../../public/images/hero/egypt-engineer-office.webp) | [Exact prompt](egypt-engineer-office.prompt.txt) |
| [egypt-pair-programming.webp](../../public/images/hero/egypt-pair-programming.webp) | [Exact prompt](egypt-pair-programming.prompt.txt) |
| [egypt-senior-engineer.webp](../../public/images/hero/egypt-senior-engineer.webp) | [Exact prompt](egypt-senior-engineer.prompt.txt) |
| [egypt-team-discussion.webp](../../public/images/hero/egypt-team-discussion.webp) | [Exact prompt](egypt-team-discussion.prompt.txt) |
| [egypt-team-planning.webp](../../public/images/hero/egypt-team-planning.webp) | [Exact prompt](egypt-team-planning.prompt.txt) |
| [egypt-terrace-developer.webp](../../public/images/hero/egypt-terrace-developer.webp) | [Exact prompt](egypt-terrace-developer.prompt.txt) |

## Integration

`src/lib/hero-photos.ts` is the shared photo manifest. Known legacy images are replaced at render time; custom CMS uploads are preserved. Fresh seeds use the new assets. `scripts/replace-mosaic-photos.ts` can optionally persist the same images to the CMS with `--write`; no CMS write was performed in this task.

## Verification

TypeScript, targeted ESLint, asset existence, legacy/custom image resolution, collage overlap and baseline checks passed. Desktop comparison and mobile light/dark checks use the actual HeroSection rendered in isolation, compiled project CSS and locally cached FEKRA fonts. Full CMS-backed pages remain outside this isolated check because of the previously observed database timeout.
