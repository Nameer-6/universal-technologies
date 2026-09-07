import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Universal Technologies"
        description="The page you're looking for doesn't exist or has moved."
        path="/404"
        noindex
      />

      <section className="section" aria-labelledby="not-found-title">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">404</p>
            <h1 className="section-title" id="not-found-title">
              We can't find that page
            </h1>
            <p className="section-lead">
              The link may be broken or the page may have moved. Head back home or check out our
              services.
            </p>
          </div>
          <div style={{ justifyContent: 'center', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link className="btn btn-ink" to="/">
              Back to home <span aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost-ink" to="/services">
              View services <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
