import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <span>🌐</span>
          </div>
          <div>
            <h1 className="brand-title">URL Values & Router State Engine</h1>
            <p className="brand-subtitle">
              Session 2 • Bài 3: Khai thác useParams, useSearchParams & useLocation (Chuẩn Production React 18)
            </p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge-cyan">
            <span>⚡</span> React Router v6.22
          </span>
          <span className="badge badge-purple">
            <span>🔌</span> Port 3022
          </span>
          <span className="badge badge-emerald">
            <span>📍</span> {location.pathname}
          </span>
        </div>
      </div>
    </header>
  );
}
