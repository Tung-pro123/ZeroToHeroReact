import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [testUrl, setTestUrl] = useState('/shops/10/products/25?color=deep-purple&page=2&sort=price-asc#reviews');

  // Parse simulated URL
  const [pathPart, queryHashPart] = testUrl.split('?');
  const [queryPart, hashPart] = (queryHashPart || '').split('#');

  const sampleUrls = [
    { label: 'Concert Hanoi', url: '/concerts/hanoi?q=rock&page=2' },
    { label: 'Shop Multi-Params', url: '/shops/10/products/25?color=titanium&warranty=2y' },
    { label: 'Ecommerce Search', url: '/products?q=macbook+pro&category=laptops&sort=price_desc&page=1' },
    { label: 'User Detail', url: '/users/42?tab=activity&view=timeline#latest' }
  ];

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-cyan)' }}>
        <h2 className="card-title">
          <span>🌐</span> URL không chỉ dùng để chuyển trang — URL là Nguồn Chân Lý Của State
        </h2>
        <p className="card-subtitle">
          Trong các ứng dụng Single Page Application (SPA) hiện đại, thanh địa chỉ URL là một <strong>bộ nhớ trạng thái dùng chung toàn cầu</strong>. 
          Khi user chia sẻ link, bookmark hoặc nhấn F5 Refresh, giao diện phải phục hồi chính xác trạng thái người dùng đang xem. 
          React Router 6 cung cấp bộ 3 Hooks quyền lực để giải quyết bài toán này.
        </p>

        {/* URL Anatomy Simulator */}
        <div style={{ marginTop: '1.5rem', background: 'rgba(0, 0, 0, 0.4)', padding: '1.25rem', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8' }}>
              🔬 Bộ Giải Phẫu URL Trực Quan (Interactive URL Anatomy)
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {sampleUrls.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestUrl(s.url)}
                  className="btn btn-secondary btn-sm"
                  style={{ fontSize: '0.75rem' }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="form-input"
              style={{ fontFamily: 'JetBrains Mono', fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                1. PATHNAME & DYNAMIC PARAMS
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#e2e8f0', wordBreak: 'break-all', fontSize: '0.92rem' }}>
                {pathPart || '/'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                👉 Được phân tích bởi <code>useParams()</code> (ví dụ: <code>:city</code>, <code>:productId</code>)
              </div>
            </div>

            <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                2. QUERY / SEARCH PARAMS (?key=value)
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#e2e8f0', wordBreak: 'break-all', fontSize: '0.92rem' }}>
                {queryPart ? `?${queryPart}` : '(không có query)'}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                👉 Được đọc/ghi bởi <code>useSearchParams()</code> (search, filter, sort, pagination)
              </div>
            </div>

            <div style={{ background: 'rgba(192, 132, 252, 0.08)', border: '1px solid rgba(192, 132, 252, 0.3)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                3. COMPLETE LOCATION METADATA
              </div>
              <div style={{ fontFamily: 'JetBrains Mono', color: '#e2e8f0', wordBreak: 'break-all', fontSize: '0.92rem' }}>
                hash: {hashPart ? `#${hashPart}` : 'rỗng'} | key: "8df3a1"
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                👉 Được cung cấp toàn diện bởi <code>useLocation()</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Triad Hooks Overview */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>⚡</span> Bộ Ba Hooks Xương Sống: useParams, useSearchParams & useLocation
      </h3>

      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        {/* Card 1: useParams */}
        <div className="triad-card" style={{ '--card-accent': '#38bdf8' }}>
          <div className="triad-hook-title">useParams()</div>
          <p className="triad-hook-desc">
            Trích xuất các tham số động được định nghĩa bởi tiền tố <code>:param</code> trong chuỗi path của Route.
          </p>
          <div className="triad-pill-group">
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Vị trí dữ liệu:</span>
              <strong style={{ color: '#38bdf8' }}>Trong Path (/concerts/:city)</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Kiểu trả về:</span>
              <strong style={{ color: '#fbbf24' }}>Object &lt;string, string&gt;</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Tương đương Spring:</span>
              <strong style={{ color: '#34d399' }}>@PathVariable</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Mục đích chính:</span>
              <strong style={{ color: '#f8fafc' }}>Định danh Resource cụ thể</strong>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/params-lab" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở Dynamic Params Lab →
            </Link>
          </div>
        </div>

        {/* Card 2: useSearchParams */}
        <div className="triad-card" style={{ '--card-accent': '#34d399' }}>
          <div className="triad-hook-title">useSearchParams()</div>
          <p className="triad-hook-desc">
            Đọc và cập nhật các cặp key-value phía sau dấu <code>?</code>. Trả về mảng <code>[searchParams, setSearchParams]</code>.
          </p>
          <div className="triad-pill-group">
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Vị trí dữ liệu:</span>
              <strong style={{ color: '#34d399' }}>Sau dấu ? (?q=mac&page=2)</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Kiểu trả về:</span>
              <strong style={{ color: '#fbbf24' }}>[URLSearchParams, Function]</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Tương đương Spring:</span>
              <strong style={{ color: '#34d399' }}>@RequestParam</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Mục đích chính:</span>
              <strong style={{ color: '#f8fafc' }}>Search, Filter, Sort, Paging</strong>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/search-studio" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở Search & Filter Studio →
            </Link>
          </div>
        </div>

        {/* Card 3: useLocation */}
        <div className="triad-card" style={{ '--card-accent': '#c084fc' }}>
          <div className="triad-hook-title">useLocation()</div>
          <p className="triad-hook-desc">
            Trả về đối tượng Location toàn vẹn biểu diễn trạng thái điều hướng hiện tại của ứng dụng.
          </p>
          <div className="triad-pill-group">
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Thuộc tính chính:</span>
              <strong style={{ color: '#c084fc' }}>pathname, search, hash, state, key</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>location.search:</span>
              <strong style={{ color: '#fbbf24' }}>Raw String (ví dụ: "?q=x")</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Khác với searchParams:</span>
              <strong style={{ color: '#38bdf8' }}>Không có getter/setter helper</strong>
            </div>
            <div className="triad-pill">
              <span style={{ color: '#94a3b8' }}>Ứng dụng tiêu biểu:</span>
              <strong style={{ color: '#f8fafc' }}>Analytics tracker, Breadcrumb</strong>
            </div>
          </div>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/location-inspector" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở Location Inspector →
            </Link>
          </div>
        </div>
      </div>

      {/* Decision Matrix: When to use what? */}
      <div className="glass-card">
        <h3 className="card-title">
          <span>🧠</span> Mental Model Quyết Định: Khi Nào Dùng Path Param vs Query Param?
        </h3>
        <p className="card-subtitle">
          Quy tắc chuẩn mực quốc tế khi thiết kế URL cho cả Frontend Router lẫn Backend RESTful API:
        </p>

        <div className="grid-2">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
              📌 Path Variable (:param) — Định Danh Tài Nguyên
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
              Đặt câu hỏi: <em>"Tôi đang truy cập chính xác vào thực thể/tài nguyên nào?"</em>
            </p>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              <li>Nếu thiếu giá trị này, trang không có nghĩa hoặc không biết hiển thị cái gì.</li>
              <li>Ví dụ: <code>/users/15</code>, <code>/products/iphone-15-pro</code>, <code>/orders/ORD-9912</code>.</li>
              <li>Dùng <code>useParams()</code> trên React và <code>@PathVariable</code> trên Spring Boot.</li>
            </ul>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px', borderLeft: '4px solid #34d399' }}>
            <h4 style={{ color: '#34d399', marginBottom: '0.5rem', fontSize: '1.05rem' }}>
              🎯 Query Parameter (?key=val) — Tùy Biến Trạng Thái Hiển Thị
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '0.8rem' }}>
              Đặt câu hỏi: <em>"Tôi đang xem tập danh sách này theo điều kiện lọc/phân trang nào?"</em>
            </p>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6 }}>
              <li>Các tham số này có tính tùy chọn (optional). Nếu không có, hệ thống vẫn hiển thị dữ liệu mặc định.</li>
              <li>Ví dụ: <code>/products?q=laptop&page=2&sort=price_asc</code>, <code>/users?role=ADMIN</code>.</li>
              <li>Dùng <code>useSearchParams()</code> trên React và <code>@RequestParam</code> trên Spring Boot.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
