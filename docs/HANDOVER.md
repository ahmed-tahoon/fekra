# FEKRA Website — Technical Handover

Covers checklist section 25.9 (technical handover documentation) and the environment,
integration and ownership items it depends on.

---

## 1. Architecture

One Next.js application contains both the public site and the CMS.

```
                     ┌─────────────────────────────────────────┐
   visitor  ────────▶│  Next.js (Vercel)                       │
                     │   proxy.ts     locale routing + noindex  │
                     │   (site)/…     RSC pages, ISR-cached     │
                     │   api/…        forms, preview, health    │
   editor   ────────▶│   /admin       Payload admin UI          │
                     │   /cms-api     Payload REST + GraphQL    │
                     └───────┬──────────────────┬───────────────┘
                             │                  │
                     ┌───────▼──────┐   ┌───────▼────────────┐
                     │  PostgreSQL  │   │  Supabase Storage  │
                     │  content +   │   │  media (public)    │
                     │  submissions │   │  CVs (signed only) │
                     └──────────────┘   └────────────────────┘
```

Rendering: public pages are statically generated and revalidated on a timer, plus an
immediate purge when an editor publishes (`src/payload/hooks/revalidate.ts`). Nothing on a
public page requires client-side data fetching to be readable (19.2).

## 2. Environments (3.4)

| Environment | Branch | Indexable | Database |
| --- | --- | --- | --- |
| Production | `main` | yes | production Postgres |
| Staging / preview | any PR | **no** — `X-Robots-Tag: noindex` at the edge and `robots.txt` disallow-all | staging Postgres |
| Local | — | no | `docker compose up -d db` |

`NEXT_PUBLIC_ENV` drives the indexing behaviour. Anything other than `production` is
non-indexable regardless of CMS settings — staging cannot be indexed by mistake.

## 3. Environment variables (3.6)

The authoritative list with descriptions is `.env.example`. Values live in Vercel project
settings; nothing secret is committed. Summary:

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical origin. Wrong value breaks canonical, sitemap and CORS. |
| `NEXT_PUBLIC_ENV` | yes | `production` unlocks indexing. |
| `DATABASE_URL` | yes | Use the **pooled** connection string on Vercel. |
| `PAYLOAD_SECRET` | yes | 32+ random chars. Rotating logs everyone out. |
| `PREVIEW_SECRET` | yes | Guards `/api/preview`. |
| `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | prod | Bucket is `fekra_assets`. Empty bucket name = local disk, which Vercel wipes on every deploy. Region must be the real one (`eu-north-1`), never `auto`. Keys come from Supabase > Storage > S3 Access Keys. Verify with `pnpm check:storage`. |
| `S3_ENDPOINT` | prod | `https://<project-ref>.supabase.co/storage/v1/s3`. Omit only for real AWS. |
| `S3_PUBLIC_HOST` | prod | Added to `next/image` `remotePatterns`. |
| `RESEND_API_KEY`, `EMAIL_FROM` | prod | Without it, submissions still save but no email is sent. |
| `CSP_ENFORCE` | prod | `false` = report-only. Flip to `true` after verifying on staging. |

## 4. Deploy (3.7 / 25.1 / 25.3)

```bash
pnpm install
pnpm build          # fails loudly if the database is unreachable
pnpm start
```

On Vercel: push to `main` → build → promote. Every PR gets a preview deployment, which is
the staging review environment. Each release is traceable to a commit SHA in the Vercel
dashboard.

**Rollback (3.9).** Vercel → Deployments → the last known-good build → *Promote to
Production*. Instant, no rebuild. If the rollback also needs a schema revert, restore the
database snapshot first, then promote.

**Schema changes.** `push: true` auto-syncs the schema in development only. For production,
generate and commit a migration:

```bash
pnpm payload migrate:create <name>
pnpm payload migrate            # run as a release step
```

## 5. Integrations (21.9)

