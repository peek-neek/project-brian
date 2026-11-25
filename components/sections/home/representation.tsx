import { HugeiconsIcon } from "@hugeicons/react"
import { CheckmarkCircle02Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { cn } from "@/lib/utils"

const plans = [
  {
    name: "For Buyers",
    headline: "Free consultation",
    note: "No obligation",
    dark: true,
    cta: { label: "Start Your Home Search", href: "/contact?topic=buying" },
    features: [
      "Personal home-search strategy",
      "Coming-soon & exclusive listings",
      "Neighbourhood & pricing analysis",
      "Offer strategy & negotiation",
      "Inspection, financing & lawyer coordination",
      "Mortgage broker & inspector referrals",
    ],
  },
  {
    name: "For Sellers",
    headline: "Free home valuation",
    note: "Report in 48 hours",
    dark: false,
    cta: { label: "Get My Home's Value", href: "/contact?topic=valuation" },
    features: [
      "Data-driven pricing strategy",
      "Staging & prep consultation",
      "Pro photography, video & floor plans",
      "MLS® listing & targeted digital ads",
      "Open houses & private showings",
      "Offer review & closing coordination",
    ],
  },
]

export function Representation() {
  return (
    <section className="container-x pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl text-center">
        <RevealText text="Simple, Transparent Representation" className="text-h2" />
        <FadeIn delay={0.15} y={20}>
          <p className="mx-auto mt-5 max-w-xl text-lg/relaxed text-muted-foreground">
            Clear terms agreed in writing before we start. No surprises, no pressure — just a plan that fits your goals.
          </p>
        </FadeIn>
      </div>

      <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-2">
        {plans.map((p, i) => (
          <FadeIn
            key={p.name}
            delay={i * 0.12}
            y={50}
            className={cn(
              "relative isolate flex flex-col overflow-hidden rounded-2xl p-6 sm:p-10",
              p.dark ? "bg-black text-white" : "bg-white text-black"
            )}
          >
            {p.dark && <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 [background-size:140px_140px]" />}
            {p.dark && (
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent" />
            )}
            <div className="grid gap-8 sm:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-xl font-medium tracking-tight">{p.name}</p>
                <p className="mt-5 text-[2rem] leading-[1.05] font-bold tracking-[-0.035em] sm:text-[2.6rem]">{p.headline}</p>
                <p className={cn("mt-2 text-lg", p.dark ? "text-white/70" : "text-muted-foreground")}>{p.note}</p>
              </div>
              <ul className="flex flex-col gap-3">
                {p.features.map((f) => (
                  <li key={f} className={cn("flex items-start gap-3 text-[17px]", p.dark ? "text-white" : "text-muted-foreground")}>
                    <HugeiconsIcon
                      icon={p.dark ? CheckmarkCircle02Icon : Tick02Icon}
                      className={cn("mt-0.5 size-5 shrink-0", p.dark ? "text-white" : "text-black")}
                      strokeWidth={2}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <ButtonLink href={p.cta.href} className="mt-10 self-start" arrow={false}>
              {p.cta.label}
            </ButtonLink>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
