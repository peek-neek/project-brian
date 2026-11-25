import type { Metadata } from "next"

import { PageHero } from "@/components/shared/page-hero"
import { CtaBanner } from "@/components/shared/cta-banner"
import { ListingsBrowser } from "@/components/shared/listings-browser"
import { statusFilters, type StatusFilter } from "@/lib/listing-filters"

export const metadata: Metadata = {
  title: "Properties",
  description: "Homes for sale and lease across Brampton and the GTA, plus recent sales.",
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const { status } = await searchParams
  const initial = statusFilters.some((f) => f.value === status) ? (status as StatusFilter) : "all"

  return (
    <>
      <PageHero
        title="Find Your Next Home"
        description="Current listings, rentals and recent wins across Brampton and the GTA. Don't see the right fit? Many of my best deals come from my agent network before they're listed — just ask."
        image="/images/on-suburb.jpg"
        crumbs={[{ label: "Properties" }]}
      />
      <section className="container-x py-16 sm:py-24">
        <ListingsBrowser key={initial} initialStatus={initial} />
      </section>
      <CtaBanner
        title={["Looking for Something", "Off-Market?"]}
        text="Tell me what you're searching for and I'll tap my agent network for coming-soon and private listings."
      />
    </>
  )
}
