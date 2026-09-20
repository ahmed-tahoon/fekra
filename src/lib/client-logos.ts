import type { MediaDoc } from '@/components/blocks/types'

/** Color originals; older CMS uploads were irreversibly desaturated. */
const marks: Record<string, { name: string; file: string; width?: number; height?: number }> = {
  ADNOC: { name: 'ADNOC', file: 'adnoc.svg', width: 76, height: 114 },
  NEOM: { name: 'NEOM', file: 'neom-color.webp', width: 149, height: 143 },
  Ooredoo: { name: 'Ooredoo', file: 'ooredoo.svg', width: 154, height: 30 },
  'Al Rajhi Bank': { name: 'Al Rajhi Bank', file: 'al-rajhi-color.webp', width: 678, height: 697 },
  STC: { name: 'STC', file: 'stc-color.webp', width: 143, height: 75 },
  'Kuwait Finance House': { name: 'Kuwait Finance House', file: 'kfh-color.webp', width: 211, height: 211 },
  Allianz: { name: 'Allianz', file: 'allianz-color.webp', width: 112, height: 113 },
  QNB: { name: 'QNB', file: 'qnb.svg', width: 2550, height: 744 },
  Pitman: { name: 'Pitman', file: 'pitman-color.webp', width: 203, height: 49 },
  Codewave: { name: 'SLB', file: 'slb.svg', width: 1000, height: 600 },
  Datafusion: { name: 'GOSI', file: 'gosi.svg', width: 90, height: 65 },
  'Smart Management Systems': { name: 'Alfanar', file: 'alfanar.svg', width: 288, height: 85 },
  SLB: { name: 'SLB', file: 'slb.svg', width: 1000, height: 600 },
  GOSI: { name: 'GOSI', file: 'gosi.svg', width: 90, height: 65 },
  Alfanar: { name: 'Alfanar', file: 'alfanar.svg', width: 288, height: 85 },
}

export function clientLogo(logo: { name?: string; image?: unknown }) {
  const original = marks[logo.name ?? '']
  return original
    ? { name: original.name, image: { url: `/images/logos/${original.file}`, alt: original.name, width: original.width, height: original.height } satisfies MediaDoc }
    : { name: logo.name, image: logo.image as MediaDoc | undefined }
}
