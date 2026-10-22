import { useState, useRef } from 'react';
import InfoBox from '../common/InfoBox';

export default function BatchingWaiterLab() {
  const [food, setFood] = useState('Chưa gọi món');
  const [drink, setDrink] = useState('Chưa gọi đồ uống');
  const [dessert, setDessert] = useState('Chưa gọi tráng miệng');
  const [logs, setLogs] = useState([]);

  // Đếm số lần component thật sự render
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 6)]);
  };

  const handleOrderAllAtOnce = () => {
    addLog('🛎️ Bắt đầu gọi món... Bồi bàn bắt đầu ghi phiếu!');
    setFood('🍕 Pizza Hải Sản');
    setDrink('🥤 Coca-Cola Tươi');
    setDessert('🍨 Kem Vani');
    addLog('📝 Đã gọi 3 lệnh setState liên tiếp! Nhưng chưa render ngay...');
  };

  const handleAsyncBatching = () => {
    addLog('⏳ Bắt đầu gọi món bất đồng bộ (sau 1.5s delay)...');
    setTimeout(() => {
      // Trong React 18, 3 lệnh này nằm trong setTimeout VẪN ĐƯỢC GOM CỤM (Automatic Batching)!
      setFood('🥩 Bít Tết Thăn Bò');
      setDrink('🍷 Rượu Vang Đỏ');
      setDessert('🍰 Bánh Tiramisu');
      addLog('⚡ React 18 Automatic Batching: Gom cả 3 state trong setTimeout thành 1 lần render duy nhất!');
    }, 1500);
  };

  const handleReset = () => {
    setFood('Chưa gọi món');
    setDrink('Chưa gọi đồ uống');
    setDessert('Chưa gọi tráng miệng');
    setLogs([]);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🧑‍🍳 Bồi Bàn & Cơ Chế Gom Cụm (Batching)</h2>
        <p className="lab-card-desc">
          Quan sát cách React gom nhiều câu lệnh <code>setState</code> lại để render đúng một lần duy nhất, tối ưu hóa hiệu năng tối đa.
        </p>
      </div>

      <InfoBox type="tip" title="Ẩn Dụ Người Bồi Bàn (The Waiter)">
        Người bồi bàn không chạy vào bếp 3 lần khi bạn gọi 3 món. Họ ghi chép toàn bộ vào phiếu, 
        khi bạn nói xong mới mang vào bếp giao việc 1 lần duy nhất!
      </InfoBox>

      {/* Render Counter Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0' }}>
        <div style={{ background: '#1e293b', border: '1px solid #38bdf8', padding: '0.6rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.2rem' }}>⚡</span>
          <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>Số lần Component đã Render:</span>
          <strong style={{ color: '#38bdf8', fontSize: '1.3rem', fontFamily: 'var(--font-mono)' }}>
            {renderCountRef.current}
          </strong>
        </div>
      </div>

      {/* Waiter Notepad Display */}
      <div className="waiter-notepad">
        <span className="notepad-badge">📋 Phiếu Gọi Món Của Bồi Bàn (Current State)</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem' }}>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Món chính (food):</div>
            <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem', marginTop: '0.2rem' }}>{food}</div>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Đồ uống (drink):</div>
            <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem', marginTop: '0.2rem' }}>{drink}</div>
          </div>
          <div style={{ background: '#0f172a', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tráng miệng (dessert):</div>
            <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1.1rem', marginTop: '0.2rem' }}>{dessert}</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-primary" onClick={handleOrderAllAtOnce}>
          🍽️ Gọi 3 món trong 1 Event Handler (Batching)
        </button>
        <button className="btn btn-secondary" onClick={handleAsyncBatching}>
          ⏱️ Gọi 3 món trong setTimeout (React 18 Auto Batching)
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          🔄 Reset Thực Đơn
        </button>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="console-box">
          <div style={{ color: '#a855f7', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Nhật Ký Hoạt Động Của Bồi Bàn:
          </div>
          {logs.map((log, i) => (
            <div key={i} className="log-entry">
              <span>{log}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
