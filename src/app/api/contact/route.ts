import { NextResponse } from 'next/server'

import { notify } from '@/lib/notify'
import { payloadClient } from '@/lib/payload'
import { clientIp, rateLimit } from '@/lib/rate-limit'
import { MIN_FILL_SECONDS, contactSchema } from '@/lib/validation'

export const runtime = 'nodejs'

/**
 * Contact form endpoint (11.1 - 11.5 / 21.2).
 *
 * Order matters: rate limit, then bot traps, then schema. A bot that trips a
 * trap gets the same 200 a human gets — telling it why it failed just teaches
 * it to pass next time.
 */
export async function POST(request: Request) {
  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 60_000)
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited', fields: { message: 'tooMany' } },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    )
  }

  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'bad_request' }, { status: 400 })

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      fields[key] = issue.message === 'phone' ? 'phone' : issue.code === 'invalid_format' ? 'email' : 'required'
    }
    return NextResponse.json({ error: 'invalid', fields }, { status: 422 })
  }

  const data = parsed.data

  // Honeypot filled, or submitted faster than a human can type: silently accept.
  const tooFast = data.startedAt ? (Date.now() - data.startedAt) / 1000 < MIN_FILL_SECONDS : false
  if (data.website || tooFast) return NextResponse.json({ ok: true })

  const payload = await payloadClient()

  try {
    await payload.create({
      collection: 'contact-submissions',
      // Public users have no Payload session; the route is the trust boundary.
      overrideAccess: true,
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        company: data.company,
        subject: data.subject,
        message: data.message,
        locale: data.locale,
        sourcePath: data.sourcePath,
        utmSource: data.utmSource,
        utmMedium: data.utmMedium,
        utmCampaign: data.utmCampaign,
        referrer: data.referrer,
      },
    })

    const settings = await payload.findGlobal({ slug: 'site-settings' })
    const to = (settings.notificationEmails as string[] | undefined) ?? []
    await notify(payload, {
      to,
      subject: `New contact: ${data.subject}`,
      rows: [
        ['Name', data.fullName],
        ['Email', data.email],
        ['Phone', data.phone],
        ['Company', data.company],
        ['Message', data.message],
        ['Page', data.sourcePath],
        ['Campaign', data.utmCampaign],
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    // 21.11 — the user gets a generic message, the detail stays in the log.
    payload.logger.error({ err: error }, 'contact submission failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
