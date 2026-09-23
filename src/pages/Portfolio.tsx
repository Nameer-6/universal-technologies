import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ClientMarquee } from '../components/ClientMarquee'
import { howItWorks, services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'

const PROCESS_PILLS = ['Scope', 'Team', 'Pilot', 'Build', 'Test', 'Deploy', 'Scale'] as const

// Middle card reveals first; side cards then slide out from behind it.
const whyReveal = {
  hidden: (offset: number) => ({
    opacity: 0,
    x: offset * -60,
    scale: offset === 0 ? 0.9 : 0.94,
  }),
  show: (offset: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: offset === 0 ? 0.6 : 0.75,
      delay: offset === 0 ? 0 : 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

const WHY_US = [
  {
    title: 'Senior-led delivery',
    kicker: 'Experienced leadership from day one',
    text: 'Every engagement is led by engineers who have shipped production systems before, working directly inside your roadmap and workflow.',
  },
  {
    title: 'One accountable delivery partner',
    kicker: 'Six capabilities. One accountable team.',
    text: 'Bring in one capability or combine AI agents, automation, QA, DevOps, and full-stack engineering under one delivery partner.',
  },
  {
    title: 'Built around your workflow',
    kicker: 'Your roadmap. Your workflow. Our engineering team.',
    text: 'Our engineers work within your existing tools, processes, roadmap, and communication rhythm instead of forcing your team into a separate delivery model.',
  },
]

const SPARKS = [
  [10, 16, 12, 22, 18, 28, 24],
  [14, 10, 18, 14, 26, 20, 30],
  [8, 14, 20, 16, 12, 24, 18],
  [12, 20, 14, 28, 18, 22, 16],
  [18, 12, 22, 10, 26, 14, 30],
  [16, 22, 12, 20, 28, 18, 24],
]

const BOARDS = [
  {
    title: 'Automation Builder',
    subtitle: 'workflow · prod-eng-1',
    steps: ['Trigger', 'Enrich', 'Classify', 'Route', 'Deliver'],
    active: 1,
    left: { label: 'Runs today', value: 'On track' },
    right: { label: 'Avg latency', value: 'Staging' },
    foot: 'Queue throughput',
  },
  {
    title: 'Automation Builder',
    subtitle: 'workflow · prod-eng-1',
    steps: ['Trigger', 'Enrich', 'Classify', 'Route', 'Deliver'],
    active: 2,
    left: { label: 'Runs today', value: 'On track' },
    right: { label: 'Avg latency', value: 'Staging' },
    foot: 'Queue throughput',
  },
  {
    title: 'Release gates',
    subtitle: 'qa-suite · main',
    steps: ['Build', 'Test', 'Canary', 'Gate', 'Prod'],
    active: 1,
    left: { label: 'Checks', value: 'CI-gated' },
    right: { label: 'Feedback', value: 'On merge' },
    foot: 'Pipeline health',
  },
  {
    title: 'Deployment pipeline',
    subtitle: 'api-gateway · main',
    steps: ['Build', 'Test', 'Canary', 'Prod', 'Watch'],
    active: 3,
    left: { label: 'Deploys', value: 'Routine' },
    right: { label: 'Rollback', value: 'Rehearsed' },
    foot: 'Traffic shift',
  },
  {
    title: 'Product console',
    subtitle: 'saas · multi-tenant',
    steps: ['Auth', 'Bill', 'Tenant', 'Ship', 'Observe'],
    active: 2,
    left: { label: 'Tenants', value: 'Isolated' },
    right: { label: 'Billing', value: 'Metered' },
    foot: 'Platform health',
  },
  {
    title: 'Delivery board',
    subtitle: 'end-to-end · production',
    steps: ['Align', 'Build', 'Test', 'Ship', 'Steady'],
    active: 1,
    left: { label: 'Focus', value: 'Production' },
    right: { label: 'Cadence', value: 'Two-week' },
    foot: 'Release progress',
  },
] as const

function Spark({ variant }: { variant: number }) {
  const heights = SPARKS[variant % SPARKS.length]
  return (
    <svg className="pf-plug-spark" viewBox="0 0 120 36" aria-hidden>
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 17}
          y={36 - height}
          width="11"
          height={height}
          rx="2.5"
          className={index === heights.length - 2 ? 'is-accent' : undefined}
        />
      ))}
    </svg>
  )
}

function MiniSpark() {
  return (
    <svg className="pf-mini-spark" viewBox="0 0 120 36" aria-hidden>
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
        points="0,28 18,22 36,24 54,14 72,18 90,8 120,12"
      />
    </svg>
  )
}

