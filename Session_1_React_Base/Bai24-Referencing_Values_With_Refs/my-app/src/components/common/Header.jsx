export default function Header() {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="brand-wrapper">
          <div className="brand-logo">⚓</div>
          <div>
            <h1 className="brand-title">ZeroToHeroReact: Bài 24</h1>
            <p className="brand-subtitle">
              Referencing Values with Refs (useRef) • Escape Hatches Chapter
            </p>
          </div>
        </div>
        <div className="header-meta">
          <span className="badge badge-cyan">PORT: 3018</span>
          <span className="badge badge-purple">REACT 18 & 19</span>
          <span className="badge badge-emerald">ESCAPE HATCH</span>
        </div>
      </div>
    </header>
  );
}
