import { Seo } from '../components/Seo'
import { CONTACT_EMAIL } from '../data'
import { companyFacts } from '../companyFacts'
import { pageMetadata } from '../seoData'

const { legalEntity } = companyFacts

export default function PrivacyPolicy() {
  return (
    <>
      <Seo
        title={pageMetadata['/privacy-policy'].title}
        description={pageMetadata['/privacy-policy'].description}
        path="/privacy-policy"
        breadcrumbs={[{ name: 'Privacy Policy', path: '/privacy-policy' }]}
      />

      <section className="section" aria-labelledby="privacy-title">
        <div className="container">
          <div className="section-head center">
            <p className="section-label">Legal</p>
            <h1 className="section-title" id="privacy-title">
              Privacy Policy
            </h1>
            <p className="section-lead">Last updated September 2026.</p>
          </div>

          <div className="legal-doc">
            <p>
              This policy explains what information Universal Technologies ("we," "us") collects
              through universal-technologies.com, how we use it, and how you can reach us about
              it.
            </p>
            {legalEntity && (
              <p>
                The data controller is {legalEntity.name}, {legalEntity.registeredAddress}.
              </p>
            )}

            <h2>Information we collect</h2>
            <p>We collect information you provide directly to us:</p>
            <ul>
              <li>
                <strong>Contact form.</strong> Name, email address, company, service of interest,
                and the message you submit.
              </li>
              <li>
                <strong>Job applications.</strong> Name, email address, phone number, resume or
                CV file, and any cover letter or additional details you include.
              </li>
            </ul>
            <p>
              We do not use tracking cookies, advertising pixels, or third-party analytics
              scripts on this site.
            </p>

            <h2>Fonts and local storage</h2>
            <p>
              Typefaces are served from this site itself, so loading a page does not send a font
              request to a third party. We store a single preference — your light/dark theme
              choice — in your browser's local storage; this stays on your device and is never
              sent to us.
            </p>

            <h2>How we use it</h2>
            <p>We use the information you submit to:</p>
            <ul>
              <li>Respond to project inquiries and follow up on the service you asked about.</li>
              <li>Evaluate job applications and contact candidates about open roles.</li>
              <li>Keep records needed to run our business and comply with legal obligations.</li>
            </ul>
            <p>We do not sell your information, and we do not share it for advertising purposes.</p>

            <h2>How it's processed</h2>
            <p>
              Both forms on this site deliver submissions by email through FormSubmit, a
              third-party form-delivery service. Your submission passes through FormSubmit's
              infrastructure on its way to our inbox; we don't store form submissions in a
              database of our own beyond the resulting email.
            </p>

            <h2>Service providers</h2>
            <p>
              The only third party that handles data you submit is FormSubmit, which delivers the
              contact and application forms to our email inbox as described above. Attachments
              such as a resume travel through the same service. If you would rather not use a
              web form, you can email us directly at the address below.
            </p>

            <h2>Data retention</h2>
            <p>
              We keep contact and application emails for as long as reasonably necessary to
              respond to your inquiry or consider your application, and afterward only as needed
              for legitimate business or legal record-keeping.
            </p>

            <h2>Your choices</h2>
            <p>
              You can ask us to access, correct, or delete personal information you've submitted
              to us by emailing the address below. We'll respond within a reasonable time.
            </p>

            <h2>Contact us</h2>
            <p>
              Questions about this policy or a request about your data can be sent to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy as our practices or applicable law change. Material
              changes will be reflected by updating the date at the top of this page.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
