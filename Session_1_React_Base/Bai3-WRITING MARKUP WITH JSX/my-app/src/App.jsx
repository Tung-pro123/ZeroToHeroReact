// ============================================================================
// FILE: src/App.jsx
// MỤC TIÊU: Root Component điều phối toàn bộ các bài học thực hành tương tác
//           Bài 3: Writing Markup with JSX
// ============================================================================

import React, { useState } from 'react';
import RulesOverview from './components/RulesOverview';
import LiveHtmlConverter from './components/LiveHtmlConverter';
import JsxErrorSimulator from './components/JsxErrorSimulator';
import ChallengeHedyLamarr from './components/ChallengeHedyLamarr';
import JavaThymeleafComparison from './components/JavaThymeleafComparison';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('rules');

  return (
    <div className="app-layout">
      {/* HEADER CHÍNH */}
      <header className="app-header">
        <div className="header-pill">React 18 & Spring Boot Developer Series</div>
        <h1 className="header-title">Bài 3: Writing Markup with JSX</h1>
        <p className="header-desc">
          Làm chủ cú pháp JSX: 3 quy tắc vàng, cơ chế Fragment vô hình <code>&lt;&gt;...&lt;/&gt;</code>, bộ chuyển đổi HTML sang JSX tự động và phòng chống lỗi cú pháp.
        </p>

        {/* THANH ĐIỀU HƯỚNG TAB */}
        <nav className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'rules' ? 'active' : ''}`}
            onClick={() => setActiveTab('rules')}
          >
            📏 1. 3 Quy Tắc Vàng
          </button>
          <button
            className={`tab-btn ${activeTab === 'converter' ? 'active' : ''}`}
            onClick={() => setActiveTab('converter')}
          >
            🔄 2. HTML to JSX Converter
          </button>
          <button
            className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
            onClick={() => setActiveTab('simulator')}
          >
            🧪 3. Phòng Thí Nghiệm Lỗi
          </button>
          <button
            className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            🏆 4. Thử Thách Hedy Lamarr
          </button>
          <button
            className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            🍃 5. Góc Kỹ Sư Java (Thymeleaf)
          </button>
        </nav>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH THEO TAB */}
      <main className="app-main-content">
        {activeTab === 'rules' && <RulesOverview />}
        {activeTab === 'converter' && <LiveHtmlConverter />}
        {activeTab === 'simulator' && <JsxErrorSimulator />}
        {activeTab === 'challenge' && <ChallengeHedyLamarr />}
        {activeTab === 'java' && <JavaThymeleafComparison />}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Dự án học tập <strong>ZeroToHeroReact</strong> • Bài 3: Writing Markup with JSX
        </p>
        <p className="footer-sub">
          Được thiết kế chuẩn cấu trúc modular, trực quan và tương thích 100% với React 18 & Vite.
        </p>
      </footer>
    </div>
  );
}
