import Image from "next/image"
import { HugeiconsIcon } from "@hugeicons/react"
import { StarIcon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

export type Testimonial = {
  name: string
  location: string
  image: string
  rating: number
  quote: string
}

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-2xl bg-white p-6 sm:p-8 xl:p-10", className)}>
      <div className="flex items-start gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
          <Image src={t.image} alt="" fill sizes="64px" className="object-cover" />
        </div>
        <figcaption className="min-w-0 flex-1">
          <p className="text-xl font-bold tracking-tight sm:text-2xl">{t.name}</p>
          <p className="mt-0.5 text-[15px]">{t.location}</p>
        </figcaption>
        <p className="flex shrink-0 items-center gap-1 text-lg sm:text-xl" aria-label={`${t.rating} out of 5 stars`}>
          {t.rating.toFixed(1)}
          <HugeiconsIcon icon={StarIcon} className="size-5 fill-amber-400 text-amber-400" strokeWidth={1.5} />
        </p>
      </div>
      <blockquote className="mt-auto pt-8 text-base/relaxed text-muted-foreground sm:text-[17px]/relaxed">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
    </figure>
  )
}
