'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const ACTIVE_PILL =
  'border-transparent bg-gradient-to-r from-[#489bc2] to-[#2f6d8c] text-white shadow-[0_10px_24px_-12px_rgba(72,155,194,0.9)]';
const IDLE_PILL =
  'border-slate-200 bg-white/70 text-slate-600 hover:border-[#489bc2]/50 hover:text-[#2f6d8c] dark:border-white/10 dark:bg-white/5 dark:text-slate-300';

function Pill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all',
        active ? ACTIVE_PILL : IDLE_PILL,
      )}
    >
      {label}
    </button>
  );
}

/**
 * Static, branded topic taxonomy (mirrors the reference cover) + a "More"
 * dropdown for the overflow topics. Selecting a topic filters the grid.
 */
export function TopicPills({
  topics,
  moreTopics,
  allLabel,
  moreLabel,
  active,
  onSelect,
}: {
  topics: string[];
  moreTopics: string[];
  allLabel: string;
  moreLabel: string;
  active: string;
  onSelect: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const moreActive = moreTopics.includes(active);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <Pill label={allLabel} active={active === 'all'} onClick={() => onSelect('all')} />
      {topics.map((topic) => (
        <Pill key={topic} label={topic} active={active === topic} onClick={() => onSelect(topic)} />
      ))}

      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={cn(
            'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all',
            moreActive ? ACTIVE_PILL : IDLE_PILL,
          )}
        >
          <span className="uppercase tracking-wide">{moreActive ? active : moreLabel}</span>
          <svg
            viewBox="0 0 24 24"
            className={cn('h-3.5 w-3.5 transition-transform duration-200', open && 'rotate-180')}
            fill="none"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            role="menu"
            className="menu-in scrollbar-slim absolute start-0 top-[calc(100%+0.6rem)] z-50 max-h-80 w-64 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-[#111a2e]"
          >
            {moreTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                role="menuitem"
                onClick={() => {
                  onSelect(topic);
                  setOpen(false);
                }}
                className={cn(
                  'block w-full rounded-lg px-3 py-2 text-start text-sm transition-colors',
                  active === topic
                    ? 'bg-[#489bc2]/12 font-semibold text-[#2f6d8c] dark:text-[#7cc3e3]'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5',
                )}
              >
                {topic}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
