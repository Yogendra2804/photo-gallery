// action types
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

// reducer stays pure — no localStorage here, that's handled in the component
export function favoritesReducer(state, action) {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      const { id } = action.payload;
      // if already in favorites, remove it; otherwise add it
      const isAlreadyFavorited = state.includes(id);
      if (isAlreadyFavorited) {
        return state.filter((favId) => favId !== id);
      }
      return [...state, id];
    }
    default:
      return state;
  }
}

// lazy initializer — reads from localStorage once on mount
// kept separate so the reducer itself stays pure
export function initFavorites() {
  try {
    const stored = localStorage.getItem('celebrare-favorites');
    if (stored) {
      const parsed = JSON.parse(stored);
      // make sure it's actually an array before using it
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // localStorage might be unavailable (private browsing, etc.) — just start fresh
  }
  return [];
}
