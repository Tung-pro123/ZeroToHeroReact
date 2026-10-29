import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <span>📊</span>
          </div>
          <div>
            <h1 className="brand-title">formState &amp; Error Handling Masterclass</h1>
            <p className="brand-subtitle">
              Session 4 • Bài 6: Giải Mã 6 Trụ Cột formState (errors, isDirty, dirtyFields, touchedFields, isValid, isSubmitting)
            </p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge-indigo">
            <span>⚡</span> RHF v7.51
          </span>
          <span className="badge badge-cyan">
            <span>🔌</span> Port 3046
          </span>
          <span className="badge badge-emerald">
            <span>📍</span> {location.pathname}
          </span>
        </div>
      </div>
    </header>
  );
}

