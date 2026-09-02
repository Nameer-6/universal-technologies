import { useCallback, useState, type FormEvent } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function useApplyForm() {
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

  // FormSubmit needs a genuine multipart form POST to accept a file on its
  // free tier — a fetch()-built FormData works for text fields but not
  // attachments there. So this only runs client-side validation and, if it
  // passes, lets the browser's native submission proceed (into the hidden
  // target iframe rendered by ApplyModal) instead of intercepting it.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const data = new FormData(event.currentTarget)

    // Honeypot: real visitors never check this hidden checkbox.
    if (data.get('_honey')) {
      event.preventDefault()
      return
    }

    const resume = data.get('attachment')
    if (!(resume instanceof File) || resume.size === 0) {
      event.preventDefault()
      setError('Attach your resume before submitting.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')
  }

  // The hidden iframe's load event fires once the POST round-trips —
  // cross-origin content can't be read, but the load event itself still
  // fires, which is all the "did it send" signal we need.
  const onFrameLoad = useCallback(() => {
    setStatus((current) => (current === 'submitting' ? 'success' : current))
  }, [])

  return { status, errorMessage, onSubmit, onFrameLoad, reset, setError }
}
