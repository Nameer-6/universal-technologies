import { useEffect, useState, type ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { Bars, ProgressBar, Shimmer, Sparkline } from './chartPrimitives'
import { SWAP, dataVar, type ChartColor } from './chartTokens'

export type BoardKey = 'automation' | 'development' | 'design' | 'qa' | 'cloud' | 'api'

const BLUE = dataVar('blue')
const PURPLE = dataVar('purple')
const AMBER = dataVar('amber')
const GRAY = dataVar('gray')
const SLATE = dataVar('slate')

// Every board needs the same "should things move?" answer.
function useAnimate() {
  return !useReducedMotion()
}

// Steps a counter 0..count-1 on an interval; stays put when motion is reduced.
function useCycle(count: number, ms: number, animate: boolean) {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (!animate) return undefined
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ms)
    return () => window.clearInterval(id)
  }, [count, ms, animate])
  return index
}

function Frame({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  const animate = useAnimate()
  return (
    <div className="hb-card">
      <div className="hb-head">
        <div className="hb-head-left">
          <span className="hb-dot" />
          <span className="hb-dot" />
          <span className="hb-dot" />
          <div className="hb-titles">
            <p className="hb-title">{title}</p>
            {subtitle ? <p className="hb-sub">{subtitle}</p> : null}
          </div>
        </div>
        <motion.span
          className="hb-live"
          animate={animate ? { opacity: [0.25, 1, 0.25] } : undefined}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="hb-body">{children}</div>
    </div>
  )
}

function Stat({ label, value, trend, color }: { label: string; value: string; trend: number[]; color: ChartColor }) {
  const animate = useAnimate()
  return (
    <div className="hb-stat">
      <p className="hb-label">{label}</p>
      <p className="hb-value">{value}</p>
      <Sparkline points={trend} color={color} animate={animate} className="hb-stat-spark" />
    </div>
  )
}

function Row({ left, right, dot, delay = 0 }: { left: string; right: string; dot: string; delay?: number }) {
  const animate = useAnimate()
  return (
    <motion.div
      className="hb-row"
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: SWAP }}
    >
      <span className="hb-row-left">
        <span className="hb-row-dot" style={{ background: dot }} />
        {left}
      </span>
      <span className="hb-row-right">{right}</span>
    </motion.div>
  )
}

// A number that drifts a little, like a live counter.
function LiveCount({ base, unit }: { base: number; unit: string }) {
  const animate = useAnimate()
  const [value, setValue] = useState(base)
  useEffect(() => {
    if (!animate) return undefined
    const id = window.setInterval(() => setValue(base + Math.round((Math.random() - 0.4) * base * 0.06)), 1800)
    return () => window.clearInterval(id)
  }, [base, animate])
  return (
    <span className="hb-num">
      {value.toLocaleString()}
      {unit}
    </span>
  )
}

function AutomationBoard() {
  const animate = useAnimate()
  const steps = ['Trigger', 'Enrich', 'Classify', 'Route', 'Deliver']
  const active = useCycle(steps.length, 1500, animate)
  return (
    <Frame title="Automation Builder" subtitle="workflow · prod-eu-1">
      <div className="hb-stack">
        <div className="hb-steps">
          {steps.map((step, i) => (
            <div key={step} className="hb-step-wrap">
              <div className={`hb-step${i === active ? ' is-active' : ''}`}>{step}</div>
              {i < steps.length - 1 ? <span className={`hb-step-line${i < active ? ' is-done' : ''}`} /> : null}
            </div>
          ))}
        </div>
        <div className="hb-grid-2">
          <Stat label="Runs today" value="18,402" trend={[4, 6, 5, 9, 8, 12, 11, 15]} color="blue" />
          <Stat label="Avg latency" value="240ms" trend={[9, 7, 8, 6, 5, 6, 4, 4]} color="purple" />
        </div>
        <div>
          <div className="hb-meta">
            <span>Queue throughput</span>
            <LiveCount base={1284} unit="/min" />
          </div>
          <Shimmer color={BLUE} animate={animate} />
        </div>
      </div>
    </Frame>
  )
}

