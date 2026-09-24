export type ServiceContent = {
  opener: string
  /** Service-specific outcomes (audit CON-05 / UX-06) — replaces the generic three shared across every page. */
  outcomes: { title: string; text: string }[]
  faqs: { question: string; answer: string }[]
}

export const serviceContent: Record<string, ServiceContent> = {
  'ai-agents': {
    opener: 'For teams whose work spans documents, business tools, and repeated decisions. We build AI agents that retrieve information and take scoped actions, with evaluation and human review designed into the workflow.',
    outcomes: [
      { title: 'Scoped actions, not open-ended autonomy', text: 'Tool permissions, approval steps, and fallback paths are agreed during scoping, so the agent acts inside limits your team has signed off.' },
      { title: 'Evaluated before release', text: 'Evaluation criteria are set up front and checked before each release, so behavior is tested rather than assumed.' },
      { title: 'Observable after launch', text: 'Monitoring on failures, latency, and cost gives your team what it needs to review the agent and improve it.' },
    ],
    faqs: [
      { question: 'What is the difference between an AI agent and a chatbot?', answer: 'A chatbot primarily answers questions. An AI agent can take multi-step action: looking up information, calling tools or APIs, and completing a task, with a person able to review or approve along the way.' },
      { question: 'How long does it take to build a production AI agent?', answer: 'Timing depends on the workflow, integrations, data access, and review requirements. We scope a focused first workflow with you, agree on evaluation criteria, and estimate a pilot before committing to a production rollout.' },
      { question: 'How is our data handled in an AI project?', answer: 'Data handling is agreed in writing before build. During scoping we settle which model provider and deployment option is used and what its retention and training terms are, what personal or sensitive data may reach a model, which tools the agent can call, where a person approves an action, and what is logged for audit. We can work with the providers and environments your security team already approves.' },
      { question: 'How do you control what an agent can do?', answer: 'We define tool permissions, approval steps, and fallback paths during scoping. Evaluations check expected behavior before release, and monitoring helps your team review failures, latency, and cost after launch.' },
    ],
  },
  qa: {
    opener: 'For product teams whose releases are slowed by manual regression or unreliable tests. We audit coverage, prioritize critical user journeys, and build maintainable test suites that fit your release process.',
    outcomes: [
      { title: 'Critical journeys covered first', text: 'We audit current coverage and start with the user journeys that would cost you the most if they broke.' },
      { title: 'Tests that gate the merge', text: 'Automated checks run in CI, so regressions surface before release instead of in production.' },
      { title: 'A suite your team can maintain', text: 'A shared framework, test data, and reporting mean the suite keeps working after our engagement ends.' },
    ],
    faqs: [
      { question: 'What is a QA automation framework?', answer: 'A QA automation framework is the shared structure a team uses to write, run, and maintain tests consistently. It includes test organization, reusable functions, test data, and reporting so every test does not have to start from scratch.' },
      { question: 'Do you offer dedicated QA engineers or project-based testing?', answer: 'Both. Dedicated QA engineers can work alongside your team for ongoing coverage, or we can scope testing around a specific release or migration.' },
      { question: 'Can you test an existing codebase, or only new builds?', answer: 'We can work on existing products as well as new builds. The first step is an audit of current coverage and release risks before we recommend a testing plan.' },
    ],
  },
  devops: {
    opener: 'For teams facing slow deployments, inconsistent environments, or limited visibility into production. We improve CI/CD, infrastructure, and monitoring around your existing systems, with runbooks your team can use after handoff.',
    outcomes: [
      { title: 'Deployments that are routine', text: 'Automated pipelines and reviewed infrastructure changes make releases repeatable instead of eventful.' },
      { title: 'Visibility into production', text: 'Monitoring and alerting sized to your traffic show what is happening before customers report it.' },
      { title: 'Runbooks your team can use', text: 'Documentation and handoff are part of the scope, so your engineers can operate the platform without us.' },
    ],
    faqs: [
      { question: 'What does a DevOps consulting engagement include?', answer: 'We start by auditing your CI/CD and infrastructure, identify bottlenecks, then scope pipeline automation, infrastructure as code, and monitoring. Documentation and handoff are included so your team can maintain the changes.' },
      { question: 'Do we need to migrate our existing cloud provider?', answer: 'Not necessarily. We review your current cloud setup and work within it where it fits your needs. A migration should address a specific cost, reliability, or operational problem and is agreed during scoping.' },
    ],
  },
  'workflow-automation': {
    opener: 'For operations teams moving the same data between CRM, support, finance, and internal systems by hand. We map your process and build integrations with clear exception handling, monitoring, and ownership.',
    outcomes: [
      { title: 'Repeatable work handled by the pipeline', text: 'We map the process you actually run, then automate the steps with clear rules and volume.' },
      { title: 'Exceptions reach a person', text: 'Approval steps and exception queues keep judgment calls with your team, with the context they need.' },
      { title: 'Integrations with clear ownership', text: 'Each connection between your CRM, support, and finance tools has a named owner and monitoring.' },
    ],
    faqs: [
      { question: 'Which workflows should we automate first?', answer: 'Start with repeatable work that has clear rules, frequent volume, and a measurable cost in time or errors. We map the steps and exceptions before choosing a first workflow.' },
      { question: 'Can people review an automated workflow?', answer: 'Yes. Approval steps and exception queues keep judgment calls with your team. We define who receives an exception, what context they need, and how the workflow resumes.' },
      { question: 'Can you connect the tools we already use?', answer: 'We review your tools’ APIs, webhooks, permissions, and data formats during discovery. That review determines which integrations are feasible and whether a custom connector is needed.' },
    ],
  },
  saas: {
    opener: 'For teams launching a subscription product or growing beyond an early MVP. We bring tenant architecture, billing, permissions, and full-stack engineering into one delivery plan so core product decisions are made together.',
    outcomes: [
      { title: 'Tenancy, access, and billing decided together', text: 'Core architecture choices are made in one plan, before they turn into rework.' },
      { title: 'A first release around a core journey', text: 'We define an MVP around one user journey, then prioritize later features from real product feedback.' },
      { title: 'Ownership defined in writing', text: 'Repository access, hosting accounts, and handoff responsibilities are agreed before development begins.' },
    ],
    faqs: [
      { question: 'Can you start with an MVP and expand later?', answer: 'Yes. We define a first release around a core user journey while making explicit decisions about tenancy, access, and billing. Later features are prioritized using feedback from the released product.' },
      { question: 'Can you improve an existing SaaS product?', answer: 'Yes. We first review the codebase, infrastructure, and product constraints, then agree on an incremental plan for the areas that need work.' },
      { question: 'Who owns the code and infrastructure?', answer: 'Ownership, repository access, hosting accounts, and handoff responsibilities are defined in the engagement agreement. We discuss these before development begins so your team knows what it will operate.' },
    ],
  },
  'end-to-end-development': {
    opener: 'For teams that need a product release owned from discovery through launch. Design, engineering, QA, and deployment share one backlog and delivery lead, with a support and handoff plan agreed before release.',
    outcomes: [
      { title: 'One backlog, one delivery lead', text: 'Design, engineering, QA, and deployment share a single plan, so questions do not bounce between vendors.' },
      { title: 'Progress you can see', text: 'Regular working-software demos and clear acceptance criteria keep stakeholders informed as scope evolves.' },
      { title: 'A planned handoff', text: 'Documentation, environments, monitoring, and the next backlog are agreed before release.' },
    ],
    faqs: [
      { question: 'What does end-to-end development cover?', answer: 'An engagement can include discovery, technical scoping, UX/UI design, engineering, testing, deployment, and post-launch support. We agree the deliverables and boundaries in the scope of work.' },
      { question: 'How will we see progress?', answer: 'We use a shared backlog, regular working-software demos, and clear acceptance criteria. Feedback informs the next delivery slice, and changes to scope or timing are discussed with you.' },
      { question: 'What happens after launch?', answer: 'We agree a handoff and support plan covering documentation, environments, monitoring, and the next backlog. Ongoing support responsibilities and availability are defined for your engagement.' },
    ],
  },
}
