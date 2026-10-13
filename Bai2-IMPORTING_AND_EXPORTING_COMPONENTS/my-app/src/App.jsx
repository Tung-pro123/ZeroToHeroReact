// ============================================================================
// FILE: src/App.jsx
// MỤC TIÊU: Root Component điều phối toàn bộ các bài học thực hành tương tác
//           Bài 2: Importing and Exporting Components
// ============================================================================

import React, { useState } from 'react';
import Gallery from './components/Gallery';
import { MemberCard, RoleBadge, BioSnippet, SocialLinks } from './components/TeamMembers';
import ProductCard, { PriceTag, StockStatus, BuyButton } from './components/MixedModule';
import PitfallSimulator from './components/PitfallSimulator';
import ChallengeSolution from './components/ChallengeSolution';
import JavaComparisonView from './components/JavaComparisonView';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('default');
  const [customImportName, setCustomImportName] = useState('Gallery');

  return (
    <div className="app-layout">
      {/* HEADER CHÍNH */}
      <header className="app-header">
        <div className="header-pill">React 18 & Spring Boot Developer Series</div>
        <h1 className="header-title">Bài 2: Importing & Exporting Components</h1>
        <p className="header-desc">
          Làm chủ cơ chế Module hóa ES6 trong React: Default Export, Named Export, Cú pháp kết hợp, và Phòng tránh lỗi kinh điển <code>undefined component</code>.
        </p>

        {/* THANH ĐIỀU HƯỚNG TAB */}
        <nav className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'default' ? 'active' : ''}`}
            onClick={() => setActiveTab('default')}
          >
            🌟 1. Default Export
          </button>
          <button
            className={`tab-btn ${activeTab === 'named' ? 'active' : ''}`}
            onClick={() => setActiveTab('named')}
          >
            🏷️ 2. Named Export
          </button>
          <button
            className={`tab-btn ${activeTab === 'mixed' ? 'active' : ''}`}
            onClick={() => setActiveTab('mixed')}
          >
            📦 3. Mixed Export
          </button>
          <button
            className={`tab-btn ${activeTab === 'pitfall' ? 'active' : ''}`}
            onClick={() => setActiveTab('pitfall')}
          >
            🧪 4. Phòng Thí Nghiệm Lỗi
          </button>
          <button
            className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            🏆 5. Thử Thách react.dev
          </button>
          <button
            className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            ☕ 6. Góc Kỹ Sư Java
          </button>
        </nav>
      </header>

      {/* VÙNG NỘI DUNG CHÍNH THEO TAB */}
      <main className="app-main-content">
        {/* TAB 1: DEFAULT EXPORT */}
        {activeTab === 'default' && (
          <section className="tab-section">
            <div className="section-intro">
              <h2>Mô hình 1: Default Export (Xuất Mặc Định)</h2>
              <p>
                Mỗi file chỉ được phép có duy nhất <strong>1 `export default`</strong>. Khi import, <strong>không dùng ngoặc nhọn</strong> và người nhận có quyền tự do đổi tên component.
              </p>
            </div>

            <div className="interactive-card">
              <div className="card-toolbar">
                <label>
                  <strong>Thử nghiệm đổi tên khi import:</strong>
                </label>
                <input
                  type="text"
                  value={customImportName}
                  onChange={(e) => setCustomImportName(e.target.value || 'Gallery')}
                  className="rename-input"
                  placeholder="Gõ tên bất kỳ..."
                />
                <span className="toolbar-hint">
                  (Cú pháp đang dùng: <code>import {customImportName} from './components/Gallery'</code>)
                </span>
              </div>
            </div>

            {/* Render component Gallery */}
            <Gallery />
          </section>
        )}

        {/* TAB 2: NAMED EXPORT */}
        {activeTab === 'named' && (
          <section className="tab-section">
            <div className="section-intro">
              <h2>Mô hình 2: Named Export (Xuất Có Định Danh)</h2>
              <p>
                Một file có thể xuất <strong>vô số</strong> component hoặc hàm tiện ích. Khi import, <strong>bắt buộc phải bọc trong cặp ngoặc nhọn <code>{`{}`}</code></strong> và khớp chính xác tên hàm gốc.
              </p>
              <div className="code-callout">
                <code>{`import { MemberCard, RoleBadge, BioSnippet, SocialLinks } from './components/TeamMembers';`}</code>
              </div>
            </div>

            <div className="team-grid">
              <MemberCard
                name="Trần Tùng"
                role="Fullstack Lead"
                level="Lead"
                quote="Kiến trúc React Component tương đồng với OOP Clean Architecture trong Java Spring Boot."
                avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                github="github.com/Tung-pro123"
                linkedin="linkedin.com/in/tung-tran"
              />
              <MemberCard
                name="Nguyễn Hà My"
                role="Frontend Architect"
                level="Senior"
                quote="Named Export giúp IDE auto-import chính xác 100% và cực kỳ thuận tiện khi refactor code."
                avatarUrl="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80"
                github="github.com/my-nguyen"
                linkedin="linkedin.com/in/my-nguyen"
              />
              <MemberCard
                name="Lê Quốc Bảo"
                role="DevOps & Backend Engineer"
                level="Senior"
                quote="Tree-shaking hoạt động tối ưu nhất khi dự án tuân thủ nghiêm ngặt chuẩn Named Export."
                avatarUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                github="github.com/bao-le"
                linkedin="linkedin.com/in/bao-le"
              />
            </div>
          </section>
        )}

        {/* TAB 3: MIXED EXPORT */}
        {activeTab === 'mixed' && (
          <section className="tab-section">
            <div className="section-intro">
              <h2>Mô hình 3: Kết Hợp Cả Default & Named Export Trong 1 File</h2>
              <p>
                File <code>MixedModule.jsx</code> xuất 1 component chính là <code>ProductCard</code> (Default) và các thành phần phụ <code>{`{ PriceTag, StockStatus, BuyButton }`}</code> (Named).
              </p>
              <div className="code-callout">
                <code>{`// Gộp trên một dòng duy nhất theo chuẩn ES6:
