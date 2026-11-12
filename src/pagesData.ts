// Content for the About, Careers, Products, and Contact pages.
// Company facts (founding year, locations, metrics, leadership) live in companyFacts.ts.

export const companyValues = [
  {
    step: '01',
    title: 'Evidence over opinions',
    text: 'Every decision is checked against a metric someone will look at again, so priorities rest on evidence the whole team can see.',
  },
  {
    step: '02',
    title: 'One backlog, one team',
    text: 'Design, engineering, QA, and delivery share the same rituals, so nothing gets lost in translation between them.',
  },
  {
    step: '03',
    title: 'Documentation ships with the work',
    text: 'Runbooks and docs are part of the definition of done, so your team can operate what we build.',
  },
]

export const perks = [
  {
    step: 'A',
    title: 'Remote-first, always',
    text: 'Work from anywhere with overlap hours for your team. We fly in for kickoffs, not for status meetings.',
    detail: 'Home office stipend included.',
  },
  {
    step: 'B',
    title: 'Real time off',
    text: 'Unlimited PTO with a 15-day minimum we actually enforce, plus a company-wide shutdown in December.',
    detail: 'No "unlimited" asterisks.',
  },
  {
    step: 'C',
    title: 'Growth budget',
    text: 'An annual learning stipend for courses, conferences, or certifications — spend it on what moves your career.',
    detail: 'Renews every 12 months.',
  },
  {
    step: 'D',
    title: 'Work that matters',
    text: 'AI agents, automation pipelines, and production systems real customers depend on.',
    detail: 'Real customers, real systems.',
  },
]

export type JobOpening = {
  id: string
  title: string
  team: string
  location: string
  type: string
  summary: string
  /** Shown as the highlighted role at the top of the openings list. */
  featured?: boolean
  /** ISO date (YYYY-MM-DD) the role was really first posted. Publish only when verified. */
  datePosted?: string
  /** ISO date after which the role is closed. Remove expired roles promptly. */
  validThrough?: string
  /** ISO 3166-1 alpha-2 codes of countries where applicants may be based. Publish only when verified. */
  applicantCountries?: string[]
  responsibilities: string[]
  requirements: string[]
}

