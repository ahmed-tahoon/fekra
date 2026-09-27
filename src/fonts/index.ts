import localFont from 'next/font/local'

/*
 * Self-hosted copies of the Google Fonts files (latin for Urbanist/Inter,
 * arabic for Tajawal/Plex). next/font/google broke Vercel builds under
 * Turbopack ("next/font/google queries have exactly one entry"), and local
 * files keep the build off the network. Inter and Urbanist are variable fonts,
 * so one file covers every weight.
 */
export const urbanist = localFont({
  src: './urbanist.woff2',
  weight: '100 900',
  variable: '--font-urbanist',
  display: 'swap',
})

export const inter = localFont({
  src: './inter.woff2',
  weight: '100 900',
  variable: '--font-inter',
  display: 'swap',
})

/*
 * Arabic pairing modelled on squadio.com, the reference the client pointed at.
 * Squadio sets Arabic in DIN Next(TM) Arabic — a commercial Monotype face we
 * cannot ship without a license. Tajawal is the standard free substitute: its
 * Latin is DIN-derived and the Arabic carries the same geometric, low-contrast
 * look. Their secondary face, IBM Plex Sans Arabic, is our body face already.
 * Both stay unpreloaded — most visitors never download an Arabic glyph.
 */
export const tajawal = localFont({
  src: [
    { path: './tajawal-500.woff2', weight: '500' },
    { path: './tajawal-700.woff2', weight: '700' },
    { path: './tajawal-800.woff2', weight: '800' },
  ],
  variable: '--font-tajawal',
  display: 'swap',
  preload: false,
})

export const plexArabic = localFont({
  src: [
    { path: './plex-arabic-400.woff2', weight: '400' },
    { path: './plex-arabic-500.woff2', weight: '500' },
    { path: './plex-arabic-700.woff2', weight: '700' },
  ],
  variable: '--font-plex-arabic',
  display: 'swap',
  preload: false,
})
