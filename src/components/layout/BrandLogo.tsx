import Image from 'next/image'

/**
 * The FEKRA lockup from Figma 1:14126 — building mark, wordmark and tagline.
 * Decorative throughout: the wrapping link carries the accessible name.
 */
export function BrandLogo() {
  return (
    <span className="flex items-center gap-2">
      <Image src="/images/logo-mark.svg" alt="" width={22} height={35} aria-hidden />
      <span className="flex flex-col items-start gap-1">
        <Image
          src="/images/logo-wordmark.svg"
          alt=""
          width={113}
          height={16}
          aria-hidden
          className="dark:brightness-0 dark:invert"
        />
        <span className="text-[8px] leading-none whitespace-nowrap text-navy-800 dark:text-foreground">
          Loyalty . Innovation . Expansion
        </span>
      </span>
    </span>
  )
}
