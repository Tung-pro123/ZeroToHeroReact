import { useState, useEffect } from 'react';
import InfoBox from '../common/InfoBox';

export default function ClockInputPreservationLab() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [renderCount, setRenderCount] = useState(0);
  const [typedText, setTypedText] = useState('Tôi đang gõ văn bản thử nghiệm...');
  const [isSimulatingVanillaJs, setIsSimulatingVanillaJs] = useState(false);

  // Đồng hồ chạy tự động mỗi 1 giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setRenderCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">⏰ Thí Nghiệm Kinh Điển: Đồng Hồ Nhảy Giây &amp; Ô Nhập Liệu</h2>
          <p className="card-desc">
            Component bên dưới re-render liên tục <strong>mỗi 1 giây một lần</strong>. 
            Hãy gõ chữ vào ô nhập liệu để chứng kiến phép màu: React bảo toàn nguyên vẹn node DOM thật của ô input!
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span className="badge badge-react">Số lần Re-render: {renderCount}</span>
        </div>
      </div>

      <div className="grid-2">
        {/* Phía React: Bảo toàn DOM */}
        <div className="compare-box highlight">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>⚛️</span> Cơ Chế React: Bảo Toàn Node DOM</h3>
            <span className="badge badge-pipeline">Commit Thông Minh</span>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.85)',
            padding: '1.5rem',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '1rem',
            border: '1px solid rgba(6, 182, 212, 0.3)'
          }}>
            <div style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase' }}>Đồng Hồ Đang Chạy Tự Động</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'monospace', margin: '0.5rem 0' }}>
              {time}
            </div>
            <span className="badge badge-spring" style={{ fontSize: '0.75rem' }}>
              ⚡ Node &lt;h1&gt; được patch text mới mỗi giây
            </span>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
              Ô nhập liệu (Nằm chung component với đồng hồ):
            </label>
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Gõ thử liên tục vào đây..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#a7f3d0', lineHeight: 1.5 }}>
            ✅ <strong>Quan sát:</strong> Dù đồng hồ nhảy giây liên tục và component re-render 60 lần/phút, 
            con trỏ nhấp nháy của bạn không hề bị giật, tiêu điểm (Focus) và chữ gõ dở không bị mất!
          </div>
        </div>

        {/* So sánh với Vanilla JS Cổ Điển */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>⚠️</span> Cách Làm Cổ Điển: <code>innerHTML</code></h3>
            <span className="badge" style={{ background: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e' }}>Xóa Sạch DOM</span>
          </div>

          <p style={{ color: '#9ca3af', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1rem' }}>
            Nếu không có React mà dùng JavaScript thuần thay thế toàn bộ khối HTML mỗi giây:
          </p>

          <pre style={{
            background: 'rgba(15, 23, 42, 0.9)',
            padding: '0.85rem',
            borderRadius: '8px',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            fontSize: '0.8rem',
            color: '#fda4af',
            marginBottom: '1rem',
            overflowX: 'auto'
          }}>
            <code>{`// Vanilla JS: Cứ mỗi 1s chạy lại:
container.innerHTML = 
  '<h1>' + time + '</h1>' +
  '<input placeholder="..." />';
// 💥 HẬU QUẢ: Ô input cũ bị tiêu hủy hoàn toàn,
// thẻ input mới sinh ra -> MẤT HẾT CHỮ VÀ TIÊU ĐIỂM!`}</code>
          </pre>

          <InfoBox title="Bản chất Commit Phase">
            Ở bước Commit, React **chỉ cập nhật đúng nội dung chữ bên trong `<h1>`**. 
            Nó nhận thấy thẻ `<input>` không hề thay đổi cấu trúc, nên giữ nguyên 100% node DOM thật đó trong trình duyệt.
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
