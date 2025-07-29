"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { SearchBar } from "./SearchBar"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center space-x-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-red-600">Vertica</h1>
          </Link>

          <nav className="hidden lg:flex items-center space-x-12 xl:space-x-16">
            <Link href="/" className="text-white hover:text-red-400 transition-colors font-medium">
              Home
            </Link>
            <Link href="#trending" className="text-gray-300 hover:text-red-400 transition-colors font-medium">
              Trending
            </Link>
            <Link href="#top-rated" className="text-gray-300 hover:text-red-400 transition-colors font-medium">
              Top Rated
            </Link>
            <Link href="#airing-today" className="text-gray-300 hover:text-red-400 transition-colors font-medium">
              New Episodes
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white hover:bg-white/10"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#trending"
                className="text-gray-300 hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </Link>
              <Link
                href="#top-rated"
                className="text-gray-300 hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Top Rated
              </Link>
              <Link
                href="#airing-today"
                className="text-gray-300 hover:text-red-400 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                New Episodes
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
