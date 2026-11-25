"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { services } from "@/lib/site-data"

export function ServicesStrip() {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <RevealText text={["How I Can", "Help You"]} className="text-h2" />
        <FadeIn y={20} delay={0.2}>
          <ButtonLink href="/services">View All Services</ButtonLink>
        </FadeIn>
      </div>

      {/* Desktop: edge-to-edge cards that widen on hover. Mobile: swipeable row. */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-1 overflow-x-auto px-1 md:overflow-visible" data-lenis-prevent-touch>
        {services.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-[78vw] shrink-0 snap-center transition-[flex-grow] duration-700 ease-out-expo sm:w-[46vw] md:w-auto md:flex-1 md:hover:flex-[1.55]"
          >
            <Link
              href={`/services/${s.slug}`}
              className="group relative block h-[26rem] overflow-hidden rounded-2xl sm:h-[32rem] lg:h-[36rem]"
            >
              <Image
                src={s.image}
                alt=""
                fill
                sizes="(min-width: 768px) 30vw, 80vw"
                className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/75" />

              <div className="absolute inset-x-5 bottom-5 max-w-[16rem] translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[15px]/relaxed text-white/90">{s.short}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Learn more <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4" strokeWidth={2.2} />
                </span>
              </div>

              <h3 className="absolute right-5 bottom-6 text-[clamp(1.9rem,1.2rem+1.6vw,2.75rem)] leading-none font-bold tracking-[-0.03em] text-white [writing-mode:vertical-rl] rotate-180">
                {s.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
