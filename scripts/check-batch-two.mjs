import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || '/private/tmp/fekra-batch-two-check'
mkdirSync(out, { recursive: true })
const port = 9334
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', [
  '--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${out}/chrome`, '--no-first-run', '--hide-scrollbars',
])
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const findings = []
let ws
try {
  for (let i = 0; i < 50; i++) {
    try { await fetch(`http://localhost:${port}/json/version`); break } catch { await wait(200) }
  }
  const tab = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json()
  ws = new WebSocket(tab.webSocketDebuggerUrl)
  await new Promise((resolve) => { ws.onopen = resolve })
  let seq = 0
  const calls = new Map()
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data)
    const pending = calls.get(message.id)
    if (pending) {
      calls.delete(message.id)
      if (message.error) pending.reject(message.error)
      else pending.resolve(message.result)
    }
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++seq; calls.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }))
  })
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description || 'Browser evaluation failed')
    return result.result.value
  }
  const check = (name, passed, evidence) => { findings.push({ name, passed, evidence }); console.log(`${passed ? 'PASS' : 'FAIL'} ${name}`, JSON.stringify(evidence ?? '')) }
  const shot = async (name, full = false) => {
    const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: full })
    writeFileSync(`${out}/${name}.png`, Buffer.from(image.data, 'base64'))
  }
  await send('Page.enable')
  await send('Network.enable')
  await send('Network.setCookie', { name: 'NEXT_LOCALE', value: 'en', url: base })
  await send('Network.setCookie', { name: 'fekra_consent', value: encodeURIComponent(JSON.stringify({ analytics: false, marketing: false })), url: base })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }] })
  const size = (width, height) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 })
  const navigate = async (path) => {
    await send('Page.navigate', { url: `${base}${path}` })
    for (let i = 0; i < 80; i++) {
      await wait(500)
      if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('main h1')`)) break
    }
    await wait(900)
  }
  await size(1440, 900)
  await navigate('/')
  await evaluate(`if(document.documentElement.classList.contains('dark')) document.querySelector('button svg.lucide-sun').closest('button').click()`)
  await wait(200)
  check('Home active navigation', await evaluate(`!!document.querySelector('nav[aria-label="Main"] a[aria-current="page"][href="/"]')`))
  check('Direct booking links', await evaluate(`Array.from(document.querySelectorAll('a')).filter(a=>/Schedule a Call|Book a 30/i.test(a.textContent)).every(a=>a.href==='https://calendly.com/fekra-egy-info/30min')`))
  await evaluate(`document.querySelector('nav[aria-label="Main"] a[href="/services/hire-dedicated-developers"]').focus()`)
  await wait(300)
  const menu = await evaluate(`(()=>{const e=document.querySelector('[data-services-menu]'),r=e.getBoundingClientRect();return {width:r.width,height:r.height,radius:getComputedStyle(e).borderRadius,visible:getComputedStyle(e).visibility}})()`)
  check('Contained rounded mega menu', menu.height <= 540 && menu.radius === '24px' && menu.visible === 'visible', menu)
  await shot('menu')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  await wait(300)
  check('Escape closes menu', await evaluate(`getComputedStyle(document.querySelector('[data-services-menu]')).visibility==='hidden'`))
  await evaluate(`document.activeElement.blur(); document.querySelector('[data-client-logos]').scrollIntoView({block:'center'})`)
  await wait(1000)
  const logos = await evaluate(`Array.from(document.querySelectorAll('[data-client-logos] img')).map(i=>({alt:i.alt,loaded:i.complete&&i.naturalWidth>0,filter:getComputedStyle(i).filter}))`)
  check('Twelve logos with requested replacements', logos.length === 12 && ['SLB','GOSI','Alfanar'].every(n=>logos.some(l=>l.alt===n)), logos)
  check('All logos load', logos.every(l=>l.loaded))
  await shot('logos-three-columns')
  await evaluate(`document.querySelector('[data-client-logos]').style.gridTemplateColumns='repeat(4,minmax(0,1fr))'`)
  await shot('logos-four-columns')
  await evaluate(`document.querySelector('[data-client-logos]').style.removeProperty('grid-template-columns')`)
  const logoBox = await evaluate(`(()=>{const r=document.querySelector('[data-client-logos] img[alt="SLB"]').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...logoBox })
  await wait(500)
  check('Logo hover reveals color', await evaluate(`getComputedStyle(document.querySelector('[data-client-logos] img[alt="SLB"]')).filter==='grayscale(0)'`))
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1, y: 899 })
  await wait(400)
  check('Logo returns to grayscale', await evaluate(`getComputedStyle(document.querySelector('[data-client-logos] img[alt="SLB"]')).filter==='grayscale(1)'`))
  await evaluate(`document.querySelector('[aria-roledescription="carousel"]').scrollIntoView({block:'center'})`)
  await wait(500)
  const groups = []
  for (let i = 0; i < 3; i++) {
    groups.push(await evaluate(`(()=>{const c=document.querySelector('[aria-roledescription="carousel"]');return [...c.querySelectorAll('ul:not([hidden]) > li')].map(e=>e.textContent.trim())})()`))
    if (i < 2) await evaluate(`document.querySelector('[aria-label="Next testimonials"]').click()`)
  }
  check('15 testimonials in three groups of five', groups.every(g=>g.length===5) && new Set(groups.flat()).size===15, groups.map(g=>g.length))
  await shot('testimonials-third-group')
  await evaluate(`document.querySelectorAll('details[name]')[0].open=true`)
  await wait(200)
  await evaluate(`document.querySelectorAll('details[name]')[1].open=true; document.querySelectorAll('details[name]')[1].scrollIntoView({block:'center'})`)
  await wait(300)
  check('Only one FAQ stays open', await evaluate(`document.querySelectorAll('details[name][open]').length===1`))
  await shot('faq')
  await evaluate(`document.querySelector('button[aria-label^="Done!"]').scrollIntoView({block:'center'})`)
  await wait(400)
  await evaluate(`document.querySelector('button[aria-label^="Done!"]').click()`)
  await wait(650)
  check('Process result changes copy', await evaluate(`(()=>{const s=document.querySelector('button[aria-label^="Done!"]').closest('section');return s.querySelector('h3').textContent==='Done!'&&s.innerText.includes('The top 3% of tech talent are hired and can start client delivery.')})()`))
  await shot('process-done')
  await evaluate(`Array.from(document.querySelectorAll('footer button')).find(b=>b.textContent==='Cookie Preferences').click()`)
  check('Cookie preferences reopen', await evaluate(`document.querySelector('dialog[aria-labelledby="cookie-preferences-title"]').open`))
  await evaluate(`document.querySelector('dialog[aria-labelledby="cookie-preferences-title"] input').click()`)
  await wait(100)
  await evaluate(`document.querySelector('dialog[aria-labelledby="cookie-preferences-title"] > button').click()`)
  check('Consent choices persist independently', await evaluate(`decodeURIComponent(document.cookie).includes('"analytics":true,"marketing":false')`))
  await evaluate(`Array.from(document.querySelectorAll('footer button')).find(b=>b.textContent==='Cookie Preferences').click()`)
  await wait(100)
  check('Saved cookie choices restored on reopening', await evaluate(`(()=>{const inputs=document.querySelectorAll('dialog[aria-labelledby="cookie-preferences-title"] input');return inputs[0].checked&&!inputs[1].checked})()`))
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  for (const path of ['/services', '/careers', '/contact', '/ar/blog/how-we-vet-the-top-3-percent', '/de/blog/building-qa-culture-that-ships', '/fr/blog/nearshore-vs-offshore', '/es/blog/scaling-engineering-teams-with-ai', '/terms-and-conditions', '/privacy-policy', '/cookie-policy']) {
    await navigate(path)
    check(`Page renders ${path}`, await evaluate(`!!document.querySelector('main h1') && !document.body.textContent.includes('Application error')`), await evaluate(`document.querySelector('main h1')?.textContent`))
    if (path === '/careers') check('Careers active navigation', await evaluate(`!!document.querySelector('nav[aria-label="Main"] a[aria-current="page"][href="/careers"]')`))
    if (path === '/services') check('Services uses designed landing page', await evaluate(`location.pathname==='/services/hire-dedicated-developers' && !!document.querySelector('nav[aria-label="Main"] a[aria-current="page"][href="/services/hire-dedicated-developers"]')`))
    if (path.startsWith('/ar/')) check('Arabic article body and RTL', await evaluate(`document.documentElement.dir==='rtl' && /يمر كل مهندس/.test(document.querySelector('article')?.textContent)`))
    await shot(path.replaceAll('/','-').slice(1))
  }
  for (const width of [360, 768, 1024, 1440]) {
    await send('Network.setCookie', { name: 'NEXT_LOCALE', value: 'en', url: base })
    await size(width, 900)
    await navigate('/')
    const overflow = await evaluate(`(()=>{const vw=innerWidth;return [...document.querySelectorAll('main *')].flatMap(e=>{const r=e.getBoundingClientRect();if(r.width<=1||r.height<=1||getComputedStyle(e).visibility==='hidden'||e.closest('[aria-hidden="true"]'))return [];for(let p=e.parentElement;p&&p!==document.body;p=p.parentElement){if(['hidden','clip','auto','scroll'].includes(getComputedStyle(p).overflowX))return []}return r.right>vw+1||r.left < -1?[{tag:e.tagName,cls:String(e.className).slice(0,100),left:r.left,right:r.right}]:[]})})()`)
    check(`Home overflow at ${width}px`, overflow.length===0, overflow.slice(0,10))
    await shot(`home-${width}`)
  }
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] })
  await navigate('/')
  const samples = []
  for (let i = 0; i < 35; i++) {
    samples.push(await evaluate(`document.querySelector('h1 .bg-clip-text')?.textContent.trim()`))
    await wait(150)
  }
  check('Hero erases and types progressively', samples.some((s,i)=>i>0&&s&&samples[i-1]&&s.length<samples[i-1].length) && samples.some((s,i)=>i>0&&s&&s.length>(samples[i-1]?.length??0)), samples)
  for (const [path, width, dark] of [['/careers',390,false],['/contact',390,false],['/ar',390,true],['/ar',1440,true]]) {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: dark ? 'dark' : 'light' }] })
    await size(width,900)
    await navigate(path)
    await evaluate(`if(document.documentElement.classList.contains('dark')!==${dark}) document.querySelector('button svg.lucide-sun').closest('button').click()`)
    await wait(300)
    check(`Page width ${path} ${width}px ${dark?'dark':'light'}`, await evaluate(`document.documentElement.scrollWidth<=innerWidth+1`))
    if (dark) check(`Arabic dark theme ${width}px`, await evaluate(`document.documentElement.dir==='rtl'&&document.documentElement.classList.contains('dark')`))
    await shot(`${path.slice(1)}-${width}-${dark?'dark':'light'}`)
  }
  writeFileSync(`${out}/results.json`, JSON.stringify(findings,null,2))
} finally { ws?.close(); chrome.kill() }
if (findings.some(result=>!result.passed)) process.exitCode=1
