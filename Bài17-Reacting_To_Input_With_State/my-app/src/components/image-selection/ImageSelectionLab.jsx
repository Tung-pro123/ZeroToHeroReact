import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function ImageSelectionLab() {
  const [isActive, setIsActive] = useState(false);
  const [stopBubbling, setStopBubbling] = useState(true);
  const [log, setLog] = useState('Chưa có thao tác click');

  const handleBackgroundClick = () => {
    setIsActive(false);
    setLog('🖱️ Click vào NỀN NGOÀI: Tắt viền ảnh, đổi màu nền.');
  };

  const handlePictureClick = (e) => {
    if (stopBubbling) {
      // ✅ Chuẩn: Chặn sự kiện lan ra thẻ div ngoài!
      e.stopPropagation();
      setIsActive(true);
      setLog('🖼️ Click vào BỨC ẢNH (Có stopPropagation): Bật viền xanh thành công!');
    } else {
      // ❌ Lỗi: Không chặn bubbling -> Sự kiện lan ra ngoài div và lập tức tắt isActive!
      setIsActive(true);
      setLog('⚠️ Click vào ẢNH (Quên stopPropagation): Sự kiện bị sủi bọt ra ngoài khiến ảnh tắt viền ngay lập tức!');
    }
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🖼️ Thử Thách 1: Đổi Viền Ảnh & Chống Nổi Bọt (Bubbling)</h2>
        <p className="lab-card-desc">
          Tái hiện Challenge 1 trong React Docs: Thao tác click vào ảnh để bật viền xanh, click ra nền ngoài để hủy viền.
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất: Kết Hợp State và Event Bubbling">
        Không dùng <code>classList.add()</code>. Chỉ cần biến <code>isActive</code> để điều khiển class động.
        Đặc biệt, thẻ ảnh phải gọi <code>e.stopPropagation()</code> để ngăn sự kiện nổi bọt ra thẻ nền ngoài!
      </InfoBox>

      {/* Switcher to test without stopPropagation */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Xử lý Event Bubbling:</span>
        <button
          className={`btn ${stopBubbling ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setStopBubbling(true)}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          🛡️ Có e.stopPropagation() (Bản Chuẩn)
        </button>
        <button
          className={`btn ${!stopBubbling ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setStopBubbling(false)}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ⚠️ Quên stopPropagation() (Bị tắt viền ngay)
        </button>
      </div>

      {/* Interactive Image Canvas */}
      <div
        className="image-canvas-container"
        style={{
          background: isActive ? '#1e293b' : '#064e3b',
          border: '2px solid #334155',
        }}
        onClick={handleBackgroundClick}
      >
        <div style={{ textAlign: 'center' }}>
          <img
            className="selectable-img"
            src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=500&q=80"
            alt="Tranh nghệ thuật"
            style={{
              border: isActive ? '5px solid #38bdf8' : '5px solid transparent',
              boxShadow: isActive ? '0 0 25px rgba(56, 189, 248, 0.5)' : 'none',
            }}
            onClick={handlePictureClick}
          />
          <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#e2e8f0' }}>
            {isActive ? '🌟 Bức ảnh ĐANG ĐƯỢC CHỌN (Click ra nền xanh để bỏ chọn)' : '👉 Click vào ảnh để chọn'}
          </p>
        </div>
      </div>

      {/* Log */}
      <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: '#090d16', borderRadius: '8px', border: '1px solid #1e293b' }}>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Nhật ký sự kiện:</span>
        <div style={{ color: isActive ? '#38bdf8' : '#cbd5e1', fontSize: '0.9rem', marginTop: '0.2rem', fontWeight: 600 }}>
          {log}
        </div>
      </div>
    </div>
  );
}
