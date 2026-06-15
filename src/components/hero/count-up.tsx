'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates the numeric part of a value (e.g. "100+", "+30") from 0 to its
 * target with an ease-out, the first time it scrolls into view. Any non-digit
 * characters (the "+", or an Arabic-side prefix) are preserved in place.
 * Respects reduced-motion.
 */
const DURATION = 1500;

export function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const match = value.match(/\d[\d,]*/);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const target = match ? parseInt(match[0].replace(/,/g, ''), 10) : 0;
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
          setN(Math.round(eased * target));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [match, target]);

  if (!match) return <span className={className}>{value}</span>;

  const prefix = value.slice(0, match.index);
  const suffix = value.slice((match.index ?? 0) + match[0].length);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}
