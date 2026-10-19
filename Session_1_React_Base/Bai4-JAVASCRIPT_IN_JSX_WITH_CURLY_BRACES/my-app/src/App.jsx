// ============================================================================
// FILE: src/App.jsx
// MỤC TIÊU: Root Component điều phối toàn bộ các bài học thực hành tương tác
//           Bài 4: JavaScript in JSX with Curly Braces
// ============================================================================

import React, { useState } from 'react';
import DynamicExpressionLab from './components/DynamicExpressionLab';
import DoubleCurlyStyleLab from './components/DoubleCurlyStyleLab';
import PitfallsAndFalsyLab from './components/PitfallsAndFalsyLab';
import GregorioZaraChallenge from './components/GregorioZaraChallenge';
import JavaExpressionComparison from './components/JavaExpressionComparison';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('expressions');

  return (
    <div className="app-layout">
      {/* HEADER CHÍNH */}
      <header className="app-header">
        <div className="header-pill">React 18 & Spring Boot Developer Series</div>
        <h1 className="header-title">Bài 4: JavaScript in JSX with Curly Braces</h1>
        <p className="header-desc">
          Làm chủ cặp ngoặc nhọn <code>{`{}`}</code>: Cánh cửa sổ nhúng logic động, giải mã bí mật cú pháp <code>{`{{}}`}</code>, 
          inline styles và cạm bẫy giá trị Falsy trong JSX.
        </p>

        {/* THANH ĐIỀU HƯỚNG TAB */}
        <nav className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'expressions' ? 'active' : ''}`}
            onClick={() => setActiveTab('expressions')}
          >
            🪟 1. Cánh Cửa JavaScript {`{}`}
          </button>
          <button
            className={`tab-btn ${activeTab === 'curly' ? 'active' : ''}`}
            onClick={() => setActiveTab('curly')}
          >
            🎨 2. Giải Mã Cú Pháp {`{{}}`}
          </button>
          <button
            className={`tab-btn ${activeTab === 'pitfalls' ? 'active' : ''}`}
            onClick={() => setActiveTab('pitfalls')}
          >
            🧪 3. Phòng Thí Nghiệm Cạm Bẫy
          </button>
          <button
            className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            🏆 4. Thử Thách Gregorio Zara
          </button>
          <button
            className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            🍃 5. Góc Kỹ Sư Java (Spring EL)
          </button>
        </nav>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH THEO TAB */}
      <main className="app-main-content">
        {activeTab === 'expressions' && <DynamicExpressionLab />}
        {activeTab === 'curly' && <DoubleCurlyStyleLab />}
        {activeTab === 'pitfalls' && <PitfallsAndFalsyLab />}
        {activeTab === 'challenge' && <GregorioZaraChallenge />}
        {activeTab === 'java' && <JavaExpressionComparison />}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Dự án học tập <strong>ZeroToHeroReact</strong> • Bài 4: JavaScript in JSX with Curly Braces
        </p>
        <p className="footer-sub">
          Được thiết kế chuẩn cấu trúc modular, trực quan và tương thích 100% với React 18 & Vite.
        </p>
      </footer>
    </div>
  );
}
