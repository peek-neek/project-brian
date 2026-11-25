import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { neighborhoods } from "@/lib/site-data"

export function Neighborhoods() {
  return (
    <section className="container-x pb-24 sm:pb-32">
      <RevealText text="Neighbourhoods I Know Best" className="text-h2 text-center" />

      <div className="mt-12 grid gap-x-10 gap-y-6 rounded-3xl bg-white p-4 sm:p-6 md:grid-cols-2 lg:mt-16 lg:p-10">
        {neighborhoods.map((n, i) => (
          <FadeIn key={n.name} delay={(i % 2) * 0.1} y={40}>
            <Link href="/properties" className="group grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-5 sm:gap-8">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src={n.image}
                  alt={`Homes in ${n.name}`}
                  fill
                  sizes="(min-width: 768px) 25vw, 45vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col py-1 sm:py-3">
                <p className="text-sm text-muted-foreground sm:text-base">{n.tagline}</p>
                <h3 className="mt-2 text-2xl font-bold tracking-[-0.025em] sm:text-[2rem]">{n.name}</h3>
                <dl className="mt-auto grid grid-cols-2 gap-2 pt-4 text-sm sm:text-base">
                  <div className="rounded-lg bg-background p-2.5 sm:p-3">
                    <dt className="text-muted-foreground">Median</dt>
                    <dd className="font-bold tracking-tight">{n.median}</dd>
                  </div>
                  <div className="rounded-lg bg-background p-2.5 sm:p-3">
                    <dt className="text-muted-foreground">I&apos;ve sold</dt>
                    <dd className="font-bold tracking-tight">{n.sold} homes</dd>
                  </div>
                </dl>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                    Explore homes
                  </span>
                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.2}
                  />
                </span>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
