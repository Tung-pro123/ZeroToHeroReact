// ========================================================================================
// FILE: src/components/side-effects/SideEffectPlacementDemo.jsx
// ========================================================================================
// KIẾN THỨC BÀI 8 (MỤC 5): NƠI CẤP PHÉP CHO CÁC TÁC DỤNG PHỤ (SIDE EFFECTS)
// ========================================================================================

import { useState } from 'react';
import Card from '../common/Card';

export default function SideEffectPlacementDemo() {
  const [logs, setLogs] = useState([]);
  const [orderStatus, setOrderStatus] = useState('Chưa đặt hàng');

  // VỊ TRÍ 1: HÀM XỬ LÝ SỰ KIỆN (EVENT HANDLER)
  // Chỉ chạy KHI NGƯỜI DÙNG BẤM NÚT (Sau khi render đã hoàn tất 100%)
  // Được phép "không tinh khiết", thoải mái gọi API, lưu dữ liệu, sửa đổi thế giới bên ngoài!
  const handlePlaceOrder = () => {
    setOrderStatus('Đã đặt hàng thành công!');
    setLogs(prev => [ 
      ...prev,
      `[${new Date().toLocaleTimeString()}] ✅ Event Handler kích hoạt: Gửi API đặt hàng lên Spring Boot server!`
    ]);
  };

  const handleClearLogs = () => {
    setLogs([]);
    setOrderStatus('Chưa đặt hàng');
  };

  return (
    <div className="demo-section">
      <div className="section-intro">
        <span className="badge-pill accent">Mục 5: Quy Hoạch Kiến Trúc</span>
        <h2 className="section-title">Side Effects Đặt Ở Đâu? (Ẩn Dụ Kiến Trúc Sư)</h2>
        <p className="section-desc">
          Render chỉ là quá trình vẽ bản thiết kế. Mọi hành vi đập tường thật (Side Effects) 
          chỉ được phép diễn ra ở <strong>Event Handlers</strong> hoặc <strong>useEffect</strong>.
        </p>
      </div>

      <div className="architect-analogy-grid">
        <Card title="🏛️ Quá Trình Render (Kiến Trúc Sư)" variant="cyan">
          <div className="analogy-card-content">
            <div className="analogy-icon">📐</div>
            <h4>Vẽ Bản Thảo Trên Giấy</h4>
            <p>
              Kiến trúc sư ngồi trong phòng, cầm bút chì tính toán và vẽ ra cây JSX.
              <strong> Phải tinh khiết 100%:</strong> Không được gọi API, không sửa DOM thật, không trừ tiền thẻ tín dụng trong lúc vẽ!
            </p>
          </div>
        </Card>

        <Card title="🔨 Quá Trình Side Effect (Thợ Thi Công)" variant="indigo">
          <div className="analogy-card-content">
            <div className="analogy-icon">🏗️</div>
            <h4>Đập Tường, Xây Nhà Thật</h4>
            <p>
              Chỉ diễn ra khi:
              <br />
              1. <strong>Người dùng bấm nút (Event Handler):</strong> Khách duyệt thi công.
              <br />
              2. <strong>useEffect:</strong> Sau khi ngôi nhà đã dựng khung xong xuôi trên màn hình.
            </p>
          </div>
        </Card>
      </div>

      {/* Demo tương tác thực tế với Event Handler */}
      <Card title="Thực Hành: Nút Bấm Đặt Hàng (Event Handler An Toàn)" variant="default">
        <div className="interactive-event-box">
          <div className="order-status-row">
            <span>Trạng thái đơn hàng: </span>
            <strong className={orderStatus.includes('thành công') ? 'text-success' : 'text-muted'}>
              {orderStatus}
            </strong>
          </div>

          <div className="btn-actions-row">
            <button className="action-btn primary" onClick={handlePlaceOrder}>
              🛒 Bấm Mua Hàng (Kích Hoạt Event Handler)
            </button>
            <button className="action-btn secondary" onClick={handleClearLogs}>
              🧹 Xóa Lịch Sử Log
            </button>
          </div>

          <div className="log-console-screen">
            <div className="console-title">Nhật Ký Tác Dụng Phụ (Side Effect Logs):</div>
            {logs.length === 0 ? (
              <span className="empty-log-placeholder">Chưa có sự kiện nào. Hãy bấm nút "Mua Hàng"!</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className="log-line-item">{log}</div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
