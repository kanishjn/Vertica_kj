"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Play, Clock, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Episode {
  id: number
  title: string
  overview: string
  still: string
  episode_number: number
  season_number: number
  runtime: number
}

interface EpisodeViewerProps {
  episodes: Episode[]
  showTitle: string
}

export function EpisodeViewer({ episodes, showTitle }: EpisodeViewerProps) {
  const [currentEpisode, setCurrentEpisode] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const episodeRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
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
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToEpisode = (index: number) => {
    const episodeRef = episodeRefs.current[index]
    if (episodeRef && containerRef.current) {
      episodeRef.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }

  return (
    <div className="relative">
      <div className="sticky top-0 z-20 bg-black/95 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="container mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Episodes</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {episodes.map((episode, index) => (
              <Button
                key={episode.id}
                variant={currentEpisode === index ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToEpisode(index)}
                className={`flex-shrink-0 ${
                  currentEpisode === index
                    ? "bg-red-600 hover:bg-red-700"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }`}
              >
                S{episode.season_number}E{episode.episode_number}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={containerRef}
        className="h-[calc(100vh-200px)] overflow-y-auto snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            ref={(el) => (episodeRefs.current[index] = el)}
            className="min-h-screen snap-center flex items-center justify-center p-4"
          >
            <div className="max-w-4xl w-full">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
                {/* Episode Image */}
                <div className="relative aspect-video">
                  <Image src={episode.still || "/placeholder.svg"} alt={episode.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50">
                      <Play className="w-8 h-8 fill-current" />
                    </Button>
                  </div>

                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white">
                      S{episode.season_number}E{episode.episode_number}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{episode.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{episode.runtime}m</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">{episode.overview}</p>

                  <div className="flex gap-3">
                    <Button className="bg-red-600 hover:bg-red-700">
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Play Episode
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>

              {index < episodes.length - 1 && (
                <div className="flex justify-center mt-8">
                  <div className="animate-bounce">
                    <ChevronDown className="w-6 h-6 text-gray-400" />
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
