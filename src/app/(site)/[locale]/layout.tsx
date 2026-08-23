import type { Metadata, Viewport } from 'next'
import { Alexandria, IBM_Plex_Sans_Arabic, Inter, Space_Grotesk } from 'next/font/google'
import { notFound } from 'next/navigation'

import { mediaUrl } from '@/components/blocks/types'
import { Analytics } from '@/components/analytics/Analytics'
import { ConsentBanner } from '@/components/analytics/ConsentBanner'
import { JsonLd } from '@/components/JsonLd'
import { Footer, type FooterData } from '@/components/layout/Footer'
import { Header, type HeaderData } from '@/components/layout/Header'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { ScrollReveal } from '@/components/ScrollReveal'
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

/*
 * Arabic pairing, chosen to mirror the Latin pair rather than to merely cover
 * the script: Alexandria is a geometric display face (by an Egyptian type
 * designer — fitting) that sits naturally beside Space Grotesk in headings;
 * IBM Plex Sans Arabic is the humanist body face beside Inter. Both stay
 * unpreloaded — most visitors never download an Arabic glyph.
 */
const alexandria = Alexandria({
  subsets: ['arabic'],
  weight: ['500', '700'],
  variable: '--font-alexandria',
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
    findDocs<{ title: string; slug: string; menuRoles?: { label: string }[] | null }>({
      collection: 'services',
      locale,
      limit: 24,
      depth: 0,
      sort: 'order',
      // Runs on every page — keep it to the three columns the menu shows.
      select: { title: true, slug: true, menuRoles: true, order: true },
    }),
  ])

  // Only services with roles form columns in the header's Services mega-menu.
  const servicesMenu = servicesDocs.docs
    .filter((s) => s.menuRoles?.length)
    .map((s) => ({ title: s.title, slug: s.slug, roles: (s.menuRoles ?? []).map((r) => r.label) }))

  const siteName = settings.siteName ?? 'FEKRA'
  const logoUrl = settings.logoLight?.url ? mediaUrl(settings.logoLight) : null

  return (
    // 14.5 — lang and dir are emitted per locale, not patched in on the client.
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${alexandria.variable} ${plexArabic.variable}`}
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
        {/*
          Splash. Emitted as raw HTML so React never hydrates its contents: the
          inline script deletes the splash node, and a React-managed node that
          vanishes mid-hydration gets resurrected by React's mismatch recovery
          — a splash that then never disappears. The outer div stays; only its
          (opaque to React) children are removed. The script fades the splash
          out on `load`, caps the wait at 2.5s, and skips repeat views in the
          same tab; <noscript> hides it when the script will never run.
        */}
        <div
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html:
              '<div id="fk-splash" aria-hidden="true">' +
              // width/height so the pulse has a box before the bytes land, and
              // the dark logo is lazy: display:none never triggers the loader, so
              // light-mode visitors stop paying 23 KiB for a logo they never see.
              '<img src="/images/fekra-logo.webp" alt="" width="663" height="198" fetchpriority="high" class="fk-splash-logo dark:hidden"/>' +
              '<img src="/images/fekra-logo-white.webp" alt="" width="680" height="199" loading="lazy" class="fk-splash-logo hidden dark:block"/>' +
              '</div>' +
              '<noscript><style>#fk-splash{display:none}</style></noscript>' +
              "<script>(function(){var s=document.getElementById('fk-splash');if(!s)return;" +
              "try{if(sessionStorage.getItem('fk-splash')){s.remove();return}sessionStorage.setItem('fk-splash','1')}catch(e){}" +
              'var t=Date.now(),done=false;' +
              'function hide(){if(done)return;done=true;var d=Math.max(0,700-(Date.now()-t));' +
              "setTimeout(function(){s.classList.add('is-done');setTimeout(function(){s.remove()},500)},d)}" +
              "if(document.readyState==='complete')hide();else window.addEventListener('load',hide);" +
              'setTimeout(hide,2500)})();</script>',
          }}
        />
        <SmoothScroll />
        <ScrollReveal />
        <ThemeProvider>
          <Header data={header} locale={locale} dict={dict} siteName={siteName} servicesMenu={servicesMenu} />

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
          {/* Hidden for launch. Restore: enabled={(settings.consentMode ?? 'opt-in') === 'opt-in'} */}
          <ConsentBanner dict={dict} enabled={false} />
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
