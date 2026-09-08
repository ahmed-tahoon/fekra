/**
 * Route-level loading UI for every page under /[locale] (17.11).
 *
 * The header and footer are in the layout, so they stay put and only the main
 * region swaps — no full-page flash between routes. The min-height matches a
 * typical first viewport so the footer does not jump up and then back down when
 * the real content arrives.
 *
 * Static pages usually swap instantly and this is never seen; it exists for the
 * cases that are not instant — a cold ISR miss, a slow connection, a dynamic
 * route whose data has not been prefetched.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24"
    >
      {/*
       * Two rings: a static track plus one rotating arc. `border-e-transparent`
       * is the logical-property form, so the gap sits on the same visual side
       * in Arabic as it does in English.
       */}
      <span
        aria-hidden
        className="size-10 animate-spin rounded-pill border-[3px] border-primary/25 border-e-transparent motion-reduce:animate-none"
      />
      <span className="sr-only">Loading</span>

      {/* A hint of the page shape underneath, so the wait reads as "arriving"
          rather than "empty". Decorative — announced by neither of the above. */}
      <div aria-hidden className="container-reading flex w-full flex-col items-center gap-3">
        <span className="h-3 w-2/3 max-w-md animate-pulse rounded-pill bg-panel-grey motion-reduce:animate-none dark:bg-card" />
        <span className="h-3 w-1/2 max-w-sm animate-pulse rounded-pill bg-panel-grey motion-reduce:animate-none dark:bg-card" />
      </div>
    </div>
  )
}
