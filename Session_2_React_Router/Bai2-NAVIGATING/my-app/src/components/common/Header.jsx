import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div className="brand-wrapper">
            <div className="brand-logo">🧭</div>
            <div>
              <h1 className="brand-title">ZeroToHeroReact: Session 2 • Bài 2</h1>
              <p className="brand-subtitle">
                Navigating (Link vs NavLink vs useNavigate) • Single Page Application Mastery
              </p>
            </div>
          </div>
          <div className="header-meta">
            <span className="badge badge-cyan">PORT: 3020</span>
            <span className="badge badge-indigo">REACT ROUTER 6</span>
            <span className="badge badge-emerald">SPA NAVIGATION</span>
          </div>
        </div>
      </header>

      {/* Live Route & History Control Bar */}
      <div className="current-route-banner">
        <div className="route-content-wrapper">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>URL Trình duyệt hiện tại:</span>
            <span className="route-url-badge">{location.pathname}</span>
            {location.search && <span className="badge badge-amber">{location.search}</span>}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => navigate(-1)}
              title="navigate(-1) quay lại trang trước"
            >
              ⬅️ Back
            </button>
            <button
              className="btn btn-outline"
              style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              onClick={() => navigate(1)}
              title="navigate(1) tiến tới trang kế"
            >
              Forward ➡️
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
