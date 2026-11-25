"use client"

import { Fragment } from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

type RevealTextProps = {
  text: string | string[]
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span"
  className?: string
  /** "lines" slides each word up from a mask (SplitText-style line reveal).
   *  "chars" fades & un-blurs characters one by one. */
  variant?: "lines" | "chars"
  delay?: number
  stagger?: number
  /** Animate on mount instead of when scrolled into view */
  onMount?: boolean
}

const ease = [0.16, 1, 0.3, 1] as const

const wordVariants: Variants = {
  hidden: { y: "110%", rotate: 4 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
}

const charVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(10px)", x: 14 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    x: 0,
    transition: { duration: 0.7, ease },
  },
}

/**
 * Accessible split-text reveal. Screen readers get the plain string via
 * aria-label; the split spans are aria-hidden.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className,
  variant = "lines",
  delay = 0,
  stagger,
  onMount = false,
}: RevealTextProps) {
  const lines = Array.isArray(text) ? text : [text]
  const label = lines.join(" ")
  const MotionTag = motion[Tag]

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger ?? (variant === "chars" ? 0.018 : 0.06),
      },
    },
  }

  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, margin: "0px 0px -12% 0px" },
      }

  return (
    <MotionTag aria-label={label} className={className} variants={container} {...trigger}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden className={cn(Array.isArray(text) && "block")}>
          {line.split(" ").map((word, wi, arr) => (
            <Fragment key={wi}>
              {variant === "lines" ? (
                <span className="inline-block overflow-hidden pb-[0.08em] mb-[-0.08em] align-bottom">
                  <motion.span className="inline-block origin-bottom-left will-change-transform" variants={wordVariants}>
                    {word}
                  </motion.span>
                </span>
              ) : (
                <span className="inline-block whitespace-nowrap">
                  {word.split("").map((ch, ci) => (
                    <motion.span key={ci} className="inline-block" variants={charVariants}>
                      {ch}
                    </motion.span>
                  ))}
                </span>
              )}
              {wi < arr.length - 1 && " "}
            </Fragment>
          ))}
        </span>
      ))}
    </MotionTag>
  )
}
