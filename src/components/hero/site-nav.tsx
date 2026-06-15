'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/layout/theme-toggle';

function Logo() {
  return (
    <Link href="/" className="flex shrink-0 items-center" aria-label="Fekra — home">
      <Image
        src="/images/fekra-logo.webp"
        alt="Fekra"
        width={663}
        height={198}
        priority
        className="h-10 w-auto sm:h-12 dark:[filter:brightness(0)_invert(1)]"
      />
    </Link>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-60 transition-transform duration-200 group-hover:rotate-180">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const linkCls =
  'rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white';

function Dropdown({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="group relative">
      <button type="button" className={cn(linkCls, 'flex items-center gap-1')}>
        {label}
        <Chevron />
      </button>
      <div className="invisible absolute start-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 rtl:translate-x-1/2">
        <ul className="menu-in min-w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1320]/95">
          {items.map((item) => (
            <li key={item}>
              <Link
                href="/services"
                className="block rounded-xl px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SiteNav({ scrolled = false }: { scrolled?: boolean }) {
  const t = useTranslations('Nav');
  const tm = useTranslations('Menu');
  const [open, setOpen] = useState(false);
  const services = tm.raw('services') as string[];

  return (
    <>
      <Logo />

      {/* Center nav (desktop) */}
      <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
        <Link href="/about" className={linkCls}>
          {t('about')}
        </Link>
        <Dropdown label={t('services')} items={services} />
        <Link href="/blog" className={linkCls}>
          {t('blog')}
        </Link>
        <Link href="/careers" className={linkCls}>
          {t('careers')}
        </Link>
        <Link href="/contact" className={linkCls}>
          {t('contactUs')}
        </Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-1.5">
        <div className="hidden items-center sm:flex">
          {/* <LanguageSwitcher /> */}
          <ThemeToggle />
        </div>
        <Link
          href="/contact"
          className={cn(
            'btn-magic relative isolate hidden items-center overflow-hidden rounded-full text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(72,155,194,0.8)] transition-transform hover:scale-[1.04] sm:inline-flex',
            scrolled ? 'px-5 py-2.5' : 'px-5 py-3',
          )}
        >
          <span aria-hidden className="btn-magic-sheen" />
          <span className="relative z-10 inline-flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
              <rect x="3.5" y="5" width="17" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M3.5 9.5h17M8 3v4m8-4v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {t('scheduleCall')}
          </span>
        </Link>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t('closeMenu') : t('openMenu')}
          aria-expanded={open}
          className="rounded-full border border-slate-200 bg-white/60 p-2.5 text-slate-700 lg:hidden dark:border-white/15 dark:bg-white/5 dark:text-white"
        >
          <span aria-hidden>{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute inset-x-2 top-full mt-2 lg:hidden">
          <div className="menu-in rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1320]/95">
            {[
              { href: '/about', label: t('about') },
              { href: '/services', label: t('services') },
              { href: '/blog', label: t('blog') },
              { href: '/careers', label: t('careers') },
              { href: '/contact', label: t('contactUs') },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-1 flex items-center justify-between px-1 py-1">
              {/* <LanguageSwitcher /> */}
              <ThemeToggle />
            </div>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-magic mt-1 flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white"
            >
              {t('scheduleCall')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
