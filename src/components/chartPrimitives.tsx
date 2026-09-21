import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE, dataVar, type ChartColor } from './chartTokens'

type SparklineProps = {
  points: number[]
  color: ChartColor
  animate: boolean
  className?: string
}

// Line + soft area. The line draws itself when scrolled into view; hovering
// drags a marker along it so the value under the pointer can be read.
export function Sparkline({ points, color, animate, className }: SparklineProps) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const coords = points.map((value, i) => ({
    x: (i / (points.length - 1)) * 100,
    y: 32 - ((value - min) / range) * 28 - 2,
  }))
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(' ')
  const gradientId = `pf-spark-${color}`
  const stroke = dataVar(color)
  const marker = hover === null ? null : coords[hover]

  return (
    <div
      className={`pf-spark${className ? ` ${className}` : ''}`}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect()
        const ratio = (event.clientX - box.left) / box.width
        setHover(Math.min(points.length - 1, Math.max(0, Math.round(ratio * (points.length - 1)))))
      }}
      onPointerLeave={() => setHover(null)}
    >
      <svg className="pf-chart" viewBox="0 0 100 32" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0.28 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        <path d={`${line} L100,32 L0,32 Z`} fill={`url(#${gradientId})`} />
        {animate ? (
          <motion.path
            d={line}
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.6, ease: EASE }}
          />
        ) : (
          <path
            d={line}
            fill="none"
            stroke={stroke}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
      {marker && hover !== null ? (
        <>
          <span className="pf-spark-rule" style={{ left: `${marker.x}%` }} aria-hidden />
          <span
            className="pf-spark-dot"
            style={{ left: `${marker.x}%`, top: `${(marker.y / 32) * 100}%`, background: stroke }}
            aria-hidden
          />
          <span className="pf-tip" style={{ left: `${marker.x}%`, top: `${(marker.y / 32) * 100}%` }} aria-hidden>
            {points[hover]}
          </span>
        </>
      ) : null}
    </div>
  )
}

type BarsProps = {
  values: number[]
  colors: string[]
  animate: boolean
  className?: string
}

// Bars grow from the baseline in a stagger. Hovering one lifts it, dims the
// rest and shows its value.
export function Bars({ values, colors, animate, className }: BarsProps) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(...values) || 1

  return (
    <div className={`pf-bars${className ? ` ${className}` : ''}`} onPointerLeave={() => setHover(null)} aria-hidden>
      {values.map((value, i) => {
        const background = colors[i % colors.length]
        const height = `${(value / max) * 100}%`
        const dim = hover !== null && hover !== i
        const shared = {
          className: `pf-bar${hover === i ? ' is-hover' : ''}`,
          style: { background },
          onPointerEnter: () => setHover(i),
        }
        return (
          <div key={i} className={`pf-bar-slot${dim ? ' is-dim' : ''}`} onPointerEnter={() => setHover(i)}>
            {animate ? (
              <motion.div
                {...shared}
                initial={{ height: 0, opacity: 0.4 }}
                whileInView={{ height, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.9, delay: i * 0.045, ease: EASE }}
              />
            ) : (
              <div {...shared} style={{ ...shared.style, height }} />
            )}
            {hover === i ? (
              <span className="pf-tip is-bar" style={{ bottom: `calc(${height} + 6px)` }}>
                {value}
              </span>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function ProgressBar({
  value,
  color,
  delay = 0,
  animate,
}: {
  value: number
  color: string
  delay?: number
  animate: boolean
}) {
  return (
    <div className="hb-track">
      {animate ? (
        <motion.div
          className="hb-fill"
          style={{ background: color }}
          initial={{ width: '0%' }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: false }}
          transition={{ duration: 1.4, delay, ease: EASE }}
        />
      ) : (
        <div className="hb-fill" style={{ background: color, width: `${value}%` }} />
      )}
    </div>
  )
}

// A track with a segment that keeps sliding across it: "something is running".
export function Shimmer({ color, animate }: { color: string; animate: boolean }) {
  return (
    <div className="hb-track">
      {animate ? (
        <motion.div
          className="hb-fill hb-shimmer"
          style={{ background: color }}
          animate={{ x: ['-110%', '330%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <div className="hb-fill hb-shimmer" style={{ background: color }} />
      )}
    </div>
  )
}
