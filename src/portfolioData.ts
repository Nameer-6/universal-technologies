/**
 * Content for the /portfolio page, taken from "Universal Technologies — Portfolio.pdf".
 *
 * The draft marks every fact only the owner holds as [LIKE THIS]. None of those
 * are guessed here. The sections that depend on them (stats, case studies,
 * testimonials, team, credentials) start empty and the page hides a section
 * until its array has entries — fill one in and the section appears, no JSX edits.
 *
 * The draft's rule for everything below: don't publish a number you can't defend
 * in a sales call, and get written permission for every client and quote named.
 */

export const portfolioHero = {
  title: 'Software that has to work in production.',
  lead: 'Universal Technologies builds software that moves a business number — revenue, cost, cycle time — and then keeps building until the number moves again.',
}

/** The two-minute version from the draft, with unverifiable counts left out. */
export const whoWeAre = [
  'Most software projects do not fail on code. They fail on the gap between what a business needed and what a vendor was told to build.',
  'We close that gap by staying close to the outcome. Every engagement starts by agreeing what success looks like in numbers — the conversion rate, the hours saved, the release cadence — and we hold ourselves to it through discovery, build and launch. Our engineers sit in your standups. Our architects defend their decisions in plain English.',
  'What separates us is narrow. The engineers who scope your work write it. The team you meet in week one is the team in month twelve. And we measure ourselves on what the software does in production, not what shipped on the roadmap.',
]

export type Stat = { value: string; label: string }

/**
 * "At a glance". The draft suggests seven, each only if you can source it to a
 * system of record: years in business, projects delivered, clients served,
 * countries served, engineers on staff, client retention, years with longest
 * client. Left empty on purpose — the draft's own figures (15 clients, 6
 * countries) don't match the client list in data.ts, and the About page's
 * numbers live in a file labelled placeholder.
 */
export const portfolioStats: Stat[] = []

export const clientsLead =
  'An enterprise platform and a startup MVP need different things from a partner, and we have learned to be honest about which one we are being.'

/** One line above the logo strip so it reads as evidence, not decoration. */
export const clientsCaption =
  'Selected organizations and products our team has supported.'

export type ClientProfile = {
  country: string
  industry: string
  /** What the client company does — public information, not our work for them. */
  does: string
  /** What we built for them. Only the owner can fill this; never guess it. */
  built?: string
}

/**
 * Keyed by the exact `name` in data.ts `clients`. A client with no entry here
 * still shows up as a logo, just without the description card.
 *
 * Deliberately absent, per the draft's own "five I could not pin down":
 * Talently, Ribit, InnoCaption, Ecwid and the unnamed client need their identity
 * confirmed first. "Bluepeak Solutions" is also absent — the draft describes
 * "Bluepeak", a Great Plains fiber broadband company, and the logo on the site
 * reads "Bluepeak Solutions", which may be a different firm.
 */
export const clientProfiles: Record<string, ClientProfile> = {
  'Teladoc Health': {
    country: 'US',
    industry: 'Healthcare',
    does: 'NYSE-listed virtual care — remote consults, chronic care, mental health',
  },
  ClearCaptions: {
    country: 'US',
    industry: 'Telecom / accessibility',
    does: 'FCC-certified captioned phone service for people with hearing loss',
  },
  'Peek Pro': {
    country: 'US',
    industry: 'Travel & hospitality',
    does: 'Booking and operations platform for tour and activity operators',
  },
  Dovetail: {
    country: 'Australia',
    industry: 'SaaS — research',
    does: 'Customer-insight repository for qualitative research teams',
  },
  Scopi: {
    country: 'Brazil',
    industry: 'SaaS — strategy',
    does: 'Strategic planning and performance management (BSC/OKR) software',
  },
  DigiKhata: {
    country: 'Pakistan',
    industry: 'Fintech',
    does: 'Digital ledger app for Pakistani retailers — credit, sales, expenses',
  },
  iCeipts: {
    country: 'India',
    industry: 'Logistics',
    does: 'AI dispatch, fleet automation and HRMS for mining and transport',
  },
  'MORE in 1': {
    country: 'US',
    industry: 'Real estate',
    does: 'LA and Orange County marketplace linking buyers, sellers, agents, lenders',
  },
}

export type Quote = { text: string; name: string; role: string; company: string }

export type CaseStudy = {
  id: string
  /** e.g. "Regulated enterprise platform" */
  kind: string
  title: string
  industry: string
  duration: string
  team: string
  stack: string[]
  challenge: string
  approach: string
  built: string
  /** One number per bullet, with a before and an after. */
  results: string[]
  /** Needs the client's written approval. */
  quote?: Quote
}

