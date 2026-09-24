# Master website audit — remediation tracker

Source: *Universal Technologies Master Website Audit* (19 September 2026). This file records what was fixed in this repository, what still needs a decision or data from the business owner, and what needs external tooling. Update it whenever a status changes.

Status key: **Done** (in code, covered by `npm run check:seo` where noted) · **Owner input** (code path is ready, a verified fact/asset is missing) · **Tooling** (needs GSC, Lighthouse, DNS/host or a manual QA pass) · **Not done** (out of scope for this repo or needs new content).

## P0

| ID | Status | Notes |
| --- | --- | --- |
| ENT-01 founding year | **Done in code** / **Owner action** | Confirmed by business owner (23 Sep 2026): 2022. `companyFacts.foundedYear` and `timeline` set. LinkedIn currently shows 2023 (per this audit) — **update LinkedIn to 2022** so the two stay aligned, the original point of this item. |
| ENT-02 HQ / locations | **Done** | Confirmed by business owner (23 Sep 2026): Katy, Texas, USA, matching LinkedIn. `companyFacts.headquarters` set. `offices` (additional delivery hubs) still empty. |
| ENT-03 legal entity | **Owner input** | Name confirmed ("Universal Technologies"). Still need entity **type** (e.g. LLC), **jurisdiction** and **registered address** — Terms renders all four together, so `companyFacts.legalEntity` stays unset until all are known. |
| ENT-04 Security & Trust | **Done** | `/security`, linked from footer, Home and Contact; in sitemap. Content limited to claims already made elsewhere on the site. **Owner should confirm every statement** (see claims register). |
| ENT-05 illustrative metrics | **Done** | "Live metric" → "Sample metric", plus a visible caption under every service console. Checked by `check:seo`. |
| SEO-01 `/services/ai` | **Done in `serve.mjs`** | 301 → `/services/ai-agents` in one hop (also for the trailing-slash variant). **Static hosts need the equivalent rule** — see `seo-delivery.md`. |
| SEO-02 `/services/software-development` | **Done in `serve.mjs`** | Already redirected; now regression-tested and asserted absent from sitemap/internal links. |
| SEO-03 www / http | **Done in `serve.mjs`** | www and `X-Forwarded-Proto: http` each reach `https://universal-technologies.com` in one 301. **Tooling:** confirm DNS/host actually enforces this in production and that no Hostinger parked page answers on `www`. |
| SEO-04 canonicals | **Done in code** / **Tooling** | Every prerendered page has one self-referential canonical (checked). Confirm in Search Console URL Inspection. |
| SEO-05 robots.txt | **Done in code** / **Tooling** | `public/robots.txt` allows crawling and names the sitemap. Confirm it is served with 200 in production. |
| SEO-06 sitemap | **Done in code** / **Tooling** | Hand-maintained; `check:seo` fails if a legacy URL is listed or a listed URL does not render. Submit in GSC. |
| SEO-07 GSC indexation | **Tooling** | Needs account access. |
| UX-01 one header/footer | **Done** | A single `Layout` wraps every route; `check:seo` asserts exactly one `<header>` and `<footer>` per page. If the live site still shows an old shell, it is a stale deployment/cache, not this code. |
| UX-02 / UX-03 empty related sections | **Done** | Sections render only when they have cards; `check:seo` fails on an empty heading. |

## P1

