import { NextResponse } from 'next/server'

import { payloadClient } from '@/lib/payload'
import { clientIp, rateLimit } from '@/lib/rate-limit'
import { newsletterSchema } from '@/lib/validation'

export const runtime = 'nodejs'

/** Footer signup. Stored as a contact submission so there is one lead inbox. */
export async function POST(request: Request) {
  const limit = rateLimit(`newsletter:${clientIp(request)}`, 5, 60_000)
  if (!limit.ok) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

  const parsed = newsletterSchema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 422 })
  if (parsed.data.website) return NextResponse.json({ ok: true })

  const payload = await payloadClient()
  try {
    await payload.create({
      collection: 'contact-submissions',
      overrideAccess: true,
      data: {
        fullName: parsed.data.email,
        email: parsed.data.email,
        subject: 'Newsletter signup',
        message: 'Subscribed from the website footer.',
        locale: parsed.data.locale,
        sourcePath: parsed.data.path,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    payload.logger.error({ err: error }, 'newsletter signup failed')
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
