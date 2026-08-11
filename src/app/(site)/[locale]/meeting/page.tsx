import { notFound } from 'next/navigation'

import { CalendlyEmbed } from '@/components/booking/CalendlyEmbed'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { getDictionary } from '@/i18n/getDictionary'
import { isLocale } from '@/i18n/routing'
import { findDoc, getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

import type { PageDoc, SettingsLite } from '../page-types'

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

  const [dict, page, settings] = await Promise.all([
    getDictionary(locale),
    findDoc<PageDoc>('pages', 'meeting', locale),
    getGlobal<SettingsLite>('site-settings', locale),
  ])

  if (page?.layout?.length) {
    return (
      <RenderBlocks
        blocks={page.layout}
        locale={locale}
        dict={dict}
        context={{ offices: settings.offices, calendlyUrl: settings.calendlyUrl }}
      />
    )
  }

  return (
    <div className="section">
      <div className="container-site max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl">{dict.meeting.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{dict.meeting.subtitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{dict.meeting.timezoneNote}</p>
        {settings.calendlyUrl ? (
          <CalendlyEmbed url={settings.calendlyUrl} dict={dict} />
        ) : (
          <p className="mt-10 rounded-card border border-border bg-background-subtle p-10 text-muted-foreground">
            {/* 12.4 — no dead end: tell the operator what is missing instead of rendering nothing. */}
            Booking link not configured in Site Settings.
          </p>
        )}
      </div>
    </div>
  )
}
