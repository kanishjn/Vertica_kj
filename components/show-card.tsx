"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Show {
  id: number
  title: string
  poster: string
  rating: number
  year: number
}

interface ShowCardProps {
  show: Show
}

export function ShowCard({ show }: ShowCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/show/${show.id}`}>
      <div
        className="relative flex-shrink-0 w-48 md:w-64 group cursor-pointer transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <Image
            src={show.poster || "/placeholder.svg"}
            alt={show.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 192px, 256px"
          />

          <div
            className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50">
              <Play className="w-6 h-6 fill-current" />
            </Button>
          </div>
        </div>

        {/* Show Info */}
        <div className="mt-3 space-y-1">
          <h3 className="font-semibold text-white text-sm md:text-base line-clamp-2 group-hover:text-red-400 transition-colors">
            {show.title}
          </h3>
          <div className="flex items-center justify-between text-xs md:text-sm text-gray-400">
            <span>{show.year}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{show.rating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
