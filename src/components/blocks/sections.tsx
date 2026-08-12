import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { LinkButton } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { faqSchema } from '@/lib/jsonld'
import { resolveLink } from '@/lib/resolveLink'

import { RotatingWords } from './RotatingWords'
import type { BlockProps, MediaDoc } from './types'
import { mediaAlt, mediaUrl } from './types'

/* Measured from the comp: the two greens carry navy text, the darker two white. */
const STAT_TONE = {
  green: 'bg-[--color-tile-green] text-navy-800',
  emerald: 'bg-[--color-tile-emerald] text-navy-800',
  indigo: 'bg-[--color-tile-indigo] text-white',
  teal: 'bg-[--color-tile-teal] text-white',
} as const

const TILE_CORNER = {
  tl: 'rounded-tl-[--radius-tile]',
  tr: 'rounded-tr-[--radius-tile]',
  bl: 'rounded-bl-[--radius-tile]',
  br: 'rounded-br-[--radius-tile]',
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
  { left: 88.636, top: 65.132, width: 11.364, height: 35.088 },
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

function Ctas({ ctas, locale, size = 'lg' }: { ctas?: BlockProps['ctas']; locale: Locale; size?: 'md' | 'lg' }) {
  const resolved = (ctas ?? []).map((c) => ({ variant: c.variant, link: resolveLink(c.link, locale) }))
  if (!resolved.some((c) => c.link)) return null
  return (
    <div className="flex flex-wrap gap-3">
      {resolved.map((c) =>
        c.link ? (
          <LinkButton key={c.link.href} link={c.link} variant={c.variant ?? 'primary'} size={size} withArrow />
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
          <span className="mt-3 font-display text-2xl font-bold tracking-[-0.04em] md:text-[40px] md:leading-8">
            {item.value}
          </span>
        </div>
      )
    }

    return (
      <div className={cn('relative size-full overflow-hidden bg-[--color-tile-mist]', corner)}>
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
      className="relative -mt-24 overflow-hidden bg-[linear-gradient(117.67deg,rgba(238,252,243,0.4)_3.72%,rgba(220,239,247,0.4)_103.6%)] pt-36 pb-0 dark:bg-none dark:bg-background"
    >
      <div className="container-wide">
        <div className="mx-auto flex max-w-[844px] flex-col items-center gap-6 text-center">
          {block.trustLine ? (
            <p className="inline-flex items-center gap-2 rounded-pill border border-[rgba(25,36,36,0.08)] bg-white px-3.5 py-1.5 text-sm font-medium tracking-[0.35px] text-[--color-ink-500] dark:border-border dark:bg-card">
              <span aria-hidden className="size-2 shrink-0 rounded-pill bg-primary" />
              {block.trustLine}
            </p>
          ) : null}

          <Title className="font-display text-[clamp(2.25rem,5.2vw,3.75rem)] leading-[1.05] font-bold tracking-[-1.5px] text-navy-800 dark:text-foreground">
            {block.heading}
            <br />
            {/* Second line is a gradient fill in the comp, teal -> blue. */}
            <span className="bg-[linear-gradient(137.53deg,#12cbb4_0%,#375bc7_100%)] bg-clip-text text-transparent">
              {words.length ? <RotatingWords words={words} /> : block.headingAccent}
            </span>
          </Title>

          {block.body ? (
            <p className="text-lg/7 text-[--color-ink-500] dark:text-muted-foreground">{block.body}</p>
          ) : null}

          {block.bullets?.length ? (
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {block.bullets.map((bullet) => {
                const icon = bullet.icon as MediaDoc | undefined
                return (
                  <li
                    key={bullet.text}
                    className="flex items-center gap-1 text-sm text-[--color-ink-500] dark:text-muted-foreground"
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

          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <Ctas ctas={block.ctas} locale={locale} />
          </div>
        </div>
      </div>

      {mosaic.length ? (
        <>
          {/* Desktop: the collage, positioned exactly as designed. Full-bleed —
              it runs past the container to the viewport edges. */}
          <div className="relative mt-12 hidden aspect-[1408/456] w-full md:block">
            {mosaic.map((item, index) => {
              const pos = MOSAIC_LAYOUT[index]
              if (!pos) return null
              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    width: `${pos.width}%`,
                    height: `${pos.height}%`,
                  }}
                >
                  {tile(item, index)}
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
                <dd className="font-display text-3xl font-bold text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </section>
  )
}

export function LogoCloudSection({ block }: { block: BlockProps }) {
  const logos = block.logos ?? []
  const statement = block.statement
  const hasStatement = Boolean(statement?.before || statement?.highlight || statement?.after)
  // The statement is content in its own right — it should not disappear just
  // because the client logos have not been uploaded yet (8.9).
  if (!logos.length && !hasStatement) return null

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-wide grid items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        {hasStatement ? (
          <p className="font-display text-2xl leading-snug font-bold text-balance md:text-3xl">
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
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo) => {
            const image = logo.image as MediaDoc | undefined
            if (!image?.url) return null
            return (
              <li key={logo.name} className="flex items-center justify-center">
                <Image
                  src={mediaUrl(image)}
                  alt={logo.name}
                  width={140}
                  height={44}
                  className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:invert dark:grayscale-0"
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
          {(block.cards ?? []).map((card) => {
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

export function StatsSection({ block }: { block: BlockProps }) {
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        {block.heading ? <SectionHeading heading={block.heading} /> : null}
        <dl className="mt-10 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {(block.items ?? []).map((item, i) => (
            <div key={i} className="rounded-card border border-border bg-card p-6">
              <dd className="font-display text-4xl font-bold text-primary">{item.value}</dd>
              <dt className="mt-2 text-sm text-muted-foreground">{item.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export function ProcessSection({ block }: { block: BlockProps }) {
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          headingAccent={block.headingAccent}
          body={block.body}
        />
        {/* A real <ol> — the sequence is the meaning, not the styling (19.1). */}
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(block.steps ?? []).map((step, index) => (
            <li key={step.title} className="rounded-card border border-border bg-card p-6">
              <span className="font-display text-sm font-bold text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function TestimonialsSection({ block }: { block: BlockProps }) {
  return (
    <section id={block.anchor ?? undefined} className="section bg-background-subtle">
      <div className="container-site">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          headingAccent={block.headingAccent}
          body={block.body}
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {(block.items ?? []).map((item, i) => {
            const avatar = item.avatar as MediaDoc | undefined
            return (
              <li key={i} className="rounded-card border border-border bg-card p-8">
                <figure>
                  <blockquote className="text-lg text-foreground">{item.quote}</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    {avatar ? (
                      <Image
                        src={mediaUrl(avatar)}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 rounded-pill object-cover"
                        aria-hidden
                      />
                    ) : null}
                    <span>
                      <span className="block text-sm font-semibold">{item.authorName}</span>
                      <span className="block text-xs text-muted-foreground">{item.authorRole}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function FaqSection({ block }: { block: BlockProps }) {
  const items = block.items ?? []
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site max-w-3xl">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          headingAccent={block.headingAccent}
          body={block.body}
        />
        {/* Native disclosure — keyboard accessible and readable by crawlers without JS (19.2/19.3). */}
        <div className="mt-10 divide-y divide-border border-y border-border">
          {items.map((item, i) => (
            <details key={i} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                {item.question}
                <span className="text-primary transition-transform group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <div className="pt-4">
                <RichText data={item.answer} />
              </div>
            </details>
          ))}
        </div>
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
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <div
          className={cn(
            'flex flex-col items-center gap-6 rounded-panel px-6 py-14 text-center md:px-16',
            tone === 'brand' && 'bg-primary text-primary-foreground',
            tone === 'ink' && 'bg-[--color-ink-900] text-white',
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
  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-site">
        <SectionHeading
          eyebrow={block.eyebrow}
          heading={block.heading}
          headingAccent={block.headingAccent}
          body={block.body}
        />
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {(block.groups ?? []).map((group) => (
            <div key={group.name} className="rounded-card border border-border bg-card p-6">
              <h3 className="text-lg">{group.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {(group.items ?? []).map((item) => (
                  <li
                    key={item.name}
                    className="rounded-pill border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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

  return (
    <section id={block.anchor ?? undefined} className="section">
      <div className="container-wide grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          {block.eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">{block.eyebrow}</p>
          ) : null}
          <h2 className="mt-3 text-4xl md:text-5xl">
            <span className="text-primary">{block.heading}</span>
            {block.headingAccent ? (
              <>
                <br />
                {block.headingAccent}
              </>
            ) : null}
          </h2>
          {block.body ? <p className="mt-4 max-w-lg text-muted-foreground">{block.body}</p> : null}

          {block.bullets?.length ? (
            <ul className="mt-6 flex flex-col gap-2">
              {block.bullets.map((bullet) => (
                <li key={bullet.text} className="flex items-start gap-2.5 text-sm">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-pill bg-primary" />
                  {bullet.text}
                </li>
              ))}
            </ul>
          ) : null}

          {block.roles?.length ? (
            <ul className="mt-8 flex flex-wrap gap-2">
              {block.roles.map((role) => (
                <li
                  key={role.label}
                  className="rounded-pill bg-primary/10 px-3.5 py-1.5 text-xs font-medium text-primary"
                >
                  {role.label}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-8">
            <Ctas ctas={block.ctas} locale={locale} size="md" />
          </div>
        </div>

        {people.length ? (
          <div className="rounded-panel border border-border bg-background-subtle p-5 md:p-7">
            {block.panelTitle ? (
              <p className="mb-5 text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                {block.panelTitle}
              </p>
            ) : null}

            <ul className="grid gap-3 sm:grid-cols-2">
              {people.map((person) => {
                const avatar = person.avatar as MediaDoc | undefined
                return (
                  <li key={person.name} className="rounded-card border border-border bg-card p-4 shadow-card">
                    <div className="flex items-center gap-3">
                      {avatar?.url ? (
                        <Image
                          src={mediaUrl(avatar)}
                          alt=""
                          width={40}
                          height={40}
                          aria-hidden
                          className="size-10 rounded-pill object-cover"
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="grid size-10 place-items-center rounded-pill bg-primary/12 font-display text-sm font-bold text-primary"
                        >
                          {person.name.charAt(0)}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold">{person.name}</span>
                        <span className="block truncate text-xs text-muted-foreground">{person.role}</span>
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                      {person.experience ? (
                        <span className="text-muted-foreground">{person.experience}</span>
                      ) : null}
                      {typeof person.match === 'number' ? (
                        <span className="rounded-pill bg-emerald-500/12 px-2 py-0.5 font-semibold text-emerald-700 dark:text-emerald-300">
                          Match: {person.match}%
                        </span>
                      ) : null}
                    </div>

                    {person.evaluated ? (
                      <p className="mt-2 rounded-pill bg-primary/10 px-2.5 py-1 text-center text-2xs font-semibold text-primary">
                        Technically Evaluated
                      </p>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  )
}
