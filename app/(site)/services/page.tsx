import type { Metadata } from "next"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { PageHero } from "@/components/shared/page-hero"
import { CtaBanner } from "@/components/shared/cta-banner"
import { ProcessTrack } from "@/components/shared/process-track"
import { ButtonLink } from "@/components/shared/button-link"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { services } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Services",
  description: "Buyer and seller representation, first-time buyer guidance and investment property help across Brampton and the GTA.",
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="How I Can Help"
        description="Full-service representation for every kind of move — from your first condo to your next investment property."
        image="/images/on-townhomes.jpg"
        crumbs={[{ label: "Services" }]}
      />

      <section className="container-x flex flex-col gap-20 py-24 sm:gap-28 sm:py-32">
        {services.map((s, i) => (
          <article key={s.slug} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <FadeIn y={60} className={cn(i % 2 === 1 && "lg:order-2")}>
              <Link href={`/services/${s.slug}`} className="group block">
                <ParallaxImage src={s.image} alt={s.title} className="aspect-[1.2] rounded-2xl" sizes="(min-width: 1024px) 50vw, 100vw" />
              </Link>
            </FadeIn>
            <div>
              <RevealText text={s.title} className="text-h2" />
              <FadeIn y={24} delay={0.15}>
                <p className="mt-6 text-lg/relaxed text-muted-foreground">{s.intro}</p>
                <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {s.included.slice(0, 4).map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[17px]">
                      <span className="mt-2.5 size-2 shrink-0 rounded-full bg-brand ring-4 ring-brand/25" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={`/services/${s.slug}`}>Learn More</ButtonLink>
                  <Link
                    href={`/contact?topic=${s.slug.includes("sell") ? "selling" : s.slug.includes("invest") ? "investing" : "buying"}`}
                    className="group inline-flex h-12 items-center gap-2 px-2 text-[15px] font-bold"
                  >
                    Talk to Me
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2.2} />
                  </Link>
                </div>
              </FadeIn>
            </div>
          </article>
        ))}
      </section>

      <ProcessTrack />
      <CtaBanner />
    </>
  )
}
