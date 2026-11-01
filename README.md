# FRAME INDEX — Visual Photo Archive

A visual photo archive built with React, Vite, and Tailwind CSS for Celebrare's Frontend React Internship assignment. Designed with an editorial Swiss-style layout, custom typography (Space Grotesk + IBM Plex Mono), and restrained high-contrast accents (electric blue, acid lime, warm orange).

## What it does

- Fetches 30 photos from the Picsum Photos API on initial load
- 2-panel responsive layout: left navigation sidebar and central gallery workspace
- Displays photos in a 4-column responsive grid on desktop (2 on tablet, 1 on mobile)
- Metadata strip on every card with frame numbers (`#001`), photographer names, and interactive heart favourite buttons
- Real-time author search filtering without re-fetching or reloading
- Favourites state managed strictly via `useReducer`, persisted across browser refreshes via `localStorage`

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework with functional components and hooks |
| Vite 5 | Fast development server and build tool |
| Tailwind CSS v3 | All styling with custom colors and typography |
| Browser Fetch API | HTTP requests to Picsum |
| localStorage | Persistent storage for favourites |

No component libraries (no MUI, AntD, Bootstrap). No external icon libraries (all inline SVGs).

---

## Key Features & React Implementation

1. **Picsum API integration** — fetched via custom hook `useFetchPhotos` with loading and error states.
2. **Responsive grid** — 4 columns on desktop (`lg:grid-cols-4`), 2 on tablet (`sm:grid-cols-2`), 1 on mobile (`grid-cols-1`).
3. **Author search** — client-side, real-time, case-insensitive filter.
4. **Favourites with `useReducer`** — `TOGGLE_FAVORITE` action, ID array, lazy init from localStorage, synchronized with `useEffect`.
5. **Custom Hook (`useFetchPhotos`)** — returns `{ photos, loading, error }`, consumed by Gallery.
6. **`useCallback`** — stabilizes the search input handler and toggle handlers.
7. **`useMemo`** — memoises the filtered photo list based on photos, search query, active nav tab, and favorites.

---

## Project Structure

```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx          # Left vertical navigation (logo, nav items, footer)
│   │   ├── TopBar.jsx           # Library frame counter badge
│   │   ├── Gallery.jsx          # Main workspace: hero, search bar, grid, states
│   │   ├── PhotoCard.jsx        # Individual card: image, #frame, author, heart
│   │   ├── SearchBar.jsx        # Search input with results badge and filters
│   │   ├── LoadingSpinner.jsx   # Geometric loader matching aesthetic
│   │   └── ErrorMessage.jsx     # Bordered error state with error code
│   ├── hooks/
│   │   └── useFetchPhotos.js    # Custom hook wrapping Picsum fetch + AbortController
│   ├── reducers/
│   │   └── favoritesReducer.js  # Pure reducer for TOGGLE_FAVORITE + initFavorites
│   ├── App.jsx                  # Master layout coordination
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind directives and utility classes
├── index.html                   # HTML template with Space Grotesk & IBM Plex Mono fonts
├── tailwind.config.js           # Palette (#F5F3EE, #101010, #2428FF, #DFFF00, #F15A36)
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Running the Project

```bash
# install dependencies
npm install

# start local development server
npm run dev
# opens at http://localhost:5173

# create production build
npm run build
```

---

## How it works

### 1. `useFetchPhotos`
Lives in `src/hooks/useFetchPhotos.js`. Fetches `https://picsum.photos/v2/list?limit=30` once when the component mounts. Returns `{ photos, loading, error }`. An `AbortController` is used to cancel ongoing requests if the component unmounts prematurely.

### 2. `favoritesReducer`
Lives in `src/reducers/favoritesReducer.js`. Pure function handling `TOGGLE_FAVORITE`. If a photo ID is already in the list, it filters it out; otherwise, it appends it. Stored in `localStorage` under `celebrare-favorites`. Reading occurs once on mount using lazy initialization (`useReducer(favoritesReducer, undefined, initFavorites)`), and writing happens in `Gallery.jsx` inside a `useEffect` whenever `favorites` updates.

### 3. `useCallback` & `useMemo`
- `useCallback` wraps `handleSearchChange` and `handleToggleFavorite` so their function references stay stable across renders.
- `useMemo` computes `filteredPhotos` only when `photos`, `searchTerm`, `activeNav`, or `favorites` change.
