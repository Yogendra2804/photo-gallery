// top bar — library frame counter
export default function TopBar({ photoCount }) {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-fi-border bg-fi-canvas shrink-0">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-fi-blue" aria-hidden="true" />
        <span className="font-mono text-[10px] font-semibold text-fi-muted tracking-widest uppercase">
          LIVE ARCHIVE
        </span>
      </div>

      {/* frames counter */}
      <div className="flex items-center border border-fi-border bg-white px-3 py-1.5 shadow-[2px_2px_0px_#242424]">
        <span className="font-mono text-[11px] font-semibold text-fi-ink tracking-widest uppercase">
          {photoCount} FRAMES IN LIBRARY
        </span>
      </div>
    </header>
  );
}
