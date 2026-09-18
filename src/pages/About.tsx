import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { pageMetadata } from '../seoData'
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
      <Seo
        title={pageMetadata['/about'].title}
        description={pageMetadata['/about'].description}
        path="/about"
      />

      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">About us</p>
            <h1 className="section-title" id="about-title">
              We got tired of watching good ideas die in handoffs.
            </h1>
            <p className="section-lead">
              Most software problems aren't technical, they're organizational: the designer hands
              off to an engineer who hands off to a tester who hands off to an ops team, and every
              handoff loses context. Universal Technologies started in 2016 to close that gap —
              one team, now 40+ people across 18 countries, carries a project from the first
              sketch to production and stays close to it after launch instead of disappearing.
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
                What we actually enforce
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
            <p className="section-lead">
              The people a client can actually name when they ask who's accountable for their
              release.
            </p>
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
                <em>{person.role}</em>
                <h3>{person.name}</h3>
                <p>{person.bio}</p>
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
            <h2 id="about-cta-title">Want to work with us?</h2>
            <p>Send a brief — a real person replies immediately.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Talk to our team <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
