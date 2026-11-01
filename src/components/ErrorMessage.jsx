export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      {/* sad-face SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14 text-red-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M8 15s1.5-2 4-2 4 2 4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth={2.5} strokeLinecap="round" />
      </svg>
      <h2 className="text-lg font-semibold text-slate-700">Failed to load photos</h2>
      <p className="text-sm text-red-500 max-w-sm text-center">{message}</p>
      <p className="text-xs text-slate-400">Check your connection and try refreshing the page.</p>
    </div>
  );
}
