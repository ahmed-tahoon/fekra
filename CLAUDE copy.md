# CLAUDE.md — Project Rules & Engineering Guide

> This file governs how Claude (and every human) works in this repository.
> Backend: **NestJS 11 + Fastify + MongoDB (Mongoose) + Redis + BullMQ**, TypeScript strict, pnpm.
> When a rule here conflicts with a general habit, **this file wins**.

---

## 1. Golden Rules

1. **Small, focused changes.** One logical change per commit. One concern per PR.
2. **Never break the build.** Every commit must compile (`pnpm typecheck`) and pass lint (`pnpm lint`).
3. **Secure by default.** New routes are authenticated unless explicitly marked `@Public()` — and adding `@Public()` requires a comment explaining why.
4. **No secrets in the repo. Ever.** Not in code, not in tests, not in commit messages, not in fixtures. `.env` is gitignored — keep `.env.example` updated instead.
5. **UTC everywhere.** All timestamps stored and compared in UTC. Timezone is a render-time concern only. Use Luxon, never raw `Date` arithmetic.
6. **Ask before destructive actions.** Never run `git push --force`, `git reset --hard`, migration drops, or `db` wipes without explicit confirmation.
7. **Don't invent scope.** Build what the task says. If something adjacent looks broken, note it — don't silently fix it in the same commit.

---

## 2. Git Workflow

### 2.1 Branches

```
main                    ← always deployable, protected
└── feat/<scope>-<short-desc>      new functionality
└── fix/<scope>-<short-desc>       bug fix
└── chore/<short-desc>             tooling, deps, config
└── refactor/<scope>-<short-desc>  no behavior change
└── docs/<short-desc>              documentation only
└── hotfix/<short-desc>            urgent production fix (from main)
```

- Branch names: **lowercase, kebab-case**, no ticket-only names. `feat/auth-otp-lockout` ✅ · `feature/JIRA-123` ❌
- Branch from `main`, rebase on `main` before opening a PR. No merge commits into feature branches.
- Delete branches after merge.

### 2.2 Commits — Conventional Commits, enforced

Format:

```
<type>(<scope>): <subject>

[optional body — the WHY, not the what]

[optional footer — BREAKING CHANGE:, Refs:, Closes #123]
```

**Types** (only these):

| Type       | Use for                                              |
|------------|------------------------------------------------------|
| `feat`     | New user- or API-facing capability                   |
| `fix`      | Bug fix                                              |
| `refactor` | Code change with zero behavior change                |
| `perf`     | Performance improvement                              |
| `test`     | Adding or fixing tests only                          |
| `docs`     | Documentation only                                   |
| `chore`    | Deps, tooling, scripts, config                       |
| `ci`       | CI pipeline changes                                  |
| `build`    | Dockerfile, build system                             |
| `revert`   | Reverting a previous commit                          |

**Scopes** (match the folder structure): `auth`, `users`, `files`, `cache`, `queue`, `mail`, `storage`, `health`, `config`, `common`, `db`, `docker`, `deps`.

**Subject rules:**
- Imperative mood: "add", not "added" or "adds"
- ≤ 72 chars, lowercase after the colon, no trailing period
- Must be understandable without opening the diff

**Examples:**

```
feat(auth): add resend cooldown to otp request endpoint
fix(files): reject unsatisfiable range headers with 416
refactor(cache): extract single-flight lock into helper
perf(users): add compound index for role + status list query
test(auth): cover refresh-token reuse detection
chore(deps): bump mongoose to 8.9.x
ci: add semgrep sast scan to pipeline
```

**Bad examples (rejected):**

```
update code                      ← says nothing
fix bug                          ← which bug?
feat: stuff + fixed lint + wip   ← three changes in one
WIP                              ← never commit WIP to a shared branch
```

### 2.3 Commit granularity — "commit each thing"

The unit of a commit is **one reviewable idea**:

- New schema + its index → one commit
- The service using it → next commit
- Its tests → may join the service commit (preferred) or follow immediately
- Formatting/lint noise → **its own `chore` commit**, never mixed with logic
- Generated files (OpenAPI export, lockfile) → committed with the change that produced them

Rule of thumb: if the subject line needs "and", **split it**.

Sequence for a typical feature:

```
feat(db): add otp-challenge schema with ttl index
feat(auth): implement otp issue with argon2 hashing and cooldown
feat(auth): implement otp verify with attempt lockout
test(auth): e2e coverage for otp request/verify happy + abuse paths
docs(auth): document otp flow in readme
```

### 2.4 Before every commit (Claude must run these)

```bash
pnpm lint --max-warnings 0
pnpm typecheck
pnpm test          # unit; run test:e2e when touching auth/files/db
```

If any fail: fix first. Never commit with `--no-verify`.

### 2.5 Pull Requests

- Title follows the same conventional format as commits.
- Description answers: **What** changed, **Why**, **How to test**, and any **risk/rollback** note.
- PRs stay under ~400 changed lines where possible. Bigger = split it.
- A PR that touches auth, permissions, file access, or crypto gets a `security` label and needs explicit review of that surface.
- Squash-merge is fine **only if** the branch is one logical change; otherwise rebase-merge to preserve the commit story.
- CI must be fully green. No admin-merges over red pipelines.

### 2.6 Things Claude must never do in git

- Force-push to `main` or any shared branch
- Rewrite published history
- Commit `.env`, credentials, private keys, or dumps of real data
- Amend someone else's commit
- Create tags or releases without being asked

---

## 3. Code Rules (stack-specific)

