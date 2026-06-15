/**
 * Deterministic colour theme per category string (works for any locale —
 * categories are hashed into a fixed brand-friendly palette).
 */
export type CategoryTheme = {
  tag: string; // pill background + text
  gradient: string; // cover gradient
  dot: string; // pattern colour
  bar: string; // solid accent
};

const PALETTE: CategoryTheme[] = [
  { tag: 'bg-[#489bc2]/12 text-[#2f6d8c]', gradient: 'from-[#5cb1db] via-[#489bc2] to-[#2f6d8c]', dot: 'text-white/25', bar: 'bg-[#489bc2]' },
  { tag: 'bg-violet-100 text-violet-700', gradient: 'from-violet-400 via-violet-500 to-violet-700', dot: 'text-white/25', bar: 'bg-violet-500' },
  { tag: 'bg-rose-100 text-rose-600', gradient: 'from-rose-400 via-rose-500 to-rose-700', dot: 'text-white/25', bar: 'bg-rose-500' },
  { tag: 'bg-emerald-100 text-emerald-700', gradient: 'from-emerald-400 via-emerald-500 to-emerald-700', dot: 'text-white/25', bar: 'bg-emerald-500' },
  { tag: 'bg-amber-100 text-amber-700', gradient: 'from-amber-400 via-amber-500 to-orange-600', dot: 'text-white/25', bar: 'bg-amber-500' },
  { tag: 'bg-cyan-100 text-cyan-700', gradient: 'from-cyan-400 via-cyan-500 to-sky-700', dot: 'text-white/25', bar: 'bg-cyan-500' },
];

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (h * 31 + value.charCodeAt(i)) >>> 0;
  }
  return h;
}

export function categoryTheme(category: string): CategoryTheme {
  return PALETTE[hash(category) % PALETTE.length]!;
}
