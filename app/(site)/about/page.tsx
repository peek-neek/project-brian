import type { Metadata } from "next"
import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Award01Icon, Home09Icon, Key01Icon, LicenseIcon } from "@hugeicons/core-free-icons"

import { PageHero } from "@/components/shared/page-hero"
import { CtaBanner } from "@/components/shared/cta-banner"
import { ProcessTrack } from "@/components/shared/process-track"
import { TestimonialCard } from "@/components/shared/testimonial-card"
import { ButtonLink } from "@/components/shared/button-link"
import { SocialLinks } from "@/components/shared/social-links"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { CountUp } from "@/components/motion/count-up"
import { ScrollFillText } from "@/components/motion/scroll-fill-text"
import { ParallaxImage } from "@/components/motion/parallax-image"
import { agent, stats, testimonials } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "About",
  description: `Meet ${agent.firstName} ${agent.lastName}, a Brampton Realtor® with ${agent.yearsExperience}+ years of local experience.`,
}

const credentials = [
  { icon: LicenseIcon, title: "RECO Registered", text: "Licensed to trade real estate in Ontario" },
  { icon: Award01Icon, title: "Peel Region Focus", text: "Brampton, Mississauga & Caledon" },
  { icon: Home09Icon, title: "First-Time Buyer Guide", text: "FHSA, Home Buyers' Plan & rebates explained" },
  { icon: Key01Icon, title: "Newcomers Welcome", text: "Helping families settle into the GTA" },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={`Meet ${agent.firstName}`}
        description={`${agent.title} serving ${agent.serviceArea} for over ${agent.yearsExperience} years.`}
        image="/images/house-6.jpg"
        crumbs={[{ label: "About" }]}
      />

      {/* Bio */}
      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <FadeIn y={60} className="relative">
            <ParallaxImage
              src={agent.photo}
              alt={`${agent.firstName} ${agent.lastName}`}
              strength={6}
              imgClassName="object-[66%_20%]"
              className="aspect-[4/5] rounded-2xl"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-brand px-6 py-5 shadow-xl sm:left-10">
              <CountUp value={agent.yearsExperience} suffix="+" className="block text-5xl font-bold tracking-[-0.04em]" />
              <p className="font-medium">Years in the GTA</p>
            </div>
          </FadeIn>

          <div className="flex flex-col justify-center pt-6 lg:pt-0">
            <RevealText text={["Local Roots,", "Honest Advice"]} className="text-h2" />
            <FadeIn y={24} delay={0.15}>
              {agent.bio.map((p) => (
                <p key={p.slice(0, 20)} className="mt-6 text-lg/relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <ButtonLink href="/contact">Work With {agent.firstName}</ButtonLink>
                <SocialLinks />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Statement */}
      <section className="container-x pb-24 sm:pb-32">
        <ScrollFillText
          className="mx-auto max-w-5xl text-center text-[clamp(1.75rem,1rem+2.4vw,3.25rem)] leading-[1.2] font-semibold tracking-[-0.025em]"
          text="Buying or selling a home is one of the biggest decisions you'll ever make. You deserve someone who tells you the truth, answers the phone, and treats your move like it's their own."
        />
      </section>

      {/* Stats */}
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
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

      <ProcessTrack />

      {/* Credentials */}
      <section className="container-x pb-24 sm:pb-32">
        <RevealText text="What Sets Me Apart" className="text-h2 text-center" />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          {credentials.map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.08} y={40} className="group rounded-2xl bg-white p-6 sm:p-8">
              <span className="grid size-14 place-items-center rounded-xl bg-background transition-colors duration-500 group-hover:bg-brand">
                <HugeiconsIcon icon={c.icon} className="size-7" strokeWidth={1.6} />
              </span>
              <h3 className="mt-10 text-2xl font-bold tracking-[-0.02em]">{c.title}</h3>
              <p className="mt-2 text-muted-foreground">{c.text}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-x pb-24 sm:pb-32">
        <RevealText text="Kind Words From Clients" className="text-h2" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={(i % 2) * 0.1} y={50}>
              <TestimonialCard t={t} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Office */}
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid items-center gap-10 rounded-3xl bg-white p-4 sm:p-6 lg:grid-cols-2 lg:p-8">
          <div className="relative aspect-[1.4] overflow-hidden rounded-2xl">
            <Image src="/images/interior-1.jpg" alt="Brian's office lounge" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="p-2 lg:p-6">
            <RevealText text={["Visit the", "Office"]} className="text-h3" />
            <FadeIn y={20} delay={0.15}>
              <p className="mt-5 text-lg/relaxed text-muted-foreground">
                Drop by for a coffee and a no-pressure chat about the market. Weekend and evening appointments available.
              </p>
              <address className="mt-6 text-xl font-semibold tracking-tight not-italic">{agent.office}</address>
              {agent.brokerage && <p className="mt-1 text-muted-foreground">{agent.brokerage}</p>}
              <ButtonLink href="/contact" variant="ink" className="mt-8">
                Schedule a Visit
              </ButtonLink>
            </FadeIn>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
