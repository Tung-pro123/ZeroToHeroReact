import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="brand-wrapper">
          <div className="brand-icon">
            <span>📋</span>
          </div>
          <div>
            <h1 className="brand-title">Enterprise Form Architecture Lab</h1>
            <p className="brand-subtitle">
              Session 4 • Bài 1: Vấn Đề Của Form Trong React (Controlled vs Uncontrolled & Sứ Mệnh Của React Hook Form)
            </p>
          </div>
        </div>

        <div className="header-badges">
          <span className="badge badge-pink">
            <span>⚡</span> React Hook Form
          </span>
          <span className="badge badge-purple">
            <span>🔌</span> Port 3041
          </span>
          <span className="badge badge-cyan">
            <span>📍</span> {location.pathname}
          </span>
        </div>
      </div>
    </header>
  );
}
