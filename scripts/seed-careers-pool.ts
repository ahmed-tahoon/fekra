/** Creates only the general-application pool required by the careers form. */
import { getPayload } from 'payload'
import config from '../src/payload.config'
import copy from '../src/i18n/careers.json'
import { readFileSync } from 'node:fs'
import { LOCALES } from '../src/i18n/routing'

const payload = await getPayload({ config })
const existing = await payload.find({ collection: 'jobs', where: { slug: { equals: 'future-opportunities' } }, depth: 0, limit: 1 })
if (existing.docs.length) {
  console.log('Future opportunities pool already exists; no changes made.')
} else {
  const description = (text: string) => ({ root: { type: 'root', version: 1, direction: null, format: '' as const, indent: 0, children: text.split('\n').map((line) => ({ type: 'paragraph', version: 1, direction: null, format: '' as const, indent: 0, children: [{ type: 'text', version: 1, text: line, format: 0, detail: 0, mode: 'normal', style: '' }] })) } })
  const doc = await payload.create({ collection: 'jobs', locale: 'en', depth: 0, context: { disableRevalidate: true }, data: {
    slug: 'future-opportunities', title: copy.en.future.replace(/\.+$/, ''), summary: copy.en.futureSubtitle,
    description: description(copy.en.futureBody), location: 'Remote', workModel: 'remote', employmentType: 'FULL_TIME',
    roleStatus: 'open', availableLocales: [...LOCALES], _status: 'published', publishedAt: new Date().toISOString(),
    meta: { noindex: true },
  } })
  for (const locale of LOCALES.filter((locale) => locale !== 'en')) {
    const dict = JSON.parse(readFileSync(`src/i18n/dictionaries/${locale}.json`, 'utf8'))
    await payload.update({ collection: 'jobs', id: doc.id, locale, depth: 0, context: { disableRevalidate: true }, data: {
      title: copy[locale].future.replace(/\.+$/, ''), summary: copy[locale].futureSubtitle,
      description: description(copy[locale].futureBody), location: dict.careers.workModels.remote,
    } })
  }
  console.log(`Created future opportunities application pool ${doc.id}; existing job statuses unchanged.`)
}
await payload.destroy()
