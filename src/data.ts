export type Service = {
  id: string
  title: string
  summary: string
  stacks: string[]
  mark: string
}

export const CONTACT_EMAIL = 'contact@universal-technologies.com'
export const HR_EMAIL = 'hr@universal-technologies.com'

export const services: Service[] = [
  {
    id: 'software-development',
    title: 'Software Development',
    mark: '01',
    summary:
      'Web, mobile, and SaaS products built and modernized by engineers who work inside your roadmap — not a separate delivery track.',
    stacks: ['React', 'Next.js', 'React Native', 'Node.js', 'GraphQL'],
  },
  {
    id: 'qa',
    title: 'QA & Test Automation',
    mark: '02',
    summary:
      'Ship faster with automated release gates, scalable test automation, and hands-on quality engineering.',
    stacks: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Postman'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    mark: '03',
    summary:
      'Complex product requirements turned into clear user flows, prototypes, design systems, and development-ready interfaces.',
    stacks: ['Figma', 'Framer', 'Design Tokens', 'Storybook', 'Maze'],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    mark: '04',
    summary:
      'Deployment speed, reliability, and visibility improved through CI/CD, cloud infrastructure, observability, and infrastructure automation.',
    stacks: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Pen Testing',
    mark: '05',
    summary:
      'Vulnerabilities found and fixed across web, mobile, APIs, cloud, and networks — before they become incidents.',
    stacks: ['Burp Suite', 'OWASP ZAP', 'Nmap', 'Metasploit', 'Nessus'],
  },
  {
    id: 'ai',
    title: 'AI & Generative Solutions',
    mark: '06',
    summary:
      'Production-ready LLM applications, RAG systems, copilots, and AI agents — shipped with evaluation, guardrails, and monitoring.',
    stacks: ['OpenAI', 'LangChain', 'Pinecone', 'LlamaIndex', 'Anthropic'],
  },
]

export type ServiceConsole = {
  repo: string
  version: string
  files: string[]
  activeCount: number
  activeDelta: string
  snippet: string
  build: string
  services: { name: string; status: string }[]
  latency: string
  uptime: string
  activity: string[]
  /** Show a live device preview next to the code (mobile app builds only). */
  devicePreview?: boolean
}

