import { useState, useRef } from 'react';
import InfoBox from '../common/InfoBox';

export default function ControlledPlayground() {
  // --- CONTROLLED FORM STATE ---
  const [promoCode, setPromoCode] = useState('REACT2026');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [email, setEmail] = useState('student@fpt.edu.vn');
  const [controlledLog, setControlledLog] = useState('');

  // Live validation
  const isPromoValid = promoCode.trim().length >= 5;
  const isEmailValid = email.includes('@') && email.includes('.');
  const canSubmitControlled = isPromoValid && isEmailValid;

  const handlePromoChange = (e) => {
    // Tự động chuyển thành chữ in hoa và loại bỏ dấu cách
    const formatted = e.target.value.toUpperCase().replace(/\s+/g, '');
    if (formatted.length <= 12) {
      setPromoCode(formatted);
    }
  };

  const handleControlledSubmit = (e) => {
    e.preventDefault();
    setControlledLog(
      `✅ [CONTROLLED SUBMIT] Gửi thành công: Promo=${promoCode}, Giảm=${discountPercent}%, Email=${email} lúc ${new Date().toLocaleTimeString()}`
    );
  };

  // --- UNCONTROLLED FORM REFS ---
  const uncontrolledFormRef = useRef(null);
  const [uncontrolledLog, setUncontrolledLog] = useState('');

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(uncontrolledFormRef.current);
    const data = Object.fromEntries(formData.entries());
    setUncontrolledLog(
      `📦 [UNCONTROLLED SUBMIT] Đọc trực tiếp từ DOM: Promo=${data.rawPromo}, Giảm=${data.rawDiscount}%, Email=${data.rawEmail} lúc ${new Date().toLocaleTimeString()}`
    );
  };

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎛️ 4. Sân Chơi Đối Đầu: Controlled vs Uncontrolled Components</h2>
        <p className="lab-card-desc">
          Trải nghiệm sự khác biệt rõ rệt giữa việc để React nắm quyền kiểm soát dữ liệu từng phím gõ (Controlled) 
          và để trình duyệt tự quản lý giá trị DOM (Uncontrolled).
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* --- CỘT 1: CONTROLLED --- */}
        <div style={{ background: '#0d1527', border: '1px solid #10b981', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#34d399', fontWeight: 700 }}>
              🎮 1. Controlled Component
            </h3>
            <span className="badge badge-emerald">React State kiểm soát</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Mỗi phím gõ kích hoạt <code>onChange</code> -&gt; Update State -&gt; React re-render và ép ô input nhận lại <code>value</code>.
          </p>

          <form onSubmit={handleControlledSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', fontSize: '0.85rem' }}>
                <label style={{ color: '#e5e7eb', fontWeight: 600 }}>Mã Giảm Giá (Tự ép In Hoa):</label>
                <span style={{ color: promoCode.length === 12 ? '#fb7185' : '#9ca3af' }}>{promoCode.length}/12</span>
              </div>
              <input
                type="text"
                className="input-control"
                value={promoCode}
                onChange={handlePromoChange}
                placeholder="VD: REACT2026"
              />
              {!isPromoValid && (
                <div style={{ color: '#fb7185', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                  ⚠️ Mã giảm giá phải có ít nhất 5 ký tự
                </div>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                Mức Giảm (%):
              </label>
              <select
                className="input-control"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
              >
                <option value="10">10% - Khách hàng mới</option>
                <option value="20">20% - Sinh viên FPT</option>
                <option value="50">50% - VIP Flash Sale</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                Email Nhận Mã:
              </label>
              <input
                type="email"
                className="input-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
              />
              {!isEmailValid && (
                <div style={{ color: '#fb7185', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                  ⚠️ Định dạng email chưa hợp lệ
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={!canSubmitControlled}
              >
                {canSubmitControlled ? '🚀 Gửi Khuyến Mãi' : '⛔ Chưa Hợp Lệ'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setPromoCode('DISCOUNT50');
                  setDiscountPercent('50');
                  setEmail('admin@react.dev');
                }}
              >
                Tự Điền Mẫu
              </button>
            </div>
          </form>

          {controlledLog && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#082f49', borderRadius: '6px', fontSize: '0.8rem', color: '#7dd3fc', border: '1px solid #0284c7' }}>
              {controlledLog}
            </div>
          )}
        </div>

        {/* --- CỘT 2: UNCONTROLLED --- */}
        <div style={{ background: '#0d1527', border: '1px solid #374151', borderRadius: '12px', padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#cbd5e1', fontWeight: 700 }}>
              📦 2. Uncontrolled Component
            </h3>
            <span className="badge badge-amber">DOM tự quản lý</span>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#9ca3af', marginBottom: '1rem' }}>
            Dùng thuộc tính <code>defaultValue</code> ban đầu. Khi người dùng gõ, React không re-render. Dữ liệu chỉ được kéo ra khi Submit.
          </p>

          <form ref={uncontrolledFormRef} onSubmit={handleUncontrolledSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                Mã Giảm Giá (Gõ tùy ý, không tự in hoa):
              </label>
              <input
                type="text"
                name="rawPromo"
                className="input-control"
                defaultValue="SAVE10"
              />
              <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                ℹ️ Không thể ép kiểu in hoa hay giới hạn ký tự khi gõ
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                Mức Giảm (%):
              </label>
              <select name="rawDiscount" className="input-control" defaultValue="10">
                <option value="10">10% - Khách hàng mới</option>
                <option value="20">20% - Sinh viên FPT</option>
                <option value="50">50% - VIP Flash Sale</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', fontWeight: 600, marginBottom: '0.3rem' }}>
                Email Nhận Mã:
              </label>
              <input
                type="email"
                name="rawEmail"
                className="input-control"
                defaultValue="anonymous@guest.com"
              />
              <div style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                ℹ️ Không thể disable nút Submit theo thời gian thực
              </div>
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-secondary" style={{ width: '100%' }}>
                📥 Đọc Dữ Liệu Bằng FormData
              </button>
            </div>
          </form>

          {uncontrolledLog && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#3b2f15', borderRadius: '6px', fontSize: '0.8rem', color: '#fef08a', border: '1px solid #854d0e' }}>
              {uncontrolledLog}
            </div>
          )}
        </div>
      </div>

      <InfoBox type="info" title="Khi Nào Chọn Kiểu Nào?">
        <strong>Chọn Controlled:</strong> Khi cần xác thực tức thì (Instant validation), tự động format (Format thẻ tín dụng, SĐT), disable nút submit động, hoặc đồng bộ với component khác.<br />
        <strong>Chọn Uncontrolled:</strong> Khi form quá lớn với hàng trăm trường dữ liệu và bạn không muốn React re-render liên tục mỗi lần gõ, chỉ cần lấy dữ liệu tổng thể lúc bấm Gửi (Submit).
      </InfoBox>
    </div>
  );
}
