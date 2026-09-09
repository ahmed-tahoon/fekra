import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans_Arabic, Inter, Tajawal, Urbanist } from 'next/font/google'
import { notFound } from 'next/navigation'

import { mediaUrl } from '@/components/blocks/types'
import { Analytics } from '@/components/analytics/Analytics'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { JsonLd } from '@/components/JsonLd'
import { Footer, type FooterData } from '@/components/layout/Footer'
import { Header, type HeaderData } from '@/components/layout/Header'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { BookingDrawer } from '@/components/booking/BookingDrawer'
import { TalkToFika } from '@/components/layout/TalkToFika'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { getDictionary } from '@/i18n/getDictionary'
import { PUBLIC_LOCALES, dir, isLocale } from '@/i18n/routing'
import { organizationSchema, websiteSchema } from '@/lib/jsonld'
import { findDocs, getGlobal } from '@/lib/payload'
import { isComingSoon } from '@/lib/site-mode'
import { siteUrl } from '@/lib/urls'

import '../globals.css'

/**
 * 17.6 — only the weights the design actually uses. `display: swap` keeps text
 * visible during load; `preload` is on for the two Latin faces that render
 * above the fold and off for Arabic, which most visitors never download.
 */
const urbanist = Urbanist({
  subsets: ['latin'],
  // 600 carries the comp's SemiBold headings; 500/700 are the existing
  // medium and bold steps the rest of the site already sets.
  weight: ['500', '600', '700'],
  variable: '--font-urbanist',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

/*
 * Arabic pairing modelled on squadio.com, the reference the client pointed at.
 * Squadio sets Arabic in DIN Next(TM) Arabic — a commercial Monotype face we
 * cannot ship without a license. Tajawal is the standard free substitute: its
 * Latin is DIN-derived and the Arabic carries the same geometric, low-contrast
 * look. Their secondary face, IBM Plex Sans Arabic, is our body face already.
 * Both stay unpreloaded — most visitors never download an Arabic glyph.
 */
const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['500', '700', '800'],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false,
})

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
})

export const viewport: Viewport = {
  themeColor: '#ffffff',
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
  return PUBLIC_LOCALES.map((locale) => ({ locale }))
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

  const [dict, header, footer, settings, servicesDocs] = await Promise.all([
    getDictionary(locale),
    getGlobal<HeaderData>('header', locale),
    getGlobal<FooterData>('footer', locale),
    getGlobal<SiteSettings>('site-settings', locale),
    findDocs<{
      id: string | number
      title: string
      slug: string
      parent?: string | number | { id: string | number } | null
      menuRoles?: { label: string }[] | null
    }>({
      collection: 'services',
      locale,
      limit: 100,
      depth: 0,
      sort: 'order',
      // Runs on every page — keep it to the fields the menu and its child
      // destinations need. Role links point at their SEO pages, not the parent.
      select: { title: true, slug: true, parent: true, menuRoles: true, order: true },
    }),
  ])

  const parentId = (service: (typeof servicesDocs.docs)[number]) =>
    typeof service.parent === 'object' ? service.parent?.id : service.parent

  // Only services with roles form groups in the header's Services mega-menu.
  // A CMS role without a child document still falls back to the parent page,
  // so editors can stage a label before its landing page is published.
  const uniqueServices = Array.from(
    new Map(servicesDocs.docs.map((service) => [service.slug, service])).values(),
  )

  const servicesMenu = uniqueServices
    .filter((s) => s.menuRoles?.length)
    .map((service) => {
      const children = uniqueServices.filter((candidate) => parentId(candidate) === service.id)
      return {
        title: service.title,
        slug: service.slug,
        roles: (service.menuRoles ?? []).map((role) => {
          const child = children.find(
            (candidate) => candidate.title.toLowerCase() === role.label.toLowerCase(),
          )
          return { title: role.label, slug: child?.slug ?? service.slug }
        }),
      }
    })

  const siteName = settings.siteName ?? 'FEKRA'
  const logoUrl = settings.logoLight?.url ? mediaUrl(settings.logoLight) : null

  return (
    // 14.5 — lang and dir are emitted per locale, not patched in on the client.
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${urbanist.variable} ${inter.variable} ${tajawal.variable} ${plexArabic.variable}`}
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
              'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;' +
              "gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});",
          }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <SmoothScroll />
        <ThemeProvider>
          <Header
            data={header}
            locale={locale}
            dict={dict}
            siteName={siteName}
            servicesMenu={servicesMenu}
          />

          <main id="main">{children}</main>

          <Footer
            data={footer}
            locale={locale}
            dict={dict}
            siteName={siteName}
            offices={settings.offices}
            socials={settings.socialProfiles}
          />

          <TalkToFika locale={locale} dict={dict} />
          {/* Intercepts the meeting CTAs site-wide; /meeting stays a real page. */}
          <BookingDrawer url={settings.calendlyUrl} dict={dict} />
          {/* Hidden for launch. Restore: enabled={(settings.consentMode ?? 'opt-in') === 'opt-in'} */}
          <ConsentBanner dict={dict} locale={locale} enabled={false} />
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
