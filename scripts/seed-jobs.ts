/**
 * Loads only the sample job postings (src/seed/jobs.ts).
 *
 * Separate from `pnpm seed` on purpose: the full seed rewrites Pages, Posts and
 * Services, which would discard CMS edits. This touches the jobs collection and
 * nothing else, and upserts by slug so it is safe to re-run.
 *
 *   pnpm seed:jobs
 */
import { getPayload } from 'payload'

import config from '../src/payload.config'
import { seedJobs } from '../src/seed/jobs'

const doc = (children: unknown[]) => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
})

const block = (type: string, text: string, tag?: string) => ({
  type,
  ...(tag ? { tag } : {}),
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
})

const article = (lines: ['h2' | 'h3' | 'p', string][]) =>
  doc(lines.map(([kind, text]) => (kind === 'p' ? block('paragraph', text) : block('heading', text, kind))))

const run = async () => {
  const payload = await getPayload({ config })
  await seedJobs(payload as never, article, Date.now())
  const { totalDocs } = await payload.find({ collection: 'jobs', limit: 0, depth: 0 })
  console.log(`Sample roles loaded — jobs collection now holds ${totalDocs} documents.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
