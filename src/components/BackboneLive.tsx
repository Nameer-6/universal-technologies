import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { HeroBoardStage } from './HeroBoards'
import { SERVICE_BOARD } from './boardMap'
import './HomeSections.css'

const ROTATE_MS = 3500

// Sits directly after the scroll-driven hero, as its own section, so it never
// touches that animation. One "service console": pick a line on the left,
// its live dashboard shows on the right. It advances on its own until the
// visitor hovers or picks a line.
export function BackboneLive() {
  const { reduceMotion, reveal } = usePageMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const service = services[active]

  useEffect(() => {
    if (reduceMotion || paused) return
    const timer = window.setTimeout(() => setActive((index) => (index + 1) % services.length), ROTATE_MS)
    return () => window.clearTimeout(timer)
  }, [active, paused, reduceMotion])

  return (
    <section className="section hx-section bb-live" id="backbone-live" aria-labelledby="bb-live-title">
      <div className="container">
        <motion.div className="section-head center" {...reveal}>
          <p className="section-label">In motion</p>
          <h2 className="section-title hx-duo" id="bb-live-title">
            Six service lines. <span>One delivery rhythm.</span>
          </h2>
          <p className="section-lead">
            Pick a line to see the kind of dashboard we set up for it. Hover a chart to read it, or grab
            the dashboard and move it.
          </p>
        </motion.div>

        <motion.div
          className="bb-console"
          {...reveal}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="bb-tabs" role="tablist" aria-label="Service lines" aria-orientation="vertical">
            {services.map((item, index) => {
              const selected = index === active
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`bb-tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="bb-panel"
                  className={`bb-tab${selected ? ' is-active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  <span className="bb-tab-mark">{item.mark}</span>
                  <span className="bb-tab-body">
                    <span className="bb-tab-title">{item.title}</span>
                    {selected && <span className="bb-tab-summary">{item.summary}</span>}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="bb-stage hx-card" id="bb-panel" role="tabpanel" aria-labelledby={`bb-tab-${service.id}`}>
            <div className="bb-stage-head">
              <span className="hx-chip">
                <i aria-hidden="true" /> Live view · {service.title}
              </span>
              <Link className="bb-stage-link" to={`/services/${service.id}`}>
                Explore {service.title} <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="bb-stage-board">
              <AnimatePresence initial={false}>
                <motion.div
                  key={service.id}
                  className="bb-board-layer"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <HeroBoardStage
                    boardKey={SERVICE_BOARD[service.id] ?? 'automation'}
                    reduceMotion={reduceMotion}
                    float={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <ul className="bb-stack" aria-label={`${service.title} stack`}>
              {service.stacks.map((stack) => (
                <li key={stack}>{stack}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <p className="bb-note">Illustrative dashboards showing the kind of tooling we set up. Not client data.</p>
      </div>
    </section>
  )
}
