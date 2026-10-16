import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// ⚠️ Biến Global dùng chung ngoài Component (Mô phỏng bẫy trong React Docs Challenge 2)
let sharedGlobalPosition = { x: 40, y: 40 };

export default function SharedMutationBugLab() {
  const [shape, setShape] = useState({
    color: 'orange',
    position: { ...sharedGlobalPosition },
  });

  const [bgPosition, setBgPosition] = useState({ ...sharedGlobalPosition });
  const [bgColor, setBgColor] = useState('#1e293b');
  const [mode, setMode] = useState('buggy'); // 'buggy' | 'fixed'

  // Kéo thả hoặc di chuyển hình
  const handleMove = (dx, dy) => {
    if (mode === 'buggy') {
      // ❌ LỖI ẨN CỰC KỲ NGUY HIỂM: Đột biến trực tiếp đối tượng dùng chung
      sharedGlobalPosition.x += dx;
      sharedGlobalPosition.y += dy;
      setShape({
        ...shape,
        position: sharedGlobalPosition,
      });
    } else {
      // ✅ BẢN CHUẨN: Tạo đối tượng mới độc lập, không chạm vào biến ngoài
      setShape({
        ...shape,
        position: {
          x: shape.position.x + dx,
          y: shape.position.y + dy,
        },
      });
    }
  };

  // Nút đổi màu nền: Sẽ kích hoạt re-render và vô tình bộc lộ lỗi biến toàn cục bị sửa
  const handleToggleBgColor = () => {
    setBgColor((prev) => (prev === '#1e293b' ? '#0f291e' : '#1e293b'));
    if (mode === 'buggy') {
      // Đọc lại biến toàn cục đã bị đột biến sau lưng
      setBgPosition({ ...sharedGlobalPosition });
    }
  };

  const handleReset = () => {
    sharedGlobalPosition = { x: 40, y: 40 };
    setShape({
      color: 'orange',
      position: { x: 40, y: 40 },
    });
    setBgPosition({ x: 40, y: 40 });
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🐛 Bẫy Đột Biến Biến Toàn Cục (Shared Ref Bug)</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 2 trong React Docs: Thao tác di chuyển khối hộp rồi bấm đổi màu nền để thấy Background bị nhảy vị trí một cách ma quái.
        </p>
      </div>

      <InfoBox
        type={mode === 'buggy' ? 'danger' : 'tip'}
        title={mode === 'buggy' ? 'Đang bật Bản Lỗi (Shared Mutation Bug)' : 'Đang bật Bản Chuẩn (Isolated Immutability)'}
      >
        {mode === 'buggy'
          ? 'Thử nghiệm: 1) Bấm nút "Sang Phải (+30px)" vài lần. 2) Bấm nút "Đổi Màu Nền". Bạn sẽ thấy khung tham chiếu bị nhảy theo do biến toàn cục bị đột biến!'
          : 'Ở bản chuẩn, vị trí của khối hộp được tạo mới hoàn toàn, độc lập 100% với các biến bên ngoài, không gây ra hiệu ứng phụ (side-effects).'}
      </InfoBox>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Chế độ:</span>
        <button
          className={`btn ${mode === 'buggy' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('buggy')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ❌ Bản Lỗi (Đột biến biến dùng chung)
        </button>
        <button
          className={`btn ${mode === 'fixed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('fixed')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✅ Bản Chuẩn (Tạo Object độc lập)
        </button>
      </div>

      {/* Stage Canvas */}
      <div
        style={{
          width: '100%',
          height: '240px',
          background: bgColor,
          borderRadius: '12px',
          border: '2px solid #334155',
          position: 'relative',
          overflow: 'hidden',
          transition: 'background 0.3s',
        }}
      >
        {/* Ghost reference box (Background Position) */}
        <div
          style={{
            position: 'absolute',
            left: `${bgPosition.x}px`,
            top: `${bgPosition.y}px`,
            width: '80px',
            height: '80px',
            border: '2px dashed #94a3b8',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            color: '#94a3b8',
            pointerEvents: 'none',
          }}
        >
          Vị trí gốc
        </div>

        {/* Movable Shape */}
        <div
          style={{
            position: 'absolute',
            left: `${shape.position.x}px`,
            top: `${shape.position.y}px`,
            width: '80px',
            height: '80px',
            background: shape.color === 'orange' ? '#f59e0b' : '#38bdf8',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: '#000',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            transition: 'all 0.15s ease-out',
          }}
        >
          Box
        </div>
      </div>

      {/* Move Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', margin: '1.25rem 0' }}>
        <button className="btn btn-secondary" onClick={() => handleMove(-30, 0)}>
          ⬅️ Sang Trái (-30px)
        </button>
        <button className="btn btn-secondary" onClick={() => handleMove(30, 0)}>
          ➡️ Sang Phải (+30px)
        </button>
        <button className="btn btn-secondary" onClick={() => handleMove(0, -20)}>
          ⬆️ Lên Trên (-20px)
        </button>
        <button className="btn btn-secondary" onClick={() => handleMove(0, 20)}>
          ⬇️ Xuống Dưới (+20px)
        </button>
        <button className="btn btn-primary" onClick={handleToggleBgColor}>
          🎨 Đổi Màu Nền (Kích hoạt Re-render)
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          🔄 Reset Vị Trí
        </button>
      </div>

      {/* Code explanation */}
      <div style={{ margin: '1rem 0' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn xử lý di chuyển:</span>
        <pre className="code-pill">
{mode === 'buggy'
  ? `// ❌ LỖI: Sửa trực tiếp biến toàn cục bên ngoài component!\nsharedGlobalPosition.x += dx;\nsetShape({ ...shape, position: sharedGlobalPosition });`
  : `// ✅ CHUẨN: Luôn tạo Object position mới hoàn toàn độc lập!\nsetShape({\n  ...shape,\n  position: {\n    x: shape.position.x + dx,\n    y: shape.position.y + dy\n  }\n});`}
        </pre>
      </div>
    </div>
  );
}
