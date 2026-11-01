import { useState } from 'react';
import CollectionCard from './CollectionCard';
import { mockCollections } from '../data/mockCollections';

// right-side import workspace — local UI prototype only
// no actual external API calls here, just interactive state
export default function ImportPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('photographer'); // 'photographer' | 'pinterest'
  const [searchQuery, setSearchQuery] = useState('Alex Litvin');
  const [pinterestUrl, setPinterestUrl] = useState('');
  // start with first two selected (matches reference screenshot)
  const [selectedIds, setSelectedIds] = useState(new Set([1, 2]));

  function toggleCollection(id) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedCount = selectedIds.size;
  const totalSelectedPhotos = mockCollections
    .filter((c) => selectedIds.has(c.id))
    .reduce((sum, c) => sum + c.count, 0);

  return (
    <aside className="
      /* mobile: fixed full-screen overlay */
      fixed inset-0 z-30 bg-fi-canvas flex flex-col
      /* desktop: static right panel */
      lg:static lg:inset-auto lg:w-[370px] lg:shrink-0 lg:border-l lg:border-fi-border lg:h-full
    ">
      {/* panel header */}
      <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-fi-border shrink-0">
        <div>
          <h2 className="font-display font-black text-fi-ink text-2xl leading-tight">
            <span className="text-fi-orange">/</span> Bring in new frames
          </h2>
          <p className="font-sans text-fi-muted text-xs mt-1 leading-snug max-w-[240px]">
            Discover fresh collections and import them into your gallery.
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close import panel"
          className="w-7 h-7 flex items-center justify-center border border-fi-border text-fi-ink hover:bg-fi-ink hover:text-white transition-colors shrink-0 mt-0.5"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* source tabs */}
      <div className="flex border-b border-fi-border shrink-0">
        <button
          onClick={() => setActiveTab('photographer')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors border-r border-fi-border
            ${activeTab === 'photographer' ? 'bg-fi-lime text-fi-ink' : 'bg-fi-canvas text-fi-muted hover:bg-fi-ink/5'}`}
        >
          {/* search magnifier icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="8.5" y1="8.5" x2="11" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          SEARCH PHOTOGRAPHER
        </button>
        <button
          onClick={() => setActiveTab('pinterest')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors
            ${activeTab === 'pinterest' ? 'bg-fi-lime text-fi-ink' : 'bg-fi-canvas text-fi-muted hover:bg-fi-ink/5'}`}
        >
          {/* Pinterest "P" icon */}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <circle cx="6" cy="6" r="5.25" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M4.5 9.5C4.8 8.5 5 7.5 5 7.5C5 7.5 5.3 8 6 8C7.7 8 9 6.4 9 4.7C9 3.2 7.7 2 6 2C3.8 2 3 3.5 3 4.8C3 5.6 3.4 6.2 4 6.2C4.3 6.2 4.4 5.8 4.4 5.5C4.4 5.1 4.2 4.8 4.2 4.4C4.2 3.5 4.9 2.9 5.8 2.9C6.6 2.9 7.2 3.4 7.2 4.3C7.2 5.3 6.6 6.6 5.6 6.6C5.2 6.6 4.9 6.3 4.9 5.9L4.9 5.9C4.9 5.9 4.5 7.5 4.4 7.9L4.3 8.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
          PINTEREST PROFILE
        </button>
      </div>

      {/* scrollable body */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === 'photographer' ? (
          <div className="flex flex-col h-full">
            {/* search input */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-center border border-fi-border bg-white">
                <span className="pl-3 pr-2 shrink-0">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <circle cx="5.5" cy="5.5" r="4.5" stroke="#686868" strokeWidth="1.5"/>
                    <line x1="9.2" y1="9.2" x2="12" y2="12" stroke="#686868" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photographer name..."
                  aria-label="Search photographer"
                  className="flex-1 py-2.5 pr-3 text-sm font-sans text-fi-ink placeholder-fi-muted bg-transparent focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="pr-3 text-fi-muted hover:text-fi-ink"
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* results summary */}
            {searchQuery && (
              <p className="px-4 pb-3 font-sans text-fi-muted text-xs">
                Results for <strong className="text-fi-ink">&ldquo;{searchQuery}&rdquo;</strong> · {mockCollections.length} collections found
              </p>
            )}

            {/* collection cards */}
            <div className="px-4 flex flex-col gap-2 pb-4">
              {mockCollections.map((col) => (
                <CollectionCard
                  key={col.id}
                  collection={col}
                  selected={selectedIds.has(col.id)}
                  onToggle={() => toggleCollection(col.id)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* pinterest tab */
          <div className="px-4 pt-4">
            <p className="font-sans text-fi-muted text-xs mb-3">
              Paste a Pinterest profile or board URL to browse collections.
            </p>
            <div className="flex items-center border border-fi-border bg-white">
              <span className="pl-3 pr-2 shrink-0 font-mono text-[10px] text-fi-muted">URL</span>
              <input
                type="url"
                value={pinterestUrl}
                onChange={(e) => setPinterestUrl(e.target.value)}
                placeholder="pinterest.com/username/board"
                aria-label="Pinterest board URL"
                className="flex-1 py-2.5 pr-3 text-sm font-sans text-fi-ink placeholder-fi-muted bg-transparent focus:outline-none"
              />
            </div>
            <p className="mt-4 font-sans text-fi-muted text-xs border border-fi-border/30 bg-white p-3">
              Pinterest integration is coming soon. This panel is a design prototype — no Pinterest data is accessed.
            </p>
          </div>
        )}
      </div>

      {/* import footer — fixed at bottom of panel */}
      <div className="shrink-0 border-t border-fi-border bg-fi-canvas">
        <div className="flex items-center justify-between px-4 py-3">
          {/* selection summary */}
          <div>
            <p className="font-mono text-[10px] font-semibold text-fi-ink uppercase tracking-wide leading-tight">
              {selectedCount} COLLECTION{selectedCount !== 1 ? 'S' : ''} SELECTED
            </p>
            <p className="font-mono text-[10px] text-fi-muted tracking-wide">
              ({totalSelectedPhotos} PHOTOS)
            </p>
          </div>

          {/* import button */}
          <button
            disabled={selectedCount === 0}
            className={`flex items-center gap-2 px-4 py-2.5 font-mono text-[10px] font-semibold tracking-widest uppercase transition-colors
              ${selectedCount > 0
                ? 'bg-fi-blue text-white hover:bg-blue-700'
                : 'bg-fi-ink/10 text-fi-muted cursor-not-allowed'
              }`}
            aria-label={`Import ${selectedCount} selected collections`}
          >
            {/* download icon */}
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1V9M6.5 9L4 6.5M6.5 9L9 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 11H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            IMPORT SELECTED
          </button>
        </div>
      </div>
    </aside>
  );
}
