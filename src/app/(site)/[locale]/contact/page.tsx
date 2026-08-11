import { notFound } from 'next/navigation'

import { ContactSection } from '@/components/blocks/ContactSection'
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
  const [dict, page] = await Promise.all([getDictionary(locale), findDoc<PageDoc>('pages', 'contact', locale)])
  return buildMetadata({
    title: page?.meta?.title ?? dict.contact.title,
    description: page?.meta?.description ?? dict.contact.subtitle,
    path: '/contact',
    locale,
    availableLocales: page?.availableLocales,
  })
}

/**
 * The contact route always renders a working form even before an editor creates
 * the CMS page — a primary conversion path must never depend on content entry.
 */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const [dict, page, settings] = await Promise.all([
    getDictionary(locale),
    findDoc<PageDoc>('pages', 'contact', locale),
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
    <ContactSection
      block={{ blockType: 'contact', showForm: true, showOffices: true }}
      locale={locale}
      dict={dict}
      offices={settings.offices as never}
      as="h1"
    />
  )
}
