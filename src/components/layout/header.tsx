'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

const NAV = [
  { href: '/services', key: 'services' },
  { href: '/fika', key: 'fika' },
  { href: '/blog', key: 'blog' },
  { href: '/careers', key: 'careers' },
  { href: '/about', key: 'about' },
] as const;

export function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The homepage hero ships its own top bar + nav, so suppress the global one there.
  if (pathname === '/') return null;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center" aria-label="Fekra — home">
          <Image
            src="/images/fekra-logo.webp"
            alt="Fekra"
            width={663}
            height={198}
            className="h-9 w-auto dark:[filter:brightness(0)_invert(1)]"
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted',
                  active && 'text-primary font-medium',
                )}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          {/* <LanguageSwitcher /> */}
          <ThemeToggle />
          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            {t('bookCall')}
          </ButtonLink>
          <button
            className="rounded-md p-2 md:hidden"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </Container>

      {open && (
        <nav className="border-t border-border md:hidden" aria-label="Mobile">
          <Container className="flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm hover:bg-muted"
              >
                {t(item.key)}
              </Link>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
