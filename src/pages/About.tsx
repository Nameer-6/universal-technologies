import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { companyValues, leadership, milestones } from '../pagesData'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

export default function About() {
  const reduceMotion = Boolean(useReducedMotion())
  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.28 },
        variants: fadeUp,
        transition: { duration: 0.7, ease },
      }

  return (
    <>
      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">About us</p>
            <h1 className="section-title" id="about-title">
              A delivery team that stays accountable after launch
            </h1>
            <p className="section-lead">
              Universal Technologies started as three engineers tired of watching good products
              stall between handoffs. We're now the delivery layer for teams who'd rather ship
              than coordinate. (Placeholder copy — replace with your real story.)
            </p>
          </motion.div>

          <motion.div className="stats-row" {...reveal}>
            {milestones.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="values-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What we believe</p>
              <h2 className="section-title" id="values-title">
                Principles we actually enforce
              </h2>
            </div>
            <p className="section-lead">
              These aren't wall art — they're what a delivery lead checks a project against every
              sprint.
            </p>
          </motion.div>

          <motion.div
            className="engage-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {companyValues.map((item) => (
              <motion.article
                key={item.step}
                className="engage-card"
                variants={reduceMotion ? undefined : fadeUp}
              >
                <span className="engage-mark">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="leadership-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Leadership</p>
            <h2 className="section-title" id="leadership-title">
              The people accountable for delivery
            </h2>
            <p className="section-lead">Placeholder team bios — swap in your real leadership.</p>
          </motion.div>

          <motion.div
            className="engage-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {leadership.map((person) => (
              <motion.article
                key={person.name}
                className="engage-card"
                variants={reduceMotion ? undefined : fadeUp}
              >
                <span className="engage-mark">
                  {person.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
                <em>{person.role}</em>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="about-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="about-cta-title">Want to build with us?</h2>
            <p>See open roles or send us a brief — either way, a real person replies tomorrow.</p>
          </motion.div>
          <Link className="btn btn-light" to="/careers">
            See open roles <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
