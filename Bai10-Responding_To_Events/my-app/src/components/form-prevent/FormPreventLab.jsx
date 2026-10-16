import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function FormPreventLab() {
  const [usePreventDefault, setUsePreventDefault] = useState(true);
  const [formData, setFormData] = useState({ name: 'Lê Thanh Tùng', email: 'tung.dev@gmail.com' });
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'reloaded'

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    if (usePreventDefault) {
      e.preventDefault(); // ⛔ Chặn reload trang
      setStatus('loading');

      setTimeout(() => {
        setStatus('success');
      }, 1000);
    } else {
      // Mô phỏng reload trang truyền thống
      setStatus('reloaded');
      // Reset form về rỗng như khi F5
      setFormData({ name: '', email: '' });
    }
  };

  return (
    <div className="lab-card">
      <div className="card-header">
        <div>
          <h2 className="card-title">⛔ Ngăn Chặn Hành Vi Mặc Định: Hàm preventDefault()</h2>
          <p className="card-desc">
            Trình duyệt có hành vi mặc định là tải lại (reload) toàn bộ trang web khi submit biểu mẫu. 
            Trong ứng dụng Single Page Application (SPA), điều này sẽ xóa sạch trạng thái trong RAM.
          </p>
        </div>

        <div className="toggle-wrapper">
          <span className="toggle-label">Cơ chế xử lý Form:</span>
          <button
            className={`btn-secondary ${usePreventDefault ? 'active' : ''}`}
            onClick={() => { setUsePreventDefault(true); setStatus(null); }}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            ⚛️ SPA (Có preventDefault)
          </button>
          <button
            className={`btn-secondary ${!usePreventDefault ? 'active' : ''}`}
            onClick={() => { setUsePreventDefault(false); setStatus(null); }}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', color: !usePreventDefault ? '#f43f5e' : undefined }}
          >
            ⚠️ Web Cũ (Không chặn reload)
          </button>
        </div>
      </div>

      <div className="grid-2">
        {/* Form thử nghiệm */}
        <div className="compare-box highlight">
          <h3 className="compare-title">
            <span>📝</span> Biểu Mẫu Nhập Liệu
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                Họ và Tên:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn..."
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                Địa chỉ Email:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Nhập email..."
                required
                style={{
                  width: '100%',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <button
              type="submit"
              className={usePreventDefault ? 'btn-primary' : 'btn-danger'}
              style={{ marginTop: '0.5rem', justifyContent: 'center' }}
            >
              {status === 'loading' ? '⏳ Đang gửi ngầm qua Fetch API...' : 'Bấm Gửi Dữ Liệu (Submit)'}
            </button>
          </form>

          {/* Trạng thái phản hồi */}
          {status === 'success' && (
            <div style={{ marginTop: '1rem', padding: '0.9rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', color: '#6ee7b7', fontSize: '0.9rem' }}>
              🎉 <strong>Gửi thành công!</strong> Dữ liệu đã gửi ngầm tới server. Dữ liệu trên form được bảo toàn, trang web không bị chớp hay tải lại!
            </div>
          )}

          {status === 'reloaded' && (
            <div style={{ marginTop: '1rem', padding: '0.9rem', borderRadius: '8px', background: 'rgba(244, 63, 94, 0.2)', border: '1px solid #f43f5e', color: '#fca5a5', fontSize: '0.9rem' }}>
              💥 <strong>Cảnh báo reload!</strong> Trình duyệt vừa kích hoạt tải lại toàn bộ trang web (F5 simulation). Toàn bộ dữ liệu trong ô nhập và State trong RAM vừa bị mất sạch!
            </div>
          )}
        </div>

        {/* Giải thích bản chất */}
        <div className="compare-box">
          <h3 className="compare-title"><span>💡</span> So Sánh: Web Truyền Thống vs React SPA</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
            <div style={{ padding: '0.85rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px', borderLeft: '4px solid #f43f5e' }}>
              <div style={{ fontWeight: 700, color: '#fca5a5', marginBottom: '0.2rem' }}>
                1. Web Cổ Điển (Không dùng preventDefault)
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Trình duyệt tự động gửi HTTP POST đồng bộ và <strong>tải lại trang</strong>. Màn hình giật chớp trắng, 
                tiêu tốn băng thông và xóa sạch dữ liệu form dở dang của người dùng.
              </p>
            </div>

            <div style={{ padding: '0.85rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontWeight: 700, color: '#6ee7b7', marginBottom: '0.2rem' }}>
                2. React Single-Page Application (CÓ preventDefault)
              </div>
              <p style={{ color: '#cbd5e1' }}>
                Dùng <code>e.preventDefault()</code> để bảo trình duyệt: <em>"Hãy đứng yên đó!"</em>. 
                Dữ liệu được gửi ngầm bất đồng bộ bằng <code>fetch / axios</code> mà giao diện vẫn mượt mà 100%.
              </p>
            </div>
          </div>

          <InfoBox title="Trường hợp dùng khác của preventDefault()">
            Ngoài thẻ <code>&lt;form&gt;</code>, bạn cũng dùng <code>e.preventDefault()</code> với thẻ <code>&lt;a href="..."&gt;</code> 
            khi muốn tự điều hướng bằng React Router thay vì để trình duyệt nhảy link làm reload trang.
          </InfoBox>
        </div>
      </div>
    </div>
  );
}
