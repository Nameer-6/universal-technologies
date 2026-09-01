import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { outcomes, services } from '../data'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const fadeScale = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

export default function Services() {
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
      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Services</p>
            <h1 className="section-title" id="services-title">
              Six service lines, one accountable team
            </h1>
            <p className="section-lead">
              Engage one line or all six — we keep architecture, quality, and launch in the same
              conversation either way.
            </p>
          </motion.div>

          <motion.div
            className="service-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {services.map((service) => (
              <motion.article
                key={service.id}
                id={service.id}
                className="service-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <div className="service-top">
                  <span>{service.mark}</span>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.summary}</p>
                <div className="stack-row">
                  {service.stacks.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="services-outcomes-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What changes</p>
              <h2 className="section-title" id="services-outcomes-title">
                What you get, regardless of which lines you pick
              </h2>
            </div>
          </motion.div>

          <motion.div
            className="outcome-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.25 }}
          >
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                className="outcome-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <span className="outcome-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="services-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="services-cta-title">Not sure which lines you need?</h2>
            <p>Tell us the constraint and the deadline — we'll map the smallest team that ships it.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Talk to delivery <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
