import type { Listing } from "@/lib/site-data"

export const statusFilters = [
  { value: "all", label: "All" },
  { value: "for-sale", label: "For Sale" },
  { value: "for-lease", label: "For Lease" },
  { value: "sold", label: "Sold" },
] as const

export type StatusFilter = (typeof statusFilters)[number]["value"]

export const matchesStatus = (l: Listing, f: StatusFilter) =>
  f === "all" || l.status.toLowerCase().replace(" ", "-") === f
