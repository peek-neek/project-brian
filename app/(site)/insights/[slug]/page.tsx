import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, Clock01Icon } from "@hugeicons/core-free-icons"

import { PageHero } from "@/components/shared/page-hero"
import { PostCard } from "@/components/shared/post-card"
import { ButtonLink } from "@/components/shared/button-link"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { agent, formatDate, posts } from "@/lib/site-data"

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  return post ? { title: post.title, description: post.excerpt } : {}
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <PageHero
        title={post.title}
        image={post.image}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: post.category }]}
        className="[&_h1]:text-[clamp(2.5rem,1.4rem+4vw,5rem)]"
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/80">
          <Badge className="h-auto rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-black">{post.category}</Badge>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Calendar03Icon} className="size-5" strokeWidth={1.5} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Clock01Icon} className="size-5" strokeWidth={1.5} />
            {post.readTime}
          </span>
        </div>
      </PageHero>

      <article className="container-x py-16 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <FadeIn y={20}>
            <p className="text-2xl/relaxed font-medium tracking-[-0.015em] text-black sm:text-[1.65rem]/relaxed">{post.excerpt}</p>
          </FadeIn>
          <Separator className="my-10" />
          {post.body.map((block, i) => (
            <FadeIn key={i} y={24} className="mt-8 first:mt-0">
              {block.heading && <h2 className="mb-3 text-3xl font-bold tracking-[-0.025em]">{block.heading}</h2>}
              <p className="text-lg/[1.8] text-muted-foreground">{block.text}</p>
            </FadeIn>
          ))}

          <FadeIn y={30} className="mt-16 flex flex-col gap-5 rounded-2xl bg-white p-5 sm:flex-row sm:items-center sm:p-6">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl">
              <Image src={agent.photo} alt="" fill sizes="80px" className="object-cover object-[66%_20%]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="text-xl font-bold tracking-tight">
                {agent.firstName} {agent.lastName}
              </p>
              <p className="text-muted-foreground">
                {agent.title}
                {agent.brokerage ? `, ${agent.brokerage}` : `, ${agent.city}`}
              </p>
            </div>
            <ButtonLink href="/contact">Ask {agent.firstName}</ButtonLink>
          </FadeIn>
        </div>
      </article>

      <section className="container-x pb-24 sm:pb-32">
        <RevealText text="Keep Reading" className="text-h2" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {related.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.1} y={50} className="flex">
              <PostCard post={p} className="w-full" />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
