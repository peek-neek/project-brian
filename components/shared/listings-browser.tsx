"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import {
  ListingGrid,
  StatusToggle,
  matchesStatus,
  type StatusFilter,
} from "@/components/shared/listing-filter"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { listings } from "@/lib/site-data"

const sorts = {
  featured: "Featured",
  "price-desc": "Price: high to low",
  "price-asc": "Price: low to high",
  beds: "Most bedrooms",
} as const

type Sort = keyof typeof sorts

const bedOptions = { any: "Any beds", "3": "3+ beds", "4": "4+ beds", "5": "5+ beds" } as const
type Beds = keyof typeof bedOptions

export function ListingsBrowser({ initialStatus = "all" }: { initialStatus?: StatusFilter }) {
  const [status, setStatus] = useState<StatusFilter>(initialStatus)
  const [sort, setSort] = useState<Sort>("featured")
  const [beds, setBeds] = useState<Beds>("any")

  const items = useMemo(() => {
    const filtered = listings.filter(
      (l) => matchesStatus(l, status) && (beds === "any" || l.beds >= Number(beds))
    )
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.price - a.price)
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === "beds") return [...filtered].sort((a, b) => b.beds - a.beds)
    return filtered
  }, [status, sort, beds])

  const trigger =
    "h-[3.25rem] min-w-44 rounded-xl border-0 bg-white px-4 text-base data-[size=default]:h-[3.25rem] md:text-base"

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <StatusToggle value={status} onChange={setStatus} className="browser self-start" />
        <div className="flex flex-wrap items-center gap-3">
          <Select value={beds} onValueChange={(v) => v && setBeds(v as Beds)}>
            <SelectTrigger className={trigger} aria-label="Bedrooms">
              <SelectValue>{(v: Beds) => bedOptions[v]}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl p-1">
              {Object.entries(bedOptions).map(([k, label]) => (
                <SelectItem key={k} value={k} className="min-h-10 rounded-lg px-3 text-[15px]">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => v && setSort(v as Sort)}>
            <SelectTrigger className={trigger} aria-label="Sort by">
              <SelectValue>{(v: Sort) => sorts[v]}</SelectValue>
            </SelectTrigger>
            <SelectContent className="rounded-xl p-1">
              {Object.entries(sorts).map(([k, label]) => (
                <SelectItem key={k} value={k} className="min-h-10 rounded-lg px-3 text-[15px]">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <p className="mb-5 text-muted-foreground" aria-live="polite">
        Showing {items.length} {items.length === 1 ? "home" : "homes"}
      </p>

      <ListingGrid items={items} />

      <AnimatePresence>
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl bg-white px-6 py-16 text-center"
          >
            <p className="text-2xl font-semibold tracking-tight">No homes match these filters</p>
            <p className="max-w-md text-muted-foreground">
              Try fewer bedrooms or a different status. New listings arrive every week.
            </p>
            <Button
              variant="brand"
              size="cta"
              onClick={() => {
                setStatus("all")
                setBeds("any")
              }}
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
