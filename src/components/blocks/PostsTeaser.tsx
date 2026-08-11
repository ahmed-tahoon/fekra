import { PostCard, type PostSummary } from '@/components/blog/PostCard'
import { LinkButton } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { resolveLink } from '@/lib/resolveLink'

import type { BlockProps } from './types'

export async function PostsTeaser({ block, locale }: { block: BlockProps; locale: Locale }) {
  const categorySlug = typeof block.category === 'object' ? block.category?.slug : undefined
  const { docs } = await findDocs<PostSummary>({
    collection: 'posts',
    locale,
    limit: block.limit ?? 3,
    sort: '-publishedAt',
    where: categorySlug ? { 'category.slug': { equals: categorySlug } } : {},
  })

  // 8.9 — an empty section is removed, not rendered as an empty grid.
  if (!docs.length) return null

  const ctas = (block.ctas ?? []).map((c) => ({ variant: c.variant, link: resolveLink(c.link, locale) }))

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            {block.eyebrow ? (
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{block.eyebrow}</p>
            ) : null}
            <h2 className="mt-2 text-4xl">
              {block.heading}
              {block.headingAccent ? <span className="text-primary"> {block.headingAccent}</span> : null}
            </h2>
            {block.body ? <p className="mt-3 max-w-2xl text-muted-foreground">{block.body}</p> : null}
          </div>
          {ctas.map((c) => (c.link ? <LinkButton key={c.link.href} link={c.link} variant="secondary" /> : null))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((post) => (
            <PostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
