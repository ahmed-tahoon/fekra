import { headers } from 'next/headers'
import { getDictionary } from '@/i18n/getDictionary'
import { DEFAULT_LOCALE, dir, isLocale, localeHref } from '@/i18n/routing'

export const metadata = { title: '404 | FEKRA', robots: { index: false, follow: false } }

/** Deliberately independent of Payload, site globals, fonts and analytics. */
export default async function GlobalNotFound() {
  const segment = (await headers()).get('x-fekra-pathname')?.split('/')[1]
  const locale = isLocale(segment) ? segment : DEFAULT_LOCALE
  const dict = await getDictionary(locale)
  return (
    <html lang={locale} dir={dir(locale)}>
      <body style={{ margin: 0, background: '#f2fafb', color: '#153c48', fontFamily: 'Arial, sans-serif' }}>
        <main style={{ minHeight: '100dvh', display: 'grid', placeContent: 'center', padding: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '64px', margin: 0, fontWeight: 700 }}>404</p>
          <h1>{dict.notFound.title}</h1>
          <p>{dict.notFound.body}</p>
          <a href={localeHref(locale, '/')} style={{ padding: '16px', color: '#075e70', fontWeight: 700 }}>{dict.notFound.cta}</a>
        </main>
      </body>
    </html>
  )
}
