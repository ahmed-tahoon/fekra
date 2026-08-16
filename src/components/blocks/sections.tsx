import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { LinkButton } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { faqSchema } from '@/lib/jsonld'
import { resolveLink } from '@/lib/resolveLink'

import { ProcessStepper } from './ProcessStepper'
import { RotatingWords } from './RotatingWords'
import { TechTabs } from './TechTabs'
import type { BlockProps, MediaDoc } from './types'
import { mediaAlt, mediaUrl } from './types'

/* Measured from the comp: the two greens carry navy text, the darker two white. */
const STAT_TONE = {
  green: 'bg-tile-green text-navy-800',
  emerald: 'bg-tile-emerald text-navy-800',
  indigo: 'bg-tile-indigo text-white',
  teal: 'bg-tile-teal text-white',
} as const

const TILE_CORNER = {
  tl: 'rounded-tl-tile',
  tr: 'rounded-tr-tile',
  bl: 'rounded-bl-tile',
  br: 'rounded-br-tile',
} as const

/*
 * The collage from the Figma frame, as percentages of its 1408x456 box.
 * Absolute px would not survive a resize, so each tile keeps its exact
 * proportions and the whole board scales with an aspect ratio. Tiles beyond
 * this preset fall back to a plain grid, so adding one in the CMS never
 * breaks the layout.
 */
const MOSAIC_LAYOUT = [
  { left: 0, top: 0, width: 12.358, height: 59.211 },
  { left: 13.352, top: 13.158, width: 11.222, height: 46.053 },
  { left: 25.568, top: 23.904, width: 11.648, height: 30.921 },
  { left: 25.568, top: 58.333, width: 11.648, height: 41.667 },
  { left: 38.21, top: 25, width: 12.997, height: 75 },
  { left: 52.202, top: 35.307, width: 11.506, height: 40.351 },
  { left: 52.202, top: 79.167, width: 11.506, height: 20.833 },
  { left: 64.702, top: 23.684, width: 11.861, height: 31.14 },
  { left: 64.702, top: 58.333, width: 22.94, height: 41.667 },
  { left: 77.557, top: 14.254, width: 10.085, height: 40.57 },
  { left: 88.636, top: 2.412, width: 11.364, height: 59.211 },
  { left: 88.636, top: 65.132, width: 11.364, height: 34.868 },
  { left: 0, top: 62.719, width: 24.574, height: 37.281 },
] as const

/** Shared section heading. One H2 per section keeps the outline honest (18.4). */
function SectionHeading({
  eyebrow,
  heading,
  headingAccent,
  body,
  center = true,
  as: As = 'h2',
}: {
  eyebrow?: string | null
  heading?: string | null
  headingAccent?: string | null
  body?: string | null
  center?: boolean
  as?: 'h1' | 'h2'
}) {
  if (!heading && !eyebrow && !body) return null
  return (
    <div className={cn('flex flex-col gap-4', center && 'mx-auto max-w-3xl text-center')}>
      {eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      ) : null}
      {heading ? (
        <As className="text-4xl md:text-5xl">
          {heading}
          {headingAccent ? <span className="text-primary"> {headingAccent}</span> : null}
        </As>
      ) : null}
      {body ? <p className="text-lg text-muted-foreground">{body}</p> : null}
    </div>
  )
}

function Ctas({
  ctas,
  locale,
  size = 'lg',
  className,
  withArrow = true,
}: {
  ctas?: BlockProps['ctas']
  locale: Locale
  size?: 'md' | 'lg'
  /** Extra classes per button — the comps size or recolour a few CTAs. */
  className?: string
  withArrow?: boolean
}) {
  const resolved = (ctas ?? []).map((c) => ({ variant: c.variant, link: resolveLink(c.link, locale) }))
  if (!resolved.some((c) => c.link)) return null
  return (
    <div className="flex flex-wrap gap-3">
      {resolved.map((c) =>
        c.link ? (
          <LinkButton
            key={c.link.href}
            link={c.link}
            variant={c.variant ?? 'primary'}
            size={size}
            withArrow={withArrow}
            className={className}
          />
        ) : null,
      )}
    </div>
  )
}

