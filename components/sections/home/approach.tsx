import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { BedDoubleIcon, Bathtub01Icon, Message01Icon } from "@hugeicons/core-free-icons"

import { ParallaxImage } from "@/components/motion/parallax-image"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { CountUp } from "@/components/motion/count-up"
import { ButtonLink } from "@/components/shared/button-link"
import { formatPrice, listings, stats } from "@/lib/site-data"

export function Approach() {
  const featured = listings[2]

  return (
    <section className="container-x pb-24 sm:pb-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
        <FadeIn className="relative" y={60}>
          <ParallaxImage
            src="/images/on-porch.jpg"
            alt="A two-storey family home with a front porch"
            className="aspect-[4/4.4] rounded-2xl sm:aspect-[0.88]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <FadeIn
            delay={0.35}
            y={40}
            className="absolute inset-x-4 bottom-4 flex gap-3 rounded-2xl bg-white p-3 shadow-xl sm:inset-x-12 sm:bottom-12"
          >
            <div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-lg sm:w-36">
              <Image src={featured.gallery[1]} alt="" fill sizes="144px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
              <p className="truncate text-lg font-bold tracking-tight sm:text-2xl">{featured.title}</p>
              <div className="flex gap-5 border-b border-black/10 pb-2 text-sm sm:text-base">
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={BedDoubleIcon} className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  {featured.beds} Beds
                </span>
                <span className="flex items-center gap-2">
                  <HugeiconsIcon icon={Bathtub01Icon} className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  {featured.baths} Baths
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-bold tracking-tight sm:text-2xl">{formatPrice(featured.price)}</span>
                <span className="hidden items-center gap-2 text-sm sm:flex">
                  <HugeiconsIcon icon={Message01Icon} className="size-5 text-muted-foreground" strokeWidth={1.5} />
                  12 showings booked
                </span>
              </div>
            </div>
          </FadeIn>
        </FadeIn>

        <div>
          <RevealText text={["Local Expertise,", "Modern Approach"]} className="text-h2" />
          <FadeIn delay={0.15} y={24}>
            <p className="mt-6 text-lg/relaxed text-muted-foreground">
              Every client gets a clear plan, real numbers and a single point of contact. I pair years of
              Brampton and GTA knowledge with professional photography, targeted digital marketing and a trusted network of
              lenders, inspectors and contractors — so nothing falls through the cracks.
            </p>
            <ButtonLink href="/about" variant="frame" className="mt-9">
              How I Work
            </ButtonLink>
          </FadeIn>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-2 gap-3 sm:mt-32 lg:grid-cols-4 lg:gap-4">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.08} y={30} className="rounded-2xl bg-white px-4 py-10 text-center sm:py-12">
            <CountUp
              value={s.value}
              prefix={s.prefix}
              suffix={s.suffix}
              className="block text-[clamp(2.5rem,1.6rem+3vw,4.5rem)] leading-none font-bold tracking-[-0.045em]"
            />
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">{s.label}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
