import { NextResponse } from "next/server"
import { searchShows } from "@/lib/tmdb"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")?.trim() || ""

  if (!query) {
    return NextResponse.json({ results: [] }, { status: 200 })
  }

  try {
    const data = await searchShows(query)
    return NextResponse.json(data, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: "Failed to search shows" }, { status: 500 })
  }
}
