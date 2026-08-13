/*
 * Copies files already written to local disk up into the bucket, under the same
 * keys Payload will look for once S3_BUCKET is set. Without this, every media
 * row created before the switch points at an object that does not exist and
 * 404s — the database rows are fine, only the bytes are in the wrong place.
 *
 *   pnpm sync:uploads              # media only
 *   pnpm sync:uploads applications # CVs — personal data, opt in explicitly
 *   pnpm sync:uploads --force      # re-upload objects that already exist
 */
import { S3Client, HeadObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { readdir, readFile, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname } from 'node:path'

// Local staticDir -> the prefix configured for that collection in payload.config.
const SETS = {
  media: { dir: '.uploads/media', prefix: 'media' },
  applications: { dir: '.uploads/applicant-files', prefix: 'applications' },
}

const TYPES = {
  '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.svg': 'image/svg+xml', '.gif': 'image/gif',
  '.avif': 'image/avif', '.pdf': 'application/pdf', '.mp4': 'video/mp4',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}

const args = process.argv.slice(2)
const force = args.includes('--force')
const wanted = args.filter((a) => !a.startsWith('--'))
const sets = wanted.length ? wanted : ['media']

for (const name of sets) {
  if (!SETS[name]) {
    console.error(`\n  Unknown set "${name}". Known: ${Object.keys(SETS).join(', ')}\n`)
    process.exit(1)
  }
}

const bucket = process.env.S3_BUCKET
if (!bucket) {
  console.error('\n  S3_BUCKET is not set — uncomment it in .env.local once the keys are in.\n')
  process.exit(1)
}

const client = new S3Client({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  forcePathStyle: Boolean(process.env.S3_ENDPOINT),
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const exists = async (Key) => {
  try {
    await client.send(new HeadObjectCommand({ Bucket: bucket, Key }))
    return true
  } catch {
    return false
  }
}

let uploaded = 0
let skipped = 0
let failed = 0

for (const name of sets) {
  const { dir, prefix } = SETS[name]
  if (!existsSync(dir)) {
    console.log(`\n  ${dir} does not exist — nothing to sync for "${name}".`)
    continue
  }

  const names = (await readdir(dir)).filter((f) => !f.startsWith('.'))
  console.log(`\n  ${name}: ${names.length} files from ${dir} -> ${bucket}/${prefix}/`)

  for (const file of names) {
    const path = join(dir, file)
    if (!(await stat(path)).isFile()) continue
    const Key = `${prefix}/${file}`

    if (!force && (await exists(Key))) {
      skipped++
      continue
    }
    try {
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key,
          Body: await readFile(path),
          ContentType: TYPES[extname(file).toLowerCase()] || 'application/octet-stream',
        }),
      )
      uploaded++
    } catch (error) {
      failed++
      console.log(`    FAIL ${Key} — ${error.name}: ${error.message}`)
    }
  }
}

console.log(`\n  uploaded ${uploaded}   already there ${skipped}   failed ${failed}\n`)
process.exit(failed ? 1 : 0)
