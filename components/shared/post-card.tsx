import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, Clock01Icon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { formatDate, type Post } from "@/lib/site-data"
import { cn } from "@/lib/utils"

function Meta({ post, withBadge }: { post: Post; withBadge?: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
      <span className="flex items-center gap-2">
        <HugeiconsIcon icon={Calendar03Icon} className="size-5" strokeWidth={1.5} />
        {formatDate(post.date)}
      </span>
      <span aria-hidden className="h-5 w-px bg-black/15" />
      <span className="flex items-center gap-2">
        <HugeiconsIcon icon={Clock01Icon} className="size-5" strokeWidth={1.5} />
        {post.readTime}
      </span>
      {withBadge && (
        <Badge className="ml-auto h-auto rounded-md bg-background px-3 py-1.5 text-[13px] font-medium text-black">
          {post.category}
        </Badge>
      )}
    </div>
  )
}

export function PostCardFeatured({ post, className }: { post: Post; className?: string }) {
  return (
    <Link href={`/insights/${post.slug}`} className={cn("group flex flex-col", className)}>
      <div className="relative aspect-[1.7] overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
        />
        <Badge className="absolute top-5 left-5 h-auto rounded-md bg-white px-3 py-1.5 text-[13px] font-medium text-black">
          {post.category}
        </Badge>
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-5 rounded-2xl bg-white p-6">
        <Meta post={post} />
        <h3 className="text-2xl leading-[1.2] font-medium tracking-[-0.02em] transition-colors group-hover:text-black/70 sm:text-[2rem]">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}

export function PostCardCompact({ post, className }: { post: Post; className?: string }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className={cn("group flex flex-col gap-5 rounded-2xl bg-white p-6 transition-shadow duration-500 hover:shadow-[0_20px_50px_-25px_rgb(0_0_0/0.25)]", className)}
    >
      <Meta post={post} withBadge />
      <h3 className="text-2xl leading-[1.2] font-medium tracking-[-0.02em] transition-colors group-hover:text-black/70 sm:text-[2rem]">
        {post.title}
      </h3>
    </Link>
  )
}

export function PostCard({ post, className }: { post: Post; className?: string }) {
  return (
    <Link href={`/insights/${post.slug}`} className={cn("group flex flex-col", className)}>
      <div className="relative aspect-[1.5] overflow-hidden rounded-2xl">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
        />
      </div>
      <div className="mt-2 flex flex-1 flex-col gap-4 rounded-2xl bg-white p-6">
        <Meta post={post} withBadge />
        <h3 className="text-2xl leading-[1.2] font-medium tracking-[-0.02em]">{post.title}</h3>
        <p className="text-base/relaxed text-muted-foreground">{post.excerpt}</p>
      </div>
    </Link>
  )
}
