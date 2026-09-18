import { Link, useParams } from 'react-router-dom'
import { Seo, SITE_URL } from '../components/Seo'
import { readingMinutes, resources } from '../resourcesData'
import NotFound from './NotFound'

export default function ResourceDetail() {
  const { slug } = useParams()
  const article = resources.find((item) => item.slug === slug)
  if (!article) return <NotFound />
  const path = `/resources/${article.slug}`
  const minutes = readingMinutes(article)
  const related = resources.filter((item) => item.slug !== article.slug)

  return (
    <>
      <Seo
        title={article.title}
        description={article.description}
        path={path}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          mainEntityOfPage: `${SITE_URL}${path}`,
          author: { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL },
          publisher: { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL },
        }}
      />
      <article className="section">
        <div className="container article-page">
          <p className="section-label">
            <Link to="/resources">← Insights</Link>
            {' · '}
            {article.category}
          </p>
          <h1 className="section-title">{article.title}</h1>
          <p className="section-lead">{article.description}</p>
          <p className="resource-meta">
            {minutes} min read · Universal Technologies
          </p>
          <div className="legal-doc">
            {article.sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
          <p>
            <Link className="contact-email" to={`/services/${article.service}`}>
              {article.serviceLabel} →
            </Link>
          </p>
          {related.length > 0 && (
            <div className="related-reading">
              <h2>Related reading</h2>
              {related.map((item) => (
                <Link key={item.slug} to={`/resources/${item.slug}`}>
                  {item.title} <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          )}
          <div className="hero-actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn-ink" to="/contact">
              Talk to our team <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
