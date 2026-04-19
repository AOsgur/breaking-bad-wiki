# Breaking Bad Wiki

A complete single-page application for the Breaking Bad universe — built as a university midterm project for SE 3355 Web Programming.

## Tech Stack

- **React 19** — function components + hooks
- **React Router DOM v7** — client-side routing
- **Tailwind CSS v4** (via `@tailwindcss/vite`) — all styling
- **Vite 6** — build tool and dev server
- **Breaking Bad API** — sole data source (`https://api.mridul.tech/api/breaking-bad`)

## Features

- **Characters** — searchable (debounced), paginated grid with periodic-table style cards, danger-level badges, image fallback with element symbols
- **Episodes** — season filter (S1–S5), formatted episode codes (S01E02), character list on detail page
- **Deaths** — animated death counter, season filter, red-accent cards with cause/responsible/last-words
- **Quotes** — author filter (debounced), random quote highlighter with smooth scroll
- **Home** — auto-rotating API quotes (8s interval, fade transition), animated stat count-ups, chemical formula watermark
- **Loading states** — themed "Cooking..." spinner on every data fetch
- **Error states** — retry button on every fetch failure
- **Responsive** — mobile, tablet, and desktop layouts
- **404 page** — Breaking Bad themed

## Folder Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── ui/
│   │   ├── SearchBar.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Pagination.jsx
│   │   └── SeasonFilter.jsx
│   ├── CharacterCard.jsx
│   ├── EpisodeCard.jsx
│   ├── DeathCard.jsx
│   └── QuoteCard.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── CharactersPage.jsx
│   ├── CharacterDetailPage.jsx
│   ├── EpisodesPage.jsx
│   ├── EpisodeDetailPage.jsx
│   ├── DeathsPage.jsx
│   ├── QuotesPage.jsx
│   └── NotFoundPage.jsx
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## API

All data is fetched from `https://api.mridul.tech/api/breaking-bad` — no authentication required.  
All API logic is centralized in `src/services/api.js`.
