import Image from "next/image"

import { ScrollFillText } from "@/components/motion/scroll-fill-text"
import { ButtonLink } from "@/components/shared/button-link"
import { FadeIn } from "@/components/motion/fade-in"

export function Intro() {
  return (
    <section className="container-x py-24 sm:py-32 lg:py-40">
      <ScrollFillText
        className="mx-auto max-w-6xl text-center text-[clamp(1.75rem,1rem+2.6vw,3.5rem)] leading-[1.18] font-semibold tracking-[-0.025em]"
        text="I'm a Brampton Realtor® who helps people buy, sell and invest across the GTA with confidence. My approach blends deep local knowledge, honest advice and modern marketing to get you the best possible outcome."
      />

      {/* The side photos fan out from behind the centre one as it scrolls into
          view — a CSS scroll timeline (.cluster-* in globals.css). */}
      <div className="cluster-frame relative mx-auto mt-14 flex h-36 max-w-[32rem] items-center justify-center sm:mt-16 sm:h-44">
        <div
          className="cluster-left absolute left-0 h-28 w-[38%] overflow-hidden rounded-xl shadow-lg sm:h-36"
        >
          <Image src="/images/on-brick-1.jpg" alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div
          className="cluster-right absolute right-0 h-28 w-[38%] overflow-hidden rounded-xl shadow-lg sm:h-36"
        >
          <Image src="/images/on-townhomes.jpg" alt="" fill sizes="200px" className="object-cover" />
        </div>
        <div
          className="cluster-center relative z-10 h-full w-[58%] overflow-hidden rounded-xl shadow-2xl ring-4 ring-background"
        >
          <Image src="/images/on-suburb.jpg" alt="A row of detached family homes" fill sizes="300px" className="object-cover" />
        </div>
      </div>

      <FadeIn className="mt-12 flex justify-center" y={20}>
        <ButtonLink href="/about">Read My Story</ButtonLink>
      </FadeIn>
    </section>
  )
}
