'use client'

import Image from 'next/image'
import Link from 'next/link'
import { X } from 'lucide-react'
import { useState } from 'react'

import type { Dictionary } from '@/i18n/getDictionary'
import { type Locale, localeHref } from '@/i18n/routing'

/**
 * Figma 1:14136 — the floating "Talk to Fika" bubble. There is no chat backend,
 * so the bubble is an invitation that links to the booking page; the close
 * button collapses it to the avatar, which can re-expand it.
 */
export function TalkToFika({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(true)

  const avatar = (
    <span className="relative inline-block size-12 shrink-0">
      <Image
        src="/images/fika-avatar.png"
        alt=""
        width={48}
        height={48}
        className="size-12 rounded-full border-2 border-[#72a6b1] bg-white object-cover"
      />
      <span aria-hidden className="absolute end-0 bottom-0 size-3 rounded-full border-2 border-white bg-[#12b76a]" />
    </span>
  )

  const card =
    'fixed bottom-6 end-6 z-40 rounded-2xl bg-white p-4 shadow-[0_0_20px_rgba(0,0,0,0.08)] dark:bg-card'

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={dict.chat.open}
        className={`${card} cursor-pointer transition-transform hover:scale-105`}
      >
        {avatar}
      </button>
    )
  }

  return (
    <div className={card}>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label={dict.chat.close}
        className="absolute -end-2 -top-2 grid size-6 cursor-pointer place-items-center rounded-full bg-[#8fd0dd] text-white transition-colors hover:bg-primary"
      >
        <X className="size-3.5" aria-hidden />
      </button>
      <Link href={localeHref(locale, '/meeting')} className="flex items-center gap-[15px]">
        {avatar}
        <span className="pe-1 font-display text-lg font-bold text-navy-800 dark:text-foreground">
          {dict.chat.talk}
        </span>
      </Link>
    </div>
  )
}
