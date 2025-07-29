import { notFound } from "next/navigation"
import { EpisodeViewer } from "@/components/episode-viewer"
import { ShowHeader } from "@/components/show-header"

const mockShows: Record<string, any> = {
  "1": {
    id: 1,
    title: "Stranger Things",
    poster: "/placeholder.svg?height=600&width=400",
    backdrop: "/placeholder.svg?height=800&width=1400",
    rating: 8.7,
    year: 2016,
    genres: ["Drama", "Fantasy", "Horror"],
    overview:
      "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    episodes: [
      {
        id: 1,
        title: "Chapter One: The Vanishing of Will Byers",
        overview:
          "On his way home from a friend's house, young Will sees something terrifying. Nearby, a sinister secret lurks in the depths of a government lab.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 1,
        season_number: 1,
        runtime: 47,
      },
      {
        id: 2,
        title: "Chapter Two: The Weirdo on Maple Street",
        overview:
          "Lucas, Mike and Dustin try to talk to the girl they found in the woods. Hopper questions an anxious Joyce about an unsettling phone call.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 2,
        season_number: 1,
        runtime: 55,
      },
      {
        id: 3,
        title: "Chapter Three: Holly, Jolly",
        overview:
          "An increasingly concerned Nancy looks for Barb and finds out what Jonathan's been up to. Joyce is convinced Will is trying to talk to her.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 3,
        season_number: 1,
        runtime: 51,
      },
      {
        id: 4,
        title: "Chapter Four: The Body",
        overview:
          "Refusing to believe Will is dead, Joyce and Hopper team up to investigate what really happened. Nancy and Jonathan become unlikely allies.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 4,
        season_number: 1,
        runtime: 50,
      },
      {
        id: 5,
        title: "Chapter Five: Dig Dug",
        overview:
          "Nancy and Jonathan swap conspiracy theories with a new ally as Eleven searches for someone from her past. Bob sees into the future.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 5,
        season_number: 2,
        runtime: 57,
      },
      {
        id: 6,
        title: "Chapter Six: The Spy",
        overview:
          "Will's connection to a shadowy evil grows stronger but no one's quite sure how to stop it. Elsewhere, Dustin and Steve forge an unlikely bond.",
        still: "/placeholder.svg?height=400&width=700",
        episode_number: 6,
        season_number: 2,
        runtime: 52,
      },
    ],
  },
}

interface ShowPageProps {
  params: {
    id: string
  }
}

export default function ShowPage({ params }: ShowPageProps) {
  const show = mockShows[params.id]

  if (!show) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ShowHeader show={show} />
      <EpisodeViewer episodes={show.episodes} showTitle={show.title} />
    </div>
  )
}
