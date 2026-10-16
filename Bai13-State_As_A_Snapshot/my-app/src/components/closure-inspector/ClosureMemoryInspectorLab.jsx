import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function ClosureMemoryInspectorLab() {
  const [score, setScore] = useState(0);
  const [pendingTimers, setPendingTimers] = useState([]);
  const [history, setHistory] = useState([]);

  const scheduleAlert = () => {
    const timerId = Date.now();
    const capturedScore = score;
    const delay = 4; // 4 seconds

    const newTimer = {
      id: timerId,
      capturedScore,
      secondsLeft: delay,
      createdAt: new Date().toLocaleTimeString(),
    };

    setPendingTimers((prev) => [...prev, newTimer]);
    setHistory((prev) => [
      `⏰ Đã đóng gói Snapshot [Score = ${capturedScore}] vào Closure với hẹn giờ 4s.`,
      ...prev,
    ]);

    // Interval for countdown
    const countdown = setInterval(() => {
      setPendingTimers((prev) =>
        prev.map((t) => (t.id === timerId ? { ...t, secondsLeft: t.secondsLeft - 1 } : t))
      );
    }, 1000);

    setTimeout(() => {
      clearInterval(countdown);
      setPendingTimers((prev) => prev.filter((t) => t.id !== timerId));
      setHistory((prev) => [
        `🔔 [HẾT GIỜ] Closure thức giấc: Đọc biến score được lưu trong snapshot = ${capturedScore} (Mặc dù score hiện tại ngoài màn hình có thể đã khác!)`,
        ...prev,
      ]);
      alert(`🔔 THÔNG BÁO TỪ QUÁ KHỨ!\nGiá trị score khi bạn đặt hẹn giờ là: ${capturedScore}`);
    }, delay * 1000);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎞️ Bộ Soi Khung Ảnh (Render Frames & Closure)</h2>
        <p className="lab-card-desc">
          Quan sát trực quan cách JavaScript Closure "bắt giữ" và lưu trữ một Snapshot của State trong bộ nhớ Web APIs.
        </p>
      </div>

      <InfoBox type="info" title="Bản Chất JavaScript Closure">
        Mỗi lần Render sinh ra một hàm component mới cùng các biến độc lập. Khi bạn gọi <code>setTimeout</code>, 
        hàm callback tạo một Closure bao quanh các biến của lần render đó. Nó không quan tâm các lần render sau này có giá trị bao nhiêu.
      </InfoBox>

      {/* Live State & Schedule Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', margin: '1.5rem 0' }}>
        {/* Current State Frame */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
            🖥️ FRAME HIỆN TẠI TRÊN MÀN HÌNH:
          </div>
          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
            {score}
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.5rem 0 1rem' }}>
            Bấm tăng số liên tục sau khi đã hẹn giờ:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setScore((s) => s + 1)}>
              ➕ Tăng Score (+1)
            </button>
            <button className="btn btn-secondary" onClick={() => setScore(0)}>
              Reset về 0
            </button>
          </div>
        </div>

        {/* Action scheduler */}
        <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ color: '#a855f7', marginBottom: '0.5rem' }}>📸 Chụp Snapshot & Hẹn Giờ 4s</h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.6' }}>
              Khi bấm nút dưới, một timer 4 giây sẽ được gửi vào hàng đợi của trình duyệt. 
              Nó sẽ đóng băng giá trị <strong>score = {score}</strong> vào Closure.
            </p>
          </div>

          <button
            className="btn"
            style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', color: 'white', marginTop: '1rem' }}
            onClick={scheduleAlert}
          >
            ⏱️ Hẹn Giờ Thông Báo (Chụp Score = {score})
          </button>
        </div>
      </div>

      {/* Pending Closures in Memory */}
      <div style={{ margin: '1.5rem 0' }}>
        <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📦</span>
          <span>Các Closures Đang Nằm Chờ Trong Bộ Nhớ Trình Duyệt ({pendingTimers.length}):</span>
        </h4>

        {pendingTimers.length === 0 ? (
          <div style={{ padding: '1rem', background: '#0f172a', borderRadius: '8px', color: '#64748b', textAlign: 'center', fontSize: '0.9rem' }}>
            Không có timer nào đang chạy. Hãy bấm nút hẹn giờ ở trên!
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {pendingTimers.map((t) => (
              <div
                key={t.id}
                style={{
                  background: '#090d16',
                  border: '1px solid #f59e0b',
                  borderRadius: '10px',
                  padding: '1rem',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                  <span>Tạo lúc: {t.createdAt}</span>
                  <span style={{ color: '#f59e0b', fontWeight: 700 }}>⏳ {t.secondsLeft}s</span>
                </div>
                <div style={{ margin: '0.5rem 0', fontSize: '1rem', color: '#f8fafc' }}>
                  Đã khóa giá trị: <strong style={{ color: '#38bdf8', fontSize: '1.2rem' }}>score = {t.capturedScore}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Sẽ hiển thị <code>alert({t.capturedScore})</code> bất kể màn hình hiện tại là bao nhiêu!
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="console-box">
          <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Nhật Ký Sự Kiện Closure:
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
