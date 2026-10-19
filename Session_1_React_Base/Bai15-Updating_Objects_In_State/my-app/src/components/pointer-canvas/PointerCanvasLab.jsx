import { useState, useRef } from 'react';
import InfoBox from '../common/InfoBox';

export default function PointerCanvasLab() {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [mode, setMode] = useState('immutable'); // 'mutation' | 'immutable'
  const [renderCount, setRenderCount] = useState(0);

  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    if (mode === 'mutation') {
      // ❌ SAI LẦM: Sửa trực tiếp thuộc tính của object hiện tại
      position.x = x;
      position.y = y;
      // Dù có cố gọi setPosition(position) thì Object.is(pos, pos) === true -> React hủy render!
    } else {
      // ✅ CHUẨN: Tạo object mới với tham chiếu ô nhớ mới
      setPosition({ x, y });
      setRenderCount((prev) => prev + 1);
    }
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔴 Con Trỏ Di Chuột (Mutation vs Immutable)</h2>
        <p className="lab-card-desc">
          Rê chuột vào khung bên dưới để thấy sự khác biệt một trời một vực giữa việc sửa trực tiếp thuộc tính và tạo Object mới.
        </p>
      </div>

      <InfoBox
        type={mode === 'mutation' ? 'danger' : 'tip'}
        title={mode === 'mutation' ? 'Đang bật Chế độ Đột Biến (Mutation Error)' : 'Đang bật Chế độ Bất Biến (Immutable Mode)'}
      >
        {mode === 'mutation'
          ? 'Đang chạy: position.x = x; position.y = y; -> Chấm đỏ ĐƠ CỨNG vì React không nhận diện được thay đổi do cùng địa chỉ ô nhớ RAM!'
          : 'Đang chạy: setPosition({ x, y }) -> React nhận thấy Object mới với địa chỉ ô nhớ mới, kích hoạt re-render 60 FPS liên tục!'}
      </InfoBox>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Chọn cách cập nhật State:</span>
        <button
          className={`btn ${mode === 'immutable' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('immutable')}
          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
        >
          ✅ Chuẩn: setPosition({'{ x, y }'})
        </button>
        <button
          className={`btn ${mode === 'mutation' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('mutation')}
          style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
        >
          ❌ Lỗi: position.x = x (Đột biến)
        </button>
      </div>

      {/* Pointer Canvas Area */}
      <div
        ref={containerRef}
        className="pointer-canvas"
        onPointerMove={handlePointerMove}
      >
        <div
          className="red-dot"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />

        <div style={{ position: 'absolute', bottom: '15px', left: '15px', color: '#94a3b8', fontSize: '0.85rem', pointerEvents: 'none' }}>
          Tọa độ hiện tại: <strong style={{ color: '#38bdf8' }}>X: {position.x}px</strong> | <strong style={{ color: '#38bdf8' }}>Y: {position.y}px</strong>
        </div>

        <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: '#94a3b8', fontSize: '0.85rem', pointerEvents: 'none' }}>
          Số lần Re-render: <strong style={{ color: mode === 'immutable' ? '#10b981' : '#ef4444' }}>{renderCount}</strong>
        </div>
      </div>

      {/* Code Breakdown */}
      <div style={{ margin: '1rem 0' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn sự kiện onPointerMove tương ứng:</span>
        <pre className="code-pill">
{mode === 'immutable'
  ? `onPointerMove={e => {\n  // ✅ Tạo Object mới hoàn toàn (Địa chỉ RAM mới)\n  setPosition({\n    x: Math.round(e.clientX - rect.left),\n    y: Math.round(e.clientY - rect.top)\n  });\n}}`
  : `onPointerMove={e => {\n  // ❌ Đột biến trực tiếp (Địa chỉ RAM giữ nguyên)\n  position.x = Math.round(e.clientX - rect.left);\n  position.y = Math.round(e.clientY - rect.top);\n  // React không biết có sự thay đổi -> Màn hình đứng im!\n}}`}
        </pre>
      </div>
    </div>
  );
}
