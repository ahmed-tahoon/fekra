/** Update only FEKRA's published contact channels and office records. */
import { getPayload } from 'payload'

import config from '../src/payload.config'

const published = {
  Cairo: {
    city: 'Cairo',
    country: 'Egypt',
    countryCode: 'EG',
    addressLine: 'Cairo, Egypt',
    phone: '+20 110 113 3572',
    email: 'info@fekra-egy.com',
    mapUrl: 'https://maps.app.goo.gl/zzophdB6vNaMQvRJ7',
    isHeadquarters: true,
  },
  Riyadh: {
    city: 'Riyadh',
    country: 'Saudi Arabia',
    countryCode: 'SA',
    addressLine: 'Riyadh, Saudi Arabia',
    phone: '+966 56 161 6057',
    email: 'info@fekra-egy.com',
    mapUrl: 'https://maps.app.goo.gl/tpqavwfxtpXZdG4U8',
    isHeadquarters: false,
  },
} as const

const run = async () => {
  const payload = await getPayload({ config })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })
  const current = (settings.offices ?? []) as Array<
    Record<string, unknown> & { city?: string | null }
  >
  const seen = new Set<string>()
  const offices = current.map((office) => {
    const city = office.city ?? ''
    const replacement = published[city as keyof typeof published]
    if (!replacement) return office
    seen.add(city)
    return { ...office, ...replacement }
  })

  for (const [city, office] of Object.entries(published)) {
    if (!seen.has(city)) offices.push(office)
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    context: { disableRevalidate: true },
    data: {
      offices: offices as never,
      generalEmail: settings.generalEmail || 'info@fekra-egy.com',
      notificationEmails: settings.notificationEmails?.length
        ? settings.notificationEmails
        : ['info@fekra-egy.com'],
      careersEmails: settings.careersEmails?.length
        ? settings.careersEmails
        : ['careers@fekra-egy.com'],
    },
  })
  console.log(`Contact settings updated — ${offices.length} offices available.`)
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
