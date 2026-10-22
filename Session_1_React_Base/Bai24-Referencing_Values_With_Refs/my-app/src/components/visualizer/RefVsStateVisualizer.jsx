import { useState, useRef } from 'react';

export default function RefVsStateVisualizer() {
  // 1. Regular Variable
  let regularVar = 0;

  // 2. React State
  const [stateCount, setStateCount] = useState(0);

  // 3. React Ref
  const refCount = useRef(0);

  // Extra state to force re-render and inspect changes
  const [, setTick] = useState(0);
  const [renderCount, setRenderCount] = useState(1);
  const [refSnapshot, setRefSnapshot] = useState(0);

  const forceReRender = () => {
    setTick((t) => t + 1);
    setRenderCount((r) => r + 1);
    setRefSnapshot(refCount.current);
  };

  const handleIncrementVar = () => {
    regularVar += 1;
    alert(`Biến thường regularVar = ${regularVar}\n(Lưu ý: UI không đổi vì chưa re-render, và khi re-render biến này sẽ bị reset về 0!)`);
  };

  const handleIncrementState = () => {
    setStateCount((c) => c + 1);
    setRenderCount((r) => r + 1);
    setRefSnapshot(refCount.current);
  };

  const handleIncrementRef = () => {
    refCount.current += 1;
    setRefSnapshot(refCount.current);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🧠 So Sánh Bản Chất: Ref vs State vs Biến Cục Bộ</h2>
          <p className="lab-desc">
            Khám phá cách React quản lý bộ nhớ của Component. Hãy bấm tăng từng ô và quan sát hiện tượng
            khi Component Re-render!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={forceReRender}>
            🔄 Kích hoạt Ép Re-render (Render #{renderCount})
          </button>
          <span style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
            Tổng số lần Component đã render: <strong style={{ color: '#38bdf8' }}>{renderCount}</strong>
          </span>
        </div>

        <div className="grid-3">
          {/* Card 1: Regular Variable */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <span className="badge badge-rose">1. Biến Thường (let)</span>
            <h3 style={{ margin: '0.75rem 0', fontSize: '1.1rem' }}>let count = 0</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', minHeight: '40px' }}>
              Nằm trong hàm component. Bị tạo mới và reset về 0 ở MỖI lần render!
            </p>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              color: '#f87171',
              margin: '1rem 0'
            }}>
              {regularVar}
            </div>
            <button className="btn btn-outline" style={{ width: '100%' }} onClick={handleIncrementVar}>
              ➕ Tăng biến thường
            </button>
            <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#fca5a5' }}>
              ❌ Không giữ được qua render
            </div>
          </div>

          {/* Card 2: useState */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <span className="badge badge-cyan">2. State (useState)</span>
            <h3 style={{ margin: '0.75rem 0', fontSize: '1.1rem' }}>useState(0)</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', minHeight: '40px' }}>
              Được React giữ lại qua render. Thay đổi state $\rightarrow$ Kích hoạt Re-render UI!
            </p>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              color: '#38bdf8',
              margin: '1rem 0'
            }}>
              {stateCount}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleIncrementState}>
              ➕ Tăng State (Re-render)
            </button>
            <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#7dd3fc' }}>
              ✅ Giữ giá trị & Cập nhật UI
            </div>
          </div>

          {/* Card 3: useRef */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <span className="badge badge-emerald">3. Ref (useRef)</span>
            <h3 style={{ margin: '0.75rem 0', fontSize: '1.1rem' }}>useRef(0)</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', minHeight: '40px' }}>
              Object {`{ current: n }`}. Giữ lại qua render NHƯNG thay đổi KHÔNG gây Re-render!
            </p>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              color: '#34d399',
              margin: '1rem 0'
            }}>
              {refCount.current}
            </div>
            <button className="btn btn-outline" style={{ width: '100%', borderColor: 'rgba(16, 185, 129, 0.4)' }} onClick={handleIncrementRef}>
              ➕ Sửa ref.current (Âm thầm)
            </button>
            <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', color: '#6ee7b7' }}>
              ✅ Giữ giá trị & KHÔNG Re-render
            </div>
          </div>
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>💡 Mental Model (Bản chất dưới mui xe - Under The Hood):</strong>
          <pre style={{ marginTop: '0.5rem', fontSize: '0.82rem', color: '#cbd5e1' }}>
{`// Cú pháp React Hooks dưới góc nhìn RAM:
const myRef = useRef(initialValue);

// Thực chất useRef(val) hoạt động tương đương như:
function customUseRef(initialValue) {
  const [refContainer] = useState({ current: initialValue });
  return refContainer; // Luôn trả về CÙNG MỘT THAM CHIẾU OBJECT duy nhất qua mọi lần render!
}`}
          </pre>
        </div>

        <div className="alert-box alert-info">
          <span>ℹ️</span>
          <div>
            <strong>Khi nào nên dùng Ref thay vì State?</strong> Dùng Ref khi bạn cần lưu trữ một thông tin
            tồn tại suốt vòng đời component, nhưng thông tin đó <strong>hoàn toàn không tham gia vào việc vẽ JSX</strong> (ví dụ: timer ID, socket connection, flag kiểm tra lần render đầu).
          </div>
        </div>
      </div>
    </div>
  );
}
