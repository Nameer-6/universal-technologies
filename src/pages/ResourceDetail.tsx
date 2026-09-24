import { Link, useParams } from 'react-router-dom'
import { Seo, SITE_URL } from '../components/Seo'
import { PRIMARY_CTA } from '../data'
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
        breadcrumbs={[
          { name: 'Insights', path: '/resources' },
          { name: article.title, path },
        ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          mainEntityOfPage: `${SITE_URL}${path}`,
          ...(article.datePublished && { datePublished: article.datePublished }),
          ...(article.dateModified && { dateModified: article.dateModified }),
          author: article.author
            ? {
                '@type': 'Person',
                name: article.author.name,
                jobTitle: article.author.role,
                ...(article.author.profileUrl && { url: article.author.profileUrl }),
              }
            : { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL },
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
            {minutes} min read
            {' · '}
            {article.author ? `${article.author.name}, ${article.author.role}` : 'Universal Technologies'}
            {article.reviewer && ` · Reviewed by ${article.reviewer.name}, ${article.reviewer.role}`}
            {article.datePublished && (
              <>
                {' · Published '}
                <time dateTime={article.datePublished}>{article.datePublished}</time>
              </>
            )}
            {article.dateModified && (
              <>
                {' · Updated '}
                <time dateTime={article.dateModified}>{article.dateModified}</time>
              </>
            )}
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
              {PRIMARY_CTA} <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
