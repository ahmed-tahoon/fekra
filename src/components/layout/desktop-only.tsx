import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';

/**
 * Full-screen gate shown on screens narrower than `lg` (≈1024px). The site is
 * desktop-only for now, so on smaller screens we cover everything with a
 * branded message. Pure CSS visibility (`lg:hidden`) — no JS / no flash.
 */
export async function DesktopOnly({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'DesktopOnly' });

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7 bg-[#050a16] px-8 text-center text-white lg:hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_20%,rgba(56,189,248,0.18),transparent_60%)]" />

      <Image
        src="/images/fekra-logo-white.webp"
        alt="Fekra"
        width={680}
        height={199}
        priority
        className="h-9 w-auto"
      />

      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06]">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2.5" y="4" width="19" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
          <path d="M9 20h6M12 17v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>

      <div className="max-w-sm space-y-3">
        <h1 className="text-2xl font-bold">{t('title')}</h1>
        <p className="text-sm leading-7 text-slate-300">{t('body')}</p>
      </div>

      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300/80">{t('note')}</p>
    </div>
  );
}
