import { useCallback, useState, type FormEvent } from 'react'
import { WEB3FORMS_ACCESS_KEY } from '../data'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function useApplyForm(jobTitle: string) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const reset = useCallback(() => {
    setStatus('idle')
    setErrorMessage('')
  }, [])

  const setError = useCallback((message: string) => {
    setStatus('error')
    setErrorMessage(message)
  }, [])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never fill this hidden field.
    if (String(data.get('botcheck') || '')) return

    const resume = data.get('resume')
    if (!(resume instanceof File) || resume.size === 0) {
      setStatus('error')
      setErrorMessage('Attach your resume before submitting.')
      return
    }

    data.set('access_key', WEB3FORMS_ACCESS_KEY)
    data.set('subject', `Application: ${jobTitle}`)
    data.set('from_name', 'Universal Technologies Careers')

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      const result = await response.json()
      if (result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
        setErrorMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error — please try again.')
    }
  }

  return { status, errorMessage, onSubmit, reset, setError }
}
