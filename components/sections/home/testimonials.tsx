"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteUpIcon, StarIcon } from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { Laurel } from "@/components/shared/laurel"
import { TestimonialCard } from "@/components/shared/testimonial-card"
import { useMediaQuery } from "@/hooks/use-media-query"
import { agent, reviewSummary, testimonials } from "@/lib/site-data"

// Grid slots around the centre portrait: [col, row]
const slots = [
  { col: 1, row: 1, toCenter: { x: "104%", y: "52%" } },
  { col: 3, row: 1, toCenter: { x: "-104%", y: "52%" } },
  { col: 1, row: 2, toCenter: { x: "104%", y: "-52%" } },
  { col: 3, row: 2, toCenter: { x: "-104%", y: "-52%" } },
]

function FlyingCard({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const slot = slots[index]
  // Phase 1: each card rises into the centre stack, one after another
  const enterStart = index * 0.1
  const flyY = useTransform(progress, [enterStart, enterStart + 0.18], ["110vh", "0vh"])
  const tilt = useTransform(progress, [enterStart, enterStart + 0.18], [index % 2 ? 8 : -8, index % 2 ? 2 : -2])
  // Phase 2: the stack spreads out into the grid
  const x = useTransform(progress, [0.58, 0.86], [slot.toCenter.x, "0%"])
  const y = useTransform(progress, [0.58, 0.86], [slot.toCenter.y, "0%"])
  const rotate = useTransform(progress, [0.58, 0.86], [1, 0])
  const settle = useTransform(() => tilt.get() * rotate.get())

  return (
    <motion.div
      style={{ y: flyY, gridColumn: slot.col, gridRow: slot.row, zIndex: 10 + index }}
      className="relative will-change-transform"
    >
      <motion.div style={{ x, y, rotate: settle }} className="h-full will-change-transform">
        <TestimonialCard t={testimonials[index]} className="shadow-[0_30px_60px_-30px_rgb(0_0_0/0.25)]" />
      </motion.div>
    </motion.div>
  )
}

function Portrait({ progress }: { progress?: MotionValue<number> }) {
  const fallback = useTransform(() => 1)
  const p = progress ?? fallback
  const scale = useTransform(p, [0.55, 0.88], [0.7, 1])
  const opacity = useTransform(p, [0.5, 0.75], [0, 1])

  return (
    <motion.div
      style={progress ? { scale, opacity } : undefined}
      className="relative h-full min-h-[28rem] overflow-hidden rounded-2xl bg-white"
    >
      <Image src={agent.photo} alt={`${agent.firstName} ${agent.lastName}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover object-[66%_20%]" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-white">
        <p className="text-2xl font-bold tracking-tight">
          {agent.firstName} {agent.lastName}
        </p>
        <p className="text-white/80">{agent.reviewCount} five-star reviews and counting</p>
      </div>
      <div className="absolute top-5 right-5 grid place-items-center">
        <span className="absolute size-16 animate-pulse-ring rounded-full bg-brand/60" />
        <span className="relative grid size-16 place-items-center rounded-full bg-brand text-black shadow-lg">
          <HugeiconsIcon icon={StarIcon} className="size-7 fill-black" strokeWidth={1.5} />
        </span>
      </div>
    </motion.div>
  )
}

/** Side panels fill the outer columns while the cards stack in the centre,
 *  then slide away just before the cards spread into those columns. */
function useSidePanelExit(progress: MotionValue<number>, side: "left" | "right") {
  const range = [0.5, 0.64]
  const opacity = useTransform(progress, range, [1, 0])
  const x = useTransform(progress, range, [0, side === "left" ? -60 : 60])
  const scale = useTransform(progress, range, [1, 0.94])
  const filter = useTransform(progress, range, ["blur(0px)", "blur(10px)"])
  return { opacity, x, scale, filter }
}

function RatingBar({ stars, percent, index, progress }: { stars: number; percent: number; index: number; progress: MotionValue<number> }) {
  const start = 0.04 + index * 0.04
  const scaleX = useTransform(progress, [start, start + 0.16], [0, percent / 100])

  return (
    <div className="flex items-center gap-3 text-[15px]">
      <span className="flex w-9 shrink-0 items-center gap-1 font-medium">
        {stars}
        <HugeiconsIcon icon={StarIcon} className="size-3.5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
      </span>
      <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-background">
        <motion.span style={{ scaleX }} className="absolute inset-0 origin-left rounded-full bg-brand" />
      </span>
      <span className="w-10 shrink-0 text-right text-muted-foreground tabular-nums">{percent}%</span>
    </div>
  )
}

function RatingPanel({ progress }: { progress: MotionValue<number> }) {
  const exit = useSidePanelExit(progress, "left")

  return (
    <motion.div style={{ ...exit, gridColumn: 1, gridRow: "1 / span 2" }} className="relative z-[1] will-change-transform">
      <FadeIn x={-40} y={0} className="flex h-full flex-col rounded-2xl bg-white p-8 xl:p-10">
        <Laurel className="-ml-2 self-start">
          <p className="px-2 text-6xl font-bold tracking-[-0.045em]">{agent.rating}</p>
          <p className="mt-1 px-2 text-muted-foreground">Out of 5</p>
        </Laurel>

        <div className="mt-6 flex items-center gap-1" aria-label={`${agent.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <HugeiconsIcon key={i} icon={StarIcon} className="size-6 fill-amber-400 text-amber-400" strokeWidth={1.5} />
          ))}
        </div>
        <p className="mt-2 text-lg font-medium tracking-tight">
          Average from {agent.reviewCount} client reviews
        </p>

        <div className="mt-6 flex items-center gap-3 border-t border-black/10 pt-6">
          <div className="flex -space-x-3">
            {testimonials.map((t) => (
              <span key={t.name} className="relative size-11 overflow-hidden rounded-full ring-[3px] ring-white">
                <Image src={t.image} alt="" fill sizes="44px" className="object-cover" />
              </span>
            ))}
          </div>
          <p className="text-[15px]/snug text-muted-foreground">Recent clients across Brampton, Mississauga & Caledon</p>
        </div>

        <div className="mt-auto flex flex-col gap-3 pt-8">
          {reviewSummary.breakdown.map((row, i) => (
            <RatingBar key={row.stars} {...row} index={i} progress={progress} />
          ))}
        </div>
      </FadeIn>
    </motion.div>
  )
}