export default function Portfolio() {
  const { reduceMotion, reveal, hero, heroFollow, list, item, inView } = usePageMotion()
  const [active, setActive] = useState(0)
  const [pathGate, setPathGate] = useState(0)
  const current = services[active]
  const board = BOARDS[active] ?? BOARDS[0]

  useEffect(() => {
    if (reduceMotion || services.length < 2) return undefined
    const id = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % services.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = window.setInterval(() => {
      setPathGate((currentIndex) => (currentIndex + 1) % howItWorks.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="pf-page">
      <Seo
        title={pageMetadata['/portfolio'].title}
        description={pageMetadata['/portfolio'].description}
        path="/portfolio"
      />

      <section className="pf-cv-hero" aria-labelledby="portfolio-title">
        <div className="container">
          <motion.h1 className="pf-cv-title" id="portfolio-title" {...hero}>
            Six engineering services. One accountable delivery partner
          </motion.h1>

          <div className="pf-cv-split">
            <motion.div {...heroFollow}>
              <p className="pf-cv-kicker">{current.title}</p>
              <p className="pf-cv-lead">
                Choose one capability or combine several across AI agents, workflow automation, QA,
                DevOps, SaaS, and end-to-end development — brought together around the outcome
                your business needs.
              </p>
              <div className="hero-actions">
                <Link className="btn pf-cv-primary" to="/contact">
                  Book a call
                </Link>
                <a className="btn btn-ghost-ink" href="#work">
                  Explore services
                </a>
              </div>
              <ol className="pf-cv-pills">
                {PROCESS_PILLS.map((step) => (
                  <li key={step} className={step === 'Build' ? 'is-active' : undefined}>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div className="pf-visual" aria-hidden {...heroFollow}>
              <div className="pf-visual-bar">
                <span />
                <span />
                <span />
                <div className="pf-visual-titles">
                  <strong>{board.title}</strong>
                  <em>{board.subtitle}</em>
                </div>
              </div>
              <div className="pf-visual-flow">
                {board.steps.map((step, index) => (
                  <span key={step} className={index === board.active ? 'is-active' : undefined}>
                    {step}
                  </span>
                ))}
              </div>
              <div className="pf-visual-stats">
                <div>
                  <small>{board.left.label}</small>
                  <strong>{board.left.value}</strong>
                  <MiniSpark />
                </div>
                <div>
                  <small>{board.right.label}</small>
                  <strong>{board.right.value}</strong>
                  <MiniSpark />
                </div>
              </div>
              <div className="pf-visual-foot">
                <span>{board.foot}</span>
                <b />
              </div>
            </motion.div>
          </div>

          <div className="pf-trust" id="clients">
            <p>Trusted by teams at</p>
            <ClientMarquee />
          </div>
        </div>
      </section>

      <section className="section band pf-path-section" id="path" aria-labelledby="portfolio-path-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">The path</p>
            <h2 className="section-title" id="portfolio-path-title">
              Scoped work, with the quality gates already inside the price.
            </h2>
            <p className="section-lead">
              A typical partner covers one stage, or two stages that argue with each other. We own
              every gate, so results carry client names.
            </p>
          </motion.div>

          <div className="pf-path">
            <div className="pf-path-plaque">
              <span>Project</span>
              <strong>Scoped Delivery</strong>
            </div>

            <motion.ol className="pf-path-gates" {...list}>
              {howItWorks.map((stage, index) => (
                <motion.li
                  key={stage.step}
                  className={`pf-path-gate${index === pathGate ? ' is-active' : ''}`}
                  variants={item}
                >
                  <p className="pf-path-stage">Stage {stage.step}</p>
                  <h3>{stage.title}</h3>
                  <p className="pf-path-copy">{stage.text}</p>
                  <ul className="pf-path-chips">
                    {stage.cards.map((card) => (
                      <li key={card.label}>
                        <strong>{card.label}</strong>
                        <span>{card.detail}</span>
                      </li>
                    ))}
                  </ul>
                  {index < howItWorks.length - 1 && (
                    <span className="pf-path-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  )}
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </section>

      <section className="section" id="work" aria-labelledby="portfolio-work-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <h2 className="section-title" id="portfolio-work-title">
              Choose where we plug in.
            </h2>
          </motion.div>

          <motion.div className="pf-plug-grid" {...list}>
            {services.map((service, index) => (
              <motion.div key={service.id} variants={item}>
                <Link to={`/services/${service.id}`} className="pf-plug-card">
                  <span className="pf-plug-mark">{service.mark}</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className="pf-plug-tags">
                    {service.stacks.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <Spark variant={index} />
                  <span className="pf-plug-more">
                    Explore {service.title.toLowerCase()} <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="portfolio-why-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <h2 className="section-title" id="portfolio-why-title">
              Why teams choose Universal Technologies
            </h2>
          </motion.div>

          <motion.div
            className="pf-why-grid"
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.3 }}
          >
            {WHY_US.map((card, index) => (
              <motion.article
                key={card.title}
                className="pf-why-card"
                variants={reduceMotion ? undefined : whyReveal}
                custom={index - Math.floor(WHY_US.length / 2)}
              >
                <span>0{index + 1}</span>
                <h3>{card.title}</h3>
                <em>{card.kicker}</em>
                <p>{card.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="portfolio-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="portfolio-cta-title">Not sure which capability you need?</h2>
            <p>
              Start with a 30-minute call. Describe what you are building and where it is slowing
              down, and we will tell you which of these six services actually addresses it.
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
