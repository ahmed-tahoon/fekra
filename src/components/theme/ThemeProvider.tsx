'use client'

import { ThemeProvider as NextThemes } from 'next-themes'
import type { ReactNode } from 'react'

/**
 * Light only for launch: `forcedTheme` pins the class regardless of OS setting
 * or any stored choice. The dark styles stay in the codebase — restoring the
 * toggle is `defaultTheme="system" enableSystem` plus the header button back.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemes attribute="class" forcedTheme="light" disableTransitionOnChange>
      {children}
    </NextThemes>
  )
}
