import { useReducedMotion } from 'framer-motion'
import { clients } from '../data'

const named = clients.filter((client) => client.name !== 'Client')
const marqueeList = [...named, ...named]

// Start fetching every logo as soon as this module loads, so they are cached
// before the marquee (e.g. inside the booking modal) ever renders.
if (typeof window !== 'undefined') {
  for (const client of named) new Image().src = client.logo
}

export function ClientMarquee() {
  const reduceMotion = Boolean(useReducedMotion())

  return (
    <div className="client-marquee" aria-label="Teams we've worked with">
      <div className={`client-marquee-track${reduceMotion ? ' paused' : ''}`}>
        {marqueeList.map((client, index) => {
          const duplicate = index >= named.length
          return (
            <span
              key={`${client.logo}-${index}`}
              className="client-card"
              aria-hidden={duplicate || undefined}
            >
              <img
                src={client.logo}
                alt={duplicate ? '' : client.name}
                loading="eager"
                decoding="async"
              />
            </span>
          )
        })}
      </div>
    </div>
  )
}
