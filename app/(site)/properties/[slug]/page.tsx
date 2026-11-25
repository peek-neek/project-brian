import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BedDoubleIcon,
  Bathtub01Icon,
  Calendar01Icon,
  CarParking01Icon,
  Location01Icon,
  Maximize01Icon,
  RulerIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { PageHero } from "@/components/shared/page-hero"
import { PropertyCard } from "@/components/shared/property-card"
import { ContactForm } from "@/components/shared/contact-form"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { agent, formatPrice, listings } from "@/lib/site-data"

export function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const listing = listings.find((l) => l.slug === slug)
  return listing ? { title: listing.title, description: listing.summary } : {}
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const listing = listings.find((l) => l.slug === slug)
  if (!listing) notFound()

  const facts = [
    { icon: BedDoubleIcon, label: "Bedrooms", value: listing.beds },
    { icon: Bathtub01Icon, label: "Bathrooms", value: listing.baths },
    { icon: RulerIcon, label: "Interior", value: `${listing.sqft.toLocaleString()} sqft` },
    { icon: Maximize01Icon, label: "Lot size", value: listing.lot ?? "—" },
    { icon: Calendar01Icon, label: "Year built", value: listing.year },
    { icon: CarParking01Icon, label: "Garage", value: `${listing.garage} cars` },
  ]

  const related = listings.filter((l) => l.slug !== listing.slug && l.status !== "Sold").slice(0, 2)

  return (
    <>
      <PageHero
        title={listing.title}
        image={listing.image}
        crumbs={[{ label: "Properties", href: "/properties" }, { label: listing.title }]}
      >
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Badge className="h-auto rounded-md bg-brand px-4 py-2 text-base font-semibold text-black">{listing.status}</Badge>
          <span className="flex items-center gap-2 text-lg text-white/85">
            <HugeiconsIcon icon={Location01Icon} className="size-5" strokeWidth={1.8} />
            {listing.location}
          </span>
          <span className="text-3xl font-bold tracking-[-0.03em] sm:text-4xl">
            {formatPrice(listing.price, listing.priceSuffix)}
          </span>
        </div>
      </PageHero>

      {/* Gallery */}
      <section className="container-x pt-4 sm:pt-6">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr] md:grid-rows-2">
          {listing.gallery.map((src, i) => (
            <FadeIn
              key={src}
              delay={i * 0.1}
              y={40}
              className={i === 0 ? "md:row-span-2" : undefined}
            >
              <div className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-[4/3]"}`}>
                <Image
                  src={src}
                  alt={`${listing.title} photo ${i + 1}`}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Details */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f, i) => (
                <FadeIn key={f.label} delay={i * 0.05} y={24} className="rounded-2xl bg-white p-5">
                  <HugeiconsIcon icon={f.icon} className="size-6 text-muted-foreground" strokeWidth={1.5} />
                  <p className="mt-6 text-sm text-muted-foreground">{f.label}</p>
                  <p className="text-xl font-bold tracking-tight sm:text-2xl">{f.value}</p>
                </FadeIn>
              ))}
            </div>

            <div className="mt-14">
              <RevealText text="About This Home" className="text-h3" />
              <FadeIn y={20} delay={0.1}>
                {listing.description.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-5 text-lg/relaxed text-muted-foreground">
                    {p}
                  </p>
                ))}
              </FadeIn>
            </div>

            <Separator className="my-12" />

            <div>
              <RevealText text="Highlights" className="text-h3" />
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {listing.features.map((f, i) => (
                  <li key={f}>
                    <FadeIn delay={i * 0.04} y={16} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3.5 text-[17px]">
                      <span className="grid size-7 place-items-center rounded-full bg-brand">
                        <HugeiconsIcon icon={Tick02Icon} className="size-4" strokeWidth={2.5} />
                      </span>
                      {f}
                    </FadeIn>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside>
            <div className="flex flex-col gap-3 lg:sticky lg:top-28">
              <div className="flex items-center gap-4 rounded-2xl bg-black p-4 text-white">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                  <Image src={agent.photo} alt="" fill sizes="64px" className="object-cover object-[66%_20%]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/60">Listing agent</p>
                  <p className="text-xl font-bold tracking-tight">
                    {agent.firstName} {agent.lastName}
                  </p>
                  <a href={agent.phoneHref} className="text-brand hover:underline">
                    {agent.phone}
                  </a>
                </div>
              </div>
              <ContactForm
                title={listing.status === "Sold" ? "Want results like this for your home?" : `Schedule a private tour of ${listing.title}.`}
                defaultTopic={listing.status === "Sold" ? "selling" : "buying"}
                className="sm:p-7"
              />
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-x pb-24 sm:pb-32">
          <RevealText text="You May Also Like" className="text-h2" />
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {related.map((l, i) => (
              <FadeIn key={l.slug} delay={i * 0.1} y={50}>
                <PropertyCard listing={l} />
              </FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
