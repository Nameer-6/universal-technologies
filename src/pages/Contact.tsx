import { motion, useReducedMotion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { ContactForm } from '../components/ContactForm'
import { CONTACT_EMAIL } from '../data'
import { pageMetadata } from '../seoData'
import { officeLocations } from '../pagesData'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function Contact() {
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
        title={pageMetadata['/contact'].title}
        description={pageMetadata['/contact'].description}
        path="/contact"
      />

      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Contact</p>
            <h1 className="section-title" id="contact-title">
              Talk to our team
            </h1>
            <p className="section-lead">
              Share context, timeline, and what “good” looks like. No pitch deck required.
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div {...reveal}>
              <p className="section-label">What happens next</p>
              <ol className="contact-next">
                <li>We review the brief.</li>
                <li>A delivery lead replies.</li>
                <li>If there’s a fit, we book a focused discovery call.</li>
              </ol>
              <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>

              <div className="stack-row" style={{ marginTop: '2rem' }}>
                {officeLocations.map((office) => (
                  <span key={office.city}>
                    {office.city} — {office.detail}
                  </span>
                ))}
              </div>
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
        </div>
      </section>
    </>
  )
}
