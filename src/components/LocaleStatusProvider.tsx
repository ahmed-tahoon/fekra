'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { Dictionary } from '@/i18n/getDictionary'

type Messages = { loading: string; error: Dictionary['error'] }
const Context = createContext<Messages | null>(null)

/** Loading and error boundaries receive the same locale as their parent page. */
export function LocaleStatusProvider({ messages, children }: { messages: Messages; children: ReactNode }) {
  return <Context.Provider value={messages}>{children}</Context.Provider>
}
export function useLocaleStatus() {
  const messages = useContext(Context)
  if (!messages) throw new Error('Locale status messages require the site layout')
  return messages
}
