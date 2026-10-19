import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function CompositionVsContextLab() {
  const [approach, setApproach] = useState('composition'); // 'drilling' | 'composition' | 'context'
  const [userName, setUserName] = useState('Emma Watson');
  const [userRole, setUserRole] = useState('Lead Architect');

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">
          <span>🧩</span> Bài Lab 6: Component Composition vs Context API
        </h2>
        <p className="lab-card-desc">
          Lời khuyên hàng đầu từ React Core Team: "Trước khi vội vàng tạo Context, hãy thử truyền JSX dưới dạng <code>children</code>!"
          Khám phá sức mạnh của Component Composition và khi nào nên dùng công cụ nào.
        </p>
      </div>

      {/* Approach Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${approach === 'composition' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setApproach('composition')}
        >
          ✨ Cách 1: Component Composition (Truyền JSX qua children / slot)
        </button>
        <button
          className={`btn ${approach === 'drilling' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setApproach('drilling')}
        >
          ❌ Cách 2: Prop Drilling (Đào giếng thủ công)
        </button>
        <button
          className={`btn ${approach === 'context' ? 'btn-purple' : 'btn-secondary'}`}
          onClick={() => setApproach('context')}
        >
          🌌 Cách 3: Context API (Dữ liệu toàn cục)
        </button>
      </div>

      {/* Info Notice */}
      {approach === 'composition' && (
        <InfoBox type="tip" title="Sức Mạnh Của Component Composition (children):">
          Thay vì bắt <code>PageLayout</code> và <code>HeaderBar</code> phải nhận prop <code>user</code> rồi chuyển tiếp cho <code>AvatarBadge</code>,
          ta khởi tạo trực tiếp <code>&lt;AvatarBadge user={'{user}'} /&gt;</code> tại component Cha rồi truyền nó như một prop (slot) vào <code>PageLayout</code>!
          Các component trung gian chỉ hiển thị <code>{'{children}'}</code> hoặc <code>{'{headerSlot}'}</code> mà không cần biết dữ liệu bên trong là gì.
        </InfoBox>
      )}

      {approach === 'drilling' && (
        <InfoBox type="danger" title="Hạn Chế Của Prop Drilling:">
          Mỗi khi <code>AvatarBadge</code> cần thêm một prop như <code>userRole</code> hay <code>isOnline</code>,
          bạn phải sửa cả chữ ký của <code>PageLayout</code> và <code>HeaderBar</code>. Tính đóng gói bị phá vỡ hoàn toàn!
        </InfoBox>
      )}

      {approach === 'context' && (
        <InfoBox type="info" title="Khi Nào Context Mới Là Lựa Chọn Đúng?">
          Composition chỉ tiện khi dữ liệu phục vụ cho 1 vài component cụ thể.
          Nếu dữ liệu đó được dùng bởi <strong>rất nhiều component nằm rải rác</strong> ở nhiều nhánh cây khác nhau (như Theme giao diện, Đa ngôn ngữ I18n, Token xác thực),
          việc dùng slot composition sẽ biến code thành mạng nhện. Lúc đó Context API là chân ái!
        </InfoBox>
      )}

      {/* Live Demonstration */}
      <div style={{
        background: '#090d16',
        borderRadius: '12px',
        border: '1px solid #1e293b',
        padding: '1.5rem',
        marginTop: '1.5rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>
            Ứng Dụng Minh Họa: Quản Lý Khung Giao Diện (Layout System)
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Tên:</span>
            <input
              type="text"
              className="input-control"
              style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Chức danh:</span>
            <input
              type="text"
              className="input-control"
              style={{ width: '130px', padding: '0.35rem 0.6rem', fontSize: '0.85rem' }}
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic code & live result based on approach */}
        {approach === 'composition' && (
          <CompositionDemo userName={userName} userRole={userRole} />
        )}
        {approach === 'drilling' && (
          <DrillingDemo userName={userName} userRole={userRole} />
        )}
        {approach === 'context' && (
          <ContextDemo userName={userName} userRole={userRole} />
        )}
      </div>

      {/* Comparison Matrix Table */}
      <div style={{ marginTop: '2rem', overflowX: 'auto' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
          📊 Bảng So Sánh Chiến Lược Chia Sẻ State Trong React
        </h3>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.88rem',
          textAlign: 'left',
          background: 'var(--bg-card)',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
        }}>
          <thead>
            <tr style={{ background: '#1e293b', color: 'var(--text-main)' }}>
              <th style={{ padding: '0.75rem 1rem' }}>Tiêu Chí So Sánh</th>
              <th style={{ padding: '0.75rem 1rem' }}>Component Composition (JSX slots)</th>
              <th style={{ padding: '0.75rem 1rem' }}>React Context API</th>
              <th style={{ padding: '0.75rem 1rem' }}>Redux / Zustand Store</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Mức độ phức tạp setup</td>
              <td style={{ padding: '0.75rem 1rem', color: '#34d399' }}>Rất thấp (Chỉ dùng children/props)</td>
              <td style={{ padding: '0.75rem 1rem', color: '#38bdf8' }}>Trung bình (createContext + Provider)</td>
              <td style={{ padding: '0.75rem 1rem', color: '#fbbf24' }}>Cao (Cần cài thư viện ngoài & store)</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Trường hợp sử dụng lý tưởng</td>
              <td style={{ padding: '0.75rem 1rem' }}>Layout, Modal, Card lồng ghép 2-4 tầng</td>
              <td style={{ padding: '0.75rem 1rem' }}>Theme, User Session, I18n, Route state</td>
              <td style={{ padding: '0.75rem 1rem' }}>Dữ liệu phức tạp, caching, async thunk lớn</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Tác động re-render</td>
              <td style={{ padding: '0.75rem 1rem', color: '#34d399' }}>Tuyệt vời (Không re-render trung gian)</td>
              <td style={{ padding: '0.75rem 1rem', color: '#fbbf24' }}>Dễ bị re-render nếu không tách context</td>
              <td style={{ padding: '0.75rem 1rem', color: '#34d399' }}>Tuyệt vời (Selector hook kiểm soát)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DEMO 1: COMPONENT COMPOSITION VIA CHILDREN
// ----------------------------------------------------
function CompositionDemo({ userName, userRole }) {
  return (
    <div>
      <div style={{
        background: '#0a192f',
        border: '1px solid #06b6d4',
        borderRadius: '8px',
        padding: '1.25rem',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <strong style={{ color: '#38bdf8' }}>🖼️ PageLayout (Nhận headerSlot & mainSlot)</strong>
          <span className="badge badge-cyan">0 Prop Drilling • Khớp Nối Ghép Hình</span>
        </div>

        {/* PageLayout displays slots without knowing what props they contain! */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#031024', padding: '0.75rem 1rem', borderRadius: '6px' }}>
          <span>Logo Doanh Nghiệp</span>
          {/* Slot Header injected here */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>👩‍🔬</span>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.9rem' }}>{userName}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{userRole}</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '0.75rem', padding: '1rem', background: '#041731', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Khu vực nội dung chính của trang (Main Content Slot).
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <pre style={{ margin: 0, fontSize: '0.8rem', color: '#93c5fd', background: '#030c1b', padding: '0.85rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
{`<PageLayout
  header={<AvatarBadge name="${userName}" role="${userRole}" />}
>
  <MainDashboardContent />
</PageLayout>`}
        </pre>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DEMO 2: PROP DRILLING
// ----------------------------------------------------
function DrillingDemo({ userName, userRole }) {
  return (
    <div style={{ background: '#1c1117', border: '1px dashed #f43f5e', borderRadius: '8px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong style={{ color: '#f43f5e' }}>⛏️ Prop Drilling Pipeline</strong>
        <span className="badge badge-rose">Gánh Nặng Truyền Tham Số</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#fda4af' }}>
        <code>PageLayout(props)</code> phải nhận <code>userName, userRole</code> rồi chuyển tiếp cho <code>HeaderBar(props)</code>,
        sau đó <code>HeaderBar</code> lại chuyển tiếp cho <code>AvatarBadge(props)</code>!
      </p>
      <pre style={{ margin: 0, fontSize: '0.8rem', color: '#fda4af', background: '#13090e', padding: '0.85rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
{`<PageLayout userName="${userName}" userRole="${userRole}">
  {/* PageLayout phải pass xuống HeaderBar */}
  <HeaderBar userName="${userName}" userRole="${userRole}">
    {/* HeaderBar phải pass xuống AvatarBadge */}
    <AvatarBadge userName="${userName}" userRole="${userRole}" />
  </HeaderBar>
</PageLayout>`}
      </pre>
    </div>
  );
}

// ----------------------------------------------------
// DEMO 3: CONTEXT API
// ----------------------------------------------------
function ContextDemo({ userName, userRole }) {
  return (
    <div style={{ background: '#1a102f', border: '1px solid #a855f7', borderRadius: '8px', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <strong style={{ color: '#c084fc' }}>🌌 Context API Solution</strong>
        <span className="badge badge-purple">Truyền Xuyên Cây Cho Mọi Cấp</span>
      </div>
      <p style={{ fontSize: '0.85rem', color: '#e9d5ff' }}>
        Thích hợp nhất khi thông tin người dùng <code>{userName} ({userRole})</code> được tiêu thụ đồng thời ở:
        Thanh Header, Thanh Sidebar, Widget Bình luận, và Hộp thoại Cài đặt.
      </p>
      <pre style={{ margin: 0, fontSize: '0.8rem', color: '#e9d5ff', background: '#120b22', padding: '0.85rem', borderRadius: '6px', fontFamily: 'var(--font-mono)' }}>
{`<UserContext.Provider value={{ name: "${userName}", role: "${userRole}" }}>
  <Sidebar />       {/* Đọc useContext(UserContext) */}
  <HeaderBar />     {/* Đọc useContext(UserContext) */}
  <DashboardBody /> {/* Đọc useContext(UserContext) */}
</UserContext.Provider>`}
      </pre>
    </div>
  );
}
