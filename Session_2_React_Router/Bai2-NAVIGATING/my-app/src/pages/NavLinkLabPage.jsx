import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavLinkLabPage() {
  const location = useLocation();
  const [useEndProp, setUseEndProp] = useState(true);
  const [selectedSubTab, setSelectedSubTab] = useState('info');

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🎨 NavLink Mastery: Cơ Chế isActive, end & 3 Kiểu Callback</h2>
          <p className="lab-desc">
            Khám phá sức mạnh đặc biệt của <code>&lt;NavLink&gt;</code> so với <code>&lt;Link&gt;</code> thông thường. Thử nghiệm trực quan cách React Router cung cấp thông tin <code>isActive</code>.
          </p>
        </div>

        {/* Experiment 1: The 'end' Prop */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-amber">Thí nghiệm 1</span>
              <h3 style={{ margin: '0.4rem 0', fontSize: '1.1rem' }}>Cạm bẫy Prefix Matching & Thuộc tính <code>end</code></h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Theo mặc định, nếu URL là <code>/navlink-lab/detail</code> thì link <code>/navlink-lab</code> vẫn bị tính là Active (vì tiền tố match). Dùng <code>end</code> để chặn việc match sâu này!
              </p>
            </div>

            <button
              className={`btn ${useEndProp ? 'btn-primary' : 'btn-danger'}`}
              onClick={() => setUseEndProp(!useEndProp)}
            >
              {useEndProp ? '✅ Đang BẬT prop "end"' : '❌ Đang TẮT prop "end"'}
            </button>
          </div>

          {/* Sub Navigation Bar inside Lab */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            margin: '1.25rem 0',
            padding: '0.75rem',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Thử click các link con:</span>
            <button
              className={`btn ${selectedSubTab === 'info' ? 'btn-indigo' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
              onClick={() => setSelectedSubTab('info')}
            >
              📄 Tab Thông Tin (/info)
            </button>
            <button
              className={`btn ${selectedSubTab === 'analytics' ? 'btn-indigo' : 'btn-outline'}`}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.82rem' }}
              onClick={() => setSelectedSubTab('analytics')}
            >
              📊 Tab Phân Tích (/analytics)
            </button>
          </div>

          <div className="code-box" style={{ fontSize: '0.82rem' }}>
            <div>Đường dẫn hiện tại: <span style={{ color: '#38bdf8' }}>{location.pathname}</span></div>
            <div style={{ marginTop: '0.4rem' }}>
              Cấu hình: <code>&lt;NavLink to="/navlink-lab" {useEndProp ? 'end' : ''}&gt;</code>
            </div>
            <div style={{ marginTop: '0.4rem', color: useEndProp ? '#34d399' : '#fbbf24' }}>
              Trạng thái Active: {useEndProp ? '✅ Chỉ Active khi URL kết thúc chính xác tại to' : '⚠️ Match cả các URL con sâu hơn'}
            </div>
          </div>
        </div>

        {/* Experiment 2: 3 Callback Types */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '1.5rem',
        }}>
          <span className="badge badge-cyan">Thí nghiệm 2</span>
          <h3 style={{ margin: '0.5rem 0 1rem', fontSize: '1.1rem' }}>3 Cách Nhận Trạng Thái ({`{ isActive }`}) Trong NavLink</h3>

          <div className="grid-3">
            {/* 1. className Callback */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>1. className Callback</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                Hàm nhận <code>({`{ isActive }`})</code> và trả về một <strong>chuỗi String</strong> class:
              </p>
              <div className="code-box" style={{ fontSize: '0.75rem' }}>
{`className={({ isActive }) =>
  isActive ? "active" : ""
}`}
              </div>
            </div>

            {/* 2. style Callback */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#818cf8', fontSize: '0.95rem', marginBottom: '0.5rem' }}>2. style Callback</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                Hàm nhận <code>({`{ isActive }`})</code> và trả về một <strong>Style Object</strong>:
              </p>
              <div className="code-box" style={{ fontSize: '0.75rem' }}>
{`style={({ isActive }) => ({
  color: isActive ? "#38bdf8" : "#fff",
  fontWeight: isActive ? 700 : 400
})}`}
              </div>
            </div>

            {/* 3. children Callback */}
            <div style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '8px' }}>
              <h4 style={{ color: '#34d399', fontSize: '0.95rem', marginBottom: '0.5rem' }}>3. children Callback</h4>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem' }}>
                Hàm nhận <code>({`{ isActive }`})</code> và trả về <strong>JSX động</strong> (ví dụ chèn icon/mũi tên):
              </p>
              <div className="code-box" style={{ fontSize: '0.75rem' }}>
{`{({ isActive }) => (
  <span>
    {isActive ? "👉 " : ""}Tab
  </span>
)}`}
              </div>
            </div>
          </div>
        </div>

        <div className="alert-box alert-success" style={{ marginTop: '1.5rem' }}>
          <span>🎯</span>
          <div>
            <strong>Lời khuyên kiến trúc:</strong> Dùng <code>&lt;NavLink&gt;</code> cho Header Navbar, Sidebar Dashboard, Tabs phân hệ. Đừng lạm dụng <code>&lt;NavLink&gt;</code> cho các liên kết nằm trong bài viết, thẻ sản phẩm, hay footer — ở những nơi đó <code>&lt;Link&gt;</code> là lựa chọn tối ưu và nhẹ nhàng hơn!
          </div>
        </div>
      </div>
    </div>
  );
}
