import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

// Run against a local server using Cloudflare's documented test site key.
// POST requests are intercepted in-browser: this test never stores leads/CVs.
const base = process.argv[2] || 'http://localhost:3000'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local server only')
const out = process.argv[3] || '/private/tmp/fekra-batch-five-check'
mkdirSync(out, { recursive: true })
const port = 9355
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
      await send('Fetch.fulfillRequest', { requestId: message.params.requestId, responseCode: 200, responseHeaders: [{ name: 'content-type', value: 'application/json' }], body: Buffer.from(message.params.request.url.includes('/api/bot-challenge') ? JSON.stringify({a:3,b:4,nonce:'layout-test',challenge:'layout-test'}) : '{"ok":true}').toString('base64') })
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
  await send('Fetch.enable', { patterns: ['/api/contact', '/api/apply', '/api/newsletter', '/api/bot-challenge*'].map((path) => ({ urlPattern: `${base}${path}`, requestStage: 'Request' })) })
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

  const click = async (selector) => {
    const point = await evaluate(`(() => {const e=document.querySelector(${JSON.stringify(selector)}); if(!e) throw new Error('Missing '+${JSON.stringify(selector)});e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
    await send('Input.dispatchMouseEvent', {type:'mouseMoved',...point})
    await send('Input.dispatchMouseEvent', {type:'mousePressed',button:'left',clickCount:1,...point})
    await send('Input.dispatchMouseEvent', {type:'mouseReleased',button:'left',clickCount:1,...point})
    await wait(300)
  }
  const hover = async (selector) => {
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:0}); await wait(250)
    const before = await evaluate(`(() => {const e=document.querySelector(${JSON.stringify(selector)});e.scrollIntoView({block:'center'});const c=getComputedStyle(e);return {bg:c.backgroundColor,color:c.color}})()`)
    const point = await evaluate(`(() => {const r=document.querySelector(${JSON.stringify(selector)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
    await send('Input.dispatchMouseEvent',{type:'mouseMoved',...point}); await wait(300)
    const after = await evaluate(`(() => {const c=getComputedStyle(document.querySelector(${JSON.stringify(selector)}));return {bg:c.backgroundColor,color:c.color,shadow:c.boxShadow}})()`)
    check(`hover ${selector}`,before.bg!==after.bg && after.bg!==after.color && !after.shadow.includes('0px 0px 0px 2px'), {before,after})
  }
  const formsOnly = process.argv[4] === 'forms'
  const focused = process.argv[4] === 'focused' || formsOnly
  const locales = focused ? [] : ['en','ar','de','fr','es']
  for (const locale of locales) {
    const prefix=locale==='en'?'':`/${locale}`, home=prefix||'/'
    await navigate(home,locale)
    for (const width of [1440,390]) for (const theme of ['light','dark']) {
      await display(width,theme)
      await evaluate('window.scrollTo({top:1000,behavior:"instant"})'); await wait(150)
      await click('[data-scrolled] a[aria-label="FEKRA"]')
      check(`logo reset ${locale} ${width} ${theme}`,await evaluate('scrollY<5'))
      if(width===1440) {
        await evaluate('window.scrollTo({top:1000,behavior:"instant"})'); await wait(150)
        await click(`nav[data-main-nav] a[href="${home}"]`)
        check(`home reset ${locale} ${theme}`,await evaluate('scrollY<5'))
        await hover('main .fk-button')
      } else {
        await evaluate('window.scrollTo({top:1000,behavior:"instant"})')
        await click('button[aria-controls="mobile-menu"]')
        await click(`#mobile-menu nav a[href="${home}"]`)
        check(`mobile home reset ${locale} ${theme}`,await evaluate('scrollY<5 && !document.querySelector("#mobile-menu").open'))
        await click('button[aria-controls="mobile-menu"]')
        check(`mobile Hire Now ${locale} ${theme}`,await evaluate(`!!document.querySelector('#mobile-menu nav .fk-button[href="${prefix}/contact"]')`))
        await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27})
      }
      await click('[role="tablist"] button:nth-child(2)')
      check(`pointer focus ${locale} ${width} ${theme}`,await evaluate(`(()=>{const e=document.querySelector('[role="tablist"] button:nth-child(2)'),c=getComputedStyle(e);return c.outlineStyle==='none' && c.boxShadow==='none'})()`))
      check(`Fika destination ${locale} ${width} ${theme}`,await evaluate(`!![...document.querySelectorAll('main section')].find(s=>s.querySelector('img[src*="fika"]') && s.querySelector('a[href="${prefix}/fika"]'))`))
      check(`overflow ${locale} ${width} ${theme}`,await evaluate('document.documentElement.scrollWidth<=innerWidth+1'))
    }
    // Destination checks from real menu clicks.
    await display(1440,'light');await evaluate('window.scrollTo(0,0)')
    const menuLink=`[data-main-nav] > ul > li:has([data-services-menu]) > a`
    await evaluate(`document.querySelector(${JSON.stringify(menuLink)}).focus()`);await wait(250)
    await click(`[data-services-menu] a[href="${prefix}/contact"]`)
    check(`Hire Now contact navigation ${locale}`,await until(`location.pathname==='${prefix}/contact'`))
  }
  for (const slug of (formsOnly ? [] : focused ? ['hire-qa-engineers'] : ['hire-full-stack-developers','hire-mobile-app-developers','hire-front-end-developers','hire-qa-engineers','hire-back-end-developers'])) {
    await navigate(`/services/${slug}`,'en')
    if(!await until(`!!document.querySelector('[data-service-hero]')`,15000)) { await shot('service-failure'); console.log(await evaluate(`document.body.innerText.slice(0,1800)`)); throw new Error('Service hero missing') }
    for(const width of [1440,390]) for(const theme of ['light','dark']) {
      await display(width,theme);await evaluate('window.scrollTo(0,0)')
      const state=await evaluate(`(()=>{const e=document.querySelector('[data-service-hero]');return {icons:e.querySelectorAll('li img').length,bg:getComputedStyle(e).backgroundColor,paragraphs:[...e.querySelectorAll('p')].slice(0,4).map(p=>p.textContent),overflow:document.documentElement.scrollWidth>innerWidth+1}})()`)
      check(`service ${slug} ${width} ${theme}`,state.icons===3 && !state.overflow && !state.paragraphs.some(p=>p.startsWith('FEKRA selects ')),state)
      if(width===1440||slug==='hire-full-stack-developers')await shot(`${slug}-${width}-${theme}`)
    }
    await display(1440,'light')
    const gap=await evaluate(`(()=>{const section=document.querySelector('main section:has(img[src*="benefits-mark"])');const cards=section.querySelector('ul'),title=section.querySelector('p:has(img[src*="benefits-mark"])');return title.getBoundingClientRect().top-cards.getBoundingClientRect().bottom})()`)
    check(`hiring benefits gap ${slug}`,gap>=20&&gap<=45,gap)
  }
  if (!formsOnly) {
  await navigate('/about','en')
  for(const theme of ['light','dark']) {
    await display(1440,theme)
    await hover('a.fk-button.bg-white')
    await shot(`about-cta-${theme}`)
  }
  }
  await navigate('/careers','en')
  for(const width of [1440,390]) for(const theme of ['light','dark']) {
    await display(width,theme)
    // Open each panel separately: the careers accordion is exclusive.
    for (const kind of ['job','internship','future']) {
      await evaluate(`(()=>{const forms=[...document.querySelectorAll('[data-career-form]')]; const form=forms.find(f=>f.dataset.careerForm===${JSON.stringify(kind)}) || (${JSON.stringify(kind)}==='role'?forms[0]:null); if(!form)throw new Error('Missing form '+${JSON.stringify(kind)});const detail=form.closest('details');if(detail)detail.open=true;form.scrollIntoView({block:'center'});form.dataset.batchFiveActive='true'})()`)
      await wait(500)
      await evaluate(`document.querySelector('[data-batch-five-active] [data-bot-verification]').scrollIntoView({block:'center'})`)
      await until(`!!document.querySelector('[data-batch-five-active] input[name="botAnswer"]')`)
      const state=await evaluate(`(()=>{const e=document.querySelector('[data-batch-five-active] input[name="botAnswer"]');const c=getComputedStyle(e),r=e.getBoundingClientRect();return {top:c.borderTopWidth,left:c.borderLeftWidth,height:r.height,bg:c.backgroundColor,color:c.color,visible:r.width>0&&r.height>0}})()`)
      check(`answer ${kind} ${width} ${theme}`,parseFloat(state.top)>=2&&parseFloat(state.left)>=2&&state.height>=44&&state.visible&&state.bg!==state.color,state)
      await click('[data-batch-five-active] input[name="botAnswer"]')
      check(`answer focus ${kind} ${width} ${theme}`,await evaluate(`getComputedStyle(document.querySelector('[data-batch-five-active] input[name="botAnswer"]')).outlineStyle!=='none'`))
      await shot(`answer-${kind}-${width}-${theme}`)
      await evaluate(`delete document.querySelector('[data-batch-five-active]').dataset.batchFiveActive`)
    }
  }
  // Keyboard focus remains visible after a genuine Tab key.
  await navigate('/','en');await display(1440,'light');await evaluate('document.activeElement.blur()')
  await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9});await send('Input.dispatchKeyEvent',{type:'keyUp',key:'Tab',code:'Tab',windowsVirtualKeyCode:9})
  check('keyboard focus visible',await evaluate(`document.activeElement.matches(':focus-visible') && getComputedStyle(document.activeElement).outlineStyle!=='none'`))
  writeFileSync(`${out}/${formsOnly?'forms-results':focused?'focused-results':'results'}.json`,JSON.stringify(findings,null,2))
  if(findings.some(f=>!f.passed))process.exitCode=1
} finally { ws?.close(); chrome.kill() }
