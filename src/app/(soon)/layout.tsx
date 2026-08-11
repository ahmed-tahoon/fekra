import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import '../(site)/globals.css'

/**
 * Standalone shell for the holding page. Deliberately not the site layout: no
 * header, no footer, no navigation to pages that are not ready yet.
 */
const display = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-space-grotesk' })
const sans = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-inter' })

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1013' },
  ],
}

export const metadata: Metadata = {
  title: 'FEKRA — Coming soon',
  description: 'Loyalty · Innovation · Expansion. Our new site is on its way.',
  // The holding page must never be indexed as the homepage (18.13).
  robots: { index: false, follow: false },
}

export default function SoonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  )
}
