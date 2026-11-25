"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView } from "motion/react"
import { cn } from "@/lib/utils"

type RotatingWordProps = {
  words: string[]
  /** Text appended to every word, e.g. a full stop */
  suffix?: string
  /** How long each word stays on screen (ms) */
  interval?: number
  /** Delay before the first word arrives (s) — lets it join a page-load reveal */
  initialDelay?: number
  className?: string
}

/**
 * Cycles through words in place: the current word drifts up and fades out
 * (accelerating away), then the next rises in and fades in (decelerating
 * into place). Pauses while off-screen.
 */
export function RotatingWord({
  words,
  suffix = "",
  interval = 2800,
  initialDelay = 0,
  className,
}: RotatingWordProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref)
  const [index, setIndex] = useState(0)
  const [hasCycled, setHasCycled] = useState(false)

  useEffect(() => {
    if (!inView || words.length < 2) return
    // Give the first word time to finish its entrance before cycling starts
    const firstWait = hasCycled ? interval : interval + initialDelay * 1000
    const id = window.setTimeout(() => {
      setHasCycled(true)
      setIndex((i) => (i + 1) % words.length)
    }, firstWait)
    return () => window.clearTimeout(id)
  }, [inView, index, interval, initialDelay, words.length, hasCycled])

  return (
    <span ref={ref} className={cn("relative inline-block whitespace-nowrap", className)}>
      <AnimatePresence mode="wait" initial>
        <motion.span
          key={words[index]}
          className="inline-block will-change-transform"
          initial={{ y: "0.45em", opacity: 0, filter: "blur(8px)" }}
          animate={{
            y: "0em",
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              duration: 0.85,
              delay: hasCycled ? 0 : initialDelay,
              ease: [0.16, 1, 0.3, 1], // decelerate into place
            },
          }}
          exit={{
            y: "-0.4em",
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] }, // accelerate away
          }}
        >
          {words[index]}
          {suffix}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
