"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShowCard } from "./show-card"

interface Show {
  id: number
  title: string
  poster: string
  rating: number
  year: number
}

interface ShowCarouselProps {
  title: string
  shows: Show[]
}

export function ShowCarousel({ title, shows }: ShowCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320 // Width of card + gap
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative group">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{title}</h2>

      <div className="relative">
        {/* Left Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full rounded-none"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>

        {/* Right Arrow */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 h-full rounded-none"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      </div>
    </section>
  )
}
