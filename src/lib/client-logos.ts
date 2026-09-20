import type { MediaDoc } from '@/components/blocks/types'

/** Optical corrections preserve proportions without letting broad marks dominate. */
export const clientLogoSizing: Record<string, string> = {
  ADNOC: 'p-0 dark:p-1',
  'Al Rajhi Bank': 'p-0 dark:p-1',
  Allianz: 'p-0 dark:p-1',
  STC: 'p-3 dark:p-3',
  QNB: 'p-2 dark:p-3',
}

/** Color originals; older CMS uploads were irreversibly desaturated. */
const marks: Record<string, { name: string; file: string }> = {
  ADNOC: { name: 'ADNOC', file: 'adnoc.svg' },
  NEOM: { name: 'NEOM', file: 'neom-color.webp' },
  Ooredoo: { name: 'Ooredoo', file: 'ooredoo.svg' },
  'Al Rajhi Bank': { name: 'Al Rajhi Bank', file: 'al-rajhi-color.webp' },
  STC: { name: 'STC', file: 'stc-color.webp' },
  'Kuwait Finance House': { name: 'Kuwait Finance House', file: 'kfh-color.webp' },
  Allianz: { name: 'Allianz', file: 'allianz-color.webp' },
  QNB: { name: 'QNB', file: 'qnb.svg' },
  Pitman: { name: 'Pitman', file: 'pitman-color.webp' },
  Codewave: { name: 'SLB', file: 'slb.svg' },
  Datafusion: { name: 'GOSI', file: 'gosi.svg' },
  'Smart Management Systems': { name: 'Alfanar', file: 'alfanar.svg' },
  SLB: { name: 'SLB', file: 'slb.svg' },
  GOSI: { name: 'GOSI', file: 'gosi.svg' },
  Alfanar: { name: 'Alfanar', file: 'alfanar.svg' },
}

export function clientLogo(logo: { name?: string; image?: unknown }) {
  const original = marks[logo.name ?? '']
  return original
    ? { name: original.name, image: { url: `/images/logos/${original.file}`, alt: original.name } satisfies MediaDoc }
    : { name: logo.name, image: logo.image as MediaDoc | undefined }
}
