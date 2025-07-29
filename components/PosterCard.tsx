"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Show {
  id: number
  name: string
  poster_path: string | null
  vote_average: number
  first_air_date: string
}

interface PosterCardProps {
  show: Show
}

export function PosterCard({ show }: PosterCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link href={`/tv/${show.id}`}>
      <div
        className="relative flex-shrink-0 w-44 md:w-52 lg:w-60 cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20"
        style={{ scrollSnapAlign: "start" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg hover:shadow-xl hover:shadow-red-500/20 transition-all duration-300">
          <Image
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "/placeholder.svg?height=750&width=500"
            }
            alt={show.name}
            fill
            className={`object-cover transition-all duration-500 hover:scale-110 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 176px, (max-width: 1024px) 208px, 240px"
          />

          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button size="icon" className="bg-red-600 hover:bg-red-700 text-white shadow-lg rounded-full">
              <Play className="w-5 h-5 fill-current" />
            </Button>
          </div>

          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-white">{show.vote_average.toFixed(1)}</span>
          </div>
        </div>

        <div className="mt-3 space-y-1 px-1">
          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 hover:text-red-400 transition-colors duration-300">
            {show.name}
          </h3>
          <p className="text-xs md:text-sm text-gray-400">
            {show.first_air_date ? new Date(show.first_air_date).getFullYear() : "TBA"}
          </p>
        </div>
      </div>
    </Link>
  )
}
