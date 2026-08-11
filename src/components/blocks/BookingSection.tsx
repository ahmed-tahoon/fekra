import { CalendlyEmbed } from '@/components/booking/CalendlyEmbed'
import type { Dictionary } from '@/i18n/getDictionary'

import type { BlockProps } from './types'

export function BookingSection({
  block,
  dict,
  fallbackUrl,
}: {
  block: BlockProps
  dict: Dictionary
  fallbackUrl?: string
}) {
  const url = block.calendlyUrl || fallbackUrl
  if (!url) return null

  return (
    <section id={block.anchor ?? 'booking'} className="section">
      <div className="container-site max-w-4xl">
        <div className="text-center">
          <h2 className="text-4xl">{block.heading ?? dict.meeting.title}</h2>
          <p className="mt-3 text-lg text-muted-foreground">{block.body ?? dict.meeting.subtitle}</p>
          <p className="mt-2 text-sm text-muted-foreground">{dict.meeting.timezoneNote}</p>
        </div>
        <CalendlyEmbed url={url} dict={dict} />
      </div>
    </section>
  )
}
