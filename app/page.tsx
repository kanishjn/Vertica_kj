import { Suspense } from "react"
import { Header } from "@/components/Header"
import { HeroSlider } from "@/components/HeroSlider"
import { Carousel } from "@/components/Carousel"
import { LoadingSkeleton } from "@/components/LoadingSkeleton"
import { getTrendingShows, getTopRatedShows, getAiringTodayShows } from "@/lib/tmdb"

export default async function HomePage() {
  const [trendingShows, topRatedShows, airingTodayShows] = await Promise.all([
    getTrendingShows(),
    getTopRatedShows(),
    getAiringTodayShows(),
  ])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="lg:pt-8 xl:pt-12">
        <HeroSlider shows={trendingShows.slice(0, 5)} />
      </div>

      <main className="max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16 py-8 md:py-16 lg:py-20 xl:py-24 space-y-12 md:space-y-20 lg:space-y-24">
        <Suspense fallback={<LoadingSkeleton />}>
          <Carousel title="Trending Now" shows={trendingShows} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <Carousel title="Top Rated" shows={topRatedShows} />
        </Suspense>

        <Suspense fallback={<LoadingSkeleton />}>
          <Carousel title="Airing Today" shows={airingTodayShows} />
        </Suspense>
      </main>

      <footer className="bg-gray-900 mt-20 lg:mt-32 py-12">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16 text-center">
          <h3 className="text-2xl font-bold text-red-600 mb-2">Vertica</h3>
          <div className="text-gray-500 text-sm">
            <p>
              &copy; 2025 Vertica. Built by{" "}
              <a
                target="_blank"
                href="https://www.linkedin.com/in/kanishjn"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hover:text-blue-300 font-medium transition-colors"
              >
                Kanish Jain
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
