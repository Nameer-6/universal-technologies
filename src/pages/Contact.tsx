import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { BookCallWizard } from '../components/BookCallWizard'
import { CONTACT_EMAIL, RESPONSE_PROMISE } from '../data'
import { companyFacts } from '../companyFacts'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'

const { headquarters, offices } = companyFacts

export default function Contact() {
  const { hero, heroFollow } = usePageMotion()

  return (
    <>
      <Seo
        title={pageMetadata['/contact'].title}
        description={pageMetadata['/contact'].description}
        path="/contact"
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
      />

      <section className="bc-stage" aria-labelledby="contact-title">
        <div className="bc-wrap">
          <motion.div className="bc-head" {...hero}>
            <h1 id="contact-title">Book a call with Universal Technologies</h1>
            <p>Pick the service you need and tell us a little about the project — you’ll hear back from the right specialist {RESPONSE_PROMISE}.</p>
          </motion.div>

          <motion.div {...heroFollow}>
            <BookCallWizard />
          </motion.div>

          <div className="bc-foot">
            <span>
              Prefer email? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </span>
            {headquarters && <span>{headquarters}</span>}
            {offices.map((office) => (
              <span key={office.city}>
                {office.city} — {office.detail}
              </span>
            ))}
            <span>
              Need an NDA or vendor questionnaire? Mention it in your brief. See{' '}
              <Link to="/security">Security &amp; Trust</Link>.
            </span>
          </div>
        </div>
      </section>
    </>
  )
}
