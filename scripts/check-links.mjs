#!/usr/bin/env node
/**
 * Pre-launch crawl (20.9 / 24.12). Starts from sitemap.xml, follows internal
 * links and reports anything that is not 200, plus placeholder hrefs.
 *
 *   pnpm check:links                     # http://localhost:3000
 *   pnpm check:links https://fekra-egy.com
 *
 * ponytail: single-threaded with a small concurrency window — a few hundred
 * pages take a minute, which is fine for a pre-launch gate. Reach for a real
 * crawler only if the site outgrows that.
 */
const base = (process.argv[2] ?? 'http://localhost:3000').replace(/\/$/, '')
const CONCURRENCY = 6

const seen = new Set()
const queue = []
const problems = []

const isInternal = (url) => url.startsWith(base)

async function seedFromSitemap() {
  const res = await fetch(`${base}/sitemap.xml`)
  if (!res.ok) {
    problems.push({ url: `${base}/sitemap.xml`, status: res.status, from: '(sitemap)' })
    return
  }
  const xml = await res.text()
  for (const [, loc] of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) enqueue(loc, 'sitemap.xml')
}

function enqueue(url, from) {
  const clean = url.split('#')[0]
  if (!clean || seen.has(clean)) return
  seen.add(clean)
  queue.push({ url: clean, from })
}

async function visit({ url, from }) {
  let res
  try {
    res = await fetch(url, { redirect: 'manual' })
  } catch (error) {
    problems.push({ url, status: 'FETCH_FAILED', from, detail: error.message })
    return
  }

  if (res.status >= 300 && res.status < 400) {
    const target = res.headers.get('location')
    // 20.4 — internal links should point at the destination, not at a redirect.
    problems.push({ url, status: res.status, from, detail: `redirects to ${target}` })
    if (target) enqueue(new URL(target, url).toString(), url)
    return
  }

  if (!res.ok) {
    problems.push({ url, status: res.status, from })
    return
  }

  if (!isInternal(url) || !res.headers.get('content-type')?.includes('text/html')) return

  const html = await res.text()
  for (const [, href] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    if (/^(javascript:|#|mailto:|tel:)/.test(href)) {
      if (href === '#' || href.startsWith('javascript:')) {
        problems.push({ url: href, status: 'PLACEHOLDER', from: url })
      }
      continue
    }
    const absolute = new URL(href, url).toString()
    if (isInternal(absolute)) enqueue(absolute, url)
  }
}

await seedFromSitemap()

while (queue.length) {
  await Promise.all(queue.splice(0, CONCURRENCY).map(visit))
}

console.log(`Crawled ${seen.size} URLs from ${base}`)
if (!problems.length) {
  console.log('No broken links, redirect hops or placeholder hrefs found.')
  process.exit(0)
}

console.error(`\n${problems.length} problem(s):`)
for (const p of problems) console.error(`  [${p.status}] ${p.url}\n      linked from ${p.from}${p.detail ? ` — ${p.detail}` : ''}`)
process.exit(1)
