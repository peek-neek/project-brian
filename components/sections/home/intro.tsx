"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "motion/react"

import { ScrollFillText } from "@/components/motion/scroll-fill-text"
import { ButtonLink } from "@/components/shared/button-link"
import { FadeIn } from "@/components/motion/fade-in"

export function Intro() {
  const clusterRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: clusterRef, offset: ["start end", "center 0.55"] })
  const leftX = useTransform(scrollYProgress, [0, 1], ["60%", "0%"])
  const rightX = useTransform(scrollYProgress, [0, 1], ["-60%", "0%"])
  const sideRotate = useTransform(scrollYProgress, [0, 1], [0, 1])
  const centerScale = useTransform(scrollYProgress, [0, 1], [0.85, 1])

  return (
    <section className="container-x py-24 sm:py-32 lg:py-40">
      <ScrollFillText
        className="mx-auto max-w-6xl text-center text-[clamp(1.75rem,1rem+2.6vw,3.5rem)] leading-[1.18] font-semibold tracking-[-0.025em]"
        text="I'm a Brampton Realtor® who helps people buy, sell and invest across the GTA with confidence. My approach blends deep local knowledge, honest advice and modern marketing to get you the best possible outcome."
      />

      <div ref={clusterRef} className="relative mx-auto mt-14 flex h-36 max-w-[32rem] items-center justify-center sm:mt-16 sm:h-44">
        <motion.div
          style={{ x: leftX, rotate: useTransform(sideRotate, [0, 1], [0, -4]) }}
          className="absolute left-0 h-28 w-[38%] overflow-hidden rounded-xl shadow-lg sm:h-36"
        >
          <Image src="/images/on-brick-1.jpg" alt="" fill sizes="200px" className="object-cover" />
        </motion.div>
        <motion.div
          style={{ x: rightX, rotate: useTransform(sideRotate, [0, 1], [0, 4]) }}
          className="absolute right-0 h-28 w-[38%] overflow-hidden rounded-xl shadow-lg sm:h-36"
        >
          <Image src="/images/on-townhomes.jpg" alt="" fill sizes="200px" className="object-cover" />
        </motion.div>
        <motion.div
          style={{ scale: centerScale }}
          className="relative z-10 h-full w-[58%] overflow-hidden rounded-xl shadow-2xl ring-4 ring-background"
        >
          <Image src="/images/on-suburb.jpg" alt="A row of detached family homes" fill sizes="300px" className="object-cover" />
        </motion.div>
      </div>

      <FadeIn className="mt-12 flex justify-center" y={20}>
        <ButtonLink href="/about">Read My Story</ButtonLink>
      </FadeIn>
    </section>
  )
}
