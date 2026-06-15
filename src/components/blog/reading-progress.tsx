'use client';

import { useEffect, useState } from 'react';

/** Thin gradient bar pinned to the top that fills as the article is read. */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-1" aria-hidden>
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-[#5cb1db] via-[#489bc2] to-[#2f6d8c]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
