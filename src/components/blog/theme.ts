/**
 * Deterministic colour theme per category — the exact palette from the existing
 * fekra-egy.com blog, so a category keeps the colour readers already associate
 * with it. Categories are author-defined and localised, so they are hashed
 * rather than mapped by hand.
 */
export type CategoryTheme = {
  /** Pill background + text */
  tag: string
  /** Cover gradient */
  gradient: string
  /** Dotted texture colour on the cover */
  dot: string
  /** Solid accent */
  bar: string
}

const PALETTE: CategoryTheme[] = [
  {
    tag: 'bg-blog-500/12 text-[#2f6d8c]',
    gradient: 'from-blog-400 via-blog-500 to-blog-700',
    dot: 'text-white/25',
    bar: 'bg-blog-500',
  },
  {
    tag: 'bg-violet-100 text-violet-700',
    gradient: 'from-violet-400 via-violet-500 to-violet-700',
    dot: 'text-white/25',
    bar: 'bg-violet-500',
  },
  {
    tag: 'bg-rose-100 text-rose-600',
    gradient: 'from-rose-400 via-rose-500 to-rose-700',
    dot: 'text-white/25',
    bar: 'bg-rose-500',
  },
  {
    tag: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-400 via-emerald-500 to-emerald-700',
    dot: 'text-white/25',
    bar: 'bg-emerald-500',
  },
  {
    tag: 'bg-amber-100 text-amber-700',
    gradient: 'from-amber-400 via-amber-500 to-orange-600',
    dot: 'text-white/25',
    bar: 'bg-amber-500',
  },
  {
    tag: 'bg-cyan-100 text-cyan-700',
    gradient: 'from-cyan-400 via-cyan-500 to-sky-700',
    dot: 'text-white/25',
    bar: 'bg-cyan-500',
  },
]

function hash(value: string): number {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

export const categoryTheme = (category: string): CategoryTheme => PALETTE[hash(category) % PALETTE.length]!
