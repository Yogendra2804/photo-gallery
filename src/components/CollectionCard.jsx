// single collection card inside the import panel
export default function CollectionCard({ collection, selected, onToggle }) {
  const { id, title, description, count, images } = collection;

  return (
    <div
      className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors
        ${selected
          ? 'border-fi-blue bg-fi-blue/5'
          : 'border-fi-border/40 hover:border-fi-border bg-white'
        }`}
      onClick={onToggle}
      role="checkbox"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? onToggle() : null}
    >
      {/* checkbox */}
      <div className={`w-4 h-4 border shrink-0 mt-0.5 flex items-center justify-center transition-colors
        ${selected ? 'bg-fi-blue border-fi-blue' : 'border-fi-border bg-white'}`}
      >
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* image preview — 3 stacked/adjacent thumbnails */}
      <div className="flex gap-0.5 shrink-0">
        {images.slice(0, 2).map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className="w-[52px] h-[38px] object-cover"
          />
        ))}
      </div>

      {/* info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-bold text-fi-ink text-sm leading-tight">{title}</p>
        <p className="font-sans text-fi-muted text-[11px] mt-0.5 leading-snug">{description}</p>
        <div className="flex items-center gap-1 mt-1.5">
          {/* image icon */}
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" rx="0.5" stroke="#686868" strokeWidth="1"/>
            <circle cx="3.5" cy="3.5" r="1" fill="#686868"/>
            <path d="M1 7.5L3.5 5L5.5 7L7 6L10 8.5" stroke="#686868" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-mono text-[10px] text-fi-muted">{count} photos</span>
        </div>
      </div>
    </div>
  );
}
