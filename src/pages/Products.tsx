import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { pageMetadata } from '../seoData'
import { products } from '../pagesData'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const fadeScale = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

export default function Products() {
  const reduceMotion = Boolean(useReducedMotion())
  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: { once: true, amount: 0.28 },
        variants: fadeUp,
        transition: { duration: 0.7, ease },
      }

  return (
    <>
      <Seo
        title={pageMetadata['/products'].title}
        description={pageMetadata['/products'].description}
        path="/products"
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
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {products.map((product) => (
              <motion.article
                key={product.id}
                className="product-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <Link to={`/products/${product.id}`} className="service-card-link">
                  <p className="product-status">{product.status}</p>
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
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease }}
          >
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
