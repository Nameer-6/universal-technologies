import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ScrollHero } from '../components/ScrollHero'
import { BackboneLive } from '../components/BackboneLive'
import { Seo } from '../components/Seo'
import { ClientMarquee } from '../components/ClientMarquee'
import { ContactForm } from '../components/ContactForm'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { CONTACT_EMAIL, PRIMARY_CTA } from '../data'
import { resources } from '../resourcesData'
import { ResourceCard } from '../components/ResourceCard'
import { SocialLinks } from '../components/SocialLinks'
import { ServiceBento } from '../components/ServiceBento'
import { EngageSection, GatesSection, OutcomesSection, ProductsSection } from '../components/HomeSections'

// One guide each from AI, DevOps and SaaS so the homepage shows the range.
const featuredGuides = ['ai-agent-vs-workflow-automation', 'ci-cd-pipeline-checklist', 'planning-a-saas-mvp']
  .map((slug) => resources.find((article) => article.slug === slug))
  .filter((article) => article !== undefined)

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
  const { reveal, list, item: itemVariants, inView } = usePageMotion()

  return (
    <>
      <Seo
        title={pageMetadata['/'].title}
        description={pageMetadata['/'].description}
        path="/"
      />

      <ScrollHero />

      <BackboneLive />

      <section className="section band clients" id="trust" aria-labelledby="clients-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Proof</p>
            <h2 className="section-title" id="clients-title">
              Teams we’ve worked with
            </h2>
          </motion.div>
          <ClientMarquee />
        </div>
      </section>

      <section className="section hx-section services" id="services" aria-labelledby="services-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Capabilities</p>
            <h2 className="section-title hx-duo" id="services-title">
              Six lines. <span>One release team.</span>
            </h2>
            <p className="section-lead">
              Pick the lanes you need — we keep architecture, quality, and launch in the same
              conversation.
            </p>
          </motion.div>

          <ServiceBento />
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

      <GatesSection />

      <OutcomesSection />

      <EngageSection />

      <ProductsSection />

      <section className="section hx-section hx-checks" id="trust-strip" aria-labelledby="trust-strip-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">How we reduce risk</p>
            <h2 className="section-title hx-duo" id="trust-strip-title">
              Delivery habits <span>you can inspect.</span>
            </h2>
          </motion.div>
          <motion.div className="outcome-grid" {...list}>
            {trustNotes.map((note) => (
              <motion.article
                key={note.title}
                className="outcome-card"
                variants={itemVariants}
              >
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </motion.article>
            ))}
          </motion.div>
          <SocialLinks className="trust-social" />
          <p className="trust-more">
            <Link className="contact-email" to="/security">
              How we handle ownership, access, and data <span aria-hidden>→</span>
            </Link>
          </p>
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
            <p className="section-lead">
              Practical guides on AI agents, automation, QA, DevOps, SaaS and delivery planning,
              written by the team that does the work.
            </p>
          </motion.div>
          <div className="resource-grid resource-grid-3">
            {featuredGuides.map((article) => (
              <ResourceCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="section-more">
            <Link className="btn btn-ghost-ink" to="/resources">
              See all {resources.length} guides <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="cta-title">Have a product to build, scale, or improve?</h2>
            <p>
              Tell us what you’re working on. We’ll bring the right mix of software engineering,
              AI, QA, cloud, and product expertise to move it forward.
            </p>
          </motion.div>
          <a className="btn btn-light" href="#contact">
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </a>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <motion.div {...reveal}>
            <p className="section-label">Contact</p>
            <h2 className="section-title" id="contact-title">
              {PRIMARY_CTA}
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
          <motion.div {...inView}>
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </>
  )
}
