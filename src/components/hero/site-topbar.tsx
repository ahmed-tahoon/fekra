'use client';

import { useTranslations } from 'next-intl';

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.7-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.4.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.7-.8c.2-.2.3-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chip({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-slate-300 transition-all hover:-translate-y-px hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
    >
      {children}
    </a>
  );
}

export function SiteTopbar() {
  const t = useTranslations('TopBar');

  return (
    <div className="relative z-50 border-b border-white/10 bg-white/[0.04] backdrop-blur-md">
      {/* accent hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-3 px-4 text-[12px] sm:px-6">
        {/* Contact methods */}
        <div className="flex items-center gap-2">
          <Chip href={`tel:${t('egypt').replace(/\s/g, '')}`}>
            <span aria-hidden className="text-[13px] leading-none">🇪🇬</span>
            <span className="hidden text-slate-400 transition-colors group-hover:text-white sm:inline">{t('egypt')}</span>
          </Chip>
          <Chip href={`tel:${t('ksa').replace(/\s/g, '')}`}>
            <span aria-hidden className="text-[13px] leading-none">🇸🇦</span>
            <span className="hidden text-slate-400 transition-colors group-hover:text-white sm:inline">{t('ksa')}</span>
          </Chip>
          <a
            href="https://wa.me/201101133572"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-1 text-emerald-300 transition-all hover:-translate-y-px hover:bg-emerald-500/20 hover:text-emerald-200"
          >
            <WhatsAppIcon />
            <span className="hidden sm:inline">{t('whatsapp')}</span>
          </a>
        </div>

        {/* Email + CTA */}
        <div className="flex items-center gap-3">
          <a
            href={`mailto:${t('email')}`}
            className="hidden items-center gap-1.5 text-slate-300 transition-colors hover:text-white sm:flex"
          >
            <MailIcon />
            {t('email')}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/40 bg-orange-500/10 px-3 py-1 font-medium text-orange-300 transition-all hover:-translate-y-px hover:bg-orange-500 hover:text-white"
          >
            <PhoneIcon />
            {t('getInTouch')}
          </a>
        </div>
      </div>
    </div>
  );
}
