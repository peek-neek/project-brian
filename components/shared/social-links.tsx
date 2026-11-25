import { HugeiconsIcon } from "@hugeicons/react"
import {
  Facebook01Icon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"

import { agent } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const items = [
  { label: "Instagram", href: agent.socials.instagram, icon: InstagramIcon },
  { label: "LinkedIn", href: agent.socials.linkedin, icon: Linkedin01Icon },
  { label: "Facebook", href: agent.socials.facebook, icon: Facebook01Icon },
  { label: "X", href: agent.socials.x, icon: NewTwitterIcon },
]

export function SocialLinks({
  tone = "dark",
  className,
  size = "md",
}: {
  tone?: "dark" | "light"
  className?: string
  size?: "sm" | "md"
}) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            aria-label={item.label}
            className={cn(
              "grid place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5",
              size === "md" ? "size-12" : "size-10",
              tone === "dark"
                ? "border-black/15 text-black hover:border-black hover:bg-black hover:text-white"
                : "border-white/25 text-white hover:border-brand hover:bg-brand hover:text-black"
            )}
          >
            <HugeiconsIcon icon={item.icon} strokeWidth={2} className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}
