import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { serviceDetails, services } from '../data'
import { usePageMotion } from '../hooks/usePageMotion'
import { TypedCode } from './CodeTyper'

const CHECKS = ['Typecheck', 'Unit tests', 'Deploy preview']

// Ticks off once the snippet has finished typing, like a CI run picking it up.
function Checks({ typed, build, reduceMotion }: { typed: boolean; build: string; reduceMotion: boolean }) {
  const [done, setDone] = useState(0)

  useEffect(() => {
    if (!typed || reduceMotion) return undefined
    const timers = CHECKS.map((_, index) => window.setTimeout(() => setDone(index + 1), 450 * (index + 1)))
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [typed, reduceMotion])

  const count = reduceMotion ? CHECKS.length : done

  return (
    <div className="sv-checks" aria-label="Pipeline checks">
      {CHECKS.map((label, index) => (
        <span key={label} className={`sv-check${index < count ? ' is-done' : ''}`}>
          <i aria-hidden />
          {label}
        </span>
      ))}
      <span className={`sv-check-build${count === CHECKS.length ? ' is-visible' : ''}`}>{build}</span>
    </div>
  )
}

// The /services hero editor: writes each line's real snippet character by
// character, runs the checks, then moves on to the next service by itself.
export function ServicesLive() {
  const { reduceMotion, heroFollow } = usePageMotion()
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState(false)
  const service = services[active]
  const consoleData = serviceDetails[service.id]?.console

  const select = useCallback((index: number) => {
    setTyped(false)
    setActive(index)
  }, [])
  const next = useCallback(() => {
    setTyped(false)
    setActive((index) => (index + 1) % services.length)
  }, [])
  const onTyped = useCallback(() => setTyped(true), [])

  if (!consoleData) return null

  const finished = typed || reduceMotion

  return (
    <motion.div className="sv-hero-editor" {...heroFollow}>
      <div className="svc-console sv-editor">
        <div className="svc-console-bar">
          <span className="svc-console-dots">
            <span />
            <span />
            <span />
          </span>
          <span className="svc-console-bar-label">{consoleData.repo}</span>
          <span className="svc-console-bar-status">
            <span className={`svc-console-pill ${finished ? 'is-good' : 'is-busy'}`}>
              <i aria-hidden />
              {finished ? 'Passed' : 'Writing…'}
            </span>
            <span className="svc-console-pill">{consoleData.version}</span>
          </span>
        </div>

        <div className="sv-editor-tabs" role="tablist" aria-label="Service snippets">
          {services.map((item, index) => {
            const files = serviceDetails[item.id]?.console.files
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-controls="sv-editor-panel"
                title={item.title}
                className={`svc-console-tab sv-tab${index === active ? ' is-active' : ''}`}
                onClick={() => select(index)}
              >
                {files?.[1] ?? item.title}
              </button>
            )
          })}
        </div>

        <div className="sv-editor-code" id="sv-editor-panel" role="tabpanel" aria-label={`${service.title} example`}>
          <TypedCode key={service.id} code={consoleData.snippet} loop={false} onTyped={onTyped} onDone={next} />
        </div>

        <Checks key={service.id} typed={typed} build={consoleData.build} reduceMotion={reduceMotion} />
      </div>
    </motion.div>
  )
}
