#!/usr/bin/env node
/**
 * Runs pending Payload migrations before the build, but only when there is a
 * database to run them against.
 *
 * Why in the build: `push` is disabled in production, so nothing else ever
 * creates the schema. Deploying to a fresh database without this produces a
 * site where every page 500s with `relation "header" does not exist` — the
 * failure is invisible at build time and total at runtime.
 *
 * Skipping when unconfigured is what lets the holding page deploy on a project
 * that has no database yet.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

// Next reads .env.local itself, but this runs before Next does, so it has to
// load them or it would report "not configured" on a machine that plainly is.
for (const file of ['.env.local', '.env']) {
  if (!existsSync(file)) continue
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const match = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line)
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^["']|["']$/g, '')
    }
  }
}

const url = process.env.DATABASE_URL?.trim() ?? ''

if (url && !/^postgres(ql)?:\/\//.test(url)) {
  console.error(
    `\n  DATABASE_URL is not a Postgres connection string: ${url.slice(0, 40)}…\n` +
      '  It must start with postgres:// or postgresql://\n' +
      '  Supabase: Settings > Database > Connection string > Transaction pooler (port 6543).\n' +
      '  The https://<ref>.supabase.co project URL is the REST API, not the database.\n',
  )
  process.exit(1)
}

const configured = Boolean(url) && Boolean(process.env.PAYLOAD_SECRET?.trim())

if (!configured) {
  console.log('  migrate: skipped — no DATABASE_URL / PAYLOAD_SECRET (holding-page build)')
  process.exit(0)
}

console.log('  migrate: applying pending migrations…')
const result = spawnSync('payload', ['migrate'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_OPTIONS: '--no-deprecation' },
  shell: true,
})

// A failed migration must stop the deploy: shipping code against a schema it
// does not match is worse than not shipping at all.
process.exit(result.status ?? 1)
