"use client"

import { useEffect, useRef } from "react"
import { animate, useInView, useReducedMotion } from "motion/react"

type CountUpProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  delay?: number
  className?: string
}

export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()
  const decimals = value % 1 === 0 ? 0 : 2

  useEffect(() => {
    const node = ref.current
    if (!node || !inView) return
    const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`
    if (reduce) {
      node.textContent = format(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, value, prefix, suffix, duration, delay, decimals, reduce])

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  )
}
