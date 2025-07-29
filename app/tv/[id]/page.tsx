import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShowHeader } from "@/components/ShowHeader"
import { EpisodeViewer } from "@/components/EpisodeViewer"
import { getShowDetails, getSeasonDetails } from "@/lib/tmdb"

interface ShowPageProps {
  params: {
    id: string
  }
}

export default async function ShowPage({ params }: ShowPageProps) {
  const showId = Number.parseInt(params.id)

  if (isNaN(showId)) {
    notFound()
  }

  try {
    const [showDetails, seasonDetails] = await Promise.all([getShowDetails(showId), getSeasonDetails(showId, 1)])

    return (
      <div className="min-h-screen bg-black text-white">
        <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <ShowHeader show={showDetails} />
        <EpisodeViewer episodes={seasonDetails.episodes} showTitle={showDetails.name} seasonNumber={1} />
      </div>
    )
  } catch (error) {
    console.error("Error fetching show data:", error)
    notFound()
  }
}
