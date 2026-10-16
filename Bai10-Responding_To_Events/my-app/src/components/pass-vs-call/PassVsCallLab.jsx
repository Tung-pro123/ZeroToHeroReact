import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function PassVsCallLab() {
  const [correctClicks, setCorrectClicks] = useState(0);
  const [renderRunCount, setRenderRunCount] = useState(1);
  const [logs, setLogs] = useState([
    { id: 1, text: '🔄 Render Phase: Component được render lần đầu.', type: 'render' },
    { id: 2, text: '⚠️ [SAI] handleClick() bị gọi tự động ngay trong lúc Render!', type: 'wrong' },
  ]);

  const addLog = (text, type = 'info') => {
    setLogs((prev) => [
      { id: Date.now(), text: `[${new Date().toLocaleTimeString()}] ${text}`, type },
      ...prev.slice(0, 7)
    ]);
  };

  // Hàm đúng: Chỉ chạy khi click
  const handleCorrectClick = () => {
    setCorrectClicks((c) => c + 1);
    addLog('✅ [ĐÚNG] handleCorrectClick được kích hoạt bởi hành động Click thật của người dùng!', 'correct');
  };

  // Hàm với tham số
  const handleParamClick = (name) => {
    addLog(`🎯 [ĐÚNG] Click với tham số: "Xin chào, ${name}!" thông qua Arrow Function: () => handleClick("${name}")`, 'param');
  };

  // Mô phỏng bấm nút bị lỗi
  const handleBrokenClickSimulation = () => {
    addLog('❌ Nút bấm bị LIỆT! onClick nhận giá trị "undefined" do hàm đã chạy trước từ lúc render!', 'wrong');
  };

  const handleSimulateReRender = () => {
    setRenderRunCount((c) => c + 1);
    addLog(`🔄 Kích hoạt Re-render lần ${renderRunCount + 1}! Nút sai lại tự động chạy hàm trong render!`, 'render');
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">⚠️ Cạm Bẫy Chí Mạng: Truyền Hàm (Pass) vs Thực Thi Hàm (Call)</h2>
          <p className="card-desc">
            Phân tích lỗi phổ biến nhất của người mới học React: Đặt dấu ngoặc tròn <code>()</code> khiến hàm chạy 
            ngay trong pha Render thay vì chờ người dùng click.
          </p>
        </div>
      </div>

      <div className="grid-2">
        {/* So sánh 2 cách viết */}
        <div className="compare-box highlight">
          <h3 className="compare-title"><span>🧪</span> Trải Nghiệm Tương Tác Trực Tiếp</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
            {/* Nút 1: ĐÚNG */}
            <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: '#34d399', marginBottom: '0.4rem' }}>
                1. Cách ĐÚNG: <code>onClick=&#123;handleClick&#125;</code>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                Truyền tham chiếu hàm (Function Reference). Hàm chỉ chạy khi bạn thực sự bấm nút.
              </p>
              <button className="btn-primary" onClick={handleCorrectClick}>
                Bấm vào tôi (Đã click: {correctClicks})
              </button>
            </div>

            {/* Nút 2: SAI */}
            <div style={{ padding: '1rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: '#fb7185', marginBottom: '0.4rem' }}>
                2. Cách SAI: <code>onClick=&#123;handleClick()&#125;</code>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                Có dấu <code>()</code>: Hàm tự kích hoạt ngay khi trang vừa tải xong, và để lại giá trị <code>undefined</code>.
              </p>
              <button
                className="btn-danger"
                onClick={handleBrokenClickSimulation}
                style={{ cursor: 'not-allowed', opacity: 0.8 }}
              >
                Nút Bị Liệt (Bấm thử sẽ thấy không tăng gì)
              </button>
            </div>

            {/* Nút 3: Có tham số */}
            <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px' }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '0.4rem' }}>
                3. Muốn truyền tham số? Dùng: <code>onClick=&#123;() =&gt; handleClick('Tùng')&#125;</code>
              </div>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.75rem' }}>
                Bọc trong một Arrow Function ẩn danh để trì hoãn việc gọi hàm cho đến khi click.
              </p>
              <button
                className="btn-secondary"
                onClick={() => handleParamClick('Tùng Dev')}
                style={{ borderColor: 'rgba(56, 189, 248, 0.5)', color: '#38bdf8' }}
              >
                Gửi tham số 'Tùng Dev' 🚀
              </button>
            </div>

            <button
              className="btn-secondary"
              onClick={handleSimulateReRender}
              style={{ fontSize: '0.85rem', padding: '0.5rem' }}
            >
              🔄 Kích hoạt Re-render Component để kiểm chứng
            </button>
          </div>
        </div>

        {/* Cửa sổ Log thời gian thực */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>📜</span> Nhật Ký Thực Thi Sự Kiện (Live Log)</h3>
            <button
              className="btn-secondary"
              onClick={() => setLogs([])}
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Xóa log
            </button>
          </div>

          <div className="event-logger">
            {logs.map((log) => {
              let cls = 'log-entry child';
              if (log.type === 'wrong') cls = 'log-entry stopped';
              if (log.type === 'correct') cls = 'log-entry parent';
              if (log.type === 'render') cls = 'log-entry grandparent';

              return (
                <div key={log.id} className={cls}>
                  <span>{log.text}</span>
                </div>
              );
            })}
          </div>

          <InfoBox title="Quy tắc ghi nhớ nhanh">
            <ul>
              <li><strong>ĐÚNG:</strong> <code>onClick=&#123;handleClick&#125;</code> (Gửi địa chỉ nhà để khi nào cần thì tới).</li>
              <li><strong>SAI:</strong> <code>onClick=&#123;handleClick()&#125;</code> (Tới nhà ngay lập tức dù chưa ai mời).</li>
              <li><strong>CÓ THAM SỐ:</strong> <code>onClick=&#123;() =&gt; handleClick(id)&#125;</code>.</li>
            </ul>
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
