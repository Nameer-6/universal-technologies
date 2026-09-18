import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DELIVERY_ECOSYSTEM } from '../components/ServiceFlow'
import { Seo } from '../components/Seo'
import { pageMetadata } from '../seoData'
import { howItWorks, industries, outcomes, services } from '../data'

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

const WHY_US = [
  {
    title: 'Senior-led delivery',
    text: 'Every engagement is led by engineers who have shipped production systems before, working directly inside your roadmap and workflow.',
    points: ['Hands-on technical leadership', 'Direct engineer access', 'No account-manager layer'],
  },
  {
    title: 'One accountable delivery partner',
    text: 'Bring in one capability or combine AI agents, automation, QA, DevOps, and full-stack engineering under one team.',
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
      <Seo
        title={pageMetadata['/services'].title}
        description={pageMetadata['/services'].description}
        path="/services"
      />

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
              Six specialties. One team that talks to itself.
            </h1>
            <p className="svc-hero-subtitle">
              Every line is staffed by senior specialists and run through the same delivery
              process, so picking three services doesn't mean coordinating three separate
              vendors.
            </p>
            <div className="svc-hero-cta">
              <Link className="btn btn-svc-primary" to="/contact">
                Talk to our team <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-ghost-ink" href="#grid">
                See how we deliver
              </a>
            </div>
          </motion.div>

          <motion.div
            className="svc-flow-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <div className="svc-flow">
              <p className="svc-flow-label">How work reaches production</p>
              <ol className="svc-flow-steps">
                {DELIVERY_ECOSYSTEM.map((step, index) => (
                  <li key={step}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{step}</strong>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>

          <p className="svc-marquee-label">Built for teams across</p>
          <ul className="industry-chips">
            {industries.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
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
            Talk to our team <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
