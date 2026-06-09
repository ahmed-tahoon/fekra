import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n/routing';
import { buildMetadata } from '@/lib/seo/metadata';
import { Hero } from '@/components/hero/hero';
import { WhatWeDo } from '@/components/sections/what-we-do';
import { SiteHeader } from '@/components/hero/site-header';
import { ScrollSnap } from '@/components/effects/scroll-snap';

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return buildMetadata({
    locale,
    title: `${t('siteName')} — ${t('tagline')}`,
    description: t('defaultDescription'),
    path: '',
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ScrollSnap />
      <SiteHeader />
      <Hero />
      <WhatWeDo />
    </>
  );
}
