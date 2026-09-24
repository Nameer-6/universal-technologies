import type { BoardKey } from './HeroBoards'

// Which animated dashboard represents each service line.
export const SERVICE_BOARD: Record<string, BoardKey> = {
  'ai-agents': 'api',
  'workflow-automation': 'automation',
  qa: 'qa',
  devops: 'development',
  saas: 'cloud',
  'end-to-end-development': 'design',
}
