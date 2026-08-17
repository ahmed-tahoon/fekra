'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { splitLocale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import type { ResolvedLink } from '@/lib/resolveLink'

/**
 * 5.7 — the current section is marked with aria-current, not only a colour, so
 * it is announced as well as visible.
 */
export function NavLink({ link, hasChildren }: { link: ResolvedLink; hasChildren?: boolean }) {
  const pathname = usePathname() ?? '/'
  // A home link is a locale root ("/", "/ar"): exact match only, otherwise it
  // prefix-matches every page of that locale. Other links match their subtree.
  const isHome = splitLocale(link.href).rest === '/'
  const isActive = isHome
    ? pathname === link.href
    : pathname === link.href || pathname.startsWith(`${link.href}/`)

  return (
    <Link
      href={link.href}
      aria-current={isActive ? 'page' : undefined}
      data-analytics-id={link.analyticsId}
      className={cn(
        'inline-flex h-11 items-center gap-1 rounded-pill px-4 text-sm font-medium transition-colors hover:bg-background-subtle',
        isActive && 'text-primary',
      )}
    >
      {link.label}
      {hasChildren ? <ChevronDown className="size-4" aria-hidden /> : null}
    </Link>
  )
}
