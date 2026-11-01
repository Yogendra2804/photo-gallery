// search toolbar — input + results counter + filters
export default function SearchBar({ value, onChange, resultCount }) {
  return (
    <div className="flex items-stretch gap-0 border border-fi-border bg-white">
      {/* search input */}
      <div className="flex items-center flex-1 min-w-0">
        <span className="pl-3 pr-2.5 shrink-0">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5" stroke="#686868" strokeWidth="1.5"/>
            <line x1="10" y1="10" x2="13" y2="13" stroke="#686868" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </span>
        <input
          type="search"
          value={value}
          onChange={onChange}
          placeholder="Search by photographer..."
          aria-label="Search photos by photographer name"
          className="flex-1 py-3 pr-3 font-sans text-sm text-fi-ink placeholder-fi-muted bg-transparent focus:outline-none"
        />
      </div>

      {/* results badge */}
      <div className="flex items-center px-3 border-l border-fi-border bg-fi-lime shrink-0">
        <span className="font-mono text-[11px] font-semibold text-fi-ink tracking-wider uppercase whitespace-nowrap">
          {resultCount} RESULTS
        </span>
      </div>

      {/* filter button */}
      <button
        className="flex items-center gap-2 px-4 border-l border-fi-border text-fi-ink hover:bg-fi-ink hover:text-white transition-colors shrink-0 focus:outline-none"
        aria-label="Filter options"
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <line x1="1" y1="3" x2="12" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="3" y1="6.5" x2="10" y2="6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="5" y1="10" x2="8" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <span className="font-mono text-[10px] font-semibold tracking-widest uppercase">FILTERS</span>
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" aria-hidden="true">
          <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
