'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Rotates words with a slow cross-motion: the outgoing word drifts up + blurs
 * out while the next word rises in from below. One word is in-flow (sizes the
 * box); the outgoing one overlays it absolutely during the hand-off.
 * Respects reduced-motion.
 */
const HOLD_MS = 3400; // time each word rests
const OUT_MS = 800; // outgoing-word animation length

export function SlideWords({ words, className = '' }: { words: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [tick, setTick] = useState(0);
  const [reduced, setReduced] = useState(false);
  const idxRef = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    idxRef.current = idx;
  }, [idx]);

  useEffect(() => {
    if (reduced || words.length <= 1) return;
    const id = setInterval(() => {
      const cur = idxRef.current;
      setPrev(cur);
      setIdx((cur + 1) % words.length);
      setTick((t) => t + 1);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduced, words.length]);

  // drop the outgoing word once it has finished animating out
  useEffect(() => {
    if (prev === null) return;
    const t = setTimeout(() => setPrev(null), OUT_MS);
    return () => clearTimeout(t);
  }, [tick, prev]);

  if (reduced) return <span className={className}>{words[0]}</span>;

  return (
    <span className="relative inline-block">
      {prev !== null && (
        <span key={`out-${tick}`} aria-hidden className={`role-out absolute start-0 top-0 whitespace-nowrap ${className}`}>
          {words[prev]}
        </span>
      )}
      <span key={`in-${idx}`} className={`role-rise inline-block ${className}`}>
        {words[idx]}
      </span>
    </span>
  );
}
