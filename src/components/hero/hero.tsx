'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SlideWords } from './slide-words';
import { CountUp } from './count-up';
import { TrustedMarquee } from './trusted-marquee';

type Stat = { label: string; value: string };
type Feature = { title: string; subtitle: string };

/* ── Icons ──────────────────────────────────────────────────────────── */
const ic = 'h-[1.15rem] w-[1.15rem]';
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm13 8v-1a4 4 0 0 0-3-3.87M16 4.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M3 7a2 2 0 0 1 2-2h3.6a2 2 0 0 1 1.4.6L11.8 7H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M4 8h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Zm5 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Zm-1.5 9.5 1.3 1.3 3-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CheckShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className={ic} aria-hidden>
    <path d="M12 3 5 6v5c0 4.4 3 8.3 7 9.5 4-1.2 7-5.1 7-9.5V6l-7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m9 11.5 2 2 4-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
/* ── Config ─────────────────────────────────────────────────────────── */
const STATS = [
  { Icon: UsersIcon, badge: 'bg-[#489bc2]/12 text-[#489bc2]', label: 'text-[#3a82a6]', card: 'border-[#489bc2]/15 bg-[#489bc2]/[0.06]', bar: 'bg-[#489bc2]' },
  { Icon: FolderIcon, badge: 'bg-violet-100 text-violet-600', label: 'text-violet-600', card: 'border-violet-100 bg-violet-50/80', bar: 'bg-violet-500' },
  { Icon: StarIcon, badge: 'bg-rose-100 text-rose-500', label: 'text-rose-500', card: 'border-rose-100 bg-rose-50/80', bar: 'bg-rose-400' },
  { Icon: BriefcaseIcon, badge: 'bg-emerald-100 text-emerald-600', label: 'text-emerald-600', card: 'border-emerald-100 bg-emerald-50/80', bar: 'bg-emerald-500' },
] as const;

const FEATURE_ICONS = [ShieldIcon, BoltIcon, CheckShieldIcon] as const;

const PHOTOS = [
  { src: '/images/team/engineer-1.webp', cap: 0 },
  { src: '/images/team/engineer-4.webp', cap: 1 },
  { src: '/images/team/engineer-2.webp', cap: 2 },
  { src: '/images/team/engineer-3.webp', cap: 3 },
] as const;

const AVATARS = [
  '/images/team/engineer-1.webp',
  '/images/team/engineer-4.webp',
  '/images/team/engineer-2.webp',
  '/images/team/engineer-3.webp',
];

