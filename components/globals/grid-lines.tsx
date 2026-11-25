/** The faint vertical column lines that run behind the light sections. */
export function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <div className="container-x relative h-full">
        <div className="relative h-full">
          {[0, 25, 50, 75, 100].map((left, i) => (
            <span
              key={left}
              className={
                "absolute top-0 h-full w-px bg-black/[0.07] " +
                (i === 1 || i === 3 ? "hidden md:block" : "")
              }
              style={{ left: `${left}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