import ProductCard, { PriceTag, StockStatus, BuyButton } from './components/MixedModule';`}</code>
              </div>
            </div>

            <div className="mixed-demo-container">
              {/* Sử dụng component default chính */}
              <div className="demo-block">
                <h3>1. Sử dụng Full Component (Default Export):</h3>
                <ProductCard
                  title="React Từ Zero Đến Hero (Kỳ 5 - Fall 2026)"
                  category="Chương Trình Chuyên Sâu"
                  price={1500000}
                  discountPrice={990000}
                  inStock={true}
                  stockCount={28}
                  icon="🚀"
                />
              </div>

              {/* Tái sử dụng riêng các Named Export con */}
              <div className="demo-block">
                <h3>2. Tái sử dụng riêng lẻ các Named Component:</h3>
                <div className="subcomponents-tray">
                  <div className="tray-item">
                    <h4>Component <code>&lt;PriceTag /&gt;</code>:</h4>
                    <PriceTag price={500000} discountPrice={350000} />
                  </div>
                  <div className="tray-item">
                    <h4>Component <code>&lt;StockStatus /&gt;</code>:</h4>
                    <StockStatus inStock={true} count={100} />
                    <StockStatus inStock={false} count={0} />
                  </div>
                  <div className="tray-item">
                    <h4>Component <code>&lt;BuyButton /&gt;</code>:</h4>
                    <BuyButton onClick={() => alert("Đã click nút mua độc lập!")} label="Mua Ngay Với 1-Click" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* TAB 4: PHÒNG THÍ NGHIỆM LỖI */}
        {activeTab === 'pitfall' && (
          <section className="tab-section">
            <PitfallSimulator />
          </section>
        )}

        {/* TAB 5: THỬ THÁCH REACT.DEV */}
        {activeTab === 'challenge' && (
          <section className="tab-section">
            <ChallengeSolution />
          </section>
        )}

        {/* TAB 6: GÓC KỸ SƯ JAVA */}
        {activeTab === 'java' && (
          <section className="tab-section">
            <JavaComparisonView />
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>
          Dự án học tập <strong>ZeroToHeroReact</strong> • Bài 2: Importing and Exporting Components
        </p>
        <p className="footer-sub">
          Được thiết kế chuẩn cấu trúc modular, tái sử dụng tối đa và tương thích 100% với React 18 & Vite.
        </p>
      </footer>
    </div>
  );
}
