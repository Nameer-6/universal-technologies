import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { usePageMotion } from '../hooks/usePageMotion'
import { resources, readingMinutes } from '../resourcesData'

export default function Resources() {
  const { reveal, list, item, cardHover } = usePageMotion()

  return (
    <div className="resources-page">
      <Seo
        title="Software Delivery Resources | Universal Technologies"
        description="Practical guides to choosing a software development partner and planning your delivery team. Explore ownership, scope, quality, and engagement models."
        path="/resources"
        breadcrumbs={[{ name: 'Insights', path: '/resources' }]}
      />
      <section className="section resources-hero" aria-labelledby="resources-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Insights</p>
            <h1 className="section-title" id="resources-title">
              Make your next delivery decision with clarity.
            </h1>
            <p className="section-lead">
              Practical questions and guides for teams planning a software project.
            </p>
          </motion.div>

          <motion.div className="resource-grid" {...list}>
            {resources.map((article) => (
              <motion.article
                className="resource-card"
                key={article.slug}
                variants={item}
                whileHover={cardHover}
              >
                <Link className="service-card-link" to={`/resources/${article.slug}`}>
                  <div className="resource-card-top">
                    <p className="section-label">{article.category}</p>
                    <span className="resource-time">{readingMinutes(article)} min read</span>
                  </div>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <span className="card-affordance">
                    Read the guide <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
