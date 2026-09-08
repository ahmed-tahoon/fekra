/**
 * The FEKRA engineers shown in the home page's talent-showcase marquees.
 *
 * One list, two consumers: `src/seed/index.ts` when a fresh database is seeded,
 * and `scripts/seed-team.ts` when the live content is updated. Keeping it here
 * is what stops `pnpm seed` from putting the old demo engineers back over the
 * real team.
 *
 * `file` is a headshot in `public/images/people/`; `null` means no photo was
 * supplied and the card falls back to an initial in a brand circle.
 *
 * No `match` percentage: the client's list has none, and inventing one against
 * a real employee's name is not something to do silently. The chip only renders
 * when the field has a value.
 */
export const TEAM = [
  { name: 'Ahmed Nabil', role: 'Senior Backend Engineer', experience: '8+ Years', file: 'ahmed-nabil.webp' },
  { name: 'Mariam Samir', role: 'Frontend Engineer', experience: '5+ Years', file: 'mariam-samir.webp' },
  { name: 'Noha Mohamed', role: 'AI Engineer', experience: '6+ Years', file: 'noha-mohamed.webp' },
  { name: 'Omar Tarek', role: 'Full Stack Developer', experience: '6+ Years', file: 'omar-tarek.webp' },
  { name: 'Youssef Adel', role: 'DevOps Engineer', experience: '7+ Years', file: 'youssef-adel.webp' },
  { name: 'Salma Hany', role: 'QA Automation Engineer', experience: '5+ Years', file: 'salma-hany.webp' },
  { name: 'Karim Essam', role: 'Cloud Engineer', experience: '7+ Years', file: 'karim-essam.webp' },
  { name: 'Sherif Hossam', role: 'Engineering Manager', experience: '14+ Years', file: 'sherif-hossam.webp' },
  { name: 'Farah Mostafa', role: 'Data Engineer', experience: '5+ Years', file: 'farah-mostafa.webp' },
  { name: 'Mostafa Nabil', role: 'WordPress Developer', experience: '6+ Years', file: 'mostafa-nabil.webp' },
  { name: 'Reem Ashraf', role: 'React Native Developer', experience: '5+ Years', file: null },
  { name: 'Mahmoud Khaled', role: 'Mobile App Developer', experience: '6+ Years', file: null },
] as const

export type TeamMember = (typeof TEAM)[number]
