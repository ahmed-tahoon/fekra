import Link from 'next/link'

import { BrandLogo } from '@/components/layout/BrandLogo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { LinkButton } from '@/components/ui/Button'
import type { Dictionary } from '@/i18n/getDictionary'
import type { Locale } from '@/i18n/routing'
import { localeHref } from '@/i18n/routing'
import { resolveLink, type PayloadLink } from '@/lib/resolveLink'

import { HeaderShell } from './HeaderShell'
import { MobileNav } from './MobileNav'
import { NavItem } from './NavItem'
import { NavLink } from './NavLink'

export type HeaderData = {
  items?: { link?: PayloadLink; children?: { link?: PayloadLink; description?: string }[] }[] | null
  ctas?: { variant?: 'primary' | 'secondary' | 'ghost'; link?: PayloadLink }[] | null
  announcement?: { enabled?: boolean; text?: string; link?: PayloadLink } | null
}

export type ServicesMenu = { title: string; slug: string; roles: string[] }[]

export function Header({
  data,
  locale,
  dict,
  siteName,
  servicesMenu,
}: {
  data: HeaderData
  locale: Locale
  dict: Dictionary
  siteName: string
  servicesMenu?: ServicesMenu
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

      <HeaderShell>
        {/* The Figma lockup (1:14126); the CMS logo uploads are no longer used. */}
        <Link href={localeHref(locale, '/')} className="flex shrink-0 items-center gap-2" aria-label={siteName}>
          <BrandLogo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-4">
            {items.map((item) => {
              const mega = item.children.length && servicesMenu?.length ? servicesMenu : null
              return (
                <NavItem key={item.link!.href}>
                  <NavLink link={item.link!} hasChildren={item.children.length > 0} />
                  {mega ? (
                    <>
                      {/* Invisible bridge so the pointer can travel from the link
                          down to the panel without leaving the hover group. */}
                      <span aria-hidden className="invisible absolute -inset-x-10 top-full h-8 group-hover:visible" />
                      {/*
                       * The pill's backdrop-blur makes it the containing block
                       * for fixed descendants, so `fixed inset-x-0 top-full`
                       * pins this panel to the pill's own width and bottom edge
                       * — a full-width mega panel without escaping the hover
                       * group (Figma "Services" menu).
                       */}
                      <div className="invisible fixed inset-x-0 top-full z-50 pt-2 opacity-0 transition-[opacity,visibility] group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <div className="max-h-[calc(100dvh-var(--header-block)-1rem)] overflow-y-auto rounded-card border border-border bg-card p-8 shadow-lift">
                          <div className="grid grid-cols-5 gap-x-8 gap-y-10">
                            {mega.map((svc) => {
                              const wide = svc.roles.length > 9
                              const href = localeHref(locale, `/services/${svc.slug}`)
                              return (
                                <div key={svc.slug} className={wide ? 'col-span-2' : undefined}>
                                  <Link
                                    href={href}
                                    className="text-sm font-bold text-navy-800 transition-colors hover:text-primary dark:text-foreground"
                                  >
                                    {svc.title}
                                  </Link>
                                  <ul
                                    className={
                                      wide
                                        ? 'mt-3 grid grid-cols-2 gap-x-6 gap-y-2 border-s border-border ps-3'
                                        : 'mt-3 flex flex-col gap-2 border-s border-border ps-3'
                                    }
                                  >
                                    {svc.roles.map((role) => (
                                      <li key={role}>
                                        <Link
                                          href={href}
                                          className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                                        >
                                          {role}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )
                            })}
                            <div className="flex flex-col items-center justify-center gap-4 self-center rounded-card border border-brand-200 p-5 text-center dark:border-border">
                              <p className="text-sm font-medium text-navy-800 dark:text-foreground">{dict.nav.buildTeam}</p>
                              <Link
                                href={localeHref(locale, '/services/hire-dedicated-developers')}
                                className="rounded-pill bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                              >
                                {dict.nav.hireNow}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item.children.length ? (
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
                </NavItem>
              )
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <LanguageSwitcher
            current={locale}
            labels={{ switch: dict.language.switch, unavailable: dict.language.unavailable }}
          />

          <div className="hidden lg:flex lg:items-center lg:gap-2 lg:ps-1">
            {ctas.map((cta) => (
              <LinkButton
                key={cta.link!.href}
                link={cta.link!}
                variant={cta.variant}
                size="md"
                className="h-12 px-4"
              />
            ))}
          </div>

          <MobileNav items={items} ctas={ctas} dict={dict} />
        </div>
      </HeaderShell>
    </>
  )
}
