import { Link, useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🧭 3 Trụ Cột Điều Hướng Trong React Router (SPA Navigation)</h2>
          <p className="lab-desc">
            Trong Single Page Application (SPA), điều hướng nghĩa là thay đổi URL trên thanh địa chỉ và hoán đổi Component hiển thị mà <strong>tuyệt đối không tải lại toàn bộ trang web (No Full Page Reload)</strong>.
          </p>
        </div>

        <div className="grid-3">
          {/* Pillar 1: <Link> */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span className="badge badge-cyan">1. &lt;Link&gt;</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Ý Định Của Người Dùng</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', flex: 1 }}>
              Dùng cho các liên kết nội bộ thông thường khi người dùng chủ động click để chuyển trang (thẻ sản phẩm, xem thêm, footer).
            </p>

            <div className="code-box" style={{ fontSize: '0.78rem' }}>
              <code>&lt;Link to="/products/15"&gt;Xem chi tiết&lt;/Link&gt;</code>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <Link to="/store" className="btn btn-outline" style={{ width: '100%', borderColor: '#38bdf8' }}>
                🛒 Thử nghiệm thẻ &lt;Link&gt; trong Store
              </Link>
            </div>
          </div>

          {/* Pillar 2: <NavLink> */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.04)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span className="badge badge-indigo">2. &lt;NavLink&gt;</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Nhận Biết Trạng Thái Active</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', flex: 1 }}>
              Giống &lt;Link&gt; nhưng cung cấp thêm hàm callback <code>isActive</code> để tự động đổi màu, đổi class cho Navbar, Sidebar, Tab Menu.
            </p>

            <div className="code-box" style={{ fontSize: '0.78rem' }}>
              <code>{`<NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>`}</code>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <Link to="/navlink-lab" className="btn btn-indigo" style={{ width: '100%' }}>
                🎨 Thử nghiệm Lab &lt;NavLink&gt;
              </Link>
            </div>
          </div>

          {/* Pillar 3: useNavigate */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <span className="badge badge-emerald">3. useNavigate()</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Kết Quả Của Xử Lý Logic</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', flex: 1 }}>
              Điều hướng bằng mã code: Gọi sau khi gọi API Login thành công, submit form, hoàn thành thanh toán hoặc hết giờ đếm ngược.
            </p>

            <div className="code-box" style={{ fontSize: '0.78rem' }}>
              <code>navigate('/dashboard', &#123; replace: true &#125;)</code>
            </div>

            <div style={{ marginTop: '0.75rem' }}>
              <button
                className="btn btn-primary"
                style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                onClick={() => navigate('/navigate-lab')}
              >
                ⚡ Thử nghiệm Lab useNavigate()
              </button>
            </div>
          </div>
        </div>

        {/* Java / Spring Boot Analogy Box */}
        <div className="code-box" style={{ marginTop: '2rem' }}>
          <strong style={{ color: '#38bdf8' }}>🌱 Tư Duy Đối Chiếu Backend (Dành cho Java / Spring Boot Developers):</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`// 1. Thẻ <a> truyền thống trong HTML:
// Giống như browser gửi HTTP GET mới -> Tomcat nhận request -> Trả full HTML -> Trang web chớp trắng reload!

// 2. <Link> & <NavLink> trong React Router:
// Can thiệp event.preventDefault() -> Gọi window.history.pushState() -> React hoán đổi Virtual DOM node.
// Không hề có request tải lại document!

// 3. useNavigate() trong React Router:
// Tương đương với việc Spring Boot Controller trả về:
// return "redirect:/dashboard"; 
// Hoặc HttpServletResponse.sendRedirect("/login");
// Nhưng toàn bộ quá trình xảy ra ngay tại Client, mượt mà và tức thì 100%!`}
          </pre>
        </div>

        <div className="alert-box alert-info">
          <span>💡</span>
          <div>
            <strong>Quy tắc ghi nhớ nhanh:</strong>
            <br />
            • Người dùng muốn <strong>ĐI ĐÂU</strong> $\rightarrow$ Dùng <code>&lt;Link&gt;</code>.
            <br />
            • Menu cần biết <strong>TAO CÓ ĐANG Ở ĐÂY KHÔNG</strong> $\rightarrow$ Dùng <code>&lt;NavLink&gt;</code>.
            <br />
            • Code xử lý xong rồi <strong>CHUYỂN USER ĐI TIẾP</strong> $\rightarrow$ Dùng <code>useNavigate()</code>.
          </div>
        </div>
      </div>
    </div>
  );
}
