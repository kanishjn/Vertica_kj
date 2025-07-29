# Vertica

Vertica is a modern web application for browsing TV shows and movies. Built with Next.js and TypeScript, it features a sleek UI, search functionality, detailed show pages, and interactive carousels.

## Features
- **Search** for TV shows and movies
- **Show details** with episodes and cast
- **Carousel** for featured content
- **Responsive** and modern design

## Folder Structure
```
vertica/
├── app/                # Next.js app directory (routes, pages, API)
│   ├── api/            # API routes (e.g., search)
│   ├── show/           # Dynamic show pages
│   ├── tv/             # Dynamic TV pages
│   └── ...             # Layout, global styles, etc.
├── components/         # Reusable UI components
│   └── ui/             # UI primitives (buttons, dialogs, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries (e.g., TMDB API)
├── public/             # Static assets (images, icons)
├── styles/             # Global styles
├── package.json        # Project dependencies
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- pnpm, npm, or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd vertica
   ```
2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

### Running Locally
Start the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Customization
- Update API keys or endpoints in `lib/tmdb.ts` as needed.
- Modify components in `components/` to change the UI.

## License
MIT
