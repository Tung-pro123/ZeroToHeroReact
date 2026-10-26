import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <>
      <header className="app-header">
        <div className="header-top">
          <div className="brand-wrapper">
            <div className="brand-logo">🌐</div>
            <div>
              <h1 className="brand-title">ZeroToHeroReact: Session 2 • Bài 1</h1>
              <p className="brand-subtitle">
                Routing (Cấu Hình Định Tuyến Cơ Bản & Nested Layouts) • React Router 6
              </p>
            </div>
          </div>
          <div className="header-meta">
            <span className="badge badge-cyan">PORT: 3021</span>
            <span className="badge badge-indigo">REACT ROUTER 6</span>
            <span className="badge badge-emerald">OUTLET & NESTED</span>
          </div>
        </div>
      </header>

      {/* Live Route Banner */}
      <div className="current-route-banner">
        <div className="route-content-wrapper">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>URL hiện tại:</span>
            <span className="route-url-badge">{location.pathname}</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            Kiểm tra URL thay đổi mà KHÔNG chớp trắng tải lại trang (SPA Client-Side Routing)
          </span>
        </div>
      </div>
    </>
  );
}
