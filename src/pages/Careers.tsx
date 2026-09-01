import { motion, useReducedMotion } from 'framer-motion'
import { CONTACT_EMAIL } from '../data'
import { jobOpenings, perks } from '../pagesData'

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

export default function Careers() {
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
      <section className="section" aria-labelledby="careers-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Careers</p>
            <h1 className="section-title" id="careers-title">
              Build the delivery layer, from the inside
            </h1>
            <p className="section-lead">
              We hire senior people and give them real ownership. (Placeholder copy — replace with
              your real careers pitch.)
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="perks-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Why Universal</p>
            <h2 className="section-title" id="perks-title">
              What you get, beyond salary
            </h2>
          </motion.div>

          <motion.div
            className="engage-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {perks.map((item) => (
              <motion.article
                key={item.step}
                className="engage-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <span className="engage-mark">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <em>{item.detail}</em>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" id="openings" aria-labelledby="openings-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Open roles</p>
              <h2 className="section-title" id="openings-title">
                Five openings this quarter
              </h2>
            </div>
            <p className="section-lead">
              Don't see your role? Email {CONTACT_EMAIL} — we read every note.
            </p>
          </motion.div>

          <motion.div
            className="service-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {jobOpenings.map((job) => (
              <motion.article
                key={job.id}
                className="service-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <div className="service-top">
                  <span>{job.team}</span>
                  <h3>{job.title}</h3>
                </div>
                <p>{job.summary}</p>
                <div className="stack-row">
                  <span>{job.location}</span>
                  <span>{job.type}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="careers-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="careers-cta-title">Don't see the right role?</h2>
            <p>Send us your resume anyway — we keep a shortlist for the next opening.</p>
          </motion.div>
          <a className="btn btn-light" href={`mailto:${CONTACT_EMAIL}`}>
            Email your resume <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </>
  )
}
