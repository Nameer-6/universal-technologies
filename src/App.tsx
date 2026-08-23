import { useEffect, useState, type FormEvent } from 'react'
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ScrollHero } from './components/ScrollHero'
import {
  CONTACT_EMAIL,
  engagements,
  howItWorks,
  industries,
  outcomes,
  services,
} from './data'

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

const marqueeList = [...industries, ...industries]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const reduceMotion = Boolean(useReducedMotion())
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const progressWidth = useTransform(progress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const company = String(data.get('company') || '').trim()
    const service = String(data.get('service') || '').trim()
    const message = String(data.get('message') || '').trim()

    const subject = encodeURIComponent(`Project inquiry — ${service || 'General'}`)
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        company ? `Company: ${company}` : null,
        `Service: ${service}`,
        '',
        message,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    form.reset()
  }

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
      {!reduceMotion && (
        <motion.div className="scroll-progress" style={{ width: progressWidth }} aria-hidden />
      )}

      <div className="topbar">
        <div className="container topbar-inner">
          <span>Engineering · Quality · Growth — executed as one system</span>
          <a href="#how">
            Explore Universal <span aria-hidden>→</span>
          </a>
        </div>
      </div>

      <header className={`nav${scrolled || menuOpen ? ' scrolled' : ''}${menuOpen ? ' open' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" onClick={closeMenu} aria-label="Universal Technologies home">
            <img src="/logo.png" alt="Universal Technologies" />
          </a>

          <nav className="nav-links" aria-label="Primary">
            <a href="#services" onClick={closeMenu}>
              Services
            </a>
            <a href="#how" onClick={closeMenu}>
              How it works
            </a>
            <a href="#engage" onClick={closeMenu}>
              Engage
            </a>
            <a href="#contact" onClick={closeMenu}>
              Contact
            </a>
            <a className="btn btn-ink nav-cta" href="#contact" onClick={closeMenu}>
              Get Started
            </a>
          </nav>

          <button
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="top">
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

            <div className="marquee" aria-label="Industries we support">
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
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img src="/logo.png" alt="Universal Technologies" />
            <p>
              Product engineering, quality, cloud, and growth — staffed as one delivery team.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            {services.slice(0, 4).map((s) => (
              <a key={s.id} href="#services">
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <a href="#how">How it works</a>
            <a href="#engage">Engage</a>
            <a href="#contact">Contact</a>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Universal Technologies</span>
          <span>Ship with one accountable partner</span>
        </div>
      </footer>
    </>
  )
}
