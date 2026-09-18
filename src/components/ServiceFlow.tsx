const FLOWS: Record<string, { label: string; steps: string[] }> = {
  'ai-agents': {
    label: 'How an agent stays in its lane',
    steps: ['User', 'Agent', 'RAG', 'Tool', 'Human approval', 'Result'],
  },
  'workflow-automation': {
    label: 'Handoffs replaced by a pipeline',
    steps: ['Manual request', 'Queue', 'Automate', 'Exception', 'Done'],
  },
  qa: {
    label: 'Release quality before merge',
    steps: ['Web', 'API', 'Mobile', 'Accessibility', 'Performance'],
  },
  devops: {
    label: 'Path from commit to production',
    steps: ['Developer', 'CI', 'Tests', 'Container', 'Staging', 'Production', 'Monitoring'],
  },
  saas: {
    label: 'Multi-tenant product core',
    steps: ['Tenants', 'RBAC', 'Billing', 'Data isolation', 'Product'],
  },
  'end-to-end-development': {
    label: 'One team, discovery through operate',
    steps: ['Discovery', 'UX', 'Engineering', 'QA', 'Release', 'Operate'],
  },
}

export const RELATED_SERVICES: Record<string, string[]> = {
  'ai-agents': ['workflow-automation', 'saas', 'qa'],
  'workflow-automation': ['ai-agents', 'end-to-end-development', 'devops'],
  qa: ['devops', 'end-to-end-development', 'saas'],
  devops: ['qa', 'end-to-end-development', 'saas'],
  saas: ['end-to-end-development', 'qa', 'ai-agents'],
  'end-to-end-development': ['saas', 'qa', 'devops'],
}

export function ServiceFlow({ serviceId }: { serviceId: string }) {
  const flow = FLOWS[serviceId]
  if (!flow) return null

  return (
    <div className="svc-flow">
      <p className="svc-flow-label">{flow.label}</p>
      <ol className="svc-flow-steps">
        {flow.steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const DELIVERY_ECOSYSTEM = [
  'Product',
  'AI / Automation',
  'QA gate',
  'Cloud',
  'Production',
]
