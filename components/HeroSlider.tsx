"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Show {
  id: number
  name: string
  backdrop_path: string | null
  poster_path: string | null
  overview: string
  vote_average: number
  first_air_date: string
}

interface HeroSliderProps {
  shows: Show[]
}

export function HeroSlider({ shows }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying || shows.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % shows.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, shows.length])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % shows.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + shows.length) % shows.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!shows.length) return null

  const currentShow = shows[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden -mt-20 lg:-mt-24">
      <div className="absolute inset-0">
        {shows.map((show, index) => (
          <div
            key={show.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={
                show.backdrop_path
                  ? `https://image.tmdb.org/t/p/original${show.backdrop_path}`
                  : "/placeholder.svg?height=1080&width=1920"
              }
              alt={show.name}
              fill
              className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                index === currentSlide ? "scale-105" : "scale-110"
              }`}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent lg:from-black/70 lg:via-black/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
            
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-pulse" 
                   style={{ animationDelay: "0s", animationDuration: "3s" }} />
              <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse" 
                   style={{ animationDelay: "1s", animationDuration: "4s" }} />
              <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" 
                   style={{ animationDelay: "2s", animationDuration: "5s" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-16 h-16 border border-red-500/10 rotate-45 animate-spin-slow" />
        <div className="absolute bottom-40 left-10 w-12 h-12 border border-white/5 rounded-full animate-pulse" 
             style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-gradient-to-r from-red-600/10 to-transparent rotate-12 animate-float" />
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="hidden lg:flex absolute left-8 xl:left-12 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-red-600/80 text-white/70 hover:text-white rounded-full w-14 h-14 backdrop-blur-md transition-all duration-500 hover:scale-125 active:scale-95 hover:shadow-2xl hover:shadow-red-500/30 group"
      >
        <ChevronLeft className="w-7 h-7 transition-transform duration-300 group-hover:-translate-x-0.5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-red-600/80 text-white/70 hover:text-white rounded-full w-14 h-14 backdrop-blur-md transition-all duration-500 hover:scale-125 active:scale-95 hover:shadow-2xl hover:shadow-red-500/30 group"
      >
        <ChevronRight className="w-7 h-7 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Button>

      <div className="relative z-10 h-full flex items-center justify-center lg:justify-start pt-20 lg:pt-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-12 xl:px-16 w-full">
          <div className="max-w-2xl lg:max-w-4xl lg:ml-8 xl:ml-16 lg:mt-16 xl:mt-20 text-center lg:text-left">
            <div className={`transition-all duration-1000 ${isLoaded ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-red-600 via-red-500 to-white bg-clip-text text-transparent leading-tight animate-textShimmer bg-[length:200%_100%]">
                Vertica
              </h1>
              <h2 className={`text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 text-white leading-tight transition-all duration-700 delay-200 ${isLoaded ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
                {currentShow.name}
              </h2>
              <p className={`text-sm md:text-base lg:text-lg xl:text-xl text-gray-200 mb-6 lg:mb-8 leading-relaxed line-clamp-3 max-w-2xl mx-auto lg:mx-0 transition-all duration-700 delay-400 ${isLoaded ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
                {currentShow.overview}
              </p>

              <div className={`flex justify-center lg:justify-start transition-all duration-700 delay-600 ${isLoaded ? 'animate-slideInUp' : 'opacity-0 translate-y-10'}`}>
                <Link href={`/tv/${currentShow.id}`} className="sm:hidden">
                  <Button
                    size="default"
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-2xl hover:shadow-red-500/40 px-8 group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Play className="w-4 h-4 mr-2 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative z-10">Watch Now</span>
                  </Button>
                </Link>

                <div className="hidden sm:flex gap-4">
                  <Link href={`/tv/${currentShow.id}`}>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-2xl hover:shadow-red-500/40 px-8 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Play className="w-5 h-5 mr-2 fill-current relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <span className="relative z-10">Watch Now</span>
                    </Button>
                  </Link>
                  <Link href={`/tv/${currentShow.id}`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/40 text-white hover:bg-white/20 bg-black/30 backdrop-blur-md transition-all duration-500 hover:scale-110 active:scale-95 hover:border-red-500/60 hover:shadow-xl hover:shadow-white/20 px-8 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <Info className="w-5 h-5 mr-2 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <span className="relative z-10">More Info</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {shows.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out hover:scale-125 relative overflow-hidden ${
              index === currentSlide
                ? "bg-gradient-to-r from-red-600 to-red-500 w-10 shadow-lg shadow-red-500/50"
                : "bg-white/40 hover:bg-white/60 w-3"
            }`}
          >
            {index === currentSlide && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            )}
          </button>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes textShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
        
        .animate-textShimmer {
          animation: textShimmer 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}