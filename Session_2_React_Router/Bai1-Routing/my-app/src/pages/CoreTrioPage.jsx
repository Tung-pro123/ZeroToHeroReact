import { useState } from 'react';

const MOCK_ROUTES = [
  { path: '/', label: 'Home Route (index)', component: '<HomePage />', specificity: 'Base' },
  { path: '/products', label: 'Products Catalog', component: '<ProductList />', specificity: 'Exact 1 segment' },
  { path: '/products/:id', label: 'Product Detail Dynamic', component: '<ProductDetail />', specificity: 'Dynamic 2 segments' },
  { path: '/admin/*', label: 'Admin Nested Subtree', component: '<AdminLayout />', specificity: 'Splat Wildcard' },
  { path: '*', label: 'Catch-All 404', component: '<NotFoundPage />', specificity: 'Lowest Priority fallback' },
];

export default function CoreTrioPage() {
  const [testUrl, setTestUrl] = useState('/products/99');

  const getMatchedRoute = (url) => {
    const cleanUrl = url.trim().toLowerCase();
    if (cleanUrl === '' || cleanUrl === '/') return MOCK_ROUTES[0];
    if (cleanUrl === '/products') return MOCK_ROUTES[1];
    if (cleanUrl.startsWith('/products/')) return MOCK_ROUTES[2];
    if (cleanUrl.startsWith('/admin')) return MOCK_ROUTES[3];
    return MOCK_ROUTES[4];
  };

  const matched = getMatchedRoute(testUrl);

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🧩 Giải Phẫu Bộ Ba: BrowserRouter, Routes & Route</h2>
          <p className="lab-desc">
            Khám phá kiến trúc định tuyến khai báo (Declarative Routing) của React Router 6. Tìm hiểu thuật toán chọn lọc Route tối ưu nhất (Best-Match Algorithm).
          </p>
        </div>

        <div className="grid-3">
          {/* Item 1 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="badge badge-cyan">1. &lt;BrowserRouter&gt;</span>
            <h4 style={{ margin: '0.6rem 0' }}>Trạm phát sóng tín hiệu</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Đặt ở cấp cao nhất của cây ứng dụng. Lắng nghe sự kiện <code>popstate</code> của trình duyệt và cung cấp Routing Context cho toàn bộ ứng dụng.
            </p>
          </div>

          {/* Item 2 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="badge badge-indigo">2. &lt;Routes&gt;</span>
            <h4 style={{ margin: '0.6rem 0' }}>Bảng điều phối thông minh</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Trong React Router v6, <code>&lt;Routes&gt;</code> chấm điểm độ cụ thể (Specificity Score) của mọi Route để chọn ra Route khớp nhất, không còn phụ thuộc thứ tự viết trên-dưới.
            </p>
          </div>

          {/* Item 3 */}
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="badge badge-emerald">3. &lt;Route&gt;</span>
            <h4 style={{ margin: '0.6rem 0' }}>Quy tắc ánh xạ đơn lẻ</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Cặp bài trùng <code>path="..."</code> (điều kiện URL) và <code>element=&#123;&lt;Comp /&gt;&#125;</code> (giao diện cần dựng).
            </p>
          </div>
        </div>

        {/* Interactive Matching Simulator */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          border: '1px solid rgba(56, 189, 248, 0.25)',
        }}>
          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#38bdf8' }}>
            🎮 Trình Mô Phỏng Thuật Toán Khớp Route (Route Matcher Simulator)
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Nhập một URL bất kỳ để quan sát <code>&lt;Routes&gt;</code> chấm điểm và kích hoạt thẻ <code>&lt;Route&gt;</code> nào:
          </p>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <input
              type="text"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              placeholder="Nhập thử URL (ví dụ: /products/45, /admin, /test)..."
              style={{
                flex: 1,
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#070b14',
                color: '#fff',
                fontFamily: 'JetBrains Mono',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: '0.5rem' }}>
            {MOCK_ROUTES.map((route, idx) => {
              const isSelected = matched.path === route.path;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.05)',
                    background: isSelected ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255,255,255,0.02)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1rem' }}>{isSelected ? '🎯' : '⚪'}</span>
                    <code style={{ color: isSelected ? '#38bdf8' : '#cbd5e1', fontWeight: 'bold' }}>
                      path="{route.path}"
                    </code>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>({route.label})</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: isSelected ? '#34d399' : '#64748b', fontSize: '0.82rem', fontFamily: 'JetBrains Mono' }}>
                      element={route.component}
                    </span>
                    {isSelected && <span className="badge badge-emerald">MATCHED!</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
