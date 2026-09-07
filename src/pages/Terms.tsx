import { Seo } from '../components/Seo'
import { CONTACT_EMAIL } from '../data'

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | Universal Technologies"
        description="The terms that govern use of the Universal Technologies website and the engagements described on it."
        path="/terms"
      />

      <section className="section" aria-labelledby="terms-title">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Legal</p>
            <h1 className="section-title" id="terms-title">
              Terms of Service
            </h1>
            <p className="section-lead">Last updated September 2026.</p>
          </div>

          <div className="legal-doc">
            <p>
              These terms govern your use of universal-technologies.com (the "site"), operated by
              Universal Technologies ("we," "us"). By using the site, you agree to them.
            </p>

            <h2>Site content</h2>
            <p>
              Content on this site — including service descriptions, pricing indications, and
              case material — is provided for general information and does not itself form a
              contract. A specific engagement with us is governed by its own signed agreement,
              which takes precedence over anything described here.
            </p>

            <h2>Using this site</h2>
            <p>
              You agree not to misuse the site: no attempting to disrupt it, scrape it at a rate
              that degrades service, or use it to submit unlawful, fraudulent, or abusive content
              through our contact or careers forms.
            </p>

            <h2>Submitted information</h2>
            <p>
              Anything you submit through the contact or careers forms — including a resume or
              cover letter — must be accurate and yours to share. See our{' '}
              <a href="/privacy-policy">Privacy Policy</a> for how that information is used.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The site's design, text, and branding belong to Universal Technologies or its
              licensors. Nothing on this site grants you a license to reuse it beyond viewing the
              site for its intended purpose.
            </p>

            <h2>No warranty</h2>
            <p>
              The site is provided "as is." We don't guarantee it will be uninterrupted,
              error-free, or that any timelines, figures, or outcomes described on it will apply
              to your specific project without a signed statement of work.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, Universal Technologies is not liable for indirect
              or consequential damages arising from your use of this site. This section doesn't
              limit liability under a separate signed client agreement, which governs on its own
              terms.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms from time to time. Continued use of the site after a
              change means you accept the updated terms.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
