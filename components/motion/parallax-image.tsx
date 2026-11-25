"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

/** Image that drifts slightly inside its frame as the page scrolls. */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  priority,
  sizes = "100vw",
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  strength?: number
  priority?: boolean
  sizes?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[15%] inset-x-0 will-change-transform">
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imgClassName)} />
      </motion.div>
    </div>
  )
}
