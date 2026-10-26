import { useState } from 'react';

export default function CsrVsSsrRoutingPage() {
  const [ssrLoading, setSsrLoading] = useState(false);
  const [ssrPage, setSsrPage] = useState('Home');

  const [csrPage, setCsrPage] = useState('Home');

  const handleSimulateSsr = (pageName) => {
    setSsrLoading(true);
    setTimeout(() => {
      setSsrPage(pageName);
      setSsrLoading(false);
    }, 1200);
  };

  const handleSimulateCsr = (pageName) => {
    // Client-side: Tức thì không cần tải lại document
    setCsrPage(pageName);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">⚡ So Sánh Trực Quan: Client-Side Routing (CSR) vs Server-Side Routing (SSR)</h2>
          <p className="lab-desc">
            Quan sát sự khác biệt sống còn giữa cách làm web truyền thống (MPA) và ứng dụng trang đơn hiện đại (SPA với React Router).
          </p>
        </div>

        <div className="grid-2">
          {/* Simulator 1: SSR */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.04)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-rose">1. Server-Side Routing (Web Truyền Thống)</span>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.75rem 0' }}>
              Mỗi cú click gửi một HTTP Request mới lên Server. Trình duyệt tải lại từ đầu (chớp trắng) toàn bộ file HTML, CSS và JavaScript.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {['Home', 'Products', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="btn btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  onClick={() => handleSimulateSsr(item)}
                  disabled={ssrLoading}
                >
                  🔗 Đến /{item.toLowerCase()}
                </button>
              ))}
            </div>

            {/* Simulated Browser Viewport */}
            <div style={{
              height: '180px',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: ssrLoading ? '#ffffff' : '#070b14',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              color: ssrLoading ? '#000' : '#fff',
            }}>
              {ssrLoading ? (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>⚪</div>
                  <strong>Đang tải lại toàn bộ trang (Full Page Reload)...</strong>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>Browser gửi GET request tới Web Server</div>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f87171' }}>
                    Trang: {ssrPage} (Server Rendered)
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    Toàn bộ cây DOM đã bị phá hủy và xây dựng lại từ đầu.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Simulator 2: CSR */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-cyan">2. Client-Side Routing (React Router SPA)</span>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.75rem 0' }}>
              HTML chỉ tải một lần. JavaScript lắng nghe thay đổi URL trên thanh địa chỉ và lập tức đổi component trên màn hình siêu mượt mà.
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              {['Home', 'Products', 'Contact'].map((item) => (
                <button
                  key={item}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                  onClick={() => handleSimulateCsr(item)}
                >
                  ⚡ Đến /{item.toLowerCase()}
                </button>
              ))}
            </div>

            {/* Simulated Browser Viewport */}
            <div style={{
              height: '180px',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              background: '#070b14',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#38bdf8' }}>
                Component: &lt;{csrPage}Page /&gt;
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                ✅ Chuyển đổi tức thời 0ms • Không chớp trắng • Bảo toàn State trong RAM
              </p>
            </div>
          </div>
        </div>

        <div className="alert-box alert-info" style={{ marginTop: '1.5rem' }}>
          <span>💡</span>
          <div>
            <strong>Lợi ích tối thượng của Client-Side Routing:</strong>
            <br />
            1. <strong>Tốc độ phản hồi cực nhanh:</strong> Người dùng có cảm giác ứng dụng mượt mà như một phần mềm Desktop hay Mobile App.
            <br />
            2. <strong>Giảm tải cho Backend:</strong> Server Spring Boot / Node.js không cần phải render file HTML cho từng trang, chỉ cần trả về dữ liệu thô (JSON API) khi cần thiết.
          </div>
        </div>
      </div>
    </div>
  );
}
