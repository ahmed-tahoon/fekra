import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { slugify } from '@/lib/slug'

export type Heading = { id: string; text: string; depth: 2 | 3 }

type Node = {
  type?: string
  tag?: string
  text?: string
  children?: Node[]
  root?: Node
}

/** Flattens any lexical subtree to its plain text. */
export function nodeText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const n = node as Node
  if (n.root) return nodeText(n.root)
  if (typeof n.text === 'string') return n.text
  return (n.children ?? []).map(nodeText).join(' ')
}

/**
 * h2/h3 headings for the table of contents. IDs come from the same `slugify`
 * the RichText renderer uses, so every entry links to a real anchor — the two
 * can never drift because they share one function.
 */
export function extractHeadings(data: SerializedEditorState | null | undefined): Heading[] {
  if (!data) return []
  const out: Heading[] = []
  const seen = new Map<string, number>()

  const walk = (node: Node | undefined) => {
    if (!node) return
    if (node.type === 'heading' && (node.tag === 'h2' || node.tag === 'h3')) {
      const text = nodeText(node).replace(/\s+/g, ' ').trim()
      if (text) {
        // Two headings with the same words must not produce the same anchor.
        const base = slugify(text)
        const count = seen.get(base) ?? 0
        seen.set(base, count + 1)
        out.push({ id: count ? `${base}-${count}` : base, text, depth: node.tag === 'h2' ? 2 : 3 })
      }
    }
    ;(node.children ?? []).forEach(walk)
  }

  walk((data as unknown as Node).root)
  return out
}

/** ~220 wpm — the usual reading-time convention, rounded up to a whole minute. */
export function readingMinutes(data: SerializedEditorState | null | undefined): number {
  const words = nodeText(data).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 220))
}
