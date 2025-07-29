"use client"

import Image from "next/image"
import { Star, Loader2 } from "lucide-react"

interface SearchResult {
  id: number
  name: string
  poster_path: string | null
  first_air_date: string
  vote_average: number
  overview: string
}

interface SearchResultsProps {
  results: SearchResult[]
  isLoading: boolean
  query: string
  onResultClick: (showId: number) => void
}

export function SearchResults({ results, isLoading, query, onResultClick }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="w-5 h-5 animate-spin text-red-600" />
        <span className="ml-2 text-gray-400">Searching...</span>
      </div>
    )
  }

  if (!query.trim()) {
    return <div className="p-4 text-gray-400 text-center">Start typing to search for TV shows...</div>
  }

  if (!results || results.length === 0) {
    return <div className="p-4 text-gray-400 text-center">No shows found for "{query}"</div>
  }

  return (
    <div className="py-2">
      {results.map((show) => (
        <button
          key={show.id}
          onClick={() => onResultClick(show.id)}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors text-left"
        >
          <div className="relative w-12 h-16 flex-shrink-0">
            <Image
              src={
                show.poster_path
                  ? `https://image.tmdb.org/t/p/w92${show.poster_path}`
                  : "/placeholder.svg?height=64&width=48"
              }
              alt={show.name}
              fill
              className="object-cover rounded"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-white truncate">{show.name}</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
              {show.first_air_date && <span>{new Date(show.first_air_date).getFullYear()}</span>}
              {show.vote_average > 0 && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{show.vote_average.toFixed(1)}</span>
                  </div>
                </>
              )}
            </div>
            {show.overview && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{show.overview}</p>}
          </div>
        </button>
      ))}
    </div>
  )
}
