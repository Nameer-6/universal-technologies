import { useEffect, useState, type ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'

// Lightweight highlighter for the snippets shown in the consoles: comments,
// strings, keywords, and function calls. Uses the .tok-* classes styled under
// .svc-console-code.
const CODE_TOKEN_RE =
  /(\/\/.*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|\b(import|from|export|const|let|async|await|return|function|resource|type|test)\b|\b([A-Za-z_][A-Za-z0-9_]*)(?=\()/g

function highlightCode(code: string): ReactNode {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let key = 0
  let match: RegExpExecArray | null
  CODE_TOKEN_RE.lastIndex = 0
  while ((match = CODE_TOKEN_RE.exec(code))) {
    if (match.index > lastIndex) nodes.push(code.slice(lastIndex, match.index))
    const [full, comment, str, kw, fn] = match
    if (comment) nodes.push(
      <span key={key++} className="tok-com">
        {comment}
      </span>,
    )
    else if (str) nodes.push(
      <span key={key++} className="tok-str">
        {str}
      </span>,
    )
    else if (kw) nodes.push(
      <span key={key++} className="tok-kw">
        {kw}
      </span>,
    )
    else if (fn) nodes.push(
      <span key={key++} className="tok-fn">
        {fn}
      </span>,
    )
    lastIndex = match.index + full.length
  }
  if (lastIndex < code.length) nodes.push(code.slice(lastIndex))
  return nodes
}

type TypedLine = { number: number; visible: string; isCurrent: boolean }

function splitTyped(code: string, length: number): TypedLine[] {
  const lines = code.split('\n')
  let consumed = 0
  return lines.map((line, i) => {
    const lineLen = line.length
    let visible = ''
    if (consumed < length) {
      visible = consumed + lineLen <= length ? line : line.slice(0, length - consumed)
    }
    const isCurrent = consumed < length && consumed + lineLen >= length
    consumed += lineLen + 1
    return { number: i + 1, visible, isCurrent }
  })
}

const TYPE_SPEED = 38
const HOLD_AT_END = 2600
const PAUSE_BEFORE_RETYPE = 500

type Props = {
  code: string
  /** Retype the same snippet forever (default). When false it types once, holds, then calls onDone. */
  loop?: boolean
  /** Called the moment the last character has been typed (before the hold). */
  onTyped?: () => void
  /** Called after the hold, when a non-looping snippet is finished with. */
  onDone?: () => void
}

export function TypedCode({ code, loop = true, onTyped, onDone }: Props) {
  const reduceMotion = Boolean(useReducedMotion())
  const [length, setLength] = useState(0)

  useEffect(() => {
    // With reduced motion the full snippet is shown as-is (see `shown` below).
    if (reduceMotion) return undefined

    let cancelled = false
    let timeoutId: number

    const typeFrom = (from: number) => {
      if (cancelled) return
      if (from >= code.length) {
        setLength(code.length)
        onTyped?.()
        timeoutId = window.setTimeout(() => {
          if (cancelled) return
          if (!loop) {
            onDone?.()
            return
          }
          setLength(0)
          timeoutId = window.setTimeout(() => typeFrom(0), PAUSE_BEFORE_RETYPE)
        }, HOLD_AT_END)
        return
      }
      setLength(from + 1)
      timeoutId = window.setTimeout(() => typeFrom(from + 1), TYPE_SPEED)
    }

    timeoutId = window.setTimeout(() => {
      setLength(0)
      typeFrom(0)
    }, PAUSE_BEFORE_RETYPE)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [code, loop, onTyped, onDone, reduceMotion])

  const shown = reduceMotion ? code.length : length

  return (
    <div className="svc-console-code">
      {splitTyped(code, shown).map((line) => (
        <div className="svc-console-line" key={line.number}>
          <span className="svc-console-line-num">{line.number}</span>
          <span className="svc-console-line-content">
            {highlightCode(line.visible)}
            {line.isCurrent && <span className="svc-console-caret" aria-hidden />}
          </span>
        </div>
      ))}
    </div>
  )
}
