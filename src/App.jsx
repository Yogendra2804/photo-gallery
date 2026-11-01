import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Gallery from './components/Gallery';
import ImportPanel from './components/ImportPanel';

export default function App() {
  const [activeNav, setActiveNav] = useState('gallery'); // 'gallery' | 'discover' | 'saved'
  const [isImportOpen, setIsImportOpen] = useState(true); // default open on desktop matching reference

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-fi-canvas font-sans text-fi-ink antialiased">
      {/* ── 1. Left Vertical Navigation Sidebar ── */}
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />

      {/* ── 2. Center Workspace (Gallery) ── */}
      <Gallery
        activeNav={activeNav}
        onImportToggle={() => setIsImportOpen((prev) => !prev)}
      />

      {/* ── 3. Right-Side Import Workspace Drawer ── */}
      {isImportOpen && (
        <ImportPanel onClose={() => setIsImportOpen(false)} />
      )}
    </div>
  );
}
