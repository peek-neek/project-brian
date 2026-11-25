import type { Metadata } from "next"

import { PageHero } from "@/components/shared/page-hero"
import { CtaBanner } from "@/components/shared/cta-banner"
import { PostCard, PostCardFeatured } from "@/components/shared/post-card"
import { FadeIn } from "@/components/motion/fade-in"
import { posts } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Insights",
  description: "Brampton and GTA market updates, buying and selling guides, and investment advice.",
}

export default function InsightsPage() {
  const [featured, ...rest] = posts

  return (
    <>
      <PageHero
        title="Market Insights"
        description="Straightforward advice on buying, selling and investing in Brampton and the GTA — written from the front lines of real deals."
        image="/images/interior-4.jpg"
        crumbs={[{ label: "Insights" }]}
      />

      <section className="container-x py-16 sm:py-24">
        <FadeIn y={50}>
          <PostCardFeatured post={featured} />
        </FadeIn>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <FadeIn key={p.slug} delay={(i % 3) * 0.08} y={50} className="flex">
              <PostCard post={p} className="w-full" />
            </FadeIn>
          ))}
        </div>
      </section>

      <CtaBanner
        title={["Questions About", "the Market?"]}
        text="Every neighbourhood moves differently. Get a free, personalized market snapshot for the area you care about."
      />
    </>
  )
}