function DevelopmentBoard() {
  const animate = useAnimate()
  const stages = ['build', 'test', 'canary', 'prod']
  const t = useCycle(stages.length + 1, 1300, animate)
  return (
    <Frame title="Deployment Pipeline" subtitle="api-gateway · main">
      <div className="hb-stack">
        <div className="hb-stages">
          {stages.map((stage, i) => (
            <div key={stage} className="hb-stage">
              <span className="hb-stage-name">{stage}</span>
              <div className="hb-track">
                <motion.div
                  className="hb-fill"
                  style={{ background: i < t ? BLUE : PURPLE }}
                  animate={{ width: i < t ? '100%' : i === t ? '62%' : '0%' }}
                  transition={{ duration: animate ? 1 : 0, ease: SWAP }}
                />
              </div>
              <span className="hb-stage-state">{i < t ? 'done' : i === t ? 'run' : '—'}</span>
            </div>
          ))}
        </div>
        <div className="hb-terminal">
          <p>$ deploy --env prod</p>
          <p className="is-soft">→ bundle 2.4mb · 18 fn · edge</p>
          <p style={{ color: AMBER }}>→ canary 5% traffic · 0 errors</p>
        </div>
        <div className="hb-grid-2">
          <Stat label="Deploys / wk" value="212" trend={[3, 5, 4, 7, 9, 8, 12]} color="purple" />
          <Stat label="Rollback rate" value="0.4%" trend={[8, 6, 5, 4, 3, 2, 2]} color="blue" />
        </div>
      </div>
    </Frame>
  )
}

function DesignBoard() {
  const animate = useAnimate()
  const swatches = [BLUE, PURPLE, AMBER, GRAY, SLATE, 'var(--line)']
  const meters: [string, number, string][] = [
    ['Components', 96, BLUE],
    ['Coverage', 82, PURPLE],
    ['A11y score', 94, AMBER],
  ]
  return (
    <Frame title="Design System" subtitle="tokens · 4 platforms">
      <div className="hb-stack">
        <div className="hb-swatches">
          {swatches.map((color, i) => (
            <motion.div
              key={i}
              className="hb-swatch"
              style={{ background: color }}
              initial={animate ? { opacity: 0, scale: 0.94 } : false}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: SWAP }}
            />
          ))}
        </div>
        <div className="hb-meters">
          {meters.map(([label, value, color], i) => (
            <div key={label}>
              <div className="hb-meta">
                <span>{label}</span>
                <span className="hb-num">{value}%</span>
              </div>
              <ProgressBar value={value} color={color} delay={i * 0.15} animate={animate} />
            </div>
          ))}
        </div>
        <div className="hb-panel">
          <p className="hb-label">Prototype activity</p>
          <Bars
            values={[4, 7, 5, 9, 6, 11, 8, 12, 9, 14]}
            colors={[SLATE, SLATE, SLATE, PURPLE]}
            animate={animate}
            className="hb-bars-tall"
          />
        </div>
      </div>
    </Frame>
  )
}

function QaBoard() {
  const animate = useAnimate()
  const [progress, setProgress] = useState(64)
  useEffect(() => {
    if (!animate) return undefined
    const id = window.setInterval(() => setProgress((p) => (p >= 99 ? 62 : p + 3)), 700)
    return () => window.clearInterval(id)
  }, [animate])
  return (
    <Frame title="Test Suite Runner" subtitle="e2e · 1,284 specs">
      <div className="hb-stack">
        <div className="hb-suite">
          <div>
            <p className="hb-label">Suite progress</p>
            <p className="hb-big">{progress}%</p>
          </div>
          <Sparkline points={[6, 8, 7, 10, 9, 13, 12, 16]} color="blue" animate={animate} className="hb-suite-spark" />
        </div>
        <div className="hb-track">
          <motion.div
            className="hb-fill"
            style={{ background: BLUE }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: animate ? 0.6 : 0, ease: SWAP }}
          />
        </div>
        <div>
          <Row left="auth.spec.ts" right="passed · 1.2s" dot={BLUE} />
          <Row left="billing.spec.ts" right="passed · 2.8s" dot={BLUE} delay={0.1} />
          <Row left="pipeline.spec.ts" right="flaky · 4.1s" dot={AMBER} delay={0.2} />
          <Row left="search.spec.ts" right="running" dot={PURPLE} delay={0.3} />
        </div>
      </div>
    </Frame>
  )
}

