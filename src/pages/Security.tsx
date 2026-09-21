import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { companyFacts } from '../companyFacts'
import { CONTACT_EMAIL, PRIMARY_CTA } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'

/**
 * Only statements that are already made elsewhere on this site (Home, service FAQs,
 * Privacy Policy) belong here. Add a practice, control, or certification only after the
 * business owner has verified it, and record it in docs/claims-register.md.
 */
const ownership = [
  {
    title: 'You own the work',
    text: 'Repositories, infrastructure, and documentation stay in your organisation from the first commit. Ownership, repository access, hosting accounts, and handoff responsibilities are defined in the engagement agreement before development begins.',
  },
  {
    title: 'Quality gates before merge',
    text: 'Automation and exploratory testing sit on the critical path: automated checks run in CI, so regressions surface before release instead of in production.',
  },
  {
    title: 'A handoff your team can run',
    text: 'Runbooks, environments, monitoring, and the next backlog are part of the scope, so your engineers can operate what we build.',
  },
]

const aiControls = [
  {
    title: 'Tool permissions',
    text: 'What an agent may read and call is defined during scoping, not discovered after launch.',
  },
  {
    title: 'Human approval',
    text: 'Approval steps and fallback paths keep consequential actions with a person.',
  },
  {
    title: 'Data handling in writing',
    text: 'Which model provider and deployment option is used, its retention and training terms, and what personal or sensitive data may reach a model are agreed before build.',
  },
  {
    title: 'Evaluation and monitoring',
    text: 'Evaluation criteria are checked before release. Monitoring on failures, latency, and cost supports review after launch.',
  },
]

const procurement = [
  {
    title: 'NDA before you share detail',
    text: 'If you need an NDA in place first, say so in your brief and we will agree the paperwork before sensitive material changes hands.',
  },
  {
    title: 'Vendor and security questionnaires',
    text: 'Send your questionnaire with your brief. We will confirm what we can answer and how.',
  },
  {
    title: 'Contracting details',
    text: 'Ownership, access, and support responsibilities are set out in the engagement agreement for each project.',
  },
]

export default function Security() {
  const { reveal, list, item, inView } = usePageMotion()
  const { certifications } = companyFacts

  return (
    <>
      <Seo
        title={pageMetadata['/security'].title}
        description={pageMetadata['/security'].description}
        path="/security"
        breadcrumbs={[{ name: 'Security & Trust', path: '/security' }]}
      />

      <section className="section" aria-labelledby="security-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Security &amp; Trust</p>
            <h1 className="section-title" id="security-title">
              How we handle your code, access, and data.
            </h1>
            <p className="section-lead">
              What you can expect from a Universal Technologies engagement, and how to get what
              your procurement or security team needs. We only describe practices here that we can
              stand behind.
            </p>
          </motion.div>

          <motion.div className="outcome-grid" {...list}>
            {ownership.map((note) => (
              <motion.article key={note.title} className="outcome-card" variants={item}>
                <h2 className="sec-card-title">{note.title}</h2>
                <p>{note.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section band" aria-labelledby="security-ai-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">AI projects</p>
              <h2 className="section-title" id="security-ai-title">
                Controls we settle before an agent ships
              </h2>
            </div>
            <p className="section-lead">
              Enterprise AI work stalls when data handling is unclear. These points are agreed in
              scoping, in writing.
            </p>
          </motion.div>
          <motion.div className="engage-grid sec-grid-4" {...list}>
            {aiControls.map((control, index) => (
              <motion.article key={control.title} className="engage-card" variants={item}>
                <span className="engage-mark">0{index + 1}</span>
                <h3>{control.title}</h3>
                <p>{control.text}</p>
              </motion.article>
            ))}
          </motion.div>
          <p className="sec-more">
            <Link className="contact-email" to="/services/ai-agents">
              See the AI Agents service <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="security-site-title">
        <div className="container">
          <div className="legal-doc sec-site">
            <p className="section-label">This website</p>
            <h2 id="security-site-title">What this site collects</h2>
            <ul>
              <li>No tracking cookies, advertising pixels, or third-party analytics scripts.</li>
              <li>Fonts are served from this site, not a third party.</li>
              <li>
                The contact and job-application forms deliver by email through FormSubmit, a
                third-party form-delivery service. Details, including retention, are in our{' '}
                <Link to="/privacy-policy">Privacy Policy</Link>.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="security-procurement-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Enterprise procurement</p>
            <h2 className="section-title" id="security-procurement-title">
              Getting through vendor onboarding
            </h2>
          </motion.div>
          <motion.div className="engage-grid" {...list}>
            {procurement.map((step, index) => (
              <motion.article key={step.title} className="engage-card" variants={item}>
                <span className="engage-mark">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </motion.div>

          <div className="legal-doc sec-site">
            {certifications.length > 0 ? (
              <>
                <h3>Certifications and attestations</h3>
                <ul>
                  {certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>
                Certifications and audit reports are not listed on this page. If your procurement
                requires a specific attestation, ask and we will answer directly.
              </p>
            )}
            <p>
              To report a security concern, email{' '}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Security%20concern`}>{CONTACT_EMAIL}</a>{' '}
              with the details.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="security-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="security-cta-title">Have a security or procurement question?</h2>
            <p>Put it in your brief and a delivery lead will pick it up from there.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            {PRIMARY_CTA} <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
