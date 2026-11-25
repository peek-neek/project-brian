import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { Call02Icon, Location01Icon, Mail01Icon } from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ContactForm } from "@/components/shared/contact-form"
import { agent } from "@/lib/site-data"

export function ContactSection({
  defaultTopic,
  heading = ["Have questions or", "ready to make", "your move?"],
}: {
  defaultTopic?: string
  heading?: string[]
}) {
  const rows = [
    { icon: Location01Icon, label: agent.officeShort, href: `https://maps.google.com/?q=${encodeURIComponent(agent.office)}` },
    { icon: Call02Icon, label: agent.phone, href: agent.phoneHref },
    { icon: Mail01Icon, label: agent.email, href: `mailto:${agent.email}` },
  ]

  return (
    <section id="contact" className="relative isolate overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image src="/images/on-modern-snow.jpg" alt="" fill sizes="100vw" className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </div>

      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col justify-between gap-10">
          <RevealText text={heading} className="text-h2 max-w-xl" />
          <FadeIn y={40} className="relative isolate overflow-hidden rounded-2xl bg-black p-3 text-white lg:max-w-[35rem]">
            <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
            <ul className="flex flex-col">
              {rows.map((r) => (
                <li key={r.label}>
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-4 rounded-xl p-2 transition-colors hover:bg-white/5"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/10 transition-colors group-hover:bg-brand group-hover:text-black">
                      <HugeiconsIcon icon={r.icon} className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="text-[17px] font-medium tracking-tight">{r.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <FadeIn y={60} delay={0.1}>
          <ContactForm defaultTopic={defaultTopic} className="shadow-[0_40px_80px_-40px_rgb(0_0_0/0.25)]" />
        </FadeIn>
      </div>
    </section>
  )
}
