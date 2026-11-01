// individual photo card — matches the reference's metadata strip style
export default function PhotoCard({ photo, index, isFavorite, onToggleFavorite }) {
  const { id, author, download_url } = photo;
  // frame number like #001
  const frameNum = `#${String(index + 1).padStart(3, '0')}`;
  // author name uppercase
  const authorDisplay = author.toUpperCase();

  return (
    <article className="flex flex-col border border-fi-border bg-white transition-all duration-200 hover:shadow-[3px_3px_0px_#242424] group">
      {/* photo */}
      <div className="relative overflow-hidden aspect-[4/5] bg-neutral-200">
        <img
          src={download_url}
          alt={`Photograph by ${author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />
      </div>

      {/* metadata strip — matches reference exactly: #001  ALEX LITVIN  ♡ */}
      <div className="flex items-center justify-between px-2.5 py-2 border-t border-fi-border bg-fi-canvas">
        {/* frame number */}
        <span className="font-mono text-[10px] text-fi-muted shrink-0">{frameNum}</span>

        {/* author name — centered, truncated */}
        <span
          className="font-mono text-[10px] font-semibold text-fi-ink uppercase tracking-wider truncate mx-2 text-center flex-1"
          title={author}
        >
          {authorDisplay}
        </span>

        {/* heart button */}
        <button
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? `Remove ${author} from favourites` : `Add ${author} to favourites`}
          aria-pressed={isFavorite}
          className="shrink-0 p-0.5 focus:outline-none focus:ring-1 focus:ring-fi-blue hover:scale-125 transition-transform"
        >
          <svg
            width="14"
            height="13"
            viewBox="0 0 24 24"
            fill={isFavorite ? '#2428FF' : 'none'}
            stroke={isFavorite ? '#2428FF' : '#101010'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
