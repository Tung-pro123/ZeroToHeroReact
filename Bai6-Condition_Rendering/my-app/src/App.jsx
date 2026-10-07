// ==========================================================================
// APP COMPONENT CHÍNH - BÀI 6: CONDITIONAL RENDERING (HIỂN THỊ CÓ ĐIỀU KIỆN)
// ==========================================================================
import React, { useState } from 'react';
import './App.css';

// Import các component minh họa 4 kỹ thuật cốt lõi
import PackingListIfElse from './components/techniques/PackingListIfElse';
import PackingListTernary from './components/techniques/PackingListTernary';
import PackingListAnd from './components/techniques/PackingListAnd';
import PackingListLet from './components/techniques/PackingListLet';

// Import phòng thí nghiệm chuyên đề bẫy số 0
import PitfallZeroInspector from './components/techniques/PitfallZeroInspector';

// Import lời giải các bài tập thử thách react.dev
import ChallengeSection from './components/challenges/ChallengeSection';

// Import cầu nối kiến trúc đối chiếu với Spring Boot / Java
import SpringConditionalAnalogy from './components/spring-comparison/SpringConditionalAnalogy';

export default function App() {
  // Trạng thái tab đang được kích hoạt
  const [activeTab, setActiveTab] = useState('techniques');

  return (
    <div className="app-container">
      {/* Header chính của ứng dụng */}
      <header className="app-header">
        <div className="header-badge">
          <span>⚛️ React Mastery &bull; Bài học 6</span>
        </div>
        <h1 className="app-title">Conditional Rendering</h1>
        <p className="app-subtitle">
          Làm chủ kỹ thuật hiển thị có điều kiện trong React: Luồng điều khiển JS gốc, xử lý bẫy số 0, 
          Clean Code và liên hệ kiến trúc Spring Boot
        </p>
      </header>

      {/* Thanh điều hướng Tab */}
      <nav className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === 'techniques' ? 'active' : ''}`}
          onClick={() => setActiveTab('techniques')}
        >
          <span>🔀 4 Kỹ Thuật Cốt Lõi</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'pitfall' ? 'active' : ''}`}
          onClick={() => setActiveTab('pitfall')}
        >
          <span>⚠️ Phòng Thí Nghiệm "Bẫy Số 0"</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <span>🎯 Thử Thách react.dev (1, 2, 3)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'spring' ? 'active' : ''}`}
          onClick={() => setActiveTab('spring')}
        >
          <span>☕ Đối Chiếu Spring Boot</span>
        </button>
      </nav>

      {/* Nội dung ứng dụng thay đổi linh hoạt theo Tab (Conditional Rendering bằng toán tử && hoặc ternary) */}
      <main className="tab-content">
        {/* TAB 1: 4 KỸ THUẬT CỐT LÕI */}
        {activeTab === 'techniques' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="grid-2-cols">
              <PackingListIfElse />
              <PackingListTernary />
            </div>
            <div className="grid-2-cols">
              <PackingListAnd />
              <PackingListLet />
            </div>
          </div>
        )}

        {/* TAB 2: CHUYÊN ĐỀ BẪY SỐ 0 */}
        {activeTab === 'pitfall' && (
          <PitfallZeroInspector />
        )}

        {/* TAB 3: THỬ THÁCH REACT.DEV */}
        {activeTab === 'challenges' && (
          <ChallengeSection />
        )}

        {/* TAB 4: SO SÁNH SPRING BOOT */}
        {activeTab === 'spring' && (
          <SpringConditionalAnalogy />
        )}
      </main>

      {/* Footer nhỏ */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--color-text-subtle)', fontSize: '0.85rem' }}>
        <p>Thực hành React 18 + Vite | Port: 3003 | Kiến trúc sạch & Đối chiếu Spring Boot</p>
      </footer>
    </div>
  );
}