// Tint the "top 3%" (or Arabic "3٪") fragment in the trust line with the brand colour.
function highlightTrust(text: string) {
  return text.split(/(\d+\s?[%٪])/).map((part, i) =>
    /[%٪]/.test(part) ? (
      <span key={i} className="font-bold text-[#489bc2]">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

/* ── Sub-components ──────────────────────────────────────────────────── */
function AvatarStack() {
  return (
    <div className="flex items-center -space-x-2.5 rtl:space-x-reverse">
      {AVATARS.map((src, i) => (
        <span key={i} className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-white dark:ring-[#0b1120]">
          <Image src={src} alt="" fill sizes="32px" className="object-cover" />
        </span>
      ))}
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#489bc2] text-[11px] font-semibold text-white ring-2 ring-white dark:ring-[#0b1120]">
        +50
      </span>
    </div>
  );
}

function PhotoCell({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group relative aspect-[4/5] self-stretch overflow-hidden rounded-[1.5rem] shadow-[0_18px_45px_-22px_rgba(15,23,42,0.5)] ring-1 ring-slate-200/70 dark:ring-white/10">
      <Image src={src} alt={alt} fill sizes="(min-width:1024px) 16vw, 40vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white/90 px-3.5 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur dark:bg-[#0b1120]/85 dark:text-slate-100">
        {alt}
      </span>
    </div>
  );
}

function StatCell({ theme, data }: { theme: (typeof STATS)[number]; data: Stat }) {
  const { Icon } = theme;
  return (
    <div className={`flex aspect-[5/6] flex-col items-center justify-center gap-2 self-center rounded-[1.5rem] border p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_-24px_rgba(72,155,194,0.55)] dark:border-white/10 dark:bg-white/[0.04] ${theme.card}`}>
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${theme.badge} dark:bg-white/10 dark:text-white`}>
        <Icon />
      </span>
      <span className={`text-sm font-bold ${theme.label} dark:text-slate-200`}>{data.label}</span>
      <CountUp value={data.value} className="text-4xl font-extrabold tracking-tight tabular-nums text-slate-900 sm:text-[2.6rem] dark:text-white" />
      <span className={`mt-1 h-1 w-7 rounded-full ${theme.bar}`} />
    </div>
  );
}

/* ── Hero ───────────────────────────────────────────────────────────── */
export function Hero() {
  const t = useTranslations('Hero');
  const stats = t.raw('stats') as Stat[];
  const features = t.raw('features') as Feature[];
  const captions = t.raw('captions') as string[];

  return (
    <section className="snap-section relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#f5f9fc] text-slate-900 dark:bg-[#0b1120] dark:text-white">
      {/* airy brand background image (light theme) */}
      <Image
        src="/images/hero-bg.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none absolute inset-0 -z-20 object-cover dark:hidden"
      />
      {/* dark-theme fallback + subtle brand glow */}
      <div aria-hidden className="absolute inset-0 -z-20 hidden bg-[#0b1120] dark:block" />
      <div aria-hidden className="pointer-events-none absolute -top-28 start-1/3 -z-10 hidden h-[30rem] w-[30rem] rounded-full bg-[#489bc2]/10 blur-3xl dark:block" />

      <div className="mx-auto flex w-full max-w-[94rem] flex-1 flex-col justify-center gap-y-8 px-4 pb-12 pt-28 sm:px-6 sm:pt-28 lg:justify-center lg:gap-y-12 lg:pb-10 xl:px-12">
        {/* Global clients pill */}
        <div className="hero-rise flex justify-center" style={{ animationDelay: '0.05s' }}>
          <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white/85 py-1.5 pe-2 ps-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{t('globalClients')}</span>
            <AvatarStack />
          </div>
        </div>

        {/* Two columns */}
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Left — copy */}
          <div className="relative text-center lg:text-start">
            <h1 className="hero-rise text-[clamp(2.4rem,4.4vw,3.5rem)] font-extrabold leading-[1.08] tracking-tight" style={{ animationDelay: '0.1s' }}>
              {/* dark statement — balances into two lines */}
              <span className="block text-balance text-slate-900 dark:text-white">
                {t('titleLead')} {t('titleAccent')}
              </span>
              {/* line 3 — the animated specialty, blue with a clean underline beneath it */}
              <span className="mt-3 block">
                <span className="relative inline-block">
                  <SlideWords
                    words={t.raw('roles') as string[]}
                    className="bg-gradient-to-r from-[#489bc2] via-[#3a8ab0] to-[#2c6585] bg-clip-text pb-[0.36em] pe-1 text-transparent"
                  />
                  <svg aria-hidden className="absolute bottom-0 start-0 h-[0.28em] w-full" viewBox="0 0 200 10" preserveAspectRatio="none" fill="none">
                    <defs>
                      <linearGradient id="ulGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0" stopColor="#5cb1db" />
                        <stop offset="1" stopColor="#2c6585" />
                      </linearGradient>
                    </defs>
                    <path d="M4 6.5Q100 2 196 6.5" stroke="url(#ulGrad)" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </span>
            </h1>

            <p className="hero-rise mx-auto mt-6 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0 dark:text-slate-300" style={{ animationDelay: '0.22s' }}>
              {t('subtitle')}
            </p>

            <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start" style={{ animationDelay: '0.34s' }}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#489bc2] to-[#2f6d8c] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_40px_-12px_rgba(72,155,194,0.8)] transition-all hover:scale-[1.03] hover:brightness-110"
              >
                {t('primaryCta')}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
              </Link>
            </div>

            {/* Feature chips — single row */}
            <div className="hero-rise mt-12 flex flex-nowrap items-center justify-center gap-x-4 lg:justify-start" style={{ animationDelay: '0.46s' }}>
              {features.map((f, i) => {
                const Icon = FEATURE_ICONS[i] ?? ShieldIcon;
                return (
                  <div key={f.title} className="flex shrink-0 items-center gap-2.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#5cb1db] to-[#2f6d8c] text-white shadow-[0_10px_22px_-8px_rgba(72,155,194,0.85)] ring-1 ring-white/40">
                      <Icon />
                    </span>
                    <div className="text-start">
                      <div className="whitespace-nowrap text-[0.8rem] font-bold leading-tight text-slate-900 dark:text-slate-100">{f.title}</div>
                      <div className="whitespace-nowrap text-[0.7rem] font-medium text-slate-500 dark:text-slate-400">{f.subtitle}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* hand-drawn arrow pointing toward the collage */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -end-4 top-[60%] hidden h-16 w-28 text-slate-400/70 lg:block rtl:-scale-x-100 dark:text-slate-500"
              viewBox="0 0 110 70"
              fill="none"
            >
              <path d="M4 58C34 66 78 58 100 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100 16l-15 5M100 16l-4 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Right — 4-column photo + stat grid (photos read taller; stat cards centred) */}
          <div className="hero-rise grid grid-cols-2 items-center gap-3 sm:grid-cols-4 sm:gap-4" style={{ animationDelay: '0.4s' }}>
            <PhotoCell src={PHOTOS[0].src} alt={captions[0] ?? ''} />
            <StatCell theme={STATS[0]} data={stats[0]!} />
            <StatCell theme={STATS[1]} data={stats[1]!} />
            <PhotoCell src={PHOTOS[1].src} alt={captions[1] ?? ''} />

            <PhotoCell src={PHOTOS[2].src} alt={captions[2] ?? ''} />
            <StatCell theme={STATS[2]} data={stats[2]!} />
            <StatCell theme={STATS[3]} data={stats[3]!} />
            <PhotoCell src={PHOTOS[3].src} alt={captions[3] ?? ''} />
          </div>
        </div>

        {/* Trust bar */}
        <div className="hero-rise rounded-3xl border border-slate-200/70 bg-white/70 px-5 py-5 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.4)] backdrop-blur sm:px-7 dark:border-white/10 dark:bg-white/[0.04]" style={{ animationDelay: '0.55s' }}>
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-8">
            <div className="flex shrink-0 items-center gap-3 lg:w-72">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#489bc2]/12 text-[#489bc2] dark:bg-white/10 dark:text-white">
                <UsersIcon />
              </span>
              <p className="text-center text-sm font-semibold leading-snug text-slate-700 lg:text-start dark:text-slate-200">
                {highlightTrust(t('trustTitle'))}
              </p>
            </div>
            <div aria-hidden className="hidden h-14 w-px bg-slate-200 lg:block dark:bg-white/10" />
            {/* sliding, colored client logos */}
            <div className="min-w-0 flex-1">
              <TrustedMarquee tone="light" />
            </div>
            {/* <div aria-hidden className="hidden h-14 w-px bg-slate-200 lg:block dark:bg-white/10" /> */}
            {/* <Link href="/contact" className="group flex shrink-0 flex-col items-center gap-1.5 text-[#489bc2]">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#489bc2]/12 text-lg leading-none transition-colors group-hover:bg-[#489bc2] group-hover:text-white dark:bg-white/10 dark:text-white">···</span>
              <span className="whitespace-nowrap text-xs font-semibold">{t('andMore')}</span>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