### 3.1 Architecture

- **Controller → Service → Repository.** Controllers hold zero business logic; repositories hold zero business logic; services never touch `req`/`res`.
- Domain code depends on **interfaces** (`StorageDriver`, `MailSender`), never on vendor SDKs. New third-party integrations get a port + adapter, injected via a `Symbol` token.
- Cross-module calls go through the module's exported service — never import another module's repository or schema directly.
- Side effects (email, push, external APIs) **never fire inside a Mongo transaction**. Write an `OutboxMessage` in the same transaction; the relay dispatches after commit.

### 3.2 Validation & DTOs

- Every request body, query, and param has a **Zod schema + `createZodDto`**. No bare `@Body() body: any`.
- Unknown keys are stripped globally — don't rely on it to hide sensitive input handling.
- IDs from clients are validated as UUIDs at the schema level, not inside services.

### 3.3 Mongoose

- Every new schema declares its **indexes in code**, including a compound index for each list endpoint's filter+sort pair.
- Reads that don't mutate use `.lean()` + explicit projections. Never fetch full documents for list views.
- Soft delete only (`deletedAt`); hard deletes require a written justification in the PR.
- Multi-document writes that must be atomic use the transaction helper (`withTransaction`) — remember local dev Mongo runs as a replica set for this reason.
- Migrations/backfills are scripts under `scripts/`, idempotent, and reviewed like code.

### 3.4 Security checklist for any new endpoint

- [ ] Authenticated by default; `@Public()` only with a justifying comment
- [ ] `@RequirePermissions('resource:action')` present (guards check **permissions, never role names**)
- [ ] Zod DTO on every input
- [ ] No user-controlled value reaches a query without validation
- [ ] Errors return the standard envelope — no stack traces, no Mongo error text
- [ ] Anything secret added to the **pino redaction list**
- [ ] Rate limit considered (OTP/auth/expensive routes get tighter limits)
- [ ] Mutating endpoints that clients may retry honor `Idempotency-Key`
- [ ] Audit event emitted for privileged/admin actions

### 3.5 Files & media

- Bytes never pass through the API — signed-URL direct upload only.
- Nothing is served unless `FileObject.status === 'READY'`.
- Trust magic bytes, never the client's `Content-Type`.
- Every file read is access-checked; an unguessable key is not authorization.

### 3.6 Errors & logging

- Throw `AppError` with a typed code; clients switch on `code`, never on message text.
- Log with structured fields (`this.logger.warn({ userId, reason }, 'msg')`), never string concatenation.
- Never log: OTP codes, tokens, hashes, passwords, full request bodies of auth routes.

---

## 4. Testing Rules

- New logic in `common/`, `infra/`, or `modules/auth` ships with tests **in the same PR**. Coverage floor: 80% on those paths.
- Unit tests mock at the **port boundary** (interfaces), not deep internals.
- E2E uses Testcontainers (real Mongo replica set + Redis) — never a mocked database for e2e.
- Every bug fix adds a regression test that fails without the fix.
- Test names describe behavior: `it('revokes the whole family when a rotated token is replayed')` — not `it('works')`.
- No `.only`/`.skip` committed. No sleeps for synchronization; await the actual condition.

---

## 5. Dependencies

- Adding a dependency requires: actively maintained, permissive license, no lighter stdlib/Nest-native alternative. State the reason in the commit body.
- Pin via lockfile; lockfile changes are committed with the change that caused them.
- `pnpm audit` findings of high+ severity block merge — fix or document the exception.
- Do not add: `moment` (use Luxon), `express`-specific middleware (we're on Fastify), `class-validator` (we use Zod), any ORM beside Mongoose.

---

## 6. Documentation Duties

Update in the **same PR** when applicable:

- `.env.example` — every new env var, with a comment
- `README.md` — new flows, commands, or setup steps
- `docs/adr/` — a short ADR (context → decision → consequences) for any architectural choice: new infra, new pattern, replaced library
- OpenAPI — regenerate the exported spec when routes change (`pnpm openapi:export`); CI diffs it

---

## 7. How Claude Should Work in This Repo

1. **Read before writing.** Check existing patterns in the target module and mirror them; consistency beats personal preference.
2. **Plan multi-file changes first.** List the files you'll touch and the commit sequence before editing.
3. **Verify each stage.** After each logical unit: typecheck → lint → test → commit. Don't batch five features and commit once.
4. **Surface ambiguity.** If a requirement could go two ways, pick the more secure/simpler option, and flag the decision explicitly in the PR description.
5. **Leave the campsite clean.** If you touch a file, fix its lint issues — in a separate `chore` commit if the diff would be noisy.
6. **Never bypass the guardrails.** No `--no-verify`, no `@ts-ignore` (use `@ts-expect-error` with a reason if truly unavoidable), no `any` without a justifying comment, no disabling ESLint rules inline without a reason.

---

## 8. Quick Reference

```bash
# daily loop
pnpm start:dev            # api with hot reload
docker compose up -d      # mongo (replica set) + redis + mailpit

# quality gates (run before every commit)
pnpm lint --max-warnings 0
pnpm typecheck
pnpm test
pnpm test:e2e             # when touching auth / files / db

# database
pnpm db:seed              # roles, permissions, admin user

# api contract
pnpm openapi:export       # regenerate spec for CI diff / mobile codegen
```

**Commit message template** (set with `git config commit.template .gitmessage`):

```
# <type>(<scope>): <subject>  — imperative, ≤72 chars, no period
#
# Why is this change needed?
#
# Refs: #issue
```