| Integration | Where it is configured | Notes |
| --- | --- | --- |
| Calendly | Site Settings → Integrations → `calendlyUrl` | Loads only after marketing consent; a direct link is always shown as the fallback. |
| GA4 / GTM | Site Settings → Integrations | GTM takes precedence — if a container ID is set, direct GA4 is not injected, so page views cannot double. |
| LinkedIn Insight | Site Settings → Integrations | Marketing consent only. |
| Search Console | Site Settings → SEO → verification token | Submit `https://<domain>/sitemap.xml` after go-live. |
| Resend | `RESEND_API_KEY` env | Verify the sending domain (SPF/DKIM) before launch or notifications land in spam. |
| Supabase Storage | env | One bucket, `fekra_assets`: media under `media/`, CVs under `applications/`. Keep it private — files stream through `/cms-api` and CV links are signed for 5 minutes. |

## 6. CMS workflow (4.10)

**Roles.** `admin` manages users and Site Settings; `editor` manages content.

**Publishing.** Every content collection has drafts. Save Draft → *Preview* opens the real
page with draft mode on → Publish. Publishing purges the cached page in every locale plus
the listing it appears in, so the change is live within seconds.

**Translations.** The locale switcher at the top of the edit view switches which language you
are editing. Fields are stored per locale — editing Arabic never touches German. Slugs are
shared across locales by design.

Set **Available locales** on each document to the languages that have approved translations.
That field, not the presence of text, controls hreflang and the language switcher. A locale
left out of the list is shown as unavailable rather than being served in the wrong language.

**Adding a page.** Pages → New → title, slug, then compose the layout from blocks. Fill the
SEO tab. Add it to Header/Footer navigation if it needs a menu entry.

**Adding a job.** Careers → New. Set status `open`. Closing a role disables the form,
removes its JobPosting schema and drops it from the sitemap; the page stays reachable.

**Media.** Every meaningful image needs alt text. Tick *Decorative* only for images that
carry no information — those render with an empty alt attribute.

## 7. Forms and submitted data (21.12)

| Form | Endpoint | Stored in | Notified |
| --- | --- | --- | --- |
| Contact | `POST /api/contact` | `contact-submissions` | Site Settings → `notificationEmails` |
| Job application | `POST /api/apply` | `job-applications` + `applicant-files` | Site Settings → `careersEmails` |
| Newsletter | `POST /api/newsletter` | `contact-submissions` | — |

Protection: rate limit per IP, hidden honeypot field, and a minimum fill time. All three are
invisible to real users — there is no CAPTCHA friction on a sales form.

CVs are stored in a collection the public cannot read, under the `applications/` prefix, and
served through signed URLs that expire in five minutes. Only logged-in CMS users can open
them. Duplicate applications for the same role and email are rejected by a unique index.

Retention is a business decision: nothing is auto-deleted today. Agree a retention period
with FEKRA and add a scheduled job if one is required.

## 8. Monitoring and backups (25.7 / 25.2)

- `GET /api/health` returns `200` only when the database answers. Point the uptime monitor here.
- Application errors surface in Vercel → Logs. User-facing errors show a digest ID that
  matches the log entry — no stack traces are exposed to visitors.
- Database backups are the managed provider's daily snapshots. Verify the retention window
  and take a manual snapshot immediately before any migration or cutover.
- Media/CV objects are versioned by the storage provider; enable object versioning on the bucket.

## 9. Ownership checklist (25.8)

Transfer to FEKRA before sign-off:

- [ ] Git repository — FEKRA account has **Owner**
- [ ] Vercel project — FEKRA account has **Owner**
- [ ] Domain registrar and DNS
- [ ] Database provider
- [ ] `fekra_assets` bucket created, S3 access keys issued, `pnpm check:storage` passing
- [ ] Resend (or the final email provider)
- [ ] Google Analytics 4 property and GTM container
- [ ] Google Search Console property
- [ ] Calendly account
- [ ] CMS admin account, with the seeded password changed

## 10. Routine maintenance

| Task | Cadence |
| --- | --- |
| `pnpm outdated` and patch security advisories | monthly |
| `pnpm check:links https://<domain>` | after any content migration or nav change |
| Search Console coverage and Core Web Vitals review | monthly |
| Review `contact-submissions` / `job-applications` retention | quarterly |
