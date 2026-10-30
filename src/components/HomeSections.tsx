import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRIMARY_CTA, engagements, howItWorks, outcomes } from '../data'
import { products } from '../pagesData'
import { StepArt } from './StepArt'
import { ProductCard } from './ProductArt'
import './HomeSections.css'

const ease = [0.22, 1, 0.36, 1] as const

function useReveal(delay = 0) {
  const reduce = useReducedMotion()
  if (reduce) return {}
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease, delay },
  }
}

/* ------------------------------------------------------------------ */
/* Auto-advancing selection, paused while the visitor hovers or focuses. */
/* ------------------------------------------------------------------ */

function useAutoAdvance(count: number, ms: number) {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused) return
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % count), ms)
    return () => window.clearTimeout(timer)
  }, [active, paused, reduce, count, ms])

  const pauseProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  }
  return { active, setActive, pauseProps }
}

/* ------------------------------------------------------------------ */
/* How it works: a guided walkthrough. Stops on a timeline; the active  */
/* step opens a large panel with its deliverables and an illustration. */
/* ------------------------------------------------------------------ */

const STEP_MS = 6000

export type WalkthroughStep = {
  step: string
  /** Short name for the timeline stop; falls back to the title. */
  short?: string
  title: string
  text: string
  cards?: { label: string; detail: string }[]
  art: React.ReactNode
}

