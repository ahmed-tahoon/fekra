'use client'

import { ThemeProvider as NextThemes } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * System theme on first visit, manual choice remembered after that (15.2/15.4).
 *
 * next-themes writes the class before first paint, so there is no theme flash
 * (15.2/2.6). `disableTransitionOnChange` suppresses the colour transitions
 * mid-switch, which otherwise animate every token on the page at once.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  )
}
