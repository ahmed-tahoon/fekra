'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { StarField } from './star-field';
import { TrustedMarquee } from './trusted-marquee';
import { RotatingText } from './rotating-text';
import { Parallax } from '@/components/effects/parallax';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="snap-section relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#050a16] text-white">
      {/* ── Background image (parallax — drifts slower than the page) ── */}
      <Parallax speed={0.25} className="absolute inset-0 -z-30 overflow-hidden" innerClassName="relative -top-[8%] h-[116%] w-full">
        <Image
          src="/images/hero-cosmos.webp"
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-[center_bottom]"
        />
      </Parallax>

      {/* twinkle overlay (parallax — drifts at its own speed) */}
      <Parallax speed={0.12} className="absolute inset-0 -z-20 overflow-hidden" innerClassName="relative -top-[6%] h-[112%] w-full opacity-60">
        <StarField />
      </Parallax>

      {/* legibility scrims — lighter at the very top so the header feels airy */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#050a16]/45 via-transparent to-[#050a16]/35" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_40%,rgba(5,10,22,0.5),transparent_62%)]" />
      {/* cinematic grain */}
      <div className="grain pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay" aria-hidden />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 text-center sm:px-6">
        <div className="relative">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.16),transparent_70%)] blur-2xl" aria-hidden />
          <h1 className="hero-rise mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.1s' }}>
            {t('titlePre')}
            <span className="mt-2 block text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
              <RotatingText words={t.raw('rotating') as string[]} className="hero-gradient-text" />
            </span>
          </h1>
        </div>

        <p className="hero-rise mt-7 max-w-xl text-lg leading-8 text-slate-300" style={{ animationDelay: '0.24s' }}>
          {t('subtitle')}
        </p>

        <div className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: '0.36s' }}>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_10px_40px_-10px_rgba(255,255,255,0.5)] transition-shadow hover:shadow-[0_14px_50px_-8px_rgba(56,189,248,0.55)]"
          >
            {t('primaryCta')}
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
          </Link>
          {/* glassy dark "Book a meeting" pill */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(71,85,105,0.55),rgba(15,23,42,0.75))] px-8 py-3.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_14px_34px_-14px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all hover:brightness-125"
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </div>

      {/* trusted-by logo strip — aligned to the header width, lifted off the bottom */}
      <div className="hero-rise relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pb-28" style={{ animationDelay: '0.5s' }}>
        <TrustedMarquee />
      </div>
    </section>
  );
}
