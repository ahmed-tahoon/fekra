import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3000'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local QA only')
const out = process.argv[3] || '/private/tmp/fekra-qa-review'
const locales = process.argv[4]?.split(',') || ['en', 'ar', 'de', 'fr', 'es']
mkdirSync(out, { recursive: true })
const findings = []
const check = (name, pass, evidence) => {
  findings.push({ name, pass, evidence })
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`, JSON.stringify(evidence ?? ''))
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', '--remote-debugging-port=9346', `--user-data-dir=${out}/chrome`, '--no-first-run', '--hide-scrollbars',
], { stdio: 'ignore' })
let ws
try {
  for (let i = 0; i < 60; i++) { try { await fetch('http://localhost:9346/json/version'); break } catch { await wait(200) } }
  const tab = await (await fetch('http://localhost:9346/json/new?about:blank', { method: 'PUT' })).json()
  ws = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve) => { ws.onopen = resolve })
  let id = 0
  const calls = new Map()
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const key = ++id
    const timer = setTimeout(() => { calls.delete(key); reject(new Error(`Timeout: ${method}`)) }, 60000)
    calls.set(key, { resolve: (value) => { clearTimeout(timer); resolve(value) }, reject })
    ws.send(JSON.stringify({ id: key, method, params }))
  })
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    const pending = calls.get(message.id)
    if (pending) { calls.delete(message.id); if (message.error) pending.reject(message.error); else pending.resolve(message.result) }
  }
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Browser evaluation failed')
    return result.result.value
  }
  const until = async (expression) => {
    for (let i = 0; i < 240; i++) { if (await evaluate(expression)) return; await wait(250) }
    throw new Error(`Page readiness timeout: ${expression}`)
  }
  await send('Page.enable')
  await send('Network.enable')
  await send('Accessibility.enable')
  const navigate = async (path, locale) => {
    await send('Network.setCookie', { name: 'NEXT_LOCALE', value: locale, url: base })
    await send('Page.navigate', { url: base + path })
    await until(`location.pathname === ${JSON.stringify(path)} && document.readyState === 'complete' && !!document.querySelector('main h1')`)
    await wait(350)
  }
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    await send('Network.clearBrowserCookies')
    await navigate(prefix || '/', locale)
    const firstVisit = await evaluate(`({banner:!!document.querySelector('[role="dialog"]'),widget:!!document.querySelector('button[aria-expanded="false"].fixed')})`)
    check(`${locale}: widget waits for consent`, firstVisit.banner && !firstVisit.widget, firstVisit)
    await evaluate(`document.querySelector('[role="dialog"] button:last-child')?.click()`)
    await wait(200)
    const collapsed = await evaluate(`(() => {const e=document.querySelector('button[aria-expanded="false"].fixed');return {shown:!!e,width:e?.getBoundingClientRect().width}})()`)
    check(`${locale}: compact widget`, collapsed.shown && collapsed.width <= 70, collapsed)
    const ax = await send('Accessibility.getFullAXTree')
    const h1 = ax.nodes.filter((n) => n.role?.value === 'heading' && n.properties?.some((p) => p.name === 'level' && p.value.value === 1))
    check(`${locale}: one accessible H1`, h1.length === 1, h1.map((n) => n.name?.value))
    const headingBefore = h1[0]?.name?.value
    await wait(2000)
    const axAfter = await send('Accessibility.getFullAXTree')
    const headingAfter = axAfter.nodes.find((n) => n.role?.value === 'heading' && n.properties?.some((p) => p.name === 'level' && p.value.value === 1))?.name?.value
    check(`${locale}: stable accessible H1`, headingBefore === headingAfter, headingAfter)
    const seo = await evaluate(`Object.fromEntries(['description','og:description','og:image','twitter:description','twitter:image'].map(n=>[n,document.querySelector('meta[name="'+n+'"],meta[property="'+n+'"]')?.content]))`)
    check(`${locale}: home social metadata`, Object.values(seo).length === 5 && Object.values(seo).every(Boolean), seo)
    const certificateTitles = { en:'Partnerships & Certifications', ar:'الشراكات والشهادات', de:'Partnerschaften & Zertifizierungen', fr:'Partenariats et certifications', es:'Alianzas y certificaciones' }
    const headings = await evaluate(`[...document.querySelectorAll('h2')].map(e=>e.textContent.trim())`)
    check(`${locale}: complete certification heading`, headings.includes(certificateTitles[locale]), headings.filter(t=>/cert|zert|شهاد/i.test(t)))
    if (locale === 'de') check('German Fika navigation', await evaluate(`document.querySelector('[data-main-nav]').textContent.includes('Fika AI kennenlernen') && !document.querySelector('[data-main-nav]').textContent.includes('Meet Fika')`))
    if (locale === 'en') {
      const copy = await evaluate('document.querySelector("main").innerText')
      check('English legacy copy removed', !/All Businesses Types|Industry Expertises|Startups Business|Enterprise Business|Agency Business|Top Talents/.test(copy))
    }
    for (const path of [prefix || '/', `${prefix}/contact`, `${prefix}/blog`, `${prefix}/careers`]) {
      if (path !== (prefix || '/')) await navigate(path, locale)
      const forms = await evaluate(`Array.from(document.forms,f=>({method:f.method,action:new URL(f.action).pathname,honeypots:[...f.querySelectorAll('[name="website"]')].map(e=>({hidden:!!e.closest('[hidden],.hidden'),aria:!!e.closest('[aria-hidden="true"]'),autocomplete:e.autocomplete,tabIndex:e.tabIndex}))}))`)
      check(`${path}: safe form markup`, forms.every(f=>f.method==='post' && f.action.startsWith('/api/') && f.honeypots.every(h=>h.hidden && h.aria && h.autocomplete==='off' && h.tabIndex===-1)), forms)
      for (const width of [390, 768, 1363]) {
        await send('Emulation.setDeviceMetricsOverride', { width, height: 936, deviceScaleFactor: 1, mobile: width < 768 })
        await wait(100)
        const sizes = await evaluate('({viewport:innerWidth,content:document.documentElement.scrollWidth})')
        check(`${path}: ${width}px no overflow`, sizes.content <= sizes.viewport + 1, sizes)
      }
      if (path.endsWith('/contact')) {
        const heading = await evaluate(`[...document.querySelectorAll('main h1,main h1 ~ p,main section > div > div:first-child')].map(e=>e.innerText).join(' ')`)
        check(`${locale}: translated contact heading`, locale === 'en' || !/let.s talk business|contact us/i.test(heading), heading.slice(0,250))
      }
      if (path.endsWith('/blog')) {
        const count = await evaluate(`({heading:document.querySelector('h1').innerText,cards:document.querySelectorAll('main article').length})`)
        check(`${locale}: blog exact count wording`, !/\d\+|\bover\b|plus de|más de|أكثر من|\büber\b/.test(count.heading), count)
      }
      if (path.endsWith('/careers')) {
        const copy = await evaluate('document.querySelector("main").innerText')
        check(`${locale}: consistent team-name capitalization`, !/\bESLAM\b|\bMAGDY\b/.test(copy))
        if (locale === 'en') check('Natural careers introduction', copy.includes('Choose a character you love from anime or film and join our story.'))
        else check(`${locale}: no English schedule fallback`, !copy.includes('Remote — Dubai business hours') && !copy.includes('Remote — USA time zone'))
      }
      if (['en','ar'].includes(locale)) {
        await evaluate('window.scrollTo(0,0)')
        const shot = await send('Page.captureScreenshot', { format: 'png' })
        writeFileSync(`${out}/${locale}-${path.split('/').pop() || 'home'}.png`, Buffer.from(shot.data, 'base64'))
      }
    }
  }
  // This sends only a deliberately invalid POST. It cannot create a record.
  await send('Emulation.setScriptExecutionDisabled', { value: true })
  await send('Page.navigate', { url: `${base}/contact` })
  await wait(2500)
  const privacy = await evaluate(`(() => {const f=document.querySelector('form[action="/api/contact"]');if(!f)return null;const i=f.querySelector('[name="email"]');i.value='qa-no-js@example.invalid';f.submit();return {method:f.method,action:f.action}})()`)
  await wait(1500)
  const safeUrl = await evaluate('location.href')
  check('No-JS submission never exposes PII in URL', privacy?.method === 'post' && safeUrl === `${base}/api/contact`, { privacy, url:safeUrl })
} catch (error) {
  check('Browser run completed', false, String(error))
} finally {
  ws?.close()
  chrome.kill()
  writeFileSync(`${out}/results.json`, JSON.stringify(findings, null, 2))
}
if (findings.some(f=>!f.pass)) process.exitCode = 1
