"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react"
import { useLenis } from "lenis/react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import { Logo } from "@/components/shared/logo"
import { SocialLinks } from "@/components/shared/social-links"
import { ButtonLink } from "@/components/shared/button-link"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { agent, navLinks, posts, services } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const menuGroups: {
  label: string
  href?: string
  links?: { label: string; href: string }[]
}[] = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    links: [
      { label: "All properties", href: "/properties" },
      { label: "For sale", href: "/properties?status=for-sale" },
      { label: "For lease", href: "/properties?status=for-lease" },
      { label: "Recently sold", href: "/properties?status=sold" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "All services", href: "/services" },
      ...services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Insights",
    links: [
      { label: "All articles", href: "/insights" },
      ...posts.slice(0, 3).map((p) => ({ label: p.title, href: `/insights/${p.slug}` })),
    ],
  },
  { label: "Contact", href: "/contact" },
]

export default function Header() {
  const pathname = usePathname()
  const lenis = useLenis()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const lastY = useRef(0)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60)
    const goingDown = y > lastY.current
    setHidden(goingDown && y > 320)
    lastY.current = y
  })

  // Close the menu on navigation (adjusting state during render, not in an effect)
  const [prevPath, setPrevPath] = useState(pathname)
  if (prevPath !== pathname) {
    setPrevPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open, lenis])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            aria-hidden
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[10px]"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: hidden && !open ? "-120%" : 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 transition-all duration-500",
            scrolled && !open
              ? "bg-ink/70 shadow-[0_10px_40px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl"
              : "bg-transparent"
          )}
        />
        <div className="container-x flex items-center justify-between gap-6 py-4 sm:py-5">
          <Logo />

          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 rounded-lg border border-white/10 bg-white/[0.07] p-1.5 backdrop-blur-md lg:block"
            onMouseLeave={() => setHovered(null)}
          >
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onMouseEnter={() => setHovered(link.href)}
                    className={cn(
                      "relative z-10 block rounded-md px-4 py-2 text-[15px] font-medium tracking-tight transition-colors duration-300",
                      isActive(link.href) ? "text-brand" : "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 rounded-md bg-white/12"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative">
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen((v) => !v)}
              className="group flex h-12 cursor-pointer items-center gap-3 rounded-lg bg-brand pr-1.5 pl-4 text-black transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:h-14"
            >
              <span className="text-base font-bold tracking-tight sm:text-lg">Menu</span>
              <span className="relative grid size-9 place-items-center rounded-md bg-black sm:size-11">
                <span
                  className={cn(
                    "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-500 ease-out-expo",
                    open ? "rotate-45" : "-translate-y-[4px]"
                  )}
                />
                <span
                  className={cn(
                    "absolute h-[2px] w-5 rounded-full bg-white transition-transform duration-500 ease-out-expo",
                    open ? "-rotate-45" : "translate-y-[4px]"
                  )}
                />
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  id="site-menu"
                  key="menu"
                  data-lenis-prevent
                  initial={{ opacity: 0, y: -12, scale: 0.96, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, scale: 0.97, filter: "blur(6px)" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full right-0 mt-3 max-h-[calc(100svh-6rem)] w-[min(26rem,calc(100vw-2rem))] origin-top-right overflow-y-auto rounded-2xl bg-white p-3 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)]"
                >
                  <Accordion className="rounded-xl border-0 bg-background p-2">
                    {menuGroups.map((group, i) => (
                      <motion.div
                        key={group.label}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 + i * 0.04, duration: 0.5 }}
                      >
                        {group.links ? (
                          <AccordionItem value={group.label} className="border-0 not-last:border-b-0 data-open:bg-transparent">
                            <AccordionTrigger className="items-center px-3 py-2.5 text-lg font-bold tracking-tight hover:no-underline **:data-[slot=accordion-trigger-icon]:hidden">
                              {group.label}
                              <HugeiconsIcon
                                icon={Add01Icon}
                                strokeWidth={2}
                                className="ml-auto size-5 transition-transform duration-300 group-aria-expanded/accordion-trigger:rotate-45"
                              />
                            </AccordionTrigger>
                            <AccordionContent className="px-3 pb-2">
                              <ul className="flex flex-col gap-1 border-l border-black/10 pl-4">
                                {group.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      onClick={() => setOpen(false)}
                                      className="block py-1 text-[15px] text-muted-foreground no-underline! transition-colors hover:text-black"
                                    >
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            href={group.href!}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "group/link flex items-center justify-between rounded-md px-3 py-2.5 text-lg font-bold tracking-tight transition-colors hover:bg-black/[0.04]",
                              isActive(group.href!) && "text-black underline decoration-brand decoration-[3px] underline-offset-[6px]"
                            )}
                          >
                            {group.label}
                            <HugeiconsIcon
                              icon={ArrowUpRight01Icon}
                              strokeWidth={2}
                              className="size-5 opacity-0 transition-all duration-300 group-hover/link:opacity-100"
                            />
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </Accordion>

                  <div className="flex items-center justify-between gap-3 px-1 py-4">
                    <a href={agent.phoneHref} className="text-sm font-semibold tracking-tight hover:underline">
                      {agent.phone}
                    </a>
                    <SocialLinks size="sm" />
                  </div>

                  <ButtonLink href="/contact" className="w-full justify-between" onClick={() => setOpen(false)}>
                    Let&apos;s Talk
                  </ButtonLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>
    </>
  )
}
