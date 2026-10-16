import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function TrafficLightLab() {
  const [walk, setWalk] = useState(true);
  const [order, setOrder] = useState('after'); // 'before' | 'after'
  const [history, setHistory] = useState([]);

  const handleToggle = () => {
    const time = new Date().toLocaleTimeString();
    const alertMsg = walk ? 'Stop is next (Sắp dừng)' : 'Walk is next (Sắp được đi)';

    if (order === 'after') {
      // Gọi setWalk trước, alert sau
      setWalk(!walk);
      setHistory((prev) => [`[${time}] Thứ tự [setWalk -> alert]: walk = ${walk} => Thông báo: "${alertMsg}"`, ...prev.slice(0, 5)]);
      alert(alertMsg);
    } else {
      // Gọi alert trước, setWalk sau
      setHistory((prev) => [`[${time}] Thứ tự [alert -> setWalk]: walk = ${walk} => Thông báo: "${alertMsg}"`, ...prev.slice(0, 5)]);
      alert(alertMsg);
      setWalk(!walk);
    }
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🚦 Thử Thách Đèn Giao Thông & Thứ Tự Alert</h2>
        <p className="lab-card-desc">
          Kiểm chứng câu đố kinh điển trong React Docs: Đổi chỗ hàm <code>alert</code> lên trước hay sau <code>setWalk</code> có làm thay đổi kết quả?
        </p>
      </div>

      <InfoBox type="tip" title="Bản Chất Biến Cố Định Trong Lần Render">
        Trong suốt quá trình hàm <code>handleToggle</code> chạy, biến <code>walk</code> luôn giữ nguyên giá trị Snapshot hiện tại (<strong>{walk ? 'true' : 'false'}</strong>). 
        Do đó dù bạn đặt <code>alert</code> ở trước hay sau <code>setWalk(!walk)</code>, biểu thức điều kiện vẫn trả về cùng một kết quả.
      </InfoBox>

      {/* Traffic Light Graphic */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
        <div className="traffic-housing">
          <div className={`light-circle red ${!walk ? 'active' : ''}`}>
            ✋
          </div>
          <div className={`light-circle green ${walk ? 'active' : ''}`}>
            🚶
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: walk ? '#10b981' : '#ef4444' }}>
            {walk ? 'TÍN HIỆU: ĐƯỢC PHÉP ĐI (WALK)' : 'TÍN HIỆU: DỪNG LẠI (STOP)'}
          </span>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
            Giá trị State hiện tại: <code>walk = {walk ? 'true' : 'false'}</code>
          </p>
        </div>
      </div>

      {/* Order Chooser & Action Button */}
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem', margin: '1.5rem 0' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: '#94a3b8', display: 'block', marginBottom: '0.4rem' }}>
              Vị trí đặt câu lệnh <code>alert</code> trong code:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className={`btn ${order === 'after' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOrder('after')}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                1. setWalk() trước -&gt; alert() sau
              </button>
              <button
                className={`btn ${order === 'before' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setOrder('before')}
                style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                2. alert() trước -&gt; setWalk() sau
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleToggle}
            style={{ fontSize: '1rem', padding: '0.8rem 1.75rem', alignSelf: 'flex-end' }}
          >
            🔄 Chuyển Đèn (Kèm Alert Dự Báo)
          </button>
        </div>

        {/* Code representation */}
        <div style={{ marginTop: '1rem' }}>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn tương ứng đang thực thi:</span>
          <pre className="code-pill" style={{ margin: '0.35rem 0' }}>
{order === 'after'
  ? `function handleClick() {\n  setWalk(!walk); // Lên lịch đổi sang ${!walk}\n  alert(walk ? 'Stop is next' : 'Walk is next'); // Đọc walk = ${walk} => Báo '${walk ? 'Stop is next' : 'Walk is next'}'\n}`
  : `function handleClick() {\n  alert(walk ? 'Stop is next' : 'Walk is next'); // Đọc walk = ${walk} => Báo '${walk ? 'Stop is next' : 'Walk is next'}'\n  setWalk(!walk); // Lên lịch đổi sang ${!walk}\n}`}
          </pre>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="console-box">
          <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Lịch Sử Chuyển Đèn & Kết Quả Alert:
          </div>
          {history.map((h, i) => (
            <div key={i} className="log-entry">
              <span className="log-text">{h}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
