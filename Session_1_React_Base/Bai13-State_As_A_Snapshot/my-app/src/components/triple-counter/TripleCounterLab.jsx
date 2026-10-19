import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function TripleCounterLab() {
  const [number, setNumber] = useState(0);
  const [logs, setLogs] = useState([]);
  const [lastAction, setLastAction] = useState(null);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 7)]);
  };

  // Case 1: Triple setNumber with value (The Trap)
  const handleTripleNaive = () => {
    setLastAction('naive');
    addLog(`Bắt đầu click (Bức ảnh hiện tại: number = ${number})`);
    
    setNumber(number + 1);
    addLog(`-> Gọi setNumber(${number} + 1)`);

    setNumber(number + 1);
    addLog(`-> Gọi setNumber(${number} + 1)`);

    setNumber(number + 1);
    addLog(`-> Gọi setNumber(${number} + 1)`);

    addLog(`Kết thúc click! Chuẩn bị Render tiếp theo với number = ${number + 1}`);
  };

  // Case 2: Local variable
  const handleLocalVariable = () => {
    setLastAction('local');
    const nextVal = number + 3;
    addLog(`Dùng biến cục bộ: const nextVal = ${number} + 3 = ${nextVal}`);
    setNumber(nextVal);
    addLog(`-> Gọi setNumber(${nextVal}) => Render tới sẽ có số ${nextVal}`);
  };

  // Case 3: Updater Function (Preview Bài 14)
  const handleUpdater = () => {
    setLastAction('updater');
    addLog(`Dùng Updater Function n => n + 1`);
    setNumber((n) => n + 1);
    setNumber((n) => n + 1);
    setNumber((n) => n + 1);
    addLog(`-> 3 hàm cập nhật được xếp hàng: +1, +1, +1 => Tăng +3`);
  };

  const handleReset = () => {
    setNumber(0);
    setLogs([]);
    setLastAction(null);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🔢 Thí Nghiệm Kinh Điển: Gọi setNumber 3 Lần</h2>
        <p className="lab-card-desc">
          Khám phá lý do tại sao gọi 3 lần <code className="code-pill" style={{ display: 'inline' }}>setNumber(number + 1)</code> chỉ tăng đúng 1 đơn vị.
        </p>
      </div>

      <InfoBox type="warning" title="Bản chất 'Phương pháp thế giá trị' (Substitution Method)">
        Tại lần render này, biến <code>number</code> có giá trị cố định là <strong>{number}</strong>.
        Dù bạn gọi <code>setNumber(number + 1)</code> bao nhiêu lần thì React chỉ nhận được giá trị tính sẵn là <code>setNumber({number} + 1)</code>.
      </InfoBox>

      {/* Snapshot Visualizer */}
      <div className="camera-lens-wrapper">
        <div className="snapshot-frame-badge">📸 Snapshot Hiện Tại: Render Frame #{number}</div>
        <div className="snapshot-big-number">{number}</div>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Biến <code>number</code> trong lần render này bị đóng băng vĩnh viễn ở giá trị <strong>{number}</strong>.
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-primary" onClick={handleTripleNaive}>
          💥 Cách 1: setNumber(number + 1) x 3
        </button>
        <button className="btn btn-secondary" onClick={handleLocalVariable}>
          💡 Cách 2: Biến cục bộ (next = number + 3)
        </button>
        <button className="btn btn-secondary" onClick={handleUpdater}>
          ✨ Cách 3: Updater Function n =&gt; n + 1 (Bài 14)
        </button>
        <button className="btn btn-danger" onClick={handleReset}>
          🔄 Reset về 0
        </button>
      </div>

      {/* Substitution Step Grid */}
      <div className="substitution-grid">
        <div className={`sub-step-card ${lastAction === 'naive' ? 'active' : ''}`}>
          <div className="sub-step-header">
            <strong>Bẫy Snapshot (Cách 1)</strong>
            <span className="sub-badge" style={{ background: '#ef4444', color: '#fff' }}>Chỉ tăng +1</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn bạn viết:</p>
          <code className="code-pill">setNumber(number + 1);<br />setNumber(number + 1);<br />setNumber(number + 1);</code>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>React thực tế nhận được:</p>
          <code className="code-pill" style={{ color: '#f87171' }}>
            setNumber({number} + 1); // = {number + 1}<br />
            setNumber({number} + 1); // = {number + 1}<br />
            setNumber({number} + 1); // = {number + 1}
          </code>
        </div>

        <div className={`sub-step-card ${lastAction === 'local' ? 'active' : ''}`}>
          <div className="sub-step-header">
            <strong>Biến Cục Bộ (Cách 2)</strong>
            <span className="sub-badge" style={{ background: '#10b981', color: '#fff' }}>Tăng đúng +3</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn chuẩn:</p>
          <code className="code-pill">
            const next = number + 3;<br />
            setNumber(next);
          </code>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.5rem' }}>Giải thích:</p>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
            Chủ động cộng 3 vào biến tạm trong JavaScript trước khi gửi snapshot mới cho React.
          </p>
        </div>

        <div className={`sub-step-card ${lastAction === 'updater' ? 'active' : ''}`}>
          <div className="sub-step-header">
            <strong>Updater Queue (Cách 3)</strong>
            <span className="sub-badge" style={{ background: '#a855f7', color: '#fff' }}>Tăng đúng +3</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Mã nguồn hàng đợi:</p>
          <code className="code-pill">
            setNumber(n =&gt; n + 1);<br />
            setNumber(n =&gt; n + 1);<br />
            setNumber(n =&gt; n + 1);
          </code>
          <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
            Đưa hàm vào hàng đợi chờ React xử lý tuần tự (nội dung chuyên sâu Bài 14).
          </p>
        </div>
      </div>

      {/* Execution Logs */}
      {logs.length > 0 && (
        <div className="console-box">
          <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Nhật Ký Thực Thi (Event Handler Console):
          </div>
          {logs.map((log, i) => (
            <div key={i} className="log-entry">
              <span className="log-text">{log}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
