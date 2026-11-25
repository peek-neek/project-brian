import { ReactNode } from "react"

import Header from "@/components/globals/header"
import Footer from "@/components/globals/footer"
import { GridLines } from "@/components/globals/grid-lines"

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GridLines />
      <Header />
      <main className="relative">{children}</main>
      <Footer />
    </>
  )
}
