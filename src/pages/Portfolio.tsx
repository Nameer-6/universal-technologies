import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { PostitDashboard } from '../components/PostitDashboard'
import { ClientMarquee } from '../components/ClientMarquee'
import { ExportMenu } from '../components/ExportMenu'
import { ServiceChartCard } from '../components/ServiceChartCard'
import { PLUG_CHARTS, PLUG_EXPLORE } from '../components/serviceCharts'
import { HeroBoardStage } from '../components/HeroBoards'
import { SERVICE_BOARD } from '../components/boardMap'
import { SWAP } from '../components/chartTokens'
import { clients, services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { clientProfiles } from '../portfolioData'
import type { PortfolioExportContent } from '../portfolioExport'

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

const PRODUCT_FEATURES = [
  { label: 'Spots trending topics', icon: 'M3 17l6-6 4 4 8-8M15 7h6v6' },
  { label: 'Writes platform-ready posts', icon: 'M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4zM13.5 6.5l4 4' },
  { label: 'Creates stunning visuals', icon: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9.5h.01' },
  { label: 'Builds your posting calendar', icon: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4' },
  { label: 'Boosts top posts with AI', icon: 'M6 20v-6M12 20V6M18 20v-10' },
  { label: 'Adapts to 20+ languages', icon: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.500 5.600 12 3z' },
] as const

// Icon paths are 24x24 stroke glyphs; `tone` is the card's accent colour.
const INDUSTRY_CARDS = [
  {
    title: 'Healthcare & HealthTech',
    sub: 'Connected healthcare & wellness platforms',
    text: 'Built and tested patient, caregiver, wellness, accessibility, and connected-device experiences where reliability and data accuracy are critical.',
    tone: '#e5384a',
    icon: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8zM7 12h2.5l1.5-3 2 6 1.5-3H17',
  },
  {
    title: 'Cybersecurity & Identity',
    sub: 'Secure access & identity workflows',
    text: 'Delivered authentication, authorization, role-based access, API security, and identity-focused workflows across complex applications.',
    tone: '#2f6fe4',
    icon: 'M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3zM9.5 11h5v4h-5zM10.5 11V9.5a1.5 1.5 0 0 1 3 0V11',
  },
  {
    title: 'Education & EdTech',
    sub: 'Digital learning experiences',
    text: 'Built and validated platforms for learning, training, assessments, content delivery, and user progress across web and mobile.',
    tone: '#7c4ddb',
    icon: 'M2 9l10-5 10 5-10 5L2 9zM6 11.5V16c0 1.2 2.7 2.5 6 2.5s6-1.3 6-2.5v-4.5M22 9v6',
  },
  {
    title: 'FinTech, Banking & Markets',
    sub: 'Payments & financial platforms',
    text: 'Delivered QA, automation, integrations, transaction workflows, dashboards, and financial systems built around accuracy and reliability.',
    tone: '#f08a1c',
    icon: 'M3 10l9-6 9 6H3zM5 10v8M9 10v8M13 10v8M3 20h12M17 19l2-2 2 1 1-2',
  },
  {
    title: 'Mobility, Travel & Aviation',
    sub: 'Booking & mobility platforms',
    text: 'Worked across reservation, scheduling, location, payment, operational, and customer-facing journeys for mobility and travel products.',
    tone: '#14a98a',
    icon: 'M17.8 19.2L16 11l3.5-3.5a2.1 2.1 0 0 0-3-3L13 8 4.8 6.2 3.4 7.6l6.3 3.6-3.1 3.1-2.7-.4L2.5 15.5l4 1.5 1.5 4 1.4-1.4-.4-2.7 3.1-3.1 3.6 6.3 1.6-1.5z',
  },
  {
    title: 'Logistics & Storage',
    sub: 'Operations & fulfillment systems',
    text: 'Built and tested workflows covering inventory, tracking, storage, fulfillment, operational dashboards, and system integrations.',
    tone: '#2f6fe4',
    icon: 'M2 6h11v10H2zM13 9h4l4 4v3h-8zM6 19a1.8 1.8 0 1 0 0-.01zM17 19a1.8 1.8 0 1 0 0-.01z',
  },
  {
    title: 'Construction, Real Estate & Design',
    sub: 'Property & project platforms',
    text: 'Delivered digital experiences supporting property, project management, collaboration, documentation, and customer workflows.',
    tone: '#7c4ddb',
    icon: 'M5 21V4l9-1v18M14 9l5 1.5V21M3 21h18M8 8h2M8 12h2M8 16h2M17 14h.01M17 17h.01',
  },
  {
    title: 'Retail & E-Commerce',
    sub: 'Commerce from storefront to checkout',
    text: 'Delivered storefronts and tested checkout, inventory, payments, orders, integrations, and high-traffic commerce experiences.',
    tone: '#e5384a',
    icon: 'M2 3h3l2.7 12.4a1.5 1.5 0 0 0 1.5 1.1h8.6a1.5 1.5 0 0 0 1.5-1.1L21 7H6M10 21a1 1 0 1 0 0-.01zM18 21a1 1 0 1 0 0-.01z',
  },
  {
    title: 'HR & Workforce',
    sub: 'People & performance platforms',
    text: 'Built and tested employee, performance review, feedback, goals, permissions, reporting, and workforce management workflows.',
    tone: '#14a98a',
    icon: 'M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 13a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM7 20v-1.5a5 5 0 0 1 10 0V20M1.5 19v-1a3.5 3.5 0 0 1 4-3.4M22.5 19v-1a3.5 3.5 0 0 0-4-3.4',
  },
] as const

const HERO_TITLE = 'Software that works, the first time.'
const HERO_LEAD =
  'Universal Technologies designs, builds, and rigorously tests software for businesses where performance, security, and reliability matter.'

// Everything the Export button writes into the PDF / Excel download.
const EXPORT_CONTENT: PortfolioExportContent = {
  title: HERO_TITLE,
  lead: HERO_LEAD,
  stages: DELIVERY_STAGES,
  engagements: INDUSTRY_CARDS.map((card) => ({ tag: card.title, title: card.sub, text: card.text })),
  services,
  industries: INDUSTRY_CARDS.map((card) => card.title),
  clients: clients.map((client) => ({ name: client.name, ...clientProfiles[client.name] })),
  product: {
    name: 'postit.ai',
    tagline: 'Your AI autopilot for content — trends, writing, visuals, and scheduling, in one place.',
    features: PRODUCT_FEATURES.map((feature) => feature.label),
    url: 'https://post-it.universal-technologies.com/dashboard',
  },
}

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
            {HERO_TITLE}
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
              <p className="pf-cv-lead">{HERO_LEAD}</p>
              <div className="hero-actions">
                <Link className="btn pf-cv-primary" to="/contact">
                  Start a project
                </Link>
                <a className="btn btn-ghost-ink" href="#work">
                  See our work
                </a>
                <ExportMenu content={EXPORT_CONTENT} />
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
        <div className="container pf-ind-wrap">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label pf-ind-label">Where we've delivered</p>
            <h2 className="section-title" id="portfolio-work-title">
              Experience across industries where reliability matters.
            </h2>
            <p className="section-lead">
              From healthcare and financial systems to commerce, workforce platforms, and mobility
              products, our teams have delivered and supported software across complex digital
              environments.
            </p>
          </motion.div>

          <motion.div className="pf-ind-grid" {...list}>
            {INDUSTRY_CARDS.map((card) => (
              <motion.article
                key={card.title}
                className="pf-ind-card"
                variants={item}
                style={{ '--tone': card.tone } as CSSProperties}
              >
                <span className="pf-ind-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={card.icon} />
                  </svg>
                </span>
                <div>
                  <h3>{card.title}</h3>
                  <strong>{card.sub}</strong>
                  <p>{card.text}</p>
                </div>
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
                postit.ai watches for what's trending in your industry, generates platform-ready
                posts in the right tone and format, creates stunning visuals, and organizes your
                weekly calendar — so your team stays consistent and your brand keeps growing.
              </p>
              <p>Accounts that post consistently with postit.ai see roughly 3.4x more impressions on average.</p>
              <a
                className="btn pf-cv-primary"
                href="https://post-it.universal-technologies.com/dashboard"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore postit.ai <span aria-hidden>→</span>
              </a>

              <motion.ul className="pf-product-features" {...list}>
                {PRODUCT_FEATURES.map((feature) => (
                  <motion.li key={feature.label} variants={item}>
                    <span className="pf-pf-icon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d={feature.icon} />
                      </svg>
                    </span>
                    {feature.label}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            <motion.div className="pf-product-visual" {...reveal}>
              <PostitDashboard />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="portfolio-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="portfolio-cta-title">Have a product to build, scale, or improve?</h2>
            <p>
              Tell us what you’re working on. We’ll bring the right mix of software engineering,
              AI, QA, cloud, and product expertise to move it forward.
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
