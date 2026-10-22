import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

// Child Component sử dụng forwardRef và useImperativeHandle
const CustomFormInput = forwardRef(function CustomFormInput({ label, placeholder }, ref) {
  const realInputRef = useRef(null);
  const [isShaking, setIsShaking] = useState(false);

  // Đóng gói API: Chỉ mở các phương thức an toàn cho component Cha!
  useImperativeHandle(ref, () => ({
    focusInput() {
      realInputRef.current.focus();
    },
    clearInput() {
      realInputRef.current.value = '';
    },
    shakeEffect() {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 600);
      realInputRef.current.focus();
    },
  }));

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>
        {label}
      </label>
      <input
        ref={realInputRef}
        type="text"
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          border: isShaking ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.2)',
          background: '#0a0e1a',
          color: '#fff',
          fontSize: '0.95rem',
          outline: 'none',
          animation: isShaking ? 'shake 0.5s ease' : 'none',
          transition: 'border-color 0.2s',
        }}
      />
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-8px); }
          40%, 80% { transform: translateX(8px); }
        }
      `}</style>
    </div>
  );
});

export default function ForwardRefImperativeLab() {
  const customInputRef = useRef(null);

  const handleFocus = () => {
    customInputRef.current.focusInput();
  };

  const handleClear = () => {
    customInputRef.current.clearInput();
  };

  const handleTriggerError = () => {
    customInputRef.current.shakeEffect();
  };

  return (
    <div className="tab-pane">
      <div className="lab-card">
        <div className="lab-header">
          <h2 className="lab-title">🛡️ Đóng Gói API Với forwardRef & useImperativeHandle</h2>
          <p className="lab-desc">
            Theo mặc định, React bảo vệ tính đóng gói của Component con, không cho phép Component cha tự do chọc vào thẻ DOM bên trong. Khi cần thiết, ta dùng <strong>forwardRef</strong> và giới hạn phạm vi qua <strong>useImperativeHandle</strong>.
          </p>
        </div>

        <div className="grid-2">
          {/* Live Form */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '1.5rem',
          }}>
            <h3 style={{ color: '#38bdf8', marginBottom: '1rem', fontSize: '1.1rem' }}>
              Giao Diện Form Đăng Ký
            </h3>

            <CustomFormInput
              ref={customInputRef}
              label="Mã Khuyến Mãi / Voucher Code"
              placeholder="Nhập mã giảm giá (ví dụ: REACT2026)..."
            />

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <button className="btn btn-primary" onClick={handleFocus}>
                🎯 Focus Con
              </button>
              <button className="btn btn-danger" onClick={handleTriggerError}>
                📳 Rung Báo Lỗi (Shake)
              </button>
              <button className="btn btn-outline" onClick={handleClear}>
                🧹 Xóa Trắng
              </button>
            </div>
          </div>

          {/* Explanation */}
          <div style={{
            background: 'rgba(99, 102, 241, 0.04)',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            padding: '1.5rem',
          }}>
            <span className="badge badge-indigo">Nguyên Lý Đóng Gói (Encapsulation)</span>
            <p style={{ margin: '0.75rem 0', fontSize: '0.85rem', color: '#cbd5e1' }}>
              Tại sao không đưa thẳng <code>realInputRef</code> ra ngoài?
            </p>
            <ul style={{ paddingLeft: '1.2rem', fontSize: '0.82rem', color: '#94a3b8', lineHeight: '1.8' }}>
              <li>Nếu cha cầm DOM thật, cha có thể xóa class, đổi style lung tung, phá vỡ thiết kế của con.</li>
              <li><code>useImperativeHandle</code> hoạt động như một <strong>Tường Lửa / Interface</strong>: Chỉ cấp quyền cho cha gọi đúng 3 hàm <code>focusInput()</code>, <code>clearInput()</code>, và <code>shakeEffect()</code>.</li>
            </ul>

            <div className="code-box" style={{ fontSize: '0.78rem', marginTop: '1rem' }}>
              <pre>{`useImperativeHandle(ref, () => ({
  focusInput() { ... },
  clearInput() { ... },
  shakeEffect() { ... }
}));`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
