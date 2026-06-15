import Image from 'next/image';

/**
 * Cohesive glassmorphism background system. Drop <SectionDecor variant="…" />
 * as the FIRST child of a `relative overflow-hidden` section — it paints soft
 * spheres, dot grids, glass shards, arcs and blurred orbs *behind* the content
 * (it comes first in the DOM and is pointer-events-none, so content always wins
 * the stacking + clicks). Extremely subtle, light-only palette.
 */

const SPHERE = '/images/decor/sphere.webp';
const DOTGRID = '/images/decor/dotgrid.webp';
const SHARD = '/images/decor/glass-shard.webp';

function Sphere({ className }: { className: string }) {
  return (
    <Image src={SPHERE} alt="" width={420} height={420} aria-hidden className={`absolute h-auto select-none opacity-70 dark:opacity-20 ${className}`} />
  );
}
function Shard({ className }: { className: string }) {
  return (
    <Image src={SHARD} alt="" width={320} height={580} aria-hidden className={`absolute h-auto select-none opacity-60 dark:opacity-20 ${className}`} />
  );
}
function Dots({ className }: { className: string }) {
  return (
    <Image src={DOTGRID} alt="" width={420} height={340} aria-hidden className={`absolute h-auto select-none opacity-60 dark:opacity-15 ${className}`} />
  );
}
function Orb({ className }: { className: string }) {
  return <div aria-hidden className={`absolute rounded-full bg-[#489bc2]/15 blur-3xl dark:bg-[#489bc2]/10 ${className}`} />;
}
function Arc({ className }: { className: string }) {
  return <div aria-hidden className={`absolute rounded-full border border-[#489bc2]/10 dark:border-white/5 ${className}`} />;
}

export type DecorVariant = 'features' | 'benefits' | 'process' | 'pricing' | 'testimonials' | 'minimal' | 'cta';

export function SectionDecor({ variant }: { variant: DecorVariant }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {variant === 'features' && (
        <>
          <Orb className="-top-28 end-[-5rem] h-96 w-96" />
          <Sphere className="end-[6%] top-[14%] w-40 sm:w-48" />
          <Dots className="start-[3%] bottom-[10%] w-36 sm:w-44" />
        </>
      )}

      {variant === 'benefits' && (
        <>
          <Orb className="top-[18%] start-[-6rem] h-[28rem] w-[28rem]" />
          <Arc className="-bottom-48 end-[-12rem] h-[42rem] w-[42rem]" />
          <Sphere className="start-[8%] top-[10%] w-32" />
        </>
      )}

      {variant === 'process' && (
        <>
          <Orb className="top-[10%] start-[-6rem] h-[26rem] w-[26rem]" />
          <Shard className="end-[3%] top-[12%] w-36 rotate-6 sm:w-44" />
          <Dots className="start-[5%] top-[8%] w-32 sm:w-40" />
        </>
      )}

      {variant === 'pricing' && (
        <>
          <Sphere className="end-[5%] top-[10%] w-44" />
          <Arc className="-top-40 start-[-10rem] h-[40rem] w-[40rem]" />
          <Orb className="bottom-[-4rem] end-[20%] h-80 w-80" />
        </>
      )}

      {variant === 'testimonials' && (
        <>
          <Dots className="end-[4%] top-[12%] w-40" />
          <Orb className="bottom-[-3rem] start-[-4rem] h-80 w-80" />
        </>
      )}

      {variant === 'cta' && (
        <>
          <Orb className="left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 bg-[#489bc2]/25 dark:bg-[#489bc2]/15" />
          <Sphere className="end-[8%] top-[16%] w-36 opacity-80" />
          <Sphere className="start-[10%] bottom-[12%] w-24 opacity-70" />
          <Arc className="left-1/2 top-1/2 h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2" />
        </>
      )}

      {variant === 'minimal' && <Orb className="-top-20 end-[10%] h-72 w-72" />}
    </div>
  );
}
