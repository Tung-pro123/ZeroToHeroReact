// ==========================================================================
// APP COMPONENT CHÍNH - BÀI 7: RENDERING LISTS (HIỂN THỊ DANH SÁCH DỮ LIỆU)
// ==========================================================================
import React, { useState } from 'react';
import './App.css';

// Import các component minh họa kiến thức
import BasicListTransform from './components/list-core/BasicListTransform';
import ArrowSyntaxTrapInspector from './components/list-core/ArrowSyntaxTrapInspector';
import KeyPitfallsLab from './components/key-pitfalls/KeyPitfallsLab';
import ChallengeContainer from './components/challenges/ChallengeContainer';
import SpringListAnalogy from './components/spring-comparison/SpringListAnalogy';

export default function App() {
  // Trạng thái tab đang được kích hoạt
  const [activeTab, setActiveTab] = useState('transform');

  return (
    <div className="app-container">
      {/* Header chính */}
      <header className="app-header">
        <div className="header-badge">
          <span>⚛️ React Mastery &bull; Bài học 7</span>
        </div>
        <h1 className="app-title">Rendering Lists</h1>
        <p className="app-subtitle">
          Làm chủ kỹ thuật hiển thị danh sách dữ liệu: filter & map, cạm bẫy cú pháp return, 
          bảo vệ thuộc tính key, và liên hệ kiến trúc Java Stream API / JPA @Id
        </p>
      </header>

      {/* Thanh điều hướng Tabs */}
      <nav className="tabs-navigation">
        <button
          className={`tab-btn ${activeTab === 'transform' ? 'active' : ''}`}
          onClick={() => setActiveTab('transform')}
        >
          <span>🔄 1. Biến Đổi Dữ Liệu (filter & map)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'syntax' ? 'active' : ''}`}
          onClick={() => setActiveTab('syntax')}
        >
          <span>⚠️ 2. Cạm Bẫy Cú Pháp Arrow Function</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'pitfalls' ? 'active' : ''}`}
          onClick={() => setActiveTab('pitfalls')}
        >
          <span>🧪 3. Lab: Cạm Bẫy Key (Index & Random)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'challenges' ? 'active' : ''}`}
          onClick={() => setActiveTab('challenges')}
        >
          <span>🎯 4. Thử Thách react.dev (1, 2, 3, 4)</span>
        </button>

        <button
          className={`tab-btn ${activeTab === 'spring' ? 'active' : ''}`}
          onClick={() => setActiveTab('spring')}
        >
          <span>☕ 5. Đối Chiếu Spring Boot & Streams</span>
        </button>
      </nav>

      {/* Nội dung thay đổi linh hoạt theo Tab */}
      <main className="tab-content">
        {activeTab === 'transform' && <BasicListTransform />}
        {activeTab === 'syntax' && <ArrowSyntaxTrapInspector />}
        {activeTab === 'pitfalls' && <KeyPitfallsLab />}
        {activeTab === 'challenges' && <ChallengeContainer />}
        {activeTab === 'spring' && <SpringListAnalogy />}
      </main>

      {/* Footer nhỏ */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--color-text-subtle)', fontSize: '0.85rem' }}>
        <p>Thực hành React 18 + Vite | Port: 3004 | Đối chiếu Java Stream API & Spring Boot Architecture</p>
      </footer>
    </div>
  );
}
