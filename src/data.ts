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
    id: 'ai-agents',
    title: 'AI Agents',
    mark: '01',
    summary:
      'Autonomous and human-in-the-loop agents wired into your real tools and data, built with guardrails so they stay inside their lane.',
    stacks: ['Anthropic', 'OpenAI', 'LangChain', 'LangGraph', 'Pinecone'],
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    mark: '02',
    summary:
      "Manual, repetitive processes across your CRM, support desk, and back office, rebuilt as automated pipelines your team doesn't babysit.",
    stacks: ['Zapier', 'n8n', 'Temporal', 'Node.js', 'REST'],
  },
  {
    id: 'qa',
    title: 'QA & Test Automation',
    mark: '03',
    summary:
      'Automated regression, exploratory testing, and CI-gated checks that catch problems before your customers do.',
    stacks: ['Playwright', 'Cypress', 'Selenium', 'Appium', 'Postman'],
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    mark: '04',
    summary:
      'CI/CD, cloud architecture, and observability sized to your actual traffic — not a diagram from a blog post.',
    stacks: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
  },
  {
    id: 'saas',
    title: 'SaaS-Based Applications',
    mark: '05',
    summary:
      'Multi-tenant products architected for billing, permissions, and scale questions before they become emergencies.',
    stacks: ['Next.js', 'Postgres', 'Stripe', 'Auth0', 'Redis'],
  },
  {
    id: 'end-to-end-development',
    title: 'End-to-End Development',
    mark: '06',
    summary:
      'Discovery through post-launch support, under one roof, so nothing falls into the gap between vendors.',
    stacks: ['React', 'Next.js', 'React Native', 'Node.js', 'GraphQL'],
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
  'end-to-end-development': {
    stats: [
      { value: '8–12wk', label: 'MVP to launch' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '1', label: 'Accountable team' },
    ],
    capabilities: [
      {
        tag: 'discovery',
        title: 'Discovery & technical scoping',
        text: 'A real plan before a real estimate — what exists, what\'s broken, and what "done" looks like.',
      },
      {
        tag: 'design',
        title: 'UX/UI design & prototyping',
        text: 'Validated with real users before engineering commits to a direction.',
      },
      {
        tag: 'engineering',
        title: 'Full-stack engineering',
        text: 'Web, mobile, and API work under one roadmap, not three separate vendors.',
      },
      {
        tag: 'launch & support',
        title: 'QA, deployment & post-launch support',
        text: 'The part most vendors quietly stop billing for.',
      },
    ],
    valueProps: [
      {
        title: 'One accountable team',
        text: 'One accountable team, not five vendors to coordinate between.',
        cards: [
          { label: 'Single team', detail: 'Design through delivery' },
          { label: 'One point of contact', detail: 'No vendor handoffs' },
        ],
      },
      {
        title: 'Weekly working software',
        text: 'Weekly working software, not quarterly status decks.',
        cards: [
          { label: 'Weekly demos', detail: 'Working software, not slides' },
          { label: 'Usage-driven backlog', detail: 'Built on real signal' },
        ],
      },
      {
        title: 'Documentation from day one',
        text: 'Documentation and handoff built in from the start, not bolted on at the end.',
        cards: [
          { label: 'Docs included', detail: 'Architecture, not just README' },
          { label: 'Clean handoff', detail: 'Your team can run it' },
        ],
      },
      {
        title: 'Support past launch day',
        text: "Support doesn't end the day the app goes live.",
        cards: [
          { label: 'Post-launch support', detail: "Launch isn't the finish line" },
          { label: 'Monitoring included', detail: 'Issues caught early' },
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
  'workflow-automation': {
    stats: [
      { value: '70%', label: 'Fewer manual steps' },
      { value: '<1wk', label: 'First automation live' },
      { value: '0', label: 'Silent failures' },
    ],
    capabilities: [
      {
        tag: 'process audit',
        title: 'Process mapping & automation audit',
        text: 'Finding where hours are lost to manual, repeatable steps.',
      },
      {
        tag: 'integration',
        title: 'Cross-tool integration',
        text: 'CRM, support desk, finance, and internal systems wired to move data without a human relay.',
      },
      {
        tag: 'approval logic',
        title: 'Approval & exception logic',
        text: 'Automations that know when to escalate to a person instead of guessing.',
      },
      {
        tag: 'monitoring',
        title: 'Monitoring & alerting',
        text: 'So a broken automation gets fixed before it fails silently for weeks.',
      },
    ],
    valueProps: [
      {
        title: 'Automated around your real process',
        text: 'We automate the process you actually have, not a generic template.',
        cards: [
          { label: 'Process audit', detail: 'Grounded in your actual steps' },
          { label: 'No generic templates', detail: 'Built around your tools' },
        ],
      },
      {
        title: 'Rolled out without breaking production',
        text: 'Automations ship in stages, so nothing breaks in production on day one.',
        cards: [
          { label: 'Staged rollout', detail: 'Nothing breaks on day one' },
          { label: 'Fallback paths', detail: 'Manual override always available' },
        ],
      },
      {
        title: 'Documented well enough to own',
        text: 'Documented well enough that your own team can maintain it.',
        cards: [
          { label: 'Runbooks included', detail: 'Your team can maintain it' },
          { label: 'Clear ownership', detail: 'No tribal knowledge' },
        ],
      },
      {
        title: 'Humans stay on judgment calls',
        text: 'Humans stay in the loop on judgment calls, not data entry.',
        cards: [
          { label: 'Exception routing', detail: "Escalates, doesn't guess" },
          { label: 'No busywork', detail: 'People handle judgment, not entry' },
        ],
      },
    ],
    console: {
      repo: 'universal-workflows — main',
      version: 'v2.3.1',
      files: ['workflows/', 'reconcile.pipeline.ts', 'ci/gate.yml'],
      activeCount: 34,
      activeDelta: '+9 this sprint',
      snippet: `import { defineWorkflow } from "@universal/flow"

export const reconcile = defineWorkflow({
  trigger: "payment.received",
  // escalates only the exceptions
  steps: [matchLedger, flagException, notify],
  onError: (e) => escalate(e.severity),
})`,
      build: 'pipeline #612',
      services: [
        { name: 'ingest', status: 'healthy' },
        { name: 'matcher', status: 'healthy' },
        { name: 'notifier', status: 'healthy' },
      ],
      latency: '2.1s p95',
      uptime: '99.9% uptime',
      activity: ['exception queue cleared', '1,204 records matched', 'automation #612 → production'],
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
  saas: {
    stats: [
      { value: '<1wk', label: 'Tenant onboarding' },
      { value: '99.9%', label: 'Uptime SLA' },
      { value: '0', label: 'Rebuilds for billing changes' },
    ],
    capabilities: [
      {
        tag: 'architecture',
        title: 'Multi-tenant architecture',
        text: 'Data isolation and scaling decisions made before you need them.',
      },
      {
        tag: 'billing',
        title: 'Subscription billing & metering',
        text: 'Plans, upgrades, and usage-based pricing wired in from the start.',
      },
      {
        tag: 'access control',
        title: 'Role-based access & permissions',
        text: 'Enterprise-ready from your first enterprise conversation.',
      },
      {
        tag: 'analytics',
        title: 'Onboarding & usage analytics',
        text: 'Instrumented so you know what customers actually use.',
      },
    ],
    valueProps: [
      {
        title: 'Built for your growth curve',
        text: 'Designed for your growth curve, not just your MVP demo.',
        cards: [
          { label: 'Scales past MVP', detail: 'Built for your next 10x' },
          { label: 'Tenant isolation', detail: 'Decided up front' },
        ],
      },
      {
        title: 'Billing that grows with you',
        text: 'Billing and plan changes handled without a rebuild.',
        cards: [
          { label: 'Usage-based pricing', detail: 'Wired in from day one' },
          { label: 'Plan changes', detail: 'No rebuild required' },
        ],
      },
      {
        title: 'Security boundaries, not retrofits',
        text: 'Tenancy and security boundaries built in, not retrofitted under pressure.',
        cards: [
          { label: 'RBAC included', detail: 'Enterprise-ready by default' },
          { label: 'Isolation by design', detail: 'Not bolted on later' },
        ],
      },
      {
        title: "You know what's working",
        text: "You know what's working because it's measured from day one.",
        cards: [
          { label: 'Usage analytics', detail: 'Instrumented from launch' },
          { label: 'Onboarding funnels', detail: 'Tracked, not guessed' },
        ],
      },
    ],
    console: {
      repo: 'universal-saas — main',
      version: 'v5.0.2',
      files: ['app/', 'billing.service.ts', 'tenants.repository.ts'],
      activeCount: 11,
      activeDelta: '+3 this sprint',
      snippet: `import { defineTenant } from "@universal/saas"

export const workspace = defineTenant({
  plan: "growth",
  isolation: "schema",
  // metered billing synced on every usage event
  billing: { provider: "stripe", metering: true },
})`,
      build: 'release #402',
      services: [
        { name: 'tenants', status: 'healthy' },
        { name: 'billing', status: 'healthy' },
        { name: 'auth', status: 'healthy' },
      ],
      latency: '120ms p95',
      uptime: '99.97% uptime',
      activity: ['tenant #248 provisioned', 'plan upgraded → growth', 'usage synced → billing'],
    },
  },
  'ai-agents': {
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
  'ai-agents': 'AI agents',
  'workflow-automation': 'Workflow automation',
  qa: 'QA automation',
  devops: 'Cloud & DevOps',
  saas: 'SaaS applications',
  'end-to-end-development': 'End-to-end delivery',
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
  'Anthropic',
  'Kubernetes',
  'TypeScript',
  'OpenAI',
  'Cypress',
  'Docker',
  'LangChain',
  'GraphQL',
  'Terraform',
  'Temporal',
  'Node.js',
  'n8n',
  'Zapier',
  'Stripe',
  'NestJS',
  'Azure',
  'Appium',
  'Pinecone',
  'Auth0',
  'CI/CD',
  'SEO',
  'REST',
  'Sentry',
  'Redis',
  'Postgres',
  'Vite',
  'Tailwind',
  'Jest',
  'LangGraph',
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

export const clients = [
  { name: 'Talently', logo: '/clients/talently.svg' },
  { name: 'Peek Pro', logo: '/clients/peek-pro.png' },
  { name: 'Scopi', logo: '/clients/scopi.png' },
  { name: 'Teladoc Health', logo: '/clients/teladoc-health.svg' },
  { name: 'DigiKhata', logo: '/clients/digikhata.svg' },
  { name: 'iCeipts', logo: '/clients/iceipts.png' },
  { name: 'InnoCaption', logo: '/clients/innocaption.png' },
  { name: 'Ecwid', logo: '/clients/ecwid.svg' },
  { name: 'Dovetail', logo: '/clients/dovetail.svg' },
]
