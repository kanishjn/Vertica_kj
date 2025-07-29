"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"

interface SearchResult {
  id: number
  title: string
  poster: string
  year: number
  rating: number
}

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  query: string
  onResultClick: () => void
}

export function SearchResults({ results, isLoading, query, onResultClick }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (!query.trim()) {
    return <div className="p-4 text-gray-400 text-center">Start typing to search for TV shows...</div>
  }

  if (results.length === 0) {
    return <div className="p-4 text-gray-400 text-center">No shows found for "{query}"</div>
  }

  return (
    <div className="py-2">
      {results.map((show) => (
        <Link
          key={show.id}
          href={`/show/${show.id}`}
          onClick={onResultClick}
          className="flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors"
        >
          <div className="relative w-12 h-16 flex-shrink-0">
            <Image src={show.poster || "/placeholder.svg"} alt={show.title} fill className="object-cover rounded" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{show.title}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>{show.year}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{show.rating}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
