import { createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, optimizeDeps: { noDiscovery: true, include: [] }, appType: 'custom' })
try {
  const { render } = await server.ssrLoadModule('/src/entry-server.tsx')
  const sitemap = await readFile('dist/sitemap.xml', 'utf8')
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
  const shell = (await readFile('dist/index.html', 'utf8'))
    .replace(/<title>[\s\S]*?<\/title>/g, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>/g, '')
  for (const path of [...paths, '/404']) {
    let body = await render(path)
    const head = []
    // React 19 hoists metadata to the start of a server render. Move it into the
    // document head. The plain <title> stays as-is (main.tsx removes it by tag
    // name before the client mounts its own); everything else is marked so the
    // client can find and remove these static copies the same way.
    body = body.replace(/<title\b[^>]*>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>|<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g, tag => {
      head.push(/^<title>/.test(tag) ? tag : tag.replace(/^<(\w+)/, '<$1 data-prerender-head="true"'))
      return ''
    })
    if (!body.includes('<h1') || !head.some(tag => tag.startsWith('<title'))) {
      throw new Error(`Missing rendered content or title: ${path}`)
    }
    const html = shell.replace('</head>', `${head.join('\n')}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
    const target = path === '/404' ? 'dist/404.html' : join('dist', path, 'index.html')
    await mkdir(dirname(target), { recursive: true })
    await writeFile(target, html)
    console.log(`Rendered ${path}`)
  }
} finally {
  await server.close()
}
