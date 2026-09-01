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
}

export const jobOpenings: JobOpening[] = [
  {
    id: 'sr-fullstack',
    title: 'Senior Full-Stack Engineer',
    team: 'Engineering',
    location: 'Remote (Americas)',
    type: 'Full-time',
    summary: 'Own features end to end across a React/Node stack for client products in production.',
  },
  {
    id: 'qa-automation',
    title: 'QA Automation Engineer',
    team: 'Quality',
    location: 'Remote (EMEA)',
    type: 'Full-time',
    summary: 'Build and maintain Playwright/Cypress suites that gate merges before customers feel the risk.',
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    team: 'Platform',
    location: 'Remote (Global)',
    type: 'Full-time',
    summary: 'Harden CI/CD pipelines and observability for a growing portfolio of client infrastructure.',
  },
  {
    id: 'delivery-lead',
    title: 'Delivery Lead',
    team: 'Client Services',
    location: 'Remote (Americas)',
    type: 'Full-time',
    summary: 'Be the single accountable owner for two to three client engagements at a time.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote (Global)',
    type: 'Contract',
    summary: 'Take products from rough brief to shippable UI, working directly with engineering.',
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
