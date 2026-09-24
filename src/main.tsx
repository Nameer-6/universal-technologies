import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
// Self-hosted typefaces (variable WOFF2, latin + latin-ext subsets) — no third-party font requests.
import '@fontsource-variable/dm-sans/opsz.css'
import '@fontsource-variable/dm-sans/opsz-italic.css'
import '@fontsource-variable/outfit/index.css'
import './index.css'
import App from './App.tsx'

// The prerendered/static HTML ships its own title, description, canonical,
// social tags, and JSON-LD so crawlers and no-JS clients see real content.
// Remove those static copies before Helmet mounts its own, so the two
// don't end up duplicated in the live DOM.
document.head.querySelectorAll('[data-prerender-head], title, meta[name="description"]').forEach(node => node.remove())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
