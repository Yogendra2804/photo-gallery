// left sidebar — logo, nav, footer label
const navItems = [
  {
    id: 'gallery',
    label: 'Gallery',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    id: 'discover',
    label: 'Discover',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: 'saved',
    label: 'Saved',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M8 13.5C8 13.5 1.5 9.5 1.5 5.5C1.5 3.567 3.067 2 5 2C6.105 2 7.09 2.526 7.73 3.354L8 3.72L8.27 3.354C8.91 2.526 9.895 2 11 2C12.933 2 14.5 3.567 14.5 5.5C14.5 9.5 8 13.5 8 13.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Sidebar({ activeNav, onNavChange }) {
  return (
    <>
      {/* ── desktop sidebar ── */}
      <aside className="hidden lg:flex flex-col w-[140px] shrink-0 border-r border-fi-border bg-fi-canvas h-screen">

        {/* logo */}
        <div className="px-4 pt-4 pb-5 border-b border-fi-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-fi-lime flex items-center justify-center shrink-0">
              <span className="font-display font-black text-fi-ink text-sm leading-none">F</span>
            </div>
            <div className="leading-none">
              <p className="font-display font-black text-fi-ink text-[10px] tracking-widest uppercase leading-tight">FRAME</p>
              <p className="font-display font-black text-fi-ink text-[10px] tracking-widest uppercase leading-tight">INDEX</p>
            </div>
          </div>
        </div>

        {/* nav */}
        <nav className="flex flex-col gap-0.5 p-2 pt-3 flex-1" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2.5 px-3 py-2.5 w-full text-left transition-colors
                  ${isActive
                    ? 'bg-fi-blue text-white'
                    : 'text-fi-ink hover:bg-fi-ink/5'
                  }`}
              >
                {item.icon}
                <span className="font-sans text-xs font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* bottom label */}
        <div className="border-t border-fi-border overflow-hidden">
          {/* decorative architecture photo */}
          <div className="h-24 overflow-hidden">
            <img
              src="https://picsum.photos/id/1060/140/100"
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </div>
          <div className="px-3 py-2 bg-fi-ink">
            <p className="font-mono text-[8px] text-fi-canvas/60 leading-tight uppercase tracking-wider">
              VISUAL<br/>COLLECTION<br/>TOOL — v1.0
            </p>
          </div>
        </div>
      </aside>

      {/* ── mobile bottom nav ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-fi-canvas border-t border-fi-border flex"
        aria-label="Mobile navigation"
      >
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-semibold transition-colors
                ${isActive ? 'text-fi-blue' : 'text-fi-muted'}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
