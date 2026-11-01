export default function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <div className="p-4 border-2 border-fi-border bg-white shadow-[4px_4px_0px_#242424] max-w-md w-full mx-4">
        <div className="inline-block bg-fi-orange text-white font-mono text-[10px] uppercase font-bold px-2 py-0.5 tracking-widest mb-3">
          ERROR 01 // ARCHIVE CONNECTION FAILED
        </div>
        <h2 className="font-display font-bold text-fi-ink text-lg leading-tight mb-2">
          Unable to Load Photographs
        </h2>
        <p className="font-sans text-xs text-fi-muted mb-4 leading-relaxed">
          {message || 'A network error occurred while communicating with the remote photo archive.'}
        </p>
        <p className="font-mono text-[10px] text-fi-ink border-t border-fi-border/30 pt-3">
          Check network connection & refresh to retry.
        </p>
      </div>
    </div>
  );
}
