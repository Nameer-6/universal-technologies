import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { resources } from '../resourcesData'

export default function Resources() {
  return <>
    <Seo title="Software Delivery Resources | Universal Technologies" description="Practical guides to choosing a software development partner and planning your delivery team. Explore ownership, scope, quality, and engagement models." path="/resources" />
    <section className="section" aria-labelledby="resources-title"><div className="container">
      <div className="section-head"><p className="section-label">Resources</p><h1 className="section-title" id="resources-title">Make your next delivery decision with clarity.</h1><p className="section-lead">Practical questions and guides for teams planning a software project.</p></div>
      <div className="service-grid">{resources.map(article => <article className="service-card" key={article.slug}><p className="section-label">{article.category}</p><h2><Link to={`/resources/${article.slug}`}>{article.title}</Link></h2><p>{article.description}</p><Link className="svc-list-more" to={`/resources/${article.slug}`}>Read the guide <span aria-hidden>→</span></Link></article>)}</div>
    </div></section>
  </>
}
