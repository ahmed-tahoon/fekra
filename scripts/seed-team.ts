/**
 * Puts distinct FEKRA talent profiles into the two talent-showcase marquees on the
 * home page, and uploads their headshots to Media.
 *
 *   pnpm seed:team          # dry run
 *   pnpm seed:team --write  # apply
 *
 * The roster itself is `src/seed/team.ts`, shared with `pnpm seed` so a fresh
 * database and the live one cannot end up with different people.
 *
 * Idempotent: an avatar already in Media is reused rather than uploaded again,
 * and the people array is replaced wholesale, so re-running lands the same
 * state instead of stacking duplicates.
 *
 * Only the `people` array of the two `talentShowcase` blocks is touched. Every
 * other block is written back with the `id` it was read with, so Payload
 * matches the rows it already has and the Arabic, German, French and Spanish
 * values of their localized fields survive the update.
 *
 * Existing profile copy and row IDs are preserved; only panel membership and
 * avatars change. New profiles use the shared seed defaults.
 *
 * `experience` is NOT a localized field, so whatever goes in here shows in all
 * five languages. English is the honest choice — the previous seed had Arabic
 * values ("+٣ سنوات") rendering on the English home page.
 */
import { existsSync } from 'fs'
import { join } from 'path'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import { TEAM, splitTalentPanels, type TeamMember } from '../src/seed/team'

type Person = TeamMember

const run = async () => {
  const write = process.argv.includes('--write')
  const payload = await getPayload({ config })

  // --- avatars -------------------------------------------------------------
  const avatars = new Map<string, number>()
  for (const person of TEAM) {
    if (!person.file) continue

    const path = join(process.cwd(), 'public', 'images', 'people', person.file)
    if (!existsSync(path)) throw new Error(`missing headshot: ${path}`)

    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: person.file } },
      limit: 1,
      depth: 0,
    })
    if (existing.docs[0]) {
      avatars.set(person.name, existing.docs[0].id as number)
      console.log(`  ${person.file.padEnd(22)} already in Media (id ${existing.docs[0].id})`)
      continue
    }

    if (!write) {
      console.log(`  ${person.file.padEnd(22)} would upload`)
      continue
    }

    const media = await payload.create({
      collection: 'media',
      data: { alt: `${person.name}, ${person.role} at FEKRA` },
      filePath: path,
      context: { disableRevalidate: true },
    })
    avatars.set(person.name, media.id as number)
    console.log(`  ${person.file.padEnd(22)} uploaded (id ${media.id})`)
  }

  const row = (person: Person) => ({
    name: person.name,
    role: person.role,
    experience: person.experience,
    match: person.match,
    evaluated: true,
    avatar: avatars.get(person.name) ?? null,
  })

  // --- the two marquees ----------------------------------------------------
  const home = (
    await payload.find({ collection: 'pages', where: { slug: { equals: 'home' } }, limit: 1, depth: 0 })
  ).docs[0]
  if (!home) throw new Error('no page with slug "home"')

  type ExistingPerson = ReturnType<typeof row> & { id?: string }
  const layout = (home as { layout: { blockType: string; people?: ExistingPerson[] }[] }).layout
  const showcases = layout.filter((block) => block.blockType === 'talentShowcase')
  if (showcases.length !== 2) throw new Error('expected exactly two home talentShowcase blocks')
  const rosters = splitTalentPanels(TEAM)

  console.log(
    `\n${showcases.length} talent showcase(s) on /: ` +
      showcases.map((s) => `${(s.people ?? []).length} people`).join(', ') +
      ` -> ${rosters.map((roster) => roster.length).join(' and ')} distinct people`,
  )
  for (const person of TEAM) {
    console.log(
      `  ${person.name.padEnd(16)} ${person.role.padEnd(26)} ${person.experience.padEnd(10)}` +
        `${person.file ? '' : '(initial, no headshot)'}`,
    )
  }

  if (!write) {
    console.log('\nDry run. Re-run with --write to apply.')
    process.exit(0)
  }

  let showcaseIndex = 0
  const next = layout.map((block) => {
    if (block.blockType !== 'talentShowcase') return block
    const roster = rosters[showcaseIndex++]
    if (!roster) throw new Error('missing talent panel roster')
    return {
      ...block,
      people: roster.map((person) => {
        const existing = block.people?.find((entry) => entry.name === person.name)
        // Keep IDs and existing copy so localized profile fields survive.
        return existing
          ? { ...existing, avatar: avatars.get(person.name) ?? existing.avatar }
          : row(person)
      }),
    }
  })

  await payload.update({
    collection: 'pages',
    id: home.id,
    data: { layout: next } as never,
    context: { disableRevalidate: true },
  })

  const check = await payload.findByID({ collection: 'pages', id: home.id, depth: 0 })
  const after = (check as { layout: { blockType: string; people?: unknown[] }[] }).layout.filter(
    (b) => b.blockType === 'talentShowcase',
  )
  console.log(
    `\n${check._status} — ${after.map((b) => (b.people ?? []).length).join(' and ')} people in the marquees.`,
  )
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
