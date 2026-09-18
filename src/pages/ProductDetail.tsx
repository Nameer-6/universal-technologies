import { Link, Navigate, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { products } from '../pagesData'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((item) => item.id === id)

  if (!product) {
    return <Navigate to="/products" replace />
  }

  return (
    <>
      <Seo
        title={`${product.name} | Universal Technologies`}
        description={product.description}
        path={`/products/${product.id}`}
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
          <div className="hero-actions" style={{ marginTop: '2rem' }}>
            <Link className="btn btn-ink" to="/contact">
              Request a demo <span aria-hidden>→</span>
            </Link>
            <Link className="btn btn-ghost-ink" to="/products">
              All products
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
