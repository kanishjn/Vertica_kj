// lib/tmdb.ts
import "server-only"

const V3_KEY = process.env.TMDB_API_KEY 
const V4_TOKEN = process.env.TMDB_ACCESS_TOKEN 

const TMDB = "https://api.themoviedb.org/3"
const LANG = "en-US"
const CACHE = 60 * 60 


function buildUrl(endpoint: string): string {
  const url = new URL(`${TMDB}${endpoint}`)
  url.searchParams.set("language", LANG)
  if (V4_TOKEN == null && V3_KEY) url.searchParams.set("api_key", V3_KEY)
  return url.toString()
}


async function tmdbFetch<T>(endpoint: string): Promise<T> {
  if (!V3_KEY && !V4_TOKEN)
    throw new Error("TMDB credential missing. Add TMDB_API_KEY (v3) or TMDB_ACCESS_TOKEN (v4) to .env.local")

  const url = buildUrl(endpoint)

  const headers: HeadersInit = V4_TOKEN ? { Authorization: `Bearer ${V4_TOKEN}` } : {}

  const res = await fetch(url, { headers, next: { revalidate: CACHE } })

  if (!res.ok) {
    console.error(`TMDB ${res.status}: ${res.statusText} → ${url}`)
    if (res.status === 401)
      console.error("Check that your key/token is correct **and** matches the auth method (v3 vs v4).")
    throw new Error(`TMDB ${res.status}`)
  }

  return (await res.json()) as T
}


export type TVListItem = {
  id: number
  name: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  vote_average: number
  first_air_date: string
}

type ListResponse = { results: TVListItem[] }

export const getTrendingShows = () => tmdbFetch<ListResponse>("/trending/tv/week").then((d) => d.results)

export const getTopRatedShows = () => tmdbFetch<ListResponse>("/tv/top_rated").then((d) => d.results)

export const getAiringTodayShows = () => tmdbFetch<ListResponse>("/tv/airing_today").then((d) => d.results)

export const getShowDetails = (id: number) => tmdbFetch(`/tv/${id}`)

export const getSeasonDetails = (id: number, s: number) => tmdbFetch(`/tv/${id}/season/${s}`)

export const searchShows = (q: string) => {
  if (!q.trim()) return Promise.resolve({ results: [] })
  const safe = encodeURIComponent(q.trim())
  return tmdbFetch<ListResponse>(`/search/tv?query=${safe}`)
}
