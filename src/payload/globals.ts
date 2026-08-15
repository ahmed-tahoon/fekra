import type { GlobalConfig } from 'payload'

import { anyone, authenticated, isAdmin } from './access'
import { linkField, linksArray } from './fields/link'
import { revalidateGlobal } from './hooks/revalidate'

const shared = {
  access: { read: anyone, update: authenticated },
  versions: { drafts: false, max: 20 },
  hooks: { afterChange: [revalidateGlobal] },
} satisfies Partial<GlobalConfig>

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  admin: { group: 'Site' },
  ...shared,
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 8,
      labels: { singular: 'Menu item', plural: 'Menu items' },
      fields: [
        linkField(),
        {
          name: 'children',
          type: 'array',
          maxRows: 12,
          labels: { singular: 'Dropdown item', plural: 'Dropdown items' },
          fields: [linkField(), { name: 'description', type: 'text', localized: true }],
        },
      ],
    },
    linksArray('ctas', 2),
    {
      name: 'announcement',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: false },
        { name: 'text', type: 'text', localized: true },
        linkField({ name: 'link', label: 'Announcement link' }),
      ],
    },
  ],
}

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Site' },
  ...shared,
  fields: [
    { name: 'tagline', type: 'text', localized: true },
    { name: 'blurb', type: 'textarea', localized: true },
    {
      name: 'columns',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'title', type: 'text', localized: true, required: true },
        { name: 'links', type: 'array', fields: [linkField()] },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', localized: true },
        { name: 'body', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      maxRows: 6,
      fields: [linkField()],
      admin: { description: 'Privacy, cookies, terms (1.10 / 21.7).' },
    },
    { name: 'copyright', type: 'text', localized: true },
  ],
}

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Site' },
  ...shared,
  access: { read: anyone, update: isAdmin },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'FEKRA' },
            { name: 'legalName', type: 'text', defaultValue: 'Fekra' },
            { name: 'tagline', type: 'text', localized: true },
            {
              type: 'row',
              fields: [
                { name: 'logoLight', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
                { name: 'logoDark', type: 'upload', relationTo: 'media', admin: { width: '50%' } },
              ],
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              admin: { description: '1200x630. Fallback for every page without its own social image (18.7).' },
            },
            {
              name: 'socialProfiles',
              type: 'array',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: ['linkedin', 'whatsapp', 'x', 'facebook', 'instagram', 'youtube', 'github'].map((v) => ({
                    label: v,
                    value: v,
                  })),
                  required: true,
                },
                { name: 'url', type: 'text', required: true },
              ],
              admin: { description: 'Emitted as Organization.sameAs for entity disambiguation (19.4).' },
            },
          ],
        },
        {
          label: 'Contact & Offices',
          fields: [
            {
              name: 'offices',
              type: 'array',
              minRows: 1,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'city', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                    { name: 'country', type: 'text', localized: true, required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'addressLine', type: 'textarea', localized: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', type: 'text', admin: { width: '50%' } },
                    { name: 'email', type: 'email', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'countryCode', type: 'text', admin: { width: '25%' } },
                    { name: 'mapUrl', type: 'text', admin: { width: '50%' } },
                    { name: 'isHeadquarters', type: 'checkbox', admin: { width: '25%' } },
                  ],
                },
              ],
            },
            { name: 'generalEmail', type: 'email', defaultValue: 'info@fekra-egy.com' },
            {
              name: 'notificationEmails',
              type: 'text',
              hasMany: true,
              admin: { description: 'Where contact form messages are delivered (11.4).' },
            },
            {
              name: 'careersEmails',
              type: 'text',
              hasMany: true,
              admin: { description: 'Where job applications are delivered (10.6).' },
            },
          ],
        },
        {
          label: 'Integrations',
          fields: [
            {
              name: 'calendlyUrl',
              type: 'text',
              admin: { description: 'Default 30-minute booking link (12.2).' },
            },
            {
              type: 'row',
              fields: [
                { name: 'ga4MeasurementId', type: 'text', admin: { width: '33%' } },
                { name: 'gtmContainerId', type: 'text', admin: { width: '33%' } },
                { name: 'linkedinPartnerId', type: 'text', admin: { width: '33%' } },
              ],
            },
            {
              name: 'consentMode',
              type: 'select',
              defaultValue: 'opt-in',
              options: [
                { label: 'Opt-in — nothing fires before consent (EU default)', value: 'opt-in' },
                { label: 'Essential only — no analytics at all', value: 'essential' },
              ],
              admin: { description: '21.8 — controls when analytics tags are allowed to load.' },
            },
          ],
        },
        {
          label: 'SEO & Crawlers',
          fields: [
            { name: 'defaultTitleSuffix', type: 'text', localized: true, defaultValue: ' | FEKRA' },
            { name: 'defaultDescription', type: 'textarea', localized: true },
            {
              name: 'crawlerPolicy',
              type: 'group',
              admin: {
                description:
                  'Search/discovery bots are configured separately from AI training crawlers (19.8/19.9). Document the decision before launch.',
              },
              fields: [
                { name: 'allowSearchEngines', type: 'checkbox', defaultValue: true, label: 'Google / Bing / DuckDuckGo' },
                { name: 'allowAiSearchBots', type: 'checkbox', defaultValue: true, label: 'OAI-SearchBot, PerplexityBot' },
                { name: 'allowAiTrainingBots', type: 'checkbox', defaultValue: false, label: 'GPTBot, CCBot, Google-Extended' },
                { name: 'publishLlmsTxt', type: 'checkbox', defaultValue: false, label: 'Publish /llms.txt (19.5)' },
              ],
            },
            {
              name: 'searchConsoleVerification',
              type: 'text',
              admin: { description: 'google-site-verification content value (18.14).' },
            },
          ],
        },
      ],
    },
  ],
}
