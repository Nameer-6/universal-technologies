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
  {
    slug: 'evaluating-an-ai-agent-before-production',
    title: 'What to check before an AI agent goes into production',
    description: 'A practical checklist for evaluating an AI agent before it touches real workflows: task scope, data access, failure handling, and monitoring after launch.',
    category: 'AI guide',
    sections: [
      { title: 'Define the task narrowly first', text: 'An agent that is asked to "handle support" will behave unpredictably. One asked to "draft a reply to billing questions using these three data sources" will not. Write down the exact inputs it will see, the outputs it should produce, and the actions it is and is not allowed to take before you evaluate anything else.' },
      { title: 'Decide what data it can actually touch', text: 'Give the agent the narrowest access that lets it do its job, not the same access a full-time employee would have. Separate what it can read from what it can write, and require explicit approval before it reaches any system that affects customers, money, or production data.' },
      { title: 'Plan for when it gets it wrong', text: 'Every agent will produce a wrong or unclear answer eventually. Decide in advance what happens next: does it ask a human, refuse, or retry with more context? For any action with real consequences, keep a person in the loop until you have evidence the agent handles the edge cases, not just the demo cases.' },
      { title: 'Test it against real edge cases, not the happy path', text: 'A demo with clean, well-formed inputs tells you very little. Before launch, run it against ambiguous requests, missing information, and inputs designed to confuse it. Log what it did in each case and review the failures with the team that will own it, not just the team that built it.' },
      { title: 'Set up monitoring before you launch, not after', text: "Decide who reviews the agent's output on a regular cadence, what \"good\" looks like, and what triggers a rollback. Track accuracy over time, not just at launch — agent behavior can drift as the systems and data around it change. An agent without an owner watching it is a liability, not a feature." },
    ],
    service: 'ai-agents',
    serviceLabel: 'Explore AI agent development',
  },
  {
    slug: 'ai-agent-vs-workflow-automation',
    title: 'AI agent or workflow automation: which do you need?',
    description: 'How to tell whether a process needs an AI agent or plain workflow automation, based on how predictable the inputs are and how much judgment the work takes.',
    category: 'AI guide',
    sections: [
      { title: 'Start with the inputs, not the technology', text: 'Look at what arrives at the start of the process. If it is structured and predictable, such as a form submission, a new row in a database or a payment event, rules can usually handle it. If it is free text, scanned documents or requests phrased a hundred different ways, you need something that can interpret language. That difference matters more than any tool choice.' },
      { title: 'Use rules when the decision can be written down', text: 'If a person can write the decision as "when X happens, do Y", workflow automation is the cheaper and more reliable choice. It is easier to test, easier to explain to an auditor and behaves the same way every time. Many processes that look like AI problems are really integration problems: data trapped in one system that needs to reach another.' },
      { title: 'Use an agent when the work needs interpretation', text: 'An AI agent earns its place when the step involves reading, classifying, summarising or drafting, for example sorting support tickets, extracting fields from contracts or preparing a first reply. The agent handles the variety in the input. Its output should still land in a structured form that the rest of the workflow can check.' },
      { title: 'Most good systems combine both', text: 'In practice the strongest designs use automation for the predictable plumbing and an agent only for the step that needs judgment. The workflow fetches the data, the agent interprets it, and the workflow validates the result, routes it and records what happened. This keeps the AI part small, testable and easy to swap out later.' },
      { title: 'Questions to answer before you build', text: 'How often does the process run, and what does a mistake cost? Who reviews the output, and how quickly? What data can the system read, and what can it change? Answering these first tells you whether you need an agent at all, how much human review to keep, and how you will know the system is working after launch.' },
    ],
    service: 'ai-agents',
    serviceLabel: 'Explore AI agent development',
  },
  {
    slug: 'which-processes-to-automate-first',
    title: 'Which business processes should you automate first?',
    description: 'A practical way to choose your first workflow automation: score processes on volume, rules, error cost and ownership, then start where the payoff is clear.',
    category: 'Automation guide',
    sections: [
      { title: 'List the work people repeat every week', text: 'Ask each team which tasks they do the same way again and again: copying data between systems, sending status updates, chasing approvals, building the same report. Write down how often each one happens and roughly how long it takes. This list, not a tool demo, is where an automation roadmap should start.' },
      { title: 'Score each process on four things', text: 'For every candidate, note the volume, how clearly the rules can be written down, what an error costs, and whether there is an obvious owner. High-volume work with clear rules and a named owner is the best first candidate. Rare, judgment-heavy tasks with no owner are usually the worst, however painful they feel.' },
      { title: 'Check the systems before you promise anything', text: 'A process is only as automatable as the systems it touches. Find out whether each tool has an API, export or webhook, who controls access, and whether the data is clean enough to act on. Many first projects stall on credentials and data quality rather than on the automation itself.' },
      { title: 'Design for exceptions from day one', text: 'Every real process has cases the rules do not cover: a missing field, a duplicate record, a customer who replied to the wrong email. Decide where those exceptions go, who reviews them and how quickly. An automation that silently drops the odd case is worse than the manual process it replaced.' },
      { title: 'Measure the before and after', text: 'Record how long the process takes and how often it goes wrong before you automate it. After launch, track the same numbers along with how many items still need a person. That evidence makes it easy to decide what to automate next and gives the team confidence that the change is working.' },
    ],
    service: 'workflow-automation',
    serviceLabel: 'Explore workflow automation',
  },
  {
    slug: 'test-automation-strategy',
    title: 'How to build a test automation strategy that lasts',
    description: 'Build test automation that stays useful: choose what to automate, balance unit, API and end-to-end tests, keep suites fast in CI, and give the suite an owner.',
    category: 'QA guide',
    sections: [
      { title: 'Automate the journeys that would hurt most if they broke', text: 'Start with the user journeys that carry the business: sign-up, login, checkout, the core workflow your customers pay for. List them, rank them by the cost of failure, and automate from the top. Coverage percentages matter far less than knowing the critical paths are checked on every change.' },
      { title: 'Put most tests below the user interface', text: 'End-to-end browser tests are valuable but slow and easily broken by small layout changes. Cover business logic with fast unit tests and service behaviour with API tests, then keep a smaller set of end-to-end tests for the journeys that must work as a whole. This balance keeps the suite fast and trustworthy.' },
      { title: 'Run the suite where decisions are made', text: 'Tests help most when they run automatically on every pull request and block a merge when they fail. Keep the pull-request suite fast enough that developers wait for it rather than skip it, and run slower suites on a schedule or before release. A suite nobody runs is documentation, not quality assurance.' },
      { title: 'Treat flaky tests as bugs', text: 'A test that fails at random teaches the team to ignore failures. Track flaky tests, quarantine them quickly and fix or delete them on a schedule. Stable test data, isolated environments and explicit waits instead of fixed delays remove most flakiness at the source.' },
      { title: 'Give the suite an owner and a review rhythm', text: 'Test code needs the same care as product code: reviews, refactoring and someone accountable for its health. Review the suite with each major feature, remove tests that no longer protect anything, and add tests for every production bug so the same issue cannot ship twice.' },
    ],
    service: 'qa',
    serviceLabel: 'Explore QA & test automation',
  },
  {
    slug: 'ci-cd-pipeline-checklist',
    title: 'CI/CD pipeline checklist for growing teams',
    description: 'A CI/CD checklist for teams outgrowing manual deploys: repeatable builds, automated tests, safe releases, fast rollback, secrets handling, and visibility.',
    category: 'DevOps guide',
    sections: [
      { title: 'Make every build repeatable', text: 'The same commit should produce the same build on any machine. Pin dependency versions, build inside a defined container or image, and produce one versioned artifact that moves through every environment. If staging and production are built separately, you are testing one thing and shipping another.' },
      { title: 'Gate merges on automated checks', text: 'Run linting, unit tests and security scans on every pull request, and block the merge when they fail. Keep this stage fast so developers get feedback in minutes. Slower integration and end-to-end suites can run after merge, as long as their results stop a release when something breaks.' },
      { title: 'Release in small, reversible steps', text: 'Deploy small changes often rather than large batches rarely. Use techniques such as rolling, blue-green or canary releases so a bad change reaches only part of the traffic first. Separate deploying code from releasing a feature with feature flags when a change carries real risk.' },
      { title: 'Practise rollback before you need it', text: 'Every team says it can roll back; fewer have tried it under pressure. Make rollback a single, documented action, test it regularly and make sure database migrations are backward compatible so the previous version can still run. Recovery time matters as much as deployment speed.' },
      { title: 'Keep secrets and access under control', text: 'Store credentials in a secrets manager, not in the repository or pipeline logs. Give the pipeline only the permissions each stage needs and rotate keys on a schedule. Record who approved and triggered each production deploy so every change can be traced.' },
      { title: 'Make delivery visible', text: 'Track deploy frequency, failure rate, rollbacks and time to recover for each service. Share them with engineering and product leads so improvements, and problems, are seen early. These numbers turn conversations about release risk from opinion into evidence.' },
    ],
    service: 'devops',
    serviceLabel: 'Explore DevOps & infrastructure',
  },
  {
    slug: 'planning-a-saas-mvp',
    title: 'Planning a SaaS MVP: what to build first',
    description: 'Plan a SaaS MVP that can grow: pick the one workflow to prove, decide tenancy, auth, billing and permissions early, and leave out what can safely wait.',
    category: 'SaaS guide',
    sections: [
      { title: 'Prove one workflow end to end', text: 'An MVP should let a real customer complete the one job they would pay for, from sign-up to result. Write that workflow down step by step and treat everything outside it as a candidate for later. A narrow product that works completely teaches you more than a broad one that half works.' },
      { title: 'Decide tenancy before the first table', text: 'How customer data is separated is hard to change later. Decide early whether tenants share a database with a tenant ID on every record, use separate schemas, or get separate databases, based on your security and compliance needs. Then enforce it in one place in the code, not in every query.' },
      { title: 'Get authentication and permissions right early', text: 'Use a proven authentication provider rather than building login yourself. Design roles around what customers actually need, often just an admin and a member at first, but structure the code so finer permissions can be added without a rewrite. Invitations and team management usually matter sooner than founders expect.' },
      { title: 'Plan billing even if you launch free', text: 'Pricing will change, so keep plan logic separate from product logic and use a billing provider for payments, invoices and tax. Decide what a plan unlocks, such as seats, usage or features, and check it in one place. Retrofitting billing into a product built without it is a common and expensive rewrite.' },
      { title: 'Leave out what can safely wait', text: 'Advanced reporting, integrations, white-labelling and mobile apps can usually follow once customers are using the core workflow. Keep a written list of what you deferred and why. Spend the time saved on onboarding, error tracking and basic analytics, which tell you whether the MVP is working.' },
    ],
    service: 'saas',
    serviceLabel: 'Explore SaaS development',
  },
  {
    slug: 'scope-a-software-project',
    title: 'How to scope a software project before development',
    description: 'Scope a software project before you commit budget: define outcomes, users, constraints and integrations, surface risks early, and agree what done means.',
    category: 'Delivery guide',
    sections: [
      { title: 'Write down the outcome, not the feature list', text: 'Begin with the change you want: fewer manual steps, a new revenue line, a faster process for a specific team. Then list the features that might deliver it. Starting from the outcome makes it easier to cut scope later without losing the reason the project exists.' },
      { title: 'Name the users and their main journeys', text: 'For each type of user, describe the few journeys they must be able to complete. These journeys become the backbone of design, estimates and testing. If a feature does not support one of them, question whether it belongs in the first release.' },
      { title: 'List integrations and constraints early', text: 'Most surprises in delivery come from systems outside the project: a payment provider, an old database, a single sign-on requirement, a compliance rule. List every system the software must talk to, who owns it and how it can be accessed. Unknowns here deserve a short technical spike before anyone commits to a date.' },
      { title: 'Make risks and assumptions explicit', text: 'Record what you are assuming about data, users, traffic and third parties, and what happens to the plan if each assumption is wrong. A good estimate states its assumptions openly. A partner who cannot tell you what would make their estimate wrong has not finished scoping.' },
      { title: 'Agree what done means', text: 'Define acceptance criteria for each journey, the quality checks a release must pass, and what is handed over at the end: code, infrastructure, documentation and access. Agreeing this before development starts prevents the most common late-project argument, which is about what was actually promised.' },
    ],
    service: 'end-to-end-development',
    serviceLabel: 'Explore end-to-end software development',
  },
]

export function readingMinutes(article: Resource) {
  const words = [article.description, ...article.sections.map((section) => section.text)]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}
