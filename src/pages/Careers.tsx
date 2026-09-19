import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { HR_EMAIL } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { pageMetadata } from '../seoData'
import { jobOpenings, hiringSteps, perks } from '../pagesData'

export default function Careers() {
  const { reveal, hero, heroFollow, list, item, inView } = usePageMotion()
  const featuredJob = jobOpenings.find((job) => job.featured) ?? jobOpenings[0]
  const otherJobs = jobOpenings.filter((job) => job.id !== featuredJob?.id)

  return (
    <div className="careers-page">
      <Seo
        title={pageMetadata['/careers'].title}
        description={pageMetadata['/careers'].description}
        path="/careers"
      />

      <section className="section careers-hero" aria-labelledby="careers-title">
        <div className="container">
          <motion.div
            className="careers-hero-inner"
            {...hero}
          >
            <p className="section-label">Careers</p>
            <h1 className="careers-hero-title" id="careers-title">
              Own something real, from your first week.
            </h1>
            <p className="careers-hero-lead">
              We hire senior people and hand them real ownership: their own features, their own
              client conversations, and a real say in how the team works — not a seat on someone
              else's roadmap.
            </p>
            <div className="hero-actions careers-hero-actions">
              <a className="btn btn-ink" href="#openings">
                View openings <span aria-hidden>→</span>
              </a>
              <a className="btn btn-ghost-ink" href={`mailto:${HR_EMAIL}`}>
                Email your resume
              </a>
            </div>
          </motion.div>

          <motion.div
            className="careers-path-wrap"
            {...heroFollow}
          >
            <p className="careers-path-label">What happens after you apply</p>
            <ol className="careers-path">
              {hiringSteps.map((step) => (
                <li key={step.step}>
                  <span>{step.step}</span>
                  <strong>{step.title}</strong>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </section>

      <section className="section band" id="openings" aria-labelledby="openings-title">
        <div className="container">
          <motion.div className="section-head split" {...reveal}>
            <div>
              <p className="section-label">Open roles</p>
              <h2 className="section-title" id="openings-title">
                {jobOpenings.length} openings this quarter
              </h2>
            </div>
            <p className="section-lead">
              Don't see your role? Email {HR_EMAIL} — we read every note.
            </p>
          </motion.div>

          {featuredJob && (
            <motion.div {...inView}>
              <Link to={`/careers/${featuredJob.id}`} className="job-featured">
                <span className="job-featured-badge">Featured role</span>
                <div className="job-featured-body">
                  <div>
                    <h3>{featuredJob.title}</h3>
                    <p>{featuredJob.summary}</p>
                  </div>
                  <div className="job-featured-meta">
                    <div className="stack-row">
                      <span>{featuredJob.team}</span>
                      <span>{featuredJob.location}</span>
                      <span>{featuredJob.type}</span>
                    </div>
                    <span className="job-featured-cta">
                      View role <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <motion.div
            className="job-card-grid"
            {...list}
          >
            {otherJobs.map((job) => (
              <motion.div key={job.id} variants={item}>
                <Link to={`/careers/${job.id}`} className="job-card">
                  <span className="job-card-team">{job.team}</span>
                  <h3>{job.title}</h3>
                  <p>{job.summary}</p>
                  <div className="stack-row">
                    <span>{job.location}</span>
                    <span>{job.type}</span>
                  </div>
                  <span className="job-card-cta">
                    View role <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section" aria-labelledby="perks-title">
        <div className="container">
          <motion.div className="section-head center" {...reveal}>
            <p className="section-label">Why Universal</p>
            <h2 className="section-title" id="perks-title">
              What you get, beyond salary
            </h2>
          </motion.div>

          <motion.div
            className="perk-grid"
            {...list}
          >
            {perks.map((item, index) => (
              <motion.article
                key={item.step}
                className="perk-card"
                variants={item}
              >
                <span className="perk-index">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <em>{item.detail}</em>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-band" aria-labelledby="careers-cta-title">
        <div className="container cta-inner">
          <motion.div {...inView}>
            <h2 id="careers-cta-title">Don't see the right role?</h2>
            <p>Send us your resume anyway — we keep a shortlist for the next opening.</p>
          </motion.div>
          <a className="btn btn-light" href={`mailto:${HR_EMAIL}`}>
            Email your resume <span aria-hidden>→</span>
          </a>
        </div>
      </section>
    </div>
  )
}
