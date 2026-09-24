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
import { services } from '../data'
import { ease, usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'

const PROCESS_PILLS = ['Discover', 'Design', 'Build', 'Test', 'Deploy', 'Support'] as const

// The six SDLC stages behind every engagement, shown as the delivery path.
const DELIVERY_STAGES = [
  {
    title: 'Discovery & requirements',
    text: 'We start by understanding your users, your constraints, and what "done" actually means for this project.',
  },
  {
    title: 'Design & architecture',
    text: 'We map the system before we build it — data flow, integrations, and the decisions that are expensive to change later.',
  },
  {
    title: 'Development',
    text: 'Our engineers build in short, reviewable cycles, so you see working software early and often — not just at the end.',
  },
  {
    title: 'QA & testing',
    text: 'Every feature is tested against real use cases, manually and with automation, before it reaches your users.',
  },
  {
    title: 'Deployment',
    text: 'We ship in controlled, monitored releases, so launches are predictable events rather than stressful ones.',
  },
  {
    title: 'Support & iteration',
    text: "After launch, we monitor, maintain, and keep improving — a product doesn't stop evolving once it's live.",
  },
]

const INDUSTRIES = ['Fintech', 'E-commerce', 'Lead generation'] as const

const PRODUCT_FEATURES = [
  'Spots trending topics in your industry, around the clock',
  'Writes platform-ready posts for LinkedIn, X, Facebook, and Instagram',
  'Creates the visuals to match — images, carousels, infographics, PDFs',
  'Builds your weekly posting calendar and publishes it automatically',
  'Boosts your best posts as ads on Meta, LinkedIn, and X in one click',
  'Writes once, adapts to 20+ languages',
] as const

// Each "why us" card rotates in face-up as it scrolls into view, like a card
// flipping over — staggered by the parent's `list` variants (staggerChildren).
const flipCard = {
  hidden: { opacity: 0, rotateY: -80 },
  show: { opacity: 1, rotateY: 0, transition: { duration: 0.65, ease } },
}

const ENGAGEMENTS = [
  {
    tag: 'Fintech',
    title: 'Payments platform — QA & test automation',
    text: 'Built out a regression and automation suite covering core transaction flows, so new releases could go out with confidence instead of guesswork.',
  },
  {
    tag: 'E-commerce',
    title: 'Storefront & checkout reliability',
    text: 'Delivered end-to-end testing across checkout, inventory, and payment integrations ahead of a major seasonal traffic spike.',
  },
  {
    tag: 'Lead generation',
    title: 'Workflow automation for a growing sales team',
    text: 'Designed automation that moved leads through qualification and follow-up steps automatically, freeing the team to focus on closing.',
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
      setPathGate((currentIndex) => (currentIndex + 1) % DELIVERY_STAGES.length)
    }, 2600)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <div className="pf-page">
      <Seo
        title={pageMetadata['/portfolio'].title}
        description={pageMetadata['/portfolio'].description}
        path="/portfolio"
        breadcrumbs={[{ name: 'Portfolio', path: '/portfolio' }]}
      />

      <section className="pf-cv-hero" aria-labelledby="portfolio-title">
        <div className="container">
          <motion.h1 className="pf-cv-title" id="portfolio-title" {...hero}>
            Software that works, the first time.
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
                Universal Technologies designs, builds, and rigorously tests software for teams who
                can't afford surprises — from fintech platforms to e-commerce and lead-generation
                systems.
              </p>
              <div className="hero-actions">
                <Link className="btn pf-cv-primary" to="/contact">
                  Start a project
                </Link>
                <a className="btn btn-ghost-ink" href="#work">
                  See our work
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

      <section className="section band pf-path-section" id="process" aria-labelledby="portfolio-path-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">How we deliver</p>
            <h2 className="section-title" id="portfolio-path-title">
              Six stages between an idea and a working product.
            </h2>
            <p className="section-lead">
              Most software problems aren't really about code — they're about what gets missed
              along the way. So we test early, automate what's repeatable, and never ship something
              we haven't checked ourselves.
            </p>
          </motion.div>

          <div className="pf-path">
            <div className="pf-path-plaque">
              <span>SDLC</span>
              <strong>Six-stage delivery</strong>
            </div>

            <motion.ol className="pf-path-gates pf-path-gates--six" {...list}>
              {DELIVERY_STAGES.map((stage, index) => (
                <motion.li
                  key={stage.title}
                  className={`pf-path-gate${index === pathGate ? ' is-active' : ''}`}
                  variants={item}
                >
                  <p className="pf-path-stage">Stage 0{index + 1}</p>
                  <h3>{stage.title}</h3>
                  <p className="pf-path-copy">{stage.text}</p>
                  {index < DELIVERY_STAGES.length - 1 && (
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
            <p className="section-label">Work</p>
            <h2 className="section-title" id="portfolio-work-title">
              Where we've delivered
            </h2>
            <p className="section-lead">A sample of the kind of engagements we take on.</p>
          </motion.div>

          <motion.div className="pf-why-grid" {...list}>
            {ENGAGEMENTS.map((engagement) => (
              <motion.article
                key={engagement.title}
                className="pf-why-card"
                variants={reduceMotion ? undefined : flipCard}
                style={{ transformPerspective: 1000 }}
              >
                <span>{engagement.tag}</span>
                <h3>{engagement.title}</h3>
                <p>{engagement.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" id="services" aria-labelledby="portfolio-services-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Services</p>
            <h2 className="section-title" id="portfolio-services-title">
              Choose where we plug in.
            </h2>
            <p className="section-lead">
              QA and testing, AI automation, and full software delivery. Pick one, or lean on
              several across a single build.
            </p>
            <ul className="pf-industries">
              {INDUSTRIES.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
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

      <section className="section" id="product" aria-labelledby="portfolio-product-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Our product</p>
            <h2 className="section-title" id="portfolio-product-title">
              postit.ai
            </h2>
            <p className="section-lead">
              Your AI autopilot for content — trends, writing, visuals, and scheduling, in one place.
            </p>
          </motion.div>

          <div className="pf-product">
            <motion.div className="pf-product-copy" {...reveal}>
              <h3>Never run out of what to post.</h3>
              <p>
                Most teams don't run out of things to say — they run out of time to say it
                everywhere, every week. postit.ai closes that gap. It watches for what's trending in
                your industry, writes a post for each platform in the right tone and format, builds
                the visuals to go with it, and fills in your weekly posting calendar automatically —
                so consistency stops depending on someone remembering to do it.
              </p>
              <p>Accounts posting consistently with it see roughly 3.4x more impressions on average.</p>
              <a
                className="btn pf-cv-primary"
                href="https://post-it.universal-technologies.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore postit.ai
              </a>
            </motion.div>

            <motion.ul className="pf-product-features" {...list}>
              {PRODUCT_FEATURES.map((feature) => (
                <motion.li key={feature} variants={item}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{feature}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="portfolio-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="portfolio-cta-title">Have a project that needs to work the first time?</h2>
            <p>
              Tell us what you are building and where it keeps breaking. We will map it to the
              stage and the service that actually fixes it.
            </p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Start a project <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
