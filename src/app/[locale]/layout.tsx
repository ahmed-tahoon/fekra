import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Plus_Jakarta_Sans, Cairo } from 'next/font/google';

import { routing, localeDirection, isValidLocale, type Locale } from '@/i18n/routing';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { SplashCursor } from '@/components/hero/splash-cursor';
import { Header } from '@/components/layout/header';
import { DesktopOnly } from '@/components/layout/desktop-only';
import { Analytics } from '@/components/analytics/analytics';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';
import { siteConfig } from '@/lib/seo/config';

import '../globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-arabic', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Meta' });
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: `${t('siteName')} — ${t('tagline')}`,
      template: `%s · ${t('siteName')}`,
    },
    description: t('defaultDescription'),
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  // Enable static rendering for this locale.
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      dir={localeDirection[locale]}
      suppressHydrationWarning
      className={`${jakarta.variable} ${cairo.variable}`}
    >
      <body className="min-h-dvh flex flex-col bg-background text-foreground">
        {/* WebGL fluid-simulation cursor — site-wide overlay on every page */}
        <SplashCursor />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={[organizationSchema(), websiteSchema()]} />
            <Header />
            <main id="main" className="flex-1">
              {children}
            </main>
          </NextIntlClientProvider>
        </ThemeProvider>
        <Analytics />
        {/* Desktop-only gate — covers everything on screens < lg */}
        <DesktopOnly locale={locale} />
      </body>
    </html>
  );
}
