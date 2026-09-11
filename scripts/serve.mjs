import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = resolve('dist')
const redirects = new Map([
  ['/services/software-development', '/services/end-to-end-development'],
  ['/services/ui-ux', '/services/end-to-end-development'],
])
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' }

export async function handleRequest(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end()
    return
  }
  const url = new URL(req.url, 'http://localhost')
  let path
  try { path = decodeURIComponent(url.pathname) } catch { res.writeHead(400).end(); return }
  if (path.startsWith('//') || path.includes('\\') || path.includes('\0')) { res.writeHead(400).end(); return }
  const redirect = target => res.writeHead(301, { Location: target }).end()
  if ((req.headers.host || '').split(':')[0].toLowerCase() === 'www.universal-technologies.com') {
    redirect(`https://universal-technologies.com${url.pathname}${url.search}`)
    return
  }
  const clean = path.replace(/\/index\.html$/, '').replace(/\/+$/, '') || '/'
  if (redirects.has(clean)) { redirect(`${redirects.get(clean)}${url.search}`); return }
  if (clean !== path && (path.endsWith('/') || path.endsWith('/index.html'))) {
    redirect(`${clean}${url.search}`); return
  }
  let status = clean === '/services/cybersecurity' ? 410 : 200
  let target = resolve(root, `.${path}`)
  if (!target.startsWith(root + sep) && target !== root) { res.writeHead(400).end(); return }
  try {
    if (status === 410) throw new Error('Retired service')
    if ((await stat(target)).isDirectory()) target = resolve(target, 'index.html')
    const body = await readFile(target)
    res.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream', 'Cache-Control': target.includes(`${sep}assets${sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache' })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch {
    status = status === 410 ? 410 : 404
    const body = await readFile(resolve(root, '404.html'))
    res.writeHead(status, { 'Content-Type': types['.html'], 'X-Robots-Tag': 'noindex', 'Cache-Control': 'no-cache' })
    res.end(req.method === 'HEAD' ? undefined : body)
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4173)
  createServer((req, res) => { handleRequest(req, res).catch(() => { res.writeHead(500).end() }) })
    .listen(port, process.env.HOST || '127.0.0.1', () => console.log(`Serving prerendered site on port ${port}`))
}
