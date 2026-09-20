import { notFound, redirect } from 'next/navigation'

import { getDictionary } from '@/i18n/getDictionary'
import { isLocale } from '@/i18n/routing'
import { BOOKING_URL } from '@/lib/booking'
import { getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { SettingsLite } from '../page-types'

export const revalidate = 3600

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  const dict = await getDictionary(locale)
  return buildMetadata({
    title: dict.meeting.title,
    description: dict.meeting.subtitle,
    path: '/meeting',
    locale,
  })
}

export default async function MeetingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const booking = await getGlobal<SettingsLite>('site-settings', locale)
  redirect(booking.calendlyUrl || BOOKING_URL)
}
