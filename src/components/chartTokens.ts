// Settling curve for chart draw-ins; SWAP is the slower one used when whole
// panels blur in and out.
export const EASE = [0.22, 0.61, 0.36, 1] as const
export const SWAP = [0.22, 1, 0.36, 1] as const

export type ChartColor = 'blue' | 'purple' | 'amber'

export const dataVar = (name: 'blue' | 'purple' | 'amber' | 'gray' | 'slate') => `var(--data-${name})`
