import { Fragment } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkline } from '../components/Sparkline'
import { howItWorks, industries, outcomes, services } from '../data'

const ROLLBACK_TREND =
  '0,5.6 10.9,10.2 21.8,15.2 32.7,13.5 43.6,19 54.5,17.3 65.4,22.8 76.3,21.1 87.2,26.6 98.1,24.9 109,29.9 119.9,27.4'

const MARQUEE_LIST = [...industries, ...industries]

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

const PIPELINE_STAGES = ['build', 'run', 'test', 'canary', 'prod']

const WHY_US = [
  {
    title: 'Senior-led delivery',
    text: 'Every engagement is led by engineers who have shipped production systems before, working directly inside your roadmap and workflow.',
    points: ['Hands-on technical leadership', 'Direct engineer access', 'No account-manager layer'],
  },
  {
    title: 'One accountable delivery partner',
    text: 'Bring in one capability or combine software development, QA, design, DevOps, security, and AI under one team.',
    points: ['Single point of ownership', 'Cross-functional teams', 'Scale capabilities as needed'],
  },
  {
    title: 'Built around your workflow',
    text: 'We work inside your existing tools, processes, and roadmap instead of forcing your team into a separate delivery model.',
    points: ['Your tools and processes', 'Your sprint cadence', 'Shared visibility'],
  },
]

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
    <div className="svc-page">
      <section className="svc-section svc-hero" aria-labelledby="services-title">
        <div className="container">
          <motion.div
            className="svc-hero-inner"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="svc-eyebrow">Services</p>
            <h1 className="svc-hero-title" id="services-title">
              Six engineering services. One accountable delivery partner
            </h1>
            <p className="svc-hero-subtitle">
              Choose one capability or combine several across software development, QA
              automation, UI/UX, DevOps, cybersecurity, and AI — brought together around the
              outcome your business needs.
            </p>
            <div className="svc-hero-cta">
              <Link className="btn btn-svc-primary" to="/contact">
                Book a call <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-svc-ghost" href="#grid">
                Explore services
              </a>
            </div>
          </motion.div>

          <div className="svc-pipeline-wrap">
            <motion.div
              className="svc-pipeline"
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              <div className="svc-pipeline-bar">
                <span className="svc-console-dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="svc-pipeline-bar-label">Deployment pipeline · api-gateway — main</span>
              </div>

              <div className="svc-pipeline-body">
                <div className="svc-pipeline-stages" aria-hidden>
                  {PIPELINE_STAGES.map((stage, index) => (
                    <Fragment key={stage}>
                      <div className="svc-pipeline-stage is-done">
                        <i />
                        <span>{stage}</span>
                      </div>
                      {index < PIPELINE_STAGES.length - 1 && (
                        <div className="svc-pipeline-connector is-done" />
                      )}
                    </Fragment>
                  ))}
                </div>

                <div className="svc-pipeline-terminal" aria-hidden>
                  <div>
                    <span className="cmd">$ universal deploy --env prod</span>
                  </div>
                  <div className="out">→ bundle 2.1mb · 16 fn · edge</div>
                  <div className="out">→ canary 5% traffic · 0 errors</div>
                </div>

                <div className="svc-pipeline-stats">
                  <div>
                    <Sparkline />
                    <strong>180</strong>
                    <span>Deploys / wk</span>
                  </div>
                  <div>
                    <Sparkline points={ROLLBACK_TREND} />
                    <strong>0.6%</strong>
                    <span>Rollback rate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <p className="svc-marquee-label">Built for teams across</p>
          <div className="svc-marquee" aria-label="Industries we support">
            <div className={`svc-marquee-track${reduceMotion ? ' paused' : ''}`}>
              {MARQUEE_LIST.map((name, index) => (
                <span key={`${name}-${index}`}>{name}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" id="grid" aria-labelledby="services-grid-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Capabilities</p>
            <h2 className="svc-title" id="services-grid-title">
              Pick the lines you need
            </h2>
            <p className="svc-lede">
              Every line ships from the same delivery process — align, prioritize, ship, steady.
            </p>
          </motion.div>

          <motion.div
            className="svc-list-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                variants={reduceMotion ? undefined : fadeScale}
              >
                <Link to={`/services/${service.id}`} className="svc-list-card">
                  <div className="svc-list-top">
                    <span>{service.mark}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.summary}</p>
                  <div className="svc-stack-row">
                    {service.stacks.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <span className="svc-list-more">
                    Explore {service.title.toLowerCase()} <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="services-why-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Why teams choose us</p>
            <h2 className="svc-title" id="services-why-title">
              Six capabilities. One accountable team.
            </h2>
          </motion.div>

          <motion.div
            className="svc-why-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {WHY_US.map((item) => (
              <motion.div
                key={item.title}
                className="svc-why-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ul className="svc-why-list">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" aria-labelledby="services-process-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">How it works</p>
            <h2 className="svc-title" id="services-process-title">
              From scope to delivery
            </h2>
            <p className="svc-lede">
              Clear ownership, senior engineering leadership, and a delivery model built around
              your roadmap.
            </p>
          </motion.div>

          <motion.div
            className="svc-process-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.step}
                className="svc-process-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <span className="svc-process-index">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="services-outcomes-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">What changes</p>
            <h2 className="svc-title" id="services-outcomes-title">
              What you get, regardless of which lines you pick
            </h2>
          </motion.div>

          <motion.div
            className="svc-outcome-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.25 }}
          >
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                className="svc-outcome-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <span className="svc-outcome-index">0{index + 1}</span>
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
            <h2 id="services-cta-title">Not sure which capability you need?</h2>
            <p>
              Start with a 30-minute call. Describe what you're building and where it's slowing
              down, and we'll tell you which of these six services actually addresses it.
            </p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Book a call <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
