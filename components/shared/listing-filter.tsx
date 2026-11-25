"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { PropertyCard } from "@/components/shared/property-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Listing } from "@/lib/site-data"
import { matchesStatus, statusFilters, type StatusFilter } from "@/lib/listing-filters"
import { cn } from "@/lib/utils"

export { matchesStatus, statusFilters, type StatusFilter }

export function StatusToggle({
  value,
  onChange,
  className,
}: {
  value: StatusFilter
  onChange: (v: StatusFilter) => void
  className?: string
}) {
  return (
    <ToggleGroup
      value={[value]}
      onValueChange={(v) => v[0] && onChange(v[0] as StatusFilter)}
      spacing={1}
      aria-label="Filter properties by status"
      className={cn("rounded-xl bg-white p-1.5", className)}
    >
      {statusFilters.map((f) => (
        <ToggleGroupItem
          key={f.value}
          value={f.value}
          className="relative h-11 rounded-lg px-4 text-base font-medium tracking-tight text-black hover:bg-transparent aria-pressed:bg-transparent sm:px-5 sm:text-[17px]"
        >
          {value === f.value && (
            <motion.span
              layoutId={`status-pill-${className ?? ""}`}
              className="absolute inset-0 rounded-lg bg-brand"
              transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
            />
          )}
          <span className="relative">{f.label}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export function ListingGrid({ items }: { items: Listing[] }) {
  return (
    <motion.div layout className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((l, i) => (
          <motion.div
            key={l.slug}
            layout
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3 } }}
            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <PropertyCard listing={l} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export function useStatusFilter(initial: StatusFilter = "all") {
  return useState<StatusFilter>(initial)
}
