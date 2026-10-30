// Builds public/og-image.png, the 1200×630 social preview used as the default
// og:image / twitter:image. Re-run after changing the logo or tagline:
//   node scripts/generate-og-image.mjs
import sharp from 'sharp'

const WIDTH = 1200
const HEIGHT = 630
const INK = '#0c0f14'
const BRAND = '#e31c23'
const TEXT = '#f2f3f5'
const MUTED = '#c7cbd1'

const background = Buffer.from(`
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="15%" r="70%">
      <stop offset="0%" stop-color="${BRAND}" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="${BRAND}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${INK}"/>
  <rect width="100%" height="100%" fill="url(#glow)"/>
  <rect x="80" y="300" width="96" height="6" rx="3" fill="${BRAND}"/>
  <text x="80" y="386" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="${TEXT}">AI Agents, Automation &amp;</text>
  <text x="80" y="456" font-family="Helvetica, Arial, sans-serif" font-size="58" font-weight="700" fill="${TEXT}">Software Delivery</text>
  <text x="80" y="540" font-family="Helvetica, Arial, sans-serif" font-size="28" fill="${MUTED}">One accountable team for engineering, automation, and AI.</text>
</svg>`)

const logo = await sharp('public/logo-on-dark.png').resize({ height: 120 }).toBuffer()

await sharp(background)
  .composite([{ input: logo, left: 72, top: 110 }])
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png')

console.log('Wrote public/og-image.png')
