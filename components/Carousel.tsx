"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PosterCard } from "./PosterCard"

interface Show {
  id: number
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date: string
}

interface CarouselProps {
  title: string
  shows: Show[]
}

export function Carousel({ title, shows }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const handleResize = () => checkScrollButtons()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [shows])

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current && !isScrolling) {
      setIsScrolling(true)
      const scrollAmount = window.innerWidth < 768 ? 200 : 320
      const newScrollLeft = scrollRef.current.scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount)

      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      setTimeout(() => {
        setIsScrolling(false)
        checkScrollButtons()
      }, 500)
    }
  }

  return (
    <section className="relative" id={title.toLowerCase().replace(/\s+/g, "-")}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-white animate-slideIn">{title}</h2>

      <div className="relative group">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black/95 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full w-8 h-8 shadow-lg"
            disabled={isScrolling}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        )}

        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-black/80 hover:bg-black/95 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full w-8 h-8 shadow-lg"
            disabled={isScrolling}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-1"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
          onScroll={checkScrollButtons}
        >
          {shows.map((show, index) => (
            <div key={show.id} className="animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
              <PosterCard show={show} />
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-black to-transparent pointer-events-none z-10 opacity-50" />
        <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-black to-transparent pointer-events-none z-10 opacity-50" />
      </div>
    </section>
  )
}
