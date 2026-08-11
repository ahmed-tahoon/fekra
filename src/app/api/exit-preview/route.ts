import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const draft = await draftMode()
  draft.disable()
  const path = new URL(request.url).searchParams.get('path')
  return NextResponse.redirect(new URL(path?.startsWith('/') ? path : '/', request.url))
}
