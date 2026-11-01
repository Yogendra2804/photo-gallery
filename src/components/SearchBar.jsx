// controlled input — value and onChange come from Gallery
export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      {/* search icon — inline SVG, no external library */}
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by author name..."
        aria-label="Search photos by author name"
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 placeholder-slate-400
                   shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent
                   transition-shadow text-sm"
      />
    </div>
  );
}
