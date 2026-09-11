# September 2026 SEO fixes

## Implemented

- `npm run build` renders every sitemap URL to `dist/<route>/index.html` and produces `dist/404.html`. No browser or external rendering service is required at build time.
- Page body, title, description, canonical, social metadata, and JSON-LD are present before JavaScript executes. The browser progressively enhances the static content using the existing React app; this is static rendering followed by a client mount, not hydration.
- All 20 original URLs have distinct metadata adapted from the supplied content pack. Products stays a products showcase with clearer client relevance and contact links.
- All six services have specific audience/problem introductions and visible FAQs backed by matching FAQPage data. Service and Organization markup are included in raw HTML.
- JobPosting markup describes the existing six roles. **Verified original posting dates and eligible countries remain required for Google job rich-result eligibility.** Optional `datePosted` and `applicantCountries` fields are ready in `src/pagesData.ts`; do not substitute deployment dates or invent locations.
- Resources includes two original delivery-planning guides, individual article routes, Article markup, internal links, and sitemap entries.
- Landing page has a responsive hero, direct service navigation, prominent CTA, and delivery principles. It no longer requires scrolling through a pinned 420vh hero to reach the page.
- The explicit placeholder leadership names, founding year, company metrics, and office locations were removed from public copy pending verification. Existing product, hiring, client-list, and benefit claims still need the business owner's confirmation.
- Privacy text now discloses the actual theme storage and Google Fonts requests in the code. Existing contact/application disclosures describe FormSubmit. This code review cannot verify inbox retention or company data practices outside the repository.

## Deploying

Run `npm ci`, `npm run build`, and `npm run check:seo`. Publish the **whole** `dist` directory, preserving nested HTML files.

For Node hosting, run `npm start` after building. `HOST` defaults to `127.0.0.1` and `PORT` to `4173`; use `HOST=0.0.0.0` when the hosting platform requires an external bind. Put the process behind your HTTPS proxy. Forward the original Host header so the www redirect works.

For a static host, configure these equivalent rules at the host/CDN:

| Request | Response |
| --- | --- |
| `www.universal-technologies.com/*` | 301 to the same path/query on `https://universal-technologies.com` |
| HTTP production traffic | Redirect to HTTPS at the TLS proxy/CDN |
| `/services/software-development` | 301 to `/services/end-to-end-development` |
| `/services/ui-ux` | 301 to `/services/end-to-end-development` (design is part of that service) |
| `/services/cybersecurity` | 410; no equivalent standalone service is currently advertised |
| `/about` and other sitemap routes | Serve their own `<route>/index.html`, status 200 |
| Trailing slash or `/index.html` variants | 301 to the canonical clean route |
| Unknown paths | Serve `404.html` with status 404, never the homepage with status 200 |

The included Node server implements these path/host rules. A custom server script is not automatically applied by an unrelated static host. Production redirects and TLS need verification after deployment; the hosting platform has not yet been supplied.

## Business/account follow-up

1. Supply verified founding history, leaders/bios/photos, office cities, and any company metrics before adding trust claims back to About/Contact.
2. Confirm active roles, posting dates, eligible countries, and benefit descriptions.
3. Supply 2–3 permission-cleared client engagements with problem, approach, measured outcome, and optional real quote. No client case studies or testimonials have been fabricated. The products page was kept as the content pack's alternative path.
4. After deployment, submit `https://universal-technologies.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Request indexing for the principal pages and check the rendered HTML. Account access is required; this is not performed by the build.
5. Check actual production response status, canonical host behavior, and social previews. FAQ markup describes visible content; it does not promise enhanced search results or rankings.

## Validation

- `npm run check:seo`: all sitemap HTML, one H1/title/description/canonical per page, distinct bounded metadata, social tags, valid JSON-LD, FAQ/content parity, internal links, and server response/redirect behavior.
- `node scripts/check-browser.mjs`: run with the production server on 4173 and headless Chrome's debugging port on 9223. Checks 1440px, 390px, and 320px layouts, navigation metadata, mobile menu, light/dark toggle, no-JS content, and runtime errors. Screenshots go to `/tmp/universal-home-*.png`.
