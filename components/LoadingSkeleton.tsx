export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 bg-gray-800 rounded-lg w-48 animate-pulse" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-48 md:w-64 space-y-3">
            <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
            <div className="h-4 bg-gray-800 rounded animate-pulse" />
            <div className="h-3 bg-gray-800 rounded w-16 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
