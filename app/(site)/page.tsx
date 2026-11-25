import { Hero } from "@/components/sections/home/hero"
import { Intro } from "@/components/sections/home/intro"
import { FeaturedListings } from "@/components/sections/home/featured-listings"
import { Approach } from "@/components/sections/home/approach"
import { ServicesStrip } from "@/components/sections/home/services-strip"
import { SmarterWay } from "@/components/sections/home/smarter-way"
import { Testimonials } from "@/components/sections/home/testimonials"
import { Representation } from "@/components/sections/home/representation"
import { Neighborhoods } from "@/components/sections/home/neighborhoods"
import { Insights } from "@/components/sections/home/insights"
import { ContactSection } from "@/components/sections/contact-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <FeaturedListings />
      <Approach />
      <ServicesStrip />
      <SmarterWay />
      <Testimonials />
      <Representation />
      <Neighborhoods />
      <Insights />
      <ContactSection />
    </>
  )
}
