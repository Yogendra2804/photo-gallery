// top bar — archive status, view navigation tabs, and frame counter
export default function TopBar({ photoCount, activeNav = 'gallery', onNavChange }) {
  const tabs = [
    { id: 'gallery', label: 'All Frames' },
    { id: 'discover', label: 'Discover' },
    { id: 'saved', label: 'Saved' },
  ];

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-fi-border bg-fi-canvas shrink-0 gap-3">
      {/* status indicator & view pills */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 pr-3 border-r border-fi-border/40">
          <span className="w-2 h-2 rounded-full bg-fi-blue animate-pulse" aria-hidden="true" />
          <span className="font-mono text-[10px] font-bold text-fi-muted tracking-widest uppercase">
            FRAME INDEX
          </span>
        </div>

        {/* quick view pills */}
        <div className="flex items-center gap-1 bg-white p-0.5 border border-fi-border shadow-[1px_1px_0px_#242424]" role="tablist">
          {tabs.map((tab) => {
            const isActive = activeNav === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => onNavChange && onNavChange(tab.id)}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider transition-colors
                  ${isActive
                    ? 'bg-fi-blue text-white'
                    : 'text-fi-ink hover:bg-fi-canvas'
                  }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* frames counter */}
      <div className="flex items-center border border-fi-border bg-white px-3 py-1 shadow-[2px_2px_0px_#242424] shrink-0">
        <span className="font-mono text-[10px] sm:text-[11px] font-bold text-fi-ink tracking-widest uppercase">
          {photoCount} FRAMES IN LIBRARY
        </span>
      </div>
    </header>
  );
}
