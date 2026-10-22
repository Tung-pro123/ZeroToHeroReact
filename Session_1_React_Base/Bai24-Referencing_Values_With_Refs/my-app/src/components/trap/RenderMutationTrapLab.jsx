import { useState, useRef } from 'react';

export default function RenderMutationTrapLab() {
  const [toggle, setToggle] = useState(false);
  const [safeCount, setSafeCount] = useState(0);

  // Ref dùng để minh họa cạm bẫy
  const impureRef = useRef(0);
  const pureEventRef = useRef(0);

  // ❌ NGUY HIỂM: Đọc & Ghi Ref ngay trong thân Component (Render Phase)!
  // Trong React StrictMode (Development), React render 2 lần:
  // Kết quả: impureRef.current bị cộng dồn 2 lần cho MỖI lần render!
  impureRef.current = impureRef.current + 1;

  // ✅ ĐÚNG: Ghi Ref trong Event Handler
  const handleGoodClick = () => {
    pureEventRef.current += 1;
    setSafeCount((c) => c + 1); // Trigger re-render để hiển thị
  };

  const handleReRender = () => {
    setToggle((t) => !t);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">⚠️ Cạm Bẫy: Đột Biến Ref Trong Render Phase (Anti-Pattern)</h2>
          <p className="lab-desc">
            Luật tối thượng của React: <strong>Hàm Component phải là hàm tinh khiết (Pure Function)</strong>.
            Đọc hoặc ghi <code>ref.current</code> trong quá trình Render là một lỗi nghiêm trọng!
          </p>
        </div>

        <div className="alert-box alert-danger">
          <span>🚨</span>
          <div>
            <strong>Quy tắc bất di bất dịch của React Docs:</strong>
            <br />
            <em>"Don't read or write ref.current during rendering. React expects your component body to behave like a pure function!"</em>
          </div>
        </div>

        <div style={{ margin: '1.5rem 0' }}>
          <button className="btn btn-primary" onClick={handleReRender}>
            🔄 Nhấn để Kích Hoạt Re-render Component
          </button>
        </div>

        <div className="grid-2">
          {/* Box 1: Impure Ref */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-rose">❌ Anti-Pattern: Ghi Ref Trong Thân Hàm</span>
            <div className="code-box" style={{ fontSize: '0.8rem' }}>
              <pre>{`function MyComponent() {
  const countRef = useRef(0);

  // ❌ LỖI: Ghi đè ref trực tiếp khi render!
  countRef.current = countRef.current + 1;

  return <div>{countRef.current}</div>;
}`}</pre>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>Giá trị impureRef.current hiện tại:</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f87171' }}>
                {impureRef.current}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>
                (Quan sát: Mỗi lần bấm re-render, giá trị tăng vọt do Strict Mode gọi component 2 lần!)
              </div>
            </div>
          </div>

          {/* Box 2: Pure Event Handler Ref */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-emerald">✅ Best Practice: Ghi Ref Trong Event Handler</span>
            <div className="code-box" style={{ fontSize: '0.8rem' }}>
              <pre>{`function MyComponent() {
  const countRef = useRef(0);

  // ✅ ĐÚNG: Ghi ref trong phản ứng sự kiện người dùng
  function handleClick() {
    countRef.current += 1;
  }

  return <button onClick={handleClick}>Click</button>;
}`}</pre>
            </div>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button className="btn btn-outline" style={{ borderColor: '#10b981' }} onClick={handleGoodClick}>
                ➕ Click chuẩn mực ({pureEventRef.current})
              </button>
              <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#6ee7b7' }}>
                Hành vi hoàn toàn dự đoán được và an toàn 100% trong Concurrent React!
              </div>
            </div>
          </div>
        </div>

        <div className="alert-box alert-warning" style={{ marginTop: '1.5rem' }}>
          <span>💡</span>
          <div>
            <strong>Vì sao Concurrent React cấm đọc/ghi ref khi render?</strong>
            <br />
            Trong React 18 & 19, một lượt render có thể bị gián đoạn, hủy bỏ, hoặc render thử trong nền (Offscreen).
            Nếu bạn thay đổi <code>ref.current</code> khi render dở dang, bộ nhớ sẽ bị biến dạng (corrupted state) và gây ra những lỗi gián đoạn bí ẩn cực kỳ khó debug!
          </div>
        </div>
      </div>
    </div>
  );
}
