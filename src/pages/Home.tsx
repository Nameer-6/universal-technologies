import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollHero } from '../components/ScrollHero'
import { Seo } from '../components/Seo'
import { ClientLogoGrid } from '../components/ClientLogoGrid'
import { ContactForm } from '../components/ContactForm'
import { pageMetadata } from '../seoData'
import { CONTACT_EMAIL, engagements, howItWorks, outcomes, services } from '../data'
import { products } from '../pagesData'
import { resources } from '../resourcesData'

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

const featuredProducts = products.slice(0, 3)
const featuredGuides = resources.slice(0, 2)

const trustNotes = [
  {
    title: 'Tests before merge',
    text: 'Automation and exploratory testing sit on the critical path, not after the demo.',
  },
  {
    title: 'You own the work',
    text: 'Repositories, infrastructure, and documentation stay in your organisation from the first commit.',
  },
  {
    title: 'One delivery lead',
    text: 'A single owner across web, mobile, QA, and cloud — questions stop bouncing between vendors.',
  },
]

export default function Home() {
  const reduceMotion = Boolean(useReducedMotion())

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
    <>
      <Seo
        title={pageMetadata['/'].title}
        description={pageMetadata['/'].description}
        path="/"
      />

      <ScrollHero />

      <section className="section band clients" id="trust" aria-labelledby="clients-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Proof</p>
            <h2 className="section-title" id="clients-title">
              Teams we’ve worked with
            </h2>
          </motion.div>
          <ClientLogoGrid caption="Selected organizations and products our team has supported." />
        </div>
      </section>

      <section className="section services" id="services" aria-labelledby="services-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Capabilities</p>
              <h2 className="section-title" id="services-title">
                Six lines. One release team.
              </h2>
            </div>
            <p className="section-lead">
              Pick the lanes you need — we keep architecture, quality, and launch in the same
              conversation.
            </p>
          </motion.div>

          <motion.div
            className="service-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {services.map((service) => (
              <motion.article
                key={service.id}
                className="service-card"
                variants={reduceMotion ? undefined : fadeScale}
                transition={{ duration: 0.55, ease }}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <Link to={`/services/${service.id}`} className="service-card-link">
                  <div className="service-top">
                    <span>{service.mark}</span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.summary}</p>
                  <div className="stack-row">
                    {service.stacks.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <span className="card-affordance">
                    Explore {service.title} <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" id="work" aria-labelledby="work-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Work</p>
              <h2 className="section-title" id="work-title">
                How the roster is used in the real world
              </h2>
            </div>
            <p className="section-lead">
              Healthcare, telecom, logistics, and product teams — the industries where a missed
              release has a cost.
            </p>
          </motion.div>
          <motion.div className="work-teaser" {...reveal}>
            <p>
              Named case studies stay off this page until a client has signed off. The live roster,
              industries, and how we engage are on Work.
            </p>
            <Link className="btn btn-ghost-ink" to="/portfolio">
              See our work <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="section how" id="how" aria-labelledby="how-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">How it works</p>
            <h2 className="section-title" id="how-title">
              Align. Prioritize. Ship. Steady.
            </h2>
            <p className="section-lead">
              An operating rhythm for product work — not another vague “agile” slide.
            </p>
          </motion.div>

          <ol className="pf-process">
            {howItWorks.map((item) => (
              <motion.li key={item.step} {...reveal}>
                <span className="pf-process-index">{item.step}</span>
                <div>
                  <div className="pf-process-head">
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band" id="outcomes" aria-labelledby="outcomes-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">What changes</p>
              <h2 className="section-title" id="outcomes-title">
                Results you can feel in the next release
              </h2>
            </div>
            <p className="section-lead">
              Less coordination overhead. Clearer ownership. Software that stays operable after
              launch.
            </p>
          </motion.div>

          <motion.div
            className="outcome-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.25 }}
          >
            {outcomes.map((item, index) => (
              <motion.div
                key={item.title}
                className="outcome-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={reduceMotion ? undefined : { y: -6 }}
              >
                <span className="outcome-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" id="engage" aria-labelledby="engage-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Ways to engage</p>
            <h2 className="section-title" id="engage-title">
              Choose the shape that fits this quarter
            </h2>
            <p className="section-lead">
              Same standards either way — different staffing and ownership models.
            </p>
          </motion.div>

          <motion.div
            className="engage-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
          >
            {engagements.map((item) => (
              <motion.article
                key={item.step}
                className="engage-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <span className="engage-mark">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <em>{item.detail}</em>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" id="products" aria-labelledby="home-products-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Products</p>
              <h2 className="section-title" id="home-products-title">
                Tools we built, then kept running
              </h2>
            </div>
            <p className="section-lead">Internal accelerators used on client work, then productized.</p>
          </motion.div>
          <motion.div
            className="service-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {featuredProducts.map((product) => (
              <motion.article
                key={product.id}
                className="service-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <Link to={`/products/${product.id}`} className="service-card-link">
                  <p className="section-label">{product.status}</p>
                  <div className="service-top">
                    <span>{product.mark}</span>
                    <h3>{product.name}</h3>
                  </div>
                  <p>
                    <strong>{product.tagline}.</strong> {product.description}
                  </p>
                  <span className="card-affordance">
                    Explore product <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" id="trust-strip" aria-labelledby="trust-strip-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">How we reduce risk</p>
            <h2 className="section-title" id="trust-strip-title">
              Delivery habits you can inspect
            </h2>
          </motion.div>
          <motion.div
            className="outcome-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.25 }}
          >
            {trustNotes.map((item) => (
              <motion.article
                key={item.title}
                className="outcome-card"
                variants={reduceMotion ? undefined : fadeScale}
              >
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" id="insights" aria-labelledby="insights-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Insights</p>
              <h2 className="section-title" id="insights-title">
                Guides for the decision in front of you
              </h2>
            </div>
            <p className="section-lead">Short reading for teams choosing a partner or an engagement model.</p>
          </motion.div>
          <div className="service-grid">
            {featuredGuides.map((article) => (
              <article className="service-card" key={article.slug}>
                <Link className="service-card-link" to={`/resources/${article.slug}`}>
                  <p className="section-label">{article.category}</p>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="card-affordance">
                    Read the guide <span aria-hidden>→</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
            <h2 id="cta-title">Have a date on the calendar?</h2>
            <p>
              Bring the product, the constraint, and the deadline. We’ll map a delivery plan you
              can take to stakeholders the same week.
            </p>
          </motion.div>
          <a className="btn btn-light" href="#contact">
            Talk to our team <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <motion.div {...reveal}>
            <p className="section-label">Contact</p>
            <h2 className="section-title" id="contact-title">
              Talk to our team
            </h2>
            <p className="section-lead">
              Share context, timeline, and what “good” looks like. No pitch deck required.
            </p>
            <ol className="contact-next">
              <li>We review the brief.</li>
              <li>A delivery lead replies.</li>
              <li>If there’s a fit, we book a focused discovery call.</li>
            </ol>
            <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
