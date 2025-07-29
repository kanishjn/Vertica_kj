import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Vertica - TV Show Discovery Platform",
  description:
    "Discover amazing TV shows with Vertica. Browse trending series, top-rated classics, and what's airing today.",
  keywords: "TV shows, streaming, entertainment, discovery, episodes, Netflix, TMDB",
  authors: [{ name: "Vertica Team" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Vertica - TV Show Discovery Platform",
    description: "Discover amazing TV shows with Vertica",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased`}>{children}</body>
    </html>
  )
}
