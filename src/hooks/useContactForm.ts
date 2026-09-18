import { useCallback, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '../data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export type ContactField = 'name' | 'email' | 'message'

function validate(form: HTMLFormElement): Partial<Record<ContactField, string>> {
  const errors: Partial<Record<ContactField, string>> = {}
  const name = String(form.elements.namedItem('name') instanceof HTMLInputElement
    ? (form.elements.namedItem('name') as HTMLInputElement).value
    : '').trim()
  const email = String(form.elements.namedItem('email') instanceof HTMLInputElement
    ? (form.elements.namedItem('email') as HTMLInputElement).value
    : '').trim()
  const message = String(form.elements.namedItem('message') instanceof HTMLTextAreaElement
    ? (form.elements.namedItem('message') as HTMLTextAreaElement).value
    : '').trim()

  if (!name) errors.name = 'Enter your name.'
  if (!email) errors.email = 'Enter your work email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  if (!message) errors.message = 'Tell us a bit about the work.'
  return errors
}

export function useContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (data.get('_honey')) return

    const nextErrors = validate(form)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      const first = (['name', 'email', 'message'] as const).find((key) => nextErrors[key])
      const field = first ? form.elements.namedItem(first) : null
      if (field instanceof HTMLElement) field.focus()
      return
    }

    setErrors({})
    setStatus('submitting')

    data.append('_subject', `Project inquiry — ${String(data.get('service') || 'General')}`)
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
    }
  }, [])

  return { status, errors, onSubmit }
}
