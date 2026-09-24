import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CONTACT_EMAIL } from '../data'
import { ClientMarquee } from './ClientMarquee'
import {
  dialCodes,
  projectStages,
  referralSources,
  serviceChoices,
  timelines,
  type Option,
} from '../bookCallData'

type Step = 1 | 2 | 3
type Status = 'idle' | 'submitting' | 'success' | 'error'
type Errors = Record<string, string>

const emptyDetails = { stage: '', timeline: '', notes: '' }
const emptyContact = { fullName: '', workEmail: '', company: '', country: 'US', phone: '', referral: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const labelOf = (options: Option[], value: string) =>
  options.find((option) => option.value === value)?.label ?? ''

function Arrow() {
  return (
    <svg className="bc-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4 10h11m0 0-4.5-4.5M15 10l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p className="bc-error" id={id} role="alert">
      {message}
    </p>
  )
}

function RadioGroup({
  id,
  legend,
  options,
  value,
  onChange,
  error,
}: {
  id: string
  legend: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  error?: string
}) {
  return (
    <fieldset className="bc-fieldset" id={`bc-field-${id}`} tabIndex={-1} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="bc-legend">{legend}</legend>
      <div className="bc-chips">
        {options.map((option) => {
          const checked = value === option.value
          return (
            <label key={option.value} className={`bc-chip bc-chip-radio${checked ? ' is-checked' : ''}`}>
              <input type="radio" name={id} checked={checked} onChange={() => onChange(option.value)} />
              <span className="bc-chip-dot" aria-hidden="true" />
              {option.label}
            </label>
          )
        })}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  )
}

function Notes({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="bc-fieldset">
      <label className="bc-legend" htmlFor={id}>
        Anything you want us to know? <span className="bc-optional">(Optional)</span>
      </label>
      <textarea
        id={id}
        className="bc-input bc-textarea"
        rows={3}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="A sentence or two about the project, timeline, or goal..."
      />
    </div>
  )
}

export function BookCallWizard() {
  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState<string | null>(null)
  const [details, setDetails] = useState(emptyDetails)
  const [contact, setContact] = useState(emptyContact)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')
  const [briefOpen, setBriefOpen] = useState(false)

  const panelRef = useRef<HTMLDivElement>(null)
  const mounted = useRef(false)
  const done = status === 'success'
  const config = serviceChoices.find((item) => item.id === service) ?? null
  const dial = dialCodes.find((item) => item.code === contact.country) ?? dialCodes[0]

  // Move focus to the panel when the step changes so keyboard and screen reader
  // users land on the new content. Skipped on first render so the page doesn't
  // steal focus or scroll on load.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    panelRef.current?.focus({ preventScroll: true })
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [step, done])

  // Everything picked in step 2, shown live in the sidebar as tags.
  const requirementTags = [
    labelOf(projectStages, details.stage) && `Stage: ${labelOf(projectStages, details.stage)}`,
    labelOf(timelines, details.timeline) && `Timeline: ${labelOf(timelines, details.timeline)}`,
  ].filter(Boolean)

  const briefItems: {
    key: string
    label: string
    text: string
    tags?: string[]
    state: 'done' | 'active' | 'pending'
  }[] = [
    {
      key: 'service',
      label: 'SERVICE',
      text: config ? config.title : 'Choose what you need',
      state: done || step > 1 ? 'done' : 'active',
    },
    {
      key: 'requirements',
      label: 'REQUIREMENTS',
      text: step > 2 || done ? 'Details added' : 'Add a few project details',
      tags: requirementTags,
      state: done || step > 2 ? 'done' : step === 2 ? 'active' : 'pending',
    },
    {
      key: 'contact',
      label: 'CONTACT',
      text:
        done || contact.fullName.trim()
          ? [contact.fullName.trim(), contact.company.trim()].filter(Boolean).join(' · ')
          : 'Add your contact details',
      state: done ? 'done' : step === 3 ? 'active' : 'pending',
    },
  ]

  const failWith = (next: Errors) => {
    setErrors(next)
    const first = Object.keys(next)[0]
    if (first) document.getElementById(`bc-field-${first}`)?.focus()
    return false
  }

  const clearError = (key: string) =>
    setErrors((current) => {
      if (!current[key]) return current
      const next = { ...current }
      delete next[key]
      return next
    })

  const chooseService = (value: string) => {
    setService(value)
    setErrors({})
    setStep(2)
  }

  const startOver = () => {
    setService(null)
    setDetails(emptyDetails)
    setContact(emptyContact)
    setErrors({})
    setSubmitError('')
    setStatus('idle')
    setStep(1)
  }

  const validateRequirements = () => {
    const next: Errors = {}
    if (!details.stage) next.stage = 'Choose where you are today.'
    if (!details.timeline) next.timeline = 'Choose when you want to start.'
    return Object.keys(next).length === 0 ? true : failWith(next)
  }

  const validateContact = () => {
    const next: Errors = {}
    const name = contact.fullName.trim()
    const email = contact.workEmail.trim()
    const digits = contact.phone.replace(/\D/g, '')
    if (!name) next.fullName = 'Please enter your full name.'
    else if (name.length < 2) next.fullName = 'Please enter a valid full name (at least 2 characters).'
    if (!email) next.workEmail = 'Please enter your work email.'
    else if (!EMAIL_RE.test(email)) next.workEmail = 'Please enter a valid work email address.'
    if (!contact.company.trim()) next.company = 'Please enter your company name.'
    if (contact.phone.trim() && (digits.length < 6 || digits.length > 14)) {
      next.phone = 'Please enter a valid phone number.'
    }
    return Object.keys(next).length === 0 ? true : failWith(next)
  }

  const goToContact = () => {
    if (validateRequirements()) {
      setErrors({})
      setStep(3)
    }
  }

  const detailLines = () => {
    const lines = [`Stage: ${labelOf(projectStages, details.stage)}`, `Timeline: ${labelOf(timelines, details.timeline)}`]
    if (details.notes.trim()) lines.push(`Notes: ${details.notes.trim()}`)
    return lines
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting' || !config) return

    const form = new FormData(event.currentTarget)
    if (form.get('_honey')) return
    if (!validateContact()) return

    setErrors({})
    setSubmitError('')
    setStatus('submitting')

    const data = new FormData()
    data.append('name', contact.fullName.trim())
    data.append('email', contact.workEmail.trim())
    data.append('company', contact.company.trim())
    if (contact.phone.trim()) data.append('phone', `${dial.dial} ${contact.phone.trim()}`)
    data.append('interest', config.title)
    data.append('details', detailLines().join('\n'))
    if (contact.referral) data.append('heard_about_us_via', labelOf(referralSources, contact.referral))
    data.append('_subject', `Book a call — ${config.title}`)
    data.append('_captcha', 'false')
    data.append('_template', 'table')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setSubmitError(`Something went wrong. Your details are still here — try again, or email us at ${CONTACT_EMAIL}.`)
    }
  }

  const displayStep: Step = done ? 3 : step
  const firstName = contact.fullName.trim().split(/\s+/)[0]

  return (
    <div className="bc-glass">
      <div className="bc-grid">
        <aside className="bc-side" aria-label="Your brief">
          <div className="bc-side-top">
            <span className="bc-side-mark">
              <img className="bc-logo-light" src="/logo.png" alt="Universal Technologies" width={88} height={32} />
              <img className="bc-logo-dark" src="/logo-dark.png" alt="" width={88} height={32} />
            </span>
            <button
              type="button"
              className="bc-side-toggle"
              aria-expanded={briefOpen}
              aria-controls="bc-side-body"
              onClick={() => setBriefOpen((open) => !open)}
            >
              {briefOpen ? 'Hide brief' : 'View brief & info'}
              <svg viewBox="0 0 10 6" fill="none" aria-hidden="true" className={briefOpen ? 'is-open' : ''}>
                <path d="M1 1 5 5 9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className={`bc-side-body${briefOpen ? ' is-open' : ''}`} id="bc-side-body">
            <div>
              <p className="bc-eyebrow">YOUR BRIEF SO FAR</p>
              <ol className="bc-brief">
                {briefItems.map((item) => (
                  <li key={item.key} className={`bc-brief-item is-${item.state}`}>
                    <span className="bc-brief-dot" aria-hidden="true">
                      {item.state === 'done' ? (
                        <svg viewBox="0 0 20 20" fill="none">
                          <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <i />
                      )}
                    </span>
                    <div className="bc-brief-card" aria-current={item.state === 'active' ? 'step' : undefined}>
                      <p className="bc-brief-label">
                        {item.label}
                        <span className="sr-only">
                          {item.state === 'done' ? ' — completed' : item.state === 'active' ? ' — in progress' : ' — not started'}
                        </span>
                      </p>
                      {item.tags && item.tags.length > 0 ? (
                        <ul className="bc-brief-tags">
                          {item.tags.map((tag) => (
                            <li key={tag}>{tag}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="bc-brief-text">{item.text}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="bc-reply">
                <span className="bc-reply-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <div>
                  <p className="bc-reply-name">Delivery team</p>
                  <p className="bc-reply-role">Universal Technologies</p>
                </div>
              </div>
              <p className="bc-reply-note">Our team will reply within 4 working hours.</p>
            </div>

            <div className="bc-trust">
              <p className="bc-eyebrow">TRUSTED BY</p>
              <ClientMarquee />
            </div>
          </div>
        </aside>

        <div className="bc-panel" ref={panelRef} tabIndex={-1} key={done ? 'done' : step}>
          <p className="sr-only" aria-live="polite">
            {done ? 'Your request was recorded. Confirmation step.' : `Step ${step} of 3${config && step > 1 ? `, ${config.title}` : ''}`}
          </p>

          {done ? (
            <div className="bc-done">
              <span className="bc-done-check" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h2 className="bc-title">You’re all set{firstName ? `, ${firstName}` : ''} — talk soon.</h2>
              <p className="bc-lede">Thanks — we’ve received your request.</p>
              <ol className="bc-next">
                {['We review your needs', 'You hear from us', 'We schedule a short call'].map((item, index) => (
                  <li key={item}>
                    <span>{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
              <div className="bc-actions">
                <button type="button" className="bc-back" onClick={startOver}>
                  ← Start over
                </button>
                <Link className="bc-next-btn" to="/">
                  Return home <Arrow />
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div>
                <p className="bc-eyebrow">
                  {String(displayStep).padStart(2, '0')} / 03
                </p>
                <div
                  className="bc-progress"
                  role="progressbar"
                  aria-valuemin={1}
                  aria-valuemax={3}
                  aria-valuenow={displayStep}
                  aria-label={`Step ${displayStep} of 3`}
                >
                  {[1, 2, 3].map((n) => (
                    <span key={n} className={n <= displayStep ? 'is-on' : ''} />
                  ))}
                </div>
              </div>

              {step > 1 && config ? (
                <div className="bc-picked">
                  <span>{config.title}</span>
                  <i aria-hidden="true" />
                  <button type="button" onClick={startOver}>
                    Change
                  </button>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="bc-step">
                  <h2 className="bc-title">What can we help you with?</h2>
                  <div className="bc-cards">
                    {serviceChoices.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="bc-card"
                        aria-pressed={service === item.id}
                        onClick={() => chooseService(item.id)}
                      >
                        <span className="bc-card-icon">
                          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="bc-card-title">{item.title}</span>
                        <span className="bc-card-desc">{item.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {step === 2 && config ? (
                <div className="bc-step">
                  <h2 className="bc-title">Tell us about the project</h2>
                  <div className="bc-fields">
                    <RadioGroup
                      id="stage"
                      legend="What stage is your project at?"
                      options={projectStages}
                      value={details.stage}
                      error={errors.stage}
                      onChange={(value) => {
                        setDetails((d) => ({ ...d, stage: value }))
                        clearError('stage')
                      }}
                    />
                    <RadioGroup
                      id="timeline"
                      legend="When do you want to start?"
                      options={timelines}
                      value={details.timeline}
                      error={errors.timeline}
                      onChange={(value) => {
                        setDetails((d) => ({ ...d, timeline: value }))
                        clearError('timeline')
                      }}
                    />
                    <Notes id="project-notes" value={details.notes} onChange={(notes) => setDetails((d) => ({ ...d, notes }))} />
                  </div>

                  <div className="bc-actions">
                    <button type="button" className="bc-back" onClick={startOver}>
                      ← Start over
                    </button>
                    <button type="button" className="bc-next-btn" onClick={goToContact}>
                      Continue <Arrow />
                    </button>
                  </div>
                </div>
              ) : null}

              {step === 3 && config ? (
                <form className="bc-step" noValidate onSubmit={onSubmit}>
                  <h2 className="bc-title">Where should we send it?</h2>
                  <div className="bc-contact-grid">
                    <div>
                      <label className="bc-label" htmlFor="bc-field-fullName">
                        Full name *
                      </label>
                      <input
                        id="bc-field-fullName"
                        className="bc-input"
                        value={contact.fullName}
                        placeholder="Your name"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        onChange={(event) => {
                          setContact((s) => ({ ...s, fullName: event.target.value }))
                          clearError('fullName')
                        }}
                      />
                      <FieldError id="fullName-error" message={errors.fullName} />
                    </div>
                    <div>
                      <label className="bc-label" htmlFor="bc-field-workEmail">
                        Work email *
                      </label>
                      <input
                        id="bc-field-workEmail"
                        className="bc-input"
                        type="email"
                        value={contact.workEmail}
                        placeholder="you@company.com"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.workEmail)}
                        aria-describedby={errors.workEmail ? 'workEmail-error' : undefined}
                        onChange={(event) => {
                          setContact((s) => ({ ...s, workEmail: event.target.value }))
                          clearError('workEmail')
                        }}
                      />
                      <FieldError id="workEmail-error" message={errors.workEmail} />
                    </div>
                    <div>
                      <label className="bc-label" htmlFor="bc-field-company">
                        Company *
                      </label>
                      <input
                        id="bc-field-company"
                        className="bc-input"
                        value={contact.company}
                        placeholder="Company name"
                        autoComplete="organization"
                        aria-invalid={Boolean(errors.company)}
                        aria-describedby={errors.company ? 'company-error' : undefined}
                        onChange={(event) => {
                          setContact((s) => ({ ...s, company: event.target.value }))
                          clearError('company')
                        }}
                      />
                      <FieldError id="company-error" message={errors.company} />
                    </div>
                    <div>
                      <label className="bc-label" htmlFor="bc-field-phone">
                        Phone <span className="bc-optional">(Optional)</span>
                      </label>
                      <div className={`bc-phone${errors.phone ? ' is-invalid' : ''}`}>
                        <select
                          aria-label="Phone country"
                          value={contact.country}
                          onChange={(event) => setContact((s) => ({ ...s, country: event.target.value }))}
                        >
                          {dialCodes.map((item) => (
                            <option key={item.code} value={item.code}>
                              {item.label}
                            </option>
                          ))}
                        </select>
                        <span aria-hidden="true" />
                        <input
                          id="bc-field-phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel-national"
                          value={contact.phone}
                          placeholder={dial.placeholder}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          onChange={(event) => {
                            setContact((s) => ({ ...s, phone: event.target.value }))
                            clearError('phone')
                          }}
                        />
                      </div>
                      <FieldError id="phone-error" message={errors.phone} />
                    </div>
                    <div className="bc-span-2">
                      <label className="bc-label" htmlFor="bc-field-referral">
                        How did you hear about us? <span className="bc-optional">(Optional)</span>
                      </label>
                      <select
                        id="bc-field-referral"
                        className="bc-input"
                        value={contact.referral}
                        onChange={(event) => setContact((s) => ({ ...s, referral: event.target.value }))}
                      >
                        <option value="">Select one</option>
                        {referralSources.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="apply-honeypot"
                  />

                  <div className="bc-actions">
                    <button type="button" className="bc-back" onClick={() => setStep(2)}>
                      ← Back
                    </button>
                    <button type="submit" className="bc-next-btn" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                      {status === 'submitting' ? 'Sending…' : 'Talk to our team'}
                      {status === 'submitting' ? null : <Arrow />}
                    </button>
                  </div>
                  {submitError ? (
                    <p className="bc-submit-error" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  <p className="bc-fineprint">
                    By submitting, you agree to be contacted about your request. See our{' '}
                    <Link to="/privacy-policy">Privacy Policy</Link>.
                  </p>
                </form>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
