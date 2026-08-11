'use client'

import { ThemeProvider as NextThemes } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * 15.2/15.4 — first visit follows the OS setting, a manual choice is remembered
 * in localStorage. next-themes writes the class before paint, so there is no
 * theme flash (2.6).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemes>
  )
}
