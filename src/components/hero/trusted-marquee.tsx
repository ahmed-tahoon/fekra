// Real Fekra client logos (downloaded from fekra-egy.com). They're colored
// logos on transparent backgrounds, so each sits in a light card to read
// cleanly on the dark hero.
const CLIENTS: string[] = [
  '/images/clients/c1.webp',
  '/images/clients/c2.webp',
  '/images/clients/c3.webp',
  '/images/clients/c4.webp',
  '/images/clients/c5.webp',
  '/images/clients/c6.webp',
  '/images/clients/c7.webp',
  '/images/clients/c8.webp',
  '/images/clients/c9.webp',
  '/images/clients/c10.webp',
  '/images/clients/c11.webp',
  '/images/clients/c12.webp',
  '/images/clients/c13.webp',
  '/images/clients/c14.webp',
  '/images/clients/u1.webp',
  '/images/clients/bluehouse.svg',
  '/images/clients/astray.svg',
  '/images/clients/braintech.svg',
];

export function TrustedMarquee({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const row = [...CLIENTS, ...CLIENTS];

  // On dark backgrounds the colored logos are flattened to white; on light
  // backgrounds they keep their full color.
  const imgTone =
    tone === 'light'
      ? 'opacity-100 dark:[filter:brightness(0)_invert(1)] dark:opacity-75'
      : 'opacity-75 hover:opacity-100 [filter:brightness(0)_invert(1)]';

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)',
      }}
    >
      <ul className="trusted-track items-center gap-14 sm:gap-20">
        {row.map((src, i) => (
          <li key={i} className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt="Fekra client"
              loading="lazy"
              className={`h-12 w-auto object-contain transition-all duration-300 sm:h-14 ${imgTone}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
