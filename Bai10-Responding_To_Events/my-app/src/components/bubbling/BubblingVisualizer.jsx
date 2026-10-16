import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function BubblingVisualizer() {
  const [stopBubble, setStopBubble] = useState(true);
  const [logs, setLogs] = useState([]);
  const [likes, setLikes] = useState(42);

  const addLog = (level, message, type) => {
    setLogs((prev) => [
      { id: Date.now() + Math.random(), time: new Date().toLocaleTimeString(), level, message, type },
      ...prev.slice(0, 8)
    ]);
  };

  const handleGrandparentClick = () => {
    addLog('Ông (Toolbar)', '🌊 Sự kiện sủi bọt tới tầng cao nhất: Toolbar onClick được gọi!', 'grandparent');
  };

  const handleParentClick = (e) => {
    addLog('Cha (PostCard)', '🌊 Sự kiện sủi bọt tới tầng giữa: PostCard onClick được gọi (Xem chi tiết bài viết)!', 'parent');
  };

  const handleLikeClick = (e) => {
    if (stopBubble) {
      e.stopPropagation();
      addLog('Con (LikeButton)', '❤️ Thích bài viết! [⛔ Đã gọi e.stopPropagation(): Sự kiện DỪNG tại đây, không sủi bọt lên Card và Toolbar]', 'child');
    } else {
      addLog('Con (LikeButton)', '❤️ Thích bài viết! [⚠️ KHÔNG dùng stopPropagation: Sự kiện bắt đầu sủi bọt ngược lên trên...]', 'child');
    }
    setLikes((l) => l + 1);
  };

  const handleDeleteClick = (e) => {
    if (stopBubble) {
      e.stopPropagation();
      addLog('Con (DeleteButton)', '🗑️ Bấm nút Xóa! [⛔ Đã dừng sủi bọt, thẻ Card không bị kích hoạt mở xem chi tiết]', 'stopped');
    } else {
      addLog('Con (DeleteButton)', '🗑️ Bấm nút Xóa! [⚠️ Lỗi nghiệp vụ: Vừa xóa bài, vừa bị kích hoạt mở xem chi tiết bài do sủi bọt!]', 'stopped');
    }
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">🌊 Cơ Chế Sủi Bọt Sự Kiện &amp; Hàm stopPropagation()</h2>
          <p className="card-desc">
            Trong cây DOM, sự kiện click trên phần tử con sẽ tự động lan truyền (bubble) lên tất cả các phần tử cha. 
            Sử dụng <code>e.stopPropagation()</code> để ngăn chặn hiện tượng kích hoạt nhầm.
          </p>
        </div>
        <label className="toggle-wrapper" style={{ cursor: 'pointer' }}>
          <span className="toggle-label">Bật e.stopPropagation():</span>
          <input
            type="checkbox"
            checked={stopBubble}
            onChange={(e) => setStopBubble(e.target.checked)}
            style={{ width: '1.2rem', height: '1.2rem', accentColor: '#f59e0b', cursor: 'pointer' }}
          />
          <span style={{ fontWeight: 700, color: stopBubble ? '#34d399' : '#fb7185', fontSize: '0.88rem' }}>
            {stopBubble ? 'BẬT (An toàn)' : 'TẮT (Sủi bọt tự do)'}
          </span>
        </label>
      </div>

      <div className="grid-2">
        {/* Khung trực quan hóa 3 tầng lồng nhau */}
        <div>
          <h3 className="compare-title"><span>🎯</span> Mô Hình 3 Cấp Thẻ Lồng Nhau</h3>

          <div className="bubble-grandparent" onClick={handleGrandparentClick}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.95rem' }}>
                🏢 Thẻ Ông: &lt;div class="toolbar-container"&gt;
              </span>
              <span className="badge badge-event" style={{ fontSize: '0.72rem' }}>Cấp 3</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.25rem' }}>
              Click vào vùng ngoài này sẽ kích hoạt chọn Toolbar.
            </p>

            {/* Thẻ Cha */}
            <div className="bubble-parent" onClick={handleParentClick}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#818cf8', fontWeight: 700, fontSize: '0.95rem' }}>
                  📑 Thẻ Cha: &lt;div class="post-card"&gt;
                </span>
                <span className="badge badge-react" style={{ fontSize: '0.72rem' }}>Cấp 2</span>
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '0.5rem 0' }}>
                "Lập trình React không khó nếu bạn hiểu rõ bản chất luồng sự kiện và cấu trúc cây."
              </p>

              {/* Thẻ Con */}
              <div className="bubble-child">
                <button className="btn-primary" onClick={handleLikeClick} style={{ fontSize: '0.85rem' }}>
                  ❤️ Thích ({likes})
                </button>

                <button className="btn-danger" onClick={handleDeleteClick} style={{ fontSize: '0.85rem' }}>
                  🗑️ Xóa Bài Viết
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.88rem', color: '#9ca3af' }}>
            💡 <strong>Thử nghiệm:</strong> Bấm nút <em>Thích</em> hoặc <em>Xóa</em> khi <strong>TẮT</strong> stopPropagation 
            để thấy cả 3 tầng đều bị kích hoạt liên tiếp! Sau đó <strong>BẬT</strong> lên để kiểm chứng sự khác biệt.
          </div>
        </div>

        {/* Nhật ký lan truyền */}
        <div className="compare-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 className="compare-title"><span>📜</span> Nhật Ký Lan Truyền (Propagation Log)</h3>
            <button className="btn-secondary" onClick={() => setLogs([])} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}>
              Xóa log
            </button>
          </div>

          <div className="event-logger" style={{ minHeight: '220px' }}>
            {logs.length === 0 ? (
              <div style={{ color: '#6b7280', textAlign: 'center', paddingTop: '2rem' }}>
                Chưa có sự kiện nào. Hãy click vào các nút hoặc thẻ bên trái!
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className={`log-entry ${log.type}`}>
                  <span style={{ color: '#6b7280', fontSize: '0.75rem' }}>[{log.time}]</span>
                  <strong>[{log.level}]</strong>
                  <span>{log.message}</span>
                </div>
              ))
            )}
          </div>

          <InfoBox type="spring" title="Đối chiếu Spring Filter Chain">
            Trong Spring Web, khi Request đi qua một chuỗi Filter, nếu một Filter không gọi <code>chain.doFilter(req, res)</code> 
            mà trả về response ngay lập tức, Request sẽ bị <strong>ngắt chuỗi (short-circuit)</strong>. 
            <code>e.stopPropagation()</code> trong React hoạt động với triết lý ngắt chuỗi tương tự!
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