function HighlightsPanel({ progress }: { progress: MotionValue<number> }) {
  const exit = useSidePanelExit(progress, "right")

  return (
    <motion.div style={{ ...exit, gridColumn: 3, gridRow: "1 / span 2" }} className="relative z-[1] will-change-transform">
      <FadeIn x={40} y={0} className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl bg-black p-8 text-white xl:p-10">
        <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
        <HugeiconsIcon icon={QuoteUpIcon} className="size-14 fill-brand text-brand" strokeWidth={1} />
        <p className="mt-6 text-[1.65rem] leading-tight font-semibold tracking-[-0.02em]">
          What clients mention most
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {reviewSummary.mentions.map((m) => (
            <li key={m} className="rounded-full border border-white/20 bg-white/[0.06] px-3.5 py-1.5 text-[15px] text-white/90">
              {m}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <p className="text-lg/snug text-white/75">Ready to be the next success story?</p>
          <ButtonLink href="/contact" className="mt-4 w-full justify-between">
            Book a Consultation
          </ButtonLink>
        </div>
      </FadeIn>
    </motion.div>
  )
}

function DesktopStage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  return (
    <div ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 flex h-svh items-center">
        <div className="container-x">
          <div className="grid auto-rows-fr grid-cols-3 gap-4">
            <div style={{ gridColumn: 2, gridRow: "1 / span 2" }} className="relative z-0">
              <Portrait progress={scrollYProgress} />
            </div>
            <RatingPanel progress={scrollYProgress} />
            <HighlightsPanel progress={scrollYProgress} />
            {testimonials.map((t, i) => (
              <FlyingCard key={t.name} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Testimonials() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x flex flex-col items-center text-center">
        <RevealText text="What My Clients Say" className="text-h2" />
        {/* On desktop the rating moves into the left side panel */}
        <FadeIn delay={0.2} y={20} className="mt-4 text-black lg:hidden">
          <Laurel>
            <p className="px-3 text-6xl font-bold tracking-[-0.045em]">{agent.rating}</p>
            <p className="mt-1 px-3">Out of 5</p>
          </Laurel>
        </FadeIn>
      </div>

      {isDesktop ? (
        <DesktopStage />
      ) : (
        <div className="container-x mt-12 grid gap-4 sm:grid-cols-2">
          <FadeIn className="sm:col-span-2" y={40}>
            <Portrait />
          </FadeIn>
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={(i % 2) * 0.1} y={50}>
              <TestimonialCard t={t} />
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  )
}
