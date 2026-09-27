import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

// Run against a local server using Cloudflare's documented test site key.
// POST requests are intercepted in-browser: this test never stores leads/CVs.
const base = process.argv[2] || 'http://localhost:3000'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local server only')
const out = process.argv[3] || '/private/tmp/fekra-batch-four-check'
mkdirSync(out, { recursive: true })
const port = 9344
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${out}/chrome`, '--no-first-run', '--hide-scrollbars',
], { stdio: 'ignore' })
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const findings = [], submissions = []
let ws
try {
  for (let i = 0; i < 60; i++) { try { await fetch(`http://localhost:${port}/json/version`); break } catch { await wait(200) } }
  const tab = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json()
  ws = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve) => { ws.onopen = resolve })
  let seq = 0
  const calls = new Map()
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq
    const timeout = setTimeout(() => { calls.delete(id); reject(new Error(`Timeout ${method}`)) }, 90_000)
    calls.set(id, { resolve: (value) => { clearTimeout(timeout); resolve(value) }, reject })
    ws.send(JSON.stringify({ id, method, params }))
  })
  ws.onmessage = async ({ data }) => {
    const message = JSON.parse(data)
    if (message.method === 'Fetch.requestPaused') {
      submissions.push({ url: message.params.request.url, method: message.params.request.method })
      await send('Fetch.fulfillRequest', { requestId: message.params.requestId, responseCode: 200, responseHeaders: [{ name: 'content-type', value: 'application/json' }], body: Buffer.from('{"ok":true}').toString('base64') })
    }
    const pending = calls.get(message.id)
    if (pending) { calls.delete(message.id); if (message.error) pending.reject(message.error); else pending.resolve(message.result) }
  }
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Browser evaluation failed')
    return result.result.value
  }
  const check = (name, passed, evidence) => { findings.push({ name, passed, evidence }); console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`, JSON.stringify(evidence ?? '')) }
  const until = async (expression, timeout = 60000) => {
    const start = Date.now()
    while (Date.now() - start < timeout) { if (await evaluate(expression)) return true; await wait(150) }
    return false
  }
  const shot = async (name) => {
    await evaluate(`Promise.race([Promise.all([...document.images].filter(image=>{const box=image.getBoundingClientRect();return box.top<innerHeight&&box.bottom>0}).map(image=>image.decode().catch(()=>{}))),new Promise(resolve=>setTimeout(resolve,10000))])`)
    const result = await send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(`${out}/${name}.png`, Buffer.from(result.data, 'base64'))
  }
  await send('Page.enable')
  await send('Network.enable')
  await send('Fetch.enable', { patterns: ['/api/contact', '/api/apply', '/api/newsletter'].map((path) => ({ urlPattern: `${base}${path}`, requestStage: 'Request' })) })
  await send('Network.setCookie', { name: 'fekra_consent', value: encodeURIComponent(JSON.stringify({ analytics: false, marketing: false })), url: base })
  const navigate = async (path, locale) => {
    await send('Network.setCookie', { name: 'NEXT_LOCALE', value: locale, url: base })
    await send('Page.navigate', { url: `${base}${path}` })
    if (!await until(`document.readyState !== 'loading' && document.querySelector('main h1') && location.pathname === ${JSON.stringify(path)}`)) throw new Error(`Page failed: ${path}`)
    await wait(500)
  }
  const display = async (width, theme) => {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 950, deviceScaleFactor: 1, mobile: width < 768 })
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'reduce' }] })
    await evaluate(`if(document.documentElement.classList.contains('dark') !== ${theme === 'dark'}) document.querySelector('button:has(svg.lucide-sun)').click()`)
    await wait(250)
  }
  const locales = process.argv[4]?.split(',') || ['en', 'ar', 'de', 'fr', 'es']
  const kinds = process.argv[5] === 'visual' ? [] : process.argv[5]?.split(',') || ['contact', 'consultation', 'application']
  for (const locale of locales) {
    const prefix = locale === 'en' ? '' : `/${locale}`
    const home = prefix || '/'
    if (!process.argv[5]) {
    await navigate(home, locale)
    for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
      await display(width, theme)
      const state = await evaluate(`(() => {
        const icons = [...document.querySelectorAll('[data-hero-feature-icon]')];
        const faqs = [...document.querySelectorAll('main details')];
        const groups = [...document.querySelectorAll('[data-services-menu] > div > div')].filter(g=>g.querySelector('ul'));
        return { icons: icons.length, visible: icons.every(e=>e.getBoundingClientRect().width > 0 && getComputedStyle(e).visibility !== 'hidden'), faqs: faqs.length,
          close: !!document.querySelector('[data-services-menu] [data-nav-close]'),
          grouped: groups.length === 8 && groups.every(g=>[...g.querySelectorAll('a')].every(a=>a.href===g.querySelector('a').href)),
          overflow: document.documentElement.scrollWidth > innerWidth + 1, dir: document.documentElement.dir };
      })()`)
      check(`home ${locale} ${width} ${theme}`, state.icons === 3 && state.visible && state.faqs === 6 && !state.close && state.grouped && !state.overflow && state.dir === (locale === 'ar' ? 'rtl' : 'ltr'), state)
      if (['en', 'ar'].includes(locale)) {
        await evaluate('window.scrollTo(0, 0)'); await shot(`hero-${locale}-${width}-${theme}`)
        await evaluate('document.querySelector("[data-client-logos]").scrollIntoView({block:"center"})'); await shot(`logos-${locale}-${width}-${theme}`)
      }
      await evaluate(`(() => { const faq = document.querySelectorAll('main details'); faq[0].open = true; faq[1].open = true })()`)
      await wait(100)
      check(`FAQ exclusive ${locale} ${width} ${theme}`, await evaluate(`document.querySelectorAll('main details[open]').length === 1`))
    }
    // Client-side link navigation, then browser Back/Forward, in each theme.
    for (const theme of ['light', 'dark']) {
      await display(1440, theme)
      await evaluate(`document.querySelector('a[href="${prefix}/blog"]').click()`)
      check(`navigate away ${locale} ${theme}`, await until(`location.pathname === '${prefix}/blog' && !document.querySelector('[data-hero-feature-icon]')`))
      await evaluate('history.back()')
      check(`back icons ${locale} ${theme}`, await until(`document.querySelectorAll('[data-hero-feature-icon]').length === 3`))
      await evaluate('history.forward()')
      await until(`location.pathname === '${prefix}/blog' && !document.querySelector('[data-hero-feature-icon]')`)
      await evaluate(`document.querySelector('a[href="${home}"]').click()`)
      check(`internal return icons ${locale} ${theme}`, await until(`document.querySelectorAll('[data-hero-feature-icon]').length === 3`))
    }
    if (locale === 'en') {
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
      await evaluate(`document.querySelector('[data-process-number="2"]').scrollIntoView({block:'center'});document.querySelector('[data-process-number="2"]').click()`)
      await wait(1500)
      await evaluate(`document.querySelector('[data-process-number="2"]').click();document.querySelector('[data-process-number="2"]').focus()`)
      await wait(1800)
      check('same step click restarts full dwell', await evaluate(`document.querySelector('[data-process-number="2"]').getAttribute('aria-current') === 'step'`))
      await wait(1500)
      check('manual selection continues with keyboard focus', await evaluate(`document.querySelector('[data-process-number="3"]').getAttribute('aria-current') === 'step'`))
      await evaluate(`document.querySelector('[data-process-number="4"]').click()`)
      await wait(3150)
      check('final Top 3% state included', await evaluate(`document.querySelector('[data-process-number="4"]').closest('ol').querySelector('button[aria-pressed="true"]') !== null`))
      await wait(3150)
      check('final state returns to step one', await evaluate(`document.querySelector('[data-process-number="0"]').getAttribute('aria-current') === 'step'`))
    }
    }
    for (const kind of kinds) {
      const path = kind === 'contact' ? `${prefix}/contact` : kind === 'consultation' ? `${prefix}/services/hire-in-demand-developers` : `${prefix}/careers`
      await navigate(path, locale)
      if (kind === 'application') await evaluate(`document.querySelector('details').open = true`)
      await evaluate(`window.qaForm = document.querySelector('main form'); window.qaForm.scrollIntoView({block:'center'})`)
      check(`${kind} starts disabled ${locale}`, await evaluate(`qaForm.querySelector('[type="submit"]').disabled`))
      if (kind === 'consultation') {
        const sections = await evaluate(`Array.from(document.querySelectorAll('main section')).map(s=>({text:s.querySelector('h2')?.textContent,carousel:!!s.querySelector('[aria-roledescription="carousel"]')}))`)
        check(`shared testimonials ${locale}`, sections.some(s=>s.carousel), sections.filter(s=>s.carousel))
      }
      if (kind === 'application') check(`careers old section and link removed ${locale}`, await evaluate(`!document.querySelector('img[src*="icon1.jpg"]') && !document.querySelector('a[href="#open-roles"] h3') && !!document.querySelector('[data-presence-map]')`))
      // Fill with native events so React runs the same validation as typing.
      await evaluate(`(() => {
        window.fillQa = (name,value) => {
          const el = qaForm.elements.namedItem(name); if(!el || !('tagName' in el)) return;
          Object.getOwnPropertyDescriptor(el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype, 'value').set.call(el,value);
          el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true}));
        };
        fillQa('fullName','X');fillQa('email','bad-email');
      })()`)
      await wait(150)
      check(`${kind} inline errors ${locale}`, await evaluate(`qaForm.querySelectorAll('[aria-invalid="true"]').length >= 2`))
      await evaluate(`fillQa('fullName','QA Verification')`)
      await wait(100)
      check(`${kind} independent error clearing ${locale}`, await evaluate(`qaForm.elements.fullName.getAttribute('aria-invalid') === 'false' && qaForm.elements.email.getAttribute('aria-invalid') === 'true'`))
      await evaluate(`(() => {
        for(const el of qaForm.querySelectorAll('input[required],textarea[required]')) {
          if(['checkbox','radio','file','hidden'].includes(el.type) || el.name.startsWith('bot')) continue;
          fillQa(el.name, el.type === 'email' ? 'qa@example.com' : el.type === 'tel' ? '+20 100 123 4567' : 'QA verification content');
        }
        const model = qaForm.querySelector('input[type="radio"]'); if(model) model.click();
        const file = qaForm.querySelector('input[type="file"]'); if(file) { const dt=new DataTransfer(); dt.items.add(new File(['%PDF-1.4 QA'], 'qa.pdf',{type:'application/pdf'})); file.files=dt.files; file.dispatchEvent(new Event('change',{bubbles:true})); }
        qaForm.querySelector('[name="consent"]').click();
      })()`)
      await wait(100)
      check(`${kind} requires bot answer ${locale}`, await evaluate(`qaForm.querySelector('[type="submit"]').disabled`))
      await evaluate(`qaForm.querySelector('[data-bot-verification]').scrollIntoView({block:'center'})`)
      const ready = await until(`qaForm.querySelector('[name="botChallenge"]').value && qaForm.querySelector('[name="botToken"]').value`, 25000)
      check(`${kind} test CAPTCHA ready ${locale}`, ready)
      if (ready) {
        await evaluate(`(() => { const value=JSON.parse(atob(qaForm.elements.botChallenge.value.split('.')[0].replace(/-/g,'+').replace(/_/g,'/')));fillQa('botAnswer',String(value.a+value.b)) })()`)
        await wait(150)
        check(`${kind} enabled after all checks ${locale}`, await evaluate(`!qaForm.querySelector('[type="submit"]').disabled`))
      }
      for (const width of [1440, 390]) for (const theme of ['light', 'dark']) {
        await display(width, theme)
        if (ready) await until(`qaForm.querySelector('[name="botToken"]').value !== ''`, 15000)
        check(`${kind} fits ${locale} ${width} ${theme}`, await evaluate(`document.documentElement.scrollWidth <= innerWidth + 1`))
        if (['en', 'ar'].includes(locale)) { await evaluate(`qaForm.scrollIntoView({block:'center'})`); await shot(`${kind}-${locale}-${width}-${theme}`) }
      }
      if (ready) {
        await until(`!qaForm.querySelector('[type="submit"]').disabled`, 15000)
        await evaluate(`qaForm.querySelector('[type="submit"]').click()`)
        check(`${kind} success UI with intercepted POST ${locale}`, await until(`!qaForm.isConnected`, 5000))
      }
    }
  }
  await navigate('/about', 'en')
  for (const theme of ['light', 'dark']) {
    await display(1440, theme)
    await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1800, deviceScaleFactor: 1, mobile: false })
    await evaluate(`document.querySelector('img[src*="cert-soc2"]').closest('section').scrollIntoView({block:'start'})`)
    await shot(`certifications-${theme}`)
  }
  check('all form POSTs intercepted', submissions.length === locales.length * kinds.length, submissions.length)
} finally {
  writeFileSync(`${out}/results.json`, JSON.stringify({ findings, submissions }, null, 2))
  ws?.close(); chrome.kill()
}
if (findings.some((finding) => !finding.passed)) process.exitCode = 1
