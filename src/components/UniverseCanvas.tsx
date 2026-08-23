import { motion, useReducedMotion } from 'framer-motion'
import type { CSSProperties } from 'react'

const nodes = [
  { cx: 78, cy: 22, r: 3.2, delay: 0 },
  { cx: 88, cy: 48, r: 2.4, delay: 0.4 },
  { cx: 72, cy: 68, r: 2.8, delay: 0.8 },
  { cx: 52, cy: 82, r: 2.2, delay: 1.2 },
  { cx: 30, cy: 70, r: 2.6, delay: 1.6 },
]

export function UniverseCanvas() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="universe" aria-hidden="true">
      <div className="universe-glow universe-glow-a" />
      <div className="universe-glow universe-glow-b" />
      <div className="universe-grid" />

      <motion.div
        className="orbit orbit-lg"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: 'linear' }
        }
      />
      <motion.div
        className="orbit orbit-md"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={
          reduceMotion ? undefined : { duration: 34, repeat: Infinity, ease: 'linear' }
        }
      />
      <motion.div
        className="orbit orbit-sm"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={
          reduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: 'linear' }
        }
      />

      <div className="orbit-core" />

      {nodes.map((node, i) => (
        <motion.span
          key={i}
          className="orbit-node"
          style={{
            left: `${node.cx}%`,
            top: `${node.cy}%`,
            width: node.r * 4,
            height: node.r * 4,
          }}
          animate={
            reduceMotion
              ? undefined
              : { scale: [1, 1.35, 1], opacity: [0.55, 1, 0.55] }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            delay: node.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <svg className="constellation" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="beam" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0" />
            <stop offset="45%" stopColor="#ff6b54" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#64748b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M78 22 L88 48 L72 68 L52 82 L30 70"
          fill="none"
          stroke="url(#beam)"
          strokeWidth="0.35"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        />
      </svg>

      {!reduceMotion && (
        <div className="particles">
          {Array.from({ length: 18 }).map((_, i) => {
            const style = {
              '--x': `${8 + ((i * 17) % 84)}%`,
              '--y': `${10 + ((i * 23) % 78)}%`,
              '--d': `${6 + (i % 7)}s`,
              '--delay': `${(i % 9) * 0.35}s`,
            } as CSSProperties
            return <span key={i} className="particle" style={style} />
          })}
        </div>
      )}
    </div>
  )
}
