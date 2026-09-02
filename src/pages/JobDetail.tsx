import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ApplyModal } from '../components/ApplyModal'
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

export default function JobDetail() {
  const { id } = useParams<{ id: string }>()
  const reduceMotion = Boolean(useReducedMotion())

  const [applyOpen, setApplyOpen] = useState(false)

  const job = jobOpenings.find((item) => item.id === id)

  if (!job) {
    return <Navigate to="/careers" replace />
  }

  const otherJobs = jobOpenings.filter((item) => item.id !== job.id)

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
      <section className="section" aria-labelledby="job-title">
        <div className="container">
          <motion.div
            className="section-head center"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="section-label">Careers · {job.team}</p>
            <h1 className="section-title" id="job-title">
              {job.title}
            </h1>
            <p className="section-lead">{job.summary}</p>
            <div className="stack-row" style={{ justifyContent: 'center' }}>
              <span>{job.location}</span>
              <span>{job.type}</span>
              <span>{job.team}</span>
            </div>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <button type="button" className="btn btn-ink" onClick={() => setApplyOpen(true)}>
                Apply for this role <span aria-hidden>→</span>
              </button>
              <Link className="btn btn-ghost-ink" to="/careers">
                All openings
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="job-responsibilities-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What you'll do</p>
              <h2 className="section-title" id="job-responsibilities-title">
                Responsibilities
              </h2>
            </div>
          </motion.div>

          <motion.ul
            className="job-list"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {job.responsibilities.map((item) => (
              <motion.li key={item} variants={reduceMotion ? undefined : fadeUp}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section" aria-labelledby="job-requirements-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What we're looking for</p>
              <h2 className="section-title" id="job-requirements-title">
                Requirements
              </h2>
            </div>
          </motion.div>

          <motion.ul
            className="job-list"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {job.requirements.map((item) => (
              <motion.li key={item} variants={reduceMotion ? undefined : fadeUp}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section band" aria-labelledby="job-perks-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Why Universal</p>
            <h2 className="section-title" id="job-perks-title">
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

      <section className="section" aria-labelledby="job-other-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Explore more</p>
            <h2 className="section-title" id="job-other-title">
              Other open roles
            </h2>
          </motion.div>

          <div className="related-jobs-grid">
            {otherJobs.map((item) => (
              <Link key={item.id} className="related-job-card" to={`/careers/${item.id}`}>
                <span>{item.team}</span>
                <strong>{item.title}</strong>
                <em aria-hidden>→</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="job-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="job-cta-title">Ready to apply?</h2>
            <p>Send your resume and a note on what you'd want to own first.</p>
          </motion.div>
          <button type="button" className="btn btn-light" onClick={() => setApplyOpen(true)}>
            Apply for this role <span aria-hidden>→</span>
          </button>
        </div>
      </section>

      <ApplyModal jobTitle={job.title} open={applyOpen} onClose={() => setApplyOpen(false)} />
    </>
  )
}
