// search toolbar — input + clear button + results counter + filters
export default function SearchBar({ value, onChange, onClear, resultCount, badgeLabel = 'RESULTS' }) {
  return (
    <div className="flex items-stretch gap-0 border border-fi-border bg-white shadow-[2px_2px_0px_#242424]">
      {/* search input */}
      <div className="flex items-center flex-1 min-w-0">
        <span className="pl-3.5 pr-2.5 shrink-0" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#686868" strokeWidth="1.5"/>
            <line x1="10" y1="10" x2="13" y2="13" stroke="#686868" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search by photographer name..."
          aria-label="Search photos by photographer name"
          className="flex-1 py-3 pr-3 font-sans text-sm text-fi-ink placeholder-fi-muted bg-transparent focus:outline-none"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search query"
            className="px-3 py-1 mr-2 text-[11px] font-mono font-medium text-fi-muted hover:text-fi-ink bg-fi-canvas border border-fi-border/40 transition-colors"
          >
            CLEAR ✕
          </button>
        )}
      </div>

      {/* results badge */}
      <div className="flex items-center px-3.5 border-l border-fi-border bg-fi-lime shrink-0">
        <span className="font-mono text-[11px] font-bold text-fi-ink tracking-wider uppercase whitespace-nowrap">
          {resultCount} {badgeLabel}
        </span>
      </div>

      {/* filter indicator */}
      <div className="hidden sm:flex items-center gap-2 px-4 border-l border-fi-border bg-fi-canvas text-fi-ink shrink-0 select-none">
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <line x1="1" y1="3" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="3" y1="6.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="5" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="font-mono text-[10px] font-bold tracking-widest uppercase">REAL-TIME</span>
      </div>
    </div>
  );
}
