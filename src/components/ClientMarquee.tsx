import { useReducedMotion } from 'framer-motion'
import { clients } from '../data'

const marqueeList = [...clients, ...clients]

export function ClientMarquee() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <div className="client-marquee" aria-label="Teams we've worked with">
      <div className={`client-marquee-track${reduceMotion ? ' paused' : ''}`}>
        {marqueeList.map((client, index) => {
          const duplicate = index >= clients.length
          return (
            <span
              key={`${client.logo}-${index}`}
              className="client-card"
              aria-hidden={duplicate || undefined}
            >
              <img
                src={client.logo}
                alt={duplicate ? '' : client.name}
                loading="lazy"
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
