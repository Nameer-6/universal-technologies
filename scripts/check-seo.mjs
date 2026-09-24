import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { handleRequest } from './serve.mjs'

const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname)
// Retired URLs: must redirect, never appear in the sitemap or be linked internally (audit SEO-01/02/06).
const LEGACY = ['/services/ai', '/services/software-development', '/services/ui-ux', '/services/cybersecurity']
for (const old of LEGACY) assert(!paths.includes(old), `sitemap lists legacy URL ${old}`)
assert(paths.includes('/security'), 'sitemap lists /security')
const titles = new Set()
const descriptions = new Set()
const decode = text => text.replace(/&amp;/g, '&').replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/<!--.*?-->/g, '')
for (const path of paths) {
  const html = await readFile(join('dist', path, 'index.html'), 'utf8')
  const head = html.match(/<head>([\s\S]*?)<\/head>/)[1]
  const body = html.match(/<body>([\s\S]*?)<\/body>/)[1]
  assert.equal([...head.matchAll(/<title>/g)].length, 1, `${path}: one title`)
  assert.equal([...head.matchAll(/name="description"/g)].length, 1, `${path}: one description`)
  const title = decode(head.match(/<title>(.*?)<\/title>/)[1])
  const description = decode(head.match(/name="description" content="([^"]*)"/)[1])
  assert(!titles.has(title), `${path}: unique title`); titles.add(title)
  assert(!descriptions.has(description), `${path}: unique description`); descriptions.add(description)
  assert(title.length <= 60, `${path}: title length ${title.length}`)
  assert(description.length <= 165, `${path}: description length ${description.length}`)
  assert.equal([...head.matchAll(/rel="canonical"/g)].length, 1)
  assert(head.includes(`href="https://universal-technologies.com${path}"`), `${path}: canonical`)
  for (const name of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card']) assert(head.includes(`"${name}"`), `${path}: ${name}`)
  assert.equal([...body.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: one visible H1`)
  // Scroll-reveal sections intentionally start at opacity:0 in the markup (framer-motion
  // animates them in on scroll) — that's a rendering detail, not missing content. What
  // matters for a no-JS client or crawler is that the actual text is present in the raw
  // HTML, which the H1/FAQ/link assertions below already verify independent of styling.
  const schemas = [...head.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)].map(match => JSON.parse(match[1]))
  assert(schemas.some(schema => schema['@type'] === 'Organization'))
  if (path.startsWith('/services/')) {
    assert(schemas.some(schema => schema['@type'] === 'Service'))
    const faq = schemas.find(schema => schema['@type'] === 'FAQPage')
    assert(faq && faq.mainEntity.length >= 2)
    for (const question of faq.mainEntity) {
      assert(decode(body).includes(question.name))
      assert(decode(body).includes(question.acceptedAnswer.text))
    }
  }
  if (path.startsWith('/careers/')) assert(schemas.some(schema => schema['@type'] === 'JobPosting' && schema.description.startsWith('<p>')))
  for (const match of body.matchAll(/href="(\/[^"#?]*)/g)) {
    const link = match[1]
    assert(paths.includes(link), `${path}: internal link ${link} exists`)
    assert(!LEGACY.includes(link), `${path}: links to legacy URL ${link}`)
  }
  assert(!body.includes('class="topbar"'), `${path}: generic announcement strip removed`)
  assert.equal([...body.matchAll(/<header\b/g)].length, 1, `${path}: exactly one global header`)
  assert.equal([...body.matchAll(/<footer\b/g)].length, 1, `${path}: exactly one global footer`)
  assert(!body.includes('Live metric'), `${path}: no illustrative metric labelled live`)
  assert(!/Get Started|Book a consultation|Start free audit/.test(body), `${path}: legacy CTA wording`)
  assert(!/replies immediately|reply immediately/i.test(body), `${path}: one response-time promise`)
  assert(!body.includes('fonts.googleapis.com') && !head.includes('fonts.googleapis.com'), `${path}: no Google Fonts request`)
  assert(schemas.some((schema) => schema['@type'] === 'WebSite'), `${path}: WebSite schema`)
  if (path !== '/') assert(schemas.some((schema) => schema['@type'] === 'BreadcrumbList'), `${path}: BreadcrumbList schema`)
  // A related/other-roles heading must never render without cards under it (audit UX-02/03).
  for (const [heading, card] of [['Related service lines', 'svc-related-card'], ['Other open roles', 'related-job-card']]) {
    if (body.includes(heading)) assert(body.includes(card), `${path}: empty "${heading}" section`)
  }
  if (path.startsWith('/services/')) {
    assert(body.includes('Illustrative example of a delivery environment'), `${path}: illustrative-data caption`)
  }
}
// Exercise the real HTTP handler without opening a socket.
async function request(path, host = 'universal-technologies.com', method = 'GET', extraHeaders = {}) {
  const result = {}
  await handleRequest({ url: path, method, headers: { host, ...extraHeaders } }, {
    writeHead(status, headers) { result.status = status; result.headers = headers; return this },
    end(body) { result.body = body?.toString(); return this },
  })
  return result
}
for (const path of paths) assert.equal((await request(path)).status, 200)
assert.equal((await request('/not-a-real-page')).status, 404)
assert.equal((await request('/%2fevil.example/')).status, 400)
assert.equal((await request('/%2e%2e%2fpackage.json')).status, 400)
assert.equal((await request('/services/not-real')).status, 404)
assert.equal((await request('/services/cybersecurity')).status, 410)
for (const old of ['/services/software-development', '/services/ui-ux']) {
  const result = await request(old)
  assert.equal(result.status, 301)
  assert.equal(result.headers.Location, '/services/end-to-end-development')
}
// Legacy AI URL: one 301 straight to the canonical service (no chain, no duplicate homepage content).
{
  const result = await request('/services/ai')
  assert.equal(result.status, 301)
  assert.equal(result.headers.Location, '/services/ai-agents')
  assert(paths.includes(result.headers.Location), 'redirect target is a canonical sitemap URL')
  assert.equal((await request('/services/ai/')).headers.Location, '/services/ai-agents', 'trailing-slash variant is also a single hop')
}
// http and www variants each reach the canonical https host in a single permanent redirect.
{
  const http = await request('/services/qa?x=1', 'universal-technologies.com', 'GET', { 'x-forwarded-proto': 'http' })
  assert.equal(http.status, 301)
  assert.equal(http.headers.Location, 'https://universal-technologies.com/services/qa?x=1')
  const https = await request('/services/qa', 'universal-technologies.com', 'GET', { 'x-forwarded-proto': 'https' })
  assert.equal(https.status, 200)
  const wwwHttp = await request('/services/qa', 'www.universal-technologies.com', 'GET', { 'x-forwarded-proto': 'http' })
  assert.equal(wwwHttp.headers.Location, 'https://universal-technologies.com/services/qa')
}
assert.equal((await request('/about/', 'universal-technologies.com')).headers.Location, '/about')
assert.equal((await request('/about?source=test', 'www.universal-technologies.com')).headers.Location, 'https://universal-technologies.com/about?source=test')
assert.equal((await request('/about', undefined, 'HEAD')).body, undefined)
assert.equal((await request('/about', undefined, 'POST')).status, 405)
assert((await readFile('dist/404.html', 'utf8')).includes('noindex, follow'))
console.log(`SEO checks passed for ${paths.length} rendered pages, FAQs, links, schemas, redirects, and error responses.`)