function CloudBoard() {
  const animate = useAnimate()
  const regions: [string, number, string][] = [
    ['us-east', 78, BLUE],
    ['eu-west', 64, PURPLE],
    ['ap-south', 41, GRAY],
  ]
  return (
    <Frame title="Infrastructure Health" subtitle="14 regions · edge">
      <div className="hb-stack">
        <div className="hb-grid-3">
          <Stat label="Uptime" value="99.99%" trend={[9, 9, 10, 10, 9, 10, 10]} color="blue" />
          <Stat label="p95" value="112ms" trend={[7, 6, 8, 5, 6, 4, 5]} color="purple" />
          <Stat label="Spend" value="$41k" trend={[5, 6, 6, 7, 6, 8, 7]} color="amber" />
        </div>
        <div className="hb-panel">
          <p className="hb-label">Regional load</p>
          <div className="hb-regions">
            {regions.map(([name, value, color], i) => (
              <div key={name} className="hb-region">
                <span className="hb-region-name">{name}</span>
                <ProgressBar value={value} color={color} delay={i * 0.12} animate={animate} />
                <span className="hb-region-value">{value}%</span>
              </div>
            ))}
          </div>
        </div>
        <Bars
          values={[5, 8, 6, 10, 7, 12, 9, 13, 10, 15, 11, 16]}
          colors={[SLATE, SLATE, SLATE, BLUE]}
          animate={animate}
          className="hb-bars-tall"
        />
      </div>
    </Frame>
  )
}

function ApiBoard() {
  return (
    <Frame title="API Monitor" subtitle="gateway · 24h">
      <div className="hb-stack">
        <div className="hb-grid-2">
          <Stat label="Requests" value="4.2M" trend={[4, 6, 8, 7, 11, 10, 14]} color="blue" />
          <Stat label="Error rate" value="0.03%" trend={[8, 6, 5, 4, 4, 3, 2]} color="amber" />
        </div>
        <div>
          <Row left="POST /v1/agents/run" right="128ms" dot={BLUE} />
          <Row left="GET /v1/workflows" right="41ms" dot={PURPLE} delay={0.08} />
          <Row left="POST /v1/embeddings" right="212ms" dot={GRAY} delay={0.16} />
          <Row left="GET /v1/health" right="12ms" dot={SLATE} delay={0.24} />
        </div>
      </div>
    </Frame>
  )
}

const BOARDS: Record<BoardKey, () => ReactNode> = {
  automation: AutomationBoard,
  development: DevelopmentBoard,
  design: DesignBoard,
  qa: QaBoard,
  cloud: CloudBoard,
  api: ApiBoard,
}

// The active board blurs out and the next one blurs in, like the reference.
export function HeroBoard({ boardKey, reduceMotion }: { boardKey: BoardKey; reduceMotion: boolean }) {
  const Board = BOARDS[boardKey] ?? AutomationBoard
  if (reduceMotion) return <Board />

  return (
    <div className="hb-wrap">
      <AnimatePresence mode="wait">
        <motion.div
          key={boardKey}
          className="hb-swap"
          initial={{ opacity: 0, y: 18, filter: 'blur(12px)', scale: 0.985 }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, y: -14, filter: 'blur(12px)', scale: 0.99 }}
          transition={{ duration: 0.65, ease: SWAP }}
        >
          <Board />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

// The board floats gently, leans toward the pointer, and can be picked up and
// moved: it springs back to its place on release. Drag is only enabled for a
// fine pointer, since a draggable element would otherwise block touch scrolling.
export function HeroBoardStage({
  boardKey,
  reduceMotion,
  onHoverChange,
  float = true,
}: {
  boardKey: BoardKey
  reduceMotion: boolean
  onHoverChange?: (hovering: boolean) => void
  /** Gentle up-and-down bob. Turn off when several boards sit side by side. */
  float?: boolean
}) {
  const [finePointer, setFinePointer] = useState(false)
  const [dragging, setDragging] = useState(false)
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const rotateX = useSpring(useTransform(tiltY, [-0.5, 0.5], [4, -4]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(tiltX, [-0.5, 0.5], [-4, 4]), { stiffness: 140, damping: 18 })

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setFinePointer(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (reduceMotion) {
    return (
      <div className="hb-float">
        <HeroBoard boardKey={boardKey} reduceMotion />
      </div>
    )
  }

  const movable = finePointer

  return (
    <motion.div
      className="hb-float"
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
    >
      <motion.div
        className={`hb-drag${movable ? ' is-movable' : ''}${dragging ? ' is-dragging' : ''}`}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        drag={movable}
        dragSnapToOrigin
        dragElastic={0.25}
        dragMomentum={false}
        whileDrag={{ scale: 1.02 }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
        onPointerEnter={() => onHoverChange?.(true)}
        onPointerLeave={() => {
          onHoverChange?.(false)
          tiltX.set(0)
          tiltY.set(0)
        }}
        onPointerMove={(event) => {
          if (dragging) return
          const box = event.currentTarget.getBoundingClientRect()
          tiltX.set((event.clientX - box.left) / box.width - 0.5)
          tiltY.set((event.clientY - box.top) / box.height - 0.5)
        }}
      >
        <HeroBoard boardKey={boardKey} reduceMotion={false} />
      </motion.div>
    </motion.div>
  )
}
