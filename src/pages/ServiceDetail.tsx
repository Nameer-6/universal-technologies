import { motion, useReducedMotion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo, SITE_URL } from '../components/Seo'
import { Sparkline } from '../components/Sparkline'
import { TypedCode } from '../components/CodeTyper'
import { RELATED_SERVICES } from '../components/ServiceFlow'
import { pageMetadata } from '../seoData'
import { serviceContent } from '../serviceContent'
import { PRIMARY_CTA, outcomes as sharedOutcomes, serviceDetails, services } from '../data'

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

  const related = (RELATED_SERVICES[service.id] ?? [])
    .map((relatedId) => services.find((item) => item.id === relatedId))
    .filter((item): item is (typeof services)[number] => Boolean(item))
  const content = serviceContent[service.id]
  const outcomes = content?.outcomes ?? sharedOutcomes
  const meta = pageMetadata[`/services/${service.id}`]

  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.28 },
        variants: fadeUp,
        transition: { duration: 0.7, ease },
      }

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: service.title,
      name: service.title,
      description: service.summary,
      provider: {
        '@type': 'Organization',
        name: 'Universal Technologies',
        url: SITE_URL,
      },
    },
  ]

  if (content) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: content.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    })
  }

  return (
    <div className="svc-page">
      <Seo
        title={meta.title}
        description={meta.description}
        path={`/services/${service.id}`}
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.id}` },
        ]}
      />

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
            {content && <p className="svc-hero-subtitle">{content.opener}</p>}
            <div className="svc-hero-cta">
              <Link className="btn btn-svc-primary" to="/contact">
                {PRIMARY_CTA} <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-ghost-ink" href="#capabilities">
                See how we deliver
              </a>
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
                    <p className="svc-console-side-label">Sample metric</p>
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
            <p className="svc-console-caption">
              Illustrative example of a delivery environment. Figures shown are representative,
              not client or production data.
            </p>
          </div>
        </div>
      </section>

      <section
        className="svc-section svc-band-alt"
        id="capabilities"
        aria-labelledby="service-capabilities-title"
      >
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">What's included</p>
            <h2 className="svc-title" id="service-capabilities-title">
              {service.title}, broken down
            </h2>
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

      <section className="svc-section" aria-labelledby="service-outcomes-title">
        <div className="container">
          <motion.div className="svc-head svc-head-center" {...reveal}>
            <p className="svc-eyebrow">Outcomes</p>
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="svc-section svc-band-alt" aria-labelledby="service-related-title">
          <div className="container">
            <motion.div className="svc-head svc-head-center" {...reveal}>
              <p className="svc-eyebrow">Explore more</p>
              <h2 className="svc-title" id="service-related-title">
                Related service lines
              </h2>
            </motion.div>

            <div className="svc-related-grid">
              {related.map((item) => (
                <Link key={item.id} className="svc-related-card" to={`/services/${item.id}`}>
                  <span>{item.mark}</span>
                  <strong>{item.title}</strong>
                  <em aria-hidden>→</em>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {content && (
        <section className="svc-section svc-faq-section" aria-labelledby="service-faq-title">
          <div className="container">
            <motion.div className="svc-head svc-head-center" {...reveal}>
              <p className="svc-eyebrow">FAQ</p>
              <h2 className="svc-title" id="service-faq-title">
                Common questions
              </h2>
            </motion.div>

            <div className="svc-faq">
              {content.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

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
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
