import { useState, useRef, useEffect } from 'react';

// Custom Hook usePrevious
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function AdvancedRefPatterns() {
  // Pattern 1: usePrevious
  const [text, setText] = useState('React 18');
  const prevText = usePrevious(text);

  // Pattern 2: Component Render Counter
  const renderCounterRef = useRef(1);
  useEffect(() => {
    renderCounterRef.current += 1;
  });

  // Pattern 3: Async Mount Guard
  const isMountedRef = useRef(true);
  const [asyncStatus, setAsyncStatus] = useState('Idle');

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const simulateAsyncFetch = () => {
    setAsyncStatus('⏳ Đang gọi API bất đồng bộ (2s)...');
    setTimeout(() => {
      if (isMountedRef.current) {
        setAsyncStatus('✅ API trả về dữ liệu an toàn!');
      } else {
        console.warn('Component đã unmount, hủy cập nhật state!');
      }
    }, 2000);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🚀 Advanced Ref Patterns (Các Mẫu Thiết Kế Nâng Cao)</h2>
          <p className="lab-desc">
            Khám phá 3 mẫu ứng dụng cao cấp của <strong>useRef</strong> thường xuất hiện trong các bài phỏng
            vấn Senior Frontend Engineer.
          </p>
        </div>

        <div className="grid-3">
          {/* Pattern 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-cyan">Mẫu 1: usePrevious Hook</span>
            <h4 style={{ margin: '0.75rem 0' }}>Ghi nhớ giá trị render trước</h4>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#0f172a',
                color: '#fff',
                marginBottom: '1rem',
              }}
            />
            <div style={{ fontSize: '0.85rem' }}>
              <div>Hiện tại: <strong style={{ color: '#38bdf8' }}>{text}</strong></div>
              <div style={{ marginTop: '0.3rem' }}>
                Lần trước: <strong style={{ color: '#fbbf24' }}>{prevText !== undefined ? prevText : '(Lần đầu)'}</strong>
              </div>
            </div>
          </div>

          {/* Pattern 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-emerald">Mẫu 2: Render Counter</span>
            <h4 style={{ margin: '0.75rem 0' }}>Đếm số lần Render an toàn</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Nếu dùng <code>useState</code> để đếm render trong <code>useEffect</code>, component sẽ bị lặp vô tận (Infinite Loop). Dùng Ref giải quyết triệt để!
            </p>
            <div style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              textAlign: 'center',
              color: '#34d399',
              margin: '1rem 0',
            }}>
              #{renderCounterRef.current}
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.8rem', color: '#6ee7b7' }}>
              Không gây kích hoạt render phụ
            </div>
          </div>

          {/* Pattern 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-purple">Mẫu 3: isMounted Guard</span>
            <h4 style={{ margin: '0.75rem 0' }}>Chống rò rỉ bộ nhớ (Memory Leak)</h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', minHeight: '40px' }}>
              Bảo vệ component khỏi lỗi gọi <code>setState</code> sau khi unmount trong các tác vụ mạng chậm.
            </p>
            <button className="btn btn-outline" style={{ width: '100%', margin: '0.75rem 0' }} onClick={simulateAsyncFetch}>
              🚀 Chạy tác vụ giả lập
            </button>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', textAlign: 'center' }}>
              {asyncStatus}
            </div>
          </div>
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Code mẫu hook `usePrevious`:</strong>
          <pre style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.82rem' }}>
{`function usePrevious(value) {
  const ref = useRef();
  // useEffect chạy SAU khi component đã render và paint lên màn hình
  useEffect(() => {
    ref.current = value;
  }, [value]);
  // Trả về giá trị của lần render TRƯỚC ĐÓ
  return ref.current;
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
