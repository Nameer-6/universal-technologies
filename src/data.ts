export type Service = {
  id: string
  title: string
  summary: string
  stacks: string[]
  mark: string
}

export const CONTACT_EMAIL = 'contact@universal-technologies.com'

export const services: Service[] = [
  {
    id: 'web',
    title: 'Web Development',
    mark: '01',
    summary:
      'Customer-facing sites and internal platforms with typed APIs, accessible UI, and performance budgets that hold under load.',
    stacks: ['React', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL'],
  },
  {
    id: 'app',
    title: 'App Development',
    mark: '02',
    summary:
      'Native and cross-platform apps with shared product logic, secure auth, and release trains that stay predictable.',
    stacks: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'],
  },
  {
    id: 'qa',
    title: 'QA Manual & Automation',
    mark: '03',
    summary:
      'Exploratory coverage on the journeys that matter, plus automation that gates merges before users feel the risk.',
    stacks: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Postman'],
  },
  {
    id: 'devops',
    title: 'DevOps',
    mark: '04',
    summary:
      'Pipelines, infrastructure as code, and observability so deploys are routine — not weekend fire drills.',
    stacks: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    id: 'social',
    title: 'Social & Marketing',
    mark: '05',
    summary:
      'Campaign ops, creative systems, and analytics wiring so acquisition compounds instead of restarting every quarter.',
    stacks: ['Meta Ads', 'Google Ads', 'HubSpot', 'GA4', 'Figma'],
  },
  {
    id: 'cms',
    title: 'CMS Development',
    mark: '06',
    summary:
      'Commerce and content platforms your editors can run daily — without filing a ticket for every publish.',
    stacks: ['Shopify', 'WordPress', 'Webflow', 'Sanity', 'Contentful'],
  },
]

const heroTitles: Record<string, string> = {
  web: 'Web development',
  app: 'App development',
  qa: 'QA automation',
  devops: 'Cloud & DevOps',
  social: 'Growth systems',
  cms: 'CMS platforms',
}

const heroTones: Array<'light' | 'dark' | 'brand'> = [
  'light',
  'dark',
  'light',
  'brand',
  'light',
  'dark',
]

export const heroCards = services.map((service, index) => ({
  id: service.id,
  mark: service.mark,
  title: heroTitles[service.id] ?? service.title,
  subtitle: service.stacks.slice(0, 3).join(' · '),
  chips: service.stacks,
  tone: heroTones[index] ?? 'light',
}))

export const swarmTiles = [
  'React',
  'Next.js',
  'Flutter',
  'AWS',
  'Playwright',
  'Shopify',
  'Kubernetes',
  'TypeScript',
  'WordPress',
  'Cypress',
  'Docker',
  'Webflow',
  'GraphQL',
  'Terraform',
  'Swift',
  'Node.js',
  'Figma',
  'GA4',
  'Expo',
  'NestJS',
  'Azure',
  'Appium',
  'Sanity',
  'Kotlin',
  'CI/CD',
  'SEO',
  'REST',
  'Sentry',
  'Redis',
  'Postgres',
  'Vite',
  'Tailwind',
  'Jest',
  'Prisma',
  'Vercel',
  'GCP',
]

export const backboneMetrics = [
  { value: '6', label: 'Integrated service lines' },
  { value: '1×', label: 'Accountable delivery team' },
  { value: '1d', label: 'Typical first response' },
]

/** Partnership operating model — not the same as engagement shapes below */
export const howItWorks = [
  {
    step: '01',
    title: 'Align',
    text: 'Kick off with a shared scoreboard: users, constraints, launch date, and the systems already in production.',
    cards: [
      { label: 'Kickoff brief', detail: 'Goals locked in writing' },
      { label: 'System map', detail: 'What you already run' },
      { label: 'Definition of done', detail: 'Acceptance criteria' },
    ],
  },
  {
    step: '02',
    title: 'Prioritize',
    text: 'Cut the work to the thinnest slice that proves value — and name the risks that would stop the release.',
    cards: [
      { label: 'Value slice', detail: 'First shippable cut' },
      { label: 'Risk board', detail: 'Blockers called early' },
      { label: 'Owners', detail: 'Who decides what' },
    ],
  },
  {
    step: '03',
    title: 'Ship',
    text: 'Build, test, and deploy in short loops with demos your stakeholders can react to — not status decks.',
    cards: [
      { label: 'Sprint demos', detail: 'Working software weekly' },
      { label: 'Quality gates', detail: 'Merge-ready checks' },
      { label: 'Release notes', detail: 'What changed, why' },
    ],
  },
  {
    step: '04',
    title: 'Steady',
    text: 'Leave you with monitoring, a clear backlog, and docs your team can run without us in the room.',
    cards: [
      { label: 'Live signals', detail: 'Errors, latency, funnels' },
      { label: 'Backlog', detail: 'Next value ranked' },
      { label: 'Runbooks', detail: 'Ops your team owns' },
    ],
  },
]

/** How teams engage us — distinct from the Align→Steady operating model */
export const engagements = [
  {
    step: 'A',
    title: 'Build with us',
    text: 'Full product squads that own design, engineering, QA, and launch for a scoped initiative.',
    detail: 'Best when you need a release owned end to end.',
  },
  {
    step: 'B',
    title: 'Augment your team',
    text: 'Senior specialists embedded beside your engineers — same backlog, shared rituals, faster throughput.',
    detail: 'Best when the roadmap is clear but capacity is thin.',
  },
  {
    step: 'C',
    title: 'Unstick a release',
    text: 'Focused rescue on quality, infrastructure, or delivery bottlenecks blocking a near-term launch.',
    detail: 'Best when the date is fixed and the path is not.',
  },
]

/** Tangible results — not restated philosophy from How it works */
export const outcomes = [
  {
    title: 'One owner for the release',
    text: 'A single delivery lead across web, mobile, QA, and cloud — so questions stop bouncing between vendors.',
  },
  {
    title: 'Fewer late surprises',
    text: 'Automation and exploratory testing sit on the critical path before merge, not after the demo.',
  },
  {
    title: 'Handoff you can run',
    text: 'Runbooks, environments, and backlog hygiene so your team keeps shipping when our engagement ends.',
  },
]

export const industries = [
  'FinTech',
  'Healthcare',
  'Retail & Ecommerce',
  'SaaS',
  'Education',
  'Logistics',
  'Marketplaces',
  'Media',
]
