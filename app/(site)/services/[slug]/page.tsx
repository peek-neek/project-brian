import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons"

import { PageHero } from "@/components/shared/page-hero"
import { CtaBanner } from "@/components/shared/cta-banner"
import { ButtonLink } from "@/components/shared/button-link"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { agent, services } from "@/lib/site-data"

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  return service ? { title: service.title, description: service.short } : {}
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = services.find((s) => s.slug === slug)
  if (!service) notFound()

  const others = services.filter((s) => s.slug !== service.slug)
  const topic = slug.includes("sell") ? "selling" : slug.includes("invest") ? "investing" : "buying"

  return (
    <>
      <PageHero
        title={service.title}
        description={service.short}
        image={service.image}
        crumbs={[{ label: "Services", href: "/services" }, { label: service.title }]}
      />

      <section className="container-x py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div>
            <RevealText text="What You Get" className="text-h2" />
            <FadeIn y={20} delay={0.1}>
              <p className="mt-6 text-lg/relaxed text-muted-foreground">{service.intro}</p>
            </FadeIn>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {service.included.map((item, i) => (
                <li key={item}>
                  <FadeIn delay={i * 0.05} y={20} className="flex h-full items-start gap-3 rounded-2xl bg-white p-5 text-[17px]">
                    <HugeiconsIcon icon={CheckmarkCircle02Icon} className="mt-0.5 size-6 shrink-0" strokeWidth={1.8} />
                    {item}
                  </FadeIn>
                </li>
              ))}
            </ul>
          </div>

          <FadeIn y={50} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl lg:sticky lg:top-28">
              <Image src={agent.photo} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover object-[66%_20%]" />
              <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white p-5">
                <p className="text-xl font-bold tracking-tight">Have questions about {service.title.toLowerCase()}?</p>
                <p className="mt-1 text-muted-foreground">I&apos;m happy to talk it through — no obligation.</p>
                <ButtonLink href={`/contact?topic=${topic}`} className="mt-5 w-full justify-between">
                  Book a Free Call
                </ButtonLink>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <RevealText text={["Common", "Questions"]} className="text-h2" />
            <FadeIn y={20} delay={0.15}>
              <p className="mt-6 max-w-sm text-lg/relaxed text-muted-foreground">
                Don&apos;t see yours? Call or text {agent.phone} and I&apos;ll get you an answer.
              </p>
            </FadeIn>
          </div>
          <FadeIn y={40}>
            <Accordion defaultValue={[service.faqs[0].q]} className="gap-3 rounded-none border-0">
              {service.faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="rounded-2xl border-0 bg-white not-last:border-b-0 data-open:bg-white">
                  <AccordionTrigger className="items-center px-6 py-6 text-xl font-semibold tracking-tight hover:no-underline sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-black">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-[17px]/relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      <section className="container-x pb-24 sm:pb-32">
        <RevealText text="Other Services" className="text-h3" />
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {others.map((s, i) => (
            <FadeIn key={s.slug} delay={i * 0.08} y={40}>
              <Link href={`/services/${s.slug}`} className="group relative block h-72 overflow-hidden rounded-2xl">
                <Image src={s.image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4 text-white">
                  <p className="text-2xl font-bold tracking-tight">{s.title}</p>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand text-black transition-transform duration-500 group-hover:rotate-45">
                    <HugeiconsIcon icon={ArrowUpRight01Icon} className="size-5" strokeWidth={2.2} />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
