import Link from 'next/link'
import { headers } from 'next/headers'

import { getDictionary } from '@/i18n/getDictionary'
import { DEFAULT_LOCALE, isLocale, localeHref } from '@/i18n/routing'
import { buttonClass } from '@/components/ui/Button'

/**
 * Localize expected missing documents using the trusted pathname from proxy.
 * Unmatched routes use the CMS-independent global-not-found document.
 */
export default async function NotFound() {
  const segment = (await headers()).get('x-fekra-pathname')?.split('/')[1]
  const locale = isLocale(segment) ? segment : DEFAULT_LOCALE
  const dict = await getDictionary(locale)

  return (
    <div className="section">
      <div className="container-site flex min-h-[50dvh] flex-col items-center justify-center text-center">
        <p className="font-display text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-4xl">{dict.notFound.title}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{dict.notFound.body}</p>
        <Link href={localeHref(locale, '/')} className={buttonClass('primary', 'lg', 'mt-8')}>
          {dict.notFound.cta}
        </Link>
      </div>
    </div>
  )
}
