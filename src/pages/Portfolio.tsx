import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ClientMarquee } from '../components/ClientMarquee'
import { ServiceChartCard } from '../components/ServiceChartCard'
import { PLUG_CHARTS, PLUG_EXPLORE } from '../components/serviceCharts'
import { HeroBoardStage } from '../components/HeroBoards'
import { SERVICE_BOARD } from '../components/boardMap'
import { SWAP } from '../components/chartTokens'
import { PRIMARY_CTA, howItWorks, services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'

const PROCESS_PILLS = ['Scope', 'Team', 'Pilot', 'Build', 'Test', 'Deploy', 'Scale'] as const

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

export default function Portfolio() {
  const { reduceMotion, reveal, hero, heroFollow, list, item, inView } = usePageMotion()
  const [active, setActive] = useState(0)
  const [pathGate, setPathGate] = useState(0)
  const current = services[active]
  const [pill, setPill] = useState(reduceMotion ? 3 : 0)
  // Set while the pointer is over the hero board so it stops rotating under it.
  const paused = useRef(false)
  const heroVisual = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40, filter: 'blur(16px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { duration: 1.2, delay: 0.2, ease: SWAP },
      }

  useEffect(() => {
    if (reduceMotion || services.length < 2) return undefined
    const id = window.setInterval(() => {
      if (paused.current) return
      setActive((currentIndex) => (currentIndex + 1) % services.length)
    }, 3600)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = window.setInterval(() => {
      setPill((current) => (current + 1) % PROCESS_PILLS.length)
    }, 1400)
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
        breadcrumbs={[{ name: 'Work', path: '/portfolio' }]}
      />

      <section className="pf-cv-hero" aria-labelledby="portfolio-title">
        <div className="container">
          <motion.h1 className="pf-cv-title" id="portfolio-title" {...hero}>
            Six engineering services. One accountable delivery partner
          </motion.h1>

          <div className="pf-cv-split">
            <motion.div {...heroFollow}>
              <div className="pf-cv-name">
                {reduceMotion ? (
                  <span>{current.title}</span>
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.title}
                      initial={{ opacity: 0, y: 34, filter: 'blur(12px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -34, filter: 'blur(12px)' }}
                      transition={{ duration: 0.7, ease: SWAP }}
                    >
                      {current.title}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <p className="pf-cv-lead">
                Choose one capability or combine several across AI agents, workflow automation, QA,
                DevOps, SaaS, and end-to-end development — brought together around the outcome
                your business needs.
              </p>
              <div className="hero-actions">
                <Link className="btn pf-cv-primary" to="/contact">
                  {PRIMARY_CTA}
                </Link>
                <a className="btn btn-ghost-ink" href="#work">
                  Explore services
                </a>
              </div>
              <ol className="pf-cv-pills">
                {PROCESS_PILLS.map((step, index) => (
                  <li key={step}>
                    <span className={`pf-cv-pill${index === pill ? ' is-active' : ''}`}>{step}</span>
                    {index < PROCESS_PILLS.length - 1 ? (
                      <span className={`pf-cv-pill-line${index < pill ? ' is-done' : ''}`} aria-hidden />
                    ) : null}
                  </li>
                ))}
              </ol>
            </motion.div>

            <motion.div className="pf-cv-visual" {...heroVisual}>
              <HeroBoardStage
                boardKey={SERVICE_BOARD[current.id] ?? 'automation'}
                reduceMotion={reduceMotion}
                onHoverChange={(hovering) => {
                  paused.current = hovering
                }}
              />
              <div className="pf-cv-dashes" aria-hidden>
                {services.map((service, index) => (
                  <span key={service.id} className={index === active ? 'is-on' : undefined} />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="pf-trust" id="clients">
            <p>Organizations our team has supported</p>
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

          <div className="pf-plug-grid">
            {services.map((service, index) => (
              <ServiceChartCard
                key={service.id}
                id={service.id}
                index={index}
                title={service.title}
                summary={service.summary}
                capabilities={service.stacks.slice(0, 4)}
                chart={PLUG_CHARTS[service.id] ?? PLUG_CHARTS['ai-agents']}
                exploreLabel={PLUG_EXPLORE[service.id] ?? service.title.toLowerCase()}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="portfolio-why-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <h2 className="section-title" id="portfolio-why-title">
              Why teams choose Universal
            </h2>
          </motion.div>

          <motion.div className="pf-why-grid" {...list}>
            {WHY_US.map((card, index) => (
              <motion.article key={card.title} className="pf-why-card" variants={item}>
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
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
