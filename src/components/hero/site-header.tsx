'use client';

import { useEffect, useState } from 'react';
import { SiteTopbar } from './site-topbar';
import { SiteNav } from './site-nav';

/**
 * Fixed homepage header that transforms on scroll: the utility top-bar
 * collapses away and the nav shrinks + gains a solid glass background.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? ' bg-[#070d1a]/85 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)] backdrop-blur-md'
          : ''
      }`}
    >
      {/* utility bar collapses on scroll */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <SiteTopbar />
      </div>
      <SiteNav scrolled={scrolled} />
    </header>
  );
}
