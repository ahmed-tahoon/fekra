import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

// Inspect rendered button states on a local server. Challenges are mocked;
// submission requests are intercepted, so this test never stores leads/CVs.
const base = process.argv[2] || 'http://localhost:3000'
if (!['localhost', '127.0.0.1'].includes(new URL(base).hostname)) throw new Error('Local server only')
const out = process.argv[3] || '/private/tmp/fekra-button-check'
mkdirSync(out, { recursive: true })
const port = 9361
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


  await send('DOM.enable'); await send('CSS.enable')
  const pages=process.argv[4]?.split(',')||['/','/services/hire-full-stack-developers','/about','/blog','/careers','/contact','/fika']
  const contrast = (foreground, background) => {
    const luminance = (color) => {const rgb=color.match(/[0-9.]+/g).slice(0,3).map(v=>Number(v)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);return rgb[0]*0.2126+rgb[1]*0.7152+rgb[2]*0.0722}
    const a=luminance(foreground),b=luminance(background);return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05)
  }
  const sample = () => evaluate(`([...document.querySelectorAll('[data-button-check]')].map(e=>{const c=getComputedStyle(e);return {id:e.dataset.buttonCheck,text:e.textContent.trim().slice(0,70)||e.getAttribute('aria-label'),bg:c.backgroundColor,image:c.backgroundImage,color:c.color,shadow:c.boxShadow,filter:c.filter,opacity:c.opacity,disabled:e.matches(':disabled,[aria-disabled="true"]')}}))`)
  for(const path of pages) {
    const locale=path.split('/')[1];await navigate(path,['ar','de','fr','es'].includes(locale)?locale:'en')
    await until(`document.readyState==='complete'`)
    // Reveal closed application panels solely for CSS inspection; never submit.
    await evaluate(`document.querySelectorAll('details').forEach(d=>{d.removeAttribute('name');d.open=true})`)
    for(const theme of ['light','dark']) {
      await display(1440,theme)
      await evaluate(`(()=>{document.querySelectorAll('[data-button-check]').forEach(e=>e.removeAttribute('data-button-check'));[...document.querySelectorAll('button:not([data-process-control]):not([role="tab"]),.fk-button')].filter(e=>e.getBoundingClientRect().width>0 && !e.closest('nextjs-portal')).forEach((e,i)=>e.dataset.buttonCheck=String(i))})()`)
      const {root}=await send('DOM.getDocument',{depth:0})
      const {nodeIds}=await send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:'[data-button-check]'})
      const normal=await sample()
      await Promise.all(nodeIds.map(nodeId=>send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['hover']})));await wait(220)
      const hovered=await sample()
      await Promise.all(nodeIds.map(nodeId=>send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['active']})));await wait(220)
      const pressed=await sample()
      // Inspect submit styles in their enabled state without submitting data.
      await evaluate(`document.querySelectorAll('button[data-button-check]:disabled').forEach(e=>{e.dataset.wasDisabled='true';e.disabled=false})`)
      await Promise.all(nodeIds.map(nodeId=>send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]})));await wait(220)
      const enabledDefault=await sample()
      await Promise.all(nodeIds.map(nodeId=>send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['hover']})));await wait(220)
      const enabledHover=await sample()
      const submitFailures=normal.flatMap((n,i)=>n.disabled && ((enabledDefault[i].bg===enabledHover[i].bg&&enabledDefault[i].color===enabledHover[i].color)||contrast(enabledHover[i].color,enabledHover[i].bg)<4.5) ? [{text:n.text,normal:enabledDefault[i],hover:enabledHover[i]}] : [])
      check(`${path} ${theme} enabled submit states`,submitFailures.length===0,submitFailures)
      await evaluate(`document.querySelectorAll('[data-was-disabled]').forEach(e=>{e.disabled=true;delete e.dataset.wasDisabled})`)
      const failures=[]
      normal.forEach((n,i)=>{
        const h=hovered[i],a=pressed[i]
        if(n.disabled) { if(n.bg!==h.bg||n.color!==h.color||Number(h.opacity)>0.5) failures.push({reason:'disabled changed',n,h}) }
        else if((n.bg===h.bg&&n.color===h.color&&n.image===h.image)||contrast(h.color,h.bg)<4.5||a.filter==='none') failures.push({reason:'missing state',n,h,a})
      })
      check(`${path} ${theme} button states`,failures.length===0,{count:normal.length,failures})
      await Promise.all(nodeIds.map(nodeId=>send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]})))
      if(path==='/'||path==='/careers'||path==='/about') {
        const selector=path==='/about'?'a.fk-button--inverse':path==='/careers'?'a[href="#open-roles"]':'main .fk-button'
        await evaluate(`document.querySelector(${JSON.stringify(selector)}).scrollIntoView({block:'center'})`)
        const {nodeId}=await send('DOM.querySelector',{nodeId:root.nodeId,selector})
        await send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['hover']});await wait(250);await shot(`${path.slice(1)||'home'}-${theme}-hover`);await send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]})
      }
      // Touch :active colors use the same shared variables without hover.
      await send('Emulation.setEmulatedMedia',{features:[{name:'hover',value:'none'},{name:'prefers-reduced-motion',value:'reduce'}]})
      await display(390,theme)
      const first=normal.find(n=>!n.disabled)
      if(first){const {nodeId}=await send('DOM.querySelector',{nodeId:root.nodeId,selector:`[data-button-check="${first.id}"]`});await send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:['active']});check(`${path} ${theme} touch pressed`,(await sample()).find(n=>n.id===first.id).filter!=='none');await send('CSS.forcePseudoState',{nodeId,forcedPseudoClasses:[]})}
    }
  }
  writeFileSync(`${out}/results.json`,JSON.stringify(findings,null,2))
  if(findings.some(f=>!f.passed))process.exitCode=1
} finally { ws?.close(); chrome.kill() }
