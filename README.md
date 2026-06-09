# Fekra Website

Corporate website rebuild for **Fekra** — an outsourcing partner for
international B2B clients. Bilingual (English / Arabic), light & dark mode,
blog, careers, the **Fika** AI-assistant page, contact/booking, and a clean
SEO / GEO foundation.

Built per `Fekra_Website_Rebuild_Checklist_Scope_Alignment.pdf`. Every scope
item is mapped to code in [`docs/SCOPE-CHECKLIST-MAP.md`](docs/SCOPE-CHECKLIST-MAP.md).

## Tech stack

| Concern        | Choice                                            |
| -------------- | ------------------------------------------------- |
| Framework      | Next.js 15 (App Router) + React 19                |
| Language       | TypeScript (strict, `noUncheckedIndexedAccess`)   |
| Styling        | Tailwind CSS v4 + semantic theme tokens           |
| i18n / RTL     | `next-intl` (`/en`, `/ar`) + dir-aware layout     |
| Theming        | `next-themes` (system / light / dark)             |
| Content        | MDX files in `content/` via a swappable reader    |
| Forms / email  | Route handlers + Zod + Resend                     |
| SEO            | Metadata API, JSON-LD, sitemap, robots, hreflang  |
| Spam           | Honeypot + Cloudflare Turnstile + rate limiting   |

## Getting started

```bash
cp .env.example .env.local   # fill in keys as you go (all optional for local dev)
npm install
npm run dev                  # http://localhost:3000  → redirects to /en
```

Scripts: `npm run dev | build | start | lint | typecheck | format`

> The app runs fully without any env vars — emails are logged instead of sent,
> analytics/booking/Turnstile stay dormant until their keys are provided.

## Project structure

```
content/                 # MDX content (blog, careers) per locale
  blog/{en,ar}/*.mdx
  careers/{en,ar}/*.mdx
messages/                # UI translations (en.json, ar.json)
public/                  # static assets + llms.txt (GEO)
src/
  app/
    [locale]/            # all localized routes (home, services, about,
      ...                #   fika, blog, careers, contact, not-found)
    api/                 # contact + careers route handlers
    sitemap.ts robots.ts # generated SEO files
    layout.tsx           # pass-through root layout
  components/
    layout/  ui/  forms/  seo/  analytics/  mdx/  providers/
  i18n/                  # next-intl routing, request config
  lib/
    content/  seo/  email/  security/  validation/  analytics/  utils.ts
  middleware.ts          # locale negotiation
docs/                    # scope map, assumptions
```

## Adding content

- **Blog post:** add `content/blog/<locale>/<slug>.mdx` with frontmatter
  (`title, description, date, author, category, tags, coverImage, locale`).
- **Job:** add `content/careers/<locale>/<slug>.mdx` with
  (`title, department, location, type, summary, datePosted, locale`).

Both are statically generated and surface in the sitemap automatically.

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` to the production URL (drives canonical/OG/sitemap).
- Add legacy WordPress `301` redirects in `next.config.mjs` (scope item 12).
- Move the in-memory rate limiter (`src/lib/security/spam.ts`) to Redis/Upstash.
