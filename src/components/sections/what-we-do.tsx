'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Container } from '@/components/ui/container';
import { Link } from '@/i18n/routing';
import { Reveal } from './reveal';
import { Parallax } from '@/components/effects/parallax';
import { SectionDecor } from '@/components/decor/section-decor';

type Accent = 'orange' | 'sky';

// Fixed light palette — this section is always white (part of the landing's
// alternating dark/white rhythm), independent of the theme toggle.
const ACCENT: Record<
  Accent,
  { text: string; dot: string; bar: string; cta: string; glow: string; frame: string; pillHover: string; dotGlow: string; iconChip: string }
> = {
  orange: {
    text: 'text-orange-500',
    dot: 'bg-orange-500',
    bar: 'border-orange-500',
    cta: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:brightness-110',
    glow: 'rgba(249,115,22,0.22)',
    frame: 'from-orange-300/80 via-amber-200/40 to-white',
    pillHover: 'hover:border-orange-300 hover:shadow-[0_12px_26px_-10px_rgba(249,115,22,0.5)]',
    dotGlow: 'shadow-[0_0_10px_rgba(249,115,22,0.85)]',
    iconChip: 'bg-gradient-to-br from-orange-400 to-orange-600',
  },
  sky: {
    text: 'text-sky-500',
    dot: 'bg-sky-500',
    bar: 'border-sky-500',
    cta: 'bg-gradient-to-r from-sky-500 to-blue-600 hover:brightness-110',
    glow: 'rgba(56,189,248,0.24)',
    frame: 'from-sky-300/80 via-cyan-200/40 to-white',
    pillHover: 'hover:border-sky-300 hover:shadow-[0_12px_26px_-10px_rgba(56,189,248,0.55)]',
    dotGlow: 'shadow-[0_0_10px_rgba(56,189,248,0.95)]',
    iconChip: 'bg-gradient-to-br from-sky-400 to-blue-600',
  },
};

function Illustration({
  alt,
  src,
  badgeValue,
  badgeLabel,
  tone,
}: {
  alt: string;
  src: string;
  badgeValue: string;
  badgeLabel: string;
  tone: Accent;
}) {
  const a = ACCENT[tone];
  const glow = a.glow;
  return (
    <div className="group relative">
      <div className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 text-slate-300 opacity-70 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:12px_12px]" aria-hidden />
      <div className="pointer-events-none absolute -right-5 -top-8 h-20 w-20 rounded-full border border-dashed border-slate-300 opacity-70" aria-hidden />

      {/* soft accent glow behind the frame */}
      <div
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] blur-3xl"
        style={{ background: `radial-gradient(60% 60% at 70% 30%, ${glow}, transparent 70%)` }}
        aria-hidden
      />

      {/* gradient-bordered frame */}
      <div
        className={`relative rounded-[1.75rem] bg-gradient-to-br ${a.frame} p-[2px] shadow-[0_45px_90px_-40px_rgba(15,23,42,0.55)] transition-transform duration-500 group-hover:-translate-y-1`}
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-[1.65rem] bg-white ring-1 ring-inset ring-white/70">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          {/* inner accent vignette + top sheen */}
          <div className="pointer-events-none absolute inset-0" style={{ boxShadow: `inset 0 0 90px ${glow}` }} aria-hidden />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/25 to-transparent" aria-hidden />
        </div>
      </div>

      <div className="absolute -bottom-5 start-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-3.5 shadow-[0_18px_42px_-18px_rgba(15,23,42,0.4)] backdrop-blur">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md ${a.iconChip}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M16 11a4 4 0 1 0-4-4M3 21v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </span>
        <span>
          <span className="block text-xl font-bold leading-none text-slate-900">{badgeValue}</span>
          <span className="mt-1 block text-xs text-slate-500">{badgeLabel}</span>
        </span>
      </div>
    </div>
  );
}

