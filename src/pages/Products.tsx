import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
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
      <section className="section" aria-labelledby="products-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Products</p>
            <h1 className="section-title" id="products-title">
              A few things we've built and kept running
            </h1>
            <p className="section-lead">
              Internal tools we productized after using them on client engagements. (Placeholder
              copy — replace with your real product lineup.)
            </p>
          </motion.div>

          <motion.div
            className="service-grid"
            variants={reduceMotion ? undefined : stagger}
            initial={reduceMotion ? undefined : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.12 }}
          >
            {products.map((product) => (
              <motion.article
                key={product.id}
                className="service-card"
                variants={reduceMotion ? undefined : fadeScale}
                whileHover={
                  reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }
                }
              >
                <div className="service-top">
                  <span>{product.mark}</span>
                  <h3>{product.name}</h3>
                </div>
                <p>
                  <strong>{product.tagline}.</strong> {product.description}
                </p>
                <div className="stack-row">
                  {product.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
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
            Book a walkthrough <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  )
}
