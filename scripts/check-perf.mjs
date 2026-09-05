/**
 * Lighthouse sweep over the key public pages, mobile and desktop — checklist
 * 17.1 (speed measured before release, not after), 17.2 (Core Web Vitals lab
 * evidence) and 17.3 (Lighthouse >= 90 on key pages).
 *
 *   pnpm perf                          # the deployed site
 *   pnpm perf http://localhost:3000    # a local `pnpm build && pnpm start`
 *
 * Lighthouse is fetched through npx rather than added to package.json: it is a
 * measuring instrument run a handful of times before a launch, not something
 * the site builds or ships with.
 *
 * Writes .lighthouse/<page>-<form>.report.json (gitignored — a full report is
 * ~1 MB) and prints the table that goes into docs/PERFORMANCE.md. Delete a
 * report to re-measure that page; the run reuses whatever is already there. Never run it against `pnpm dev` — an
 * unminified development build measures nothing a visitor will ever see.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync } from 'node:fs'

const BASE = process.argv[2] ?? 'https://fekra-beige.vercel.app'
const OUT = process.argv[3] ?? '.lighthouse'

const PAGES = ['/', '/services', '/blog', '/about', '/careers', '/contact']

// The "good" thresholds from web.dev, which is what 17.2 signs off against.
const BUDGET = { lcp: 2500, cls: 0.1, tbt: 200, performance: 90 }

mkdirSync(OUT, { recursive: true })

const rows = []
for (const path of PAGES) {
  const page = path === '/' ? 'home' : path.slice(1).replace(/\//g, '-')
  for (const form of ['mobile', 'desktop']) {
    const file = `${OUT}/${page}-${form}.report.json`
    if (!existsSync(file)) {
      console.error(`… ${page} ${form}`)
      execFileSync(
        'npx',
        [
          '--yes', 'lighthouse@12', BASE + path,
          ...(form === 'desktop' ? ['--preset=desktop'] : ['--form-factor=mobile', '--screenEmulation.mobile']),
          '--output=json', `--output-path=${file}`,
          '--only-categories=performance,accessibility,best-practices,seo',
          '--chrome-flags=--headless=new --no-sandbox', '--quiet',
        ],
        { stdio: ['ignore', 'ignore', 'inherit'] },
      )
    }
    const r = JSON.parse(readFileSync(file, 'utf8'))
    const score = (k) => Math.round((r.categories[k]?.score ?? 0) * 100)
    const audit = (k) => r.audits[k]?.numericValue ?? 0
    rows.push({
      page, form,
      perf: score('performance'), a11y: score('accessibility'),
      bp: score('best-practices'), seo: score('seo'),
      lcp: audit('largest-contentful-paint'), cls: audit('cumulative-layout-shift'),
      tbt: audit('total-blocking-time'), fcp: audit('first-contentful-paint'),
      when: r.fetchTime,
    })
  }
}

const pass = (r) => r.lcp <= BUDGET.lcp && r.cls <= BUDGET.cls && r.tbt <= BUDGET.tbt && r.perf >= BUDGET.performance
console.log('\n| Page | Form factor | Perf | A11y | BP | SEO | LCP | CLS | TBT | Budget |')
console.log('|------|-------------|-----:|-----:|---:|----:|----:|----:|----:|--------|')
for (const r of rows) {
  console.log(
    `| ${r.page} | ${r.form} | ${r.perf} | ${r.a11y} | ${r.bp} | ${r.seo} | ` +
      `${(r.lcp / 1000).toFixed(2)}s | ${r.cls.toFixed(3)} | ${Math.round(r.tbt)}ms | ${pass(r) ? 'pass' : 'FAIL'} |`,
  )
}
const failed = rows.filter((r) => !pass(r))
console.log(`\n${rows.length - failed.length}/${rows.length} within budget (LCP <= 2.5s, CLS <= 0.1, TBT <= 200ms, performance >= 90).`)
process.exit(failed.length ? 1 : 0)
