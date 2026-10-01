import { useEffect, useRef, useState } from 'react'
import { exportPortfolioPdf, exportPortfolioXlsx, type PortfolioExportContent } from '../portfolioExport'

type Format = 'pdf' | 'xlsx'

const OPTIONS: { format: Format; label: string; hint: string }[] = [
  { format: 'pdf', label: 'PDF', hint: '.pdf' },
  { format: 'xlsx', label: 'Excel', hint: '.xlsx' },
]

export function ExportMenu({ content }: { content: PortfolioExportContent }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState<Format | null>(null)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return undefined
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const download = async (format: Format) => {
    setBusy(format)
    try {
      await (format === 'pdf' ? exportPortfolioPdf(content) : exportPortfolioXlsx(content))
      setOpen(false)
    } catch (error) {
      console.error('Portfolio export failed', error)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="export-menu" ref={root}>
      <button
        type="button"
        className="btn btn-ghost-ink"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        Export
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
        </svg>
      </button>
      {open ? (
        <ul className="export-menu-list" role="menu">
          {OPTIONS.map((option) => (
            <li key={option.format} role="none">
              <button
                type="button"
                role="menuitem"
                disabled={busy !== null}
                onClick={() => download(option.format)}
              >
                <span>{busy === option.format ? 'Preparing…' : `Download ${option.label}`}</span>
                <small>{option.hint}</small>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
