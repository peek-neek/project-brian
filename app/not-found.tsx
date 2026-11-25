import Image from "next/image"

import Header from "@/components/globals/header"
import { ButtonLink } from "@/components/shared/button-link"
import { RevealText } from "@/components/motion/reveal-text"

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative isolate flex min-h-svh items-center overflow-hidden bg-ink text-white">
        <Image src="/images/street.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />
        <div className="container-x py-32">
          <p className="text-[clamp(6rem,4rem+10vw,14rem)] leading-none font-bold tracking-[-0.06em] text-brand">404</p>
          <RevealText as="h1" onMount text="This address isn't on the map." className="text-h2 mt-4 max-w-2xl text-white" />
          <p className="mt-5 max-w-md text-lg/relaxed text-white/75">
            The page you&apos;re looking for has moved or never existed. Let&apos;s get you back home.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to Home</ButtonLink>
            <ButtonLink
              href="/properties"
              variant="frame"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-black"
            >
              Browse Properties
            </ButtonLink>
          </div>
        </div>
      </main>
    </>
  )
}
