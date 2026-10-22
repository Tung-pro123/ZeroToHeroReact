import { useState, useRef } from 'react';

export default function DebounceThrottleLab() {
  // 1. Debounce Search State & Ref
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isDebouncing, setIsDebouncing] = useState(false);
  const debounceTimerRef = useRef(null);

  // 2. Throttle Button State & Ref
  const [orderCount, setOrderCount] = useState(0);
  const [throttleMessage, setThrottleMessage] = useState('Chưa có đơn hàng nào');
  const lastClickTimeRef = useRef(0);

  // Handler for Debounce
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    setIsDebouncing(true);

    // Hủy timer cũ nếu người dùng còn đang gõ phím
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Thiết lập timer mới 600ms
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedValue(val);
      setIsDebouncing(false);
    }, 600);
  };

  // Handler for Throttle (Chống spam bấm nút 2000ms)
  const handlePlaceOrder = () => {
    const now = Date.now();
    const THROTTLE_LIMIT = 2000;

    if (now - lastClickTimeRef.current < THROTTLE_LIMIT) {
      const waitTime = Math.ceil((THROTTLE_LIMIT - (now - lastClickTimeRef.current)) / 1000);
      setThrottleMessage(`⚠️ Thao tác quá nhanh! Vui lòng chờ ${waitTime}s.`);
      return;
    }

    lastClickTimeRef.current = now;
    setOrderCount((c) => c + 1);
    setThrottleMessage(`✅ Đặt hàng thành công đơn #${orderCount + 1}!`);
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🛡️ Debounce & Throttle Engine: useRef Trong Thực Chiến</h2>
          <p className="lab-desc">
            Hai kỹ thuật tối ưu hiệu năng và bảo vệ Backend quan trọng nhất: Chống spam request bằng cách lưu
            Timer ID và Timestamp vào <strong>useRef</strong>.
          </p>
        </div>

        <div className="grid-2">
          {/* Feature 1: Debounced Search */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.04)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-cyan">1. Debounce Ô Tìm Kiếm (600ms)</span>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.75rem 0' }}>
              Chỉ gửi API Search khi người dùng đã ngừng gõ 600ms.
            </p>

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Nhập từ khóa tìm kiếm..."
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(0, 0, 0, 0.3)',
                color: '#fff',
                fontSize: '0.95rem',
                marginBottom: '1rem',
                outline: 'none',
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
              <span style={{ color: '#94a3b8' }}>Trạng thái:</span>
              <span style={{ color: isDebouncing ? '#f59e0b' : '#10b981', fontWeight: 'bold' }}>
                {isDebouncing ? '⏳ Đang chờ người dùng ngừng gõ...' : '✨ Sẵn sàng / Đã chốt từ khóa'}
              </span>
            </div>

            <div className="code-box" style={{ fontSize: '0.82rem' }}>
              <div>Giá trị tức thời (Input State): <span style={{ color: '#38bdf8' }}>"{searchTerm}"</span></div>
              <div style={{ marginTop: '0.4rem' }}>Giá trị gửi API (Debounced): <span style={{ color: '#34d399', fontWeight: 'bold' }}>"{debouncedValue}"</span></div>
            </div>
          </div>

          {/* Feature 2: Throttle Button */}
          <div style={{
            background: 'rgba(168, 85, 247, 0.04)',
            border: '1px solid rgba(168, 85, 247, 0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
          }}>
            <span className="badge badge-purple">2. Throttle Chống Spam Nút Đặt Hàng (2s)</span>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.75rem 0' }}>
              Chống tình trạng người dùng click liên tục làm trừ tiền 2 lần hoặc tạo nhiều đơn trùng lặp.
            </p>

            <button
              className="btn btn-primary"
              onClick={handlePlaceOrder}
              style={{
                width: '100%',
                padding: '0.85rem',
                background: 'linear-gradient(135deg, #a855f7, #6366f1)',
                marginBottom: '1rem',
              }}
            >
              💳 Đặt Mua Ngay (Bấm thử liên tục xem!)
            </button>

            <div style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(0, 0, 0, 0.25)',
              fontSize: '0.88rem',
              textAlign: 'center',
              color: throttleMessage.includes('⚠️') ? '#fca5a5' : '#86efac',
              border: '1px solid rgba(255, 255, 255, 0.05)',
            }}>
              {throttleMessage}
            </div>

            <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: '#94a3b8', textAlign: 'center' }}>
              Tổng số đơn hợp lệ đã xử lý: <strong style={{ color: '#c084fc' }}>{orderCount}</strong>
            </div>
          </div>
        </div>

        <div className="code-box" style={{ marginTop: '1.5rem' }}>
          <strong style={{ color: '#38bdf8' }}>Cơ chế hoạt động của `debounceTimerRef`:</strong>
          <pre style={{ marginTop: '0.5rem', color: '#cbd5e1', fontSize: '0.82rem' }}>
{`// Hủy timer cũ được lưu trong .current:
if (debounceTimerRef.current) {
  clearTimeout(debounceTimerRef.current);
}

// Lưu timer mới mà không làm component re-render:
debounceTimerRef.current = setTimeout(() => {
  setDebouncedValue(searchTerm);
}, 600);`}
          </pre>
        </div>
      </div>
    </div>
  );
}
