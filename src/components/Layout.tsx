import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { CONTACT_EMAIL, services } from '../data'
import { useTheme } from '../hooks/useTheme'

export function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = Boolean(useReducedMotion())
  const { theme, toggleTheme } = useTheme()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 })
  const progressWidth = useTransform(progress, [0, 1], ['0%', '100%'])
  const location = useLocation()

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

  useEffect(() => {
    setMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      {!reduceMotion && (
        <motion.div className="scroll-progress" style={{ width: progressWidth }} aria-hidden />
      )}

      <div className="topbar">
        <div className="container topbar-inner">
          <span>Engineering · Quality · Growth — executed as one system</span>
          <Link to="/">
            Explore Universal <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <header className={`nav${scrolled || menuOpen ? ' scrolled' : ''}${menuOpen ? ' open' : ''}`}>
        <div className="container nav-inner">
          <Link className="brand" to="/" onClick={closeMenu} aria-label="Universal Technologies home">
            <img src={theme === 'dark' ? '/logo-dark.png' : '/logo.png'} alt="Universal Technologies" />
          </Link>

          <nav className="nav-links" aria-label="Primary">
            <Link to="/services" onClick={closeMenu}>
              Services
            </Link>
            <Link to="/products" onClick={closeMenu}>
              Products
            </Link>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
            <Link to="/careers" onClick={closeMenu}>
              Careers
            </Link>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
            <button
              type="button"
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
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
              Get Started
            </Link>
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
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img src="/logo-dark.png" alt="Universal Technologies" />
            <p>
              Product engineering, quality, cloud, and growth — staffed as one delivery team.
            </p>
          </div>
          <div>
            <h4>Services</h4>
            {services.slice(0, 4).map((s) => (
              <Link key={s.id} to={`/services/${s.id}`}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/contact">Contact</Link>
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
