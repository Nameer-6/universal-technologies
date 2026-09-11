import { renderToPipeableStream } from 'react-dom/server'
import { PassThrough } from 'node:stream'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const destination = new PassThrough()
    const chunks: Buffer[] = []
    destination.on('data', chunk => chunks.push(Buffer.from(chunk)))
    destination.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    destination.on('error', reject)
    const stream = renderToPipeableStream(
      <HelmetProvider><StaticRouter location={url}><App /></StaticRouter></HelmetProvider>,
      {
        onAllReady() { stream.pipe(destination) },
        onShellError: reject,
        onError: reject,
      },
    )
  })
}
