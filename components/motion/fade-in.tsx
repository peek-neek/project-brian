"use client"

import { motion, type HTMLMotionProps } from "motion/react"

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number
  y?: number
  x?: number
  scale?: number
  blur?: boolean
  onMount?: boolean
}

export function FadeIn({
  delay = 0,
  y = 40,
  x = 0,
  scale = 1,
  blur = false,
  onMount = false,
  children,
  ...props
}: FadeInProps) {
  const hidden = { opacity: 0, y, x, scale, ...(blur ? { filter: "blur(12px)" } : {}) }
  const shown = { opacity: 1, y: 0, x: 0, scale: 1, ...(blur ? { filter: "blur(0px)" } : {}) }

  return (
    <motion.div
      initial={hidden}
      {...(onMount
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
