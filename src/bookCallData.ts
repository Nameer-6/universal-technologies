export type Option = { value: string; label: string }

export type ServiceChoice = {
  id: string
  title: string
  description: string
  icon: string
}

// Titles match `services` in data.ts so the enquiry names the same service the
// visitor saw elsewhere on the site.
export const serviceChoices: ServiceChoice[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Agents wired into your tools and data.',
    icon: 'M12 3.5 13.7 8.3 18.5 10l-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7L12 3.5Zm6.5 8.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Manual processes rebuilt as pipelines.',
    icon: 'M3 5h7v5H3V5Zm11 9h7v5h-7v-5ZM10 7.5h2.5A1.5 1.5 0 0 1 14 9v5',
  },
  {
    id: 'qa',
    title: 'QA & Test Automation',
    description: 'Regression and CI-gated testing.',
    icon: 'm9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description: 'Cloud, CI/CD and reliable releases.',
    icon: 'M7 18a4 4 0 0 1-.6-7.96A6 6 0 0 1 18 9.5a4.5 4.5 0 0 1-.5 8.5H7Z',
  },
  {
    id: 'saas',
    title: 'SaaS-Based Applications',
    description: 'Multi-tenant products, built to scale.',
    icon: 'M3 5h18v14H3V5Zm0 4h18M7 7h.01M10 7h.01',
  },
  {
    id: 'end-to-end-development',
    title: 'End-to-End Development',
    description: 'From scoping to launch and support.',
    icon: 'm12 3 8.5 4.5L12 12 3.5 7.5 12 3Zm8.5 9L12 16.5 3.5 12m17 4.5L12 21l-8.5-4.5',
  },
]

export const projectStages: Option[] = [
  { value: 'idea', label: 'Idea' },
  { value: 'mvp', label: 'MVP' },
  { value: 'existing-product', label: 'Existing product' },
  { value: 'not-sure', label: 'Not sure' },
]

export const timelines: Option[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: '1–3 months' },
  { value: '3-plus-months', label: '3+ months' },
  { value: 'exploring', label: 'Just exploring' },
]

export const referralSources: Option[] = [
  { value: 'google-search', label: 'Google search' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'x-twitter', label: 'X / Twitter' },
  { value: 'instagram-facebook-ad', label: 'Instagram / Facebook ad' },
  { value: 'referral', label: 'Referral' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
]

export const dialCodes = [
  { code: 'US', dial: '+1', label: 'US +1', placeholder: '555 123 4567' },
  { code: 'CA', dial: '+1', label: 'CA +1', placeholder: '555 123 4567' },
  { code: 'GB', dial: '+44', label: 'UK +44', placeholder: '7911 123456' },
  { code: 'PK', dial: '+92', label: 'PK +92', placeholder: '322 339 6443' },
  { code: 'IN', dial: '+91', label: 'IN +91', placeholder: '98765 43210' },
  { code: 'AE', dial: '+971', label: 'AE +971', placeholder: '50 123 4567' },
  { code: 'SA', dial: '+966', label: 'SA +966', placeholder: '50 123 4567' },
  { code: 'AU', dial: '+61', label: 'AU +61', placeholder: '412 345 678' },
  { code: 'DE', dial: '+49', label: 'DE +49', placeholder: '1512 3456789' },
  { code: 'PT', dial: '+351', label: 'PT +351', placeholder: '912 345 678' },
]

export const trustLogos = [
  { name: 'Teladoc Health', src: '/clients/teladoc-health.svg' },
  { name: 'Ecwid', src: '/clients/ecwid.svg' },
  { name: 'Dovetail', src: '/clients/dovetail.svg' },
]
