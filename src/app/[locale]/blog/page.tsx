import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { Container } from '@/components/ui/container';
import { getAllPosts } from '@/lib/content/blog';
import { BlogIndex } from '@/components/blog/blog-index';
import { NewsletterCta } from '@/components/blog/newsletter-cta';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  return buildMetadata({
    locale,
    title: `${t('heroTitle')} — Fekra`,
    description: t('subtitle'),
    path: '/blog',
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = getAllPosts(locale);

  return (
    <>
      <BlogIndex posts={posts} locale={locale} />
      <section className="bg-[#f5f9fc] pb-24 dark:bg-[#0b1120]">
        <Container className="max-w-[1700px] lg:px-12">
          <NewsletterCta />
        </Container>
      </section>
    </>
  );
}
