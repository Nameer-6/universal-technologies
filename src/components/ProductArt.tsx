import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '../pagesData'

// Small product diagrams (illustrative, not product data) and the shared
// image-forward product card used on the homepage and the Products page.

function PulseVisual() {
  const points = [70, 62, 66, 48, 54, 40, 46, 30, 36, 28]
  const path = points.map((y, i) => `${i === 0 ? 'M' : 'L'}${14 + i * 30} ${y}`).join(' ')
  return (
    <svg viewBox="0 0 300 100" className="hx-graph" role="img" aria-label="Illustration: release health trend with deploy markers">
      {[30, 55, 80].map((y) => (
        <line key={y} x1="10" x2="290" y1={y} y2={y} className="hx-graph-grid" />
      ))}
      <path d={`${path} L284 92 L14 92 Z`} className="hx-graph-area" />
      <path d={path} className="hx-graph-brand" />
      {[2, 5, 8].map((i) => (
        <circle key={i} cx={14 + i * 30} cy={points[i]} r="4" className="hx-graph-marker" />
      ))}
      <text x="12" y="14" className="hx-graph-text">Release health</text>
    </svg>
  )
}

function LedgerVisual() {
  const rows = [true, true, false, true]
  return (
    <svg viewBox="0 0 300 100" className="hx-graph" role="img" aria-label="Illustration: payments matched to ledger rows, one flagged for review">
      <text x="12" y="14" className="hx-graph-text">Payments</text>
      <text x="288" y="14" textAnchor="end" className="hx-graph-text">Ledger</text>
      {rows.map((ok, i) => {
        const y = 26 + i * 18
        return (
          <g key={i}>
            <rect x="12" y={y} width="92" height="12" rx="4" className="hx-graph-node" />
            <rect x="196" y={y} width="92" height="12" rx="4" className="hx-graph-node" />
            <path d={`M104 ${y + 6} C 140 ${y + 6}, 160 ${y + 6}, 196 ${y + 6}`} className={ok ? 'hx-graph-match' : 'hx-graph-muted'} />
            <circle cx="150" cy={y + 6} r="6" className={ok ? 'hx-dot-brand' : 'hx-graph-flag'} />
            <text x="150" y={y + 9} textAnchor="middle" className="hx-graph-glyph">
              {ok ? '✓' : '!'}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function TriageVisual() {
  const lanes = [
    { y: 26, label: 'Critical' },
    { y: 52, label: 'Billing' },
    { y: 78, label: 'Product' },
  ]
  return (
    <svg viewBox="0 0 300 100" className="hx-graph" role="img" aria-label="Illustration: inbound tickets routed to critical, billing and product queues">
      <rect x="12" y="38" width="64" height="26" rx="8" className="hx-graph-node" />
      <text x="44" y="55" textAnchor="middle" className="hx-graph-text">Inbox</text>
      {lanes.map((lane, i) => (
        <g key={lane.label}>
          <path d={`M76 51 C 120 51, 140 ${lane.y}, 190 ${lane.y}`} className="hx-graph-line" />
          <path d={`M76 51 C 120 51, 140 ${lane.y}, 190 ${lane.y}`} className="hx-graph-flow" style={{ animationDelay: `${i * 0.3}s` }} />
          <rect x="190" y={lane.y - 10} width="98" height="20" rx="10" className={i === 0 ? 'hx-graph-node-hot' : 'hx-graph-node'} />
          <text x="239" y={lane.y + 4} textAnchor="middle" className={i === 0 ? 'hx-graph-core-text' : 'hx-graph-text'}>
            {lane.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

function FieldsyncVisual() {
  return (
    <svg viewBox="0 0 300 100" className="hx-graph" role="img" aria-label="Illustration: a field device works offline and syncs when signal returns">
      <rect x="18" y="14" width="46" height="76" rx="9" className="hx-graph-node" />
      <rect x="26" y="26" width="30" height="6" rx="3" className="hx-dot-ink" />
      <rect x="26" y="38" width="22" height="6" rx="3" className="hx-dot-ink" />
      <rect x="26" y="50" width="30" height="6" rx="3" className="hx-dot-brand" />
      <text x="41" y="78" textAnchor="middle" className="hx-graph-text">Offline</text>
      <path d="M64 52 C 120 52, 170 52, 226 52" className="hx-graph-line" />
      <path d="M64 52 C 120 52, 170 52, 226 52" className="hx-graph-flow" />
      <g>
        <path d="M134 40 a22 22 0 0 1 32 0" className="hx-graph-muted" />
        <path d="M140 46 a13 13 0 0 1 20 0" className="hx-graph-muted" />
        <circle cx="150" cy="52" r="3" className="hx-dot-brand" />
        <text x="150" y="76" textAnchor="middle" className="hx-graph-text">Signal back</text>
      </g>
      <rect x="226" y="30" width="60" height="44" rx="10" className="hx-graph-node-hot" />
      <text x="256" y="56" textAnchor="middle" className="hx-graph-core-text">Synced</text>
    </svg>
  )
}

function PostitVisual() {
  const channels = [
    { y: 20, label: 'LinkedIn' },
    { y: 50, label: 'Instagram' },
    { y: 80, label: 'Facebook' },
  ]
  return (
    <svg viewBox="0 0 300 100" className="hx-graph" role="img" aria-label="Illustration: one draft published to LinkedIn, Instagram and Facebook">
      <rect x="14" y="30" width="78" height="40" rx="10" className="hx-graph-node-hot" />
      <text x="53" y="54" textAnchor="middle" className="hx-graph-core-text">One draft</text>
      {channels.map((channel, i) => (
        <g key={channel.label}>
          <path d={`M92 50 C 140 50, 160 ${channel.y}, 200 ${channel.y}`} className="hx-graph-line" />
          <path d={`M92 50 C 140 50, 160 ${channel.y}, 200 ${channel.y}`} className="hx-graph-flow" style={{ animationDelay: `${i * 0.3}s` }} />
          <rect x="200" y={channel.y - 11} width="86" height="22" rx="11" className="hx-graph-node" />
          <text x="243" y={channel.y + 4} textAnchor="middle" className="hx-graph-text">{channel.label}</text>
        </g>
      ))}
    </svg>
  )
}

export const productVisuals: Record<string, () => React.JSX.Element> = {
  pulse: PulseVisual,
  ledgerline: LedgerVisual,
  triagebot: TriageVisual,
  fieldsync: FieldsyncVisual,
  'postit-ai': PostitVisual,
}

/** Image-forward product card: diagram, status, name, tagline, tags. */
export function ProductCard({
  product,
  as: Heading = 'h3',
  motionProps = {},
}: {
  product: Product
  as?: 'h2' | 'h3'
  motionProps?: Record<string, unknown>
}) {
  const Visual = productVisuals[product.id]
  return (
    <motion.article className="hx-card hx-product" {...motionProps}>
      <Link to={`/products/${product.id}`} className="hx-product-link">
        {Visual && (
          <div className="hx-outcome-visual">
            <Visual />
          </div>
        )}
        <p className="hx-chip">
          <i aria-hidden="true" /> {product.status}
        </p>
        <Heading>{product.name}</Heading>
        <p className="hx-product-tagline">{product.tagline}</p>
        <p>{product.description}</p>
        <ul className="hx-tags">
          {product.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <span className="hx-more">
          Explore {product.name} <span aria-hidden>→</span>
        </span>
      </Link>
    </motion.article>
  )
}

