# Vertica

Vertica is a modern, self-hosted web app for browsing TV shows and movies. Built with Next.js, TypeScript, and Tailwind CSS, it features a fast UI, search, detailed show pages, and carousels.

## Setup (Self-Hosted)

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd vertica
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```
3. **Configure environment**
   - Copy `.env.local.example` to `.env.local` (or create `.env.local`)
   - Add your TMDB API key:
     ```
     TMDB_API_KEY=your_tmdb_api_key
     ```
4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## Choices

- **Next.js App Router** for routing and server components
- **TypeScript** for type safety
- **Tailwind CSS** for utility-first styling
- **TMDB API** for show/movie data
- **Radix UI** and custom components for accessibility and UI consistency

## Known Issues

- Some features (like authentication, watchlists) are not implemented
- Only TMDB API is supported; no local media support
- Error handling for API/network failures is basic
- Some UI polish and mobile optimizations are
