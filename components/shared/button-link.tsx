import Link from "next/link"
import type { VariantProps } from "class-variance-authority"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & { arrow?: boolean }

/** A Next.js link styled with the shadcn button variants. */
export function ButtonLink({
  className,
  variant = "brand",
  size = "cta",
  arrow = true,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2.2} aria-hidden />}
    </Link>
  )
}
