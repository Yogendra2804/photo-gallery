export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      {/* spinning ring */}
      <div
        className="w-12 h-12 rounded-full border-4 border-violet-200 border-t-violet-600 animate-spin"
        role="status"
        aria-label="Loading photos"
      />
      <p className="text-slate-500 text-sm tracking-wide">Loading photos...</p>
    </div>
  );
}
