import { useCallback, useState, type FormEvent } from 'react'
import { CONTACT_EMAIL } from '../data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function useContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never fill this hidden field in.
    if (data.get('_honey')) return

    setStatus('submitting')

    // Same delivery service the job-application form uses (FormSubmit),
    // just via its AJAX endpoint since there's no file to attach here.
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
      form.reset()
    } catch {
      setStatus('error')
    }
  }, [])

  return { status, onSubmit }
}
