'use client'

import Script from 'next/script'

import { useConsent } from '@/lib/useConsent'

/**
 * 21.8 / 22.1 — Consent Mode v2 is defaulted to denied in the document head
 * (see the site layout) before anything here runs, so nothing tracks until the
 * visitor opts in. GTM is only injected once analytics consent exists, which
 * also keeps it off the critical path (17.7).
 */
export function Analytics({
  gtmId,
  ga4Id,
  linkedinPartnerId,
  mode,
}: {
  gtmId?: string | null
  ga4Id?: string | null
  linkedinPartnerId?: string | null
  mode: 'opt-in' | 'essential'
}) {
  const consent = useConsent()

  if (mode === 'essential') return null

  const analyticsAllowed = consent?.analytics === true
  const marketingAllowed = consent?.marketing === true

  return (
    <>
      {analyticsAllowed && gtmId ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {/* Direct GA4 only when GTM is not the container — never both, or every page view doubles (22.1). */}
      {analyticsAllowed && !gtmId && ga4Id ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`gtag('js', new Date());gtag('config','${ga4Id}',{send_page_view:true});`}
          </Script>
        </>
      ) : null}

      {marketingAllowed && linkedinPartnerId ? (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`_linkedin_partner_id="${linkedinPartnerId}";window._linkedin_data_partner_ids=window._linkedin_data_partner_ids||[];window._linkedin_data_partner_ids.push(_linkedin_partner_id);
(function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};window.lintrk.q=[]}
var s=document.getElementsByTagName("script")[0];var b=document.createElement("script");b.type="text/javascript";b.async=true;
b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";s.parentNode.insertBefore(b,s);})(window.lintrk);`}
        </Script>
      ) : null}
    </>
  )
}
