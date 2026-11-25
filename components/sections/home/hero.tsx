"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  Call02Icon,
  Mail01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { CountUp } from "@/components/motion/count-up"
import { Laurel } from "@/components/shared/laurel"
import { Avatar, AvatarGroup, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import { agent, testimonials } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink text-white">
      {/* Background photo with slow zoom-in on load + parallax on scroll */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease }}
          className="absolute inset-0"
        >
          <Image
            src="/images/house-10.jpg"
            alt="A modern family home lit up at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_50%]"
          />
        </motion.div>
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />

      <motion.div style={{ y: contentY }} className="container-x relative pt-32 pb-10 sm:pt-40 lg:pt-48">
        <div className="max-w-4xl">
          <RevealText
            as="h1"
            onMount
            delay={0.25}
            text={["Find Your Place", "in Brampton."]}
            className="text-display text-white"
          />
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-6 max-w-2xl text-base/relaxed text-white/85 sm:mt-8 sm:text-lg/relaxed"
          >
            {agent.shortBio}
          </motion.p>
        </div>

        {/* Award + social proof row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.95, ease }}
          className="mt-12 flex flex-col items-start gap-8 sm:mt-16 sm:flex-row sm:items-center sm:gap-10"
        >
          <Laurel>
            <p className="text-[13px] leading-6 font-medium tracking-tight uppercase">
              Trusted local
              <br />
              <span className="text-base font-semibold">Brampton & GTA</span>
              <br />
              <span className="text-xl font-bold">Realtor®</span>
            </p>
          </Laurel>
          <span aria-hidden className="hidden h-28 w-px bg-white/25 sm:block" />
          {/* <div className="flex items-center gap-5">
            <div>
              <CountUp
                value={agent.homesSold}
                suffix="+"
                delay={1}
                className="block text-5xl font-bold tracking-[-0.04em] sm:text-6xl"
              />
              <p className="mt-1 text-lg font-medium tracking-tight uppercase">Homes sold</p>
            </div>
            <AvatarGroup className="-space-x-3">
              {testimonials.slice(0, 3).map((t) => (
                <Avatar key={t.name} className="size-14 ring-[3px] ring-white sm:size-16">
                  <AvatarImage src={t.image} alt={t.name} />
                </Avatar>
              ))}
            </AvatarGroup>
          </div> */}
        </motion.div>

        {/* Agent card — replaces the template's property search bar */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.1, ease }}
          className="relative mt-10 rounded-2xl bg-white p-2.5 text-black shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] sm:mt-14"
        >
          <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-[1.1fr_0.8fr_1.35fr_auto]">
            <div className="flex items-center gap-4 rounded-xl bg-background p-3 md:col-span-2 xl:col-span-1">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg sm:size-[5.5rem]">
                <Image src={agent.photo} alt={`${agent.firstName} ${agent.lastName}`} fill sizes="96px" className="object-cover object-[66%_20%]" />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Available this week
                </p>
                <p className="mt-0.5 text-xl font-bold tracking-tight sm:text-2xl">
                  {agent.firstName} {agent.lastName}
                </p>
                <p className="truncate text-sm text-muted-foreground">
                  {agent.title}, {agent.license}
                </p>
              </div>
            </div>

            <ContactTile icon={Call02Icon} label="Call or text" value={agent.phone} href={agent.phoneHref} />
            <ContactTile icon={Mail01Icon} label="Email" value={agent.email} href={`mailto:${agent.email}`} />

            <Link
              href="/contact"
              className={cn(
                buttonVariants({ variant: "ink", size: "xl" }),
                "h-auto min-h-16 rounded-xl px-8 text-lg md:col-span-2 xl:col-span-1"
              )}
            >
              <HugeiconsIcon icon={Calendar03Icon} strokeWidth={2} className="size-5!" />
              Book a Consultation
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Portrait card on large screens */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 4 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1.4, delay: 0.9, ease }}
        className="absolute top-40 right-[max(60px,calc((100vw-1440px)/2+60px))] hidden w-[17rem] xl:block 2xl:w-[19rem]"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
          <Image src={agent.photo} alt="" fill sizes="320px" className="object-cover object-[66%_20%]" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
            <div className="flex items-center gap-1 text-brand">
              {Array.from({ length: 5 }).map((_, i) => (
                <HugeiconsIcon key={i} icon={StarIcon} className="size-4 fill-brand" strokeWidth={1.5} />
              ))}
              <span className="ml-1.5 text-sm font-semibold text-white">{agent.rating}</span>
            </div>
            <p className="mt-1 text-sm text-white/80">{agent.reviewCount} five-star client reviews</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function ContactTile({
  icon,
  label,
  value,
  href,
}: {
  icon: typeof Call02Icon
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group flex min-w-0 items-center gap-4 rounded-xl bg-background p-3 transition-colors duration-300 hover:bg-[#ececec]"
    >
      <span className="grid size-14 shrink-0 place-items-center rounded-lg border border-black/10 bg-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand sm:size-16">
        <HugeiconsIcon icon={icon} strokeWidth={1.8} className="size-6" />
      </span>
      <span className="min-w-0">
        <span className="block text-base font-semibold tracking-tight sm:text-lg">{label}</span>
        <span className="block truncate text-base text-muted-foreground sm:text-lg">{value}</span>
      </span>
    </a>
  )
}
