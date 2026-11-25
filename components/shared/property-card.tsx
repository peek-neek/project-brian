import Image from "next/image"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { BedDoubleIcon, Bathtub01Icon, Location01Icon, RulerIcon } from "@hugeicons/core-free-icons"

import { Badge } from "@/components/ui/badge"
import { formatPrice, type Listing } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function PropertyCard({ listing, className, priority }: { listing: Listing; className?: string; priority?: boolean }) {
  return (
    <Link href={`/properties/${listing.slug}`} className={cn("group block", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[1.43]">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          priority={priority}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-[1.06]"
        />
        <Badge
          className={cn(
            "absolute top-4 left-4 h-auto rounded-md px-4 py-2.5 text-[15px] font-medium tracking-tight shadow-sm sm:text-base",
            listing.status === "Sold" ? "bg-black text-white" : "bg-white text-black"
          )}
        >
          {listing.status}
        </Badge>
        {/* Frosted strip at the bottom like the template */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/45 to-transparent p-5 pt-14 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_60%,transparent)]">
          <span className="text-base font-semibold tracking-tight text-white sm:text-lg">{listing.type}</span>
          <span className="flex translate-y-2 items-center gap-4 text-sm text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={BedDoubleIcon} className="size-4" strokeWidth={1.8} />
              {listing.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <HugeiconsIcon icon={Bathtub01Icon} className="size-4" strokeWidth={1.8} />
              {listing.baths}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <HugeiconsIcon icon={RulerIcon} className="size-4" strokeWidth={1.8} />
              {listing.sqft.toLocaleString()} sqft
            </span>
          </span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-white p-4 sm:p-5">
        <div className="min-w-0">
          <h3 className="truncate text-xl font-medium tracking-[-0.02em] transition-colors sm:text-[1.75rem]">
            {listing.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-muted-foreground">
            <HugeiconsIcon icon={Location01Icon} className="size-[18px] text-black" strokeWidth={2} />
            {listing.location}
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-background px-3 py-1.5 text-base font-medium tracking-tight sm:text-lg">
          {formatPrice(listing.price, listing.priceSuffix)}
        </span>
      </div>
    </Link>
  )
}
