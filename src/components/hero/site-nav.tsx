'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="Fekra — home">
      {/* White-text logo with transparent bg — reads cleanly on the dark hero. */}
      <Image
        src="/images/fekra-logo-white.webp"
        alt="Fekra"
        width={680}
        height={199}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden className="opacity-70">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dropdown({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
      >
        {label}
        <Chevron />
      </button>
      <div className="invisible absolute start-0 top-full z-50 pt-2 opacity-0 transition-all group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <ul className="menu-in min-w-52 rounded-2xl border border-white/10 bg-[#0b1320]/95 p-2 shadow-2xl backdrop-blur-xl">
          {items.map((item) => (
            <li key={item}>
              <Link
                href="/services"
                className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
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
  const industries = tm.raw('industries') as string[];

  return (
    <nav className="relative z-40">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-all duration-300 sm:px-6 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <Logo />

        {/* Center pill nav (desktop) */}
        <div className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1.5 backdrop-blur-xl lg:flex">
          <Link href="/" className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white">
            {t('home')}
          </Link>
          <Dropdown label={t('services')} items={services} />
          <Dropdown label={t('industries')} items={industries} />
          <Link href="/blog" className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white">
            {t('blog')}
          </Link>
          <Link href="/careers" className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white">
            {t('careers')}
          </Link>
          <Link href="/contact" className="rounded-full px-4 py-2 text-sm text-slate-200 transition-colors hover:bg-white/10 hover:text-white">
            {t('contactUs')}
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_rgba(249,115,22,0.6)] transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {t('bookCall30')}
            <span aria-hidden>→</span>
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('closeMenu') : t('openMenu')}
            aria-expanded={open}
            className="rounded-full border border-white/15 bg-white/5 p-2.5 text-white lg:hidden"
          >
            <span aria-hidden>{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="menu-in mx-4 rounded-2xl border border-white/10 bg-[#0b1320]/95 p-3 backdrop-blur-xl">
            {[
              { href: '/', label: t('home') },
              { href: '/services', label: t('services') },
              { href: '/blog', label: t('blog') },
              { href: '/careers', label: t('careers') },
              { href: '/contact', label: t('contactUs') },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm text-slate-200 hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-3 text-sm font-semibold text-white"
            >
              {t('bookCall30')} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
