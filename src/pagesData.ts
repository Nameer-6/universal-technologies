// Placeholder content for the About, Careers, Products, and Contact pages.

export const companyValues = [
  {
    step: '01',
    title: 'Ship with evidence',
    text: 'Every roadmap bet is tied to a metric we actually track — not a slide we hoped would age well.',
  },
  {
    step: '02',
    title: 'One team, one backlog',
    text: 'Design, engineering, QA, and delivery sit in the same rituals so nothing gets lost in a handoff.',
  },
  {
    step: '03',
    title: 'Boring on purpose',
    text: "Runbooks, monitoring, and docs are part of \"done\" — not a favor we do if there's time left.",
  },
]

export const milestones = [
  { value: '2016', label: 'Founded' },
  { value: '120+', label: 'Products shipped' },
  { value: '40+', label: 'Team members' },
  { value: '18', label: 'Countries served' },
]

export const leadership = [
  {
    name: 'Amara Okoye',
    role: 'Co-Founder & CEO',
    bio: 'Twelve years leading delivery teams across fintech and healthcare platforms before starting Universal.',
  },
  {
    name: 'Daniel Cho',
    role: 'Co-Founder & CTO',
    bio: 'Previously staff engineer on infrastructure teams at two Series C startups; keeps the stack boring on purpose.',
  },
  {
    name: 'Priya Nair',
    role: 'VP, Client Delivery',
    bio: 'Runs the delivery leads program — the people accountable for every engagement from kickoff to handoff.',
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

export type Product = {
  id: string
  mark: string
  name: string
  tagline: string
  description: string
  tags: string[]
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
  },
  {
    id: 'ledgerline',
    mark: '02',
    name: 'Ledgerline',
    tagline: 'Reconciliation without the spreadsheet',
    description:
      'Automates transaction matching across payment providers and your ledger, flagging exceptions for a human to review.',
    tags: ['Fintech', 'Automation', 'Audit trail'],
  },
  {
    id: 'triagebot',
    mark: '03',
    name: 'Triagebot',
    tagline: 'Support tickets, pre-sorted',
    description:
      'Classifies and routes inbound support tickets by urgency and team, cutting time-to-first-response for critical issues.',
    tags: ['Support ops', 'NLP', 'Slack + email'],
  },
  {
    id: 'fieldsync',
    mark: '04',
    name: 'Fieldsync',
    tagline: 'Offline-first jobs for field teams',
    description:
      'A mobile app for crews working with unreliable connectivity — jobs sync the moment a signal comes back.',
    tags: ['Mobile', 'Offline sync', 'Logistics'],
  },
]

export const officeLocations = [
  { city: 'Austin, TX', detail: 'Headquarters · by appointment' },
  { city: 'Lisbon, Portugal', detail: 'EMEA delivery hub' },
  { city: 'Bengaluru, India', detail: 'APAC delivery hub' },
]
