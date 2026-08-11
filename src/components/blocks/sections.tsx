import Image from 'next/image'
import Link from 'next/link'

import { JsonLd } from '@/components/JsonLd'
import { RichText } from '@/components/RichText'
import { LinkButton } from '@/components/ui/Button'
import type { Locale } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { faqSchema } from '@/lib/jsonld'
import { resolveLink } from '@/lib/resolveLink'

import type { BlockProps, MediaDoc } from './types'
import { mediaAlt, mediaUrl } from './types'

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
  const media = block.media as MediaDoc | undefined
  return (
    <section id={block.anchor ?? undefined} className="section pt-12 md:pt-20">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-6">
          {block.trustLine ? (
            <p className="rounded-pill border border-border px-4 py-1.5 text-sm text-muted-foreground">
              {block.trustLine}
            </p>
          ) : null}
          <SectionHeading
            eyebrow={block.eyebrow}
            heading={block.heading}
            headingAccent={block.headingAccent}
            body={block.body}
            center={false}
            /* The hero on the first block owns the page H1 (18.4). */
            as={isFirst ? 'h1' : 'h2'}
          />
          <Ctas ctas={block.ctas} locale={locale} />

          {block.stats?.length ? (
            <dl className="mt-6 grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
              {block.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-3xl font-bold text-primary">{stat.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>

        {media ? (
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-panel bg-background-subtle">
            <Image
              src={mediaUrl(media)}
              alt={mediaAlt(media)}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              /* 6.6 — the hero is the LCP element, so it is never lazy. */
              priority={isFirst}
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function LogoCloudSection({ block }: { block: BlockProps }) {
  const logos = block.logos ?? []
  if (!logos.length) return null
  return (
    <section id={block.anchor ?? undefined} className="border-y border-border bg-background-subtle py-12">
      <div className="container-site">
        {block.heading ? (
          <p className="text-center text-sm text-muted-foreground">{block.heading}</p>
        ) : null}
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {logos.map((logo) => {
            const image = logo.image as MediaDoc | undefined
            if (!image) return null
            return (
              <li key={logo.name}>
                <Image
                  src={mediaUrl(image)}
                  alt={logo.name}
                  width={140}
                  height={40}
                  className="h-8 w-auto opacity-70 grayscale transition dark:invert dark:grayscale-0"
                />
              </li>
            )
          })}
        </ul>
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