export type ServiceDetail = {
  stats: { value: string; label: string }[]
  capabilities: { tag: string; title: string; text: string }[]
  valueProps: {
    title: string
    text: string
    cards: { label: string; detail: string }[]
  }[]
  console: ServiceConsole
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'software-development': {
    stats: [
      { value: '8–12wk', label: 'MVP to launch' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '2', label: 'Platforms, one team' },
    ],
    capabilities: [
      {
        tag: 'web & saas',
        title: 'Web & SaaS platforms',
        text: 'Customer-facing products and internal systems built around your users, workflows, and business requirements.',
      },
      {
        tag: 'mobile',
        title: 'iOS & Android apps',
        text: 'Native and cross-platform apps with shared logic, secure auth, and release trains that stay predictable.',
      },
      {
        tag: 'apis',
        title: 'APIs & integrations',
        text: 'Typed services that connect your product to payments, CRMs, and the third-party platforms your workflows depend on.',
      },
      {
        tag: 'modernization',
        title: 'Legacy modernization',
        text: 'Aging architecture and codebases upgraded for maintainability, performance, and the ability to ship new features.',
      },
    ],
    valueProps: [
      {
        title: 'Full-stack delivery, one team',
        text: 'Web, mobile, and API work sit under one engineering team, so nothing gets lost translating between vendors.',
        cards: [
          { label: 'Shared repo', detail: 'One codebase, one team' },
          { label: 'Typed contracts', detail: 'API and UI stay in sync' },
        ],
      },
      {
        title: 'MVP to market in 8–12 weeks',
        text: 'A thin, working slice ships first; scope grows from real usage, not guesswork.',
        cards: [
          { label: 'Weekly demos', detail: 'Working software, not decks' },
          { label: 'Usage-driven backlog', detail: 'Built on real signal' },
        ],
      },
      {
        title: 'Your codebase, your standards',
        text: 'We work inside your repositories, CI/CD, and engineering standards. Everything we build is documented and stays yours.',
        cards: [
          { label: 'Docs included', detail: 'Architecture, not just README' },
          { label: 'No vendor lock-in', detail: 'Standard, portable stack' },
        ],
      },
      {
        title: 'Quality built in from day one',
        text: 'Testing is part of delivery from the start, not left until release — issues surface before users do.',
        cards: [
          { label: 'CI gates', detail: 'Merge-ready checks' },
          { label: 'Peer review', detail: 'Every change, every time' },
        ],
      },
    ],
    console: {
      repo: 'universal-platform — main',
      version: 'v4.2.0',
      files: ['app/', 'checkout.service.ts', 'orders.repository.ts'],
      activeCount: 15,
      activeDelta: '+2 this sprint',
      devicePreview: true,
      snippet: `import { defineService } from "@universal/core"

export const checkout = defineService({
  runtime: "edge",
  scale: { min: 2, max: 64 },
  // resilient payment orchestration
  handler: async (req) => {
    const order = await orders.create(req.body)
    return Response.json(order)
  },
})`,
      build: 'build #1243',
      services: [
        { name: 'api-gateway', status: 'healthy' },
        { name: 'orders', status: 'healthy' },
        { name: 'payments', status: 'healthy' },
        { name: 'search', status: 'healthy' },
      ],
      latency: '100ms p95',
      uptime: '99.98% uptime',
      activity: ['commit 8f21a4 pushed', '214 tests executed', 'deploy #137 → production'],
    },
  },
  qa: {
    stats: [
      { value: '90%+', label: 'Critical-path coverage' },
      { value: '<24h', label: 'Bug turnaround' },
      { value: '0', label: 'Manual regression cycles' },
    ],
    capabilities: [
      {
        tag: 'manual qa',
        title: 'Exploratory testing',
        text: 'Senior testers probe the journeys that make or break a release, not just the happy path.',
      },
      {
        tag: 'automation',
        title: 'Automated regression',
        text: 'Playwright, Cypress, and Selenium suites that gate merges before code reaches staging.',
      },
      {
        tag: 'api & performance',
        title: 'API & performance testing',
        text: 'Appium and Postman coverage across devices, endpoints, edge-case payloads, and load.',
      },
      {
        tag: 'strategy',
        title: 'Test strategy & tooling',
        text: 'Coverage plans and CI wiring your team keeps running after we leave.',
      },
    ],
    valueProps: [
      {
        title: 'Coverage where it matters',
        text: 'Risk-ranked test plans focus effort on the flows that actually cost you users.',
        cards: [
          { label: 'Risk-ranked plans', detail: 'Effort follows impact' },
          { label: 'Journey maps', detail: 'Coverage tied to real usage' },
        ],
      },
      {
        title: 'Bugs caught before merge',
        text: 'Automated gates block regressions at the pull request, not in production.',
        cards: [
          { label: 'CI gates', detail: 'Blocks the merge, not the release' },
          { label: 'Fast feedback', detail: 'Minutes, not a QA queue' },
        ],
      },
      {
        title: 'Cross-platform confidence',
        text: 'Web, mobile, and API surfaces tested together, not as separate afterthoughts.',
        cards: [
          { label: 'Web + mobile', detail: 'One suite, both surfaces' },
          { label: 'API contracts', detail: 'Verified on every deploy' },
        ],
      },
      {
        title: 'A suite your team can run',
        text: 'Readable specs and documented tooling instead of a black-box test framework.',
        cards: [
          { label: 'Documented suites', detail: 'No tribal knowledge' },
          { label: 'Team handoff', detail: 'You keep it running after us' },
        ],
      },
    ],
    console: {
      repo: 'universal-qa — main',
      version: 'v1.14.0',
      files: ['e2e/', 'checkout.spec.ts', 'ci/gate.yml'],
      activeCount: 212,
      activeDelta: '+18 this sprint',
      snippet: `import { test, expect } from "@playwright/test"

test("checkout completes", async ({ page }) => {
  await page.goto("/checkout")
  await page.fill("#card", "4242 4242 4242 4242")
  // gates the merge, not the release
  await page.click("text=Pay now")
  await expect(page.locator(".success")).toBeVisible()
})`,
      build: 'suite run #1284',
      services: [
        { name: 'web e2e', status: 'healthy' },
        { name: 'mobile e2e', status: 'healthy' },
        { name: 'api contracts', status: 'healthy' },
      ],
      latency: '6m 42s runtime',
      uptime: '96% coverage',
      activity: [
        '212 tests executed',
        '3 flaky tests quarantined',
        'merge blocked on PR #341 → fixed',
      ],
    },
  },
  'ui-ux': {
    stats: [
      { value: '92%', label: 'Usability score' },
      { value: '3', label: 'Rounds user-tested' },
      { value: '<1day', label: 'Handoff turnaround' },
    ],
    capabilities: [
      {
        tag: 'ux research',
        title: 'User & product research',
        text: 'Interviews, flows, and usage data that ground design decisions in how people actually use your product.',
      },
      {
        tag: 'prototyping',
        title: 'Prototyping',
        text: 'Clickable prototypes that de-risk direction before a single line of production code gets written.',
      },
      {
        tag: 'ui design',
        title: 'Interface design',
        text: 'Development-ready screens with the states, edge cases, and responsive behavior engineers need to build without guessing.',
      },
      {
        tag: 'design systems',
        title: 'Design systems',
        text: 'Reusable component libraries that keep new features consistent instead of reinventing patterns each sprint.',
      },
    ],
    valueProps: [
      {
        title: 'Research before pixels',
        text: 'Every flow starts from how users actually behave, not a template pulled from a component library.',
        cards: [
          { label: 'User interviews', detail: 'Grounded in real behavior' },
          { label: 'Flow maps', detail: 'Before any screen is drawn' },
        ],
      },
      {
        title: 'Prototypes that de-risk builds',
        text: 'Clickable prototypes get tested with real users before engineering commits to a direction.',
        cards: [
          { label: 'Clickable prototypes', detail: 'Validated pre-build' },
          { label: 'Usability testing', detail: 'Real users, real tasks' },
        ],
      },
      {
        title: 'Handoff engineers can build from',
        text: 'Every screen ships with states, spacing, and responsive rules specified — no guessing at the missing edge case.',
        cards: [
          { label: 'Dev-ready specs', detail: 'States and spacing included' },
          { label: 'Figma handoff', detail: 'Inspectable, not just pretty' },
        ],
      },
      {
        title: 'A system, not a one-off screen set',
        text: 'Components and tokens are built to be reused, so the fifth feature looks as consistent as the first.',
        cards: [
          { label: 'Component library', detail: 'Shared across the product' },
          { label: 'Design tokens', detail: 'One source of truth' },
        ],
      },
    ],
    console: {
      repo: 'universal-design — main',
      version: 'v1.6.3',
      files: ['design/', 'tokens/theme.json', 'checkout-flow.fig'],
      activeCount: 7,
      activeDelta: '+2 this sprint',
      snippet: `import { defineTokens } from "@universal/design"

export const theme = defineTokens({
  color: { brand: "#E31C23", ink: "#0C0F14" },
  radius: { sm: 8, md: 14, lg: 22 },
  // synced from Figma on every publish
  spacing: scale(4),
})`,
      build: 'Figma sync #94',
      services: [
        { name: 'design tokens', status: 'healthy' },
        { name: 'storybook', status: 'healthy' },
        { name: 'handoff docs', status: 'healthy' },
      ],
      latency: '92% usability score',
      uptime: '3 rounds tested',
      activity: ['12 screens updated', 'usability test #4 completed', 'tokens synced → storybook'],
    },
  },
  devops: {
    stats: [
      { value: '99.95%', label: 'Uptime target' },
      { value: '<15min', label: 'Deploy to prod' },
      { value: '100%', label: 'Environments as code' },
    ],
    capabilities: [
      {
        tag: 'ci/cd',
        title: 'CI/CD pipelines',
        text: 'GitHub Actions pipelines that build, test, and deploy on every merge, no manual steps.',
      },
      {
        tag: 'iac',
        title: 'Infrastructure as code',
        text: 'Terraform-managed environments that are reproducible and reviewable like any other code.',
      },
      {
        tag: 'containers',
        title: 'Container & orchestration',
        text: 'Docker and Kubernetes setups sized to your actual traffic, not a reference architecture.',
      },
      {
        tag: 'observability',
        title: 'Observability',
        text: 'Logging, metrics, and alerting so incidents surface before customers report them.',
      },
    ],
    valueProps: [
      {
        title: 'Deploys become routine',
        text: 'Ship on a Tuesday afternoon with the same confidence as a Monday morning.',
        cards: [
          { label: 'Zero-downtime deploys', detail: 'Rolling or blue-green' },
          { label: 'Rollback ready', detail: 'One command, not a fire drill' },
        ],
      },
      {
        title: 'Infrastructure you can audit',
        text: 'Every environment change is a reviewed pull request, not a console click.',
        cards: [
          { label: 'IaC everywhere', detail: 'No hand-configured servers' },
          { label: 'PR-reviewed', detail: 'Infra changes, same as code' },
        ],
      },
      {
        title: 'Costs stay visible',
        text: 'Right-sized infrastructure with usage dashboards instead of a surprise cloud bill.',
        cards: [
          { label: 'Cost dashboards', detail: 'Spend tied to service' },
          { label: 'Right-sizing', detail: 'Reviewed on a cadence' },
        ],
      },
      {
        title: 'Incidents caught early',
        text: 'Alerting tuned to your actual SLOs, not generic thresholds.',
        cards: [
          { label: 'SLO-based alerts', detail: 'Signal, not noise' },
          { label: 'On-call runbooks', detail: 'Your team can follow' },
        ],
      },
    ],
    console: {
      repo: 'universal-infra — main',
      version: 'v3.6.2',
      files: ['infra/', 'main.tf', 'k8s/deployment.yaml'],
      activeCount: 6,
      activeDelta: 'environments',
      snippet: `resource "aws_ecs_service" "api" {
  desired_count = var.min_capacity
  # autoscaling on p95 latency
  deployment_controller {
    type = "CODE_DEPLOY"
  }
}`,
      build: 'pipeline #1243',
      services: [
        { name: 'api-gateway', status: 'healthy' },
        { name: 'orders', status: 'healthy' },
        { name: 'payments', status: 'healthy' },
        { name: 'search', status: 'healthy' },
      ],
      latency: '100ms p95',
      uptime: '99.98% uptime',
      activity: [
        'commit 8f21a4 pushed',
        '214 tests executed',
        'deploy #137 → production · edge 14 regions',
      ],
    },
  },
  cybersecurity: {
    stats: [
      { value: '0', label: 'Critical findings open' },
      { value: '<24h', label: 'Critical triage time' },
      { value: '4', label: 'Pen tests / year' },
    ],
    capabilities: [
      {
        tag: 'pen testing',
        title: 'Penetration testing',
        text: 'Manual, adversarial testing against your actual applications and infrastructure — not just an automated scan report.',
      },
      {
        tag: 'api security',
        title: 'API security',
        text: 'Auth, rate limiting, and data-exposure review across every endpoint your product exposes.',
      },
      {
        tag: 'vapt',
        title: 'Vulnerability assessment',
        text: 'Systematic scanning and manual verification that separates real risk from noise, ranked by actual impact.',
      },
      {
        tag: 'secure sdlc',
        title: 'Secure SDLC',
        text: 'Security gates built into your pipeline so vulnerabilities get caught before merge, not after a breach.',
      },
    ],
    valueProps: [
      {
        title: 'Real attackers, not just scanners',
        text: 'Manual penetration testing finds the chained, business-logic flaws that automated scanners miss entirely.',
        cards: [
          { label: 'Manual testing', detail: 'Beyond automated scans' },
          { label: 'Chained exploits', detail: 'Real attack paths mapped' },
        ],
      },
      {
        title: 'Risk ranked by actual impact',
        text: 'Findings come with severity, exploitability, and a fix path — not a report you have to triage yourself.',
        cards: [
          { label: 'Severity ranked', detail: 'CVSS + business context' },
          { label: 'Fix guidance', detail: 'Not just a finding list' },
        ],
      },
      {
        title: 'Security before merge, not after',
        text: 'Pipeline-integrated checks catch dependency and code-level risk before it ships, not after an incident.',
        cards: [
          { label: 'CI security gates', detail: 'Blocks risky merges' },
          { label: 'Dependency scanning', detail: 'Continuous, not annual' },
        ],
      },
      {
        title: 'Compliance you can evidence',
        text: 'Reports and remediation trails built to satisfy SOC 2, HIPAA, and customer security questionnaires.',
        cards: [
          { label: 'Audit-ready reports', detail: 'For SOC 2 / HIPAA asks' },
          { label: 'Remediation tracking', detail: 'Proof issues got fixed' },
        ],
      },
    ],
    console: {
      repo: 'universal-security — main',
      version: 'v1.3.0',
      files: ['pentest/', 'reports/api-scan.json', 'ci/security-gate.yml'],
      activeCount: 23,
      activeDelta: 'findings tracked',
      snippet: `import { scan } from "@universal/secops"

export const apiAudit = scan({
  target: "api.client.com",
  depth: "authenticated",
  // OWASP API Top 10 coverage
  rules: ["BOLA", "auth", "rate-limit", "injection"],
  onFinding: (f) => triage(f.severity),
})`,
      build: 'scan run #340',
      services: [
        { name: 'api scan', status: 'healthy' },
        { name: 'dependency check', status: 'healthy' },
        { name: 'secrets scan', status: 'healthy' },
      ],
      latency: '0 critical open',
      uptime: '22 findings resolved',
      activity: ['scan #340 completed', '2 medium findings triaged', 'fix verified → closed'],
    },
  },
  ai: {
    stats: [
      { value: '96%', label: 'Eval pass rate' },
      { value: '340ms', label: 'p50 latency' },
      { value: '100%', label: 'Guardrailed actions' },
    ],
    capabilities: [
      {
        tag: 'llm apps',
        title: 'LLM applications',
        text: 'Product features powered by language models, wired into your existing data and workflows — not a bolted-on chatbot.',
      },
      {
        tag: 'rag',
        title: 'RAG systems',
        text: 'Retrieval pipelines that ground model answers in your own documents and data instead of hallucinated guesses.',
      },
      {
        tag: 'ai agents',
        title: 'AI agents',
        text: 'Multi-step agents that call your tools and APIs, with the guardrails to keep them inside their lane.',
      },
      {
        tag: 'evals',
        title: 'Evaluation & monitoring',
        text: 'Automated evals and production monitoring so model behavior gets caught drifting before your users do.',
      },
    ],
    valueProps: [
      {
        title: 'Grounded, not hallucinated',
        text: 'Retrieval pipelines tie every answer back to your actual documents and data, with citations you can check.',
        cards: [
          { label: 'RAG pipelines', detail: 'Answers cite real sources' },
          { label: 'Freshness synced', detail: 'Reindexed on a schedule' },
        ],
      },
      {
        title: 'Agents with guardrails',
        text: 'Multi-step agents that call your tools, scoped to exactly what they are allowed to touch.',
        cards: [
          { label: 'Scoped tool access', detail: 'No open-ended actions' },
          { label: 'Human-in-the-loop', detail: 'On the actions that matter' },
        ],
      },
      {
        title: 'Evaluated before it ships',
        text: 'Automated eval suites catch regressions in accuracy and tone before a prompt change reaches production.',
        cards: [
          { label: 'Eval suites', detail: 'Run on every prompt change' },
          { label: 'Regression alerts', detail: 'Caught before users see it' },
        ],
      },
      {
        title: 'Monitored after launch',
        text: 'Production monitoring on latency, cost, and output quality — so drift gets caught, not discovered in a support ticket.',
        cards: [
          { label: 'Cost & latency dashboards', detail: 'Per model, per feature' },
          { label: 'Output quality tracking', detail: 'Drift caught early' },
        ],
      },
    ],
    console: {
      repo: 'universal-ai — main',
      version: 'v0.9.4',
      files: ['agents/', 'rag/pipeline.ts', 'evals/suite.ts'],
      activeCount: 5,
      activeDelta: '+2 this sprint',
      snippet: `import { defineAgent } from "@universal/ai"

export const supportAgent = defineAgent({
  model: "claude-sonnet",
  tools: [searchDocs, createTicket],
  // grounded in your own knowledge base
  retrieval: { index: "docs-v3", topK: 6 },
  guardrails: ["pii-redact", "scope-lock"],
})`,
      build: 'eval run #58',
      services: [
        { name: 'rag index', status: 'healthy' },
        { name: 'agent runtime', status: 'healthy' },
        { name: 'guardrails', status: 'healthy' },
      ],
      latency: '340ms p50',
      uptime: '96% eval pass rate',
      activity: [
        'eval suite #58 passed',
        'index re-synced · 12k docs',
        'guardrail blocked 1 off-scope call',
      ],
    },
  },
}

const heroTitles: Record<string, string> = {
  'software-development': 'Software development',
  qa: 'QA automation',
  'ui-ux': 'UI/UX design',
  devops: 'Cloud & DevOps',
  cybersecurity: 'Cybersecurity',
  ai: 'AI & agents',
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
  'React Native',
  'AWS',
  'Playwright',
  'Figma',
  'Kubernetes',
  'TypeScript',
  'OpenAI',
  'Cypress',
  'Docker',
  'LangChain',
  'GraphQL',
  'Terraform',
  'Burp Suite',
  'Node.js',
  'Framer',
  'Nmap',
  'Storybook',
  'NestJS',
  'Azure',
  'Appium',
  'Pinecone',
  'OWASP ZAP',
  'CI/CD',
  'SEO',
  'REST',
  'Sentry',
  'Redis',
  'Postgres',
  'Vite',
  'Tailwind',
  'Jest',
  'Metasploit',
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
