import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';

export default function App() {
  const [activeNav, setActiveNav] = useState('gallery'); // 'gallery' | 'discover' | 'saved'

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-fi-canvas font-sans text-fi-ink antialiased">
      {/* ── 1. Left Vertical Navigation Sidebar ── */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* ── 2. Center Workspace (Gallery) ── */}
      <Gallery activeNav={activeNav} />
    </div>
  );
}
