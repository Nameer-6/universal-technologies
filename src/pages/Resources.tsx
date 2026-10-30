import { useState } from 'react'
import { motion } from 'framer-motion'
import { Seo } from '../components/Seo'
import { ResourceCard } from '../components/ResourceCard'
import { services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { resources } from '../resourcesData'

// Only services that have at least one guide get a filter chip.
const topics = services.filter((service) => resources.some((article) => article.service === service.id))

export default function Resources() {
  const { reveal } = usePageMotion()
  const [topic, setTopic] = useState<string | null>(null)
  const shown = topic ? resources.filter((article) => article.service === topic) : resources

  return (
    <div className="resources-page">
      <Seo
        title="Software Delivery Resources | Universal Technologies"
        description="Practical guides on AI agents, workflow automation, QA, DevOps, SaaS and software project planning from the Universal Technologies delivery team."
        path="/resources"
        breadcrumbs={[{ name: 'Insights', path: '/resources' }]}
      />
      <section className="section resources-hero" aria-labelledby="resources-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Insights</p>
            <h1 className="section-title" id="resources-title">
              Make your next delivery decision <span className="hx-muted">with clarity.</span>
            </h1>
            <p className="section-lead">
              Practical guides on AI, automation, QA, DevOps, SaaS and planning a software project.
            </p>
          </motion.div>

          <div className="resource-filters" role="group" aria-label="Filter guides by service">
            <button type="button" aria-pressed={topic === null} onClick={() => setTopic(null)}>
              All guides <span>{resources.length}</span>
            </button>
            {topics.map((service) => (
              <button
                type="button"
                key={service.id}
                aria-pressed={topic === service.id}
                onClick={() => setTopic(service.id)}
              >
                {service.title}{' '}
                <span>{resources.filter((article) => article.service === service.id).length}</span>
              </button>
            ))}
          </div>

          <div className="resource-grid resource-grid-3" aria-live="polite">
            {shown.map((article) => (
              <ResourceCard key={article.slug} article={article} as="h2" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
