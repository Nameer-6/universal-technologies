import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { ServiceArt } from './ServiceArt'

// Image-forward grid of the six service lines (homepage + Services page).
// Wide cards alternate so the grid reads as a bento, not a table.
const WIDE = [0, 3, 5]

export function ServiceBento({ anchors = false }: { anchors?: boolean }) {
  const { list, item, ease } = usePageMotion()
  return (
    <motion.div className="sx-bento" {...list}>
      {services.map((service, index) => (
        <motion.article
          key={service.id}
          id={anchors ? service.id : undefined}
          className={`hx-card sx-card${WIDE.includes(index) ? ' is-wide' : ''}`}
          variants={item}
          transition={{ duration: 0.55, ease }}
        >
          <Link to={`/services/${service.id}`} className="sx-link">
            <div className="sx-visual">
              <ServiceArt id={service.id} />
            </div>
            <div className="sx-body">
              <p className="hx-chip">
                <i aria-hidden="true" /> {service.mark}
              </p>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ul className="hx-tags">
                {service.stacks.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              <span className="hx-more">
                Explore {service.title} <span aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </motion.div>
  )
}
