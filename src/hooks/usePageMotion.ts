import { useReducedMotion } from 'framer-motion'

export const ease = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

export const fadeScale = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1 },
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
}

const viewportHead = { once: true, amount: 0.28 } as const
const viewportList = { once: true, amount: 0.12 } as const
const viewportBand = { once: true, amount: 0.4 } as const

export function usePageMotion() {
  const reduceMotion = Boolean(useReducedMotion())

  const reveal = reduceMotion
    ? {}
    : {
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: viewportHead,
        variants: fadeUp,
        transition: { duration: 0.7, ease },
      }

  const hero = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease },
      }

  const heroFollow = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, delay: 0.12, ease },
      }

  const inView = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportBand,
        transition: { duration: 0.65, ease },
      }

  const list = reduceMotion
    ? {}
    : {
        variants: stagger,
        initial: 'hidden' as const,
        whileInView: 'show' as const,
        viewport: viewportList,
      }

  const item = reduceMotion ? undefined : fadeScale
  const cardHover = reduceMotion ? undefined : { y: -8, transition: { duration: 0.25, ease } }

  return {
    reduceMotion,
    reveal,
    hero,
    heroFollow,
    inView,
    list,
    item,
    cardHover,
    ease,
  }
}
