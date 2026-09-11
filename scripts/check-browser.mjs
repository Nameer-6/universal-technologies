import assert from 'node:assert/strict'
import { writeFile } from 'node:fs/promises'
const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let id = 0
const pending = new Map()
const errors = []
socket.addEventListener('message', event => {
  const data = JSON.parse(event.data)
  if (data.method === 'Runtime.exceptionThrown') errors.push(data.params.exceptionDetails.text)
  if (data.id) {
    const request = pending.get(data.id)
    pending.delete(data.id)
    if (data.error) request.reject(new Error(JSON.stringify(data.error)))
    else request.resolve(data.result)
  }
})
function send(method, params = {}) {
  return new Promise((resolve, reject) => { const next = ++id; pending.set(next, { resolve, reject }); socket.send(JSON.stringify({ id: next, method, params })) })
}
async function evaluate(expression) {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
  return result.result.value
}
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
await send('Page.enable'); await send('Runtime.enable')
try {
  for (const [width, height] of [[1440, 1000], [390, 844], [320, 740]]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 })
    await send('Page.navigate', { url: 'http://127.0.0.1:4173/' })
    await delay(1300)
    const metrics = await evaluate(`({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth, h1: document.querySelector('h1')?.innerText, primary: document.querySelector('.btn-ink')?.getBoundingClientRect().toJSON(), cards: document.querySelectorAll('.service-card').length })`)
    assert(metrics.h1?.includes('Build it right.'))
    assert(metrics.scrollWidth <= metrics.width, `Overflow at ${width}: ${metrics.scrollWidth}`)
    assert.equal(metrics.cards, 6)
    assert(metrics.primary.height >= 44)
    const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    await writeFile(`/tmp/universal-home-${width}.png`, Buffer.from(screenshot.data, 'base64'))
    console.log(`Landing page passed at ${width} × ${height}`)
  }
  await evaluate(`document.querySelector('.nav-links a[href="/services"]').click()`)
  await delay(700)
  await evaluate(`document.querySelector('.svc-list-card[href="/services/qa"]').click()`)
  await delay(900)
  const qa = await evaluate(`({ title: document.title, titles: document.querySelectorAll('title').length, descriptions: document.querySelectorAll('meta[name="description"]').length, canonical: document.querySelector('link[rel="canonical"]')?.href, canonicals: document.querySelectorAll('link[rel="canonical"]').length, faqs: document.querySelectorAll('.svc-faq details').length })`)
  assert.equal(qa.titles, 1); assert.equal(qa.descriptions, 1); assert.equal(qa.canonicals, 1)
  assert(qa.title.startsWith('QA & Test Automation Services'))
  assert.equal(qa.canonical, 'https://universal-technologies.com/services/qa')
  assert.equal(qa.faqs, 3)
  await evaluate(`document.querySelector('.brand').click()`)
  await delay(700)
  assert.equal(await evaluate(`document.querySelectorAll('script[type="application/ld+json"]').length`), 1)
  await evaluate(`document.querySelector('.nav-toggle').click()`)
  assert.equal(await evaluate(`document.querySelector('.nav-toggle').getAttribute('aria-expanded')`), 'true')
  await evaluate(`document.querySelector('.nav-toggle').click()`)
  await evaluate(`document.querySelector('.theme-toggle').click()`)
  assert.equal(await evaluate(`document.documentElement.hasAttribute('data-theme')`), false)
  const light = await send('Page.captureScreenshot', { format: 'png' })
  await writeFile('/tmp/universal-home-light.png', Buffer.from(light.data, 'base64'))
  await send('Emulation.setScriptExecutionDisabled', { value: true })
  await send('Page.navigate', { url: 'http://127.0.0.1:4173/services/qa' })
  await delay(600)
  await send('Emulation.setScriptExecutionDisabled', { value: false })
  assert.equal(await evaluate(`document.querySelectorAll('.svc-faq details').length`), 3)
  assert.equal(errors.length, 0, errors.join('\n'))
  console.log('Navigation metadata, FAQ rendering, mobile menu, theme toggle, and no-JS content passed; no runtime exceptions.')
} finally {
  await send('Page.close')
  socket.close()
}
