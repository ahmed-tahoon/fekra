import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const base = process.argv[2] || 'http://localhost:3000'
const out = process.argv[3] || '/private/tmp/fekra-batch-three-check'
mkdirSync(out, { recursive: true })
const port = 9337
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
    const target = /^\/(ar|de|fr|es)(?:\/|$)/.exec(path)?.[1] ?? 'en'
    await send('Network.setCookie', { name: 'NEXT_LOCALE', value: target, url: base })
    await send('Page.navigate', { url: `${base}${path}` })
    for (let i = 0; i < 80; i++) {
      await wait(500)
      if (await evaluate(`document.readyState === 'complete' && !!document.querySelector('main h1')`)) break
    }
    await wait(900)
  }
  const until = async (expression, timeout = 60000) => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      if (await evaluate(expression)) return true
      await wait(200)
    }
    return false
  }
  const setTheme = (theme) => evaluate(`localStorage.setItem('theme', '${theme}'); document.documentElement.classList.toggle('dark', '${theme}' === 'dark')`)
  await size(1440, 1000)
  await navigate('/')
  check('English homepage renders', await evaluate(`document.documentElement.lang === 'en' && !!document.querySelector('h1')`))

  await evaluate(`history.replaceState(history.state, '', '/?campaign=batch3#main')`)

  // Clicking the actual UI catches stale router trees and root direction changes.
  for (let round = 0; round < 2; round++) {
    for (const locale of ['ar', 'de', 'fr', 'es', 'en']) {
      await evaluate(`document.querySelector('button[aria-haspopup="menu"]').click()`)
      await until(`!!document.querySelector('[role="menuitem"][hreflang="${locale}"]')`)
      await evaluate(`document.querySelector('[role="menuitem"][hreflang="${locale}"]').click()`)
      const ready = await until(`document.documentElement.lang === '${locale}' && document.documentElement.dir === '${locale === 'ar' ? 'rtl' : 'ltr'}' && document.querySelector('button[aria-haspopup="menu"]').getAttribute('aria-busy') !== 'true' && !!document.querySelector('h1')`)
      check(`Language UI round ${round + 1}: ${locale}`, ready, await evaluate(`({ path: location.pathname, lang: document.documentElement.lang, dir: document.documentElement.dir, cookie: document.cookie.includes('NEXT_LOCALE=${locale}'), heading: document.querySelector('h1')?.innerText })`))
      check(`Query and hash retained ${round + 1}: ${locale}`, await evaluate(`location.search === '?campaign=batch3' && location.hash === '#main'`))
      check(`Locale preference ${round + 1}: ${locale}`, await evaluate(`document.cookie.includes('NEXT_LOCALE=${locale}')`))
    }
  }
  await evaluate(`history.back()`)
  check('Back restores Spanish and preference', await until(`document.documentElement.lang === 'es' && document.cookie.includes('NEXT_LOCALE=es')`))
  await send('Page.reload')
  check('Refresh retains restored language', await until(`document.readyState === 'complete' && document.documentElement.lang === 'es' && !!document.querySelector('h1')`))
  await evaluate(`history.forward()`)
  check('Forward restores English and preference', await until(`document.documentElement.lang === 'en' && document.cookie.includes('NEXT_LOCALE=en')`))

  for (const locale of ['en', 'ar']) {
    await navigate(locale === 'ar' ? '/ar' : '/')
    await setTheme('dark')
    const active = await evaluate(`(() => { const a = document.querySelector('nav[data-main-nav] a[aria-current="page"]'); return a && {text: a.textContent, color: getComputedStyle(a).color, decoration: getComputedStyle(a).textDecorationLine} })()`)
    check(`${locale}: visible dark active navigation`, active?.decoration === 'underline', active)
    check(`${locale}: logo cards stay pure white`, await evaluate(`Array.from(document.querySelectorAll('.fk-art-surface')).every(e => getComputedStyle(e).backgroundColor === 'rgb(255, 255, 255)')`))
    check(`${locale}: equal client logo cells`, await evaluate(`(() => { const cells = [...document.querySelectorAll('[data-client-logos] > li')]; return cells.length === 12 && new Set(cells.map(e => { const r=e.getBoundingClientRect(); const s=getComputedStyle(e); return [r.width,r.height,s.padding,s.borderRadius].join(',') })).size === 1 })()`))
    check(`${locale}: logistics uses transparent vector`, await evaluate(`!!document.querySelector('img[src*="/images/industries/ind-logistics.svg"]')`))
    check(`${locale}: map remains visible in dark mode`, await evaluate(`(() => { const e=document.querySelector('[data-presence-map] img'); return e && e.getBoundingClientRect().height > 0 && getComputedStyle(e).display !== 'none' })()`))
    const carousel = '[aria-roledescription="carousel"]'
    await evaluate(`document.querySelector('${carousel}').scrollIntoView({block:'center'})`)
    await wait(600)
    const arrangement = await evaluate(`(() => { const e=document.querySelector('${carousel}'); const list=e.querySelector('ul:not([hidden])').getBoundingClientRect(); const bs=[...e.querySelectorAll('button')].map(e=>e.getBoundingClientRect()); return bs.length===2 && bs.every(b=>b.top>=list.top && b.bottom<=list.bottom) })()`)
    check(`${locale}: arrows beside testimonial cards`, arrangement)
    for (let group = 0; group < 3; group++) {
      if (group) await evaluate(`document.querySelector('${carousel} button:last-child').click()`)
      if (locale === 'ar') check(`Arabic testimonial group ${group + 1}`, await evaluate(`(() => { const list=document.querySelector('${carousel} ul:not([hidden])'); return [...list.querySelectorAll('blockquote')].every(e=>/[\u0600-\u06ff]/.test(e.textContent)) && [...list.querySelectorAll('figcaption > span > span:last-child')].every(e=>/[\u0600-\u06ff]/.test(e.textContent)) })()`))
    }
    await shot(`${locale}-dark-testimonials`)
    if (locale === 'ar') {
      check('Arabic experience labels', await evaluate(`!document.querySelector('main').innerText.includes('Years') && document.querySelector('main').innerText.includes('سنوات خبرة')`))
      check('Approved Scrum role', await evaluate(`document.querySelector('main').textContent.includes('قادة Scrum ومالكو المنتجات')`))
      check('Mixed technology names isolated', await evaluate(`!![...document.querySelectorAll('[data-services-menu] bdi')].find(e=>e.textContent === '.NET Full-Stack' && e.dir === 'ltr')`))
    }
    for (const theme of ['light','dark']) {
      await setTheme(theme)
      await evaluate(`window.scrollTo(0,0)`)
      await wait(400)
      await shot(`${locale}-${theme}-desktop`)
      await evaluate(`document.querySelector('[data-presence-map]').scrollIntoView({block:'center'})`)
      await wait(400)
      await shot(`${locale}-${theme}-map`)
      await evaluate(`document.querySelector('[data-client-logos]').scrollIntoView({block:'center'})`)
      await wait(400)
      await shot(`${locale}-${theme}-logos`)
    }
    await size(390,844)
    await evaluate(`window.scrollTo(0,0)`)
    await wait(400)
    check(`${locale}: mobile has no horizontal overflow`, await evaluate(`document.documentElement.scrollWidth <= innerWidth`))
    await shot(`${locale}-dark-mobile`)
    await evaluate(`document.querySelector('button[aria-controls="mobile-menu"]').click()`)
    check(`${locale}: mobile menu marks current page`, await until(`document.querySelector('#mobile-menu').open && !!document.querySelector('#mobile-menu a[aria-current="page"]')`))
    await evaluate(`document.querySelector('#mobile-menu button').click()`)

    await size(1440,1000)
    for (const path of ['/services/hire-dedicated-developers','/about','/blog','/careers','/contact','/fika']) {
      await navigate(`${locale === 'ar' ? '/ar' : ''}${path}`)
      check(`${locale}: active nav ${path}`, await evaluate(`!!document.querySelector('nav[data-main-nav] a[aria-current="page"]')`))
      if (locale === 'ar' && path.includes('services/')) {
        check('Arabic service copy', await evaluate(`document.querySelector('h1').textContent.includes('وظّف') && !document.querySelector('main').innerText.includes('Hire an individual')`))
        check('Arabic consultation labels', await evaluate(`document.querySelector('#consult-phone').placeholder === 'رقم الهاتف' && document.querySelector('fieldset legend').textContent === 'اختر طريقة التعاقد'`))
        await evaluate(`window.fetch = async (url, options) => new Response(JSON.stringify({fields:{fullName:'required',email:'email',consent:'required'}}), {status:422,headers:{'Content-Type':'application/json'}}); document.querySelector('#consult-name').form.requestSubmit()`)
        check('Arabic validation messages', await until(`document.querySelector('#consult-errors')?.textContent.includes('أدخل بريدًا إلكترونيًا صحيحًا.')`))
        await shot('ar-dark-service')
      }
    }
  }
  await navigate('/ar/careers/senior-full-stack-engineer')
  check('Arabic career details', await evaluate(`document.querySelector('h1')?.textContent.includes('مهندس') && document.querySelector('main').innerText.includes('TypeScript')`))

  // Measure a full automatic cycle, including completion, with real timers.
  await navigate('/')
  await send('Emulation.setEmulatedMedia', { features: [{ name:'prefers-reduced-motion', value:'no-preference' }] })
  await evaluate(`document.querySelector('button[aria-current="step"]').closest('section').scrollIntoView({block:'center'})`)
  const timing = await evaluate(`new Promise(resolve => {
    const section=document.querySelector('button[aria-current="step"]').closest('section');
    const stage=()=>section.querySelector('button[aria-current="step"]')?.textContent.trim() || 'done';
    let prev=stage(), time=performance.now(); const samples=[];
    const id=setInterval(()=> { const next=stage(); if(next!==prev) { samples.push({stage:prev,ms:performance.now()-time}); time=performance.now(); prev=next; } if(samples.length===7) { clearInterval(id); resolve(samples); } },50);
    setTimeout(()=>{clearInterval(id);resolve(samples)},25000);
  })`)
  check('Every process stage including Done lasts 3 seconds', timing.length >= 6 && timing.slice(1).every(t=>t.ms>=2800 && t.ms<3300) && timing.some(t=>t.stage==='done' && t.ms>=2800), timing)
  writeFileSync(`${out}/results.json`, JSON.stringify(findings,null,2))
  const failures=findings.filter(f=>!f.passed)
  console.log(`${findings.length-failures.length}/${findings.length} passed. Screenshots: ${out}`)
  if(failures.length) process.exitCode=1
} finally {
  ws?.close()
  chrome.kill('SIGTERM')
}
