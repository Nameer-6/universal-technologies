import { Link, Navigate, useParams } from 'react-router-dom'
import { SITE_URL, Seo } from '../components/Seo'
import { services } from '../data'
import { pageMetadata } from '../seoData'
import { productStatusInfo, products } from '../pagesData'
import { productVisuals } from '../components/ProductArt'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  const path = `/products/${product.id}`
  const meta = pageMetadata[path]
  const status = productStatusInfo[product.status]
  const relatedService = services.find((service) => service.id === product.relatedService)
  const otherProducts = products.filter((item) => item.id !== product.id).slice(0, 3)
  const Visual = productVisuals[product.id]
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: product.name,
      description: product.description,
      url: `${SITE_URL}${path}`,
      applicationCategory: product.applicationCategory,
      keywords: product.tags.join(', '),
      audience: { '@type': 'Audience', audienceType: product.audience },
      publisher: { '@type': 'Organization', name: 'Universal Technologies', url: SITE_URL },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: product.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ]

  return (
    <>
      <Seo
        title={meta?.title ?? `${product.name} | Universal Technologies`}
        description={meta?.description ?? product.description}
        path={path}
        jsonLd={jsonLd}
        breadcrumbs={[
          { name: 'Products', path: '/products' },
          { name: product.name, path },
        ]}
      />

      <article className="section">
        <div className="container article-page">
          <p className="section-label">
            <Link to="/products">← Products</Link>
            {' · '}
            {product.status}
          </p>
          <h1 className="section-title">{product.name}</h1>
          <p className="section-lead">{product.tagline}</p>
          {Visual && (
            <div className="pf-frame pd-hero-visual">
              <p className="hx-chip pf-frame-chip">
                <i aria-hidden="true" /> {product.name} · how it works
              </p>
              <div className="hx-outcome-visual">
                <Visual />
              </div>
            </div>
          )}
          <p className="product-audience">{product.audience}</p>
          <p>{product.description}</p>

          <h2>The problem</h2>
          {product.problem.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <h2>How {product.name} works</h2>
          <ol>
            {product.howItWorks.map((step) => (
              <li key={step.title}>
                <strong>{step.title}.</strong> {step.text}
              </li>
            ))}
          </ol>

          <h2>Use cases</h2>
          <ul>
            {product.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>

          <h2>Who {product.name} is for</h2>
          <p>{product.fit}</p>

          <h2>How we use it on engagements</h2>
          <p>{product.onEngagements}</p>

          <h2>Capabilities</h2>
          <ul className="product-caps">
            {product.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>

          <h2>Status: {product.status}</h2>
          <p>{status.meaning}</p>
          <p>{status.engage}</p>

          {relatedService && (
            <p>
              Related service:{' '}
              <Link className="contact-email" to={`/services/${relatedService.id}`}>
                {relatedService.title} <span aria-hidden>→</span>
              </Link>
            </p>
          )}

          <h2>Frequently asked questions</h2>
          <div className="svc-faq">
            {product.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>

          <div className="hero-actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn-ink" to="/contact">
              Request a demo <span aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost-ink" to="/products">
              All products
            </Link>
          </div>

          {otherProducts.length > 0 && (
            <div className="related-reading">
              <h2>More products</h2>
              {otherProducts.map((item) => (
                <Link key={item.id} to={`/products/${item.id}`}>
                  {item.name} — {item.tagline} <span aria-hidden>→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  )
}
