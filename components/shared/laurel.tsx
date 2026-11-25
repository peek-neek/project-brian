import { cn } from "@/lib/utils"

function Branch({ flip }: { flip?: boolean }) {
  const leaves = Array.from({ length: 7 })
  return (
    <svg
      viewBox="0 0 40 110"
      className={cn("h-full w-auto", flip && "-scale-x-100")}
      fill="currentColor"
      aria-hidden
    >
      <path d="M30 106C14 90 8 62 14 6" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      {leaves.map((_, i) => {
        const y = 14 + i * 13
        const x = 13 + Math.pow(i / 6, 2) * 12
        return (
          <g key={i}>
            <ellipse cx={x - 7} cy={y} rx="7.5" ry="3" transform={`rotate(-38 ${x - 7} ${y})`} />
            <ellipse cx={x + 6} cy={y + 4} rx="6.5" ry="2.6" transform={`rotate(48 ${x + 6} ${y + 4})`} />
          </g>
        )
      })}
    </svg>
  )
}

/** Decorative laurel wreath framing a short award / rating label. */
export function Laurel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-24 opacity-40 sm:h-28">
        <Branch />
      </div>
      <div className="text-center">{children}</div>
      <div className="h-24 opacity-40 sm:h-28">
        <Branch flip />
      </div>
    </div>
  )
}
