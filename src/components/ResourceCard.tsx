import { Link } from 'react-router-dom'
import { services } from '../data'
import { readingMinutes, type Resource } from '../resourcesData'

type Props = {
  article: Resource
  /** Heading level: h2 on the Insights page, h3 inside other page sections. */
  as?: 'h2' | 'h3'
}

export function ResourceCard({ article, as: Heading = 'h3' }: Props) {
  const service = services.find((item) => item.id === article.service)
  return (
    <article className="resource-card">
      <Link className="service-card-link" to={`/resources/${article.slug}`}>
        <div className="resource-card-top">
          <p className="section-label">{article.category}</p>
          <span className="resource-time">{readingMinutes(article)} min read</span>
        </div>
        <Heading>{article.title}</Heading>
        <p>{article.description}</p>
        <div className="resource-card-foot">
          {service && <span className="resource-service">{service.title}</span>}
          <span className="card-affordance">
            Read the guide <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
    </article>
  )
}
