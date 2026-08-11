import { NextResponse } from 'next/server'

import { payloadClient } from '@/lib/payload'
import { documentPath, siteUrl } from '@/lib/urls'

export const revalidate = 3600

/**
 * 19.5 — optional. Serves 404 unless FEKRA explicitly enables it in Site
 * Settings, because an unmaintained llms.txt is worse than none, and it is a
 * convention, not a ranking guarantee (19.12).
 */
export async function GET() {
  const payload = await payloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1 })
  const policy = settings.crawlerPolicy as { publishLlmsTxt?: boolean } | undefined

  if (!policy?.publishLlmsTxt) return new NextResponse('Not found', { status: 404 })

  const base = siteUrl()
  const [services, posts] = await Promise.all([
    payload.find({
      collection: 'services',
      limit: 100,
      depth: 0,
      where: { _status: { equals: 'published' } },
      select: { slug: true, title: true, summary: true },
    }),
    payload.find({
      collection: 'posts',
      limit: 30,
      depth: 0,
      sort: '-publishedAt',
      where: { _status: { equals: 'published' } },
      select: { slug: true, title: true, excerpt: true },
    }),
  ])

  const body = [
    `# ${settings.siteName ?? 'FEKRA'}`,
    '',
    `> ${settings.tagline ?? 'Software engineering talent and delivery teams.'}`,
    '',
    '## Services',
    ...services.docs.map(
      (s) => `- [${s.title}](${base}${documentPath('services', s.slug as string)}): ${s.summary ?? ''}`.trim(),
    ),
    '',
    '## Recent articles',
    ...posts.docs.map((p) => `- [${p.title}](${base}${documentPath('posts', p.slug as string)})`),
    '',
    '## Contact',
    `- [Contact us](${base}/contact)`,
    `- [Book a 30-minute meeting](${base}/meeting)`,
    '',
  ].join('\n')

  return new NextResponse(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  })
}
