// ========================================================================================
// FILE: src/App.jsx
// ========================================================================================
// BÀI 1: YOUR FIRST COMPONENT (COMPONENT ĐẦU TIÊN CỦA BẠN)
//
// 1. App là Root Component (Thành phần gốc) của ứng dụng React.
//    Nó đóng vai trò như @SpringBootApplication class trong Spring Boot:
//    Điểm bắt đầu lắp ráp toàn bộ hệ thống các module và dịch vụ con!
//
// 2. Mối quan hệ phân cấp cây (Component Tree):
//    App (Ông/Bà)
//     ├── TeamGallery (Cha)
//     │    └── ProfileCard (Con)
//     │         ├── Avatar (Cháu)
//     │         ├── Badge (Cháu)
//     │         └── MetricItem (Cháu)
//     ├── PitfallDemonstrator
//     ├── Congratulations
//     └── SpringVsReactComparison
// ========================================================================================

// Import Hook quản lý trạng thái chuyển đổi tab (sẽ đào sâu ở các bài sau)
import { useState } from 'react';

// Import các Component con độc lập (Tư duy Composition)
import TeamGallery from './components/profile/TeamGallery';
import PitfallDemonstrator from './components/pitfalls/PitfallDemonstrator';
import Congratulations from './components/challenge/Congratulations';
import SpringVsReactComparison from './components/spring-comparison/SpringVsReactComparison';

// Import file định kiểu giao diện
import './App.css';

// BƯỚC 1: Xuất Component chính làm mặc định (export default)
// BƯỚC 2: Tên hàm viết hoa chữ cái đầu (PascalCase: "App")
export default function App() {
  // State lưu tab hiện tại: 'gallery' | 'pitfalls' | 'challenge' | 'spring'
  const [activeTab, setActiveTab] = useState('gallery');

  // BƯỚC 3: Trả về JSX bọc trong cặp ngoặc tròn ( ) để tránh bẫy ASI
  return (
    <div className="app-container">
      {/* HEADER: Tiêu đề và thanh điều hướng chính */}
      <header className="app-header">
        <div className="brand-badge">
          <span className="react-icon">⚛️</span>
          <span>React.dev Mastery &bull; Bài 1</span>
        </div>

        <h1 className="app-main-title">
          Your First Component
        </h1>

        <p className="app-subtitle">
          Khám phá bản chất UI Building Blocks, mối quan hệ Cha - Con (Composition) 
          và cầu nối tư duy vững chắc từ Java Spring Boot sang React hiện đại.
        </p>

        {/* Thanh chuyển đổi góc nhìn học tập */}
        <nav className="nav-tabs-bar" aria-label="Main Navigation">
          <button 
            className={`nav-tab-item ${activeTab === 'gallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('gallery')}
          >
            👥 1. Thực Hành Composition (Team Gallery)
          </button>

          <button 
            className={`nav-tab-item ${activeTab === 'pitfalls' ? 'active' : ''}`}
            onClick={() => setActiveTab('pitfalls')}
          >
            ⚠️ 2. Cạm Bẫy Cần Tránh (Pitfalls)
          </button>

          <button 
            className={`nav-tab-item ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            🎉 3. Thử Thách react.dev (Challenge 4)
          </button>

          <button 
            className={`nav-tab-item ${activeTab === 'spring' ? 'active' : ''}`}
            onClick={() => setActiveTab('spring')}
          >
            🌱 4. Đối Chiếu Spring Boot
          </button>
        </nav>
      </header>

      {/* BODY: Hiển thị Component tương ứng theo tab đã chọn */}
      <main className="app-main-content">
        {activeTab === 'gallery' && <TeamGallery />}
        {activeTab === 'pitfalls' && <PitfallDemonstrator />}
        {activeTab === 'challenge' && <Congratulations />}
        {activeTab === 'spring' && <SpringVsReactComparison />}
      </main>
    </div>
  );
}
