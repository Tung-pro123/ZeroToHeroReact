export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-wrapper">
          <div className="brand-logo">🎯</div>
          <div>
            <h1 className="brand-title">ZeroToHeroReact: Bài 25</h1>
            <p className="brand-subtitle">
              Manipulating the DOM with Refs • Escape Hatches Chapter
            </p>
          </div>
        </div>
        <div className="header-meta">
          <span className="badge badge-cyan">PORT: 3019</span>
          <span className="badge badge-indigo">DOM REFS</span>
          <span className="badge badge-emerald">FLUSHSYNC</span>
        </div>
      </div>
    </header>
  );
}
