'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * NProgress-style top loading bar. Starts the instant an internal link is
 * clicked and completes when the route (pathname) changes — so navigation feels
 * instant and intentional even while the next page is being prepared.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const mounted = useRef(false);

  const clearTrickle = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTrickle();
    setVisible(true);
    setWidth(10);
    timer.current = setInterval(() => {
      setWidth((w) => (w >= 90 ? 90 : w + (90 - w) * 0.12));
    }, 220);
  }, [clearTrickle]);

  const finish = useCallback(() => {
    clearTrickle();
    setWidth(100);
    window.setTimeout(() => {
      setVisible(false);
      setWidth(0);
    }, 350);
  }, [clearTrickle]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');
      if (!href || target === '_blank' || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      let url: URL;
      try {
        url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      start();
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [start]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    finish();
    return clearTrickle;
  }, [pathname, finish, clearTrickle]);

  if (!visible) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-[#5cb1db] via-[#489bc2] to-[#2c6585] shadow-[0_0_12px_rgba(72,155,194,0.7)] transition-[width] duration-200 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
