import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { services } from '../data'
import { pageMetadata } from '../seoData'
import { productStatusInfo, products } from '../pagesData'

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

  return (
    <>
      <Seo
        title={meta?.title ?? `${product.name} | Universal Technologies`}
        description={meta?.description ?? product.description}
        path={path}
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
          <p className="product-audience">{product.audience}</p>
          <p>{product.description}</p>

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
