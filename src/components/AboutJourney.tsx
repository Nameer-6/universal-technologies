import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

// Mirrors the hero copy directly ("designer hands off to an engineer who hands
// off to a tester who hands off to an ops team... to production") — this is
// About's own diagram, not a reused dashboard: a single lit path with no
// dropped handoffs, stepping through on its own and pausing when touched.
const STAGES = [
  { label: 'Design', note: 'A sketch, validated with real users before anyone commits to code.' },
  { label: 'Engineering', note: 'Built by the same team that scoped it — no re-briefing a new vendor.' },
  { label: 'QA', note: 'Tested by someone who sat in on the kickoff, not a stranger at the end.' },
  { label: 'Ops', note: 'Shipped by the people who wrote it, so nothing gets lost in a run-book.' },
  { label: 'Production', note: 'Watched by the team that built it, for as long as you need them to.' },
]

export function AboutJourney() {
  const reduceMotion = Boolean(useReducedMotion())
  const [active, setActive] = useState(0)
  const paused = useRef(false)

  useEffect(() => {
    if (reduceMotion) return undefined
    const id = window.setInterval(() => {
      if (paused.current) return
      setActive((current) => (current + 1) % STAGES.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  const progress = (active / (STAGES.length - 1)) * 100

  return (
    <div
      className="aj-panel"
      onMouseEnter={() => {
        paused.current = true
      }}
      onMouseLeave={() => {
        paused.current = false
      }}
      onFocus={() => {
        paused.current = true
      }}
      onBlur={() => {
        paused.current = false
      }}
    >
      <p className="aj-eyebrow">One team, start to finish</p>

      <div className="aj-track">
        <span className="aj-rail" aria-hidden />
        <motion.span
          className="aj-rail-lit"
          aria-hidden
          animate={{ width: `${progress}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeInOut' }}
        />
        <ol className="aj-nodes" role="tablist" aria-label="How a project moves through the team">
          {STAGES.map((stage, index) => (
            <li key={stage.label}>
              <button
                type="button"
                role="tab"
                aria-selected={index === active}
                className={`aj-node${index <= active ? ' is-reached' : ''}${index === active ? ' is-active' : ''}`}
                onClick={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span className="aj-node-dot">{String(index + 1).padStart(2, '0')}</span>
                <span className="aj-node-label">{stage.label}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="aj-caption">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {STAGES[active].note}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}
