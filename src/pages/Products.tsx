import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { productStatusInfo, products } from '../pagesData'

export default function Products() {
  const { reveal, list, item, cardHover, inView } = usePageMotion()

  return (
    <>
      <Seo
        title={pageMetadata['/products'].title}
        description={pageMetadata['/products'].description}
        path="/products"
        breadcrumbs={[{ name: 'Products', path: '/products' }]}
      />

      <section className="section" aria-labelledby="products-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Products</p>
            <h1 className="section-title" id="products-title">
              A few things we've built and kept running
            </h1>
            <p className="section-lead">
              Internal tools we built to solve real problems on client engagements, then
              productized once other teams asked for them.
            </p>
          </motion.div>

          <motion.div
            className="product-grid"
            {...list}
          >
            {products.map((product) => (
              <motion.article
                key={product.id}
                className="product-card"
                variants={item}
                whileHover={cardHover}
              >
                <Link to={`/products/${product.id}`} className="service-card-link">
                  <p className="product-status">{product.status}</p>
                  <p className="product-audience">{productStatusInfo[product.status].meaning}</p>
                  <div className="service-top">
                    <span>{product.mark}</span>
                    <h2>{product.name}</h2>
                  </div>
                  <p>
                    <strong>{product.tagline}.</strong> {product.description}
                  </p>
                  <p className="product-audience">{product.audience}</p>
                  <ul className="product-caps">
                    {product.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="card-affordance">
                    Explore product <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="products-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="products-cta-title">Want a walkthrough?</h2>
            <p>We'll show you the product live and talk through fit for your team.</p>
          </motion.div>
          <Link className="btn btn-light" to="/contact">
            Request a demo <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
