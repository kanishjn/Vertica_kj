import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-red-600">404</h1>
          <h2 className="text-3xl font-semibold">Show Not Found</h2>
          <p className="text-gray-400 text-lg">
            The TV show you're looking for doesn't exist or has been removed from our database.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent w-full sm:w-auto"
            >
              <Search className="w-4 h-4 mr-2" />
              Search Shows
            </Button>
          </Link>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            If you believe this is an error, please try refreshing the page or contact support.
          </p>
        </div>
      </div>
    </div>
  )
}
