import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { AboutJourney } from '../components/AboutJourney'
import { companyFacts } from '../companyFacts'
import { PRIMARY_CTA, RESPONSE_PROMISE } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { companyValues } from '../pagesData'

const { metrics, leadership, timeline } = companyFacts

// Leadership section is commented out for now — flip back on when it's ready.
const SHOW_LEADERSHIP = false

const LEADER_PER_PAGE = 3
const leadershipPages = Array.from(
  { length: Math.ceil(leadership.length / LEADER_PER_PAGE) || 0 },
  (_, page) => leadership.slice(page * LEADER_PER_PAGE, page * LEADER_PER_PAGE + LEADER_PER_PAGE),
)

export default function About() {
  const { reveal, heroFollow, list, item, inView, reduceMotion, ease } = usePageMotion()
  const [activePage, setActivePage] = useState(0)
  // Set while the pointer/focus is on the slider so it stops rotating under the reader.
  const leaderPaused = useRef(false)

  useEffect(() => {
    if (reduceMotion || leadershipPages.length < 2) return undefined
    const id = window.setInterval(() => {
      if (leaderPaused.current) return
      setActivePage((current) => (current + 1) % leadershipPages.length)
    }, 4500)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const goToPage = (page: number) => {
    setActivePage((page + leadershipPages.length) % leadershipPages.length)
  }

  return (
    <div className="about-page">
      <Seo
        title={pageMetadata['/about'].title}
        description={pageMetadata['/about'].description}
        path="/about"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />

      <section className="section about-hero" aria-labelledby="about-title">
        <div className="container">
          <div className="about-hero-grid">
            <div>
              <motion.div className="section-head center" {...reveal}>
                <p className="section-label">About us</p>
                <h1 className="section-title" id="about-title">
                  We got tired of watching good ideas die in handoffs.
                </h1>
                <p className="section-lead">
                  Most software problems aren't technical, they're organizational: the designer
                  hands off to an engineer who hands off to a tester who hands off to an ops team,
                  and every handoff loses context. Universal Technologies exists to close that gap
                  — one team carries a project from the first sketch to production and stays close
                  to it after launch.
                </p>
              </motion.div>

              {metrics.length > 0 && (
                <motion.div className="stats-row" {...reveal}>
                  {metrics.map((metric) => (
                    <div key={metric.label}>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.div className="about-hero-visual" {...heroFollow}>
              <AboutJourney />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="values-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What we believe</p>
              <h2 className="section-title" id="values-title">
                What we hold every project to
              </h2>
            </div>
            <p className="section-lead">
              These are the standards a delivery lead checks each project against every sprint.
            </p>
          </motion.div>

          <motion.div className="engage-grid" {...list}>
            {companyValues.map((value) => (
              <motion.article key={value.step} className="engage-card" variants={item}>
                <span className="engage-mark">{value.step}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {timeline.length > 0 && (
        <section className="section" aria-labelledby="timeline-title">
          <div className="container">
            <motion.div className="section-head center" {...reveal}>
              <p className="section-label">Our story</p>
              <h2 className="section-title" id="timeline-title">
                How the team has evolved
              </h2>
            </motion.div>
            <div className="about-path">
              <motion.span
                className="about-path-spine"
                aria-hidden
                initial={reduceMotion ? false : { scaleY: 0 }}
                whileInView={reduceMotion ? undefined : { scaleY: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 1.1, ease }}
              />
              <ol className="about-timeline">
                {timeline.map((entry) => (
                  <motion.li key={`${entry.year}-${entry.text}`} {...reveal}>
                    <span className="about-timeline-marker">{entry.year}</span>
                    <div className="about-timeline-card">
                      <p>{entry.text}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {SHOW_LEADERSHIP && leadership.length > 0 && (
        <section className="section" aria-labelledby="leadership-title">
          <div className="container">
            <motion.div className="section-head center" {...reveal}>
              <p className="section-label">Leadership</p>
              <h2 className="section-title" id="leadership-title">
                The people accountable for delivery
              </h2>
              <p className="section-lead">
                The people a client can actually name when they ask who's accountable for their
                release.
              </p>
            </motion.div>

            <div
              className="leader-slider"
              onMouseEnter={() => {
                leaderPaused.current = true
              }}
              onMouseLeave={() => {
                leaderPaused.current = false
              }}
              onFocus={() => {
                leaderPaused.current = true
              }}
              onBlur={() => {
                leaderPaused.current = false
              }}
            >
              {leadershipPages.length > 1 && (
                <button
                  type="button"
                  className="leader-slider-arrow"
                  aria-label="Previous founders"
                  onClick={() => goToPage(activePage - 1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M15 5l-7 7 7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}

              <div className="leader-slider-viewport">
                <div
                  className="leader-slider-track"
                  style={{ transform: `translateX(-${activePage * 100}%)` }}
                >
                  {leadershipPages.map((page, pageIndex) => {
                    const isActivePage = pageIndex === activePage
                    return (
                      <div
                        key={pageIndex}
                        className="engage-grid leader-slide"
                        aria-hidden={isActivePage ? undefined : true}
                      >
                        {page.map((person) => (
                          <article key={person.name} className="engage-card">
                            {person.photo ? (
                              <img
                                className="leader-photo"
                                src={person.photo}
                                alt={`Portrait of ${person.name}`}
                                width={96}
                                height={96}
                                loading="lazy"
                                decoding="async"
                              />
                            ) : (
                              <span className="engage-mark">
                                {person.name
                                  .split(' ')
                                  .map((part) => part[0])
                                  .join('')}
                              </span>
                            )}
                            <em>{person.role}</em>
                            <h3>{person.name}</h3>
                            {person.location && (
                              <p className="product-audience">{person.location}</p>
                            )}
                            <p>{person.bio}</p>
                            <a
                              className="contact-email"
                              href={person.profileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={isActivePage ? undefined : -1}
                            >
                              Professional profile <span aria-hidden>↗</span>
                            </a>
                          </article>
                        ))}
                      </div>
                    )
                  })}
                </div>
              </div>

              {leadershipPages.length > 1 && (
                <button
                  type="button"
                  className="leader-slider-arrow"
                  aria-label="Next founders"
                  onClick={() => goToPage(activePage + 1)}
                >
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M9 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
            </div>

            {leadershipPages.length > 1 && (
              <div className="leader-dots" role="tablist" aria-label="Leadership pages">
                {leadershipPages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === activePage}
                    aria-label={`Show founders page ${index + 1}`}
                    className={index === activePage ? 'is-on' : undefined}
                    onClick={() => goToPage(index)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="cta-band" aria-labelledby="about-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="about-cta-title">Want to work with us?</h2>
            <p>Send a brief — a real person replies {RESPONSE_PROMISE}.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
