import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { serviceChoices } from '../bookCallData'
import { Bars, Sparkline } from './chartPrimitives'
import { EASE, dataVar } from './chartTokens'
import type { ServiceChart } from './serviceCharts'

type Props = {
  id: string
  index: number
  title: string
  summary: string
  capabilities: string[]
  chart: ServiceChart
  exploreLabel: string
  reduceMotion: boolean
}

// Cards lean a few degrees toward the pointer, then settle back on leave.
function Tilt({ children, enabled }: { children: ReactNode; enabled: boolean }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), { stiffness: 140, damping: 18 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), { stiffness: 140, damping: 18 })

  if (!enabled) return <div className="pf-plug-tilt">{children}</div>

  return (
    <motion.div
      className="pf-plug-tilt"
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      onPointerMove={(event) => {
        const box = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - box.left) / box.width - 0.5)
        y.set((event.clientY - box.top) / box.height - 0.5)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

export function ServiceChartCard({
  id,
  index,
  title,
  summary,
  capabilities,
  chart,
  exploreLabel,
  reduceMotion,
}: Props) {
  const icon = serviceChoices.find((choice) => choice.id === id)?.icon
  const animate = !reduceMotion

  return (
    <motion.div
      className="pf-plug-cell"
      style={{ transformPerspective: 1000 }}
      initial={animate ? { opacity: 0, rotateY: -80 } : false}
      whileInView={animate ? { opacity: 1, rotateY: 0 } : undefined}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EASE }}
    >
      <Tilt enabled={animate}>
        <Link to={`/services/${id}`} className="pf-plug-link">
          <motion.article
            className="pf-plug-card"
            whileHover={animate ? { y: -6 } : undefined}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.span
              className="pf-plug-glow"
              style={{ background: `linear-gradient(90deg, transparent, var(--data-${chart.color}), transparent)` }}
              initial={animate ? { opacity: 0 } : false}
              animate={animate ? undefined : { opacity: 0.7 }}
              whileInView={animate ? { opacity: 0.7 } : undefined}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 + index * 0.06 }}
              aria-hidden
            />
            {icon ? (
              <svg className="pf-plug-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d={icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : null}
            <h3>{title}</h3>
            <p className="pf-plug-body">{summary}</p>
            <p className="pf-plug-caps">{capabilities.join(' · ')}</p>
            <div className="pf-plug-chart">
              {chart.kind === 'spark' ? (
                <Sparkline points={chart.points} color={chart.color} animate={animate} />
              ) : (
                <Bars
                  values={chart.points}
                  colors={[dataVar('slate'), dataVar('slate'), dataVar('slate'), dataVar(chart.color)]}
                  animate={animate}
                />
              )}
            </div>
            <div className="pf-plug-foot">
              <span>→ Explore {exploreLabel}</span>
            </div>
          </motion.article>
        </Link>
      </Tilt>
    </motion.div>
  )
}
