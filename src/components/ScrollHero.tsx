import { useMemo, useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { backboneMetrics, heroCards, swarmTiles } from '../data'

const cards = heroCards
const labels = swarmTiles
const metrics = backboneMetrics

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function phase(progress: number, start: number, end: number) {
  if (end <= start) return 0
  return clamp01((progress - start) / (end - start))
}

function seeded(i: number) {
  const x = Math.sin(i * 12.9898 + 78.233) * 43758.5453
  return x - Math.floor(x)
}

type Tile = {
  label: string
  start: { x: number; y: number; rot: number; scale: number }
  mid: { x: number; y: number; rot: number; scale: number }
  end: { x: number; y: number }
  tone: 'light' | 'dark' | 'brand' | 'soft'
}

function buildTiles(): Tile[] {
  return labels.map((label, i) => {
    const angle = (i / labels.length) * Math.PI * 2
    // Collapse into one centered sphere that matches the constellation globe
    const radius = 10 + seeded(i + 7) * 16
    return {
      label,
      start: {
        x: 4 + seeded(i) * 92,
        y: -6 + seeded(i + 41) * 112,
        rot: -18 + seeded(i + 91) * 36,
        scale: 0.85 + seeded(i + 131) * 0.45,
      },
      mid: {
        // Keep the swarm orbiting the viewport center (not the right column)
        x: 28 + seeded(i + 17) * 44,
        y: 22 + seeded(i + 27) * 56,
        rot: -12 + seeded(i + 37) * 24,
        scale: 0.55 + seeded(i + 47) * 0.35,
      },
      end: {
        x: 50 + Math.cos(angle) * radius,
        y: 50 + Math.sin(angle) * radius * 0.9,
      },
      tone: (['light', 'dark', 'brand', 'soft'] as const)[i % 4],
    }
  })
}

function SwarmTile({
  tile,
  progress,
  reduceMotion,
}: {
  tile: Tile
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const left = useTransform(progress, (p) => {
    if (reduceMotion) return `${tile.mid.x}%`
    const enter = phase(p, 0.08, 0.28)
    const swarm = phase(p, 0.22, 0.48)
    const collapse = phase(p, 0.48, 0.68)
    const x =
      tile.start.x * (1 - swarm) * (0.35 + enter * 0.65) +
      tile.mid.x * swarm * (1 - collapse) +
      tile.end.x * collapse
    return `${x}%`
  })

  const top = useTransform(progress, (p) => {
    if (reduceMotion) return `${tile.mid.y}%`
    const enter = phase(p, 0.08, 0.28)
    const swarm = phase(p, 0.22, 0.48)
    const collapse = phase(p, 0.48, 0.68)
    const y =
      tile.start.y * (1 - swarm) * (0.35 + enter * 0.65) +
      tile.mid.y * swarm * (1 - collapse) +
      tile.end.y * collapse
    return `${y}%`
  })

  const opacity = useTransform(progress, (p) => {
    if (reduceMotion) return 0.85
    const enter = phase(p, 0.08, 0.28)
    // Fade fully as the centered constellation takes over — avoids a second “world”
    const fade = phase(p, 0.58, 0.72)
    return Math.min(enter * 1.2, 1) * (1 - fade)
  })

  const transform = useTransform(progress, (p) => {
    if (reduceMotion) {
      return `translate(-50%, -50%) rotate(${tile.mid.rot}deg) scale(${tile.mid.scale})`
    }
    const swarm = phase(p, 0.22, 0.48)
    const collapse = phase(p, 0.48, 0.68)
    const rot = tile.start.rot * (1 - swarm) + tile.mid.rot * swarm * (1 - collapse)
    const scale =
      tile.start.scale * (1 - swarm) +
      tile.mid.scale * swarm * (1 - collapse) +
      (0.12 + seeded(tile.label.length) * 0.1) * collapse
    return `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`
  })

  const filter = useTransform(progress, (p) => {
    if (reduceMotion) return 'blur(0px)'
    return `blur(${phase(p, 0.48, 0.68) * 1.8}px)`
  })

  return (
    <motion.div
      className={`swarm-tile tone-${tile.tone}`}
      style={{ left, top, opacity, transform, filter }}
      aria-hidden
    >
      {tile.label}
    </motion.div>
  )
}

function ConstellationCanvas({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useMemo(() => {
    return Array.from({ length: 1400 }, (_, i) => ({
      theta: seeded(i) * Math.PI * 2,
      phi: Math.acos(2 * seeded(i + 3) - 1),
      shade: seeded(i + 9),
      color: seeded(i + 19),
    }))
  }, [])

  const opacity = useTransform(progress, (p) => {
    if (reduceMotion) return 0.95
    return phase(p, 0.46, 0.6) * (1 - phase(p, 0.95, 1) * 0.15)
  })

  const scale = useTransform(progress, (p) => {
    if (reduceMotion) return 1
    // Keep the globe inside the sticky viewport — peek around the panel, don't clip top/bottom
    return 0.88 + phase(p, 0.5, 0.82) * 0.14
  })

  useTransform(progress, (p) => {
    const canvas = canvasRef.current
    if (!canvas) return p
    const ctx = canvas.getContext('2d')
    if (!ctx) return p

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const size = 640
    if (canvas.width !== size * dpr) {
      canvas.width = size * dpr
      canvas.height = size * dpr
      canvas.style.width = `${size}px`
      canvas.style.height = `${size}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const form = reduceMotion ? 1 : phase(p, 0.46, 0.68)
    const spin = p * Math.PI * 2.2
    const cx = size / 2
    const cy = size / 2
    const radius = 228

    ctx.clearRect(0, 0, size, size)

    for (const pt of particles) {
      const x0 = Math.cos(pt.theta) * Math.sin(pt.phi)
      const y0 = Math.cos(pt.phi)
      const z0 = Math.sin(pt.theta) * Math.sin(pt.phi)

      const cos = Math.cos(spin)
      const sin = Math.sin(spin)
      const x1 = x0 * cos - z0 * sin
      const z1 = x0 * sin + z0 * cos

      const scatterX = (seeded(pt.theta * 100) - 0.5) * 600
      const scatterY = (seeded(pt.phi * 100) - 0.5) * 600
      const x = cx + scatterX * (1 - form) + x1 * radius * form
      const y = cy + scatterY * (1 - form) + y0 * radius * form
      const depth = (z1 + 1) / 2
      const alpha = (0.3 + depth * 0.7) * (0.45 + form * 0.55)
      const s = 1.7 + depth * 2.4

      if (pt.color > 0.92) ctx.fillStyle = `rgba(239, 35, 60, ${alpha})`
      else if (pt.shade > 0.7) ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
      else ctx.fillStyle = `rgba(30, 41, 59, ${alpha})`

      ctx.fillRect(x, y, s, s)
    }

    return p
  })

  return (
    <motion.div className="constellation-wrap" style={{ opacity, scale }} aria-hidden>
      <canvas ref={canvasRef} className="constellation-canvas" />
    </motion.div>
  )
}

function HeroFloatingCards({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const opacity = useTransform(progress, (p) => (reduceMotion ? 1 : 1 - phase(p, 0.18, 0.34)))
  const shift = useTransform(progress, (p) => (reduceMotion ? 0 : phase(p, 0.05, 0.3) * -24))

  return (
    <motion.div className="hero-floaters" style={{ opacity, y: shift }} aria-hidden>
      {cards.map((card, index) => (
        <article
          key={card.id}
          className={`hero-floater hero-floater-${index} tone-${card.tone}`}
        >
          <div className="floater-head">
            <span className="floater-mark">{card.mark}</span>
            <strong>{card.title}</strong>
          </div>
          <p className="floater-copy">{card.subtitle}</p>
          <div className="floater-chips">
            {card.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </article>
      ))}
    </motion.div>
  )
}

// The scroll-scrubbed version below drives every layer's opacity off scroll
// progress, so with prefers-reduced-motion active it would otherwise render
// every phase (copy, cards, swarm, globe, stats panel) at opacity 1 at once —
// permanently overlapping. Respect the preference properly instead: skip the
// scroll-jacking and render one static, readable stack.
function StaticHero() {
  return (
    <section className="scroll-hero" aria-label="Universal product story">
      <div className="scroll-hero-sticky">
        <div className="scroll-hero-stage">
          <div className="scroll-hero-copy">
            <p className="eyebrow">Software · Quality · Growth</p>
            <h1>
              Every product,
              <br />
              fully executed
            </h1>
            <p className="lede">
              Universal Technologies is the delivery layer that designs, builds, tests, and
              launches web, mobile, and cloud products — so shipping stops depending on who
              happens to remember the next step.
            </p>
            <div className="hero-actions">
              <a className="btn btn-ink" href="#contact">
                Get Started <span aria-hidden>→</span>
              </a>
              <a className="btn btn-ghost-ink" href="#how">
                How it works
              </a>
            </div>
          </div>

          <div className="scroll-hero-visual">
            <div className="hero-floaters" aria-hidden>
              {cards.map((card, index) => (
                <article
                  key={card.id}
                  className={`hero-floater hero-floater-${index} tone-${card.tone}`}
                >
                  <div className="floater-head">
                    <span className="floater-mark">{card.mark}</span>
                    <strong>{card.title}</strong>
                  </div>
                  <p className="floater-copy">{card.subtitle}</p>
                  <div className="floater-chips">
                    {card.chips.map((chip) => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="hero-backbone-static">
        <div className="backbone-panel-inner">
          <h2>The delivery backbone for product growth</h2>
          <div className="backbone-stats">
            {metrics.map((item) => (
              <div key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FullScrollHero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = false
  const tiles = useMemo(() => buildTiles(), [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 400 : 90,
    damping: reduceMotion ? 40 : 28,
    mass: 0.35,
  })

  const copyOpacity = useTransform(progress, (p) =>
    reduceMotion ? 1 : 1 - phase(p, 0.16, 0.32),
  )
  const copyY = useTransform(progress, (p) =>
    reduceMotion ? 0 : phase(p, 0.12, 0.3) * -48,
  )
  const panelOpacity = useTransform(progress, (p) =>
    reduceMotion ? 1 : phase(p, 0.58, 0.72),
  )
  const panelY = useTransform(progress, (p) =>
    reduceMotion ? 0 : (1 - phase(p, 0.58, 0.76)) * 80,
  )
  const statsOpacity = useTransform(progress, (p) =>
    reduceMotion ? 1 : phase(p, 0.7, 0.82),
  )

  return (
    <section className="scroll-hero" ref={ref} aria-label="Universal product story">
      <div className="scroll-hero-sticky">
        <div className="scroll-hero-stage">
          <motion.div className="scroll-hero-copy" style={{ opacity: copyOpacity, y: copyY }}>
            <p className="eyebrow">Software · Quality · Growth</p>
            <h1>
              Every product,
              <br />
              fully executed
            </h1>
            <p className="lede">
              Universal Technologies is the delivery layer that designs, builds, tests, and
              launches web, mobile, and cloud products — so shipping stops depending on who
              happens to remember the next step.
            </p>
            <div className="hero-actions">
              <a className="btn btn-ink" href="#contact">
                Get Started <span aria-hidden>→</span>
              </a>
              <a className="btn btn-ghost-ink" href="#how">
                How it works
              </a>
            </div>
          </motion.div>

          <div className="scroll-hero-visual">
            <HeroFloatingCards progress={progress} reduceMotion={reduceMotion} />
          </div>
        </div>

        {/* Full-viewport swarm + globe share one center — not the right column */}
        <div className="swarm-layer" aria-hidden>
          {tiles.map((tile) => (
            <SwarmTile
              key={`${tile.label}-${tile.start.x}`}
              tile={tile}
              progress={progress}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>

        <ConstellationCanvas progress={progress} reduceMotion={reduceMotion} />

        <motion.div className="backbone-panel" style={{ opacity: panelOpacity, y: panelY }}>
          <div className="backbone-panel-inner">
            <h2>The delivery backbone for product growth</h2>
            <motion.div className="backbone-stats" style={{ opacity: statsOpacity }}>
              {metrics.map((item) => (
                <div key={item.label}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <div className="scroll-hint" aria-hidden>
          <span>Scroll</span>
          <i />
        </div>
      </div>
    </section>
  )
}

export function ScrollHero() {
  const reduceMotion = Boolean(useReducedMotion())
  return reduceMotion ? <StaticHero /> : <FullScrollHero />
}
