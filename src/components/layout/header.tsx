import Image from 'next/image'
import Link from 'next/link'

import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { LinkButton } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { localeHref } from '@/i18n/routing'
import { resolveLink, type PayloadLink } from '@/lib/resolveLink'

import { MobileNav } from './MobileNav'
import { NavLink } from './NavLink'

export type HeaderData = {
  items?: { link?: PayloadLink; children?: { link?: PayloadLink; description?: string }[] }[] | null
  ctas?: { variant?: 'primary' | 'secondary' | 'ghost'; link?: PayloadLink }[] | null
  announcement?: { enabled?: boolean; text?: string; link?: PayloadLink } | null
}

export function Header({
  data,
  locale,
  dict,
  logo,
  siteName,
}: {
  data: HeaderData
  locale: Locale
  dict: Dictionary
  logo?: { light?: string | null; dark?: string | null }
  siteName: string
}) {
  const items = (data.items ?? [])
    .map((item) => ({
      link: resolveLink(item.link, locale),
      children: (item.children ?? [])
        .map((c) => ({ link: resolveLink(c.link, locale), description: c.description }))
        .filter((c) => c.link),
    }))
    .filter((i) => i.link)

  const ctas = (data.ctas ?? [])
    .map((c) => ({ variant: c.variant ?? 'primary', link: resolveLink(c.link, locale) }))
    .filter((c) => c.link)

  const announcement = data.announcement?.enabled ? resolveLink(data.announcement.link, locale) : null

  return (
    <>
      {/* 23.2 — first tab stop skips the whole nav. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-100 focus:rounded-pill focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        {dict.nav.skipToContent}
      </a>

      {announcement ? (
        <div className="bg-primary text-primary-foreground">
          <div className="container-wide flex items-center justify-center gap-3 py-2 text-sm">
            <span>{data.announcement?.text}</span>
            <Link href={announcement.href} className="font-semibold underline underline-offset-4">
              {announcement.label}
            </Link>
          </div>
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container-wide flex h-20 items-center justify-between gap-6">
          <Link href={localeHref(locale, '/')} className="flex items-center gap-2" aria-label={siteName}>
            {logo?.light ? (
              <>
                {/* 15.6 — a light-mode logo on a dark surface disappears; ship both. */}
                <Image src={logo.light} alt={siteName} width={132} height={36} priority className="dark:hidden" />
                <Image
                  src={logo.dark ?? logo.light}
                  alt={siteName}
                  width={132}
                  height={36}
                  priority
                  className="hidden dark:block"
                />
              </>
            ) : (
              <span className="font-display text-2xl font-bold tracking-tight">{siteName}</span>
            )}
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {items.map((item) => (
                <li key={item.link!.href} className="group relative">
                  <NavLink link={item.link!} hasChildren={item.children.length > 0} />
                  {item.children.length ? (
                    <ul className="invisible absolute start-0 top-full z-50 min-w-64 rounded-card border border-border bg-card p-2 opacity-0 shadow-lift transition-[opacity,visibility] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                      {item.children.map((child) => (
                        <li key={child.link!.href}>
                          <Link
                            href={child.link!.href}
                            className="block rounded-lg px-3 py-2 transition-colors hover:bg-background-subtle"
                          >
                            <span className="block text-sm font-medium">{child.link!.label}</span>
                            {child.description ? (
                              <span className="block text-xs text-muted-foreground">{child.description}</span>
                            ) : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitcher
              current={locale}
              labels={{ switch: dict.language.switch, unavailable: dict.language.unavailable }}
            />
            <ThemeToggle label={dict.theme.toggle} />

            <div className="hidden lg:flex lg:items-center lg:gap-2 lg:ps-2">
              {ctas.map((cta) => (
                <LinkButton key={cta.link!.href} link={cta.link!} variant={cta.variant} size="sm" />
              ))}
            </div>

            <MobileNav items={items} ctas={ctas} dict={dict} />
          </div>
        </div>
      </header>
    </>
  )
}
