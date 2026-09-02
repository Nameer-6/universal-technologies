import { useEffect, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Sparkline } from '../components/Sparkline'
import { howItWorks, outcomes, serviceDetails, services } from '../data'

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

const CODE_TOKEN_RE =
  /(\/\/.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(import|from|export|const|let|async|await|return|function|resource|type|test)\b|\b([A-Za-z_][A-Za-z0-9_]*)(?=\()/g

function highlightCode(code: string): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  CODE_TOKEN_RE.lastIndex = 0
  while ((match = CODE_TOKEN_RE.exec(code))) {
    if (match.index > lastIndex) nodes.push(code.slice(lastIndex, match.index))
    const [full, comment, str, kw, fn] = match
    if (comment) nodes.push(
      <span key={key++} className="tok-com">
        {comment}
      </span>,
    )
    else if (str) nodes.push(
      <span key={key++} className="tok-str">
        {str}
      </span>,
    )
    else if (kw) nodes.push(
      <span key={key++} className="tok-kw">
        {kw}
      </span>,
    )
    else if (fn) nodes.push(
      <span key={key++} className="tok-fn">
        {fn}
      </span>,
    )
    lastIndex = match.index + full.length
  }
  if (lastIndex < code.length) nodes.push(code.slice(lastIndex))
  return nodes
}

type TypedLine = { number: number; visible: string; isCurrent: boolean }

function splitTyped(code: string, length: number): TypedLine[] {
  const lines = code.split('\n')
  let consumed = 0
  return lines.map((line, i) => {
    const lineLen = line.length
    let visible = ''
    if (consumed < length) {
      visible = consumed + lineLen <= length ? line : line.slice(0, length - consumed)
    }
    const isCurrent = consumed < length && consumed + lineLen >= length
    consumed += lineLen + 1
    return { number: i + 1, visible, isCurrent }
  })
}

function TypedCode({ code }: { code: string }) {
  const reduceMotion = Boolean(useReducedMotion())
  const [length, setLength] = useState(reduceMotion ? code.length : 0)

  useEffect(() => {
    if (reduceMotion) {
      setLength(code.length)
      return
    }

    const TYPE_SPEED = 38 // ms per character — slow, readable typewriter pace
    const HOLD_AT_END = 2600 // ms to hold the finished snippet before looping
    const PAUSE_BEFORE_RETYPE = 500

    let cancelled = false
    let timeoutId: number

    const typeFrom = (from: number) => {
      if (cancelled) return
      if (from >= code.length) {
        setLength(code.length)
        timeoutId = window.setTimeout(() => {
          if (cancelled) return
          setLength(0)
          timeoutId = window.setTimeout(() => typeFrom(0), PAUSE_BEFORE_RETYPE)
        }, HOLD_AT_END)
        return
      }
      setLength(from + 1)
      timeoutId = window.setTimeout(() => typeFrom(from + 1), TYPE_SPEED)
    }

    setLength(0)
    timeoutId = window.setTimeout(() => typeFrom(0), PAUSE_BEFORE_RETYPE)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [code, reduceMotion])

  return (
    <div className="svc-console-code">
      {splitTyped(code, length).map((line) => (
        <div className="svc-console-line" key={line.number}>
          <span className="svc-console-line-num">{line.number}</span>
          <span className="svc-console-line-content">
            {highlightCode(line.visible)}
            {line.isCurrent && <span className="svc-console-caret" aria-hidden />}
          </span>
        </div>
      ))}
    </div>
  )
}

function DevicePreview() {
  return (
    <div className="svc-phone" aria-hidden>
      <div className="svc-phone-notch" />
      <div className="svc-phone-screen">
        <div className="svc-phone-statusbar">
          <span>9:41</span>
          <span className="svc-phone-signal" />
        </div>
        <div className="svc-phone-card">
          <span className="svc-phone-skel svc-phone-skel-title" />
          <span className="svc-phone-skel" />
          <span className="svc-phone-skel svc-phone-skel-short" />
        </div>
        <div className="svc-phone-card">
          <span className="svc-phone-skel svc-phone-skel-title" />
          <span className="svc-phone-skel" />
        </div>
        <div className="svc-phone-tabbar">
          <span className="is-active" />
          <span />
          <span />
        </div>
      </div>
      <div className="svc-phone-status">
        <i />
        Building…
      </div>
    </div>
  )
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>()
  const reduceMotion = Boolean(useReducedMotion())

  const service = services.find((item) => item.id === id)
  const detail = id ? serviceDetails[id] : undefined

  if (!service || !detail) {
    return <Navigate to="/services" replace />
  }

  const otherServices = services.filter((item) => item.id !== service.id)

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
      <section className="svc-section svc-hero" aria-labelledby="service-detail-title">
        <div className="container">
          <motion.div
            className="svc-hero-inner"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <h1 className="svc-hero-title" id="service-detail-title">
              {service.title}
            </h1>
            <p className="svc-hero-subtitle">{service.summary}</p>
            <div className="svc-hero-cta">
              <Link className="btn btn-svc-primary" to="/contact">
                Start free audit <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          <div className="svc-console-wrap">
            <motion.div
              key={service.id}
              className="svc-console"
              initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
            >
              <div className="svc-console-bar">
                <span className="svc-console-dots">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="svc-console-bar-label">{detail.console.repo}</span>
                <span className="svc-console-bar-status">
                  <span className="svc-console-pill is-good">
                    <i aria-hidden />
                    Passed
                  </span>
                  <span className="svc-console-pill">{detail.console.version}</span>
                </span>
              </div>

              <div className="svc-console-body">
                <div className="svc-console-files" aria-hidden>
                  <div>
                    <p className="svc-console-files-label">Explorer</p>
                    {detail.console.files.map((file) => {
                      const isFolder = file.endsWith('/')
                      const isActive = !isFolder && file === detail.console.files[1]
                      return (
                        <div
                          key={file}
                          className={`svc-console-file${isFolder ? '' : ' is-nested'}${
                            isActive ? ' is-active' : ''
                          }`}
                        >
                          <span className="svc-console-file-icon" />
                          {file}
                        </div>
                      )
                    })}
                  </div>
                  <div className="svc-console-active-card">
                    <p>Active projects</p>
                    <strong>{detail.console.activeCount}</strong>
                    <em>{detail.console.activeDelta}</em>
                  </div>
                </div>

                <div
                  className={`svc-console-main${detail.console.devicePreview ? ' has-preview' : ''}`}
                >
                  <div className="svc-console-code-pane">
                    <div className="svc-console-tabs" aria-hidden>
                      <span className="svc-console-tab is-active">
                        {detail.console.files[1]}
                      </span>
                      <span className="svc-console-tab">
                        {detail.console.files[detail.console.files.length - 1]}
                      </span>
                    </div>
                    <TypedCode code={detail.console.snippet} />
                  </div>
                  {detail.console.devicePreview && <DevicePreview />}
                </div>

                <div className="svc-console-side" aria-hidden>
                  <div className="svc-console-side-section">
                    <p className="svc-console-side-label">Pipeline</p>
                    <div className="svc-console-progress">
                      <span />
                    </div>
                    <div className="svc-console-build-row">
                      <span>{detail.console.build}</span>
                      <strong>Passed</strong>
                    </div>
                  </div>
                  <div className="svc-console-side-section">
                    <p className="svc-console-side-label">Live metric</p>
                    <Sparkline />
                    <p className="svc-console-metric">
                      <strong>{detail.console.latency}</strong> · {detail.console.uptime}
                    </p>
                  </div>
                  <div className="svc-console-side-section">
                    <p className="svc-console-side-label">Services</p>
                    <div className="svc-console-services">
                      {detail.console.services.map((svc) => (
                        <div className="svc-console-services-row" key={svc.name}>
                          <i aria-hidden />
                          <span>{svc.name}</span>
                          <span>{svc.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="svc-console-side-section">
                    <p className="svc-console-side-label">Activity</p>
                    <div className="svc-console-activity">
                      {detail.console.activity.map((line) => (
                        <span key={line}>· {line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="svc-console-status-bar" aria-hidden>
                <span className="svc-console-status-bar-left">
                  <i />
                  <span>edge · global</span>
                  <span className="svc-console-status-bar-divider">|</span>
                  <span>rollout 100%</span>
                </span>
                <span className="svc-console-status-bar-right">deployment healthy</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" aria-labelledby="service-capabilities-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">What's included</p>
            <h2 className="svc-title" id="service-capabilities-title">
              {service.title}, broken down
            </h2>
            <p className="svc-lede">
              From new products to existing platforms — we build, improve, and evolve what you
              already run.
            </p>
          </motion.div>

          <motion.div
            className="svc-cap-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {detail.capabilities.map((item) => (
              <motion.div
                key={item.title}
                className="svc-cap-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <span className="svc-cap-tag">{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="service-value-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Why it works</p>
            <h2 className="svc-title" id="service-value-title">
              Built around your product, not a template
            </h2>
          </motion.div>

          <div className="svc-value">
            {detail.valueProps.map((item, index) => (
              <motion.article
                key={item.title}
                className={`svc-value-row${index % 2 === 1 ? ' flip' : ''}`}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: index % 2 === 1 ? 48 : -48, y: 16 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="svc-value-copy">
                  <span className="svc-value-step">0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <div className="svc-value-rail" aria-hidden>
                  0{index + 1}
                </div>
                <div className="svc-value-panel">
                  {item.cards.map((card) => (
                    <div key={card.label}>
                      <strong>{card.label}</strong>
                      <span>{card.detail}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" aria-labelledby="service-process-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">How it works</p>
            <h2 className="svc-title" id="service-process-title">
              Same process, every service line
            </h2>
            <p className="svc-lede">
              Align, prioritize, ship, steady — the rhythm doesn't change with the engagement.
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

      <section className="svc-section" aria-labelledby="service-outcomes-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Outcomes, not activity</p>
            <h2 className="svc-title" id="service-outcomes-title">
              What changes when we run this line
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
                <Link className="svc-outcome-link" to="/contact">
                  Learn more <span aria-hidden>→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="svc-section svc-band-alt" aria-labelledby="service-related-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Explore more</p>
            <h2 className="svc-title" id="service-related-title">
              Other service lines
            </h2>
          </motion.div>

          <div className="svc-related-grid">
            {otherServices.map((item) => (
              <Link key={item.id} className="svc-related-card" to={`/services/${item.id}`}>
                <span>{item.mark}</span>
                <strong>{item.title}</strong>
                <em aria-hidden>→</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="service-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="service-cta-title">
              Ready to build or improve your {service.title.toLowerCase()}?
            </h2>
            <p>Tell us the constraint and the deadline — we'll map the smallest team that ships it.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Book a free consultation <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
