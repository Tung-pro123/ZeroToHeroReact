import { useState, useRef } from 'react';

export default function FocusScrollPlayground() {
  const inputRef = useRef(null);
  const targetBoxRef = useRef(null);
  const [dimensions, setDimensions] = useState(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  const handleSelectText = () => {
    inputRef.current.focus();
    inputRef.current.select();
  };

  const handleScrollToBox = () => {
    targetBoxRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const handleMeasureBox = () => {
    if (targetBoxRef.current) {
      const rect = targetBoxRef.current.getBoundingClientRect();
      setDimensions({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        left: Math.round(rect.left),
      });
    }
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🔍 Thao Tác DOM Cơ Bản: Focus, Scroll & Đo Đạc Hình Học</h2>
          <p className="lab-desc">
            Khi nào bạn cần "thò tay" trực tiếp vào DOM? Đây là 3 trường hợp hợp lệ nhất: Focus ô nhập liệu, cuộn mượt tới vị trí cụ thể, và đo đạc kích thước thực tế (Geometry).
          </p>
        </div>

        <div className="grid-2">
          {/* Section 1: Focus & Select */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-cyan">1. Quản lý Focus & Bôi đen Text</span>
            <p style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Trình duyệt cung cấp API <code>input.focus()</code> và <code>input.select()</code>, không thể thực hiện qua state thông thường.
            </p>

            <input
              ref={inputRef}
              type="text"
              defaultValue="Dữ liệu mẫu cần chỉnh sửa"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: '#090d16',
                color: '#fff',
                fontSize: '0.95rem',
                marginBottom: '1rem',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={handleFocus}>
                🎯 Focus Vào Input
              </button>
              <button className="btn btn-outline" onClick={handleSelectText}>
                ✂️ Bôi Đen Toàn Bộ Chữ
              </button>
            </div>
          </div>

          {/* Section 2: Measure Geometry */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.04)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '12px',
            padding: '1.25rem',
          }}>
            <span className="badge badge-indigo">2. Đo đạc Kích thước (Geometry)</span>
            <p style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              Đọc tọa độ và chiều cao, chiều rộng bằng <code>getBoundingClientRect()</code>.
            </p>

            <button className="btn btn-indigo" onClick={handleMeasureBox}>
              📏 Đo Kích Thước Hộp Mục Tiêu
            </button>

            {dimensions && (
              <div className="code-box" style={{ marginTop: '1rem', fontSize: '0.82rem' }}>
                <div>Width: <strong style={{ color: '#38bdf8' }}>{dimensions.width}px</strong></div>
                <div>Height: <strong style={{ color: '#818cf8' }}>{dimensions.height}px</strong></div>
                <div>Viewport Top: <strong style={{ color: '#34d399' }}>{dimensions.top}px</strong></div>
                <div>Viewport Left: <strong style={{ color: '#fbbf24' }}>{dimensions.left}px</strong></div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Scroll Demo Target Box */}
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-emerald">3. Cuộn Mượt (Smooth Scroll)</span>
            <button className="btn btn-outline" onClick={handleScrollToBox}>
              📍 Cuộn Tới Hộp Này
            </button>
          </div>

          <div
            ref={targetBoxRef}
            style={{
              padding: '2.5rem',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.1))',
              border: '2px dashed rgba(56, 189, 248, 0.4)',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>🎯 TARGET BOX (Hộp Mục Tiêu)</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Ref gắn vào thẻ này: <code>&lt;div ref=&#123;targetBoxRef&#125;&gt;</code>. Khi bạn bấm nút ở trên, hàm <code>targetBoxRef.current.scrollIntoView(&#123; behavior: 'smooth' &#125;)</code> được gọi.
            </p>
          </div>
        </div>

        <div className="alert-box alert-warning" style={{ marginTop: '1.5rem' }}>
          <span>⚠️</span>
          <div>
            <strong>Thời điểm React gắn DOM node vào Ref:</strong>
            <br />
            Trong quá trình <strong>Render Phase</strong>, <code>inputRef.current</code> vẫn là <code>null</code>.
            React chỉ gán node DOM thật vào <code>ref.current</code> khi bước sang <strong>Commit Phase</strong> (sau khi DOM thực tế đã được chèn vào màn hình). Do đó, chỉ đọc Ref trong Event Handlers hoặc trong <code>useEffect</code>!
          </div>
        </div>
      </div>
    </div>
  );
}
