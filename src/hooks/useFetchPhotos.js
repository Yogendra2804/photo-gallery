import { useState, useEffect } from 'react';

const PICSUM_URL = 'https://picsum.photos/v2/list?limit=30';

// Custom hook that handles fetching photos from picsum.
// Returns { photos, loading, error } — Gallery uses this, doesn't fetch directly.
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // AbortController so we can clean up if the component unmounts mid-fetch
    const controller = new AbortController();

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(PICSUM_URL, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setPhotos(data);
      } catch (err) {
        // ignore abort errors — those are intentional cleanup
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong while fetching photos');
        }
      } finally {
        // only set loading false if we weren't aborted
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    // cleanup on unmount
    return () => controller.abort();
  }, []); // run once on mount only

  return { photos, loading, error };
}
