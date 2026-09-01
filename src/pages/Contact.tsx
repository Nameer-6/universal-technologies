import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useContactForm } from '../hooks/useContactForm'
import { CONTACT_EMAIL, services } from '../data'
import { officeLocations } from '../pagesData'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export default function Contact() {
  const reduceMotion = Boolean(useReducedMotion())
  const { sent, onSubmit } = useContactForm()
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
      <section className="section" aria-labelledby="contact-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Contact</p>
            <h1 className="section-title" id="contact-title">
              Send the brief. We'll reply tomorrow.
            </h1>
            <p className="section-lead">
              Share context, timeline, and what "good" looks like. No pitch deck required.
            </p>
          </motion.div>

          <div className="contact-grid">
            <motion.div {...reveal}>
              <p className="section-label">Reach us directly</p>
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

            <motion.form
              className="contact-form"
              onSubmit={onSubmit}
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease }}
            >
              <div className="form-row">
                <label>
                  Full name
                  <input name="name" type="text" required autoComplete="name" />
                </label>
                <label>
                  Work email
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Company
                  <input name="company" type="text" autoComplete="organization" />
                </label>
                <label>
                  Service interest
                  <select name="service" defaultValue="Web Development">
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Multiple services">Multiple services</option>
                  </select>
                </label>
              </div>
              <label>
                Project details
                <textarea name="message" required rows={5} />
              </label>
              <motion.button
                className="btn btn-ink"
                type="submit"
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              >
                {sent ? 'Opening email…' : 'Email our team'} <span aria-hidden>→</span>
              </motion.button>
              <AnimatePresence>
                {sent && (
                  <motion.p
                    key="ok"
                    className="form-note success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Draft ready. If nothing opened, write {CONTACT_EMAIL}.
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </section>
    </>
  )
}
