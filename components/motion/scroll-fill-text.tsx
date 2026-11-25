"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { cn } from "@/lib/utils"

function Word({
  children,
  progress,
  range,
  from,
  to,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  from: string
  to: string
}) {
  const color = useTransform(progress, range, [from, to])
  return (
    <motion.span style={{ color }} className="inline">
      {children}
    </motion.span>
  )
}

/** Words fill from grey to solid as the paragraph scrolls through the viewport. */
export function ScrollFillText({
  text,
  className,
  from = "#b5bcc7",
  to = "#000000",
}: {
  text: string
  className?: string
  from?: string
  to?: string
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  })
  const words = text.split(" ")

  return (
    <p ref={ref} className={cn(className)} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <span key={i} aria-hidden>
            <Word progress={scrollYProgress} range={[start, end]} from={from} to={to}>
              {word}
            </Word>{" "}
          </span>
        )
      })}
    </p>
  )
}
