import { notFound } from 'next/navigation'

import { BlogIndex } from '@/components/blog/BlogIndex'
import { NewsletterPanel } from '@/components/blog/NewsletterPanel'
import type { PostSummary } from '@/components/blog/PostCard'
import { getDictionary } from '@/i18n/getDictionary'
import { isLocale, LOCALES } from '@/i18n/routing'
import { findDocs } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const revalidate = 900

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({
    title: dict.blog.title,
    description: dict.blog.subtitle,
    path: '/blog',
    locale,
    availableLocales: [...LOCALES],
  })
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, posts, categories] = await Promise.all([
    getDictionary(locale),
    // The whole list is server-rendered; search and topic filtering then run on
    // the client without a round trip (19.2).
    findDocs<PostSummary>({ collection: 'posts', locale, limit: 200, sort: '-publishedAt' }),
    findDocs<{ title: string }>({ collection: 'categories', locale, limit: 40, depth: 0 }),
  ])

  const topics = categories.docs.map((category) => category.title).filter(Boolean)

  return (
    <>
      <BlogIndex posts={posts.docs} locale={locale} dict={dict} topics={topics} />

      <section className="bg-background-subtle pb-24">
        <div className="container-wide">
          <NewsletterPanel dict={dict} locale={locale} />
        </div>
      </section>
    </>
  )
}
