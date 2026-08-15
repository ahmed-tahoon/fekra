/*
 * Proves the Supabase Storage setup end to end before anything depends on it:
 * credentials, region signing, path style, and that the bucket exists and is
 * writable. Payload surfaces all four failures as the same opaque 403 on
 * upload, which is a miserable thing to debug through the admin UI.
 *
 *   pnpm check:storage
 */
import { S3Client, HeadBucketCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'

const need = ['S3_BUCKET', 'S3_REGION', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY']
const missing = need.filter((k) => !process.env[k]?.trim())

if (missing.length) {
  console.error(`\n  Missing: ${missing.join(', ')}`)
  console.error('  Set them in .env.local — see .env.example for where each value comes from.\n')
  process.exit(1)
}

const bucket = process.env.S3_BUCKET
const endpoint = process.env.S3_ENDPOINT
const region = process.env.S3_REGION

if (/supabase\.(co|in)/.test(endpoint ?? '') && region === 'auto') {
  console.error('\n  S3_REGION is "auto". Supabase signs against the real region, e.g. eu-north-1.\n')
  process.exit(1)
}

const client = new S3Client({
  region,
  endpoint,
  // Supabase and R2 both address buckets by path, not by subdomain.
  forcePathStyle: Boolean(endpoint),
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const key = `.preflight/check-${process.pid}.txt`
const body = 'fekra storage preflight'
let failed = false

const step = async (label, fn) => {
  try {
    await fn()
    console.log(`  ok    ${label}`)
  } catch (error) {
    failed = true
    console.log(`  FAIL  ${label}`)
    console.log(`        ${error.name}: ${error.message}`)
  }
}

console.log(`\n  bucket   ${bucket}`)
console.log(`  region   ${region}`)
console.log(`  endpoint ${endpoint || 'AWS default'}\n`)

await step('bucket reachable', () => client.send(new HeadBucketCommand({ Bucket: bucket })))
await step('write object', () =>
  client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: body, ContentType: 'text/plain' })),
)
await step('read it back', async () => {
  const res = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
  const text = await res.Body.transformToString()
  if (text !== body) throw new Error(`content mismatch: ${JSON.stringify(text)}`)
})
// Always attempt cleanup, even if an earlier step failed and left the object.
await step('delete it', () => client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key })))

if (failed) {
  console.log('\n  Storage is NOT ready. Uploads would fail.\n')
  process.exit(1)
}
console.log('\n  Storage is ready — uploads will go to this bucket.\n')
