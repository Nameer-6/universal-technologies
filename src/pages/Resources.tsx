import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { resources, readingMinutes } from '../resourcesData'

export default function Resources() {
  return (
    <>
      <Seo
        title="Software Delivery Resources | Universal Technologies"
        description="Practical guides to choosing a software development partner and planning your delivery team. Explore ownership, scope, quality, and engagement models."
        path="/resources"
      />
      <section className="section" aria-labelledby="resources-title">
        <div className="container">
          <div className="section-head">
            <p className="section-label">Insights</p>
            <h1 className="section-title" id="resources-title">
              Make your next delivery decision with clarity.
            </h1>
            <p className="section-lead">
              Practical questions and guides for teams planning a software project.
            </p>
          </div>
          <div className="resource-grid">
            {resources.map((article) => (
              <article className="resource-card" key={article.slug}>
                <Link className="service-card-link" to={`/resources/${article.slug}`}>
                  <p className="section-label">{article.category}</p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <p className="resource-meta">{readingMinutes(article)} min read</p>
                  <span className="card-affordance">
                    Read the guide <span aria-hidden>→</span>
                  </span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
