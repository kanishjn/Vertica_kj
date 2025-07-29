"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Play, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Show {
  id: number
  title: string
  poster: string
  backdrop: string
  rating: number
  year: number
  genres: string[]
  overview: string
}

interface ShowHeaderProps {
  show: Show
}

export function ShowHeader({ show }: ShowHeaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={show.backdrop || "/placeholder.svg"}
          alt={show.title}
          fill
          className={`object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Navigation */}
        <div className="p-4 md:p-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Show Info */}
        <div className="flex-1 flex items-end p-4 md:p-6">
          <div className="max-w-4xl">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Poster */}
              <div className="relative w-32 md:w-48 aspect-[2/3] flex-shrink-0">
                <Image
                  src={show.poster || "/placeholder.svg"}
                  alt={show.title}
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl md:text-5xl font-bold">{show.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{show.rating}</span>
                  </div>
                  <span className="text-gray-300">{show.year}</span>
                  <div className="flex gap-2">
                    {show.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="bg-white/20 text-white">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed">{show.overview}</p>

                <div className="flex gap-3">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700">
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Watch Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 bg-transparent"
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
    </div>
  )
}
