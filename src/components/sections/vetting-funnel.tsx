'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { SectionDecor } from '@/components/decor/section-decor';

type Step = { title: string; body: string };

// Funnel levels (top → narrow). 5 numbered levels + the Top-3% base.
const LEVELS = [
  { w: 100, icons: 6 },
  { w: 86, icons: 5 },
  { w: 72, icons: 4 },
  { w: 58, icons: 3 },
  { w: 46, icons: 2 },
] as const;
const BASE_W = 32; // final pyramid tip — continues the 100→86→72→58→46 taper
const ROW_H = 62; // px
const ROW_GAP = 6; // px
const ITEM_H = 168; // right-panel step height
const AUTOPLAY_MS = 2400;
const SPRING = 'cubic-bezier(0.34,1.4,0.5,1)';
// Every trapezoid side AND the number tab share one constant slant (a fixed px
// inset over the row height). That keeps the tab a single fixed size — identical
// on step 1 and on every other step — while still nesting flush on each level.
const SLANT = 18; // px
const NUM_W = 60; // px — flat band reserved for the digit (wide tab)
const TAB_W = NUM_W + SLANT; // px — constant tab width

// Regular step — the supplied grey "person" glyph, served as a static asset.
function PersonIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static decorative icon, repeated; no optimization needed
    <img src="/images/vetting/person.svg" alt="" aria-hidden className={cn('h-6 w-6 select-none', className)} />
  );
}

// Final step — celebrating figure with raised arms (the "winner").
function WinnerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[1.35rem] w-[1.35rem] text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="4.3" r="2.1" fill="currentColor" stroke="none" />
      <path d="M12 6.9v6.3" />
      <path d="M12 8.7 7.7 5.3" />
      <path d="M12 8.7 16.3 5.3" />
      <path d="M12 13.2 8.4 19.5" />
      <path d="M12 13.2 15.6 19.5" />
    </svg>
  );
}

// A single curved laurel branch; mirror it with `flip` for the other side.
function Laurel({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 28 44"
      className="h-7 w-4 text-white/90"
      fill="currentColor"
      aria-hidden
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M22 4C12 9 7 22 11 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="20" cy="7" rx="3.6" ry="1.7" transform="rotate(-32 20 7)" />
      <ellipse cx="15" cy="12" rx="3.8" ry="1.8" transform="rotate(-20 15 12)" />
      <ellipse cx="11.5" cy="18" rx="4" ry="1.9" transform="rotate(-8 11.5 18)" />
      <ellipse cx="10" cy="25" rx="4" ry="1.9" transform="rotate(6 10 25)" />
      <ellipse cx="10.5" cy="32" rx="3.8" ry="1.8" transform="rotate(20 10.5 32)" />
      <ellipse cx="12.5" cy="38" rx="3.4" ry="1.6" transform="rotate(34 12.5 38)" />
    </svg>
  );
}

