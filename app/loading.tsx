export default function Loading() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <h2 className="text-xl font-semibold">Loading Vertica...</h2>
        <p className="text-gray-400">Fetching the latest TV shows for you</p>
      </div>
    </div>
  )
}
