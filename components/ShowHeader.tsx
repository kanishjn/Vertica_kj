"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Play, Plus, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Show {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  first_air_date: string
  genres: Array<{ id: number; name: string }>
  overview: string
  number_of_seasons: number
  number_of_episodes: number
  episode_run_time: number[]
  status: string
}

interface ShowHeaderProps {
  show: Show
}

export function ShowHeader({ show }: ShowHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden">
      {/* Background Image - Reverted to original positioning */}
      <div className="absolute inset-0">
        <Image
          src={
            show.backdrop_path
              ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
              : "/placeholder.svg?height=1080&width=1920"
          }
          alt={show.name}
          fill
          className={`object-cover transition-all duration-700 ease-out ${imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content with enhanced animations - Modified for mobile */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16 min-h-[70vh] md:min-h-[80vh] flex items-end md:items-end pb-8 md:pb-16 pt-32 md:pt-0">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
            {/* Poster - Hidden on small screens, visible on larger screens with animation */}
            <div className="relative w-40 md:w-48 lg:w-64 aspect-[2/3] flex-shrink-0 hidden sm:block animate-scaleIn">
              <Image
                src={
                  show.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : "/placeholder.svg?height=750&width=500"
                }
                alt={show.name}
                fill
                className="object-cover rounded-lg shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Details with staggered animations */}
            <div className="flex-1 space-y-4 lg:space-y-6 text-center lg:text-left">
              <div className="animate-fadeIn">
                <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 transition-colors duration-300 hover:text-red-400">
                  {show.name}
                </h1>

                <div
                  className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm md:text-base mb-4 animate-slideIn"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="flex items-center gap-1 transition-all duration-300 hover:scale-105">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-pulse" />
                    <span className="font-semibold">{show.vote_average.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1 transition-all duration-300 hover:scale-105">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{new Date(show.first_air_date).getFullYear()}</span>
                  </div>
                  {show.episode_run_time.length > 0 && (
                    <div className="flex items-center gap-1 transition-all duration-300 hover:scale-105">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{show.episode_run_time[0]}min</span>
                    </div>
                  )}
                  <Badge
                    variant="outline"
                    className="border-gray-500 text-gray-300 transition-all duration-300 hover:border-red-500 hover:text-red-400"
                  >
                    {show.status}
                  </Badge>
                </div>

                <div
                  className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4 animate-slideIn"
                  style={{ animationDelay: "0.2s" }}
                >
                  {show.genres.map((genre, index) => (
                    <Badge
                      key={genre.id}
                      className="bg-red-600/20 text-red-400 border-red-600/30 transition-all duration-300 hover:bg-red-600/30 hover:scale-105 animate-fadeIn"
                      style={{ animationDelay: `${0.3 + index * 0.05}s` }}
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <p
                className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed animate-fadeIn transition-colors duration-300 hover:text-gray-200"
                style={{ animationDelay: "0.4s" }}
              >
                {show.overview}
              </p>

              <div
                className="flex items-center justify-center lg:justify-start gap-2 text-sm text-gray-400 animate-slideIn transition-colors duration-300 hover:text-gray-300"
                style={{ animationDelay: "0.5s" }}
              >
                <span>
                  {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>{show.number_of_episodes} Episodes</span>
              </div>

              {/* Enhanced Buttons with staggered animations */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-red-500/40 animate-slideIn"
                  style={{ animationDelay: "0.6s" }}
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 bg-transparent shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 hover:border-white/50 animate-slideIn"
                  style={{ animationDelay: "0.7s" }}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  My List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}