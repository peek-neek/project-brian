import type { Metadata } from "next"

import { PageHero } from "@/components/shared/page-hero"
import { ContactSection } from "@/components/sections/contact-section"
import { RevealText } from "@/components/motion/reveal-text"
import { FadeIn } from "@/components/motion/fade-in"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { agent } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${agent.firstName} ${agent.lastName} to buy, sell or invest in Brampton and GTA real estate.`,
}

const faqs = [
  { q: "How quickly will you get back to me?", a: "Within one business day — usually the same day. For anything urgent, call or text and I'll pick up or reply within the hour." },
  { q: "Is the first consultation really free?", a: "Yes. We'll talk through your goals, timeline and budget with zero obligation. You'll leave with a clear next step either way." },
  { q: "Which areas do you cover?", a: "I focus on Brampton, Mississauga, Caledon and the surrounding GTA. If you're moving elsewhere in Ontario, I have trusted agent partners and can refer you to someone great." },
  { q: "Can we meet in person?", a: `Of course. I'm happy to meet at my office at ${agent.officeShort}, at a coffee shop, or at your home.` },
]

const topics = ["buying", "selling", "valuation", "investing"]

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams

  return (
    <>
      <PageHero
        title="Let's Talk"
        description="Whether you're ready to move or just exploring, I'm here to answer your questions with no pressure."
        image="/images/on-modern-snow.jpg"
        crumbs={[{ label: "Contact" }]}
      />
      <ContactSection
        defaultTopic={topic && topics.includes(topic) ? topic : undefined}
        heading={["Tell me about", "your plans."]}
      />
      <section className="container-x pb-24 sm:pb-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <RevealText text={["Before", "You Reach Out"]} className="text-h2" />
          <FadeIn y={40}>
            <Accordion defaultValue={[faqs[0].q]} className="gap-3 rounded-none border-0">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q} className="rounded-2xl border-0 bg-white not-last:border-b-0 data-open:bg-white">
                  <AccordionTrigger className="items-center px-6 py-6 text-xl font-semibold tracking-tight hover:no-underline sm:text-2xl **:data-[slot=accordion-trigger-icon]:size-6 **:data-[slot=accordion-trigger-icon]:text-black">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 text-[17px]/relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