export const jobOpenings: JobOpening[] = [
  {
    id: 'senior-bidder',
    title: 'Senior Bidder — Upwork & Freelancer',
    team: 'Business Development',
    location: 'Remote (Global)',
    type: 'Full-time',
    summary:
      'Win new development projects for Universal Technologies by bidding and closing deals on Upwork and Freelancer.',
    featured: true,
    responsibilities: [
      'Write and submit winning proposals for development projects on Upwork and Freelancer daily.',
      'Qualify inbound leads and match client requirements to the right service line before bidding.',
      'Run first client calls and translate scope into a proposal our engineers can actually deliver.',
      'Keep the bidding pipeline and win-rate numbers current so leadership can see what\'s working.',
    ],
    requirements: [
      '3+ years bidding and closing software development projects on Upwork, Freelancer, or similar platforms.',
      'A proposal win rate you can talk through with real numbers.',
      'Enough technical fluency to scope a dev project without over-promising.',
      'Excellent written English — the proposal is the client\'s first impression of us.',
    ],
  },
  {
    id: 'sr-fullstack',
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    location: 'Remote (Americas)',
    type: 'Full-time',
    summary: 'Own features end to end across a React/Node stack for client products in production.',
    responsibilities: [
      'Own features end to end — schema, API, and UI — for client products already in production.',
      'Pair directly with QA and delivery leads instead of throwing work over a wall.',
      'Review PRs and set technical direction on the codebases you touch.',
      'Join client demos and speak to trade-offs firsthand, not through a middleman.',
    ],
    requirements: [
      '5+ years building production web applications end to end.',
      'Comfortable in a typed language across the stack (TypeScript/Node preferred).',
      'Have shipped and supported features in production, not just in a sandbox.',
      'Write PR descriptions and docs someone else can actually follow.',
    ],
  },
  {
    id: 'qa-automation',
    title: 'QA Automation Engineer',
    team: 'Quality',
    location: 'Remote (EMEA)',
    type: 'Full-time',
    summary: 'Build and maintain Playwright/Cypress suites that gate merges before customers feel the risk.',
    responsibilities: [
      'Design and maintain Playwright/Cypress suites that gate merges, not just document bugs after the fact.',
      'Partner with engineers to make flaky tests someone else\'s problem — yours to fix, once.',
      'Run exploratory testing on the journeys that would actually cost a client users.',
      'Keep CI feedback fast enough that engineers don\'t start ignoring it.',
    ],
    requirements: [
      '3+ years in test automation, with at least one production CI suite you built or owned.',
      'Fluent in Playwright or Cypress; comfortable reading the app code you\'re testing.',
      'Know the difference between a test that catches bugs and one that just adds runtime.',
      'API testing experience (Postman, REST-assured, or similar).',
    ],
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    team: 'Platform',
    location: 'Remote (Global)',
    type: 'Full-time',
    summary: 'Harden CI/CD pipelines and observability for a growing portfolio of client infrastructure.',
    responsibilities: [
      'Harden CI/CD pipelines so deploys are routine, not an event.',
      'Own infrastructure as code across a growing portfolio of client environments.',
      'Build the observability that lets an on-call engineer diagnose an incident in minutes, not hours.',
      'Right-size infrastructure so cost doesn\'t creep past what traffic actually needs.',
    ],
    requirements: [
      '4+ years running production infrastructure on AWS or GCP.',
      'Hands-on with Terraform, Docker, and Kubernetes — not just the docs.',
      'Have carried an on-call rotation and can talk through an incident you fixed.',
      'Comfortable working across several unrelated client stacks in the same week.',
    ],
  },
  {
    id: 'delivery-lead',
    title: 'Delivery Lead',
    team: 'Client Services',
    location: 'Remote (Americas)',
    type: 'Full-time',
    summary: 'Be the single accountable owner for two to three client engagements at a time.',
    responsibilities: [
      'Own two to three client engagements end to end — scope, staffing, and delivery.',
      'Run the weekly rhythm that keeps engineering, QA, and the client on the same page.',
      'Flag risk early enough that it\'s a conversation, not a surprise.',
      'Be the one person a client can always reach for a straight answer.',
    ],
    requirements: [
      '4+ years leading delivery on client-facing software engagements.',
      'Technical enough to read a sprint board and push back on a bad estimate.',
      'Comfortable owning a hard conversation about scope, timeline, or risk.',
      'Written and verbal communication a client stakeholder trusts.',
    ],
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote (Global)',
    type: 'Contract',
    summary: 'Take products from rough brief to shippable UI, working directly with engineering.',
    responsibilities: [
      'Take products from a rough brief to shippable UI, working directly with engineering.',
      'Run lightweight user research to ground decisions instead of guessing.',
      'Build and maintain design systems that keep new features consistent.',
      'Hand off specs an engineer can build from without a follow-up meeting.',
    ],
    requirements: [
      '4+ years designing shipped software products, not just concepts.',
      'Fluent in Figma, including components, variants, and design tokens.',
      'A portfolio that shows the messy middle, not just polished final screens.',
      'Comfortable presenting and defending decisions directly to engineers and clients.',
    ],
  },
]

export type ProductStatus = 'Production' | 'Internal accelerator' | 'Beta' | 'Prototype'

/** What each status means and how a prospect can engage with it. Shown on cards and detail pages. */
export const productStatusInfo: Record<ProductStatus, { meaning: string; engage: string }> = {
  'Internal accelerator': {
    meaning: 'Built in-house and used on our client engagements.',
    engage: 'Request a walkthrough to see it live and talk through fit for your team.',
  },
  Production: {
    meaning: 'Generally available and supported.',
    engage: 'Request a demo to discuss fit and onboarding.',
  },
  Beta: {
    meaning: 'Working, but still changing. Features and availability may change.',
    engage: 'Request a demo to discuss early access.',
  },
  Prototype: {
    meaning: 'An early proof of concept, shown to illustrate an approach.',
    engage: 'Talk to us if you want to build on the idea.',
  },
}

