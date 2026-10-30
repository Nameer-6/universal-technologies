import { companyFacts } from '../companyFacts'

// Label and icon for each known profile host; links come from companyFacts.profiles,
// the same list used for Organization `sameAs`.
const known = {
  'linkedin.com': {
    label: 'LinkedIn',
    cta: 'Follow us on LinkedIn',
    icon: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.05c.53-.95 1.84-1.95 3.79-1.95 4.05 0 4.8 2.53 4.8 5.83v5.62h-4v-4.98c0-1.19-.02-2.72-1.75-2.72-1.75 0-2.02 1.3-2.02 2.63v5.07h-4v-11Z" />
    ),
  },
  'clutch.co': {
    label: 'Clutch',
    cta: 'Read our reviews on Clutch',
    icon: (
      <path d="M12 3a9 9 0 1 0 6.36 15.36l-2.12-2.12A6 6 0 1 1 16.24 7.76l2.12-2.12A8.97 8.97 0 0 0 12 3Zm0 6.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    ),
  },
} as const

export const socialProfiles = companyFacts.profiles.flatMap((url) => {
  const host = new URL(url).hostname.replace(/^www\./, '') as keyof typeof known
  return known[host] ? [{ url, ...known[host] }] : []
})

type Props = {
  /** "icons": compact round buttons (footer). "buttons": labelled pills (page sections). */
  variant?: 'icons' | 'buttons'
  className?: string
}

export function SocialLinks({ variant = 'buttons', className = '' }: Props) {
  if (socialProfiles.length === 0) return null
  return (
    <div className={`social-links social-links-${variant} ${className}`.trim()}>
      {socialProfiles.map((profile) => (
        <a
          key={profile.url}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={variant === 'icons' ? `Universal Technologies on ${profile.label}` : undefined}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            {profile.icon}
          </svg>
          {variant === 'buttons' && <span>{profile.cta}</span>}
        </a>
      ))}
    </div>
  )
}
