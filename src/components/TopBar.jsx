// top bar — counter + import button
export default function TopBar({ photoCount, onImportToggle }) {
  return (
    <header className="flex items-center justify-end gap-3 px-5 py-3 border-b border-fi-border bg-fi-canvas shrink-0">
      {/* frames counter */}
      <div className="hidden sm:flex items-center border border-fi-border px-3 py-1.5">
        <span className="font-mono text-[11px] font-medium text-fi-ink tracking-widest uppercase">
          {photoCount} FRAMES IN LIBRARY
        </span>
      </div>

      {/* import button */}
      <button
        onClick={onImportToggle}
        className="flex items-center gap-2 bg-fi-blue px-4 py-2 text-white hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-fi-blue focus:ring-offset-1"
        aria-label="Toggle import panel"
      >
        {/* upload icon */}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1V9M7 1L4 4M7 1L10 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M1 11H13V13H1V11Z" fill="white"/>
        </svg>
        <span className="font-mono text-[11px] font-semibold tracking-widest uppercase">IMPORT IMAGES</span>
      </button>
    </header>
  );
}
