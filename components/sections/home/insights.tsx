import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { ButtonLink } from "@/components/shared/button-link"
import { PostCardCompact, PostCardFeatured } from "@/components/shared/post-card"
import { posts } from "@/lib/site-data"

export function Insights() {
  const [first, ...rest] = posts

  return (
    <section className="container-x pb-24 sm:pb-32">
      <div className="mb-10 flex flex-col gap-6 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <RevealText text={["Market Insights", "& Home Guides"]} className="text-h2" />
        <FadeIn y={20} delay={0.2}>
          <ButtonLink href="/insights">All Articles</ButtonLink>
        </FadeIn>
      </div>
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <FadeIn y={50} className="flex">
          <PostCardFeatured post={first} className="w-full" />
        </FadeIn>
        <div className="flex flex-col gap-4">
          {rest.slice(0, 3).map((p, i) => (
            <FadeIn key={p.slug} y={40} delay={0.08 * (i + 1)} className="flex flex-1">
              <PostCardCompact post={p} className="w-full" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
