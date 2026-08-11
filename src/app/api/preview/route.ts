import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server'

/**
 * Draft preview entry point (4.8). Requires both the shared secret and a live
 * Payload session, so a leaked link alone cannot expose unpublished content.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new NextResponse('Invalid preview token', { status: 401 })
  }
  if (!path?.startsWith('/')) {
    return new NextResponse('Invalid preview path', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(path)
}
