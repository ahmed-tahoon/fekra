import { notFound, redirect } from 'next/navigation'
import { isLocale, localeHref } from '@/i18n/routing'

/** The Services nav opens the designed services landing page. */
export default async function ServicesIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()
  redirect(localeHref(locale, '/services/hire-dedicated-developers'))
}