export function HeroSection({ block, locale, isFirst }: { block: BlockProps; locale: Locale; isFirst: boolean }) {
  const words = (block.rotatingWords ?? []).map((w) => w.text).filter(Boolean)
  const mosaic = block.mosaic ?? []
  const Title = isFirst ? 'h1' : 'h2'

  const tile = (item: (typeof mosaic)[number], index: number) => {
    const image = item.image as MediaDoc | undefined
    const corner = TILE_CORNER[item.corner ?? 'tl']

    if (item.kind === 'stat') {
      return (
        <div className={cn('flex size-full flex-col justify-end p-5', corner, STAT_TONE[item.tone ?? 'green'])}>
          <span className="font-display text-lg leading-tight tracking-[-0.04em] md:text-2xl">{item.label}</span>
          <span
            dir="ltr"
            className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] md:text-[40px] md:leading-8"
          >
            {item.value}
          </span>
        </div>
      )
    }

    return (
      <div className={cn('relative size-full overflow-hidden bg-tile-mist', corner)}>
        {image?.url ? (
          <Image
            src={mediaUrl(image)}
            alt={mediaAlt(image)}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            priority={isFirst && index < 4}
            className="object-cover"
          />
        ) : null}
      </div>
    )
  }

  return (
    <section
      id={block.anchor ?? undefined}
      className="relative isolate mt-[calc(var(--header-block)*-1)] flex flex-col overflow-hidden pt-[calc(var(--header-block)+clamp(1.5rem,5vh,3rem))] pb-7 md:h-dvh dark:bg-background"
    >
      {/*
        The tint is its own layer, stopping where the collage stops, so the
        section can hold padding under the tiles without the gradient bleeding
        into it. On the section itself those two are the same edge — you get a
        coloured strip below the images or no clearance at all, not both.
        `isolate` on the section keeps this -z-10 above the page background.
      */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 bottom-7 -z-10 bg-[linear-gradient(117.67deg,rgba(238,252,243,0.4)_3.72%,rgba(220,239,247,0.4)_103.6%)] dark:hidden"
      />
      <div className="relative z-10 container-wide shrink-0">
        <div className="mx-auto flex max-w-[844px] flex-col items-center gap-[clamp(0.5rem,1.8vh,1.25rem)] text-center">
          {block.trustLine ? (
            <p
              style={{ '--i': 0 } as React.CSSProperties}
              className="fk-enter inline-flex items-center gap-2 rounded-pill border border-[rgba(25,36,36,0.08)] bg-white px-3.5 py-1.5 text-sm font-medium tracking-[0.35px] text-ink-500 dark:border-border dark:bg-card"
            >
              <span aria-hidden className="size-2 shrink-0 rounded-pill bg-primary" />
              {block.trustLine}
            </p>
          ) : null}

          <Title
            style={{ '--i': 1 } as React.CSSProperties}
            // Sized off height as well as width. The hero is locked to one
            // screen, so on a short window the headline has to give ground or
            // it eats the collage's share of it.
            className="fk-enter font-display text-[clamp(2rem,min(5.2vw,7.4vh),3.75rem)] leading-[1.05] font-bold tracking-[-1.5px] text-navy-800 dark:text-foreground"
          >
            {block.heading}
            <br />
            {/* Second line is a gradient fill in the comp, teal -> blue.
                The gradient must live ON the animated word (inside
                RotatingWords), not on a wrapper: Chrome leaves paint slivers
                when a `background-clip: text` element has animating children. */}
            {words.length ? (
              <RotatingWords words={words} />
            ) : (
              <span className="bg-[linear-gradient(137.53deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
                {block.headingAccent}
              </span>
            )}
          </Title>

          {block.body ? (
            <p
              style={{ '--i': 2 } as React.CSSProperties}
              className="fk-enter text-lg/7 text-ink-500 dark:text-muted-foreground"
            >
              {block.body}
            </p>
          ) : null}

          {block.bullets?.length ? (
            <ul
              style={{ '--i': 3 } as React.CSSProperties}
              className="fk-enter flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              {block.bullets.map((bullet) => {
                const icon = bullet.icon as MediaDoc | undefined
                return (
                  <li
                    key={bullet.text}
                    className="flex items-center gap-1 text-sm text-ink-500 dark:text-muted-foreground"
                  >
                    {icon?.url ? (
                      <Image
                        src={mediaUrl(icon)}
                        alt=""
                        width={17}
                        height={16}
                        aria-hidden
                        className="h-4 w-[17px] shrink-0"
                      />
                    ) : (
                      <span aria-hidden className="size-1.5 shrink-0 rounded-pill bg-primary" />
                    )}
                    {bullet.text}
                  </li>
                )
              })}
            </ul>
          ) : null}

          <div
            style={{ '--i': 4 } as React.CSSProperties}
            className="fk-enter mt-2 flex flex-wrap justify-center gap-4"
          >
            <Ctas ctas={block.ctas} locale={locale} />
          </div>
        </div>
      </div>

      {mosaic.length ? (
        <>
          {/* Desktop: the collage, positioned exactly as designed. Full-bleed —
              it runs past the container to the viewport edges. */}
          <div className="relative -mt-[clamp(2.5rem,6vh,4.5rem)] hidden min-h-0 w-full flex-1 md:block">
            {mosaic.map((item, index) => {
              const pos = MOSAIC_LAYOUT[index]
              if (!pos) return null
              return (
                <div
                  key={index}
                  className="fk-tile-enter absolute"
                  style={
                    {
                      left: `${pos.left}%`,
                      top: `${pos.top}%`,
                      width: `${pos.width}%`,
                      height: `${pos.height}%`,
                      '--i': index,
                    } as React.CSSProperties
                  }
                >
                  {/* Inner element carries the scroll drift so it cannot fight
                      the entrance transform on the same node. Columns further
                      right drift a touch more, which is what reads as depth. */}
                  <div
                    className="fk-drift size-full"
                    style={{ '--drift': 0.5 + (index % 4) * 0.35 } as React.CSSProperties}
                  >
                    {tile(item, index)}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Mobile: the collage would be unreadable at 390px, so the same
              tiles become a simple two-column board. */}
          <ul className="mt-10 grid auto-rows-[120px] grid-cols-2 gap-3 px-4 md:hidden">
            {mosaic.map((item, index) => (
              <li key={index} className={cn(item.span === 'tall' && 'row-span-2', item.span === 'wide' && 'col-span-2')}>
                {tile(item, index)}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {block.stats?.length ? (
        <div className="container-wide">
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {block.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                <dd dir="ltr" className="font-display text-3xl font-bold text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  )
}

export function LogoCloudSection({ block }: { block: BlockProps }) {
  /* Figma 1:11600 — the same logo array, presented as a centred badge row
     under a gradient heading instead of beside a statement. */
  if (block.variant === 'badges') {
    const badges = block.logos ?? []
    if (!badges.length) return null
    return (
      <section
        id={block.anchor ?? undefined}
        className="section bg-[linear-gradient(180deg,#eafafb_0%,#ffffff_100%)] dark:bg-none dark:bg-background"
      >
        <div className="container-site flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {block.eyebrow ? (
              <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
                {block.eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
              <span className="bg-[linear-gradient(139.28deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
                {block.heading}
              </span>
            </h2>
          </div>

          <ul className="flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:justify-between">
            {badges.map((badge) => {
              const image = badge.image as MediaDoc | undefined
              if (!image?.url) return null
              return (
                <li key={badge.name} className="flex items-center justify-center">
                  {/* Heights are equalised, widths left to each badge: the row
                      mixes a wide lockup with four round seals. */}
                  <Image
                    src={mediaUrl(image)}
                    alt={badge.name}
                    width={296}
                    height={125}
                    className="h-[92px] w-auto object-contain sm:h-[125px]"
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    )
  }

  const logos = block.logos ?? []
  const statement = block.statement
  const hasStatement = Boolean(statement?.before || statement?.highlight || statement?.after)
  // The statement is content in its own right — it should not disappear just
  // because the client logos have not been uploaded yet (8.9).
  if (!logos.length && !hasStatement) return null

  return (
    /* Figma 1:10296 — 120px gutters, 80px block padding, statement and logo
       board pushed to opposite edges. container-site is the 1440 frame's
       content width; container-wide would stretch the board out of proportion. */
    <section id={block.anchor ?? undefined} className="py-16 md:py-20">
      <div className="container-site flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-16">
        {hasStatement ? (
          /* 458px / 32px / 48px line-height, Space Grotesk Medium in the comp —
             not bold, which is what made it read heavier than the design. */
          <p className="max-w-[458px] font-display text-2xl leading-[1.5] font-medium text-navy-800 lg:text-[32px] dark:text-foreground">
            {statement?.before}{' '}
            {statement?.highlight ? <span className="text-primary">{statement.highlight}</span> : null}{' '}
            {statement?.after}
          </p>
        ) : block.heading ? (
          <p className="text-sm text-muted-foreground">{block.heading}</p>
        ) : (
          <span />
        )}

        {logos.length ? (
          /* A 600px flex-wrap board of 96px-tall cells, 24px apart across and
             16px down — the comp's own structure. Four fit per row and the
             remainder stays left-aligned, which is what produces the 4/4/2. */
          <ul className="flex max-w-[600px] flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
            {logos.map((logo) => {
              const image = logo.image as MediaDoc | undefined
              if (!image?.url) return null
              return (
                /* Fixed cell, mark contained inside. The marks run from 3:2 to
                   2:3, so a shared max-height would shrink the tall ones to
                   nothing; a fixed cell keeps them optically even. */
                <li key={logo.name} className="relative h-24 w-[104px] shrink-0 sm:w-[120px]">
                  <Image
                    src={mediaUrl(image)}
                    alt={logo.name}
                    fill
                    sizes="120px"
                    className="object-contain opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert dark:hover:brightness-100 dark:hover:invert-0"
                  />
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export function CardGridSection({ block, locale }: { block: BlockProps; locale: Locale }) {
  const columns = block.columns ?? '3'
  const cards = block.cards ?? []

  /*
   * Figma 1:10748 — two cards over three. A six-column grid gets that from the
   * card count alone: the first two span three columns, the rest span two. No
   * per-row markup, and a sixth card simply joins the second row.
   */
  if (block.variant === 'business') {
    return (
      <section id={block.anchor ?? undefined} className="section">
        <div className="container-site flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            {block.eyebrow ? (
              <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
                {block.eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
              <span className="bg-[linear-gradient(147.07deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
                {block.heading}
                {block.headingAccent ? ` ${block.headingAccent}` : null}
              </span>
            </h2>
            {block.body ? (
              <p className="max-w-3xl text-lg/[1.3] text-ink-500 dark:text-muted-foreground">{block.body}</p>
            ) : null}
          </div>

          <ul className="grid w-full gap-6 md:grid-cols-6">
            {cards.map((card, index) => {
              const icon = card.icon as MediaDoc | undefined
              return (
                <li
                  key={card.title}
                  className={cn(
                    'relative isolate overflow-hidden rounded-card border border-panel-grey bg-card px-7 py-6 dark:border-border',
                    index < 2 ? 'md:col-span-3' : 'md:col-span-2',
                  )}
                >
                  {/* Blue-to-grey wash at 40%, and the dotted corner, both
                      decorative — behind the content and out of the a11y tree. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 bg-[linear-gradient(149.31deg,rgba(72,155,194,0.4)_0%,rgba(142,142,142,0.1)_100%)] opacity-40 dark:opacity-20"
                  />
                  <Image
                    aria-hidden
                    src="/images/decor/card-corner-dots.svg"
                    alt=""
                    width={132}
                    height={86}
                    className="pointer-events-none absolute -top-2 -right-px -z-10 w-[132px]"
                  />

                  <div className="flex flex-col gap-3">
                    {icon?.url ? (
                      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-card">
                        <Image src={mediaUrl(icon)} alt="" width={24} height={24} className="size-6" aria-hidden />
                      </span>
                    ) : null}
                    <h3 className="pt-2 font-display text-xl leading-7 font-bold text-navy-800 dark:text-foreground">
                      {card.title}
                    </h3>
                    {card.body ? (
                      <p className="text-lg/[1.35] whitespace-pre-line text-ink-500 dark:text-muted-foreground">
                        {card.body}
                      </p>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>

          <Ctas ctas={block.ctas} locale={locale} />
        </div>
      </section>
    )
  }

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          headingAccent={block.headingAccent}
          body={block.body}
        />
        <ul
          className={cn(
            'mt-12 grid gap-6 sm:grid-cols-2',
            columns === '2' && 'lg:grid-cols-2',
            columns === '3' && 'lg:grid-cols-3',
            columns === '4' && 'lg:grid-cols-4',
          )}
        >
          {cards.map((card) => {
            const link = resolveLink(card.link, locale)
            const icon = card.icon as MediaDoc | undefined
            const inner = (
              <>
                {icon ? (
                  <Image src={mediaUrl(icon)} alt="" width={48} height={48} className="size-12" aria-hidden />
                ) : null}
                <h3 className="text-xl">{card.title}</h3>
                {card.body ? <p className="text-sm text-muted-foreground">{card.body}</p> : null}
              </>
            )
            return (
              <li key={card.title}>
                {link ? (
                  <Link
                    href={link.href}
                    className="flex h-full flex-col gap-3 rounded-card border border-border bg-card p-6 transition-shadow hover:shadow-lift"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col gap-3 rounded-card border border-border bg-card p-6">
                    {inner}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
        <div className="mt-10 flex justify-center">
          <Ctas ctas={block.ctas} locale={locale} />
        </div>
      </div>
    </section>
  )
}

/* Figma 3:1825 — the five pastels cycle across the grid; the editor picks
   each tile's tone so a new industry does not have to inherit a neighbour's. */
const INDUSTRY_TONE = {
  pink: 'bg-industry-pink',
  mint: 'bg-industry-mint',
  lilac: 'bg-industry-lilac',
  teal: 'bg-industry-teal',
  blue: 'bg-industry-blue',
} as const

export function IndustriesSection({ block }: { block: BlockProps }) {
  const items = block.industries ?? []
  if (!items.length) return null

  return (
    <section
      id={block.anchor ?? undefined}
      className="section bg-[linear-gradient(180deg,#ffffff_0%,#e9f9fa_100%)] dark:bg-none dark:bg-background"
    >
      <div className="container-board flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-bold">
            <span className="bg-[linear-gradient(145.94deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading}
              {block.headingAccent ? ` ${block.headingAccent}` : null}
            </span>
          </h2>
          {block.body ? <p className="max-w-3xl text-lg/7 text-ink-500 dark:text-muted-foreground">{block.body}</p> : null}
        </div>

        {/* Centred wrap rather than fixed rows: the comp is 7/6/7 at 1440, and
            a wrap keeps that shape while still reflowing on narrower screens. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {items.map((item) => {
            const icon = item.icon as MediaDoc | undefined
            return (
              <li
                key={item.label}
                className={cn(
                  'flex w-[132px] flex-col items-center gap-4 rounded-tl-industry rounded-br-industry px-4 py-4 sm:w-[160px]',
                  INDUSTRY_TONE[item.tone ?? 'teal'],
                )}
              >
                <span className="flex size-8 items-center justify-center">
                  {icon?.url ? (
                    <Image src={mediaUrl(icon)} alt="" width={32} height={32} aria-hidden className="size-8" />
                  ) : null}
                </span>
                <span className="text-center text-base leading-6 font-semibold text-ink-900">{item.label}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function StatsSection({ block }: { block: BlockProps }) {
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        {block.heading ? <SectionHeading heading={block.heading} /> : null}
        <dl className="mt-10 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {(block.items ?? []).map((item, i) => (
            <div key={i} className="rounded-card border border-border bg-card p-6">
              <dd dir="ltr" className="font-display text-4xl font-bold text-primary">{item.value}</dd>
              <dt className="mt-2 text-sm text-muted-foreground">{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function ProcessSection({ block }: { block: BlockProps }) {
  const steps = (block.steps ?? []).map((s) => ({ title: s.title, body: s.body }))

  return (
    <section id={block.anchor ?? undefined} className="section">
      {/* Figma 1:11041 — 100px between the heading block and the funnel. */}
      <div className="container-site flex flex-col items-center gap-10 lg:gap-[100px]">
        <div className="flex flex-col items-center gap-2 text-center">
          {block.eyebrow ? (
            <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(142deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading}
              {block.headingAccent ? ` ${block.headingAccent}` : null}
            </span>
          </h2>
          {block.body ? (
            <p className="max-w-3xl text-lg/7 text-ink-500 dark:text-muted-foreground">{block.body}</p>
          ) : null}
        </div>

        <ProcessStepper steps={steps} />
      </div>
    </section>
  )
}

export function TestimonialsSection({ block }: { block: BlockProps }) {
  const items = block.items ?? []
  const stats = block.stats ?? []

  return (
    <section id={block.anchor ?? undefined} className="section bg-brand-50 dark:bg-background-subtle">
      <div className="container-reading flex flex-col gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          {block.eyebrow ? (
            <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(141.83deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading}
              {block.headingAccent ? ` ${block.headingAccent}` : null}
            </span>
          </h2>
        </div>

        {/* Three across, then a narrow card beside a wide one — the comp's
            rhythm. A six-column grid expresses it without per-row markup: the
            first three span two each, then two and four. */}
        <ul className="grid gap-6 md:grid-cols-6">
          {items.map((item, i) => {
            const avatar = item.avatar as MediaDoc | undefined
            const span = i < 3 ? 'md:col-span-2' : i === 3 ? 'md:col-span-2' : 'md:col-span-4'
            return (
              <li
                key={i}
                className={cn(
                  'flex flex-col justify-between gap-4 rounded-card border border-panel-grey bg-card p-6 dark:border-border',
                  span,
                )}
              >
                <figure className="flex flex-col gap-4">
                  <Image
                    aria-hidden
                    src="/images/decor/quote-mark.svg"
                    alt=""
                    width={31}
                    height={31}
                    className="size-8"
                  />
                  <blockquote className="text-base/6 text-ink-500 dark:text-muted-foreground">
                    {item.quote}
                  </blockquote>
                </figure>
                <figcaption className="flex items-center gap-3">
                  {avatar ? (
                    <Image
                      src={mediaUrl(avatar)}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden
                      className="size-10 shrink-0 rounded-pill object-cover"
                    />
                  ) : null}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-navy-800 dark:text-foreground">
                      {item.authorName}
                    </span>
                    <span className="block truncate text-xs text-ink-500 dark:text-muted-foreground">
                      {item.authorRole}
                    </span>
                  </span>
                </figcaption>
              </li>
            )
          })}
        </ul>

        {stats.length ? (
          <ul className="flex flex-wrap items-start justify-center gap-x-8 gap-y-6 border-t border-panel-grey pt-8 dark:border-border">
            {stats.map((stat) => (
              <li key={stat.label} className="flex flex-col items-center gap-1">
                <span className="flex items-center justify-center gap-1">
                  {stat.star ? (
                    <Image
                      aria-hidden
                      src="/images/decor/star.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  ) : null}
                  <span dir="ltr" className="font-display text-3xl font-bold text-navy-800 dark:text-foreground">
                    {stat.value}
                  </span>
                </span>
                <span className="text-xs text-ink-500 dark:text-muted-foreground">{stat.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export function FaqSection({ block, locale }: { block: BlockProps; locale: Locale }) {
  const items = block.items ?? []
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-reading flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-2 text-center">
          {block.eyebrow ? (
            <p className="text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(154.58deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading}
              {block.headingAccent ? ` ${block.headingAccent}` : null}
            </span>
          </h2>
        </div>

        {/* Native <details> — keyboard accessible, findable by in-page search and
            readable by crawlers with no JS (19.2/19.3). The comp's open/closed
            chevrons are the same control rotated, so one icon covers both. */}
        <div className="flex w-full flex-col gap-4">
          {items.map((item, i) => (
            <details
              key={i}
              open={i === 0}
              className="group rounded-card border border-panel-grey bg-card px-8 py-6 shadow-[0_1px_2px_rgba(25,33,61,0.06)] open:shadow-[0_5px_15px_rgba(25,33,61,0.06)] dark:border-border"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
                <span className="max-w-[650px] text-xl/[1.35] font-semibold text-navy-800 dark:text-foreground">
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="grid size-[34px] shrink-0 place-items-center rounded-pill bg-[linear-gradient(135deg,rgba(72,155,194,0.4)_0%,rgba(142,142,142,0.1)_100%)] text-navy-800 transition-transform duration-300 group-open:rotate-90 group-open:bg-primary group-open:bg-none group-open:text-white"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="size-4" strokeWidth="2.5" stroke="currentColor">
                    <path d="m9 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </summary>
              <div className="pt-4 text-base/[1.66] text-ink-500 dark:text-muted-foreground">
                <RichText data={item.answer} />
              </div>
            </details>
          ))}
        </div>

        {block.footnote || block.ctas?.length ? (
          <div className="flex flex-col items-center gap-4 text-center">
            {block.footnote ? (
              <p className="text-sm font-semibold tracking-[2.8px] text-ink-500 uppercase dark:text-muted-foreground">
                {block.footnote}
              </p>
            ) : null}
            <Ctas ctas={block.ctas} locale={locale} size="md" />
          </div>
        ) : null}
      </div>

      {block.emitSchema && items.length ? (
        <JsonLd
          data={faqSchema(
            items
              .filter((item) => item.question)
              .map((item) => ({ question: item.question!, answer: plainText(item.answer) })),
          )}
        />
      ) : null}
    </section>
  )
}

export function CtaSection({ block, locale }: { block: BlockProps; locale: Locale }) {
  const tone = block.tone ?? 'brand'
  const media = block.media as MediaDoc | undefined

  /* Figma 3:2214 "Meet Fika" — full-bleed teal wash, gradient heading and a
     portrait illustration above the button, rather than the boxed CTA band. */
  if (tone === 'feature') {
    return (
      <section
        id={block.anchor ?? undefined}
        className="section bg-[linear-gradient(180deg,rgba(25,190,200,0.1)_0%,rgba(255,255,255,0.1)_100%)] dark:bg-none dark:bg-background-subtle"
      >
        <div className="container-site flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col items-center gap-2">
            {block.eyebrow ? (
              <p className="text-sm font-semibold tracking-[2.8px] text-ink-900 uppercase dark:text-foreground">
                {block.eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-bold">
              <span className="bg-[linear-gradient(121.18deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
                {block.heading}
              </span>
            </h2>
            {block.body ? (
              <p className="max-w-[818px] text-lg/7 text-ink-500 dark:text-muted-foreground">{block.body}</p>
            ) : null}
          </div>

          {media?.url ? (
            <Image
              src={mediaUrl(media)}
              alt={mediaAlt(media)}
              width={384}
              height={417}
              className="h-auto w-[280px] rounded-[30px] object-contain sm:w-[384px]"
            />
          ) : null}

          {/* The comp's wide solid pill — 340px, label only, no arrow. Capped
              at 100% so it cannot overflow a narrow phone. */}
          <Ctas ctas={block.ctas} locale={locale} withArrow={false} className="min-w-[min(340px,100%)]" />
        </div>
      </section>
    )
  }

  /* Figma 1:13917 — full-bleed navy band, copy left, dot field right. */
  if (tone === 'band') {
    return (
      <section id={block.anchor ?? undefined} className="relative isolate overflow-hidden bg-navy-800">
        {/* A 7-column field of 8px dots on a 36px grid, inset from the right —
            the comp's dots are large and gathered, not a fine spray across the
            whole half. */}
        <div
          aria-hidden
          className="absolute inset-y-0 right-0 -z-10 hidden w-[288px] bg-[radial-gradient(circle,rgba(146,221,236,0.9)_4px,transparent_4px)] [background-size:36px_36px] lg:block"
        />
        <div className="container-site flex flex-col items-start gap-6 py-16 md:py-20">
          <h2 className="max-w-[860px] font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-tight font-bold text-white">
            {block.heading}
          </h2>
          {block.body ? <p className="max-w-[700px] text-base/6 text-white/80">{block.body}</p> : null}
          {/* On navy the outlined pill flips to white per the comp. */}
          <Ctas
            ctas={block.ctas}
            locale={locale}
            size="md"
            className="border-white text-white hover:bg-white/10 dark:border-white dark:text-white dark:hover:bg-white/10"
          />
        </div>
      </section>
    )
  }

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <div
          className={cn(
            'flex flex-col items-center gap-6 rounded-panel px-6 py-14 text-center md:px-16',
            tone === 'brand' && 'bg-primary text-primary-foreground',
            tone === 'ink' && 'bg-ink-900 text-white',
            tone === 'subtle' && 'border border-border bg-background-subtle',
          )}
        >
          <h2 className="max-w-2xl text-4xl">{block.heading}</h2>
          {block.body ? <p className="max-w-2xl text-lg opacity-90">{block.body}</p> : null}
          <Ctas ctas={block.ctas} locale={locale} />
        </div>
      </div>
    </section>
  )
}

export function TechStackSection({ block }: { block: BlockProps }) {
  /* Media is resolved here so the client component receives plain strings and
     never has to know about Payload's document shape. */
  const groups = (block.groups ?? []).map((group) => ({
    name: group.name,
    items: (group.items ?? []).map((item) => {
      const logo = item.logo as MediaDoc | undefined
      return { name: item.name, src: logo?.url ? mediaUrl(logo) : null }
    }),
  }))

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-board flex flex-col items-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
            <span className="bg-[linear-gradient(154.19deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {block.heading}
              {block.headingAccent ? ` ${block.headingAccent}` : null}
            </span>
          </h2>
          {block.body ? <p className="text-lg/7 text-ink-500 dark:text-muted-foreground">{block.body}</p> : null}
        </div>

        <div className="w-full">
          <TechTabs groups={groups} />
        </div>
      </div>
    </section>
  )
}

export function RichTextSection({ block }: { block: BlockProps }) {
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className={cn('container-site', block.width === 'prose' && 'max-w-3xl')}>
        <RichText data={block.content} />
      </div>
    </section>
  )
}

export function MediaSection({ block }: { block: BlockProps }) {
  const media = block.media as MediaDoc | undefined
  if (!media) return null
  const full = block.width === 'full'
  return (
    <section id={block.anchor ?? undefined} className="section">
      <figure className={cn(!full && 'container-site')}>
        <div className="relative aspect-16/9 w-full overflow-hidden rounded-panel bg-background-subtle">
          <Image
            src={mediaUrl(media)}
            alt={mediaAlt(media)}
            fill
            sizes={full ? '100vw' : '(min-width: 1280px) 1280px, 100vw'}
            className="object-cover"
          />
        </div>
        {block.caption ? (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">{block.caption}</figcaption>
        ) : null}
      </figure>
    </section>
  )
}

/** Flattens lexical JSON to text for FAQ schema — schema must match what is visible. */
function plainText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const obj = node as { text?: string; children?: unknown[]; root?: unknown }
  if (obj.root) return plainText(obj.root)
  if (typeof obj.text === 'string') return obj.text
  return (obj.children ?? []).map(plainText).join(' ').replace(/\s+/g, ' ').trim()
}

export function TalentShowcaseSection({ block, locale }: { block: BlockProps; locale: Locale }) {
  const people = block.people ?? []
  const copyRight = block.side === 'copyRight'

  /*
   * The comp runs two rows of the same engineers in a different order. Rotating
   * the list gives that for free, so a second panel never needs its people
   * entered twice in the CMS.
   */
  const rows = people.length ? [people, [...people.slice(1), ...people.slice(0, 1)]] : []

  const card = (person: NonNullable<BlockProps['people']>[number], key: string, hidden: boolean) => {
    const avatar = person.avatar as MediaDoc | undefined
    return (
      <li
        key={key}
        aria-hidden={hidden || undefined}
        /* Margin, not gap, on the track. A gap leaves half of one at the seam,
           so translating the duplicated track by exactly -50% would stutter
           every loop; with margin the two halves are identical. */
        className="me-6 w-[220px] shrink-0 rounded-card bg-card p-4 shadow-[0_0_7.5px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center gap-2.5">
          {avatar?.url ? (
            <Image
              src={mediaUrl(avatar)}
              alt=""
              width={48}
              height={48}
              aria-hidden
              className="size-12 shrink-0 rounded-pill object-cover"
            />
          ) : (
            <span
              aria-hidden
              className="grid size-12 shrink-0 place-items-center rounded-pill bg-primary/12 font-display text-base font-bold text-primary"
            >
              {person.name.charAt(0)}
            </span>
          )}
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold text-navy-800 dark:text-foreground">
              {person.name}
            </span>
            <span className="block truncate text-xs text-ink-500 dark:text-muted-foreground">{person.role}</span>
          </span>
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-1.5 border-t border-border pt-2.5 pb-1">
          {person.experience ? (
            <span
              dir="ltr"
              className="rounded-pill border border-border bg-background-subtle px-2.5 py-1.5 text-xs text-ink-500 dark:text-muted-foreground"
            >
              {person.experience}
            </span>
          ) : null}
          {typeof person.match === 'number' ? (
            <span
              dir="ltr"
              className="rounded-pill border border-[#a7f3d0] bg-[#ecfdf5] px-2.5 py-1.5 text-xs text-success-600"
            >
              Match: {person.match}%
            </span>
          ) : null}
          {person.evaluated ? (
            <span className="rounded-pill border border-[#e0e7ff] bg-[#eef2ff] px-2.5 py-1.5 text-xs text-[#4338ca]">
              Technically Evaluated
            </span>
          ) : null}
        </div>
      </li>
    )
  }

  const copy = (
    <div className="flex w-full flex-col gap-8 lg:w-[480px] lg:shrink-0">
      {block.eyebrow ? (
        <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{block.eyebrow}</p>
      ) : null}

      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold">
        {/* Teal to indigo clipped to the text — the hero's treatment. */}
        <span className="bg-[linear-gradient(114.22deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
          {block.heading}
          {block.headingAccent ? (
            <>
              <br />
              {block.headingAccent}
            </>
          ) : null}
        </span>
      </h2>

      {block.body ? <p className="text-lg/[1.6] text-ink-500 dark:text-muted-foreground">{block.body}</p> : null}

      {block.bullets?.length ? (
        <ul className="ms-5 flex list-disc flex-col gap-1 text-lg/[1.6] text-ink-500 dark:text-muted-foreground">
          {block.bullets.map((bullet) => (
            <li key={bullet.text}>{bullet.text}</li>
          ))}
        </ul>
      ) : null}

      {block.roles?.length ? (
        <ul className="flex flex-wrap gap-x-3 gap-y-2">
          {block.roles.map((role) => (
            <li
              key={role.label}
              className="rounded-pill border border-brand-500 bg-role-pill px-3 py-2.5 text-base leading-none text-role-pill-ink"
            >
              {role.label}
            </li>
          ))}
        </ul>
      ) : null}

      <Ctas ctas={block.ctas} locale={locale} size="md" />
    </div>
  )

  const panel = rows.length ? (
    <div
      className={cn(
        'fk-marquee-stage w-full overflow-hidden rounded-[40px] p-6 sm:p-10 lg:w-[652px] lg:shrink-0',
        block.panelTone === 'mint' ? 'bg-panel-mint' : 'bg-panel-grey',
        'dark:bg-background-subtle',
      )}
    >
      {block.panelTitle ? (
        <p className="mb-6 text-center text-sm font-semibold tracking-[2.8px] text-navy-800 uppercase dark:text-foreground">
          {block.panelTitle}
        </p>
      ) : null}

      <div className="flex flex-col gap-6">
        {rows.map((row, rowIndex) => (
          <ul
            key={rowIndex}
            style={{ '--marquee-duration': `${46 + rowIndex * 10}s` } as React.CSSProperties}
            className={cn('fk-marquee', rowIndex % 2 === 1 && 'fk-marquee-reverse')}
          >
            {/* Duplicated so -50% lands the copy where the original began. The
                second half is hidden from assistive tech — same people twice. */}
            {row.map((person, i) => card(person, `a-${rowIndex}-${i}`, false))}
            {row.map((person, i) => card(person, `b-${rowIndex}-${i}`, true))}
          </ul>
        ))}
      </div>
    </div>
  ) : null

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div
        className={cn(
          'container-site flex flex-col items-center gap-12 lg:flex-row lg:justify-between lg:gap-16',
          copyRight && 'lg:flex-row-reverse',
        )}
      >
        {copy}
        {panel}
      </div>
    </section>
  )
}
