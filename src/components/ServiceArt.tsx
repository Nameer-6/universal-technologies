// Decorative artwork for each service line (homepage capabilities grid).
// Pure SVG + CSS animation, themed through HomeSections.css tokens. The card
// text carries the meaning, so every scene is aria-hidden.

type ArtProps = { id: string }

const Defs = ({ id }: { id: string }) => (
  <defs>
    <radialGradient id={`sa-glow-${id}`} cx="50%" cy="50%" r="50%">
      <stop offset="0%" stopColor="#e31c23" stopOpacity="0.55" />
      <stop offset="100%" stopColor="#e31c23" stopOpacity="0" />
    </radialGradient>
    <pattern id={`sa-dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" className="sa-dot" />
    </pattern>
  </defs>
)

const Backdrop = ({ id }: { id: string }) => (
  <>
    <rect width="400" height="220" fill={`url(#sa-dots-${id})`} />
  </>
)

function Chip({ x, y, w, label, hot = false }: { x: number; y: number; w: number; label: string; hot?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="26" rx="13" className={hot ? 'sa-chip-hot' : 'sa-chip'} />
      <text x={x + w / 2} y={y + 17} textAnchor="middle" className={hot ? 'sa-label-hot' : 'sa-label'}>
        {label}
      </text>
    </g>
  )
}

function AiAgents() {
  const tools = [
    { x: 30, y: 30, label: 'CRM' },
    { x: 30, y: 164, label: 'Docs' },
    { x: 294, y: 30, label: 'Slack' },
    { x: 294, y: 164, label: 'Database' },
  ]
  return (
    <>
      {tools.map((tool) => {
        const cx = tool.x + 38
        const cy = tool.y + 13
        const d = `M${cx} ${cy} C ${cx < 200 ? cx + 70 : cx - 70} ${cy}, ${cx < 200 ? 130 : 270} 110, 200 110`
        return (
          <g key={tool.label}>
            <path d={d} className="sa-line" />
            <path d={d} className="sa-flow" />
          </g>
        )
      })}
      {tools.map((tool) => (
        <Chip key={`${tool.label}-chip`} x={tool.x} y={tool.y} w={76} label={tool.label} />
      ))}
      <circle cx="200" cy="110" r="70" fill="url(#sa-glow-ai)" className="sa-breathe" />
      <circle cx="200" cy="110" r="44" className="sa-ring" />
      <circle cx="200" cy="110" r="44" className="sa-orbit" />
      <circle cx="200" cy="110" r="28" className="sa-core" />
      <path d="M200 96 l4 10 l10 4 l-10 4 l-4 10 l-4 -10 l-10 -4 l10 -4 z" className="sa-spark" />
      <g className="sa-bubble">
        <rect x="236" y="88" width="104" height="24" rx="8" className="sa-chip" />
        <circle cx="250" cy="100" r="3" className="sa-typing" />
        <circle cx="260" cy="100" r="3" className="sa-typing sa-d2" />
        <circle cx="270" cy="100" r="3" className="sa-typing sa-d3" />
        <text x="280" y="104" className="sa-label-sm">drafting</text>
      </g>
    </>
  )
}

function Workflow() {
  const steps = ['Trigger', 'Enrich', 'Classify', 'Route', 'Deliver']
  const path = 'M40 120 L360 120'
  return (
    <>
      <path d={path} className="sa-line" />
      <path d={path} className="sa-flow" />
      {steps.map((step, i) => {
        const x = 40 + i * 80
        const hot = i === 2
        return (
          <g key={step}>
            <circle cx={x} cy="120" r={hot ? 22 : 16} className={hot ? 'sa-core' : 'sa-node'} />
            {hot && <circle cx={x} cy="120" r="38" fill="url(#sa-glow-wf)" className="sa-breathe" />}
            <text x={x} y={hot ? 160 : 156} textAnchor="middle" className="sa-label">
              {step}
            </text>
            <text x={x} y="124" textAnchor="middle" className={hot ? 'sa-label-hot' : 'sa-label-sm'}>
              {i + 1}
            </text>
          </g>
        )
      })}
      <circle r="6" className="sa-packet" style={{ offsetPath: `path('${path}')` }} />
      <Chip x={130} y={40} w={140} label="New lead · enrich" />
      <path d="M200 66 L200 96" className="sa-line" />
    </>
  )
}

function Qa() {
  const rows = [
    { label: 'auth.spec', state: 'pass' },
    { label: 'billing.spec', state: 'pass' },
    { label: 'checkout.spec', state: 'pass' },
    { label: 'search.spec', state: 'run' },
  ]
  return (
    <>
      <rect x="30" y="30" width="210" height="160" rx="14" className="sa-panel" />
      {rows.map((row, i) => {
        const y = 52 + i * 34
        return (
          <g key={row.label} className="sa-row" style={{ animationDelay: `${i * 0.25}s` }}>
            <rect x="44" y={y} width="182" height="26" rx="8" className="sa-chip" />
            {row.state === 'pass' ? (
              <>
                <circle cx="60" cy={y + 13} r="8" className="sa-core" />
                <path d={`M56 ${y + 13} l3 3 l6 -6`} className="sa-tick" />
              </>
            ) : (
              <circle cx="60" cy={y + 13} r="7" className="sa-spin" />
            )}
            <text x="76" y={y + 17} className="sa-label">
              {row.label}
            </text>
          </g>
        )
      })}
      <circle cx="310" cy="110" r="62" fill="url(#sa-glow-qa)" className="sa-breathe" />
      <circle cx="310" cy="110" r="44" className="sa-ring" />
      <circle cx="310" cy="110" r="44" className="sa-progress" pathLength="100" />
      <text x="310" y="108" textAnchor="middle" className="sa-big">
        CI
      </text>
      <text x="310" y="126" textAnchor="middle" className="sa-label-sm">
        gated
      </text>
    </>
  )
}

function DevOps() {
  const loop = 'M200 110 C 160 50, 70 50, 70 110 C 70 170, 160 170, 200 110 C 240 50, 330 50, 330 110 C 330 170, 240 170, 200 110 Z'
  const labels = [
    { x: 70, y: 40, t: 'Build' },
    { x: 40, y: 190, t: 'Test' },
    { x: 330, y: 40, t: 'Deploy' },
    { x: 360, y: 190, t: 'Monitor' },
  ]
  return (
    <>
      <circle cx="200" cy="110" r="80" fill="url(#sa-glow-ops)" className="sa-breathe" />
      <path d={loop} className="sa-loop" />
      <path d={loop} className="sa-flow sa-flow-slow" />
      <circle r="7" className="sa-packet sa-packet-loop" style={{ offsetPath: `path('${loop}')` }} />
      {labels.map((label) => (
        <text key={label.t} x={label.x} y={label.y} textAnchor="middle" className="sa-label">
          {label.t}
        </text>
      ))}
      <g>
        <rect x="174" y="96" width="52" height="28" rx="8" className="sa-core" />
        <text x="200" y="114" textAnchor="middle" className="sa-label-hot">
          main
        </text>
      </g>
    </>
  )
}

function Saas() {
  const layers = [
    { y: 140, label: 'Data · Postgres', hot: false },
    { y: 104, label: 'Billing · Auth', hot: false },
    { y: 68, label: 'Your product', hot: true },
  ]
  return (
    <>
      <ellipse cx="200" cy="118" rx="150" ry="70" fill="url(#sa-glow-saas)" className="sa-breathe" />
      {layers.map((layer, i) => (
        <g key={layer.label} className="sa-float" style={{ animationDelay: `${i * 0.4}s` }}>
          <path
            d={`M200 ${layer.y - 22} L320 ${layer.y} L200 ${layer.y + 22} L80 ${layer.y} Z`}
            className={layer.hot ? 'sa-plane-hot' : 'sa-plane'}
          />
          <text x="200" y={layer.y + 4} textAnchor="middle" className={layer.hot ? 'sa-label-hot' : 'sa-label'}>
            {layer.label}
          </text>
        </g>
      ))}
      <Chip x={18} y={30} w={84} label="Tenant A" />
      <Chip x={298} y={30} w={84} label="Tenant B" />
      <Chip x={298} y={176} w={84} label="Tenant C" />
    </>
  )
}

function EndToEnd() {
  return (
    <>
      <rect x="28" y="36" width="140" height="148" rx="12" className="sa-panel" />
      <rect x="40" y="50" width="116" height="14" rx="4" className="sa-chip" />
      <rect x="40" y="72" width="54" height="50" rx="6" className="sa-chip" />
      <rect x="102" y="72" width="54" height="50" rx="6" className="sa-chip" />
      <rect x="40" y="130" width="116" height="10" rx="4" className="sa-chip" />
      <rect x="40" y="146" width="70" height="22" rx="11" className="sa-core" />
      <text x="98" y="30" textAnchor="middle" className="sa-label">
        Design
      </text>

      <path d="M174 110 L224 110" className="sa-line" />
      <path d="M174 110 L224 110" className="sa-flow" />
      <circle cx="200" cy="110" r="40" fill="url(#sa-glow-e2e)" className="sa-breathe" />

      <rect x="232" y="36" width="140" height="148" rx="12" className="sa-panel" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect
          key={i}
          x={246 + (i % 3 === 1 ? 12 : 0)}
          y={54 + i * 18}
          width={[90, 70, 100, 60, 84, 50][i]}
          height="8"
          rx="4"
          className={i === 2 ? 'sa-code-hot' : 'sa-code'}
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
      <text x="302" y="30" textAnchor="middle" className="sa-label">
        Production
      </text>
      <circle cx="356" cy="168" r="9" className="sa-core" />
      <path d="M352 168 l3 3 l6 -6" className="sa-tick" />
    </>
  )
}

const scenes: Record<string, { key: string; Scene: () => React.JSX.Element }> = {
  'ai-agents': { key: 'ai', Scene: AiAgents },
  'workflow-automation': { key: 'wf', Scene: Workflow },
  qa: { key: 'qa', Scene: Qa },
  devops: { key: 'ops', Scene: DevOps },
  saas: { key: 'saas', Scene: Saas },
  'end-to-end-development': { key: 'e2e', Scene: EndToEnd },
}

export function ServiceArt({ id }: ArtProps) {
  const entry = scenes[id]
  if (!entry) return null
  const { key, Scene } = entry
  return (
    <svg viewBox="0 0 400 220" className="sa-art" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet">
      <Defs id={key} />
      <Backdrop id={key} />
      <Scene />
    </svg>
  )
}
