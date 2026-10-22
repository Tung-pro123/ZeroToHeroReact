// ========================================================================================
// FILE: src/App.jsx
// ========================================================================================
// BÀI HỌC 5: PASSING PROPS TO A COMPONENT (TRUYỀN VÀ NHẬN PROPS TRONG REACT)
//
// 1. App đóng vai trò là Root Component quản lý việc điều phối các kịch bản học tập.
// 2. Minh họa đầy đủ các khía cạnh:
//    - Bước 1 & 2: Cú pháp truyền/nhận props (Giải mã ảnh Base64 trong tài liệu bài học)
//    - Bước 3: Giá trị mặc định (Default values)
//    - Bước 4: Toán tử Spread {...props}
//    - Bước 5: Vũ khí hạng nặng: Prop children (Tư duy "Cái Vỏ Rỗng" / Slot Pattern)
//    - Bước 6: Tính chất bất biến (Immutability)
//    - Bước 7 & 8: Lời giải hoàn chỉnh 3 bài tập Challenges
//    - Bản đồ đối chiếu Spring Boot (DTO, Records, Thymeleaf Layouts)
// ========================================================================================

import { useState } from 'react';
import GalleryDemo from './components/props-basics/GalleryDemo';
import SpreadPropsDemo from './components/spread-demo/SpreadPropsDemo';
import PropsImmutabilityDemo from './components/immutability/PropsImmutabilityDemo';
import ChallengeSection from './components/challenges/ChallengeSection';
import SpringPropsTable from './components/spring-comparison/SpringPropsTable';
import './App.css';

export default function App() {
  // Quản lý tab đang hiển thị
  const [activeTab, setActiveTab] = useState('basics');

  return (
    <div className="app-container">
      {/* HEADER: Tiêu đề và điều hướng */}
      <header className="app-header">
        <div className="brand-badge">
          <span className="react-icon">⚛️</span>
          <span>React.dev Mastery &bull; Bài 5</span>
        </div>

        <h1 className="app-main-title">
          Passing Props To A Component
        </h1>

        <p className="app-subtitle">
          Làm chủ phương thức giao tiếp dữ liệu cốt lõi của React: Từ đối tượng dữ liệu, 
          toán tử Spread <code>{`{...props}`}</code>, vũ khí hạng nặng <code>children</code> 
          cho đến tư duy bất biến (Immutability) đối chiếu với Java / Spring Boot.
        </p>

        {/* Thanh chuyển đổi 5 góc nhìn bài học */}
        <nav className="nav-tabs-bar" aria-label="Main Navigation">
          <button
            className={`nav-tab-item ${activeTab === 'basics' ? 'active' : ''}`}
            onClick={() => setActiveTab('basics')}
          >
            🧩 1. Truyền & Nhận Props Cơ Bản
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'spread' ? 'active' : ''}`}
            onClick={() => setActiveTab('spread')}
          >
            📦 2. Kỹ Thuật Spread ({`{...props}`})
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'immutable' ? 'active' : ''}`}
            onClick={() => setActiveTab('immutable')}
          >
            🔒 3. Tính Bất Biến (Immutability)
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'challenges' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenges')}
          >
            🎯 4. Lời Giải 3 Thử Thách (react.dev)
          </button>

          <button
            className={`nav-tab-item ${activeTab === 'spring' ? 'active' : ''}`}
            onClick={() => setActiveTab('spring')}
          >
            🌱 5. Đối Chiếu Spring Boot
          </button>
        </nav>
      </header>

      {/* BODY: Hiển thị nội dung tương ứng theo tab */}
      <main className="app-main-content">
        {activeTab === 'basics' && <GalleryDemo />}
        {activeTab === 'spread' && <SpreadPropsDemo />}
        {activeTab === 'immutable' && <PropsImmutabilityDemo />}
        {activeTab === 'challenges' && <ChallengeSection />}
        {activeTab === 'spring' && <SpringPropsTable />}
      </main>
    </div>
  );
}
