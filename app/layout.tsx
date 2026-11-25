import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter_Tight } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { MotionProvider } from "@/components/providers/motion-provider"
import { Toaster } from "@/components/ui/toast"
import { agent } from "@/lib/site-data"
import { cn } from "@/lib/utils"

const display = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: `${agent.firstName} ${agent.lastName} — Brampton Realtor®`,
    template: `%s · ${agent.firstName} ${agent.lastName}`,
  },
  description: agent.shortBio,
}

export const viewport: Viewport = {
  themeColor: "#0d1222",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, display.variable)}
    >
      <body>
        <ThemeProvider forcedTheme="light" enableSystem={false}>
          <MotionProvider>
            <Toaster>
              <SmoothScroll>{children}</SmoothScroll>
            </Toaster>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
