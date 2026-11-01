import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favoritesReducer, initFavorites, TOGGLE_FAVORITE } from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const STORAGE_KEY = 'celebrare-favorites';

export default function Gallery() {
  // --- data fetching via custom hook ---
  const { photos, loading, error } = useFetchPhotos();

  // --- search state ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- favorites with useReducer + lazy init from localStorage ---
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, initFavorites);

  // persist favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // silently ignore if localStorage isn't available
    }
  }, [favorites]);

  // useCallback — keeps the handler reference stable so SearchBar doesn't re-render unnecessarily
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // useCallback for toggle — stable reference passed down to each PhotoCard
  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVORITE, payload: { id } });
  }, []);

  // useMemo — only recalculate filtered list when photos or searchTerm changes
  const filteredPhotos = useMemo(() => {
    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return photos;
    return photos.filter((p) =>
      p.author.toLowerCase().includes(trimmed)
    );
  }, [photos, searchTerm]);

  // --- render ---
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      {/* header */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Photo Gallery</h1>
        <p className="mt-2 text-slate-500 text-sm">
          Browse 30 stunning photos — search by author, favourite the ones you love.
        </p>
      </header>

      {/* search bar */}
      <section className="mb-8" aria-label="Search">
        <SearchBar value={searchTerm} onChange={handleSearchChange} />
      </section>

      {/* loading state */}
      {loading && <LoadingSpinner />}

      {/* error state */}
      {!loading && error && <ErrorMessage message={error} />}

      {/* photo grid */}
      {!loading && !error && (
        <>
          {filteredPhotos.length > 0 ? (
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              aria-label="Photo grid"
            >
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favorites.includes(photo.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </section>
          ) : (
            // empty search state
            <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-12 h-12 text-slate-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p className="text-slate-500 font-medium">No photos found</p>
              <p className="text-slate-400 text-sm">
                No author matches &ldquo;{searchTerm}&rdquo;. Try a different name.
              </p>
            </div>
          )}
        </>
      )}
    </main>
  );
}
