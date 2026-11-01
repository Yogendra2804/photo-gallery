import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favoritesReducer, initFavorites, TOGGLE_FAVORITE } from '../reducers/favoritesReducer';
import PhotoCard from './PhotoCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import TopBar from './TopBar';

const STORAGE_KEY = 'celebrare-favorites';

export default function Gallery({ activeNav = 'gallery' }) {
  // --- Requirement 6: Custom Hook ---
  const { photos, loading, error } = useFetchPhotos();

  // --- Search state ---
  const [searchTerm, setSearchTerm] = useState('');

  // --- Requirement 5: useReducer for favorites with lazy init ---
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, initFavorites);

  // persist favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // safely handle localStorage unavailability (private mode, quota, etc.)
    }
  }, [favorites]);

  // --- Requirement 7: useCallback for search input handler ---
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  // stable handler for toggling favorites passed to PhotoCard
  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: TOGGLE_FAVORITE, payload: { id } });
  }, []);

  // --- Requirement 7: useMemo for computing filtered photographs ---
  const filteredPhotos = useMemo(() => {
    let list = photos;

    // if user navigated to 'saved' tab, only show favorited photos
    if (activeNav === 'saved') {
      list = list.filter((p) => favorites.includes(p.id));
    }

    const trimmed = searchTerm.trim().toLowerCase();
    if (!trimmed) return list;

    // case-insensitive match on author name
    return list.filter((p) => p.author.toLowerCase().includes(trimmed));
  }, [photos, searchTerm, activeNav, favorites]);

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-fi-canvas overflow-y-auto">
      {/* ── Top Bar ── */}
      <TopBar photoCount={photos.length} />

      {/* ── Main Workspace Canvas ── */}
      <div className="p-6 md:p-8 max-w-[1400px] w-full mx-auto">
        {/* ── Editorial Asymmetric Hero Section ── */}
        <section className="mb-8" aria-label="Archive Overview">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* Left Column: Massive Bold Heading */}
            <div className="md:col-span-7">
              <h1 className="font-display font-extrabold text-fi-ink text-5xl sm:text-6xl md:text-7xl leading-[0.92] tracking-tighter">
                Your visual<br />
                archive
                <span className="inline-block ml-3 w-5 h-11 sm:h-14 bg-fi-lime transform -skew-x-12 align-baseline" aria-hidden="true" />
              </h1>
            </div>

            {/* Right Column: Editorial Supporting Copy */}
            <div className="md:col-span-5 md:pl-6 md:border-l border-fi-border/20">
              <p className="font-sans text-fi-muted text-sm sm:text-base leading-relaxed max-w-sm">
                Collect and discover photographs from creators and curated collections.
              </p>
              {/* Warm Orange Accent Underline */}
              <div className="w-10 h-1 bg-fi-orange mt-3" aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ── Search & Filter Toolbar ── */}
        <section className="mb-6" aria-label="Search and filter toolbar">
          <SearchBar
            value={searchTerm}
            onChange={handleSearchChange}
            resultCount={filteredPhotos.length}
          />
        </section>

        {/* ── Loading State ── */}
        {loading && <LoadingSpinner />}

        {/* ── Error State ── */}
        {!loading && error && <ErrorMessage message={error} />}

        {/* ── Photo Grid (Requirement 3: 4 cols desktop, 2 cols tablet, 1 col mobile) ── */}
        {!loading && !error && (
          <>
            {filteredPhotos.length > 0 ? (
              <section
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                aria-label="Photographs archive grid"
              >
                {filteredPhotos.map((photo, index) => (
                  <PhotoCard
                    key={photo.id}
                    photo={photo}
                    index={index}
                    isFavorite={favorites.includes(photo.id)}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </section>
            ) : (
              /* ── Empty State ── */
              <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-fi-border bg-white text-center">
                <span className="font-mono text-xs font-semibold uppercase bg-fi-canvas border border-fi-border px-2.5 py-1 mb-2 tracking-widest text-fi-ink">
                  NO MATCHING FRAMES
                </span>
                <p className="font-display font-bold text-fi-ink text-base">
                  {activeNav === 'saved'
                    ? 'No favourite photographs found in your saved archive.'
                    : `No photographs found matching "${searchTerm}".`}
                </p>
                <p className="font-sans text-xs text-fi-muted mt-1 max-w-sm">
                  {activeNav === 'saved'
                    ? 'Click the heart icon on any photo card in the gallery to add it here.'
                    : 'Check your spelling or search for another photographer.'}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
