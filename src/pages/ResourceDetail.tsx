import { Link, useParams } from 'react-router-dom'
import { Seo, SITE_URL } from '../components/Seo'
import { resources } from '../resourcesData'
import NotFound from './NotFound'

export default function ResourceDetail() {
  const { slug } = useParams()
  const article = resources.find(item => item.slug === slug)
  if (!article) return <NotFound />
  const path = `/resources/${article.slug}`
  return <>
    <Seo title={article.title} description={article.description} path={path} type="article" jsonLd={{ '@context': 'https://schema.org', '@type': 'Article', headline: article.title, description: article.description, mainEntityOfPage: `${SITE_URL}${path}`, author: { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL }, publisher: { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL } }} />
    <article className="section"><div className="container">
      <div className="section-head"><Link className="section-label" to="/resources">← All resources</Link><h1 className="section-title">{article.title}</h1><p className="section-lead">{article.description}</p></div>
      <div className="legal-doc">{article.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}<p><Link className="contact-email" to={`/services/${article.service}`}>{article.serviceLabel} →</Link></p><p><Link to="/contact">Talk to our team about your project →</Link></p></div>
    </div></article>
  </>
}
