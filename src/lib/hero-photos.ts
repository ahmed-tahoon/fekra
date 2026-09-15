/** Generated editorial images for the default hero, in photo-slot order.
 * The people are synthetic, not portraits of FEKRA employees.
 * Custom CMS uploads keep their own image and alternative text. */
export const HERO_PHOTOS = [
  { file: 'egypt-developer-window.webp', alt: 'Developer working at a laptop beside an office window' },
  { file: 'egypt-developer-focus.webp', alt: 'Developer concentrating at her desk' },
  { file: 'egypt-courtyard-pair.webp', alt: 'Two developers discussing work in an office courtyard' },
  { file: 'egypt-team-discussion.webp', alt: 'Developers discussing a project in a shared workspace' },
  { file: 'egypt-engineer-office.webp', alt: 'Engineer working in a shared office' },
  { file: 'egypt-pair-programming.webp', alt: 'Two engineers reviewing code together at a laptop' },
  { file: 'egypt-senior-engineer.webp', alt: 'Senior engineer concentrating on his laptop' },
  { file: 'egypt-terrace-developer.webp', alt: 'Developer working on a shaded office terrace' },
  { file: 'egypt-team-planning.webp', alt: 'A development team planning work around a whiteboard' },
] as const

const LEGACY_PHOTO = /^(?:tile-0[1-9]|developer-workspace-side|developer-desk-bright|team-standup-review|team-focus-coworking|developer-coding-window|team-pairing-session|team-planning-session|developer-desk-portrait|team-review-huddle|team-lounge-pair)(?:-\d+)?\.(?:png|webp|jpe?g)$/i

export function defaultHeroPhoto(url: string | null | undefined, photoIndex: number) {
  const filename = (url ?? '').split(/[?#]/)[0]!.split('/').pop() ?? ''
  const photo = HERO_PHOTOS[photoIndex]
  if (!photo || (url && !LEGACY_PHOTO.test(filename))) return undefined
  return { url: `/images/hero/${photo.file}`, alt: photo.alt }
}
