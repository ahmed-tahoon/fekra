import type { CollectionConfig } from 'payload'

import { authenticated, isAdmin, noPublicRead } from '../access'

/** Shared attribution fields — kept out of analytics events, stored with the lead (22.9). */
const attribution: CollectionConfig['fields'] = [
  {
    type: 'collapsible',
    label: 'Attribution',
    admin: { initCollapsed: true },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'locale', type: 'text', admin: { width: '25%', readOnly: true } },
          { name: 'sourcePath', type: 'text', admin: { width: '75%', readOnly: true } },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'utmSource', type: 'text', admin: { width: '33%', readOnly: true } },
          { name: 'utmMedium', type: 'text', admin: { width: '33%', readOnly: true } },
          { name: 'utmCampaign', type: 'text', admin: { width: '33%', readOnly: true } },
        ],
      },
      { name: 'referrer', type: 'text', admin: { readOnly: true } },
    ],
  },
]

/**
 * CV files. Private on purpose (21.4): the collection is not publicly readable
 * and the S3 plugin serves it through short-lived signed URLs, so a leaked
 * object key is not a leaked CV.
 */
export const ApplicantFiles: CollectionConfig = {
  slug: 'applicant-files',
  labels: { singular: 'CV file', plural: 'CV files' },
  admin: { group: 'Submissions', hidden: ({ user }) => user?.role !== 'admin' },
  access: { read: noPublicRead, create: authenticated, update: () => false, delete: isAdmin },
  upload: {
    mimeTypes: [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    // Object storage in every environment that has it; local disk only when a
    // developer is running without S3, so uploads still work offline.
    disableLocalStorage: Boolean(process.env.S3_BUCKET),
    staticDir: '.uploads/applicant-files',
  },
  fields: [{ name: 'originalName', type: 'text', admin: { readOnly: true } }],
}

export const JobApplications: CollectionConfig = {
  slug: 'job-applications',
  labels: { singular: 'Application', plural: 'Applications' },
  admin: {
    group: 'Submissions',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'job', 'status', 'createdAt'],
  },
  access: { read: noPublicRead, create: authenticated, update: authenticated, delete: isAdmin },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'linkedin', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'job', type: 'relationship', relationTo: 'jobs', required: true },
    { name: 'cv', type: 'upload', relationTo: 'applicant-files', required: true },
    { name: 'coverNote', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'reviewing', 'interviewing', 'rejected', 'hired'].map((v) => ({ label: v, value: v })),
      admin: { position: 'sidebar' },
    },
    // 10.7 — hash of (email + job) so a double submit is rejected by the DB, not by JS.
    { name: 'dedupeKey', type: 'text', unique: true, index: true, admin: { hidden: true } },
    ...attribution,
  ],
}

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact message', plural: 'Contact messages' },
  admin: {
    group: 'Submissions',
    useAsTitle: 'subject',
    defaultColumns: ['fullName', 'email', 'subject', 'status', 'createdAt'],
  },
  access: { read: noPublicRead, create: authenticated, update: authenticated, delete: isAdmin },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'fullName', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '50%' } },
        { name: 'company', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'subject', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: ['new', 'replied', 'closed', 'spam'].map((v) => ({ label: v, value: v })),
      admin: { position: 'sidebar' },
    },
    ...attribution,
  ],
}
