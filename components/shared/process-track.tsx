"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { useMediaQuery } from "@/hooks/use-media-query"
import { processSteps } from "@/lib/site-data"

function StepCard({ step, index }: { step: (typeof processSteps)[number]; index: number }) {
  return (
    <article className="flex h-full min-h-[18rem] w-full flex-col rounded-2xl bg-white p-6 text-black sm:p-8">
      <span className="w-fit rounded-md bg-background px-3 py-1.5 text-sm font-medium">Step {String(index + 1).padStart(2, "0")}</span>
      <h3 className="mt-auto pt-12 text-[1.75rem] leading-tight font-medium tracking-[-0.02em] sm:text-3xl">{step.title}</h3>
      <p className="mt-3 text-base/relaxed text-muted-foreground">{step.text}</p>
    </article>
  )
}

/** Vertical scroll drives the step cards sideways on desktop. */
function DesktopTrack({ header }: { header: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const x = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "-52%"])
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"])

  return (
    <div ref={ref} className="relative h-[260vh]">
      <div className="sticky top-4 flex h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a3473] via-[#071a3a] to-black">
        <div aria-hidden className="bg-grid-dark absolute inset-0" />
        <div className="container-x relative flex flex-1 flex-col justify-between py-16">
          {header}
          <div>
            <motion.div style={{ x }} className="flex w-max gap-4">
              {processSteps.map((s, i) => (
                <div key={s.title} className="w-[24rem]">
                  <StepCard step={s} index={i} />
                </div>
              ))}
            </motion.div>
            <div className="mt-10 h-1 overflow-hidden rounded-full bg-white/15">
              <motion.div style={{ width: bar }} className="h-full rounded-full bg-brand" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProcessTrack() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const header = (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <RevealText text={["My Process,", "Step by Step"]} className="text-h2 text-white" />
      <FadeIn y={20} delay={0.2} className="max-w-sm text-lg/relaxed text-white/80">
        Five clear stages, so you always know where things stand and what comes next.
      </FadeIn>
    </div>
  )

  return (
    <section className="px-2 pb-24 sm:px-5 sm:pb-32">
      {isDesktop ? (
        <DesktopTrack header={header} />
      ) : (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a3473] via-[#071a3a] to-black">
          <div aria-hidden className="bg-grid-dark absolute inset-0" />
          <div className="container-x relative py-14">
            {header}
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {processSteps.map((s, i) => (
                <FadeIn key={s.title} y={40} delay={(i % 2) * 0.08}>
                  <StepCard step={s} index={i} />
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