function FeatureBlock({
  index,
  indexLabel,
  kicker,
  title,
  body,
  tags,
  cta,
  badgeValue,
  badgeLabel,
  imageHint,
  imageSrc,
  accent,
  reversed,
}: {
  index: string;
  indexLabel: string;
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  cta: string;
  badgeValue: string;
  badgeLabel: string;
  imageHint: string;
  imageSrc: string;
  accent: Accent;
  reversed?: boolean;
}) {
  const a = ACCENT[accent];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <Reveal variant={reversed ? 'right' : 'left'} className={reversed ? 'lg:order-2' : ''}>
        <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em]">
          <span className="text-orange-500">{index}</span>
          <span className="text-slate-400">—</span>
          <span className={a.text}>{indexLabel}</span>
          <span className="h-px w-12 bg-slate-200" />
        </div>

        <div className={`mt-6 border-s-2 ${a.bar} ps-5`}>
          <p className="text-sm font-semibold text-orange-500">{kicker}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h3>
        </div>

        <p className="mt-5 max-w-md leading-7 text-slate-500">{body}</p>

        <ul className="mt-7 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <li
              key={tag}
              className={`inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-[0_6px_18px_-8px_rgba(15,23,42,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(15,23,42,0.28)]`}
            >
              <span className={`h-2 w-2 rounded-full ${a.dot} ${a.dotGlow}`} />
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`mt-9 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${a.cta}`}
        >
          {cta}
          <span aria-hidden className="rtl:rotate-180">→</span>
        </Link>
      </Reveal>

      <Reveal variant={reversed ? 'left' : 'right'} delay={120} className={reversed ? 'lg:order-1' : ''}>
        <Illustration alt={imageHint} src={imageSrc} badgeValue={badgeValue} badgeLabel={badgeLabel} tone={accent} />
      </Reveal>
    </div>
  );
}

export function WhatWeDo() {
  const t = useTranslations('WhatWeDo');

  return (
    <section className="snap-section relative overflow-hidden bg-[#f6f8fc] py-24 text-slate-900 sm:py-32">
      <SectionDecor variant="features" />
      {/* nice light backdrop — parallax colour blobs + faint dot grid */}
      <Parallax speed={0.18} className="pointer-events-none absolute -left-40 top-0">
        <div className="h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.16),transparent_70%)] blur-2xl" aria-hidden />
      </Parallax>
      <Parallax speed={-0.14} className="pointer-events-none absolute -right-40 bottom-0">
        <div className="h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12),transparent_70%)] blur-2xl" aria-hidden />
      </Parallax>
      <div className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" aria-hidden />

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
            <span aria-hidden className="h-px w-8 bg-orange-500" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-5 text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {t('titlePre')}
            <em className="bg-gradient-to-r from-sky-500 to-cyan-400 bg-clip-text font-extrabold italic text-transparent">
              {t('titleAccent')}
            </em>
            {t('titlePost')}
          </h2>
        </Reveal>

        <div className="mt-20 space-y-28">
          <FeatureBlock
            index="01"
            indexLabel={t('talentIndex')}
            kicker={t('talentKicker')}
            title={t('talentTitle')}
            body={t('talentBody')}
            tags={t.raw('talentTags') as string[]}
            cta={t('talentCta')}
            badgeValue={t('talentBadgeValue')}
            badgeLabel={t('talentBadgeLabel')}
            imageHint={t('talentImageHint')}
            imageSrc="/images/what-we-do/talent-recruitment.png"
            accent="orange"
          />
          <FeatureBlock
            index="02"
            indexLabel={t('buildIndex')}
            kicker={t('buildKicker')}
            title={t('buildTitle')}
            body={t('buildBody')}
            tags={t.raw('buildTags') as string[]}
            cta={t('buildCta')}
            badgeValue={t('buildBadgeValue')}
            badgeLabel={t('buildBadgeLabel')}
            imageHint={t('buildImageHint')}
            imageSrc="/images/what-we-do/software-solutions.png"
            accent="sky"
            reversed
          />
        </div>
      </Container>
    </section>
  );
}
