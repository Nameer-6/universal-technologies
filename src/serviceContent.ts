export const serviceContent: Record<string, { opener: string; faqs: { question: string; answer: string }[] }> = {
  'ai-agents': {
    opener: 'For teams whose work spans documents, business tools, and repeated decisions. We build AI agents that retrieve information and take scoped actions, with evaluation and human review designed into the workflow.',
    faqs: [
      { question: 'What is the difference between an AI agent and a chatbot?', answer: 'A chatbot primarily answers questions. An AI agent can take multi-step action: looking up information, calling tools or APIs, and completing a task, with a person able to review or approve along the way.' },
      { question: 'How long does it take to build a production AI agent?', answer: 'Timing depends on the workflow, integrations, data access, and review requirements. We scope a focused first workflow with you, agree on evaluation criteria, and estimate a pilot before committing to a production rollout.' },
      { question: 'How do you control what an agent can do?', answer: 'We define tool permissions, approval steps, and fallback paths during scoping. Evaluations check expected behavior before release, and monitoring helps your team review failures, latency, and cost after launch.' },
    ],
  },
  qa: {
    opener: 'For product teams whose releases are slowed by manual regression or unreliable tests. We audit coverage, prioritize critical user journeys, and build maintainable test suites that fit your release process.',
    faqs: [
      { question: 'What is a QA automation framework?', answer: 'A QA automation framework is the shared structure a team uses to write, run, and maintain tests consistently. It includes test organization, reusable functions, test data, and reporting so every test does not have to start from scratch.' },
      { question: 'Do you offer dedicated QA engineers or project-based testing?', answer: 'Both. Dedicated QA engineers can work alongside your team for ongoing coverage, or we can scope testing around a specific release or migration.' },
      { question: 'Can you test an existing codebase, or only new builds?', answer: 'We can work on existing products as well as new builds. The first step is an audit of current coverage and release risks before we recommend a testing plan.' },
    ],
  },
  devops: {
    opener: 'For teams facing slow deployments, inconsistent environments, or limited visibility into production. We improve CI/CD, infrastructure, and monitoring around your existing systems, with runbooks your team can use after handoff.',
    faqs: [
      { question: 'What does a DevOps consulting engagement include?', answer: 'We start by auditing your CI/CD and infrastructure, identify bottlenecks, then scope pipeline automation, infrastructure as code, and monitoring. Documentation and handoff are included so your team can maintain the changes.' },
      { question: 'Do we need to migrate our existing cloud provider?', answer: 'Not necessarily. We review your current cloud setup and work within it where it fits your needs. A migration should address a specific cost, reliability, or operational problem and is agreed during scoping.' },
    ],
  },
  'workflow-automation': {
    opener: 'For operations teams moving the same data between CRM, support, finance, and internal systems by hand. We map your process and build integrations with clear exception handling, monitoring, and ownership.',
    faqs: [
      { question: 'Which workflows should we automate first?', answer: 'Start with repeatable work that has clear rules, frequent volume, and a measurable cost in time or errors. We map the steps and exceptions before choosing a first workflow.' },
      { question: 'Can people review an automated workflow?', answer: 'Yes. Approval steps and exception queues keep judgment calls with your team. We define who receives an exception, what context they need, and how the workflow resumes.' },
      { question: 'Can you connect the tools we already use?', answer: 'We review your tools’ APIs, webhooks, permissions, and data formats during discovery. That review determines which integrations are feasible and whether a custom connector is needed.' },
    ],
  },
  saas: {
    opener: 'For teams launching a subscription product or growing beyond an early MVP. We bring tenant architecture, billing, permissions, and full-stack engineering into one delivery plan so core product decisions are made together.',
    faqs: [
      { question: 'Can you start with an MVP and expand later?', answer: 'Yes. We define a first release around a core user journey while making explicit decisions about tenancy, access, and billing. Later features are prioritized using feedback from the released product.' },
      { question: 'Can you improve an existing SaaS product?', answer: 'Yes. We first review the codebase, infrastructure, and product constraints, then agree on an incremental plan for the areas that need work.' },
      { question: 'Who owns the code and infrastructure?', answer: 'Ownership, repository access, hosting accounts, and handoff responsibilities are defined in the engagement agreement. We discuss these before development begins so your team knows what it will operate.' },
    ],
  },
  'end-to-end-development': {
    opener: 'For teams that need a product release owned from discovery through launch. Design, engineering, QA, and deployment share one backlog and delivery lead, with a support and handoff plan agreed before release.',
    faqs: [
      { question: 'What does end-to-end development cover?', answer: 'An engagement can include discovery, technical scoping, UX/UI design, engineering, testing, deployment, and post-launch support. We agree the deliverables and boundaries in the scope of work.' },
      { question: 'How will we see progress?', answer: 'We use a shared backlog, regular working-software demos, and clear acceptance criteria. Feedback informs the next delivery slice, and changes to scope or timing are discussed with you.' },
      { question: 'What happens after launch?', answer: 'We agree a handoff and support plan covering documentation, environments, monitoring, and the next backlog. Ongoing support responsibilities and availability are defined for your engagement.' },
    ],
  },
}
