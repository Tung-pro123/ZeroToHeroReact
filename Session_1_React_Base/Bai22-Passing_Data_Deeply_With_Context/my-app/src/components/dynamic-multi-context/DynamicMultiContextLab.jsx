import { useState, createContext, useContext } from 'react';
import InfoBox from '../common/InfoBox';

// 1. Tạo ThemeContext
const ThemeContext = createContext({
  theme: 'cyberpunk',
  toggleTheme: () => {},
});

// 2. Tạo AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function DynamicMultiContextLab() {
  const [theme, setTheme] = useState('cyberpunk'); // 'dark' | 'cyberpunk' | 'light'
  const [user, setUser] = useState({
    id: 'u-101',
    name: 'Sarah Connor',
    role: 'Admin',
    email: 'sarah.connor@sky.net',
    avatar: '👩‍💻',
    permissions: ['manage_users', 'edit_database', 'deploy_code', 'view_metrics'],
  });

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const loginAs = (role) => {
    if (role === 'Guest') {
      setUser(null);
      return;
    }

    const roleData = {
      Admin: {
        id: 'u-101',
        name: 'Sarah Connor',
        role: 'Admin',
        email: 'sarah.connor@sky.net',
        avatar: '👩‍💻',
        permissions: ['manage_users', 'edit_database', 'deploy_code', 'view_metrics'],
      },
      Editor: {
        id: 'u-102',
        name: 'John Wick',
        role: 'Editor',
        email: 'john.wick@continental.com',
        avatar: '✍️',
        permissions: ['edit_database', 'view_metrics'],
      },
      Viewer: {
        id: 'u-103',
        name: 'Peter Parker',
        role: 'Viewer',
        email: 'peter@dailybugle.com',
        avatar: '🕸️',
        permissions: ['view_metrics'],
      },
    };

    setUser(roleData[role]);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🔐</span> Bài Lab 3: Multi-Context Quản Lý State Động (Theme & Auth)
        </h2>
        <p className="lab-card-desc">
          Trong thực tế, ta không bao giờ gom tất cả state vào một "God Context". Thay vào đó, ta phân tách thành
          nhiều Context chuyên biệt (<code>ThemeContext</code>, <code>AuthContext</code>) để các component tự do đăng ký nhận đúng luồng dữ liệu cần thiết.
        </p>
      </div>

      <InfoBox type="tip" title="Nguyên Tắc Đóng Gói Multi-Context:">
        Một component con có thể gọi nhiều hàm <code>useContext()</code> đồng thời:
        <code>const {'{ theme }'} = useContext(ThemeContext);</code> và <code>const {'{ user }'} = useContext(AuthContext);</code>.
        Khi chỉ có <code>theme</code> thay đổi, component nào chỉ lắng nghe <code>AuthContext</code> sẽ không bị re-render nếu được tối ưu!
      </InfoBox>

      {/* Lồng các Provider để cấp dữ liệu */}
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AuthContext.Provider value={{ user, loginAs, logout: () => setUser(null) }}>
          {/* Controls Bar */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            padding: '1.25rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            marginBottom: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                🎨 Chuyển Đổi Giao Diện (ThemeContext):
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className={`btn btn-sm ${theme === 'cyberpunk' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => toggleTheme('cyberpunk')}
                >
                  ⚡ Cyberpunk Neon
                </button>
                <button
                  className={`btn btn-sm ${theme === 'dark' ? 'btn-purple' : 'btn-secondary'}`}
                  onClick={() => toggleTheme('dark')}
                >
                  🌑 Dark Obsidian
                </button>
                <button
                  className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => toggleTheme('light')}
                >
                  ☀️ Light Slate
                </button>
              </div>
            </div>

            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                👤 Giả Lập Vai Trò (AuthContext):
              </span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['Admin', 'Editor', 'Viewer', 'Guest'].map((r) => (
                  <button
                    key={r}
                    className={`btn btn-sm ${user?.role === r || (!user && r === 'Guest') ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => loginAs(r)}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Subscribed Consumer Components */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
            <UserProfileCard />
            <PermissionsPanel />
          </div>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

// ----------------------------------------------------
// CONSUMER COMPONENT 1: Consumes both Theme & Auth
// ----------------------------------------------------
function UserProfileCard() {
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const themeStyles = {
    cyberpunk: {
      bg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(168, 85, 247, 0.1))',
      border: '1px solid #06b6d4',
      badgeColor: 'badge-cyan',
    },
    dark: {
      bg: '#0f172a',
      border: '1px solid #334155',
      badgeColor: 'badge-purple',
    },
    light: {
      bg: '#1e293b',
      border: '1px solid #64748b',
      badgeColor: 'badge-amber',
    },
  }[theme];

  return (
    <div style={{
      background: themeStyles.bg,
      border: themeStyles.border,
      borderRadius: '12px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>🪪 Thẻ Hồ Sơ Người Dùng</h3>
        <span className={`badge ${themeStyles.badgeColor}`}>Theme: {theme}</span>
      </div>

      {user ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{
              fontSize: '2.5rem',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              {user.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{user.name}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</div>
              <div style={{ marginTop: '0.25rem' }}>
                <span className="badge badge-emerald">Vai trò: {user.role}</span>
              </div>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={logout} style={{ width: '100%' }}>
            🚪 Đăng Xuất (Gán user = null trong AuthContext)
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔒</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Bạn đang ở chế độ khách vãng lai (Guest). Vui lòng chọn vai trò để đăng nhập!
          </p>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// CONSUMER COMPONENT 2: Consumes AuthContext to guard features
// ----------------------------------------------------
function PermissionsPanel() {
  const { user } = useContext(AuthContext);

  const allActions = [
    { key: 'view_metrics', label: 'Xem Báo Cáo Doanh Thu & Metrics', minRole: 'Viewer' },
    { key: 'edit_database', label: 'Chỉnh Sửa Dữ Liệu Sản Phẩm & Blog', minRole: 'Editor' },
    { key: 'manage_users', label: 'Quản Trị Phân Quyền & Cấp Tài Khoản', minRole: 'Admin' },
    { key: 'deploy_code', label: 'Deploy Production Lên AWS/Vercel', minRole: 'Admin' },
  ];

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.7)',
      border: '1px solid var(--border-color)',
      borderRadius: '12px',
      padding: '1.5rem',
    }}>
      <h3 style={{ fontSize: '1.1rem', margin: '0 0 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>🛡️</span> Bảng Kiểm Soát Quyền Hạn (RBAC via Context)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {allActions.map((action) => {
          const hasAccess = user && user.permissions.includes(action.key);

          return (
            <div
              key={action.key}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                background: hasAccess ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.05)',
                border: `1px solid ${hasAccess ? 'rgba(16, 185, 129, 0.25)' : 'rgba(244, 63, 94, 0.2)'}`,
              }}
            >
              <div style={{ fontSize: '0.85rem' }}>
                <span style={{ marginRight: '0.5rem' }}>{hasAccess ? '✅' : '⛔'}</span>
                <span style={{ color: hasAccess ? '#e2e8f0' : '#64748b' }}>{action.label}</span>
              </div>
              <span className={`badge ${hasAccess ? 'badge-emerald' : 'badge-rose'}`}>
                {hasAccess ? 'Được phép' : `Cần ${action.minRole}`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