export type Product = {
  id: string
  mark: string
  name: string
  tagline: string
  description: string
  tags: string[]
  status: ProductStatus
  audience: string
  /** id of the most relevant service line, for contextual internal linking. */
  relatedService: string
  /** schema.org SoftwareApplication category, e.g. "BusinessApplication". */
  applicationCategory: string
  /** The problem the product exists to solve, in the reader's terms. */
  problem: string[]
  howItWorks: { title: string; text: string }[]
  useCases: string[]
  /** Who gets the most out of it, and who it is not for. */
  fit: string
  /** How the accelerator shows up on a client engagement. */
  onEngagements: string
  faqs: { question: string; answer: string }[]
  /** Live product site. When set, the product card opens it instead of the detail page. */
  url?: string
}

export const products: Product[] = [
  {
    id: 'pulse',
    mark: '01',
    name: 'Pulse',
    tagline: 'Release health, in one dashboard',
    description:
      'Rolls up deploy frequency, error rates, and rollback history across every service so leads can see release risk before it ships.',
    tags: ['Dashboards', 'Alerting', 'CI/CD integrations'],
    status: 'Internal accelerator',
    audience: 'Delivery leads watching release risk across services',
    relatedService: 'devops',
    applicationCategory: 'DeveloperApplication',
    problem: [
      'On a team that runs more than a handful of services, release health is spread across the CI system, the error tracker, the deploy log and a few Slack threads. Nobody has the whole picture until something breaks, and by then the question is no longer "should we ship?" but "what do we roll back?".',
      'Delivery leads end up rebuilding the same view by hand before every release meeting: which services deployed this week, which ones are throwing more errors than usual, and which ones have needed a rollback recently. That work is slow, and it goes stale the moment a new deploy lands.',
    ],
    howItWorks: [
      { title: 'Connect your pipelines', text: 'Pulse reads deploy events from your CI/CD tooling, so every release is recorded against the service and the commit range it shipped.' },
      { title: 'Track the signals that predict trouble', text: 'Deploy frequency, error rates and rollback history are rolled up per service, so a service that is suddenly deploying less, failing more or rolling back often stands out.' },
      { title: 'Alert before the release, not after', text: 'Alerting flags services whose release risk has changed, so leads can slow down, add review or schedule extra QA before the next deploy goes out.' },
    ],
    useCases: [
      'A weekly release review that starts from one dashboard instead of five browser tabs.',
      'Spotting a service that has quietly started rolling back more often than its neighbours.',
      'Giving engineering managers and product owners the same view of release risk.',
      'Deciding where to spend QA and on-call attention ahead of a large launch.',
    ],
    fit: 'Pulse is most useful for teams running several services with their own deploy pipelines, where release risk is hard to see from any single tool. It suits delivery leads, engineering managers and platform teams who own the release process. If you ship one application a few times a month, a simple deploy log is probably enough, and we will tell you so.',
    onEngagements: 'On DevOps and infrastructure engagements we set Pulse up early, alongside the CI/CD and observability work. It gives both teams a shared baseline for deploy frequency, error rates and rollbacks, so improvements to pipelines, testing and infrastructure can be seen in the numbers rather than argued about in meetings. Whatever we connect it to stays in your accounts and your repositories.',
    faqs: [
      { question: 'What does Pulse measure?', answer: 'Pulse rolls up deploy frequency, error rates and rollback history for each service, so delivery leads can compare release risk across services in one dashboard.' },
      { question: 'Can we use Pulse on its own?', answer: 'Pulse is an internal accelerator that we run on our DevOps engagements. Request a walkthrough to see it live and talk through whether it fits your release process.' },
      { question: 'Does Pulse replace our monitoring tools?', answer: 'No. Pulse sits on top of the CI/CD and error data you already collect and turns it into a release-risk view. Your existing monitoring and alerting stay in place.' },
    ],
  },
  {
    id: 'ledgerline',
    mark: '02',
    name: 'Ledgerline',
    tagline: 'Reconciliation without the spreadsheet',
    description:
      'Automates transaction matching across payment providers and your ledger, flagging exceptions for a human to review.',
    tags: ['Fintech', 'Automation', 'Audit trail'],
    status: 'Internal accelerator',
    audience: 'Finance and ops teams reconciling payments',
    relatedService: 'workflow-automation',
    applicationCategory: 'FinanceApplication',
    problem: [
      'Most finance teams reconcile payments by exporting reports from each payment provider, exporting the ledger, and matching rows in a spreadsheet. It works until volume grows, a new provider is added, or the person who built the spreadsheet goes on leave.',
      'Manual matching also leaves a weak audit trail. When an auditor asks why two records were treated as the same transaction, the answer is often a formula buried in a workbook rather than a recorded decision.',
    ],
    howItWorks: [
      { title: 'Pull transactions from every source', text: 'Ledgerline collects transactions from your payment providers and your ledger into one place, so matching starts from a complete set of records.' },
      { title: 'Match automatically, flag the rest', text: 'Transactions that line up are matched automatically. Anything that does not, such as a missing payout, a partial refund or an amount mismatch, is raised as an exception for a person to review.' },
      { title: 'Keep an audit trail', text: 'Every match and every human decision on an exception is recorded, so the month-end close can be explained line by line.' },
    ],
    useCases: [
      'Daily reconciliation across more than one payment provider.',
      'Shortening the month-end close by reviewing only the exceptions.',
      'Giving auditors a record of how each transaction was matched.',
      'Onboarding a new payment provider without rebuilding the spreadsheet.',
    ],
    fit: 'Ledgerline is built for finance and operations teams that reconcile payments from one or more providers against a ledger every day or every month, and who are outgrowing spreadsheet matching. It is a good fit when volume is growing, when a new provider is about to be added, or when auditors are asking for a clearer trail. It is not a replacement for your accounting system or your accountants.',
    onEngagements: 'On workflow automation engagements we use Ledgerline as a starting point rather than building reconciliation from scratch. We map your providers, ledger and exception rules first, agree which mismatches need a person, and then automate the matching around that. Your team keeps the final say on every exception, and the rules are documented so they can be changed without us.',
    faqs: [
      { question: 'Does Ledgerline make accounting decisions on its own?', answer: 'No. Ledgerline matches transactions that line up and flags exceptions for a human to review. People stay responsible for anything that needs judgment.' },
      { question: 'Who is Ledgerline for?', answer: 'Finance and operations teams that reconcile payments from one or more providers against their ledger and want to stop doing it by hand in spreadsheets.' },
      { question: 'How do we see Ledgerline in action?', answer: 'Ledgerline is an internal accelerator used on our workflow automation engagements. Request a walkthrough and we will show it live and discuss fit.' },
    ],
  },
  {
    id: 'triagebot',
    mark: '03',
    name: 'Triagebot',
    tagline: 'Support tickets, pre-sorted',
    description:
      'Classifies and routes inbound support tickets by urgency and team, cutting time-to-first-response for critical issues.',
    tags: ['Support ops', 'NLP', 'Slack + email'],
    status: 'Internal accelerator',
    audience: 'Support teams routing inbound tickets',
    relatedService: 'ai-agents',
    applicationCategory: 'BusinessApplication',
    problem: [
      'Inbound support queues mix password resets, billing questions, feature requests and genuine outages. When every ticket lands in the same inbox, an urgent issue can sit behind dozens of routine ones until someone happens to read it.',
      'Manual triage is also repetitive work for experienced support staff, who spend the start of every shift reading and forwarding tickets instead of solving them.',
    ],
    howItWorks: [
      { title: 'Read every inbound ticket', text: 'Triagebot picks up tickets as they arrive from email and Slack, the channels customers and teammates already use.' },
      { title: 'Classify urgency and topic', text: 'Natural-language classification assigns each ticket an urgency level and the team best placed to handle it.' },
      { title: 'Route to the right queue', text: 'Tickets go straight to the owning team, with critical issues surfaced first, so time-to-first-response drops where it matters most.' },
    ],
    useCases: [
      'Getting outage reports in front of the on-call engineer instead of a general inbox.',
      'Sending billing, account and product questions to the right team automatically.',
      'Reducing the time senior support staff spend sorting tickets each morning.',
      'Keeping triage consistent across shifts and time zones.',
    ],
    fit: 'Triagebot suits support teams that receive a steady flow of tickets by email and Slack and lose time deciding who should handle what. It works best when there are clear teams or queues to route to and a shared idea of what counts as urgent. If every ticket goes to the same two people, better inbox rules may be all you need, and we will say so.',
    onEngagements: 'On AI agent engagements we use Triagebot as a working example of a scoped, production-ready agent: one clear job, human ownership of the outcome, and routing behaviour that can be checked against real tickets. We start by reviewing a sample of your past tickets, agree the urgency levels and teams with your support leads, and only then switch on automatic routing.',
    faqs: [
      { question: 'Which channels does Triagebot work with?', answer: 'Triagebot handles inbound tickets from email and Slack and routes them by urgency and team.' },
      { question: 'Does Triagebot reply to customers?', answer: 'Triagebot classifies and routes tickets. Your support team still writes the replies, starting with the most critical issues.' },
      { question: 'How is Triagebot related to your AI agent work?', answer: 'Triagebot is an internal accelerator built from the same production practices we use on AI agent engagements: clear scope, human review and measurable routing behaviour.' },
    ],
  },
  {
    id: 'fieldsync',
    mark: '04',
    name: 'Fieldsync',
    tagline: 'Offline-first jobs for field teams',
    description:
      'A mobile app for crews working with unreliable connectivity — jobs sync the moment a signal comes back.',
    tags: ['Mobile', 'Offline sync', 'Logistics'],
    status: 'Internal accelerator',
    audience: 'Field crews working with unreliable connectivity',
    relatedService: 'end-to-end-development',
    applicationCategory: 'BusinessApplication',
    problem: [
      'Field crews work in basements, rural sites and plant rooms where the signal drops without warning. Apps that assume a constant connection lose form data, show stale job lists, or simply stop working at the moment the crew needs them.',
      'The usual workaround is paper notes or photos typed up later, which means late updates for the office, double entry for the crew, and mistakes in between.',
    ],
    howItWorks: [
      { title: 'Download the day before it starts', text: 'Jobs, addresses and checklists are stored on the device, so the crew has everything they need even with no signal.' },
      { title: 'Work fully offline', text: 'Crews update job status, fill in forms and capture details offline. Nothing is lost when the connection drops.' },
      { title: 'Sync the moment a signal returns', text: 'Changes upload automatically as soon as connectivity is back, so the office sees progress without anyone pressing a button.' },
    ],
    useCases: [
      'Installation and maintenance crews working on sites with poor coverage.',
      'Logistics and delivery teams updating job status between depots.',
      'Inspection checklists completed on site rather than typed up afterwards.',
      'Giving dispatchers an up-to-date view of field work as crews reconnect.',
    ],
    fit: 'Fieldsync is for organisations whose crews spend their day on sites where connectivity cannot be trusted, including installation, maintenance, inspection and logistics teams. It is a good fit when crews currently fall back on paper or photos and someone retypes the details later. If your teams always work with a strong signal, a standard web app may be simpler and cheaper.',
    onEngagements: 'On end-to-end development engagements we use Fieldsync as the foundation for offline-first mobile work instead of solving sync from zero. We start with your job types, forms and the back-office system the data needs to reach, then adapt the app and its sync rules to fit. The code, the infrastructure and the documentation are yours from the first commit.',
    faqs: [
      { question: 'What does offline-first mean for Fieldsync?', answer: 'Fieldsync stores jobs on the device and lets crews keep working with no connection. Changes sync automatically the moment a signal comes back.' },
      { question: 'Who is Fieldsync built for?', answer: 'Field crews and logistics teams that work with unreliable connectivity and need job updates to reach the office without double entry.' },
      { question: 'Can Fieldsync be adapted to our workflow?', answer: 'Fieldsync is an internal accelerator used on our end-to-end development engagements. Request a walkthrough to talk through your jobs, forms and sync requirements.' },
    ],
  },
  {
    id: 'postit-ai',
    mark: '05',
    name: 'Spact.io',
    url: 'https://spact.io/',
    tagline: 'One window, every channel',
    description:
      'An AI scheduling tool that plans and publishes company posts to LinkedIn, Instagram, and Facebook from a single dashboard — draft once, tailor per platform, and queue it all on one shared calendar.',
    tags: ['Social scheduling', 'AI', 'LinkedIn + Instagram + Facebook'],
    status: 'Internal accelerator',
    audience: 'Marketing teams scheduling company posts',
    relatedService: 'ai-agents',
    applicationCategory: 'BusinessApplication',
    problem: [
      'Company social media usually means three logins, three editors and three calendars. The same announcement gets rewritten for LinkedIn, Instagram and Facebook, scheduled at different times, and tracked in a shared spreadsheet that is never quite up to date.',
      'For small marketing teams this is hours of copy-and-paste every week, and it makes it hard to see at a glance what is going out, where, and when.',
    ],
    howItWorks: [
      { title: 'Draft once', text: 'Write a post a single time in one dashboard instead of starting from scratch on each platform.' },
      { title: 'Tailor per platform with AI', text: 'Spact.io helps adapt the draft for LinkedIn, Instagram and Facebook, so each version fits the platform without a full rewrite.' },
      { title: 'Queue it on one calendar', text: 'Every post for every channel sits on one shared calendar, so the whole team can see and adjust what is scheduled.' },
    ],
    useCases: [
      'Announcing a launch on LinkedIn, Instagram and Facebook from one draft.',
      'Planning a month of company posts on a single shared calendar.',
      'Letting several teammates review scheduled posts in one place.',
      'Keeping a consistent company voice across channels.',
    ],
    fit: 'Spact.io is for marketing teams and founders who publish company posts on LinkedIn, Instagram and Facebook and are tired of rewriting the same announcement three times. It works best for teams that plan posts ahead and want one calendar everyone can see. If you post rarely or only on one platform, the native scheduler on that platform may be enough.',
    onEngagements: 'Spact.io also shows how we approach AI features on client products: the AI helps with the repetitive part, adapting copy for each platform, while people stay in charge of what gets published. On AI agent engagements we use the same pattern of drafting with AI, reviewing as a human and publishing on a schedule, wherever a workflow repeats the same content across channels.',
    faqs: [
      { question: 'Which platforms does Spact.io publish to?', answer: 'Spact.io plans and publishes company posts to LinkedIn, Instagram and Facebook from a single dashboard.' },
      { question: 'Does Spact.io write posts for us?', answer: 'You write the post once. Spact.io helps tailor it for each platform, and your team reviews everything before it is queued.' },
      { question: 'How can we try Spact.io?', answer: 'Spact.io is an internal accelerator. Request a walkthrough to see it live and talk through how your team schedules posts today.' },
    ],
  },
]

export const hiringSteps = [
  { step: '01', title: 'Application', text: 'Send a resume and a short note on what you want to own.' },
  { step: '02', title: 'Intro call', text: 'A conversation about the role, the team, and how you work.' },
  { step: '03', title: 'Skills conversation', text: 'A technical or craft discussion with the people you’d work beside.' },
  { step: '04', title: 'Practical discussion', text: 'Walk through real work — a past project or a scoped problem.' },
  { step: '05', title: 'Offer', text: 'If it’s a fit on both sides, we make it concrete.' },
]
