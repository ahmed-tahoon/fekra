/** Apply the reviewed translation fixture, retaining each article's Lexical structure.
 * node --env-file=.env.local --import=tsx/esm scripts/translate-blog.ts [--write]
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const locales = ['ar', 'de', 'fr', 'es'] as const
type Locale = typeof locales[number]
type Translation = { title: string; excerpt: string; tags: string[]; nodes: string[] }
const translations = JSON.parse(readFileSync('scripts/translations/blog.json', 'utf8')) as Record<string, Record<Locale, Translation>>
const categoryNames: Record<string, Record<Locale, string>> = {
  quality: { ar: 'الجودة', de: 'Qualität', fr: 'Qualité', es: 'Calidad' },
  ai: { ar: 'الذكاء الاصطناعي', de: 'KI', fr: 'IA', es: 'IA' },
  hiring: { ar: 'التوظيف', de: 'Personalgewinnung', fr: 'Recrutement', es: 'Contratación' },
  outsourcing: { ar: 'التعهيد', de: 'Outsourcing', fr: 'Externalisation', es: 'Externalización' },
  engineering: { ar: 'الهندسة', de: 'Engineering', fr: 'Ingénierie', es: 'Ingeniería' },
}
const write = process.argv.includes('--write')
const payload = await getPayload({ config })
const posts = await payload.find({ collection: 'posts', locale: 'all', depth: 0, limit: 100, where: { _status: { equals: 'published' } } })
const categories = await payload.find({ collection: 'categories', locale: 'all', depth: 0, limit: 100 })
if (write) {
  const backup = `/private/tmp/fekra-blog-backup-${Date.now()}`
  mkdirSync(backup, { mode: 0o700 })
  writeFileSync(`${backup}/content.json`, JSON.stringify({ posts: posts.docs, categories: categories.docs }, null, 2), { mode: 0o600 })
  console.log(`Backup: ${backup}/content.json`)
}
for (const post of posts.docs) {
  const source = await payload.findByID({ collection: 'posts', id: post.id, locale: 'en', fallbackLocale: false, depth: 0 })
  const localized = translations[source.slug]
  if (!localized) throw new Error(`Missing translations for ${source.slug}`)
  for (const locale of locales) {
    const translation = localized[locale]
    let index = 0
    const visit = (value: unknown): unknown => {
      if (Array.isArray(value)) return value.map(visit)
      if (!value || typeof value !== 'object') return value
      const node = value as Record<string, unknown>
      const result = Object.fromEntries(Object.entries(node).map(([key, val]) => [key, visit(val)]))
      if (node.type === 'text') {
        if (!translation.nodes[index]) throw new Error(`Missing text ${source.slug}/${locale}/${index}`)
        result.text = translation.nodes[index++]
      }
      if ('direction' in node) result.direction = locale === 'ar' ? 'rtl' : 'ltr'
      return result
    }
    const content = visit(source.content)
    if (index !== translation.nodes.length) throw new Error(`Node count mismatch ${source.slug}/${locale}`)
    console.log(`${source.slug} [${locale}]: ${index} translated text nodes`)
    if (write) await payload.update({ collection: 'posts', id: source.id, locale, data: {
      title: translation.title, excerpt: translation.excerpt, tags: translation.tags,
      content: content as never, meta: { title: translation.title, description: translation.excerpt },
      _status: source._status,
    } })
  }
  if (write) await payload.update({ collection: 'posts', id: source.id, data: { availableLocales: ['en', ...locales], _status: source._status } })
}
for (const category of categories.docs) {
  const names = categoryNames[category.slug]
  if (!names) throw new Error(`Missing category translation: ${category.slug}`)
  for (const locale of locales) if (write) await payload.update({ collection: 'categories', id: category.id, locale, data: { title: names[locale] } })
}
console.log(write ? 'Blog translations applied.' : 'Dry run complete. Use --write to apply.')
process.exit(0)
