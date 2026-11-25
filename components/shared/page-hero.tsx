import Link from "next/link"

import { ParallaxImage } from "@/components/motion/parallax-image"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

export function PageHero({
  title,
  description,
  image,
  crumbs = [],
  children,
  className,
  size = "md",
}: {
  title: string | string[]
  description?: string
  image: string
  crumbs?: Crumb[]
  children?: React.ReactNode
  className?: string
  size?: "md" | "lg"
}) {
  return (
    <section
      className={cn(
        "relative isolate flex items-end overflow-clip bg-ink text-white",
        size === "lg" ? "min-h-[86svh]" : "min-h-[62svh] sm:min-h-[70svh]",
        className
      )}
    >
      <ParallaxImage src={image} alt="" priority strength={10} className="absolute! inset-0 -z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 to-transparent" />
      <div aria-hidden className="bg-grid-dark absolute inset-0 -z-10" />

      <div className="container-x pt-36 pb-12 sm:pt-44 sm:pb-16">
        {crumbs.length > 0 && (
          <FadeIn onMount y={12} delay={0.1}>
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="text-sm text-white/70">
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link href="/" />} className="hover:text-white">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.map((c) => (
                  <span key={c.label} className="contents">
                    <BreadcrumbSeparator className="text-white/40" />
                    <BreadcrumbItem>
                      {c.href ? (
                        <BreadcrumbLink render={<Link href={c.href} />} className="hover:text-white">
                          {c.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-brand">{c.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </span>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </FadeIn>
        )}
        <RevealText as="h1" onMount variant="chars" delay={0.2} text={title} className="text-display max-w-5xl text-white" />
        {description && (
          <FadeIn onMount y={20} delay={0.6}>
            <p className="mt-6 max-w-2xl text-lg/relaxed text-white/80">{description}</p>
          </FadeIn>
        )}
        {children && (
          <FadeIn onMount y={20} delay={0.75}>
            {children}
          </FadeIn>
        )}
      </div>
    </section>
  )
}
