const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let id = 0
const pending = new Map()
socket.addEventListener('message', event => {
  const data = JSON.parse(event.data)
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
await send('Page.navigate', { url: 'http://127.0.0.1:4173/' })
await delay(1200)
console.log('initial data-theme:', await evaluate(`document.documentElement.getAttribute('data-theme')`))
console.log('toggle count:', await evaluate(`document.querySelectorAll('.theme-toggle').length`))
console.log('toggle label before:', await evaluate(`document.querySelector('.theme-toggle')?.getAttribute('aria-label')`))
await evaluate(`document.querySelector('.theme-toggle').click()`)
await delay(400)
console.log('after 1 click data-theme:', await evaluate(`document.documentElement.getAttribute('data-theme')`))
console.log('localStorage theme:', await evaluate(`localStorage.getItem('theme')`))
await send('Page.close')
socket.close()