| ID | Status | Notes |
| --- | --- | --- |
| ENT-06 client logos | **Owner input** | Portfolio heading changed from "Trusted by teams at" to "Organizations our team has supported". Keep a private evidence sheet per logo; one placeholder logo (`frog.jpg`, name "Client") is still hidden from the marquee until named. |
| ENT-07 / UX-10 leadership | **Deferred (owner choice)** | Section built (auto-advancing 3-per-page carousel with arrows/dots, `SHOW_LEADERSHIP` flag in `About.tsx`), currently off — business owner said not to add founders yet. `companyFacts.leadership` still needs real name/role/bio/LinkedIn per person before flipping it on. |
| ENT-08 / UX-12 case studies, Portfolio focus | **Not done** | Needs 2–3 permissioned case studies. No content was invented. |
| ENT-09 procurement support | **Done** (verify wording) | Section on `/security` and a note on Contact. |
| ENT-10 "no account-manager layer" | **Done** | Now "Direct senior access" with named delivery lead and escalation path. |
| ENT-11 response time | **Done** | One promise, `RESPONSE_PROMISE` ("within 4 working hours", the wording already on the Contact page and wizard). Change it once in `src/data.ts` (and the Contact meta description in `src/seoData.ts`, and the wizard line in `BookCallWizard.tsx`, which still has the phrase inline). |
| ENT-12 LinkedIn alignment | **Not done** | External. |
| SEO-08 / SEO-09 metadata | **Done in code** | `check:seo` enforces unique titles/descriptions within length limits. About, Portfolio ("Our Work") and Contact metadata updated. Resubmit sitemap and request reindexing in GSC. |
| SEO-10 structured data | **Done in code** / **Tooling** | Organization + WebSite site-wide, BreadcrumbList on inner pages, Service/FAQPage, Article, JobPosting. Validate with the Rich Results Test. |
| SEO-11 JobPosting | **Partly — `validThrough` resolved** | Roles are rolling/always-open (confirmed by business owner, 23 Sep 2026): `validThrough` is intentionally left unset rather than given a fake expiry — Google's guidance is to omit it for non-expiring postings, not invent a date. `datePosted` and `applicantCountries` are still optional per job and still need real values if you want them (freshness signal for Google Jobs); not guessed. |
| SEO-12 / CON-02 article authors | **Owner input** | `author`, `reviewer`, `datePublished`, `dateModified` supported on each article in `resourcesData.ts`; byline and schema appear automatically. |
| SEO-13 / CON-04 products | **Done** (partly) | Every product card links to its page; status meaning and how to engage are shown on cards and pages; related-service and other-product links added. |
| SEO-14 related content | **Done** | See UX-02/03. |
| UX-04 CTA system | **Done** | `PRIMARY_CTA` ("Talk to our team") used site-wide; "Request a demo" kept for products. The Contact page keeps its "Book a call" heading. |
| UX-05 Insights nav | **Done** | "Insights" added to the header (only two guides exist — see CON-01). |
| UX-06 / CON-05 repeated service templates | **Done** (outcomes) | Each service has its own three outcomes. Distinct hero visuals per service are **Not done**. |
| UX-07 "Learn more" links | **Done** | No such links exist in the code. |
| UX-08 / UX-14 Home repetition, tech inventory | **Partly** | The decorative technology cloud was cut from 36 to 18 representative tools. The Home services and capability sections were not merged. |
| UX-09 product screenshots | **Not done** | Needs real screenshots. Until then product pages stay thin (SEO-16); consider `noindex` if they are not expanded. |
| UX-11 contact "what happens next" | **Done** | The wizard already has a next-steps panel and reply note. |
| CON-01 resource library depth | **Not done** | Needs content. |
| CON-03 AI data handling | **Done** (verify wording) | New AI FAQ ("How is our data handled…") and the `/security` AI controls describe what is agreed in scoping; they do not claim specific provider terms. |
| PRV-01 FormSubmit | **Not done** | Architectural decision (own backend). Documented as a service provider in the Privacy Policy. |
| PRV-02 privacy policy | **Partly** | Controller line appears when the legal entity is set; service-provider section added; fonts section updated. Counsel review still needed. |
| PRV-03 / PRV-04 form QA, A11Y-01…03, MOB-01/02 | **Tooling** | Field errors are text-based and linked by `aria-describedby`; mobile menu has `aria-controls`, Escape closes it and returns focus (verified in Chrome). A full WCAG 2.2 AA and mobile pass is still required. |
| PERF-01 Core Web Vitals | **Tooling** | Run PageSpeed Insights / Lighthouse. |
| OPS-01 monitoring | **Done** (process) | See checklist below; needs a named owner. |
| OPS-02 regression gate | **Done** | `.github/workflows/ci.yml` runs build + `check:seo` on every push/PR. |
| OPS-03 centralization | **Done** | Header/footer/CTA/response promise/company facts each have one source. |

