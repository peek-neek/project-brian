"use client"

import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import {
  ListingGrid,
  StatusToggle,
  matchesStatus,
  useStatusFilter,
} from "@/components/shared/listing-filter"
import { listings } from "@/lib/site-data"

export function FeaturedListings() {
  const [filter, setFilter] = useStatusFilter()
  const items = listings.filter((l) => matchesStatus(l, filter)).slice(0, 4)

  return (
    <section className="container-x pb-24 sm:pb-32">
      <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <RevealText text="Featured Listings" className="text-h2" />
          <FadeIn delay={0.15} y={20}>
            <p className="mt-5 max-w-xl text-lg/relaxed text-muted-foreground">
              A hand-picked selection of homes I&apos;m representing right now, plus a few recent wins for my clients.
            </p>
          </FadeIn>
        </div>
        <FadeIn delay={0.25} y={20}>
          <StatusToggle value={filter} onChange={setFilter} className="home" />
        </FadeIn>
      </div>

      <ListingGrid items={items} />

      <FadeIn className="mt-12 flex justify-center" y={20}>
        <ButtonLink href="/properties" variant="frame">
          View All Listings
        </ButtonLink>
      </FadeIn>
    </section>
  )
}
