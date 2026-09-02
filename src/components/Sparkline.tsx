const DEFAULT_POINTS =
  '0,27.4 10.9,29.9 21.8,24.9 32.7,26.6 43.6,21.1 54.5,22.8 65.4,17.3 76.3,19 87.2,13.5 98.1,15.2 109,10.2 119.9,5.6'

export function Sparkline({ points = DEFAULT_POINTS }: { points?: string }) {
  return (
    <svg className="svc-sparkline" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden>
      <polyline points={points} />
    </svg>
  )
}
