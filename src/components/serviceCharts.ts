import type { ChartColor } from './chartTokens'

export type ServiceChart = {
  kind: 'spark' | 'bars'
  color: ChartColor
  points: number[]
}

// One small chart per service: a self-drawing line for some, growing bars for others.
export const PLUG_CHARTS: Record<string, ServiceChart> = {
  'ai-agents': { kind: 'spark', color: 'blue', points: [4, 6, 5, 9, 7, 12, 10, 15] },
  'workflow-automation': { kind: 'bars', color: 'amber', points: [7, 9, 8, 12, 10, 14, 12, 16] },
  qa: { kind: 'bars', color: 'purple', points: [5, 8, 6, 11, 9, 13, 10, 15] },
  devops: { kind: 'bars', color: 'blue', points: [9, 7, 8, 10, 11, 13, 14, 16] },
  saas: { kind: 'spark', color: 'purple', points: [5, 7, 6, 10, 9, 13, 12, 16] },
  'end-to-end-development': { kind: 'spark', color: 'amber', points: [4, 6, 5, 9, 7, 12, 10, 15] },
}

export const PLUG_EXPLORE: Record<string, string> = {
  'ai-agents': 'AI agents',
  'workflow-automation': 'workflow automation',
  qa: 'QA and test automation',
  devops: 'DevOps and infrastructure',
  saas: 'SaaS-based applications',
  'end-to-end-development': 'end-to-end development',
}
