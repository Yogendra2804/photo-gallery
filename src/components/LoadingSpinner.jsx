export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      {/* brutalist geometric loader */}
      <div className="relative w-12 h-12 border-2 border-fi-border bg-white flex items-center justify-center shadow-[3px_3px_0px_#242424]">
        <div className="w-5 h-5 bg-fi-lime animate-ping" />
        <div className="absolute inset-0 border-2 border-fi-blue animate-spin" style={{ animationDuration: '2s' }} />
      </div>
      <div className="text-center">
        <p className="font-mono text-xs font-semibold text-fi-ink uppercase tracking-widest">
          FETCHING 30 FRAMES
        </p>
        <p className="font-mono text-[10px] text-fi-muted mt-0.5">
          Connecting to picsum.photos...
        </p>
      </div>
    </div>
  );
}
