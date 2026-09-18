import { clients } from '../data'

export function ClientLogoGrid({
  caption,
  omit,
}: {
  caption?: string
  omit?: string[]
}) {
  const skip = new Set(omit ?? [])
  const named = clients.filter((client) => client.name !== 'Client' && !skip.has(client.name))

  return (
    <div className="client-logo-block">
      {caption ? <p className="client-logo-caption">{caption}</p> : null}
      <ul className="client-logo-grid">
        {named.map((client) => (
          <li key={client.name} className="client-card">
            <img src={client.logo} alt={client.name} loading="lazy" />
          </li>
        ))}
      </ul>
    </div>
  )
}