export function VettingFunnel() {
  const t = useTranslations('Vetting');
  const steps = t.raw('steps') as Step[];
  const count = steps.length; // 6
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [innerW, setInnerW] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const hoverRef = useRef(false);
  const inViewRef = useRef(false);
  const reducedRef = useRef(false);
  const pausedUntilRef = useRef(0);

  useEffect(() => {
    reducedRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // measure the funnel's inner width so the number tab's slant can be matched
  // pixel-for-pixel to the active trapezoid's slanted left edge (kept flush on resize)
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const measure = () => setInnerW(el.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        const inView = e?.isIntersecting ?? false;
        inViewRef.current = inView;
        if (inView) setRevealed(true); // one-way: keep it visible once seen
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // autoplay — auto-advance (pauses on hover, when off-screen, or briefly after a click)
  useEffect(() => {
    const id = setInterval(() => {
      if (reducedRef.current || hoverRef.current || !inViewRef.current) return;
      if (performance.now() < pausedUntilRef.current) return;
      setActive((v) => (v + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [count]);

  // clicking a step/dot shows it and pauses autoplay briefly so it can be read
  const select = (i: number) => {
    pausedUntilRef.current = performance.now() + 5000;
    setActive(i);
  };

  const baseActive = active === count - 1;
  const numberedActive = active < LEVELS.length;
  const flagTop = active * (ROW_H + ROW_GAP) + ROW_H / 2;

  // ── geometry ──
  // A constant px slant gives every trapezoid the same edge angle, so the single
  // fixed-size tab nests flush on whichever level is active. trapInsetPct converts
  // the constant SLANT into the per-level % the clip-path needs (width varies).
  const trapInsetPct = (wPct: number) => (innerW ? Math.min(45, (SLANT / ((innerW * wPct) / 100)) * 100) : 9);
  const trapClip = (wPct: number) => {
    const i = trapInsetPct(wPct);
    return `polygon(0% 0%, 100% 0%, ${(100 - i).toFixed(2)}% 100%, ${i.toFixed(2)}% 100%)`;
  };
  const lvlW = numberedActive ? LEVELS[active]!.w : LEVELS[0]!.w;
  const trapLeftPx = (innerW * (100 - lvlW)) / 200; // (innerW − trapWidth) / 2
  const tabLeftPx = trapLeftPx - NUM_W;
  const tabClip = `polygon(0% 0%, ${((NUM_W / TAB_W) * 100).toFixed(2)}% 0%, 100% 100%, ${((SLANT / TAB_W) * 100).toFixed(2)}% 100%)`;
  const tabReady = innerW > 0 && numberedActive && revealed;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f5f9fc] py-16 sm:py-20 dark:bg-[#0b1120]"
      aria-label={t('title')}
    >
      <SectionDecor variant="process" />

      <div
        className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <h2
          className={cn(
            'text-center text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold tracking-tight text-slate-900 transition-all duration-700 dark:text-white',
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
          )}
        >
          {t('title')}
          <span className="text-[#489bc2]">.</span>
        </h2>

        <p
          className={cn(
            'mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600 transition-all delay-100 duration-700 sm:text-lg dark:text-slate-300',
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
          )}
        >
          {t('subtitle')}
        </p>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ── Funnel ── */}
          <div className="relative mx-auto w-full max-w-[480px]">
            {/* inner box keeps a fixed left gutter (ms-14) so the numbers and the
                sliding tab always have room — including on the widest first step. */}
            <div ref={innerRef} className="relative ms-16">
              {/* sliding number tab — one fixed-size parallelogram; its right edge
                  shares the constant slant of every step, so it nests flush wherever
                  it lands. Only top/left animate (size never changes). */}
              <div
                aria-hidden
                className={cn(
                  'pointer-events-none absolute z-30 flex items-center justify-center bg-gradient-to-br from-[#5cb1db] to-[#2f6d8c] text-white shadow-[0_12px_28px_-8px_rgba(72,155,194,0.95)]',
                  tabReady ? 'opacity-100' : 'opacity-0',
                )}
                style={{
                  top: flagTop,
                  left: tabLeftPx,
                  width: TAB_W,
                  height: ROW_H,
                  clipPath: tabClip,
                  transform: 'translateY(-50%)',
                  transition: `top 520ms ${SPRING}, left 520ms ${SPRING}, opacity 250ms`,
                }}
              >
                <span className="text-2xl font-black drop-shadow-sm">{numberedActive ? active + 1 : ''}</span>
              </div>

              {LEVELS.map((lvl, i) => {
                const edge = (100 - lvl.w) / 2;
                const isActive = active === i;
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={steps[i]?.title}
                    className={cn('vf-level group relative block w-full cursor-pointer', revealed && 'is-in')}
                    style={{ height: ROW_H, marginBottom: ROW_GAP, transitionDelay: revealed ? `${i * 80}ms` : '0ms' }}
                  >
                    <div
                      className="absolute top-0 left-1/2 flex h-full -translate-x-1/2 items-center justify-evenly bg-slate-200/80 px-[5%] transition-colors duration-300 group-hover:bg-slate-200/90 dark:bg-white/10"
                      style={{ width: `${lvl.w}%`, clipPath: trapClip(lvl.w) }}
                    >
                      {Array.from({ length: lvl.icons }).map((_, k) => (
                        <PersonIcon key={k} className={cn('transition-transform duration-300', isActive && 'scale-110')} />
                      ))}
                    </div>
                    {/* step number — sits in the left gutter; hidden while the flag covers it */}
                    <span
                      className={cn(
                        'absolute top-1/2 text-2xl font-black transition-all duration-300',
                        isActive ? 'opacity-0' : 'text-[#489bc2]/70 group-hover:text-[#489bc2]',
                      )}
                      style={{ left: `${edge}%`, transform: 'translate(-205%, -50%)' }}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}

              {/* base — Top 3% : grey base trapezoid with the colored laurel arrow */}
              <button
                type="button"
                onClick={() => select(count - 1)}
                aria-label={steps[count - 1]?.title}
                className={cn('vf-level relative block w-full cursor-pointer', revealed && 'is-in')}
                style={{ height: ROW_H, transitionDelay: revealed ? `${LEVELS.length * 80}ms` : '0ms' }}
              >
                <div
                  className="absolute top-0 left-1/2 h-full -translate-x-1/2 bg-slate-200/80 dark:bg-white/10"
                  style={{ width: `${BASE_W}%`, clipPath: trapClip(BASE_W) }}
                />
                <div
                  className={cn(
                    'absolute top-1/2 z-10 flex items-center gap-2 bg-gradient-to-r from-[#489bc2] to-[#2f6d8c] pl-6 pr-9 font-bold text-white transition-all duration-300',
                    baseActive
                      ? 'scale-[1.05] shadow-[0_18px_42px_-8px_rgba(72,155,194,1)]'
                      : 'shadow-[0_8px_20px_-10px_rgba(72,155,194,0.8)]',
                  )}
                  style={{
                    left: `${(100 - BASE_W) / 2}%`,
                    height: ROW_H - 4,
                    transform: 'translateY(-50%)',
                    clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 50%, calc(100% - 20px) 100%, 0 100%, 12px 50%)',
                  }}
                >
                  <Laurel />
                  <WinnerIcon />
                  <Laurel flip />
                  <span className="text-sm whitespace-nowrap">{t('topLabel')}</span>
                </div>
              </button>
            </div>
          </div>

          {/* ── Step copy — fades + rises in on every change (keyed remount) ── */}
          <div
            className={cn(
              'flex items-center text-center transition-all duration-700 lg:text-start',
              revealed ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
            )}
            style={{ minHeight: ITEM_H, transitionDelay: revealed ? '200ms' : '0ms' }}
          >
            <div key={active} className="vf-step-in w-full">
              {/* <p className="text-sm font-bold tracking-[0.18em] text-[#489bc2] uppercase">
                {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
              </p> */}
              <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                {steps[active]?.title}
              </h3>
              <p className="mx-auto mt-3 max-w-md text-lg leading-7 text-slate-600 lg:mx-0 dark:text-slate-300">
                {steps[active]?.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
