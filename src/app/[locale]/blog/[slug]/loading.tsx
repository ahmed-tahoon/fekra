import { MagicLoader } from '@/components/blog/magic-loader';

/** Shown while an article streams in (Next.js Suspense fallback for this route). */
export default function Loading() {
  return (
    <div className="flex min-h-[72vh] items-center justify-center bg-[#f5f9fc] dark:bg-[#0b1120]">
      <MagicLoader className="w-44" />
    </div>
  );
}
