import Link from "next/link"
import { agent } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <Link
      href="/"
      aria-label={`${agent.firstName} ${agent.lastName}, home`}
      className={cn(
        "group inline-flex items-start gap-1 leading-none",
        tone === "light" ? "text-white" : "text-black",
        className
      )}
    >
      <span className="text-[1.65rem] font-medium tracking-[-0.035em] uppercase sm:text-[2rem]">
        {agent.firstName}
      </span>
      <span className="mt-0.5 text-[0.6rem] font-semibold tracking-wide uppercase opacity-80 sm:text-[0.68rem]">
        Realtor<sup>®</sup>
      </span>
    </Link>
  )
}
