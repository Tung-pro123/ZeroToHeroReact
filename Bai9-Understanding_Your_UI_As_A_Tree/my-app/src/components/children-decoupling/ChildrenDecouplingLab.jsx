import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Component con minh họa
function Copyright({ year }) {
  return (
    <div style={{
      marginTop: '1rem',
      padding: '0.75rem',
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '8px',
      fontSize: '0.85rem',
      color: '#9ca3af',
      border: '1px dashed rgba(255, 255, 255, 0.2)',
      textAlign: 'center'
    }}>
      <span>© {year} ZeroToHeroReact. Được truyền qua prop <code>children</code></span>
    </div>
  );
}

// Container Component nhận children
function DecoupledContainer({ title, children }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div style={{
      background: 'rgba(30, 41, 59, 0.7)',
      border: '1px solid rgba(99, 102, 241, 0.4)',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ color: '#a5b4fc', fontSize: '1.1rem' }}>{title}</h4>
        <span className="badge badge-react">State clicks: {clickCount}</span>
      </div>

      <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginBottom: '1rem' }}>
        Container này có State nội bộ riêng. Hãy bấm nút tăng State để quan sát:
      </p>

      <button
        className="btn-primary"
        onClick={() => setClickCount((c) => c + 1)}
        style={{ fontSize: '0.85rem', padding: '0.4rem 0.9rem', marginBottom: '1rem' }}
      >
        Tăng State Container (+1) 🚀
      </button>

      {/* Vị trí render prop children */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.78rem', color: '#6b7280', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
          Slot chứa &#123;children&#125;:
        </div>
        {children}
      </div>
    </div>
  );
}

export default function ChildrenDecouplingLab() {
  const [selectedYear, setSelectedYear] = useState(2026);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🔀 Tính Năng Phân Tách Kiến Trúc (Decoupling) của Prop Children</h2>
          <p className="card-desc">
            Khám phá hiện tượng "lệch pha" thú vị giữa Render Tree và Module Dependency Tree khi truyền Component qua 
            prop <code>children</code>, tương tự mẫu thiết kế Dependency Injection trong Backend.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* Demo tương tác */}
        <div>
          <h3 className="compare-title"><span>🧪</span> Thử Nghiệm Render Trực Tiếp</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Container bên dưới hoàn toàn <strong>không import</strong> component <code>Copyright</code>. 
            Nó chỉ nhận JSX thông qua prop <code>children</code> từ component cha (App):
          </p>

          <DecoupledContainer title="📦 LayoutContainer (Chỉ lo layout, không lo nội dung)">
            <Copyright year={selectedYear} />
          </DecoupledContainer>

          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Đổi năm bản quyền:</span>
            <button className="btn-secondary" onClick={() => setSelectedYear(2026)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
              2026
            </button>
            <button className="btn-secondary" onClick={() => setSelectedYear(2027)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
              2027
            </button>
            <button className="btn-secondary" onClick={() => setSelectedYear(2030)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}>
              2030
            </button>
          </div>
        </div>

        {/* Giải mã sự lệch pha giữa 2 loại cây */}
        <div className="compare-box highlight">
          <h3 className="compare-title"><span>🔍</span> So Sánh Hai Mô Hình Cây Tại Cùng Một Đoạn Mã</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontWeight: 700, color: '#fcd34d', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                1. Trên Cây Phụ Thuộc Mô-đun (Dependency Tree)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                <code>App.jsx</code> trực tiếp viết <code>import Copyright from './Copyright'</code>. 
                Trong khi đó <code>DecoupledContainer.jsx</code> <strong>không hề import</strong> Copyright. 
                Do đó, trên Dependency Tree, <code>Copyright.jsx</code> là nhánh con của <code>App.jsx</code>.
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '10px', borderLeft: '4px solid #6366f1' }}>
              <div style={{ fontWeight: 700, color: '#a5b4fc', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                2. Trên Cây Render (Render Tree)
              </div>
              <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Khi hiển thị ra màn hình, <code>DecoupledContainer</code> bọc lấy <code>Copyright</code> và render nó trong thẻ div của mình. 
                Vì vậy trên Render Tree, <code>Copyright</code> lại là <strong>con trực tiếp</strong> của <code>DecoupledContainer</code>!
              </p>
            </div>
          </div>

          <InfoBox type="spring" title="Góc nhìn Backend (Spring Boot IoC)">
            Đây chính là nguyên lý <strong>Inversion of Control (IoC)</strong>: Thay vì Container tự khởi tạo đối tượng phụ thuộc (hardcode <code>new Copyright()</code>), 
            nó để đối tượng bên ngoài "tiêm" vào (Inject via children). Điều này giúp Container hoàn toàn độc lập và tái sử dụng cho bất kỳ nội dung nào!
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
