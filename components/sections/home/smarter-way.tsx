"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { useMediaQuery } from "@/hooks/use-media-query"
import { smarterWay } from "@/lib/site-data"

function StepCard({
  index,
  total,
  title,
  text,
  progress,
  stacked,
}: {
  stacked: boolean
  index: number
  total: number
  title: string
  text: string
  progress: MotionValue<number>
}) {
  // Each card shrinks a touch as the following cards stack on top of it
  const start = index / total
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.035])

  return (
    <motion.article
      style={stacked ? { scale, top: `calc(7rem + ${index * 1.5}rem)` } : undefined}
      className="flex min-h-[19rem] origin-top flex-col rounded-2xl bg-white p-6 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.35)] sm:min-h-[22rem] sm:p-8 lg:sticky"
    >
      <span className="grid size-12 place-items-center rounded-lg border border-black/15 text-lg font-medium">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="mt-auto pt-10">
        <h3 className="text-[clamp(1.75rem,1.3rem+1.2vw,2.5rem)] leading-[1.08] font-medium tracking-[-0.025em]">{title}</h3>
        <p className="mt-4 max-w-md text-lg/relaxed text-muted-foreground">{text}</p>
      </div>
    </motion.article>
  )
}

export function SmarterWay() {
  // Cards only stack (sticky + shrink) on desktop; on phones they scroll normally.
  const stacked = useMediaQuery("(min-width: 1024px)")
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <section className="px-2 pb-24 sm:px-5 sm:pb-32">
      <div className="relative isolate overflow-clip rounded-3xl">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/street.jpg" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a3473]/95 via-[#0a3473]/80 to-[#0a3473]/40" />
        </div>

        <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            <div className="lg:sticky lg:top-28">
              <RevealText text={["A Smarter Way to", "Buy, Sell & Move"]} className="text-h2 text-white" />
              <FadeIn delay={0.2} y={20}>
                <p className="mt-6 max-w-md text-lg/relaxed text-white/80">
                  A simple four-step process that keeps you informed and in control, whether this is your first move or
                  your fifth.
                </p>
                <ButtonLink href="/contact" className="mt-8">
                  Start With a Free Call
                </ButtonLink>
              </FadeIn>
            </div>
          </div>

          <div ref={ref} className="flex flex-col gap-4">
            {smarterWay.map((step, i) => (
              <StepCard key={step.title} index={i} total={smarterWay.length} progress={scrollYProgress} stacked={stacked} {...step} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
