import type { CSSProperties } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Image that drifts slightly inside its frame as the page scrolls.
 * Driven by a CSS scroll timeline (see `.parallax-frame` in globals.css),
 * so it stays perfectly in sync with native touch scrolling on phones.
 */
export function ParallaxImage({
  src,
  alt,
  className,
  imgClassName,
  strength = 12,
  priority,
  sizes = "100vw",
}: {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  strength?: number
  priority?: boolean
  sizes?: string
}) {
  return (
    <div className={cn("parallax-frame relative overflow-hidden", className)}>
      <div
        className="parallax-layer absolute inset-x-0 -inset-y-[15%]"
        style={{ "--parallax": `${strength}%` } as CSSProperties}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imgClassName)} />
      </div>
    </div>
  )
}
