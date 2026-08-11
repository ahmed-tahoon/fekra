import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'

/**
 * Holding page shown for every public route while `COMING_SOON=true`.
 *
 * Static and dependency-free on purpose: it must render even if the database is
 * down or empty, which is exactly the situation a holding page exists for. The
 * contact details are hard-coded here rather than read from Site Settings for
 * the same reason.
 */
export const dynamic = 'force-static'

const OFFICES = [
  { city: 'Cairo', country: 'Egypt', hq: true },
  { city: 'Riyadh', country: 'Saudi Arabia' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'London', country: 'UK' },
  { city: 'New York', country: 'USA' },
]

export default function ComingSoonPage() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-5 py-16">
      {/* Brand aurora — pure CSS, no image request, no layout cost. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/25" />
        <div className="absolute -bottom-52 -left-40 size-[34rem] rounded-full bg-navy-500/10 blur-3xl dark:bg-brand-900/30" />
        <div className="absolute -right-40 bottom-0 size-[30rem] rounded-full bg-brand-100/50 blur-3xl dark:bg-brand-900/20" />
      </div>

      <div className="relative w-full max-w-3xl text-center">
        <Image
          src="/images/fekra-logo.webp"
          alt="FEKRA"
          width={663}
          height={198}
          priority
          className="mx-auto h-20 w-auto dark:hidden"
        />
        <Image
          src="/images/fekra-logo-white.webp"
          alt="FEKRA"
          width={680}
          height={199}
          priority
          className="mx-auto hidden h-20 w-auto dark:block"
        />

    
        <h1 className="mt-6 text-4xl leading-[1.1] text-balance md:text-5xl lg:text-6xl">
          Something new is
          <span className="text-primary"> on the way</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          We are rebuilding fekra-egy.com. In the meantime our teams are still shipping — reach out
          and we will get straight back to you.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:info@fekra-egy.com"
            className="inline-flex min-h-12 items-center gap-2 rounded-pill bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Mail className="size-4" aria-hidden />
            info@fekra-egy.com
          </a>
          <a
            href="tel:+201101133572"
            className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-border bg-card px-6 text-sm font-semibold transition-colors hover:bg-background-subtle"
          >
            <Phone className="size-4" aria-hidden />
            <span dir="ltr">+20 110 113 3572</span>
          </a>
        </div>

        <ul className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          {OFFICES.map((office) => (
            <li key={office.city} className="flex items-center gap-1.5">
              <MapPin className="size-3.5 text-primary" aria-hidden />
              {office.city}
              {office.hq ? <span className="text-xs opacity-70">(HQ)</span> : null}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs tracking-[0.2em] text-muted-foreground uppercase">
          Loyalty · Innovation · Expansion
        </p>
      </div>
    </main>
  )
}
