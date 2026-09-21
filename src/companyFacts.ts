/**
 * Single source of truth for public company claims (audit ENT-01/02/03/07/14, OPS-04).
 *
 * Every field is empty until the business owner has verified it AND it matches
 * LinkedIn, contracts and invoices. Pages render a fact only when it is set, so an
 * unverified claim cannot ship by accident. To publish a fact: fill it in here, then
 * record the source and verification date in docs/claims-register.md.
 */

export type LegalEntity = {
  name: string
  /** e.g. "Limited liability company" */
  type: string
  /** e.g. "Texas, USA" */
  jurisdiction: string
  registeredAddress: string
  registrationNumber?: string
}

export type Leader = {
  name: string
  role: string
  bio: string
  /** Public professional profile (LinkedIn etc.) — required so the card is verifiable. */
  profileUrl: string
  /** Path under /public to a real headshot, e.g. /team/jane-doe.jpg */
  photo?: string
  location?: string
}

export type TimelineEntry = { year: string; text: string }

export type CompanyFacts = {
  foundedYear: number | null
  legalEntity: LegalEntity | null
  /** Label + place, e.g. "Headquarters: Katy, Texas". Use the same wording as LinkedIn. */
  headquarters: string | null
  /** Delivery/team presence, e.g. { city: 'Lisbon, Portugal', detail: 'EMEA delivery hub' } */
  offices: { city: string; detail: string }[]
  /** Headline numbers for About, e.g. { value: '40+', label: 'Team members' } */
  metrics: { value: string; label: string }[]
  leadership: Leader[]
  /** Only certifications/attestations actually held, e.g. "SOC 2 Type II". */
  certifications: string[]
  /** Verified company/team milestones, oldest first. */
  timeline: TimelineEntry[]
}

export const companyFacts: CompanyFacts = {
  foundedYear: null,
  legalEntity: null,
  headquarters: null,
  offices: [],
  metrics: [],
  leadership: [],
  certifications: [],
  timeline: [],
}
