import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function SpringCommitComparison() {
  const [selectedTopic, setSelectedTopic] = useState('dirty-checking');

  const comparisons = [
    {
      id: 'dirty-checking',
      title: '1. Virtual DOM Diffing ⟷ Hibernate Dirty Checking',
      reactDesc: 'React lưu snapshot Virtual DOM cũ trong RAM. Khi re-render, nó so sánh (Diffing) và chỉ sinh thao tác DOM thật cho những node có thay đổi.',
      springDesc: 'Hibernate lưu entity snapshot trong Persistence Context. Khi transaction flush/commit, nó so sánh snapshot và chỉ sinh SQL UPDATE cho đúng các cột bị sửa đổi (dirty columns).',
      reactCode: `// React Reconciliation Diffing
const oldVdom = <h1>Xin chào</h1><input />;
const newVdom = <h1>Xin chào Tùng</h1><input />;

// Diffing result: Chỉ cập nhật h1 textContent.
// Thẻ <input /> được giữ nguyên vẹn!`,
      springCode: `// Hibernate JPA Dirty Checking
@Transactional
public void updateUser(Long id, String newName) {
    User user = userRepository.findById(id).get();
    user.setName(newName); // Thay đổi 1 trường
    // Lúc commit transaction:
    // Hibernate sinh: UPDATE users SET name = ? WHERE id = ?
    // Không ghi đè các cột khác!
}`
    },
    {
      id: 'mvc-pipeline',
      title: '2. Render & Commit ⟷ Spring MVC Pipeline',
      reactDesc: 'Trigger (Event) -> Render (Gọi hàm component tính toán JSX trong RAM) -> Commit (Đưa điểm khác biệt vào Real DOM) -> Paint (Vẽ pixel).',
      springDesc: 'Request đến DispatcherServlet (Trigger) -> Controller/ViewResolver tính toán Model trong RAM (Render) -> Ghi HttpServletResponse OutputStream (Commit) -> Client hiển thị (Paint).',
      reactCode: `// React Pipeline:
// 1. Trigger: onClick -> setState()
// 2. Render: App() -> tính toán JSX trong RAM
// 3. Commit: react-dom gõ cửa Real DOM
// 4. Paint: Trình duyệt đổ màu pixels`,
      springCode: `// Spring MVC Request Pipeline:
// 1. Trigger: HTTP Request -> DispatcherServlet
// 2. Render: Controller method -> Model & View
// 3. Commit: Ghi response headers & body vào stream
// 4. Paint: Trình duyệt nhận bytes & render HTML`
    },
    {
      id: 'pure-idempotent',
      title: '3. Pha Render Tinh Khiết ⟷ Service Idempotent',
      reactDesc: 'Pha Render chỉ được phép tính toán đại số thuần túy (Pure Function), tuyệt đối không gây side effect hay chọc vào DOM thật.',
      springDesc: 'Các phương thức Service tính toán hoặc GET Query phải là Idempotent (cùng tham số đầu vào luôn cho ra cùng kết quả mà không làm biến đổi database).',
      reactCode: `// ✅ PURE: Cùng props -> cùng JSX
function UserBadge({ name }) {
  return <span className="badge">{name}</span>;
}`,
      springCode: `// ✅ Idempotent Query Service
@Transactional(readOnly = true)
public UserDTO getUser(Long id) {
    return userRepository.findById(id).map(mapper::toDTO);
}`
    }
  ];

  const current = comparisons.find((c) => c.id === selectedTopic);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">☕ Đối Chiếu Chuyên Sâu: React Render/Commit ⟷ Java Spring Boot &amp; Hibernate</h2>
          <p className="card-desc">
            Khám phá sự tương đồng kỳ diệu giữa cơ chế Virtual DOM Diffing của React và tính năng 
            Dirty Checking trong Hibernate JPA ORM.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {comparisons.map((c) => (
          <button
            key={c.id}
            className={`btn-secondary ${selectedTopic === c.id ? 'active' : ''}`}
            onClick={() => setSelectedTopic(c.id)}
            style={{
              padding: '0.5rem 0.9rem',
              fontSize: '0.88rem',
              background: selectedTopic === c.id ? 'rgba(16, 185, 129, 0.2)' : undefined,
              borderColor: selectedTopic === c.id ? '#10b981' : undefined,
              color: selectedTopic === c.id ? '#6ee7b7' : undefined
            }}
          >
            {c.title}
          </button>
        ))}
      </div>

      <div className="grid-2">
        <div className="compare-box">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>⚛️</span>
            <h3 style={{ fontSize: '1.1rem', color: '#06b6d4' }}>Phía React Frontend</h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {current.reactDesc}
          </p>
          <pre style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            fontSize: '0.85rem',
            color: '#a5f3fc',
            overflowX: 'auto'
          }}>
            <code>{current.reactCode}</code>
          </pre>
        </div>

        <div className="compare-box" style={{ borderColor: 'rgba(16, 185, 129, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🌱</span>
            <h3 style={{ fontSize: '1.1rem', color: '#34d399' }}>Phía Java / Spring Boot &amp; Hibernate</h3>
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            {current.springDesc}
          </p>
          <pre style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            fontSize: '0.85rem',
            color: '#a7f3d0',
            overflowX: 'auto'
          }}>
            <code>{current.springCode}</code>
          </pre>
        </div>
      </div>

      <InfoBox type="spring" title="Bài học kiến trúc">
        Cả React và Hibernate đều tuân theo nguyên lý: <strong>"Tính toán sự khác biệt trong bộ nhớ RAM trước khi thực hiện thao tác tốn kém ra môi trường bên ngoài"</strong>. 
        React tránh thao tác DOM thừa, còn Hibernate tránh các câu lệnh SQL I/O thừa!
      </InfoBox>
    </div>
  );
}
