import { RichText as LexicalRichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/cn'
import { slugify } from '@/lib/slug'

/**
 * Body copy. The prose rules live here once so every article, job description
 * and rich-text block reads identically in both themes and both directions
 * (8.7 — long-form reading has to be excellent on mobile).
 *
 * `anchors` adds an id to every h2/h3 so the table of contents can link to it.
 * The id is produced by the same `slugify` + duplicate counter as
 * `extractHeadings`, which is what guarantees the two agree.
 */
/**
 * `article` is the long-form blog spec (larger body copy, generous line height,
 * blog-blue accents). `default` is the tighter site-wide spec used by job
 * descriptions, FAQ answers and rich-text blocks.
 */
const VARIANTS = {
  default: [
    'max-w-[70ch] text-[1.0625rem]/8 text-foreground',
    '[&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:text-3xl md:[&_h2]:text-4xl',
    '[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-2xl',
    '[&_h4]:mt-8 [&_h4]:mb-2 [&_h4]:text-xl',
    '[&_p]:mb-6',
    '[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:ps-6 [&_li]:mb-2.5',
    '[&_li]:marker:text-primary',
    '[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4',
    '[&_strong]:font-semibold [&_strong]:text-foreground',
    '[&_blockquote]:my-8 [&_blockquote]:rounded-e-panel [&_blockquote]:border-s-4 [&_blockquote]:border-primary',
    '[&_blockquote]:bg-primary/6 [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:font-medium',
    '[&_hr]:my-12 [&_hr]:border-border',
    '[&_code]:rounded [&_code]:bg-background-subtle [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.875em]',
    '[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-panel [&_pre]:border [&_pre]:border-border [&_pre]:bg-background-subtle [&_pre]:p-5',
    // Tables must scroll inside themselves, never widen the page (16.7).
    '[&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:p-3 [&_th]:p-3',
    '[&_th]:bg-background-subtle [&_th]:text-start',
    '[&_img]:rounded-panel [&_img]:shadow-card',
  ],
  article: [
    'max-w-[72ch]',
    '[&_h2]:font-extrabold [&_h2]:tracking-tight [&_h2]:text-slate-900 dark:[&_h2]:text-white',
    '[&_h3]:font-extrabold [&_h3]:tracking-tight [&_h3]:text-slate-900 dark:[&_h3]:text-white',
    '[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-[2rem] sm:[&_h2]:text-[2.2rem]',
    '[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-[1.5rem] sm:[&_h3]:text-[1.7rem]',
    '[&_p]:mb-6 [&_p]:text-[1.075rem] sm:[&_p]:text-[1.1875rem] [&_p]:leading-[1.9] [&_p]:text-slate-700 dark:[&_p]:text-slate-300',
    '[&_ul]:mb-6 [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:ps-6',
    '[&_li]:mb-2.5 [&_li]:text-[1.05rem] sm:[&_li]:text-[1.15rem] [&_li]:leading-[1.8] [&_li]:text-slate-600 dark:[&_li]:text-slate-300',
    '[&_li]:marker:text-blog-500',
    '[&_a]:font-semibold [&_a]:text-blog-600 [&_a]:no-underline hover:[&_a]:underline',
    '[&_strong]:text-slate-900 dark:[&_strong]:text-white',
    '[&_blockquote]:my-8 [&_blockquote]:rounded-e-2xl [&_blockquote]:border-s-4 [&_blockquote]:border-blog-500',
    '[&_blockquote]:bg-blog-500/[0.06] [&_blockquote]:px-6 [&_blockquote]:py-2 [&_blockquote]:text-[1.12rem]',
    '[&_blockquote]:leading-8 [&_blockquote]:font-medium [&_blockquote]:not-italic [&_blockquote]:text-slate-700 dark:[&_blockquote]:text-slate-200',
    '[&_hr]:my-12 [&_hr]:border-slate-200 dark:[&_hr]:border-white/10',
    '[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[0.85em] [&_code]:font-medium dark:[&_code]:bg-white/10',
    '[&_pre]:my-8 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-slate-200 [&_pre]:bg-slate-50 [&_pre]:p-5 [&_pre]:text-slate-800',
    'dark:[&_pre]:border-white/10 dark:[&_pre]:bg-white/[0.04] dark:[&_pre]:text-slate-200',
    '[&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:rounded-xl [&_td]:p-3 [&_th]:p-3',
    '[&_th]:bg-slate-50 [&_th]:text-start [&_th]:text-slate-700 dark:[&_th]:bg-white/[0.06] dark:[&_th]:text-slate-200 [&_td]:align-top',
    '[&_img]:rounded-2xl [&_img]:shadow-md',
  ],
} as const

export function RichText({
  data,
  className,
  anchors = false,
  variant = 'default',
}: {
  data: SerializedEditorState | null | undefined
  className?: string
  anchors?: boolean
  variant?: keyof typeof VARIANTS
}) {
  if (!data) return null

  const converters: JSXConvertersFunction | undefined = anchors
    ? ({ defaultConverters }) => {
        const seen = new Map<string, number>()
        return {
          ...defaultConverters,
          heading: ({ node, nodesToJSX }) => {
            const children = nodesToJSX({ nodes: node.children })
            const Tag = (node.tag ?? 'h2') as 'h2' | 'h3' | 'h4'
            if (Tag !== 'h2' && Tag !== 'h3') return <Tag>{children}</Tag>

            const text = plainText(node)
            const base = slugify(text)
            const count = seen.get(base) ?? 0
            seen.set(base, count + 1)
            const id = count ? `${base}-${count}` : base

            return (
              <Tag id={id} className="group scroll-mt-28">
                {children}
                <a
                  href={`#${id}`}
                  aria-label={`Link to ${text}`}
                  className="ms-2 text-blog-500 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
                >
                  #
                </a>
              </Tag>
            )
          },
        }
      }
    : undefined

  return (
    <div
      className={cn(VARIANTS[variant], className)}
    >
      <LexicalRichText data={data} converters={converters} />
    </div>
  )
}

function plainText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as { text?: string; children?: unknown[] }
  if (typeof n.text === 'string') return n.text
  return (n.children ?? []).map(plainText).join(' ').replace(/\s+/g, ' ').trim()
}
