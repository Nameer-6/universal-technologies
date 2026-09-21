import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { HeroBoardStage } from './HeroBoards'
import { SERVICE_BOARD } from './boardMap'

// Sits directly after the scroll-driven hero. It is a separate section, so it
// never touches that animation: one live dashboard per service line, laid out
// as a grid. Hover a chart to read it, or grab a dashboard and move it.
export function BackboneLive() {
  const { reduceMotion, reveal, list, item } = usePageMotion()

  return (
    <section className="section bb-live" id="backbone-live" aria-labelledby="bb-live-title">
      <div className="container">
        <motion.div className="section-head center" {...reveal}>
          <p className="section-label">In motion</p>
          <h2 className="section-title" id="bb-live-title">
            Six service lines, all in motion.
          </h2>
          <p className="section-lead">
            Every line runs on the same delivery rhythm. Hover any chart to read it, or grab a
            dashboard and move it around.
          </p>
        </motion.div>

        <motion.div className="bb-grid" {...list}>
          {services.map((service) => (
            <motion.article key={service.id} className="bb-cell" variants={item}>
              <Link to={`/services/${service.id}`} className="bb-cell-head">
                <span className="bb-cell-mark">{service.mark}</span>
                <h3>{service.title}</h3>
                <span className="bb-cell-arrow" aria-hidden>
                  →
                </span>
              </Link>
              <div className="bb-cell-board">
                <HeroBoardStage
                  boardKey={SERVICE_BOARD[service.id] ?? 'automation'}
                  reduceMotion={reduceMotion}
                  float={false}
                />
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="bb-note">
          Illustrative dashboards showing the kind of tooling we set up — not client data.
        </p>
      </div>
    </section>
  )
}
