/**
 * The FEKRA talent profiles shown in the home page's talent-showcase marquees.
 *
 * One list, two consumers: `src/seed/index.ts` when a fresh database is seeded,
 * and `scripts/seed-team.ts` when the live content is updated. Keeping it here
 * is what stops `pnpm seed` and the targeted seed script from drifting.
 *
 * `file` is a headshot in `public/images/people/`. The two mobile profiles and
 * the v2 portraits use generated fictional portraits.
 */
export const TEAM = [
  {
    name: 'Ahmed Nabil',
    role: 'Backend Platform Lead',
    experience: '8+ Years',
    match: 96,
    file: 'ahmed-nabil.webp',
  },
  {
    name: 'Mariam Samir',
    role: 'Senior Frontend Engineer',
    experience: '5+ Years',
    match: 94,
    file: 'mariam-samir.webp',
  },
  {
    name: 'Noha Mohamed',
    role: 'AI Solutions Engineer',
    experience: '6+ Years',
    match: 95,
    file: 'noha-mohamed.webp',
  },
  {
    name: 'Omar Tarek',
    role: 'Full Stack Product Engineer',
    experience: '6+ Years',
    match: 93,
    file: 'omar-tarek.webp',
  },
  {
    name: 'Youssef Adel',
    role: 'DevOps Automation Engineer',
    experience: '7+ Years',
    match: 92,
    file: 'youssef-adel.webp',
  },
  {
    name: 'Salma Hany',
    role: 'QA Automation Lead',
    experience: '5+ Years',
    match: 91,
    file: 'salma-hany-v2.webp',
  },
  {
    name: 'Karim Essam',
    role: 'Cloud Infrastructure Engineer',
    experience: '7+ Years',
    match: 94,
    file: 'karim-essam.webp',
  },
  {
    name: 'Sherif Hossam',
    role: 'Engineering Delivery Manager',
    experience: '14+ Years',
    match: 97,
    file: 'sherif-hossam.webp',
  },
  {
    name: 'Farah Mostafa',
    role: 'Data Pipeline Engineer',
    experience: '5+ Years',
    match: 90,
    file: 'farah-mostafa.webp',
  },
  {
    name: 'Mostafa Nabil',
    role: 'WordPress Performance Developer',
    experience: '6+ Years',
    match: 89,
    file: 'mostafa-nabil-v2.webp',
  },
  {
    name: 'Reem Ashraf',
    role: 'React Native Engineer',
    experience: '5+ Years',
    match: 92,
    file: 'reem-ashraf.webp',
  },
  {
    name: 'Mahmoud Khaled',
    role: 'Mobile Product Engineer',
    experience: '6+ Years',
    match: 91,
    file: 'mahmoud-khaled.webp',
  },
] as const

export type TeamMember = (typeof TEAM)[number]

/** Separate rosters for the two home panels, preserving every team profile. */
export function splitTalentPanels<T>(people: readonly T[]): [T[], T[]] {
  const midpoint = Math.ceil(people.length / 2)
  return [people.slice(0, midpoint), people.slice(midpoint)]
}
