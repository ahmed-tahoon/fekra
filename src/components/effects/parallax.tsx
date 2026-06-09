'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

/**
 * Translates its content vertically as the page scrolls, relative to the
 * element's distance from the viewport centre — so layers drift at different
 * speeds (parallax). Disabled under prefers-reduced-motion.
 */
export function Parallax({
  children,
  speed = 0.2,
  className = '',
  innerClassName = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  innerClassName?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      const el = outer.current;
      const box = inner.current;
      if (el && box) {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - window.innerHeight / 2;
        box.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
