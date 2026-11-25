import Image from "next/image"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { agent } from "@/lib/site-data"

export function CtaBanner({
  title = ["Ready to Make", "Your Move?"],
  text = "Book a free, no-pressure consultation. We'll talk through your goals and map out the smartest next step.",
}: {
  title?: string[]
  text?: string
}) {
  return (
    <section className="px-2 pb-24 sm:px-5 sm:pb-32">
      <div className="relative isolate overflow-hidden rounded-3xl bg-[#2f63b3]">
        <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10 opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2b5aa6] via-[#3a6fc0] to-[#6aa2e8]" />
        <FadeIn
          x={60}
          y={0}
          className="pointer-events-none absolute right-0 bottom-0 -z-10 hidden h-[115%] w-[46%] md:block"
        >
          <Image
            src="/images/building-1.jpg"
            alt=""
            fill
            sizes="46vw"
            className="object-cover object-left [mask-image:linear-gradient(to_right,transparent,black_30%)]"
          />
        </FadeIn>

        <div className="container-x py-16 text-white sm:py-24">
          <RevealText text={title} className="text-h2 max-w-xl text-white" />
          <FadeIn delay={0.2} y={20}>
            <p className="mt-6 max-w-md text-lg/relaxed text-white/85">{text}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact">Book a Consultation</ButtonLink>
              <ButtonLink
                href={agent.phoneHref}
                variant="frame"
                arrow={false}
                className="border-white/40 text-white hover:border-white hover:bg-white hover:text-black"
              >
                Call {agent.phone}
              </ButtonLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
