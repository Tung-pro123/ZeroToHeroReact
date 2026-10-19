// ========================================================================================
// FILE: src/App.jsx
// ========================================================================================
// BÀI HỌC 8: KEEPING COMPONENTS PURE (GIỮ COMPONENT TINH KHIẾT)
//
// 1. App là Root Component điều phối toàn bộ các module bài học.
// 2. Nội dung kiến trúc bao quát:
//    - Mục 1, 2, 4: Tiệc trà tinh khiết vs ô nhiễm & Đột biến cục bộ (Local Mutation)
//    - Mục 3: Cơ chế Strict Mode gọi hàm 2 lần để phát hiện lỗi
//    - Mục 5: Nơi đặt Side Effects hợp pháp (Event Handlers & useEffect)
//    - Mục 6: Bảng quy tắc thao tác Mảng an toàn (Mutating vs Pure)
//    - Mục 7: Lời giải trọn vẹn 3 Challenges của react.dev
//    - Đối chiếu Spring Boot Idempotency & Stateless Services
// ========================================================================================

import { useState } from 'react';
import TeaGatheringDemo from './components/purity-basics/TeaGatheringDemo';
import StrictModeInspector from './components/strict-mode/StrictModeInspector';
import SideEffectPlacementDemo from './components/side-effects/SideEffectPlacementDemo';
import ArrayMutationCheatSheet from './components/array-methods/ArrayMutationCheatSheet';
import ChallengeContainer from './components/challenges/ChallengeContainer';
import SpringIdempotencyAnalogy from './components/spring-comparison/SpringIdempotencyAnalogy';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('purity');

  return (
    <div className="app-container">
      {/* HEADER: Tiêu đề & thanh điều hướng */}
      <header className="app-header">
        <div className="brand-badge">
          <span className="react-icon">🧪</span>
          <span>React.dev Mastery &bull; Bài 8</span>
        </div>

        <h1 className="app-main-title">
          Keeping Components Pure
        </h1>

        <p className="app-subtitle">
          Hiểu sâu bản chất Hàm Tinh Khiết (Pure Functions) trong React: Không đột biến biến ngoài, 
          quy hoạch Side Effects chuẩn xác và bảo toàn dữ liệu đối chiếu với kiến trúc Spring Boot.
        </p>

        {/* Thanh chuyển đổi các chủ đề */}
        <nav className="nav-tabs-bar" aria-label="Main Navigation">
          <button
            className={`nav-tab-item ${activeTab === 'purity' ? 'active' : ''}`}
            onClick={() => setActiveTab('purity')}
          >
            🍵 1. Bản Chất Purity
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'strict' ? 'active' : ''}`}
            onClick={() => setActiveTab('strict')}
          >
            🔬 2. Strict Mode (2x Render)
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'effects' ? 'active' : ''}`}
            onClick={() => setActiveTab('effects')}
          >
            🏛️ 3. Nơi Đặt Side Effects
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'arrays' ? 'active' : ''}`}
            onClick={() => setActiveTab('arrays')}
          >
            📊 4. Thao Tác Mảng (Pure)
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            🎯 5. Lời Giải 3 Thử Thách
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'spring' ? 'active' : ''}`}
            onClick={() => setActiveTab('spring')}
          >
            🌱 6. Đối Chiếu Spring Boot
          </button>
        </nav>
      </header>

      {/* BODY: Hiển thị nội dung tương ứng theo tab */}
      <main className="app-main-content">
        {activeTab === 'purity' && <TeaGatheringDemo />}
        {activeTab === 'strict' && <StrictModeInspector />}
        {activeTab === 'effects' && <SideEffectPlacementDemo />}
        {activeTab === 'arrays' && <ArrayMutationCheatSheet />}
        {activeTab === 'challenges' && <ChallengeContainer />}
        {activeTab === 'spring' && <SpringIdempotencyAnalogy />}
      </main>
    </div>
  );
}
