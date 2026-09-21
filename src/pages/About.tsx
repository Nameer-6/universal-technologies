import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { companyFacts } from '../companyFacts'
import { PRIMARY_CTA, RESPONSE_PROMISE } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { companyValues } from '../pagesData'

const { metrics, leadership, timeline } = companyFacts

export default function About() {
  const { reveal, list, item, inView } = usePageMotion()

  return (
    <>
      <Seo
        title={pageMetadata['/about'].title}
        description={pageMetadata['/about'].description}
        path="/about"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
      />

      <section className="section" aria-labelledby="about-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">About us</p>
            <h1 className="section-title" id="about-title">
              We got tired of watching good ideas die in handoffs.
            </h1>
            <p className="section-lead">
              Most software problems aren't technical, they're organizational: the designer hands
              off to an engineer who hands off to a tester who hands off to an ops team, and every
              handoff loses context. Universal Technologies exists to close that gap — one team
              carries a project from the first sketch to production and stays close to it after
              launch.
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
            <ol className="pf-process">
              {timeline.map((entry) => (
                <motion.li key={`${entry.year}-${entry.text}`} {...reveal}>
                  <span className="pf-process-index">{entry.year}</span>
                  <div>
                    <p>{entry.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {leadership.length > 0 && (
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

            <motion.div className="engage-grid" {...list}>
              {leadership.map((person) => (
                <motion.article key={person.name} className="engage-card" variants={item}>
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
                  {person.location && <p className="product-audience">{person.location}</p>}
                  <p>{person.bio}</p>
                  <a
                    className="contact-email"
                    href={person.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Professional profile <span aria-hidden>↗</span>
                  </a>
                </motion.article>
              ))}
            </motion.div>
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
    </>
  )
}
