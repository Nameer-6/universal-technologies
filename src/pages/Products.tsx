import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { products } from '../pagesData'
import { ProductCard } from '../components/ProductArt'

export default function Products() {
  const { reveal, inView, reduceMotion } = usePageMotion()
  const stagger = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { duration: 0.6, delay: index * 0.08 },
        }

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
              A few things we've built <span className="hx-muted">and kept running</span>
            </h1>
            <p className="section-lead">
              Internal tools we built to solve real problems on client engagements, then
              productized once other teams asked for them.
            </p>
          </motion.div>

          <div className="hx-products pr-grid">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} as="h2" motionProps={stagger(index)} />
            ))}
          </div>
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
