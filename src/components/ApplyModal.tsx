import { useEffect, useRef, useState, type DragEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApplyForm } from '../hooks/useApplyForm'

const MAX_FILE_BYTES = 5 * 1024 * 1024
const ACCEPTED_TYPES = '.pdf,.doc,.docx'

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  const kb = bytes / 1024
  if (kb < 1024) return `${kb.toFixed(0)} KB`
  return `${(kb / 1024).toFixed(1)} MB`
}

function ResumeDropzone({
  onError,
}: {
  onError: (message: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)

  const acceptFile = (candidate: File | undefined) => {
    if (!candidate) return
    const isAccepted = /\.(pdf|docx?)$/i.test(candidate.name)
    if (!isAccepted) {
      onError('Resumes must be a PDF, DOC, or DOCX file.')
      return
    }
    if (candidate.size > MAX_FILE_BYTES) {
      onError('That file is over 5MB — try a smaller version of your resume.')
      return
    }
    setFile(candidate)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    const dropped = event.dataTransfer.files[0]
    if (!dropped) return

    // Keep the real <input> in sync so FormData(form) still picks the file
    // up on submit — dropping doesn't otherwise touch the input's files.
    const transfer = new DataTransfer()
    transfer.items.add(dropped)
    if (inputRef.current) inputRef.current.files = transfer.files

    acceptFile(dropped)
  }

  const clear = () => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div
      className={`apply-dropzone${dragging ? ' is-dragover' : ''}${file ? ' has-file' : ''}`}
      onClick={() => !file && inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !file) {
          event.preventDefault()
          inputRef.current?.click()
        }
      }}
    >
      <input
        ref={inputRef}
        type="file"
        name="resume"
        accept={ACCEPTED_TYPES}
        className="apply-dropzone-input"
        tabIndex={-1}
        onChange={(event) => acceptFile(event.currentTarget.files?.[0])}
      />

      {file ? (
        <div className="apply-file-chip">
          <span className="apply-file-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="apply-file-meta">
            <strong>{file.name}</strong>
            <em>{formatBytes(file.size)}</em>
          </span>
          <button
            type="button"
            className="apply-file-remove"
            aria-label="Remove file"
            onClick={(event) => {
              event.stopPropagation()
              clear()
            }}
          >
            ×
          </button>
        </div>
      ) : (
        <>
          <span className="apply-dropzone-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M12 15V4m0 0 4 4m-4-4L8 8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="apply-dropzone-text">
            <strong>Click to upload</strong> or drag and drop
          </span>
          <span className="apply-dropzone-hint">PDF, DOC, or DOCX — up to 5MB</span>
        </>
      )}
    </div>
  )
}

export function ApplyModal({
  jobTitle,
  open,
  onClose,
}: {
  jobTitle: string
  open: boolean
  onClose: () => void
}) {
  const { status, errorMessage, onSubmit, reset, setError } = useApplyForm(jobTitle)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) reset()
  }, [open, jobTitle, reset])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="apply-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            className="apply-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="apply-modal-title"
            ref={dialogRef}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button type="button" className="apply-close" aria-label="Close" onClick={onClose}>
              ×
            </button>

            {status === 'success' ? (
              <div className="apply-success">
                <h2>Application sent</h2>
                <p>
                  Thanks for applying to <strong>{jobTitle}</strong>. We read every application —
                  expect to hear from us within a few business days.
                </p>
                <button type="button" className="btn btn-ink" onClick={onClose}>
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 id="apply-modal-title">Apply for {jobTitle}</h2>
                <p className="apply-lede">
                  Tell us a bit about you and attach your resume — we'll take it from there.
                </p>

                <input
                  type="text"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="apply-honeypot"
                />

                <label>
                  Name
                  <input type="text" name="name" required autoComplete="name" />
                </label>

                <label>
                  Email
                  <input type="email" name="email" required autoComplete="email" />
                </label>

                <label>
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Anything you'd like us to know?"
                  />
                </label>

                <label>
                  Resume
                  <ResumeDropzone onError={setError} />
                </label>

                {status === 'error' && <p className="apply-error">{errorMessage}</p>}

                <button
                  type="submit"
                  className="btn btn-ink apply-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending…' : 'Submit application'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
