import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UseNavigateLabPage() {
  const navigate = useNavigate();

  // Scenario 1: Async Auth Flow
  const [email, setEmail] = useState('react_pro@gmail.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);
  const [useReplace, setUseReplace] = useState(true);

  // Scenario 2: Auto Redirect Countdown
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      navigate('/store');
      return;
    }
    const timer = setTimeout(() => {
      setCountdown((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  const handleSimulateLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập gọi API Backend Spring Boot POST /api/auth/login
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    // Programmatic Navigation: Điều hướng sau khi logic hoàn thành
    navigate('/dashboard', {
      replace: useReplace,
      state: { user: email, loggedAt: new Date().toLocaleTimeString() },
    });
  };

  const startAutoRedirect = () => {
    setCountdown(5);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">⚡ useNavigate() Lab: Điều Hướng Bằng Mã Code (Programmatic Navigation)</h2>
          <p className="lab-desc">
            Khác với Link/NavLink người dùng click để đi, <code>useNavigate()</code> được gọi khi <strong>kết quả của một logic code</strong> quyết định chuyển trang (Login thành công, hết phiên đăng nhập, hoàn tất thanh toán).
          </p>
        </div>

        <div className="grid-2">
          {/* Scenario 1: Async Login */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-cyan">Kịch bản 1</span>
            <h3 style={{ margin: '0.4rem 0', fontSize: '1.1rem' }}>Đăng Nhập Thành Công $\rightarrow$ Điều Hướng Dashboard</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Sau khi nhận phản hồi 200 OK từ Backend, code tự động gọi <code>navigate('/dashboard')</code>.
            </p>

            <form onSubmit={handleSimulateLogin}>
              <div style={{ marginBottom: '0.75rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: '#070b14',
                    color: '#fff',
                    marginTop: '0.2rem',
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>Mật khẩu:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: '#070b14',
                    color: '#fff',
                    marginTop: '0.2rem',
                  }}
                  required
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <input
                  type="checkbox"
                  id="replaceCheck"
                  checked={useReplace}
                  onChange={(e) => setUseReplace(e.target.checked)}
                />
                <label htmlFor="replaceCheck" style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                  Dùng <code>{'{ replace: true }'}</code> (Ngăn người dùng bấm Back quay lại trang Login)
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%' }}
                disabled={isLoading}
              >
                {isLoading ? '⏳ Đang xác thực với Spring Boot...' : '🚀 Đăng Nhập & Chuyển Trang'}
              </button>
            </form>
          </div>

          {/* Scenario 2: Timer & History */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.04)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-emerald">Kịch bản 2 & 3</span>
            <h3 style={{ margin: '0.4rem 0', fontSize: '1.1rem' }}>Đếm Ngược Tự Động & Lịch Sử Duyệt Web</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Điều hướng do Timer (Timeout) hoặc thao tác trên History Stack của trình duyệt.
            </p>

            <div style={{
              padding: '1rem',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Trạng thái Timer chuyển về /store:</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: countdown ? '#10b981' : '#64748b', margin: '0.5rem 0' }}>
                {countdown !== null ? `${countdown}s` : 'Chưa kích hoạt'}
              </div>
              <button
                className="btn btn-outline"
                style={{ borderColor: '#10b981' }}
                onClick={startAutoRedirect}
                disabled={countdown !== null}
              >
                ⏱️ Kích hoạt hẹn giờ chuyển trang (5s)
              </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                Thao tác History Stack:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                  ⬅️ navigate(-1) (Back)
                </button>
                <button className="btn btn-outline" onClick={() => navigate(1)}>
                  navigate(1) (Next) ➡️
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Code mẫu useNavigate() chuẩn mực trong dự án:</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  // 1. Chuyển trang bình thường (đẩy vào History Stack):
  navigate('/products');

  // 2. Chuyển trang kèm ghi đè history (Dành cho Login/Logout, user bấm Back không quay lại được):
  navigate('/dashboard', { replace: true });

  // 3. Truyền kèm dữ liệu phụ trợ qua State:
  navigate('/checkout', { state: { orderId: 'ORD-999', total: 500000 } });

  // 4. Quay lại trang trước trong lịch sử:
  navigate(-1);
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
