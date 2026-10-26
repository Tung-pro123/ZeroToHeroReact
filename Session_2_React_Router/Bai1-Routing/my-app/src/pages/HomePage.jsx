import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="home-page">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🌐 Khái Niệm Cốt Lõi: Định Tuyến Trong Ứng Dụng React (Routing)</h2>
          <p className="lab-desc">
            Routing trong ứng dụng web đơn giản là nguyên tắc ánh xạ: <strong>"URL nào $\rightarrow$ Hiển thị Component giao diện nào"</strong> mà không cần tải lại toàn bộ trang web.
          </p>
        </div>

        <div className="grid-3">
          {/* Card 1 */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-cyan">1. Bản Chất SPA</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Client-Side Routing</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Trình duyệt chỉ tải file HTML một lần duy nhất (`index.html`). Khi URL thay đổi, React Router dùng History API để hoán đổi Virtual DOM tức thời.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/csr-vs-ssr" className="btn btn-outline" style={{ width: '100%', borderColor: '#38bdf8' }}>
                ⚡ So Sánh CSR vs SSR
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.04)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-indigo">2. Bộ Ba Nguyên Tử</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Router, Routes & Route</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Cơ chế thiết lập bảng định tuyến khai báo (Declarative Routing Table). Bóc tách vai trò của từng thành phần trong luồng xử lý URL.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/core-trio" className="btn btn-indigo" style={{ width: '100%' }}>
                🧩 Khám Phá Bộ Ba
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-emerald">3. Kiến Trúc Phân Tầng</span>
            <h3 style={{ margin: '0.75rem 0 0.4rem', fontSize: '1.15rem' }}>Nested Routes & &lt;Outlet /&gt;</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.6' }}>
              Xây dựng giao diện phức tạp (Dashboard / Admin) có Header và Sidebar cố định, chỉ render lại vùng nội dung con ở vị trí thẻ `&lt;Outlet /&gt;`.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <Link to="/admin" className="btn btn-primary" style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                🏛️ Trải Nghiệm &lt;Outlet /&gt;
              </Link>
            </div>
          </div>
        </div>

        {/* Visual Mapping Table */}
        <div className="code-box" style={{ marginTop: '2rem' }}>
          <strong style={{ color: '#38bdf8' }}>Bảng Ánh Xạ URL Trong Dự Án Hiện Tại:</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`URL (path)                 COMPONENT ĐƯỢC HIỂN THỊ (element)
/                          <HomePage /> (Trang tổng quan)
/csr-vs-ssr                <CsrVsSsrRoutingPage /> (So sánh cơ chế Server vs Client)
/core-trio                 <CoreTrioPage /> (Giải phẫu Router, Routes, Route)
/admin                     <AdminLayout /> -> <AdminDashboard /> (Index Route)
/admin/users               <AdminLayout /> -> <AdminUsers /> (Nested Child Route)
/admin/settings            <AdminLayout /> -> <AdminSettings /> (Nested Child Route)
/courses/:courseId         <CourseDetailPage /> (Dynamic URL Parameter)
*                          <NotFoundPage /> (Trang 404 Wildcard Catch-All)`}
          </pre>
        </div>
      </div>
    </div>
  );
}
