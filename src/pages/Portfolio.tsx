import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ClientLogoGrid } from '../components/ClientLogoGrid'
import { clients, services } from '../data'
import { pageMetadata } from '../seoData'
import {
  caseStudies,
  clientAsks,
  clientProfiles,
  clientsCaption,
  credentials,
  differentiators,
  engagementModels,
  industries,
  industriesLead,
  portfolioClosing,
  portfolioHero,
  portfolioStats,
  processLead,
  servicesLead,
  team,
  techLayers,
  techLead,
  testimonials,
  whoWeAre,
  workStages,
} from '../portfolioData'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
}

const roster = new Set(clients.map((client) => client.name))
const namedIndustries = industries
  .map((industry) => ({
    ...industry,
    proof: industry.proof.filter((name) => roster.has(name)),
  }))
  .filter((industry) => industry.proof.length > 0)
const profiledClients = clients.flatMap((client) => {
  const profile = clientProfiles[client.name]
  return profile ? [{ ...client, ...profile }] : []
})

export default function Portfolio() {
  const reduceMotion = Boolean(useReducedMotion())
  const mount = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease },
      }
  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.05 },
        variants: fadeUp,
      }
  const listReveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.05 },
        variants: stagger,
      }

  return (
    <div className="pf-page">
      <Seo
        title={pageMetadata['/portfolio'].title}
        description={pageMetadata['/portfolio'].description}
        path="/portfolio"
      />

      <section className="section pf-hero" aria-labelledby="portfolio-title">
        <div className="container pf-hero-grid">
          <motion.div {...mount}>
            <p className="section-label">Portfolio</p>
            <h1 className="section-title" id="portfolio-title">
              {portfolioHero.title}
            </h1>
            <p className="section-lead">{portfolioHero.lead}</p>
            <div className="hero-actions">
              <Link className="btn btn-ink pf-hero-cta" to="/contact">
                Talk to our team <span aria-hidden>→</span>
              </Link>
              <a className="btn btn-ghost-ink" href="#clients">
                See the roster
              </a>
            </div>
          </motion.div>
          <motion.blockquote
            className="pf-hero-aside"
            {...(reduceMotion
              ? {}
              : {
                  initial: { opacity: 0, y: 22 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 0.12, ease },
                })}
          >
            <p className="section-label">How we stay on the work</p>
            <p>{whoWeAre[2]}</p>
          </motion.blockquote>
        </div>

        {portfolioStats.length > 0 && (
          <div className="container">
            <motion.div className="stats-row pf-stats" {...reveal}>
              {portfolioStats.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </section>

      <section className="section band clients" id="clients" aria-labelledby="portfolio-clients-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Our clients</p>
              <h2 className="section-title" id="portfolio-clients-title">
                Teams we've worked with
              </h2>
            </div>
            <p className="section-lead">{clientsCaption}</p>
          </motion.div>

          <ClientLogoGrid />

          {profiledClients.length > 0 && (
            <motion.div className="pf-directory-wrap" {...reveal}>
              <table className="pf-directory">
                <caption className="pf-caption">Named organizations, with public context only</caption>
                <thead>
                  <tr>
                    <th scope="col">Organization</th>
                    <th scope="col">Focus</th>
                    <th scope="col">What they do</th>
                  </tr>
                </thead>
                <tbody>
                  {profiledClients.map((client) => (
                    <tr key={client.name}>
                      <th scope="row">{client.name}</th>
                      <td>
                        {client.country}
                        <span> · {client.industry}</span>
                      </td>
                      <td>{client.does}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </div>
      </section>

      {caseStudies.length > 0 && (
        <section className="section" aria-labelledby="portfolio-studies-title">
          <div className="container">
            <motion.div className="section-head split" {...reveal}>
              <div>
                <p className="section-label">Featured work</p>
                <h2 className="section-title" id="portfolio-studies-title">
                  Case studies
                </h2>
              </div>
              <p className="section-lead">
                Challenge, approach, what we built, and a before-and-after number.
              </p>
            </motion.div>

            <div className="pf-studies">
              {caseStudies.map((study) => (
                <motion.article key={study.id} className="pf-study" id={study.id} {...reveal}>
                  <p className="section-label">{study.kind}</p>
                  <h3>{study.title}</h3>
                  <p className="pf-study-meta">
                    {study.industry} · {study.duration} · {study.team}
                  </p>
                  <div className="stack-row">
                    {study.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <dl className="pf-study-body">
                    <div>
                      <dt>Challenge</dt>
                      <dd>{study.challenge}</dd>
                    </div>
                    <div>
                      <dt>Approach</dt>
                      <dd>{study.approach}</dd>
                    </div>
                    <div>
                      <dt>What we built</dt>
                      <dd>{study.built}</dd>
                    </div>
                  </dl>
                  <ul className="pf-results">
                    {study.results.map((result) => (
                      <li key={result}>{result}</li>
                    ))}
                  </ul>
                  {study.quote && (
                    <blockquote className="pf-quote">
                      <p>{study.quote.text}</p>
                      <cite>
                        {study.quote.name}, {study.quote.role}, {study.quote.company}
                      </cite>
                    </blockquote>
                  )}
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="portfolio-services-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What we do</p>
              <h2 className="section-title" id="portfolio-services-title">
                Six lines. One release team.
              </h2>
            </div>
            <p className="section-lead">{servicesLead}</p>
          </motion.div>

          <motion.ol className="pf-lanes" {...listReveal}>
            {services.map((service) => (
              <motion.li key={service.id} variants={reduceMotion ? undefined : fadeUp}>
                <Link to={`/services/${service.id}`}>
                  <span>{service.mark}</span>
                  <div>
                    <strong>
                      {service.title} <em aria-hidden>→</em>
                    </strong>
                    <p>{service.summary}</p>
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section band" aria-labelledby="portfolio-process-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">How we work</p>
              <h2 className="section-title" id="portfolio-process-title">
                Discovery through support
              </h2>
            </div>
            <p className="section-lead">{processLead}</p>
          </motion.div>

          <motion.ol className="pf-process" {...listReveal}>
            {workStages.map((stage) => (
              <motion.li key={stage.step} variants={reduceMotion ? undefined : fadeUp}>
                <span className="pf-process-index">{stage.step}</span>
                <div>
                  <div className="pf-process-head">
                    <h3>{stage.title}</h3>
                    <span>{stage.timing}</span>
                  </div>
                  <p>{stage.text}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

          <motion.div className="pf-asks" {...reveal}>
            <h3>What we ask of you</h3>
            <ul>
              {clientAsks.map((ask) => (
                <li key={ask}>{ask}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="portfolio-engage-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Engagement models</p>
              <h2 className="section-title" id="portfolio-engage-title">
                Four ways to work with us
              </h2>
            </div>
            <p className="section-lead">
              The right model depends on how well-defined the work is and how much of it your own
              team will carry.
            </p>
          </motion.div>

          <div className="pf-models">
            <div className="pf-models-head" aria-hidden>
              <span>Model</span>
              <span>Best when</span>
              <span>Commercials</span>
            </div>
            {engagementModels.map((model) => (
              <motion.article key={model.name} {...reveal}>
                <h3>{model.name}</h3>
                <p>{model.bestWhen}</p>
                <em>{model.commercials}</em>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="portfolio-industries-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Industries</p>
              <h2 className="section-title" id="portfolio-industries-title">
                Where failure has a cost
              </h2>
            </div>
            <p className="section-lead">{industriesLead}</p>
          </motion.div>

          <motion.ul className="pf-industries" {...listReveal}>
            {namedIndustries.map((industry) => (
              <motion.li key={industry.name} variants={reduceMotion ? undefined : fadeUp}>
                <h3>{industry.name}</h3>
                <p>{industry.problem}</p>
                <div className="stack-row">
                  {industry.proof.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section" aria-labelledby="portfolio-tech-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Technology</p>
              <h2 className="section-title" id="portfolio-tech-title">
                Deliberately boring about the stack
              </h2>
            </div>
            <p className="section-lead">{techLead}</p>
          </motion.div>

          <motion.div className="pf-tech" {...reveal}>
            {techLayers.map((row) => (
              <div key={row.layer} className="pf-tech-row">
                <strong>{row.layer}</strong>
                <div className="stack-row">
                  {row.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="section band" aria-labelledby="portfolio-quotes-title">
          <div className="container">
            <motion.div className="section-head center" {...reveal}>
              <p className="section-label">What clients say</p>
              <h2 className="section-title" id="portfolio-quotes-title">
                The before, the after, and a human note
              </h2>
            </motion.div>

            <motion.div className="pf-quotes" {...listReveal}>
              {testimonials.map((quote) => (
                <motion.blockquote
                  key={`${quote.name}-${quote.company}`}
                  className="pf-quote"
                  variants={reduceMotion ? undefined : fadeUp}
                >
                  <p>{quote.text}</p>
                  <cite>
                    {quote.name}, {quote.role}, {quote.company}
                  </cite>
                </motion.blockquote>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {team.length > 0 && (
        <section className="section" aria-labelledby="portfolio-team-title">
          <div className="container">
            <motion.div className="section-head center" {...reveal}>
              <p className="section-label">The team</p>
              <h2 className="section-title" id="portfolio-team-title">
                The people accountable for delivery
              </h2>
            </motion.div>

            <motion.div className="engage-grid" {...listReveal}>
              {team.map((person) => (
                <motion.article
                  key={person.name}
                  className="engage-card"
                  variants={reduceMotion ? undefined : fadeUp}
                >
                  {person.photo ? (
                    <img className="pf-headshot" src={person.photo} alt={person.name} />
                  ) : (
                    <span className="engage-mark">
                      {person.name
                        .split(' ')
                        .filter(Boolean)
                        .map((part) => part[0])
                        .join('')}
                    </span>
                  )}
                  <h3>{person.name}</h3>
                  <em>{person.role}</em>
                  <p>{person.bio}</p>
                  {person.linkedin && (
                    <a href={person.linkedin} rel="noreferrer" target="_blank">
                      LinkedIn
                    </a>
                  )}
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="section band" aria-labelledby="portfolio-why-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Why Universal Technologies</p>
              <h2 className="section-title" id="portfolio-why-title">
                Questions we get on a first call
              </h2>
            </div>
            <p className="section-lead">
              Each one is written as an answer to a doubt a prospect already has — not as a
              slogan a competitor could copy.
            </p>
          </motion.div>

          <motion.div className="pf-why" {...listReveal}>
            {differentiators.map((item) => (
              <motion.article key={item.question} variants={reduceMotion ? undefined : fadeUp}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {credentials.length > 0 && (
        <section className="section" aria-labelledby="portfolio-credentials-title">
          <div className="container">
            <motion.div className="section-head center" {...reveal}>
              <p className="section-label">Credentials</p>
              <h2 className="section-title" id="portfolio-credentials-title">
                Only what we actually hold
              </h2>
            </motion.div>

            <motion.div className="pf-credentials" {...listReveal}>
              {credentials.map((group) => (
                <motion.article
                  key={group.title}
                  className="engage-card"
                  variants={reduceMotion ? undefined : fadeUp}
                >
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        {item.name}
                        {item.detail ? ` — ${item.detail}` : ''}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <section className="cta-band" aria-labelledby="portfolio-cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="portfolio-cta-title">{portfolioClosing.title}</h2>
            <p>{portfolioClosing.text}</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Talk to our team <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
