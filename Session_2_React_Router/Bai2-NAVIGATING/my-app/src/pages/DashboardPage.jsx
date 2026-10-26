import { useLocation, useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const userEmail = location.state?.user || 'khach_hang_vip@gmail.com';
  const loggedAt = location.state?.loggedAt || 'Vừa đăng nhập';

  const handleLogout = () => {
    // Logout logic -> redirect về trang login với replace: true
    navigate('/navigate-lab', { replace: true });
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="lab-title">📊 Bảng Điều Khiển Quản Trị (User Dashboard)</h2>
              <p className="lab-desc">
                Minh họa kịch bản chuyển hướng sau xác thực đăng nhập (Auth Flow) thông qua <code>useNavigate</code>.
              </p>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              🚪 Đăng Xuất (useNavigate + replace)
            </button>
          </div>
        </div>

        <div style={{
          background: 'rgba(56, 189, 248, 0.05)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <div style={{ fontSize: '2.5rem' }}>👤</div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#f8fafc' }}>{userEmail}</div>
            <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>Thời điểm đăng nhập: {loggedAt}</div>
          </div>
        </div>

        <div className="grid-3">
          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '10px' }}>
            <span className="badge badge-cyan">Tổng Đơn Hàng</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8', margin: '0.5rem 0' }}>24</div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Đang giao: 2 đơn</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '10px' }}>
            <span className="badge badge-emerald">Doanh Thu Tích Lũy</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399', margin: '0.5rem 0' }}>142.500.000 ₫</div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Điểm thưởng: 1.425 pts</p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.25rem', borderRadius: '10px' }}>
            <span className="badge badge-purple">Cấp Bậc Khách Hàng</span>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: '#c084fc', margin: '0.5rem 0' }}>Platinum ⭐</div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ưu đãi giảm giá 15%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
