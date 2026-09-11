import { Link } from 'react-router-dom'
import { services } from '../data'

export function LandingHero() {
  return (
    <section className="landing-hero" aria-labelledby="home-title">
      <div className="container landing-hero-grid">
        <div className="landing-hero-copy">
          <p className="section-label">Your next release starts here</p>
          <h1 id="home-title">Software.<br />Automation.<br /><span>AI that works.</span></h1>
          <p className="landing-hero-lead">One accountable team, from first idea to production.</p>
          <p className="landing-hero-description">For product teams building something new or improving what’s already live. We bring engineering, QA, and cloud delivery together so you can move forward with a clear plan.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">Talk to our team <span aria-hidden>↗</span></a>
            <Link className="btn btn-ghost-ink" to="/services">Explore our services <span aria-hidden>→</span></Link>
          </div>
          <p className="landing-hero-note">Your roadmap. Our shared responsibility.</p>
        </div>
        <div className="landing-service-panel">
          <div className="landing-panel-heading"><span>Built together</span><span>01 — 06</span></div>
          <h2>Six capabilities.<br />One delivery partner.</h2>
          <div className="landing-service-list">
            {services.map(service => (
              <Link key={service.id} to={`/services/${service.id}`}>
                <span className="landing-service-number">{service.mark}</span>
                <span>{service.title}</span><span aria-hidden>↗</span>
              </Link>
            ))}
          </div>
          <div className="landing-panel-footer"><span aria-hidden /> Design → Build → Test → Launch</div>
        </div>
      </div>
      <div className="container landing-principles" aria-label="Our delivery approach">
        <div><strong>One shared backlog</strong><span>Everyone works toward the same release.</span></div>
        <div><strong>Working software, weekly</strong><span>Review progress through demos and feedback.</span></div>
        <div><strong>Ownership beyond launch</strong><span>Documentation and handoff built into delivery.</span></div>
      </div>
    </section>
  )
}
