import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Link } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schema';
import { absoluteUrl } from '@/lib/seo/config';
import { JsonLd } from '@/components/seo/json-ld';
import { Container } from '@/components/ui/container';
import { getPost, getAllSlugs, getRelatedPosts, extractHeadings } from '@/lib/content/blog';
import { Cover } from '@/components/blog/cover';
import { BlogHeroBand } from '@/components/blog/blog-hero';
import { categoryTheme } from '@/components/blog/category-style';
import { formatDate } from '@/components/blog/format';
import { ArticleBody } from '@/components/blog/article-body';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { ShareButtons } from '@/components/blog/share-buttons';
import { PostCard } from '@/components/blog/post-card';
import { NewsletterCta } from '@/components/blog/newsletter-cta';
import { ReadingProgress } from '@/components/blog/reading-progress';

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  const locales: Locale[] = ['en', 'ar'];
  return locales.flatMap((locale) => getAllSlugs(locale).map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    title: `${post.title} — Fekra`,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    ...(post.coverImage ? { ogImage: post.coverImage } : {}),
  });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(locale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const tn = await getTranslations({ locale, namespace: 'Nav' });
  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(locale, slug);
  const theme = categoryTheme(post.category);
  const url = absoluteUrl(`/${locale}/blog/${slug}`);
  const seed = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0);
  const readCount = 150 + (seed % 380); // deterministic, stable per post
  const authorAvatar = `/images/team/engineer-${(seed % 4) + 1}.webp`;

  return (
    <div className="bg-[#f5f9fc] dark:bg-[#0b1120]">
      <ReadingProgress />
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            description: post.description,
            path: `/${locale}/blog/${slug}`,
            datePublished: post.date,
            author: post.author,
            ...(post.coverImage ? { image: post.coverImage } : {}),
          }),
          breadcrumbSchema([
            { name: tn('home'), url: absoluteUrl(`/${locale}`) },
            { name: tn('blog'), url: absoluteUrl(`/${locale}/blog`) },
            { name: post.title, url },
          ]),
        ]}
      />

      {/* ── Header band (shared, brand-blue) ── */}
      <BlogHeroBand>
        <Container className="max-w-[1700px] py-10 sm:py-14 lg:px-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-[#2f7fb0]">
              {tn('home')}
            </Link>
            <span aria-hidden>/</span>
            <Link href="/blog" className="hover:text-[#2f7fb0]">
              {tn('blog')}
            </Link>
            <span aria-hidden>/</span>
            <span className="line-clamp-1 font-medium text-slate-700 dark:text-slate-200">{post.title}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <header>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${theme.tag}`}>{post.category}</span>
              <h1 className="mt-4 text-balance text-[clamp(2.1rem,4.2vw,3.4rem)] font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2.5">
                  <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white shadow-sm dark:ring-white/10">
                    <Image src={authorAvatar} alt={post.author} fill sizes="40px" className="object-cover" />
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">{post.author}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#489bc2]" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {post.readingTime} {t('minRead')}
                </span>
                <span>· {formatDate(post.date, locale)}</span>
              </div>
            </header>

            <Cover
              category={post.category}
              title={post.title}
              image={post.coverImage}
              priority
              className="aspect-[16/10] w-full rounded-[1.75rem] shadow-[0_30px_70px_-40px_rgba(15,23,42,0.5)] ring-1 ring-white/60 dark:ring-white/10"
            />
          </div>
        </Container>
      </BlogHeroBand>

      {/* ── Body: TOC · article · sidebar ── */}
      <Container className="max-w-[1700px] py-12 sm:py-16 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* TOC */}
          <aside className="order-2 hidden lg:order-1 lg:col-span-3 lg:block">
            <div className="scrollbar-slim sticky top-24 max-h-[calc(100vh-7rem)] overflow-auto rounded-2xl border border-slate-200/70 bg-white p-5 shadow-[0_12px_44px_-30px_rgba(15,23,42,0.4)] dark:border-white/10 dark:bg-white/[0.03]">
              <TableOfContents headings={headings} title={t('tableOfContents')} />
            </div>
          </aside>

          {/* article */}
          <article className="order-1 lg:order-2 lg:col-span-6">
            {/* Quick Summary callout */}
            <div className="relative mb-12 mt-3 rounded-2xl border border-[#489bc2]/25 bg-[#489bc2]/[0.06] p-7 ps-8 sm:p-8">
              <span className="absolute -top-5 start-6 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#5cb1db] to-[#2f6d8c] text-white shadow-lg">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                  <path d="M7 7h4v6c0 2.2-1.4 3.6-4 4v-2c1.2-.3 2-1 2-2H7V7Zm7 0h4v6c0 2.2-1.4 3.6-4 4v-2c1.2-.3 2-1 2-2h-2V7Z" />
                </svg>
              </span>
              <p className="text-[1.0625rem] leading-8 text-slate-700 sm:text-[1.125rem] dark:text-slate-200">
                <span className="font-bold text-slate-900 dark:text-white">{t('quickSummary')}: </span>
                {post.description}
              </p>
            </div>

            <ArticleBody content={post.content} />

            {/* tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-white/5 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* share */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-white/10">
              <ShareButtons url={url} title={post.title} label={t('share')} />
              <Link href="/blog" className="text-sm font-semibold text-[#2f7fb0] hover:underline">
                ← {t('backToBlog')}
              </Link>
            </div>

            {/* author box */}
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-6 dark:border-white/10 dark:bg-white/[0.04]">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm dark:ring-white/10">
                <Image src={authorAvatar} alt={post.author} fill sizes="56px" className="object-cover" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#2f7fb0]">{t('aboutAuthor')}</p>
                <p className="mt-0.5 text-base font-bold text-slate-900 dark:text-white">{post.author}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{t('authorBio')}</p>
              </div>
            </div>
          </article>

          {/* sidebar */}
          <aside className="order-3 lg:col-span-3">
            <div className="sticky top-24 space-y-5">
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#489bc2] to-[#2f6d8c] p-6 text-white shadow-[0_20px_50px_-28px_rgba(72,155,194,0.9)]">
                <p className="text-lg font-bold leading-snug">{t('sidebarCtaTitle')}</p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#2f6d8c] transition-transform hover:scale-[1.03]">
                  {t('sidebarCtaButton')}
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-5 py-4 text-sm text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-300">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#489bc2]" fill="none" aria-hidden>
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                {t('readBy')} <span className="font-bold text-slate-900 dark:text-white">{readCount.toLocaleString('en-US')}</span>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-slate-200/70 py-16 dark:border-white/10">
          <Container className="max-w-[1700px] lg:px-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{t('relatedTitle')}</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} locale={locale} minReadLabel={t('minRead')} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Newsletter */}
      <section className="pb-24">
        <Container className="max-w-[1700px] lg:px-12">
          <NewsletterCta />
        </Container>
      </section>
    </div>
  );
}
