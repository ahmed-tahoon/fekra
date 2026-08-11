import Link from 'next/link'

import { getDictionary } from '@/i18n/getDictionary'
import { DEFAULT_LOCALE, localeHref } from '@/i18n/routing'
import { buttonClass } from '@/components/ui/Button'

/**
 * 18.12 — this renders with a real 404 status. The locale is not available to
 * not-found.tsx, so the default locale's copy is used; the surrounding layout
 * still carries the correct lang/dir for the requested URL.
 */
export default async function NotFound() {
  const dict = await getDictionary(DEFAULT_LOCALE)

  return (
    <div className="section">
      <div className="container-site flex min-h-[50dvh] flex-col items-center justify-center text-center">
        <p className="font-display text-6xl font-bold text-primary">404</p>
        <h1 className="mt-4 text-4xl">{dict.notFound.title}</h1>
        <p className="mt-3 max-w-md text-muted-foreground">{dict.notFound.body}</p>
        <Link href={localeHref(DEFAULT_LOCALE, '/')} className={buttonClass('primary', 'lg', 'mt-8')}>
          {dict.notFound.cta}
        </Link>
      </div>
    </div>
  )
}
