/** Add website terms and align the existing policies with direct booking and editable consent. */
import { mkdirSync, writeFileSync } from 'node:fs'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const write = process.argv.includes('--write')
const payload = await getPayload({ config })
const slugs = ['privacy-policy', 'cookie-policy', 'terms-and-conditions']
const { docs } = await payload.find({ collection: 'pages', locale: 'en', depth: 0, limit: 10, where: { slug: { in: slugs } } })
if (write) {
  const backup = `/private/tmp/fekra-legal-backup-${Date.now()}`
  mkdirSync(backup, { mode: 0o700 })
  writeFileSync(`${backup}/pages.json`, JSON.stringify(docs, null, 2), { mode: 0o600 })
  console.log(`Backup: ${backup}/pages.json`)
}
for (const page of docs) {
  let changes = 0
  const visit = (value: unknown): unknown => {
    if (typeof value === 'string') {
      let replacement = value
      if (value.startsWith('Delete the fekra_consent cookie')) replacement = 'Open Cookie Preferences in the footer at any time to review or change your analytics and marketing choices. Save your preferences to apply them. Withdrawing consent stops optional tools from loading on subsequent page loads. Your browser settings also let you clear cookies already stored on your device.'
      if (value.startsWith('Calendly sets its own cookies')) replacement = 'Booking buttons take you directly to Calendly. Calendly manages cookies and personal information on its own website under its own policies; accepting marketing cookies on FEKRA is not required to book.'
      if (value.startsWith('Meeting booking is handled by Calendly.')) replacement = 'Meeting booking is handled on Calendly’s website. The name, email address and booking details you submit there go to Calendly as our scheduling provider and to FEKRA as the meeting organiser, under Calendly’s privacy terms as well as this policy.'
      if (value.startsWith('fekra_consent —')) replacement = 'fekra_consent — remembers your analytics and marketing choices for 6 months. NEXT_LOCALE remembers your chosen website language for up to 1 year.'
      if (value.startsWith('At the moment no analytics or marketing tool')) replacement = 'When analytics or marketing tools are enabled, they load only after you accept the relevant category. You can change each category separately through Cookie Preferences in the footer.'
      if (replacement !== value) changes++
      return replacement
    }
    if (Array.isArray(value)) return value.map(visit)
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, visit(val)]))
    return value
  }
  const layout = visit(page.layout)
  console.log(`${page.slug}: ${changes} policy updates`)
  if (write && changes) await payload.update({ collection: 'pages', id: page.id, locale: 'en', data: { layout: layout as never, _status: page._status } })
}
const text = (value: string) => ({ type: 'text', text: value, format: 0, style: '', mode: 'normal', detail: 0, version: 1 })
const content = [
  ['Using this website', 'These terms govern access to the FEKRA website and its content. Use the website lawfully and in a way that respects the rights of FEKRA and other people. If you do not agree with these terms, please stop using the website.'],
  ['Information and service enquiries', 'The website describes our technology services and career opportunities for general information. Sending an enquiry, applying for a role or booking a call does not create an employment relationship or a services contract. The scope, pricing and delivery terms of any engagement are agreed separately in writing.'],
  ['Website content and brand assets', 'Website content is owned by FEKRA or used with permission. You may read and share links to publicly available pages. Reproducing, distributing or using our content commercially requires permission unless applicable law permits it. Client logos and other third-party trademarks belong to their respective owners.'],
  ['Acceptable use', 'Do not attempt to gain unauthorised access, disrupt the website, upload malicious files, submit misleading information or use forms to send spam. We may restrict access where necessary to protect the website and its users.'],
  ['Accuracy and availability', 'We aim to keep website information accurate and current, but content, services and role availability may change. We may correct errors or update or suspend parts of the website. Please confirm details with our team before relying on them for a business decision.'],
  ['External websites', 'Links to external websites, including Calendly and social platforms, are provided for convenience. Those websites operate under their own terms and privacy policies. FEKRA does not control their content or availability.'],
  ['Privacy and cookies', 'Our Privacy Policy explains how we handle information submitted through this website. Our Cookie Policy describes cookies and related technologies. You can review or change optional cookie choices using Cookie Preferences in the footer.'],
  ['Changes and contact', 'We may update these website terms when the website or its operation changes. The current version is published on this page. For questions about these terms, contact info@fekra-egy.com. These terms do not restrict any rights that cannot be excluded under applicable law.'],
]
if (!docs.some((page) => page.slug === 'terms-and-conditions')) {
  console.log('Create /terms-and-conditions')
  if (write) await payload.create({ collection: 'pages', locale: 'en', data: {
    title: 'Terms & Conditions', slug: 'terms-and-conditions', _status: 'published', availableLocales: ['en'],
    meta: { title: 'Terms & Conditions', description: 'Terms governing use of the FEKRA website, its content, enquiries and external links.' },
    layout: [
      { blockType: 'hero', heading: 'Terms & Conditions', body: 'Terms governing the use of the FEKRA website and its content. Updated 20 September 2026.' },
      { blockType: 'richText', content: { root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: content.flatMap(([title, body]) => [
        { type: 'heading', tag: 'h2', format: '', indent: 0, version: 1, direction: 'ltr', children: [text(title!)] },
        { type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [text(body!)] },
      ]) } } },
    ],
  } as never })
}
console.log(write ? 'Legal updates applied.' : 'Dry run. Use --write to apply.')
process.exit(0)
