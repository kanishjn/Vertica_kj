"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { Play, Clock, ChevronDown, Calendar, Star, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Episode {
  id: number
  name: string
  overview: string
  still_path: string | null
  episode_number: number
  season_number: number
  runtime: number | null
  air_date: string
  vote_average: number
}

interface EpisodeViewerProps {
  episodes: Episode[]
  showTitle: string
  seasonNumber: number
}

export function EpisodeViewer({ episodes, showTitle, seasonNumber }: EpisodeViewerProps) {
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Enhanced snap to episode on scroll with smooth detection
  const handleScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    setIsScrolling(true)

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set scrolling to false after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)
    }, 150)

    const containerTop = container.scrollTop
    const containerHeight = container.clientHeight
    const centerPoint = containerTop + containerHeight / 2

    let closestEpisode = 0
    let closestDistance = Number.POSITIVE_INFINITY

    episodeRefs.current.forEach((ref, index) => {
      if (ref) {
        const episodeTop = ref.offsetTop
        const episodeHeight = ref.clientHeight
        const episodeCenter = episodeTop + episodeHeight / 2
        const distance = Math.abs(centerPoint - episodeCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestEpisode = index
        }
      }
    })

    setCurrentEpisode(closestEpisode)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  const scrollToEpisode = (index: number) => {
    const episodeRef = episodeRefs.current[index]
    if (episodeRef && containerRef.current) {
      episodeRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  if (!episodes.length) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto space-y-4 animate-fadeIn">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Info className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-300">No Episodes Available</h3>
          <p className="text-gray-500">Episodes for this season are not available yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="sticky top-16 z-20 bg-black/95 backdrop-blur-md border-b border-gray-800/50 animate-slideIn">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="animate-fadeIn">
              <h2 className="text-xl md:text-2xl font-bold">Season {seasonNumber}</h2>
              <p className="text-sm text-gray-400">{episodes.length} Episodes</p>
            </div>
            <Badge className="bg-red-600/20 text-red-400 border-red-600/30 px-3 py-1 animate-scaleIn">
              {currentEpisode + 1} of {episodes.length}
            </Badge>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {episodes.map((episode, index) => (
              <Button
                key={episode.id}
                variant={currentEpisode === index ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToEpisode(index)}
                className={`flex-shrink-0 transition-all duration-300 hover:scale-105 active:scale-95 animate-slideIn ${
                  currentEpisode === index
                    ? "bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/30 scale-105"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800 hover:border-gray-500 hover:shadow-md"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="hidden sm:inline">Episode </span>
                {episode.episode_number}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[calc(100vh-200px)] overflow-y-auto overscroll-y-contain"
        style={{
          scrollBehavior: "smooth",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            ref={(el) => (episodeRefs.current[index] = el)}
            className="min-h-screen flex items-start md:items-center justify-center p-2 md:p-4 pt-8 md:pt-4"
            style={{ scrollSnapAlign: "center" }}
          >
            <div className="max-w-6xl w-full mt-16 md:mt-0">
              <div
                className={`bg-gray-900/90 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl transition-all duration-700 ease-out animate-fadeIn ${
                  currentEpisode === index && !isScrolling
                    ? "scale-[1.02] shadow-red-500/20 shadow-2xl"
                    : "hover:scale-[1.01] hover:shadow-xl"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative aspect-video group overflow-hidden">
                  <Image
                    src={
                      episode.still_path
                        ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                        : "/placeholder.svg?height=720&width=1280"
                    }
                    alt={episode.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                    priority={index <= 2}
                  />

                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 backdrop-blur-[1px]">
                    <Button
                      size="icon"
                      className="bg-red-600 hover:bg-red-700 text-white shadow-2xl rounded-full transition-all duration-300 hover:scale-125 active:scale-95 animate-pulse hover:animate-none hover:shadow-red-500/50"
                    >
                      <Play className="w-6 h-6 fill-current" />
                    </Button>
                  </div>

                  <div className="absolute top-3 left-3 md:top-4 md:left-4 animate-slideIn">
                    <Badge className="bg-black/80 text-white backdrop-blur-sm text-xs md:text-sm transition-all duration-300 hover:bg-black/90 hover:scale-105">
                      Episode {episode.episode_number}
                    </Badge>
                  </div>

                  <div
                    className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2 animate-slideIn"
                    style={{ animationDelay: "0.1s" }}
                  >
                    {episode.vote_average > 0 && (
                      <Badge className="bg-black/80 text-white backdrop-blur-sm text-xs md:text-sm flex items-center gap-1 transition-all duration-300 hover:bg-black/90 hover:scale-105">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 animate-pulse" />
                        {episode.vote_average.toFixed(1)}
                      </Badge>
                    )}
                  </div>

                  {currentEpisode === index && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600/30 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-600 to-red-500 w-full animate-pulse shadow-lg shadow-red-500/50" />
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-6 lg:p-8 animate-fadeIn" style={{ animationDelay: "0.2s" }}>
                  <div className="mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-3 md:mb-2 transition-colors duration-300 hover:text-red-400">
                      {episode.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-400 text-xs md:text-sm lg:text-base">
                      {episode.runtime && (
                        <div className="flex items-center gap-1 transition-colors duration-300 hover:text-white">
                          <Clock className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{episode.runtime}m</span>
                        </div>
                      )}
                      {episode.air_date && (
                        <div className="flex items-center gap-1 transition-colors duration-300 hover:text-white">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                          <span>{new Date(episode.air_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed mb-6 md:mb-8 transition-colors duration-300 hover:text-gray-200">
                    {episode.overview || "No description available for this episode."}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      className="bg-red-600 hover:bg-red-700 shadow-lg transition-all duration-300 hover:shadow-red-500/40 hover:scale-105 active:scale-95 animate-slideIn"
                      size="lg"
                      style={{ animationDelay: "0.3s" }}
                    >
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Play Episode
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent hover:border-gray-500 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-md animate-slideIn"
                      size="lg"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      More Info
                    </Button>
                  </div>
                </div>
              </div>

              {index < episodes.length - 1 && (
                <div className="flex justify-center mt-6 md:mt-8 animate-fadeIn" style={{ animationDelay: "0.5s" }}>
                  <div className="animate-bounce opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer">
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-red-400 transition-colors duration-300" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}