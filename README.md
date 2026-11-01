# Photo Gallery — Celebrare Frontend Intern Assignment

A responsive photo gallery web app built with React, Vite, and Tailwind CSS as part of Celebrare's frontend React internship pre-screening.

## What it does

- Fetches 30 photos from the Picsum Photos public API on load
- Displays them in a responsive grid (1 / 2 / 4 columns depending on screen size)
- Shows each photo's author name
- Lets you search photos by author name in real time
- Lets you mark/unmark photos as favourites using a heart button
- Remembers your favourites across page refreshes using localStorage

---

## Tech Stack

| Tool | Why |
|------|-----|
| React 19 | UI library |
| Vite 5 | Build tool / dev server |
| Tailwind CSS v3 | All styling — no component libraries |
| Browser Fetch API | HTTP requests |
| localStorage | Client-side persistence |

No component libraries. No Bootstrap. No MUI. No icon libraries. Heart icon is inline SVG.

---

## Features

1. **Photo fetching** — Picsum API with loading spinner + error handling
2. **Responsive grid** — 4 cols (desktop) -> 2 (tablet) -> 1 (mobile)
3. **Author search** — real-time, case-insensitive, client-side only
4. **Favourites** — managed with `useReducer`, persisted to localStorage
5. **Custom hook** — `useFetchPhotos` separates data logic from UI
6. **`useCallback`** — stable search handler reference
7. **`useMemo`** — memoised filtered photo list

---

## Project Structure

```
photo-gallery/
├── src/
│   ├── components/
│   │   ├── Gallery.jsx          # main component, orchestrates everything
│   │   ├── PhotoCard.jsx        # individual photo card
│   │   ├── SearchBar.jsx        # search input
│   │   ├── LoadingSpinner.jsx   # loading state
│   │   └── ErrorMessage.jsx     # error state
│   ├── hooks/
│   │   └── useFetchPhotos.js    # custom hook for Picsum API
│   ├── reducers/
│   │   └── favoritesReducer.js  # pure reducer + lazy initializer
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                # Tailwind directives
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## Installation & Running

```bash
# clone the repo
git clone <your-repo-url>
cd photo-gallery

# install dependencies
npm install

# start dev server
npm run dev
# opens at http://localhost:5173

# production build
npm run build
```

---

## API Integration

**Endpoint:** `https://picsum.photos/v2/list?limit=30`

Returns an array of 30 photo objects. We use:
- `id` as unique React key
- `author` displayed below each photo
- `download_url` as the image src

The request is made once on mount. No re-fetching on search.

---

## useFetchPhotos — Custom Hook

Lives in `src/hooks/useFetchPhotos.js`.

```js
const { photos, loading, error } = useFetchPhotos();
```

- Fires the API call inside a `useEffect` with empty deps (run once on mount)
- Uses `AbortController` to cancel if component unmounts before fetch completes
- Sets `loading: true` before the call, `loading: false` in the `finally` block
- If `response.ok` is false, throws a descriptive error
- Catch block ignores `AbortError`, surfaces everything else as `error`
- Gallery consumes this hook and does not fetch anything directly

---

## Favourites Reducer

Lives in `src/reducers/favoritesReducer.js`.

**Action:** `TOGGLE_FAVORITE` with payload `{ id }`

Logic:
- If ID is already in state: remove it (unfavourite)
- If ID is not in state: add it (favourite)

The reducer is **pure** — no localStorage access inside it.

**Lazy initializer:** `initFavorites()` reads localStorage once when `useReducer` first mounts. After that, a `useEffect` in Gallery writes to localStorage whenever `favorites` changes.

Storage key: `celebrare-favorites`

Both read and write are wrapped in try/catch so the app won't crash in restricted environments.

---

## localStorage Persistence

```js
// read once via lazy initializer
const [favorites, dispatch] = useReducer(favoritesReducer, undefined, initFavorites);

// write on every change
useEffect(() => {
  localStorage.setItem('celebrare-favorites', JSON.stringify(favorites));
}, [favorites]);
```

On refresh: `initFavorites` reads the stored JSON and hearts show their previous state immediately.

---

## useCallback

```js
const handleSearchChange = useCallback((e) => {
  setSearchTerm(e.target.value);
}, []);
```

Keeps the handler reference stable across renders. Without it, a new function is created on every render and passed as a prop to SearchBar, causing unnecessary re-renders.

---

## useMemo

```js
const filteredPhotos = useMemo(() => {
  const trimmed = searchTerm.trim().toLowerCase();
  if (!trimmed) return photos;
  return photos.filter((p) => p.author.toLowerCase().includes(trimmed));
}, [photos, searchTerm]);
```

Recalculates only when `photos` or `searchTerm` actually changes. Avoids re-running the filter on every unrelated render.

---

## Responsive Design

| Breakpoint | Columns | Tailwind class |
|------------|---------|----------------|
| Mobile (default) | 1 | `grid-cols-1` |
| Tablet (sm 640px+) | 2 | `sm:grid-cols-2` |
| Desktop (lg 1024px+) | 4 | `lg:grid-cols-4` |

Images use `aspect-[4/3]` + `object-cover` to maintain consistent card sizes without distortion.

---

## Git Setup

```bash
git init
git add .
git commit -m "init: photo gallery for celebrare assignment"

# create a public repo on GitHub, then:
git remote add origin https://github.com/<your-username>/photo-gallery.git
git branch -M main
git push -u origin main
```

> Don't push until you're ready to submit.
