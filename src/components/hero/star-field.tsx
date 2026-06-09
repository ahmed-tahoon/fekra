// Deterministic starfield — positions are seeded so server and client render
// identically (no hydration mismatch, no Math.random at runtime).
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260605);
const STARS = Array.from({ length: 90 }, () => ({
  top: rand() * 100,
  left: rand() * 100,
  size: 0.5 + rand() * 1.8,
  twinkle: 2 + rand() * 4,
  delay: rand() * 5,
  opacity: 0.3 + rand() * 0.7,
}));

export function StarField({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {STARS.map((s, i) => (
        <span
          key={i}
          className="hero-star absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            ['--twinkle' as string]: `${s.twinkle}s`,
            ['--twinkle-delay' as string]: `${s.delay}s`,
            boxShadow: '0 0 6px rgba(255,255,255,0.6)',
          }}
        />
      ))}
    </div>
  );
}
