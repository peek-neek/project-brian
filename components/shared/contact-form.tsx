"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowUpRight01Icon,
  Call02Icon,
  Loading03Icon,
  Mail01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { toast } from "@/components/ui/toast"
import { agent } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const topics = [
  { value: "buying", label: "Buying" },
  { value: "selling", label: "Selling" },
  { value: "valuation", label: "Home value" },
  { value: "investing", label: "Investing" },
]

const field =
  "h-[3.75rem] rounded-lg border-0 bg-[#ebebeb] px-2 transition-shadow has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-brand"
const control = "h-full text-base placeholder:text-[#5d6272] md:text-base"

export function ContactForm({
  title = "Tell me a little about your plans and I'll get back to you within one business day.",
  defaultTopic,
  className,
}: {
  title?: string
  defaultTopic?: string
  className?: string
}) {
  const [topic, setTopic] = useState<string>(defaultTopic ?? "buying")
  const [pending, setPending] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setPending(true)
    // TODO: connect to a CRM / email service. Simulated for now.
    await new Promise((r) => setTimeout(r, 900))
    setPending(false)
    form.reset()
    toast.add({
      type: "success",
      title: "Message sent",
      description: `Thanks! ${agent.firstName} will reach out within one business day.`,
    })
  }

  return (
    <form onSubmit={onSubmit} className={cn("rounded-2xl bg-white p-5 sm:p-10", className)}>
      <p className="max-w-lg text-2xl/snug font-medium tracking-[-0.02em] sm:text-[1.75rem]/snug">{title}</p>

      <div className="mt-8 flex flex-col gap-4">
        <div>
          <span className="mb-2.5 block text-sm font-medium text-muted-foreground">I&apos;m interested in</span>
          <ToggleGroup
            value={[topic]}
            onValueChange={(v) => v[0] && setTopic(v[0])}
            spacing={2}
            className="flex-wrap"
            aria-label="Topic"
          >
            {topics.map((t) => (
              <ToggleGroupItem
                key={t.value}
                value={t.value}
                className="h-10 rounded-full border border-black/10 px-4 text-[15px] font-medium hover:bg-black/5 aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-black"
              >
                {t.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <input type="hidden" name="topic" value={topic} />
        </div>

        <Label className="sr-only" htmlFor="cf-name">Your name</Label>
        <InputGroup className={field}>
          <InputGroupAddon>
            <HugeiconsIcon icon={UserIcon} className="size-5! text-black" strokeWidth={1.6} />
          </InputGroupAddon>
          <InputGroupInput id="cf-name" name="name" required placeholder="Your name" autoComplete="name" className={control} />
        </InputGroup>

        <div className="grid gap-4 sm:grid-cols-2">
          <Label className="sr-only" htmlFor="cf-phone">Phone number</Label>
          <InputGroup className={field}>
            <InputGroupAddon>
              <HugeiconsIcon icon={Call02Icon} className="size-5! text-black" strokeWidth={1.6} />
            </InputGroupAddon>
            <InputGroupInput id="cf-phone" name="phone" type="tel" placeholder="Phone number" autoComplete="tel" className={control} />
          </InputGroup>
          <Label className="sr-only" htmlFor="cf-email">Email address</Label>
          <InputGroup className={field}>
            <InputGroupAddon>
              <HugeiconsIcon icon={Mail01Icon} className="size-5! text-black" strokeWidth={1.6} />
            </InputGroupAddon>
            <InputGroupInput id="cf-email" name="email" type="email" required placeholder="Email address" autoComplete="email" className={control} />
          </InputGroup>
        </div>

        <Label className="sr-only" htmlFor="cf-message">Message</Label>
        <Textarea
          id="cf-message"
          name="message"
          placeholder="Message"
          className="min-h-44 rounded-lg border-0 bg-[#ebebeb] p-4 text-base placeholder:text-[#5d6272] focus-visible:ring-brand md:text-base"
        />
      </div>

      <div className="mt-8 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Prefer to talk?{" "}
          <a href={agent.phoneHref} className="font-semibold text-black underline-offset-4 hover:underline">
            {agent.phone}
          </a>
        </p>
        <Button type="submit" variant="brand" size="cta" disabled={pending} className="min-w-40">
          <AnimatePresence mode="wait" initial={false}>
            {pending ? (
              <motion.span key="p" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                <HugeiconsIcon icon={Loading03Icon} className="animate-spin" strokeWidth={2} />
                Sending
              </motion.span>
            ) : (
              <motion.span key="s" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                Send Message
                <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2.2} />
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </form>
  )
}
