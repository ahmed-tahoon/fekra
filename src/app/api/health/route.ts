import { NextResponse } from 'next/server'

import { payloadClient } from '@/lib/payload'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** 25.7 — uptime probes hit this; it checks the DB, not just the process. */
export async function GET() {
  try {
    const payload = await payloadClient()
    await payload.count({ collection: 'pages', where: {} })
    return NextResponse.json({ status: 'ok', env: process.env.NEXT_PUBLIC_ENV ?? 'unknown' })
  } catch {
    return NextResponse.json({ status: 'degraded' }, { status: 503 })
  }
}
