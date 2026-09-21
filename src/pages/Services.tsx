import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { DELIVERY_ECOSYSTEM } from '../components/ServiceFlow'
import { Seo } from '../components/Seo'
import { ServicesLive } from '../components/ServicesLive'
import { Bars, Sparkline } from '../components/chartPrimitives'
import { dataVar } from '../components/chartTokens'
import { PLUG_CHARTS } from '../components/serviceCharts'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { PRIMARY_CTA, howItWorks, industries, outcomes, services } from '../data'

const WHY_US = [
  {
    title: 'Direct senior access',
    text: 'Every engagement is led by engineers who have shipped production systems before. You work with a named delivery lead and reach the engineers doing the work directly, with a clear path for escalation.',
    points: ['Hands-on technical leadership', 'Direct engineer access', 'Named delivery lead and clear escalation path'],
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
  const { reduceMotion, reveal, hero, heroFollow, list, item, inView } = usePageMotion()

  return (
    <div className="svc-page">
      <Seo
        title={pageMetadata['/services'].title}
        description={pageMetadata['/services'].description}
        path="/services"
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
      />

      <section className="svc-section svc-hero" aria-labelledby="services-title">
        <div className="container">
          <div className="svc-hero-split">
          <motion.div
            className="svc-hero-inner"
            {...hero}
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
                {PRIMARY_CTA} <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-ghost-ink" href="#process">
                See how we deliver
              </a>
            </div>
          </motion.div>

          <ServicesLive />
          </div>

          <motion.div
            className="svc-path-wrap"
            {...heroFollow}
          >
            <p className="svc-path-label">How work reaches production</p>
            <ol className="svc-path">
              {DELIVERY_ECOSYSTEM.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{step}</strong>
                </li>
              ))}
            </ol>
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
            {...list}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                id={service.id}
                className="svc-list-item"
                variants={item}
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
                  {PLUG_CHARTS[service.id] ? (
                    <div className="svc-list-chart">
                      {PLUG_CHARTS[service.id].kind === 'spark' ? (
                        <Sparkline
                          points={PLUG_CHARTS[service.id].points}
                          color={PLUG_CHARTS[service.id].color}
                          animate={!reduceMotion}
                        />
                      ) : (
                        <Bars
                          values={PLUG_CHARTS[service.id].points}
                          colors={[dataVar('slate'), dataVar('slate'), dataVar('slate'), dataVar(PLUG_CHARTS[service.id].color)]}
                          animate={!reduceMotion}
                        />
                      )}
                    </div>
                  ) : null}
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
            {...list}
          >
            {WHY_US.map((reason, index) => (
              <motion.div
                key={reason.title}
                className="svc-why-card"
                variants={item}
              >
                <span className="svc-why-index">0{index + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
                <ul className="svc-why-list">
                  {reason.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" id="process" aria-labelledby="services-process-title">
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
            {...list}
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.step}
                className="svc-process-card"
                variants={item}
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
            {...list}
          >
            {outcomes.map((outcome, index) => (
              <motion.div
                key={outcome.title}
                className="svc-outcome-card"
                variants={item}
              >
                <span className="svc-outcome-index">0{index + 1}</span>
                <h3>{outcome.title}</h3>
                <p>{outcome.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="services-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="services-cta-title">Not sure which capability you need?</h2>
            <p>
              Start with a 30-minute call. Describe what you're building and where it's slowing
              down, and we'll tell you which of these six services actually addresses it.
            </p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
