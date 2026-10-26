import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

export default function AdminLayoutPage() {
  const location = useLocation();
  // State nằm tại Layout cha để chứng minh: Khi đổi route con, State của Layout cha KHÔNG hề bị mất!
  const [layoutCounter, setLayoutCounter] = useState(0);

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="lab-title">🏛️ Kiến Trúc Nested Routes & Khung Lồng Nhau &lt;Outlet /&gt;</h2>
              <p className="lab-desc">
                Layout cha chứa Sidebar và Header cố định. Khi chuyển giữa các trang con (Dashboard, Users, Settings), chỉ phần bên trong thẻ <strong>&lt;Outlet /&gt;</strong> được thay thế!
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>State Layout Cha:</span>
              <button className="btn btn-outline" onClick={() => setLayoutCounter((c) => c + 1)}>
                ➕ Tăng bộ nhớ cha ({layoutCounter})
              </button>
            </div>
          </div>
        </div>

        <div className="admin-layout-container">
          {/* Persistent Sidebar */}
          <aside className="admin-sidebar">
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              Admin Panel
            </div>

            {/* Note: Sử dụng đường dẫn tương đối (relative paths) */}
            <NavLink
              to="/admin"
              end
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              📊 Tổng Quan (index)
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              👥 Quản Lý Người Dùng
            </NavLink>

            <NavLink
              to="/admin/settings"
              className={({ isActive }) => `nav-item-link ${isActive ? 'active' : ''}`}
            >
              ⚙️ Cài Đặt Hệ Thống
            </NavLink>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.75rem', color: '#64748b' }}>
              Active URL: {location.pathname}
            </div>
          </aside>

          {/* Child Outlet Area */}
          <main className="admin-content-area">
            {/* THẺ OUTLET QUAN TRỌNG: Nơi các component con được render */}
            <Outlet />
          </main>
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Cấu hình Nested Route trong React Router:</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`<Route path="/admin" element={<AdminLayoutPage />}>
  {/* index route render khi URL là chính xác /admin */}
  <Route index element={<AdminDashboard />} />

  {/* Đường dẫn tương đối: "users" tương đương "/admin/users" */}
  <Route path="users" element={<AdminUsers />} />
  <Route path="settings" element={<AdminSettings />} />
</Route>`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// Child Component 1: Index Route
export function AdminDashboard() {
  return (
    <div>
      <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>INDEX ROUTE: /admin</span>
      <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
        📊 Báo Cáo Tổng Quan Hệ Thống
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6' }}>
        Đây là trang mặc định (Index Route) được render bên trong thẻ <code>&lt;Outlet /&gt;</code> khi URL người dùng khớp chính xác với đường dẫn của Route cha (<code>/admin</code>).
      </p>

      <div className="grid-2" style={{ marginTop: '1rem' }}>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Máy chủ CPU</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#10b981' }}>18% (Bình thường)</div>
        </div>
        <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Bộ nhớ RAM</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#38bdf8' }}>4.2 GB / 16 GB</div>
        </div>
      </div>
    </div>
  );
}

// Child Component 2: /admin/users
export function AdminUsers() {
  const users = [
    { id: 1, name: 'Nguyễn Văn Tung', role: 'Super Admin', email: 'thanhtung@gmail.com' },
    { id: 2, name: 'Lê Hoàng Minh', role: 'Editor', email: 'minh.le@gmail.com' },
    { id: 3, name: 'Trần Thị Mai', role: 'Viewer', email: 'mai.tran@gmail.com' },
  ];

  return (
    <div>
      <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>CHILD ROUTE: /admin/users</span>
      <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
        👥 Danh Sách Người Dùng Hệ Thống
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Được render tại <code>&lt;Outlet /&gt;</code> khi URL chuyển sang <code>/admin/users</code>. Sidebar bên trái vẫn giữ nguyên không hề bị load lại.
      </p>

      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {users.map((u) => (
          <div
            key={u.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              background: 'rgba(0,0,0,0.25)',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div>
              <div style={{ fontWeight: '700', color: '#f8fafc' }}>{u.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{u.email}</div>
            </div>
            <span className="badge badge-cyan">{u.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Child Component 3: /admin/settings
export function AdminSettings() {
  return (
    <div>
      <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>CHILD ROUTE: /admin/settings</span>
      <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '0.75rem' }}>
        ⚙️ Cấu Hình Hệ Thống & Bảo Mật
      </h3>
      <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '1rem' }}>
        Trang cài đặt các thông số kỹ thuật, webhook và cấu hình cổng API Spring Boot.
      </p>

      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
          <input type="checkbox" defaultChecked />
          Bật chế độ Strict Routing và xác thực JWT Bearer
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
          <input type="checkbox" defaultChecked />
          Tự động ghi log lịch sử điều hướng Navigation Events
        </label>
      </div>
    </div>
  );
}
