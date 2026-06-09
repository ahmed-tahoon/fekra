'use client';

import { useEffect } from 'react';

/**
 * Enables gentle vertical scroll-snapping between sections (proximity, so it
 * never traps the user). Scoped to the page it's mounted on, and off for
 * reduced-motion users.
 */
export function ScrollSnap() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    root.classList.add('snap-y-proximity');
    return () => root.classList.remove('snap-y-proximity');
  }, []);

  return null;
}
