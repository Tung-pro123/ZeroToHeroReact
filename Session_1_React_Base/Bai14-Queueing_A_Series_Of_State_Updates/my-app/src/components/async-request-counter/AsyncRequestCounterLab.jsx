import { useState } from 'react';
import InfoBox from '../common/InfoBox';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function AsyncRequestCounterLab() {
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [mode, setMode] = useState('buggy'); // 'buggy' | 'fixed'
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    const time = new Date().toLocaleTimeString();
    setLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 6)]);
  };

  const handleBuy = async () => {
    if (mode === 'buggy') {
      // ❌ Bản lỗi kinh điển từ React Docs:
      addLog(`[BẢN LỖI] Click Buy! pending đang là ${pending}`);
      setPending(pending + 1);
      await delay(3000);
      // Biến pending bị kẹt ở Snapshot lúc click!
      setPending(pending - 1);
      setCompleted(completed + 1);
      addLog(`[BẢN LỖI] Xong 3s! setPending(${pending} - 1 = ${pending - 1})`);
    } else {
      // ✅ Bản chuẩn dùng Updater Function:
      addLog(`[BẢN CHUẨN] Click Buy! Tăng pending an toàn với p => p + 1`);
      setPending((p) => p + 1);
      await delay(3000);
      // Luôn lấy giá trị thực tế sau 3 giây
      setPending((p) => p - 1);
      setCompleted((c) => c + 1);
      addLog(`[BẢN CHUẨN] Xong 3s! Giảm pending an toàn với p => p - 1`);
    }
  };

  const handleReset = () => {
    setPending(0);
    setCompleted(0);
    setLogs([]);
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🛒 Thử Thách 1: Giỏ Hàng Mua Sắm Bất Đồng Bộ</h2>
        <p className="lab-card-desc">
          Tái hiện thử thách kinh điển trong React Docs: Thao tác bấm nút "Mua Hàng" nhanh liên tục để thấy lỗi số lượng bị âm khi không dùng Updater Function.
        </p>
      </div>

      <InfoBox type={mode === 'buggy' ? 'warning' : 'tip'} title={mode === 'buggy' ? 'Đang bật Bản Lỗi (Snapshot Bug)' : 'Đang bật Bản Chuẩn (Updater Function)'}>
        {mode === 'buggy'
          ? 'Bấm nút "Mua hàng" thật nhanh 3-4 lần liên tiếp. Sau 3 giây bạn sẽ thấy số đơn đang xử lý bị tụt xuống SỐ ÂM do kẹt snapshot!'
          : 'Với Updater Function, React luôn lấy pending state mới nhất tại thời điểm callback thức giấc, đảm bảo số lượng luôn chính xác.'}
      </InfoBox>

      {/* Mode Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Chọn chế độ xử lý code:</span>
        <button
          className={`btn ${mode === 'buggy' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setMode('buggy')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ❌ Bản Lỗi: setPending(pending - 1)
        </button>
        <button
          className={`btn ${mode === 'fixed' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setMode('fixed')}
          style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
        >
          ✅ Bản Chuẩn: setPending(p =&gt; p - 1)
        </button>
      </div>

      {/* Dashboard Stats */}
      <div className="cart-dashboard">
        <div className="stat-widget" style={{ borderColor: pending < 0 ? '#ef4444' : '#38bdf8' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Đơn hàng đang xử lý (Pending):</div>
          <div className="stat-val" style={{ color: pending < 0 ? '#ef4444' : '#38bdf8' }}>
            {pending}
          </div>
          {pending < 0 && (
            <div style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>
              🚨 LỖI NGHIÊM TRỌNG: SỐ ÂM!
            </div>
          )}
        </div>

        <div className="stat-widget" style={{ borderColor: '#10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Đơn hàng hoàn tất (Completed):</div>
          <div className="stat-val" style={{ color: '#10b981' }}>
            {completed}
          </div>
          <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Mỗi đơn trễ 3 giây</div>
        </div>
      </div>

      {/* Code Display */}
      <div style={{ margin: '1rem 0' }}>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Đoạn code đang chạy bên trong hàm onClick:</span>
        <pre className="code-pill">
{mode === 'buggy'
  ? `async function handleBuy() {\n  setPending(pending + 1);\n  await delay(3000);\n  setPending(pending - 1); // ❌ Kẹt Snapshot cũ!\n  setCompleted(completed + 1);\n}`
  : `async function handleBuy() {\n  setPending(p => p + 1);  // ✅ Luôn lấy giá trị mới nhất\n  await delay(3000);\n  setPending(p => p - 1);  // ✅ Tính từ giá trị thực sau 3s\n  setCompleted(c => c + 1);\n}`}
        </pre>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1.5rem 0' }}>
        <button className="btn btn-primary" onClick={handleBuy} style={{ fontSize: '1.05rem', padding: '0.85rem 2rem' }}>
          🛍️ Bấm Mua Hàng (Delay 3s)
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          🔄 Reset Số Liệu
        </button>
      </div>

      {/* Logs */}
      {logs.length > 0 && (
        <div className="console-box">
          <div style={{ color: '#38bdf8', fontWeight: 600, marginBottom: '0.4rem' }}>
            📜 Nhật Ký Xử Lý Đơn Hàng:
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
