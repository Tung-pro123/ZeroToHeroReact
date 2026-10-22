import { useState, useRef } from 'react';
import InfoBox from '../common/InfoBox';

// Biến ngoài component để mô phỏng tư duy biến toàn cục có thể đột biến (Mutable Bug)
let globalRecipient = 'Alice';

export default function TimeTravelChatLab() {
  const [to, setTo] = useState('Alice');
  const [message, setMessage] = useState('Chào bạn! Mình hẹn cà phê chiều nay nhé?');
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [chatLogs, setChatLogs] = useState([]);
  const [mode, setMode] = useState('react'); // 'react' | 'global_bug'

  const timerRef = useRef(null);

  const handleSelectRecipient = (person) => {
    setTo(person);
    globalRecipient = person; // Cập nhật biến mutable
  };

  const handleSend = () => {
    setIsSending(true);
    let secondsLeft = 3;
    setCountdown(secondsLeft);

    const snapshotTo = to;
    const snapshotMsg = message;

    const interval = setInterval(() => {
      secondsLeft -= 1;
      setCountdown(secondsLeft);
      if (secondsLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    timerRef.current = setTimeout(() => {
      setIsSending(false);
      setCountdown(null);

      if (mode === 'react') {
        // React Snapshot mode: 'to' được chụp lại từ closure lúc bấm nút
        const log = `✅ [REACT SNAPSHOT] Đã gửi thành công: "${snapshotMsg}" tới [${snapshotTo}]!`;
        setChatLogs((prev) => [log, ...prev]);
        alert(`ĐÃ GỬI TỚI: ${snapshotTo}\nNội dung: "${snapshotMsg}"`);
      } else {
        // Global Mutable Bug mode: Đọc biến toàn cục tại thời điểm 3s sau
        const log = `🚨 [BUG BIẾN TOÀN CỤC] Sai người nhận! Bạn định gửi Alice nhưng đã bị gửi sang: [${globalRecipient}]!`;
        setChatLogs((prev) => [log, ...prev]);
        alert(`🚨 LỖI GỬI NHẦM!\nTin nhắn bị gửi tới: ${globalRecipient}\nNội dung: "${snapshotMsg}"`);
      }
    }, 3000);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">✉️ Tránh Lỗi Chạy Đua Thời Gian (Race Condition)</h2>
        <p className="lab-card-desc">
          Mô phỏng gửi tin nhắn trễ 3 giây: Thao tác đổi người nhận giữa chừng để thấy sức mạnh bảo vệ dữ liệu của Snapshot.
        </p>
      </div>

      <InfoBox type="tip" title="Bảo Vệ Tính Nhất Quán Dữ Liệu">
        Khi bạn bấm <strong>Gửi</strong> lúc đang chọn <em>Alice</em>, một Snapshot được đóng gói lại. 
        Dù trong 3 giây tiếp theo bạn có chọn <em>Bob</em> hay <em>Charlie</em>, bức thư vẫn được chuyển phát chính xác tới <em>Alice</em>.
      </InfoBox>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Chế độ mô phỏng:</span>
        <button
          className={`btn ${mode === 'react' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('react')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          🛡️ React Snapshot (An toàn)
        </button>
        <button
          className={`btn ${mode === 'global_bug' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('global_bug')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ⚠️ Biến Mutable (Lỗi gửi nhầm người)
        </button>
      </div>

      {/* Chat Simulator Interface */}
      <div className="chat-sim-container">
        {/* Left: Chat form */}
        <div className="chat-box">
          <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>1. CHỌN NGƯỜI NHẬN:</label>
          <div className="recipient-selector">
            {['Alice', 'Bob', 'Charlie'].map((person) => (
              <button
                key={person}
                className={`recipient-btn ${to === person ? 'active' : ''}`}
                onClick={() => handleSelectRecipient(person)}
              >
                👤 {person}
              </button>
            ))}
          </div>

          <label style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginTop: '0.75rem' }}>
            2. NỘI DUNG TIN NHẮN:
          </label>
          <textarea
            style={{
              width: '100%',
              height: '80px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f8fafc',
              padding: '0.75rem',
              fontFamily: 'inherit',
              marginTop: '0.35rem',
              resize: 'none',
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              className="btn btn-primary"
              disabled={isSending}
              onClick={handleSend}
              style={{ flex: 1 }}
            >
              {isSending ? `⏳ Đang gửi... (${countdown}s)` : `🚀 Gửi tới ${to} (Độ trễ 3s)`}
            </button>
          </div>
        </div>

        {/* Right: Live Visual Guide */}
        <div className="chat-box" style={{ background: '#131b2e', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>🧪 Thao Tác Thí Nghiệm</h4>
            <ol style={{ fontSize: '0.85rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: '1.8' }}>
              <li>Để người nhận là <strong>Alice</strong> và bấm nút <strong>Gửi</strong>.</li>
              <li>Trong 3 giây đếm ngược, <strong>nhanh tay bấm đổi sang Bob</strong>!</li>
              <li>Quan sát thông báo alert bật lên khi hết giờ:</li>
            </ol>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#090d16', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Trạng thái hiện tại trên giao diện:</div>
              <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '1.1rem' }}>
                Người nhận đang chọn: {to}
              </div>
              {isSending && (
                <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  ⚡ Snapshot đang bay trong mạng: Đích đến = <strong>{mode === 'react' ? 'Alice (Bảo toàn)' : 'Nguy cơ bị đổi!'}</strong>
                </div>
              )}
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '1rem' }}>
            *Tính năng này giúp các hệ thống chat, chuyển khoản ngân hàng và đặt đơn hàng không bao giờ bị gửi sai đối tượng.
          </div>
        </div>
      </div>

      {/* Chat Logs */}
      {chatLogs.length > 0 && (
        <div className="console-box" style={{ marginTop: '1.5rem' }}>
          <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Lịch Sử Gửi Tin Nhắn:
          </div>
          {chatLogs.map((log, i) => (
            <div key={i} className="log-entry">
              <span className="log-text">{log}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
