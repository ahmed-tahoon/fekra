# Fekra Rebuild — Scope Checklist → Code Map

This maps every section of `Fekra_Website_Rebuild_Checklist_Scope_Alignment.pdf`
to where it is handled in this codebase. Status legend:

- ✅ **Scaffolded** — structure/implementation in place, ready to extend.
- 🟡 **Stubbed** — seam/placeholder in place; needs content or a provider key.
- ⬜ **Content/decision** — depends on Fekra input or a commercial decision.

| #   | Area                                  | Where it lives                                                                 | Status |
| --- | ------------------------------------- | ------------------------------------------------------------------------------ | ------ |
| 1   | Project purpose & outcomes            | Home `src/app/[locale]/page.tsx`, copy in `messages/*`                          | 🟡     |
| 2   | Strategic design & advisory           | `docs/` + ongoing recommendations (process, not code)                          | ⬜     |
| 3   | Content guidance & structure          | `content/`, page structure under `src/app/[locale]/`                           | ⬜     |
| 4   | Logic-based design                    | Component hierarchy + `docs/` rationale                                        | 🟡     |
| 5   | Daily updates                         | Use item numbers from this table in updates                                   | ⬜     |
| 6   | Backend scope (CMS, forms, email)     | `src/lib/content/`, `src/app/api/`, `src/lib/email/`                           | ✅     |
| 7   | Fika AI assistant page                | `src/app/[locale]/fika/page.tsx`                                               | ✅     |
| 8   | Careers & application flow            | `src/app/[locale]/careers/`, `src/app/api/careers/route.ts`, application form  | ✅     |
| 9   | Blog system                           | `src/app/[locale]/blog/`, `src/lib/content/blog.ts`, MDX in `content/blog/`    | ✅     |
| 10  | Contact & booking                     | `src/app/[locale]/contact/`, `src/app/api/contact/route.ts`, Calendly env      | ✅     |
| 11  | Arabic/English + light/dark           | `src/i18n/`, `messages/`, `middleware.ts`, `theme-provider`, `globals.css`     | ✅     |
| 12  | WordPress → Next.js migration         | `next.config.mjs` redirects, `sitemap.ts`, `robots.ts` (URLs TBD)             | 🟡     |
| 13  | Performance & Core Web Vitals         | SSG, `next/font`, `next/image`, reduced-motion, RSC-first                      | ✅     |
| 14  | Technical SEO foundation              | `src/lib/seo/`, `JsonLd`, `sitemap.ts`, `robots.ts`, metadata builder          | ✅     |
| 15  | AI-agent readiness / GEO              | Semantic HTML, `public/llms.txt`, accessible components                        | ✅     |
| 16  | Security, privacy, trust              | Security headers, honeypot + Turnstile, Zod validation, CV limits              | ✅     |
| 17  | Analytics & conversion                | `src/components/analytics/`, `src/lib/analytics/track.ts` (env-gated)          | ✅     |
| 18  | Global accessibility / regional       | Hosting/DNS/CDN config (deploy-time) — see `docs/DEPLOYMENT.md` TODO           | ⬜     |
| 19  | QA & pre-launch                       | `typecheck` + `build` green; manual QA checklist below                         | 🟡     |
| 20  | Final confirmation                    | Assumptions & flags in `docs/ASSUMPTIONS.md`                                   | ⬜     |

## Notes / flags (per item 20.2)

- **12.x Migration:** legacy WordPress URLs are not yet known. Add concrete
  `301` redirects in `next.config.mjs` once the old URL inventory is provided.
- **6.1 CMS:** content currently lives as MDX in `content/` (version-controlled,
  zero-cost). The reader layer in `src/lib/content/mdx.ts` is the only seam — a
  headless CMS (Sanity/Payload) can replace it without touching pages.
- **10.6 Booking:** Calendly renders only when `NEXT_PUBLIC_CALENDLY_URL` is set.
- **16.2 Spam:** honeypot is always on; Cloudflare Turnstile activates when keys
  are set. The in-memory rate limiter should move to Redis/Upstash in prod.
- **17.x Analytics:** GA4 / GTM / LinkedIn load only when their env vars exist.
