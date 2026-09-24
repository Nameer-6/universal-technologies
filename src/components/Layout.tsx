import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { CONTACT_EMAIL, PRIMARY_CTA, services } from '../data'
import { companyFacts } from '../companyFacts'
import { resources } from '../resourcesData'
import { useTheme } from '../hooks/useTheme'
import { SITE_URL } from './Seo'

const { legalEntity, foundedYear, headquarters } = companyFacts

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Universal Technologies',
  ...(legalEntity && { legalName: legalEntity.name }),
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: CONTACT_EMAIL,
  ...(foundedYear && { foundingDate: String(foundedYear) }),
  description:
    'Remote-first delivery partner for AI agents, workflow automation, QA & test automation, DevOps & infrastructure, SaaS applications, and end-to-end software development.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Universal Technologies',
  url: SITE_URL,
}

const navItems = [
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/products', label: 'Products' },
  { to: '/resources', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/careers', label: 'Careers' },
]

export function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = Boolean(useReducedMotion())
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const progressWidth = useTransform(progress, [0, 1], ['0%', '100%'])
  const location = useLocation()
  const isHome = location.pathname === '/'
  const menuToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      if (!isHome) {
        setScrolled(window.scrollY > 8)
        return
      }

      const hero = document.querySelector<HTMLElement>('.scroll-hero')
      if (!hero) {
        setScrolled(window.scrollY > 8)
        return
      }

      const navHeight =
        parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
        ) || 72
      setScrolled(hero.getBoundingClientRect().bottom <= navHeight + 12)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
    setScrolled(location.pathname !== '/')
    window.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      // Return focus to the menu button so keyboard users don't lose their place.
      menuToggleRef.current?.focus()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(organizationJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(websiteJsonLd)}</script>
      </Helmet>

      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      {!reduceMotion && (
        <motion.div className="scroll-progress" style={{ width: progressWidth }} aria-hidden />
      )}

      <header className={`nav${scrolled || menuOpen ? ' scrolled' : ''}${menuOpen ? ' open' : ''}`}>
        <div className="container nav-inner">
          <Link className="brand" to="/" onClick={closeMenu} aria-label="Universal Technologies home">
            <img
              src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'}
              alt="Universal Technologies"
              width={449}
              height={164}
            />
          </Link>

          <nav className="nav-links" id="primary-nav" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={closeMenu}>
                {item.label}
              </NavLink>
            ))}
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
                  <path
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.8 6.8 0 0 0 10.7 10.7Z"
                  />
                </svg>
              )}
              <span className="theme-toggle-label">
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </span>
            </button>
            <Link className="btn btn-ink nav-cta" to="/contact" onClick={closeMenu}>
              {PRIMARY_CTA}
            </Link>
          </nav>

          <button
            ref={menuToggleRef}
            className="nav-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-brand">
            <img src="/logo-dark.png" alt="Universal Technologies" width={451} height={164} />
            <p>Product engineering, quality, cloud, and growth — staffed as one delivery team.</p>
          </div>
          <div className="footer-grid">
            <div>
              <h4>Services</h4>
              {services.map((service) => (
                <Link key={service.id} to={`/services/${service.id}`}>
                  {service.title}
                </Link>
              ))}
            </div>
            <div>
              <h4>Company</h4>
              <Link to="/about">About</Link>
              <Link to="/portfolio">Work</Link>
              <Link to="/security">Security &amp; Trust</Link>
              <Link to="/careers">Careers</Link>
            </div>
            <div>
              <h4>Resources</h4>
              <Link to="/resources">Insights</Link>
              {resources.map((article) => (
                <Link key={article.slug} to={`/resources/${article.slug}`}>
                  {article.title}
                </Link>
              ))}
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/terms">Terms</Link>
            </div>
            <div>
              <h4>Connect</h4>
              <Link to="/contact">Contact</Link>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} {legalEntity?.name ?? 'Universal Technologies'}
          </span>
          <span>{headquarters ?? 'Ship with one accountable partner'}</span>
        </div>
      </footer>
    </>
  )
}
