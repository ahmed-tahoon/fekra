import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })

const before = await payload.findGlobal({ slug: 'header', depth: 0, locale: 'en' })
const items = (before.items ?? []) as Record<string, unknown>[]
const ctas = (before.ctas ?? []) as Record<string, unknown>[]

const label = (row: Record<string, unknown>) =>
  ((row.link as Record<string, unknown> | undefined)?.label as string) ?? '?'

console.log('BEFORE items:', items.map(label))
console.log('BEFORE ctas :', ctas.map(label))

const strip = (row: Record<string, unknown>) => row

const navItem = (text: string, route: string) => ({
  link: { type: 'route', label: text, route, newTab: false },
  children: [],
})

// Comp order: Home, Services, About, Blog, careers, Contact Us, Meet Fika AI.
const servicesAt = items.findIndex((i) => label(i).toLowerCase() === 'services')
const insertAt = servicesAt >= 0 ? servicesAt + 1 : 1

const nextItems = [
  ...items.slice(0, insertAt).map(strip),
  navItem('About', '/about'),
  ...items.slice(insertAt).map(strip),
  navItem('Meet Fika AI', '/meet-fika-ai'),
]

const nextCtas = ctas.map((c) => {
  const row = strip(c)
  const link = { ...(row.link as Record<string, unknown>) }
  if (typeof link.label === 'string' && /meeting/i.test(link.label)) {
    link.label = 'Book A 30 Min. Call'
  }
  return { ...row, link }
})

console.log('AFTER  items:', nextItems.map(label))
console.log('AFTER  ctas :', nextCtas.map(label))

if (process.env.APPLY !== 'true') {
  console.log('\nDRY RUN — nothing written. Set APPLY=true to commit.')
  process.exit(0)
}

await payload.updateGlobal({
  slug: 'header',
  locale: 'en',
  context: { disableRevalidate: true },
  data: { items: nextItems, ctas: nextCtas } as never,
})

const after = await payload.findGlobal({ slug: 'header', depth: 0, locale: 'en' })
console.log('\nWRITTEN items:', ((after.items ?? []) as Record<string, unknown>[]).map(label))
console.log('WRITTEN ctas :', ((after.ctas ?? []) as Record<string, unknown>[]).map(label))
console.log('WRITTEN children:', ((after.items ?? []) as Record<string, unknown>[]).map(
  (i) => `${label(i)}=${((i.children ?? []) as unknown[]).length}`,
))
process.exit(0)
