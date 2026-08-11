import { createHash } from 'crypto'

import { NextResponse } from 'next/server'

import { notify } from '@/lib/notify'
import { payloadClient } from '@/lib/payload'
import { clientIp, rateLimit } from '@/lib/rate-limit'
import { MIN_FILL_SECONDS, applicationSchema, validateCv } from '@/lib/validation'

export const runtime = 'nodejs'
export const maxDuration = 30

/**
 * Job application endpoint (10.3 - 10.8 / 21.4).
 *
 * The CV is validated server-side and stored in the private applicant-files
 * collection; the public never gets a readable URL for it.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`apply:${clientIp(request)}`, 3, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited', fields: { cv: 'tooMany' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  const form = await request.formData().catch(() => null)
  if (!form) return NextResponse.json({ error: 'bad_request' }, { status: 400 })

  const raw = Object.fromEntries(form.entries())
  const parsed = applicationSchema.safeParse({ ...raw, consent: raw.consent === 'on' })
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      fields[key] = issue.message === 'phone' ? 'phone' : issue.code === 'invalid_format' ? 'email' : 'required'
    }
    return NextResponse.json({ error: 'invalid', fields }, { status: 422 })
  }

  const data = parsed.data
  const jobId = Number(data.jobId)
  const tooFast = data.startedAt ? (Date.now() - data.startedAt) / 1000 < MIN_FILL_SECONDS : false
  if (data.website || tooFast) return NextResponse.json({ ok: true })

  const file = form.get('cv')
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: 'invalid', fields: { cv: 'required' } }, { status: 422 })
  }
  const fileProblem = validateCv(file)
  if (fileProblem) {
    return NextResponse.json({ error: 'invalid', fields: { cv: fileProblem } }, { status: 422 })
  }

  const payload = await payloadClient()

  try {
    const job = await payload.findByID({ collection: 'jobs', id: jobId, depth: 0 })
    if (!job || job.roleStatus !== 'open' || job._status !== 'published') {
      return NextResponse.json({ error: 'closed', fields: { cv: 'required' } }, { status: 409 })
    }

    // 10.7 — the unique index rejects a duplicate; no read-then-write race.
    const dedupeKey = createHash('sha256').update(`${data.email.toLowerCase()}:${jobId}`).digest('hex')

    const buffer = Buffer.from(await file.arrayBuffer())
    // Never trust the client filename on disk — Payload gets a safe, derived name.
    const safeName = `${dedupeKey.slice(0, 12)}${file.name.slice(file.name.lastIndexOf('.')).toLowerCase()}`

    const uploaded = await payload.create({
      collection: 'applicant-files',
      overrideAccess: true,
      data: { originalName: file.name },
      file: { data: buffer, name: safeName, mimetype: file.type, size: file.size },
    })

    await payload.create({
      collection: 'job-applications',
      overrideAccess: true,
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        linkedin: data.linkedin || undefined,
        coverNote: data.coverNote,
        job: jobId,
        cv: uploaded.id,
        dedupeKey,
        locale: data.locale,
        sourcePath: data.sourcePath,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        referrer: data.referrer,
      },
    })

    const settings = await payload.findGlobal({ slug: 'site-settings' })
    await notify(payload, {
      to: (settings.careersEmails as string[] | undefined) ?? [],
      subject: `New application: ${job.title}`,
      rows: [
        ['Role', String(job.title)],
        ['Name', data.fullName],
        ['Email', data.email],
        ['Phone', data.phone],
        ['LinkedIn', data.linkedin],
        ['Note', data.coverNote],
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : ''
    // A duplicate is a success from the candidate's point of view (10.7).
    if (message.includes('dedupeKey') || message.includes('duplicate key')) {
      return NextResponse.json({ ok: true, duplicate: true })
    }
    payload.logger.error({ err: error }, 'application submission failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
