# API test collection

End-to-end Postman tests for the FEKRA website.

## There is no public registration

`users` is admin-only (`create: isAdmin` in `src/payload/collections/Users.ts`) and the agreed
scope has no visitor accounts — nothing on the public site creates a user. The sign-up surface
that *does* exist is what this collection tests:

| Journey | Endpoint | Folder |
| --- | --- | --- |
| Newsletter signup | `POST /api/newsletter` | 1 |
| Contact enquiry | `POST /api/contact` | 2 |
| Careers application + CV upload | `POST /api/apply` | 3 |
| CMS sign-in | `POST /cms-api/users/login` | 4 |

If public accounts are ever in scope, the collection to extend is folder 4.

## Run it

```bash
pnpm dev          # app on :3000
pnpm seed         # needs at least one open job for folder 3
```

**Postman:** import both files, pick the *FEKRA — Local* environment, run the collection.
Then Settings → **turn off** “Automatically follow redirects” so the `/en/*` → `/*` 308 can be asserted.

**CLI:**

```bash
npx newman run postman/FEKRA.postman_collection.json \
  -e postman/FEKRA.local.postman_environment.json \
  --working-dir postman
```

`--working-dir` is required — it resolves the two upload fixtures.

## Two things that will bite you

**Leave ~60 seconds between runs.** The limiters are per-IP, per-minute (5/60s for contact and
newsletter, 3/60s for apply). Folder 7 deliberately exhausts the budget, so a second run started
immediately will see the functional folders fail with 429s that mean nothing.

**Origin matters.** Payload refuses cookie-authenticated writes whose `Origin` is not in
`adminOrigins` (`src/payload.config.ts`) and the failure is a bare 403 — it looks like broken auth,
not misconfiguration. Every `/cms-api` write here sends `Origin: {{origin}}`. Point `baseUrl` at a
deployed environment and set `origin` to match it exactly.

## What it asserts

- **Bot traps return success.** Honeypot and sub-2s submissions get `200` and store nothing —
  telling a bot it was caught teaches it to pass next time.
- **CV allow-list.** `rejected.exe` → `422 {cv: 'fileType'}`; `sample-cv.pdf` → stored.
- **Duplicate applications** are idempotent: same email + role returns `200 {duplicate: true}`,
  blocked by a unique index rather than a read-then-write check.
- **Drafts are private.** A draft article 404s publicly; publishing makes it live *immediately*
  (the afterChange hook purges the path — no waiting for the 15-minute timer); unpublishing 404s it again.
- **CSRF.** A write with `Origin: https://attacker.example` is refused.
- **Locale routing.** `/en/contact` → 308 `/contact`; `/ar/*` server-renders `lang="ar" dir="rtl"`.
- **Security headers** present on every response, and API errors never carry a stack trace.

## Files

```
FEKRA.postman_collection.json        40 requests across 9 folders
FEKRA.local.postman_environment.json baseUrl / origin / admin credentials
fixtures/sample-cv.pdf               valid upload
fixtures/rejected.exe                must be rejected by the allow-list
```

The environment ships the seeded dev password. Never commit real credentials — for staging or
production, set `adminPassword` as a Postman secret variable locally instead.