## P2

| ID | Status | Notes |
| --- | --- | --- |
| ENT-13 tone | **Done** (main instances) | Removed jabs on Home, About, data copy. Some contrast phrasing ("not a bolted-on chatbot") remains. |
| ENT-14 timeline | **Done** | Renders from `companyFacts.timeline`; one entry set (2022 founding). |
| SEO-15 Work vs Portfolio | **Done** | Visible label is "Work" everywhere; the URL stays `/portfolio`. |
| SEO-16 thin product pages | **Owner input** | See UX-09. |
| UX-13 announcement strip | **Done** | Removed (markup, CSS, mobile rule). |
| UX-15 / UX-16 | **Tooling** | Needs a design-system pass. |
| UX-17 theme toggle | **Done** | Real button, label describes the action, stale `aria-pressed` removed, OS preference on first visit, choice persisted. |
| CON-06 career benefits | **Owner input** | Verify benefits and eligibility. |
| PERF-02 Google Fonts | **Done** | DM Sans and Outfit are self-hosted variable WOFF2 via `@fontsource-variable/*`; no third-party requests (verified in Chrome). |
| PERF-03 motion | **Partly** | Continuous animations already respect reduced motion; cloud tiles halved. |
| PERF-04 / PERF-05 | **Tooling** | Image/DOM audit. |
| OPS-04 claims register | **Done** (process) | See below. |

## Also fixed while doing this

- `npm run build` was failing: five TypeScript errors (`variants={item}` inside `.map((item) => …)` shadowed the motion variants in About, Careers and Services; an unused variable in Home). Renamed the loop variables.
- `scripts/check-browser.mjs`: two stale assertions (service-card count; assumed dark theme on start) now scoped/environment-independent.

## Claims register (OPS-04)

A public claim should have an owner, a source and a last-verified date. Fill in the last two.

| Claim | Where | Owner | Source | Verified |
| --- | --- | --- | --- | --- |
| Repositories, infrastructure and docs stay in the client's organisation | Home, `/security` | | | |
| Ownership/access/handoff defined in the engagement agreement | `/security`, SaaS FAQ | | | |
| Tests run in CI before merge | Home, `/security` | | | |
| AI data handling is agreed in writing before build; can work with client-approved providers/environments | AI FAQ, `/security` | | | |
| NDA / vendor questionnaire available on request | `/security`, Contact | | | |
| Reply within 4 working hours | Contact, About, form success | | | |
| No tracking cookies/analytics; forms via FormSubmit | Privacy, `/security` | | | |
| Career benefits (PTO, stipend, etc.) | Careers, jobs | | | |
| Client logos (13 named) | Home, Portfolio | | | |
| Removed as unverified: founded 2016; "120+ products shipped, 40+ team, 18 countries"; Austin HQ, Lisbon and Bengaluru hubs; three named leaders (Amara Okoye, Daniel Cho, Priya Nair) | About, Contact | | | |

## Recurring SEO checklist (OPS-01)

Named owner: ______. After every release that touches routes, and monthly:

1. `npm run build && npm run check:seo` is green (CI does this).
2. GSC → Pages: no unexpected "Excluded"/"Duplicate" URLs; `/services/ai`, `/services/software-development` and `www` are not indexed.
3. GSC → Sitemaps: `https://universal-technologies.com/sitemap.xml` processed, URL count equals the sitemap.
4. Spot-check redirects with `curl -I` (legacy URLs, www, http) — one hop each.
5. URL Inspection on Home, one service, `/security`: canonical is the chosen host.
6. Core Web Vitals report and manual-actions/security-issues pages.
7. Rich Results Test on one service, one job, one article.
8. Review the claims register for stale entries.