/**
 * Featured case studies. The draft's four shapes: a regulated enterprise build,
 * a logistics/field platform, a SaaS engagement, an emerging-market consumer
 * product. If the client hasn't signed off on their name, publish it unnamed
 * ("a NYSE-listed telehealth provider") in the title.
 */
export const caseStudies: CaseStudy[] = []

export const servicesLead =
  'Pick the lanes you need — we keep architecture, quality, and launch in the same conversation.'

export const techLead =
  'We choose technology on three tests: can it carry the load you will have in three years, can your team hire for it, and can we hand it over cleanly. That last one rules out more clever options than the first two combined. Every system we build ships with documentation, tests and a handover session — because the measure of a good engagement is that you do not need us for it afterwards.'

/**
 * Trimmed to stacks already published on the services pages. The draft's fuller
 * table is easy to overreach; a technical buyer will catch a language nobody
 * on staff has shipped.
 */
export const techLayers: { layer: string; items: string[] }[] = [
  { layer: 'Front end', items: ['React', 'Next.js', 'TypeScript'] },
  { layer: 'Back end', items: ['Node.js', 'GraphQL', 'REST'] },
  { layer: 'Mobile', items: ['React Native'] },
  { layer: 'Data', items: ['Postgres', 'Redis'] },
  { layer: 'Cloud & platform', items: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'] },
  { layer: 'AI', items: ['LangChain', 'LangGraph', 'OpenAI', 'Anthropic', 'Pinecone'] },
  { layer: 'Quality', items: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Postman'] },
]

export type EngagementModel = {
  name: string
  bestWhen: string
  commercials: string
}

export const engagementLead =
  'The right model depends on how well-defined the work is and how much of it your own team will carry. Dedicated team is the honest default for anything that will take more than three months — software scope moves, and a fixed price that assumes it will not gets defended through change requests. Fixed price suits work where the specification is genuinely closed; we quote it after discovery, not before. Staff augmentation works when your team knows exactly what to build and is short of capacity. A support retainer covers live systems, ours or someone else\'s.'

export const engagementModels: EngagementModel[] = [
  {
    name: 'Dedicated team',
    bestWhen: 'Scope will evolve; you want continuity',
    commercials: 'Monthly per person',
  },
  {
    name: 'Fixed scope, fixed price',
    bestWhen: 'Requirements are settled and stable',
    commercials: 'Milestone payments',
  },
  {
    name: 'Staff augmentation',
    bestWhen: 'You have the plan, you need the hands',
    commercials: 'Hourly or daily rate',
  },
  {
    name: 'Support retainer',
    bestWhen: 'The system is live and needs looking after',
    commercials: 'Monthly, banded by hours',
  },
]

export const differentiators = [
  {
    question: 'Will I get the senior people who came to the pitch?',
    answer:
      'Yes. The engineers who scope your work write it. We do not run a bench-and-rotate model, and we will name your team in the proposal.',
  },
  {
    question: 'How do I know the estimate means anything?',
    answer:
      'We do not estimate before discovery. After discovery you get a fixed price or a tight range, and we tell you which parts of the scope are uncertain and why.',
  },
  {
    question: 'What happens when I want to leave?',
    answer:
      'You own the code, the infrastructure and the documentation — from the first commit, not at final payment. Repositories are in your organisation. We run a handover session and we answer the phone afterwards.',
  },
  {
    question: 'Do you understand my business, or only software?',
    answer:
      'We work in healthcare, telecom, logistics and payments specifically, which means we arrive knowing how a compliance requirement lands in a data model and why an offline-capable app is a different build from an online one. You will spend the first meeting on your problem, not on teaching us the sector.',
  },
  {
    question: 'What if you tell me what I want to hear?',
    answer:
      'We have talked clients out of builds. If an off-the-shelf product solves it for a tenth of the price, we will say so — and that has cost us work. It has also produced most of our referrals.',
  },
]

export const processLead = 'Testing runs inside the build loop rather than after it.'

export const workStages = [
  {
    step: '01',
    title: 'Discovery',
    timing: '1 to 3 weeks',
    text: 'We map the problem before we price the solution: stakeholder interviews, review of current systems, technical constraints, and the success measures we will be held to. You get a requirements document, a proposed architecture, a delivery plan and a fixed price or a rate card with a confident range. Paid, and creditable against the build if you proceed.',
  },
  {
    step: '02',
    title: 'Design',
    timing: '2 to 4 weeks',
    text: 'User flows, wireframes, then high-fidelity screens and a component library. Your team reviews clickable prototypes before engineering starts, because changing a prototype costs an afternoon and changing a built feature costs a sprint.',
  },
  {
    step: '03',
    title: 'Build',
    timing: 'Two-week sprints',
    text: 'Sprint planning on Monday, demo on the second Friday, and a staging environment you can use at any point in between. You get a named delivery lead, direct access to engineers on your own Slack or Teams channel, and a burndown you can check without asking.',
  },
  {
    step: '04',
    title: 'Test',
    timing: 'Continuous',
    text: 'Automated unit and integration tests in the pipeline; manual QA against acceptance criteria each sprint; performance and security testing before launch; a user acceptance window with your team. Nothing ships on a green pipeline alone.',
  },
  {
    step: '05',
    title: 'Launch',
    timing: 'Staged',
    text: 'A deployment runbook with a rehearsed rollback, phased or canary release where the risk warrants it, monitoring and alerting live before traffic, and a support window with heightened response for the first two weeks.',
  },
  {
    step: '06',
    title: 'Support',
    timing: 'Ongoing',
    text: 'An agreed response commitment, proactive monitoring, dependency and security patching, and a quarterly review of what to improve next. Your team gets documentation and a handover session; the aim is that you could run it without us.',
  },
]

export const clientAsks = [
  'One decision-maker who can settle a scope question inside 48 hours.',
  'Access to the people who do the work — not only the people who manage it.',
  'Honesty about constraints — the budget ceiling, the immovable date, the political landmine. We plan around constraints we know about and get ambushed by the ones we do not.',
]

export const industriesLead =
  "We work in industries where software failure has consequences: healthcare, telecom, logistics and payments. That shapes how we build — tests before features, rollback plans before launches, and an architecture our clients' own engineers can read."

/**
 * `proof` names must match a `name` in data.ts `clients`; any that don't are
 * dropped at render time, so the page never names a client that isn't on the
 * roster. The draft also lists WheeKeep (logistics) and Bluepeak (telecom) as
 * proof — add them here once they're on the roster under those names.
 */
export const industries = [
  {
    name: 'Healthcare & telehealth',
    problem: 'Care delivered remotely, under regulation, at scale',
    proof: ['Teladoc Health'],
  },
  {
    name: 'Telecom & accessibility',
    problem: 'Networks and services where uptime is the product',
    proof: ['ClearCaptions'],
  },
  {
    name: 'Logistics & field operations',
    problem: 'Operations running on spreadsheets and phone calls',
    proof: ['iCeipts'],
  },
  {
    name: 'Fintech',
    problem: 'Money moving correctly, every time, on modest hardware',
    proof: ['DigiKhata'],
  },
  {
    name: 'SaaS & product companies',
    problem: 'A product team that needs to ship faster than it can hire',
    proof: ['Dovetail', 'Scopi'],
  },
  {
    name: 'Travel & hospitality',
    problem: 'Bookings, availability and payments that cannot go down in season',
    proof: ['Peek Pro'],
  },
  {
    name: 'Real estate',
    problem: 'Fragmented transactions with too many parties',
    proof: ['MORE in 1'],
  },
]

/**
 * Client quotes. A useful one has three parts — the before, the after with a
 * number, and a human note — and needs the client's written approval to use
 * their name, title and company.
 */
export const testimonials: Quote[] = []

export type TeamMember = {
  name: string
  role: string
  bio: string
  /** Path under /public, e.g. "/team/jane-doe.jpg". Initials are shown without one. */
  photo?: string
  linkedin?: string
}

/**
 * Three to five named leaders with real photographs and real LinkedIn links.
 * Not seeded from pagesData.ts `leadership` — that file is labelled placeholder.
 */
export const team: TeamMember[] = []

export type CredentialGroup = {
  title: string
  items: { name: string; detail?: string }[]
}

/**
 * Only what you actually hold — an aspirational certification is the fastest way
 * to lose an enterprise deal at procurement. Groups the draft suggests:
 * "Certifications and compliance" (ISO 27001, SOC 2, ...), "Cloud and technology
 * partnerships" (name, tier, since), and "Recognition" (award or listing, body, year).
 */
export const credentials: CredentialGroup[] = []

export const portfolioClosing = {
  title: 'Tell us what is not working.',
  text: 'Most of our engagements start with a thirty-minute call and no obligation. Bring the problem, not a specification — working out what to build is the part we are good at. You will leave the call with a view on whether the thing is worth building, roughly what it takes, and whether we are the right people for it. Sometimes the answer is no, and we will tell you.',
}
