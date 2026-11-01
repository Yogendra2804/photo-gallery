// a single photo card — gets photo data + favorite state/handler as props
export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  const { id, author, download_url } = photo;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* image container — fixed aspect ratio so all cards look consistent */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={download_url}
          alt={`Photo by ${author}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* heart button sits top-right on the image */}
        <button
          onClick={() => onToggleFavorite(id)}
          aria-label={isFavorite ? `Remove ${author} from favorites` : `Add ${author} to favorites`}
          aria-pressed={isFavorite}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow
                     hover:bg-white hover:scale-110 transition-all duration-150 focus:outline-none
                     focus:ring-2 focus:ring-violet-500"
        >
          {/* inline SVG heart — filled when favorited, outlined when not */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 transition-colors duration-150"
            aria-hidden="true"
            stroke={isFavorite ? 'none' : '#9ca3af'}
            fill={isFavorite ? '#e11d48' : 'none'}
            strokeWidth={isFavorite ? 0 : 2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.593c-.425-.38-8.443-7.544-8.443-12.038a5.443 5.443 0 0 1 9.596-3.479
                 1.07 1.07 0 0 0 1.694 0 5.443 5.443 0 0 1 9.596 3.479C24.443 14.05 16.425 21.213 12 21.593z"
            />
          </svg>
        </button>
      </div>

      {/* author name + subtle favorite label */}
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Author</p>
          <p className="text-sm font-medium text-slate-700 truncate">{author}</p>
        </div>
        {isFavorite && (
          <span className="shrink-0 text-xs text-rose-500 font-medium bg-rose-50 px-2 py-0.5 rounded-full">
            Favorited
          </span>
        )}
      </div>
    </article>
  );
}
