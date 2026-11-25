import Image from "next/image"
import Link from "next/link"

import { Logo } from "@/components/shared/logo"
import { SocialLinks } from "@/components/shared/social-links"
import { ButtonLink } from "@/components/shared/button-link"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { agent, navLinks } from "@/lib/site-data"

const extraLinks = [
  { label: "Home Valuation", href: "/contact?topic=valuation" },
  { label: "Buying a Home", href: "/services/buying-a-home" },
  { label: "Selling Your Home", href: "/services/selling-your-home" },
]

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white">
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_80%_100%,rgb(52_84_160/0.35),transparent)]"
      />

      <div className="container-x pt-20 pb-8 sm:pt-28">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-10">
          <Logo />
          <SocialLinks tone="light" />
        </div>

        <div className="relative grid gap-14 py-14 lg:grid-cols-12 lg:gap-8 lg:pb-56">
          <div className="pointer-events-none absolute right-0 bottom-0 hidden h-44 w-[28rem] overflow-hidden rounded-t-2xl lg:block">
            <Image src="/images/house-2.jpg" alt="" fill sizes="448px" className="object-cover object-[50%_35%] opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          </div>
          <div className="lg:col-span-6">
            <RevealText as="h2" text={["Ready to Take", "the Next Step?"]} className="text-h2 text-white" />
            <FadeIn delay={0.2} y={20}>
              <p className="mt-6 max-w-md text-lg/relaxed text-white/75">
                Whether you&apos;re buying, selling or just curious what your home is worth, I&apos;m here to help you move
                forward with confidence.
              </p>
              <ButtonLink href="/contact" className="mt-9">
                Contact {agent.firstName} Today
              </ButtonLink>
            </FadeIn>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-3">
            <ul className="flex flex-col gap-3.5">
              <li>
                <Link href="/" className="text-[17px] text-white/85 transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[17px] text-white/85 transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3.5">
              {extraLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[17px] text-white/85 transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative flex flex-col gap-8 lg:col-span-3">
            <address className="text-2xl/snug font-bold tracking-tight not-italic">{agent.officeShort}</address>
            <div className="flex flex-col gap-2">
              <a href={agent.phoneHref} className="text-2xl font-bold tracking-tight transition-colors hover:text-brand sm:text-3xl">
                {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="text-lg text-white/75 transition-colors hover:text-brand">
                {agent.email}
              </a>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {agent.firstName} {agent.lastName}, {agent.title}.{agent.brokerage && ` ${agent.brokerage}.`}
            </p>
            <p className="flex gap-4">
              <span>{agent.license}</span>
              <span>{agent.serviceArea}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
