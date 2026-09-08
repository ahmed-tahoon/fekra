'use client'

import { ThemeProvider as NextThemes } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * LIGHT on first visit, manual choice remembered after that (15.2/15.4).
 *
 * The comps are drawn light and that is the brand's default presentation, so a
 * first-time visitor whose OS is in dark mode should still land on the design
 * that was signed off. `enableSystem={false}` is what makes that stick: left on,
 * next-themes resolves "light" against the OS preference and a dark-mode device
 * still gets the dark palette on arrival.
 *
 * The toggle is unaffected — a visitor can still choose dark, and the choice is
 * remembered across visits.
 *
 * next-themes writes the class before first paint, so there is no theme flash
 * (15.2/2.6). `disableTransitionOnChange` suppresses the colour transitions
 * mid-switch, which otherwise animate every token on the page at once.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      {children}
    </NextThemes>
  )
}
