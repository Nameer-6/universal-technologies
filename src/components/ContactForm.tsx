import { Link } from 'react-router-dom'
import { CONTACT_EMAIL, PRIMARY_CTA, RESPONSE_PROMISE, services } from '../data'
import { useContactForm } from '../hooks/useContactForm'

export function ContactForm() {
  const { status, errors, onSubmit } = useContactForm()

  if (status === 'success') {
    return (
      <div className="contact-success" role="status">
        <h3>Thanks — your brief is with our team.</h3>
        <p>
          We’ll reply {RESPONSE_PROMISE} and follow up if a discovery call is the right next step.
        </p>
        <Link className="btn btn-ink" to="/">
          Return home <span aria-hidden>→</span>
        </Link>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label>
          Full name
          <input
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
          />
          {errors.name && (
            <span className="field-error" id="contact-name-error">
              {errors.name}
            </span>
          )}
        </label>
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email && (
            <span className="field-error" id="contact-email-error">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <div className="form-row">
        <label>
          Company
          <input name="company" type="text" autoComplete="organization" />
        </label>
        <label>
          Service interest
          <select name="service" defaultValue={services[0].title}>
            {services.map((service) => (
              <option key={service.id} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Multiple services">Multiple services</option>
          </select>
        </label>
      </div>
      <label>
        Project details
        <textarea
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message && (
          <span className="field-error" id="contact-message-error">
            {errors.message}
          </span>
        )}
      </label>
      <input
        type="checkbox"
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="apply-honeypot"
      />
      <button
        className="btn btn-ink"
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
      >
        {status === 'submitting' ? 'Sending…' : PRIMARY_CTA}{' '}
        <span aria-hidden>→</span>
      </button>
      {status === 'error' && (
        <p className="form-note error" role="alert">
          Something went wrong. Your details are still here — try again, or email us at{' '}
          {CONTACT_EMAIL}.
        </p>
      )}
    </form>
  )
}
