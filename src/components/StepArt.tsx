// Decorative artwork for the four "How it works" steps. Styled by the shared
// .sa-* classes in HomeSections.css; the panel text carries the meaning.

function Glow({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`st-glow-${id}`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e31c23" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#e31c23" stopOpacity="0" />
      </radialGradient>
      <pattern id={`st-dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" className="sa-dot" />
      </pattern>
    </defs>
  )
}

function Pill({ x, y, w, label, hot = false }: { x: number; y: number; w: number; label: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="28" rx="14" className={hot ? 'sa-chip-hot' : 'sa-chip'} />
      <text x={x + w / 2} y={y + 18} textAnchor="middle" className={hot ? 'sa-label-hot' : 'sa-label'}>
        {label}
      </text>
    </g>
  )
}

/* 01 Align: everything the team knows, pulled into one kickoff brief. */
function Align() {
  const inputs = [
    { x: 24, y: 40, label: 'Users' },
    { x: 24, y: 196, label: 'Constraints' },
    { x: 330, y: 40, label: 'Launch date' },
    { x: 330, y: 196, label: 'Systems' },
  ]
  return (
    <>
      <circle cx="220" cy="130" r="110" fill="url(#st-glow-align)" className="sa-breathe" />
      {inputs.map((input) => {
        const cx = input.x + 45
        const cy = input.y + 14
        const d = `M${cx} ${cy} C ${cx < 220 ? cx + 80 : cx - 80} ${cy}, ${cx < 220 ? 150 : 290} 130, 220 130`
        return (
          <g key={input.label}>
            <path d={d} className="sa-line" />
            <path d={d} className="sa-flow" />
          </g>
        )
      })}
      {inputs.map((input) => (
        <Pill key={`${input.label}-p`} x={input.x} y={input.y} w={90} label={input.label} />
      ))}
      <g className="sa-float">
        <rect x="160" y="74" width="120" height="112" rx="12" className="sa-panel" />
        <rect x="160" y="74" width="120" height="26" rx="12" className="sa-core" />
        <text x="220" y="91" textAnchor="middle" className="sa-label-hot">
          Kickoff brief
        </text>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="178" cy={118 + i * 22} r="7" className="sa-core" />
            <path d={`M174.5 ${118 + i * 22} l2.5 2.5 l5 -5`} className="sa-tick" />
            <rect x="192" y={114 + i * 22} width={[70, 56, 64][i]} height="8" rx="4" className="sa-code" style={{ animationDelay: `${i * 0.3}s` }} />
          </g>
        ))}
      </g>
    </>
  )
}

/* 02 Prioritize: work moves from the backlog into the first slice. */
function Prioritize() {
  const columns = [
    { x: 24, title: 'Backlog' },
    { x: 162, title: 'First slice' },
    { x: 300, title: 'Later' },
  ]
  return (
    <>
      <ellipse cx="220" cy="140" rx="90" ry="100" fill="url(#st-glow-prio)" className="sa-breathe" />
      {columns.map((column, i) => (
        <g key={column.title}>
          <rect x={column.x} y="30" width="116" height="206" rx="12" className={i === 1 ? 'st-col-hot' : 'sa-panel'} />
          <text x={column.x + 58} y="52" textAnchor="middle" className={i === 1 ? 'st-col-title-hot' : 'sa-label'}>
            {column.title}
          </text>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={`b${i}`} x="36" y={66 + i * 40} width="92" height="30" rx="8" className="sa-chip" />
      ))}
      {[0, 1].map((i) => (
        <rect key={`l${i}`} x="312" y={66 + i * 40} width="92" height="30" rx="8" className="sa-chip" />
      ))}
      <rect x="174" y="66" width="92" height="30" rx="8" className="sa-chip-hot" />
      <text x="220" y="85" textAnchor="middle" className="sa-label-hot">
        Must ship
      </text>
      {/* The card that travels into the slice */}
      <g className="st-move">
        <rect x="36" y="186" width="92" height="30" rx="8" className="sa-chip-hot" />
        <text x="82" y="205" textAnchor="middle" className="sa-label-hot">
          Proves value
        </text>
      </g>
      <g>
        <rect x="312" y="186" width="92" height="30" rx="8" className="st-risk" />
        <text x="358" y="205" textAnchor="middle" className="sa-label">
          ⚠ Risk named
        </text>
      </g>
    </>
  )
}

/* 03 Ship: short sprints, each ending in a demo, gated before release. */
function Ship() {
  const sprints = [0, 1, 2, 3]
  return (
    <>
      <ellipse cx="220" cy="130" rx="160" ry="90" fill="url(#st-glow-ship)" className="sa-breathe" />
      <line x1="30" x2="410" y1="150" y2="150" className="sa-line" />
      {sprints.map((i) => {
        const x = 40 + i * 92
        return (
          <g key={i}>
            <rect x={x} y="132" width="80" height="36" rx="10" className={i === 3 ? 'sa-chip-hot' : 'sa-chip'} />
            <text x={x + 40} y="155" textAnchor="middle" className={i === 3 ? 'sa-label-hot' : 'sa-label'}>
              Sprint {i + 1}
            </text>
            <g className="st-demo" style={{ animationDelay: `${i * 0.5}s` }}>
              <line x1={x + 72} x2={x + 72} y1="132" y2="92" className="sa-line" />
              <path d={`M${x + 72} 92 l22 7 l-22 7 z`} className="sa-core" />
              <text x={x + 72} y="84" textAnchor="middle" className="sa-label-sm">
                demo
              </text>
            </g>
          </g>
        )
      })}
      <g>
        <rect x="120" y="196" width="200" height="34" rx="10" className="sa-panel" />
        <rect x="132" y="210" width="176" height="6" rx="3" className="sa-code" />
        <rect x="132" y="210" width="176" height="6" rx="3" className="st-bar" />
        <text x="220" y="250" textAnchor="middle" className="sa-label-sm">
          Quality gate · merge-ready
        </text>
      </g>
      <circle cx="404" cy="34" r="14" className="sa-core" />
      <path d="M398 34 l4.5 4.5 l8.5 -8.5" className="sa-tick" />
      <text x="382" y="38" textAnchor="end" className="sa-label">
        Released
      </text>
    </>
  )
}

/* 04 Steady: live signals inside the threshold, runbooks your team owns. */
function Steady() {
  const points = [150, 140, 146, 128, 134, 120, 126, 112, 118, 108, 114, 104]
  const line = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${30 + i * 26} ${y}`).join(' ')
  return (
    <>
      <ellipse cx="200" cy="130" rx="170" ry="80" fill="url(#st-glow-steady)" className="sa-breathe" />
      <rect x="20" y="40" width="300" height="160" rx="12" className="sa-panel" />
      <text x="36" y="62" className="sa-label">
        Live signals
      </text>
      <line x1="30" x2="316" y1="88" y2="88" className="st-threshold" />
      <text x="312" y="82" textAnchor="end" className="sa-label-sm">
        alert threshold
      </text>
      <path d={`${line} L316 186 L30 186 Z`} className="hx-graph-area" />
      <path d={line} className="st-line" pathLength="100" />
      <circle cx={30 + 11 * 26} cy={points[11]} r="5" className="st-live" />
      <g className="sa-float">
        <rect x="300" y="120" width="104" height="96" rx="12" className="sa-panel" />
        <text x="352" y="142" textAnchor="middle" className="sa-label">
          Runbook
        </text>
        {[0, 1, 2].map((i) => (
          <rect key={i} x="314" y={154 + i * 16} width={[76, 60, 68][i]} height="7" rx="3.5" className="sa-code" />
        ))}
      </g>
      <Pill x={250} y={20} w={110} label="All systems OK" hot />
    </>
  )
}

const art: Record<string, { key: string; Scene: () => React.JSX.Element }> = {
  '01': { key: 'align', Scene: Align },
  '02': { key: 'prio', Scene: Prioritize },
  '03': { key: 'ship', Scene: Ship },
  '04': { key: 'steady', Scene: Steady },
}

export function StepArt({ step }: { step: string }) {
  const entry = art[step]
  if (!entry) return null
  const { key, Scene } = entry
  return (
    <svg viewBox="0 0 440 260" className="sa-art" aria-hidden="true" focusable="false">
      <Glow id={key} />
      <rect width="440" height="260" fill={`url(#st-dots-${key})`} />
      <Scene />
    </svg>
  )
}