/** Auto-advancing walkthrough: stops on a timeline, one large panel with copy + artwork. */
export function Walkthrough({
  id,
  label,
  title,
  lead,
  steps,
  alt = false,
}: {
  id: string
  label: string
  title: React.ReactNode
  lead?: React.ReactNode
  steps: WalkthroughStep[]
  alt?: boolean
}) {
  const reduce = useReducedMotion()
  const head = useReveal()
  const body = useReveal(0.1)
  const { active, setActive, pauseProps } = useAutoAdvance(steps.length, STEP_MS)
  const count = steps.length
  const edge = `${100 / (count * 2)}%`

  return (
    <section className={`section hx-section${alt ? ' hx-section-alt' : ''}`} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <motion.div className="section-head center" {...head}>
          <p className="section-label">{label}</p>
          <h2 className="section-title hx-duo" id={`${id}-title`}>
            {title}
          </h2>
          {lead && <p className="section-lead">{lead}</p>}
        </motion.div>

        <motion.div className="hw" {...body} {...pauseProps}>
          <div
            className={`hw-steps${count > 4 ? ' is-many' : ''}`}
            role="tablist"
            aria-label={label}
            style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
          >
            <span className="hw-track" aria-hidden="true" style={{ left: edge, right: edge }}>
              <span className="hw-track-fill" style={{ width: `${(active / (count - 1)) * 100}%` }} />
            </span>
            {steps.map((item, index) => (
              <button
                key={item.step}
                type="button"
                role="tab"
                id={`${id}-tab-${item.step}`}
                aria-selected={index === active}
                aria-controls={`${id}-panel-${item.step}`}
                className={`hw-step${index === active ? ' is-active' : ''}${index < active ? ' is-done' : ''}`}
                onClick={() => setActive(index)}
              >
                <span className="hw-node" aria-hidden="true">
                  {index < active ? '✓' : item.step}
                </span>
                <span className="hw-step-title">{item.short ?? item.title}</span>
              </button>
            ))}
          </div>

          <div className="hx-card hw-stage">
            {steps.map((item, index) => (
              <div
                key={item.step}
                role="tabpanel"
                id={`${id}-panel-${item.step}`}
                aria-labelledby={`${id}-tab-${item.step}`}
                hidden={index !== active}
                className="hw-panel"
              >
                <div className="hw-copy">
                  <p className="hx-chip">
                    <i aria-hidden="true" /> Step {item.step} of {String(count).padStart(2, '0')}
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {item.cards && item.cards.length > 0 && (
                    <ul className="hw-deliverables">
                      {item.cards.map((card, cardIndex) => (
                        <motion.li
                          key={card.label}
                          initial={reduce ? false : { opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.45, ease, delay: 0.1 + cardIndex * 0.08 }}
                        >
                          <span className="hw-check" aria-hidden="true">✓</span>
                          <span>
                            <strong>{card.label}</strong>
                            <small>{card.detail}</small>
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="hw-visual">
                  {index === active && (
                    <motion.div
                      className="hw-visual-inner"
                      initial={reduce ? false : { opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.55, ease }}
                    >
                      {item.art}
                    </motion.div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function GatesSection() {
  return (
    <Walkthrough
      id="how"
      label="How it works"
      title={
        <>
          Four steps. <span>One accountable team.</span>
        </>
      }
      lead="A repeatable operating rhythm for product work: shared scope, short loops, visible progress."
      steps={howItWorks.map((item) => ({ ...item, art: <StepArt step={item.step} /> }))}
    />
  )
}

// Staggered reveal for list items (plain function, safe inside map).
function stagger(index: number, reduce: boolean | null) {
  if (reduce) return {}
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease, delay: index * 0.08 },
  }
}

/* ------------------------------------------------------------------ */
/* What changes: each outcome gets a small diagram.                   */
/* ------------------------------------------------------------------ */

function OwnerGraph() {
  const nodes = [
    { x: 46, y: 32, label: 'Web' },
    { x: 46, y: 118, label: 'Mobile' },
    { x: 254, y: 32, label: 'QA' },
    { x: 254, y: 118, label: 'Cloud' },
  ]
  return (
    <svg viewBox="0 0 300 150" className="hx-graph" role="img" aria-label="Diagram: web, mobile, QA and cloud all report to one delivery lead">
      {nodes.map((node) => (
        <g key={node.label}>
          <path d={`M${node.x} ${node.y} L150 75`} className="hx-graph-line" />
          <path d={`M${node.x} ${node.y} L150 75`} className="hx-graph-flow" />
        </g>
      ))}
      {nodes.map((node) => (
        <g key={`${node.label}-node`}>
          <rect x={node.x - 30} y={node.y - 12} width="60" height="24" rx="12" className="hx-graph-node" />
          <text x={node.x} y={node.y + 4} textAnchor="middle" className="hx-graph-text">
            {node.label}
          </text>
        </g>
      ))}
      <circle cx="150" cy="75" r="30" className="hx-graph-halo" />
      <circle cx="150" cy="75" r="22" className="hx-graph-core" />
      <text x="150" y="79" textAnchor="middle" className="hx-graph-core-text">
        Lead
      </text>
    </svg>
  )
}

function ShiftLeftGraph() {
  const reduce = useReducedMotion()
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, amount: 0.6 },
          transition: { duration: 1.4, ease, delay },
        }
  const stages = ['Build', 'Merge', 'Demo', 'Release']
  return (
    <svg viewBox="0 0 300 150" className="hx-graph" role="img" aria-label="Diagram: with QA gates, issues are found at merge instead of at release">
      {[40, 70, 100].map((y) => (
        <line key={y} x1="20" x2="290" y1={y} y2={y} className="hx-graph-grid" />
      ))}
      <line x1="20" x2="290" y1="124" y2="124" className="hx-graph-axis" />
      {stages.map((stage, index) => (
        <text key={stage} x={40 + index * 72} y="140" textAnchor="middle" className="hx-graph-text">
          {stage}
        </text>
      ))}
      <path d="M20 122 C 110 121, 170 116, 220 74 S 272 30, 290 34" className="hx-graph-muted" />
      <path d="M20 122 C 60 70, 96 30, 116 30 S 170 104, 290 118 L290 124 L20 124 Z" className="hx-graph-area" />
      <motion.path d="M20 122 C 60 70, 96 30, 116 30 S 170 104, 290 118" className="hx-graph-brand" {...draw(0.1)} />
      <g className="hx-graph-legend">
        <circle cx="26" cy="12" r="4" className="hx-dot-brand" />
        <text x="35" y="15">With QA gates</text>
        <circle cx="130" cy="12" r="4" className="hx-dot-muted" />
        <text x="139" y="15">QA after the demo</text>
      </g>
    </svg>
  )
}

function HandoffGraph() {
  const reduce = useReducedMotion()
  const ours = [0.88, 0.76, 0.62, 0.46, 0.28, 0.12]
  const top = 26
  const height = 92
  return (
    <svg viewBox="0 0 300 150" className="hx-graph" role="img" aria-label="Diagram: ownership moves from our team to your team by handoff">
      <g className="hx-graph-legend">
        <rect x="20" y="8" width="8" height="8" rx="2" className="hx-dot-brand" />
        <text x="33" y="15">Our team</text>
        <rect x="100" y="8" width="8" height="8" rx="2" className="hx-dot-ink" />
        <text x="113" y="15">Your team</text>
      </g>
      {ours.map((share, index) => {
        const x = 26 + index * 44
        const oursHeight = height * share
        return (
          <g key={index}>
            <motion.rect
              x={x}
              width="28"
              rx="4"
              className="hx-bar-ink"
              initial={reduce ? false : { y: top + height, height: 0 }}
              whileInView={{ y: top, height }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease, delay: index * 0.08 }}
            />
            <motion.rect
              x={x}
              width="28"
              rx="4"
              className="hx-bar-brand"
              initial={reduce ? false : { y: top + height, height: 0 }}
              whileInView={{ y: top + height - oursHeight, height: oursHeight }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease, delay: 0.2 + index * 0.08 }}
            />
          </g>
        )
      })}
      <text x="40" y="140" textAnchor="middle" className="hx-graph-text">
        Kickoff
      </text>
      <text x="260" y="140" textAnchor="middle" className="hx-graph-text">
        Handoff
      </text>
    </svg>
  )
}

const outcomeGraphs = [OwnerGraph, ShiftLeftGraph, HandoffGraph]

export function OutcomesSection() {
  const reduce = useReducedMotion()
  const head = useReveal()
  return (
    <section className="section hx-section hx-section-alt" id="outcomes" aria-labelledby="outcomes-title">
      <div className="container">
        <motion.div className="section-head center" {...head}>
          <p className="section-label">What changes</p>
          <h2 className="section-title hx-duo" id="outcomes-title">
            Results you can feel <span>in the next release.</span>
          </h2>
          <p className="section-lead">
            Less coordination overhead. Clearer ownership. Software that stays operable after launch.
          </p>
        </motion.div>

        <div className="hx-outcomes">
          {outcomes.map((outcome, index) => {
            const Graph = outcomeGraphs[index % outcomeGraphs.length]
            return (
              <motion.article key={outcome.title} className="hx-card hx-outcome" {...stagger(index, reduce)}>
                <div className="hx-outcome-visual">
                  <Graph />
                </div>
                <p className="hx-chip">
                  <i aria-hidden="true" /> 0{index + 1}
                </p>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </motion.article>
            )
          })}
        </div>
        <p className="hx-caption">Diagrams illustrate how we work. They are not client data.</p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Ways to engage: pick a model, read its terms.                       */
/* ------------------------------------------------------------------ */

const engagementTerms: Record<string, { label: string; value: string }[]> = {
  A: [
    { label: 'We own', value: 'Design, engineering, QA and launch for a scoped initiative' },
    { label: 'You keep', value: 'Product decisions, plus the code, infrastructure and docs from the first commit' },
    { label: 'Team', value: 'A full product squad under one delivery lead' },
    { label: 'Best when', value: 'You need a release owned end to end' },
  ],
  B: [
    { label: 'We own', value: 'Senior specialists working inside your backlog and rituals' },
    { label: 'You keep', value: 'Planning, priorities and architecture decisions' },
    { label: 'Team', value: 'Embedded engineers, QA or DevOps specialists' },
    { label: 'Best when', value: 'The roadmap is clear but capacity is thin' },
  ],
  C: [
    { label: 'We own', value: 'The quality, infrastructure or delivery bottleneck blocking launch' },
    { label: 'You keep', value: 'The release date and the final go / no-go' },
    { label: 'Team', value: 'A small senior team matched to the bottleneck' },
    { label: 'Best when', value: 'The date is fixed and the path is not' },
  ],
}

const ENGAGE_MS = 5000

export function EngageSection() {
  const { active, setActive, pauseProps } = useAutoAdvance(engagements.length, ENGAGE_MS)
  const selected = engagements[active].step
  const head = useReveal()
  const panel = useReveal(0.1)
  const side = useReveal(0.2)

  return (
    <section className="section hx-section" id="engage" aria-labelledby="engage-title">
      <div className="container">
        <motion.div className="section-head center" {...head}>
          <p className="section-label">Ways to engage</p>
          <h2 className="section-title hx-duo" id="engage-title">
            Choose the shape <span>that fits this quarter.</span>
          </h2>
        </motion.div>

        <div className="hx-engage">
          <motion.div className="hx-card hx-terms" {...panel} {...pauseProps}>
            <div className="hx-terms-head">
              <span className="hx-terms-title">
                <i aria-hidden="true" /> Engagement terms
              </span>
              <div className="hx-tabs" role="tablist" aria-label="Engagement model">
                {engagements.map((engagement) => (
                  <button
                    key={engagement.step}
                    type="button"
                    role="tab"
                    id={`engage-tab-${engagement.step}`}
                    aria-selected={selected === engagement.step}
                    aria-controls={`engage-panel-${engagement.step}`}
                    onClick={() => setActive(engagements.indexOf(engagement))}
                  >
                    {engagement.title}
                  </button>
                ))}
              </div>
            </div>
            {engagements.map((engagement) => (
              <div
                key={engagement.step}
                role="tabpanel"
                id={`engage-panel-${engagement.step}`}
                aria-labelledby={`engage-tab-${engagement.step}`}
                hidden={selected !== engagement.step}
                className="hx-terms-body"
              >
                <dl>
                  {engagementTerms[engagement.step]?.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </motion.div>

          <motion.div className="hx-engage-side" {...side}>
            <h3>
              You choose the shape.
              <br />
              We carry the delivery.
            </h3>
            <p>
              Same standards in every model: tests before merge, one delivery lead, and everything we
              build stays in your organisation.
            </p>
            <div className="hero-actions">
              <Link className="btn hx-btn-brand" to="/contact">
                {PRIMARY_CTA} <span aria-hidden>→</span>
              </Link>
              <Link className="btn btn-ghost-ink" to="/portfolio">
                See our work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Products: three accelerators, each with a small product diagram.   */
/* ------------------------------------------------------------------ */

export function ProductsSection() {
  const reduce = useReducedMotion()
  const head = useReveal()
  const featured = products.slice(0, 3)
  return (
    <section className="section hx-section hx-section-alt" id="products" aria-labelledby="home-products-title">
      <div className="container">
        <motion.div className="section-head center" {...head}>
          <p className="section-label">Products</p>
          <h2 className="section-title hx-duo" id="home-products-title">
            Tools we built, <span>then kept running.</span>
          </h2>
          <p className="section-lead">Internal accelerators used on client work, then productized.</p>
        </motion.div>
        <div className="hx-products">
          {featured.map((product, index) => (
            <ProductCard key={product.id} product={product} motionProps={stagger(index, reduce)} />
          ))}
        </div>
        <div className="section-more">
          <Link className="btn btn-ghost-ink" to="/products">
            All {products.length} products <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
