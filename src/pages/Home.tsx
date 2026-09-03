import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ScrollHero } from '../components/ScrollHero'
import { useContactForm } from '../hooks/useContactForm'
import { CONTACT_EMAIL, clients, engagements, howItWorks, outcomes, services } from '../data'

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

const marqueeList = [...clients, ...clients]

export default function Home() {
  const reduceMotion = Boolean(useReducedMotion())
  const { status, onSubmit } = useContactForm()

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
      <ScrollHero />

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

          <div className="timeline">
            {howItWorks.map((item, index) => (
              <motion.article
                key={item.step}
                className={`timeline-row${index % 2 === 1 ? ' flip' : ''}`}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, x: index % 2 === 1 ? 48 : -48, y: 16 }
                }
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="timeline-copy">
                  <span className="timeline-step">{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
                <motion.div
                  className="timeline-rail"
                  aria-hidden
                  initial={reduceMotion ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.8, ease }}
                  style={{ transformOrigin: 'top' }}
                >
                  <span>{item.step}</span>
                </motion.div>
                <motion.div
                  className="timeline-card"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.55, delay: 0.12, ease }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                >
                  {item.cards.map((card) => (
                    <div key={card.label}>
                      <strong>{card.label}</strong>
                      <span>{card.detail}</span>
                    </div>
                  ))}
                </motion.div>
              </motion.article>
            ))}
          </div>
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
                  reduceMotion
                    ? undefined
                    : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
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
              </motion.article>
            ))}
          </motion.div>
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

          <div className="marquee" aria-label="Clients we've worked with">
            <div className={`marquee-track${reduceMotion ? ' paused' : ''}`}>
              {marqueeList.map((name, index) => (
                <span key={`${name}-${index}`}>{name}</span>
              ))}
            </div>
          </div>
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
                  reduceMotion
                    ? undefined
                    : { y: -8, transition: { duration: 0.25, ease } }
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
          <motion.a
            className="btn btn-light"
            href="#contact"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          >
            Talk to delivery <span aria-hidden>→</span>
          </motion.a>
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="container contact-grid">
          <motion.div {...reveal}>
            <p className="section-label">Contact</p>
            <h2 className="section-title" id="contact-title">
              Send the brief. We’ll reply tomorrow.
            </h2>
            <p className="section-lead">
              Share context, timeline, and what “good” looks like. No pitch deck required.
            </p>
            <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
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
            <input
              type="checkbox"
              name="_honey"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="apply-honeypot"
            />
            <motion.button
              className="btn btn-ink"
              type="submit"
              disabled={status === 'submitting'}
              whileHover={reduceMotion ? undefined : { scale: 1.02 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
            >
              {status === 'submitting' ? 'Sending…' : 'Email our team'} <span aria-hidden>→</span>
            </motion.button>
            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  key="ok"
                  className="form-note success"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Message sent — we'll reply within a business day.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  key="err"
                  className="form-note error"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  Something went wrong. Please email us directly at {CONTACT_EMAIL}.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </section>
    </>
  )
}
