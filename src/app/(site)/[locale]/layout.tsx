import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_Arabic, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Analytics } from '@/components/analytics/Analytics'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { JsonLd } from '@/components/JsonLd'
import { Footer, type FooterData } from '@/components/layout/Footer'
import { Header, type HeaderData } from '@/components/layout/Header'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getDictionary } from '@/i18n/getDictionary'
import { LOCALES, dir, isLocale } from '@/i18n/routing'
import { organizationSchema, websiteSchema } from '@/lib/jsonld'
import { getGlobal } from '@/lib/payload'
import { isComingSoon } from '@/lib/site-mode'
import { siteUrl } from '@/lib/urls'

import '../globals.css'

/**
 * 17.6 — only the weights the design actually uses. `display: swap` keeps text
 * visible during load; `preload` is on for the two Latin faces that render
 * above the fold and off for Arabic, which most visitors never download.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-arabic',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1013' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: 'FEKRA', template: '%s | FEKRA' },
}

export function generateStaticParams() {
  // Behind the holding page every one of these routes is rewritten before it
  // renders, so prerendering them only means the build needs a database it
  // will never read. Returning [] lets the holding page deploy on its own.
  if (isComingSoon()) return []
  return LOCALES.map((locale) => ({ locale }))
}

type SiteSettings = {
  siteName?: string
  legalName?: string
  tagline?: string
  logoLight?: { url?: string } | null
  logoDark?: { url?: string } | null
  socialProfiles?: { platform: string; url: string }[]
  offices?: {
    city?: string
    country?: string
    addressLine?: string
    phone?: string
    email?: string
    countryCode?: string
    isHeadquarters?: boolean
  }[]
  calendlyUrl?: string
  ga4MeasurementId?: string
  gtmContainerId?: string
  linkedinPartnerId?: string
  consentMode?: 'opt-in' | 'essential'
  searchConsoleVerification?: string
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, header, footer, settings] = await Promise.all([
    getDictionary(locale),
    getGlobal<HeaderData>('header', locale),
    getGlobal<FooterData>('footer', locale),
    getGlobal<SiteSettings>('site-settings', locale),
  ])

  const siteName = settings.siteName ?? 'FEKRA'
  const logoUrl = settings.logoLight?.url ?? null

  return (
    // 14.5 — lang and dir are emitted per locale, not patched in on the client.
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${notoArabic.variable}`}
    >
      <head>
        {settings.searchConsoleVerification ? (
          <meta name="google-site-verification" content={settings.searchConsoleVerification} />
        ) : null}
        {/*
          Google Consent Mode v2 defaults, inline in <head> so they are set before
          any tag can load (21.8). Deliberately a raw script and not next/script:
          ordering here is the whole point.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;" +
              "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <ThemeProvider>
          <Header data={header} locale={locale} dict={dict} logo={{ light: logoUrl, dark: settings.logoDark?.url }} siteName={siteName} />

          <main id="main">{children}</main>

          <Footer
            data={footer}
            locale={locale}
            dict={dict}
            siteName={siteName}
            offices={settings.offices}
            socials={settings.socialProfiles}
          />

          <ConsentBanner dict={dict} enabled={(settings.consentMode ?? 'opt-in') === 'opt-in'} />
          <Analytics
            gtmId={settings.gtmContainerId}
            ga4Id={settings.ga4MeasurementId}
            linkedinPartnerId={settings.linkedinPartnerId}
            mode={settings.consentMode ?? 'opt-in'}
          />
        </ThemeProvider>

        <JsonLd
          data={[
            organizationSchema({
              siteName,
              legalName: settings.legalName,
              tagline: settings.tagline,
              logoUrl,
              socialProfiles: settings.socialProfiles,
              offices: settings.offices,
            }),
            websiteSchema(locale),
          ]}
        />
      </body>
    </html>
  )
}
