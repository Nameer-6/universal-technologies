export type Resource = {
  slug: string
  title: string
  description: string
  category: string
  sections: { title: string; text: string }[]
  service: string
  serviceLabel: string
  /** Named author and reviewer. Add only real, consenting people; the byline and Article schema appear automatically. */
  author?: { name: string; role: string; profileUrl?: string }
  reviewer?: { name: string; role: string }
  /** ISO dates (YYYY-MM-DD). Add the real publication and last-review dates. */
  datePublished?: string
  dateModified?: string
}

export const resources: Resource[] = [
  {
    slug: 'choose-software-development-partner',
    title: 'How to choose a software development partner',
    description: 'A practical checklist for comparing software delivery partners: ownership, working demos, quality, scope, and handoff. Know what to ask before you commit.',
    category: 'Delivery guide',
    sections: [
      { title: 'Start with the release you need', text: 'Write down the user problem, the first useful release, and the constraints your team already knows. Include the systems a partner must work with and the decisions still open. A useful proposal explains how the team will resolve uncertainty before committing to a detailed delivery plan.' },
      { title: 'Ask who owns the outcome', text: 'Find out who makes technical decisions, who manages delivery, and who you can contact when scope changes. Ask how design, engineering, testing, and deployment share information. Clear responsibility matters most when a problem crosses several disciplines.' },
      { title: 'Look for evidence you can discuss', text: 'Ask for a relevant example and permission to speak with a reference where available. Discuss the original constraint, the team’s contribution, and how the result was measured. A dashboard screenshot is useful only when you understand what it represents. Do not assume a result from another project is a forecast for yours.' },
      { title: 'Agree how progress becomes visible', text: 'Define the demo cadence, acceptance criteria, and access to the backlog before work begins. Ask what happens when feedback changes a feature or an integration takes longer than expected. A working slice of the product gives you something concrete to evaluate and helps expose misunderstandings early.' },
      { title: 'Make quality and handoff part of the scope', text: 'Clarify which user journeys will be tested, how releases are approved, and who responds to a production issue. Agree repository access, infrastructure ownership, documentation, and support boundaries in writing. Compare proposals on these deliverables as well as price, then choose the team whose process fits the responsibility you need it to take.' },
    ],
    service: 'end-to-end-development',
    serviceLabel: 'Explore end-to-end software development',
  },
  {
    slug: 'staff-augmentation-vs-project-delivery',
    title: 'Staff augmentation or project-based delivery?',
    description: 'Compare staff augmentation and project-based software delivery. Choose an engagement model around your roadmap, internal leadership, and release ownership.',
    category: 'Planning guide',
    sections: [
      { title: 'Decide which responsibility you need to add', text: 'A team can be short on capacity, specialist knowledge, or ownership of a release. These are different needs. Before comparing engagement models, identify who will prioritize work, make architecture decisions, review quality, and coordinate deployment. The right model fills the gap you actually have.' },
      { title: 'When staff augmentation fits', text: 'An embedded specialist can be a good fit when your team already has a clear backlog and the leadership to manage delivery. The specialist joins your planning, code review, and release process. Define onboarding, access, availability, and the work they will own so added capacity does not create more coordination than it removes.' },
      { title: 'When project-based delivery fits', text: 'A scoped delivery team can fit when you need one partner to coordinate design, engineering, QA, and launch. You still need a product decision-maker who can provide context, approve priorities, and give timely feedback. Set acceptance criteria and discuss how scope changes affect the plan before the first sprint.' },
      { title: 'Compare the full operating cost', text: 'An hourly rate alone does not describe the engagement. Include your team’s time for onboarding, management, review, and handoff. For project proposals, compare assumptions, exclusions, testing, support, and ownership. Ask each partner to explain what must be true for its estimate to hold.' },
      { title: 'Start with a defined checkpoint', text: 'Agree an initial discovery or delivery milestone and review the results together. Assess whether decisions move quickly, progress is visible, and quality expectations are shared. You can then adjust the mix of embedded specialists and owned delivery work based on evidence from the engagement.' },
    ],
    service: 'end-to-end-development',
    serviceLabel: 'Discuss an accountable delivery team',
  },
]

export function readingMinutes(article: Resource) {
  const words = [article.description, ...article.sections.map((section) => section.text)]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
