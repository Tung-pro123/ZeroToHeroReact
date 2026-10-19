import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function VisualStateMachineLab() {
  const [selectedMockup, setSelectedMockup] = useState('empty');

  const visualStates = [
    { id: 'empty', label: '1. Empty (Rỗng)', desc: 'Ô nhập liệu trống, nút Submit bị khóa (disabled).' },
    { id: 'typing', label: '2. Typing (Đang gõ)', desc: 'Người dùng đã gõ ký tự, nút Submit sáng lên.' },
    { id: 'submitting', label: '3. Submitting (Đang gửi)', desc: 'Form bị vô hiệu hóa, nút Submit hiện spinner quay.' },
    { id: 'success', label: '4. Success (Thành công)', desc: 'Form biến mất, hiển thị màn hình chúc mừng.' },
    { id: 'error', label: '5. Error (Báo lỗi)', desc: 'Giữ nguyên chữ đã gõ, hiện thêm thông báo lỗi màu đỏ.' },
  ];

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">🎨 5 Trạng Thái Hình Ảnh (Visual Mockups)</h2>
        <p className="lab-card-desc">
          Quy trình Bước 1: Hãy thiết kế và kiểm thử toàn bộ 5 bản vẽ giao diện tĩnh trước khi gắn bất kỳ logic state nào vào code.
        </p>
      </div>

      <InfoBox type="tip" title="Bí Quyết Của Kỹ Sư Chuyên Nghiệp">
        Đừng vội viết <code>onClick</code> hay gọi API. Hãy tạo ra các prop giả định để render xem Form của bạn trông như thế nào ở từng trạng thái:
        Rỗng, Đang gõ, Đang gửi, Thành công, và Lỗi.
      </InfoBox>

      {/* Visual State Switcher */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}>
        {visualStates.map((st) => (
          <button
            key={st.id}
            className={`btn ${selectedMockup === st.id ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.85rem' }}
            onClick={() => setSelectedMockup(st.id)}
          >
            {st.label}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
        👉 <strong>Mô tả thiết kế:</strong> {visualStates.find((s) => s.id === selectedMockup)?.desc}
      </p>

      {/* Mockup Canvas */}
      <div className="mockup-canvas">
        {selectedMockup === 'empty' && (
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h3 style={{ color: '#f8fafc', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Gửi ý kiến đóng góp</h3>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Ý kiến của bạn về sản phẩm..."
              value=""
              readOnly
            />
            <button className="btn btn-secondary" disabled style={{ width: '100%', marginTop: '0.75rem' }}>
              Gửi ý kiến (Bị vô hiệu hóa)
            </button>
          </div>
        )}

        {selectedMockup === 'typing' && (
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h3 style={{ color: '#f8fafc', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Gửi ý kiến đóng góp</h3>
            <textarea
              className="form-input"
              rows={3}
              value="Hệ thống chạy rất mượt và trực quan!"
              readOnly
            />
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Gửi ý kiến ngay 🚀
            </button>
          </div>
        )}

        {selectedMockup === 'submitting' && (
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <h3 style={{ color: '#f8fafc', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Gửi ý kiến đóng góp</h3>
            <textarea
              className="form-input"
              rows={3}
              value="Hệ thống chạy rất mượt và trực quan!"
              disabled
            />
            <button className="btn btn-primary" disabled style={{ width: '100%', marginTop: '0.75rem' }}>
              <span className="spinner" style={{ marginRight: '0.5rem' }} /> Đang gửi tới máy chủ...
            </button>
          </div>
        )}

        {selectedMockup === 'success' && (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
            <h3 style={{ color: '#10b981', fontSize: '1.3rem', marginBottom: '0.35rem' }}>
              Gửi Thành Công!
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              Cảm ơn bạn đã đóng góp phản hồi quý giá giúp cải tiến dịch vụ.
            </p>
          </div>
        )}

        {selectedMockup === 'error' && (
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '0.6rem 0.9rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
              ❌ Lỗi mạng: Không thể kết nối tới máy chủ (503 Service Unavailable). Vui lòng thử lại!
            </div>
            <textarea
              className="form-input"
              rows={3}
              value="Hệ thống chạy rất mượt và trực quan!"
              readOnly
            />
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.75rem' }}>
              Thử gửi lại 🔄
            </button>
          </div>
        )}
      </div>

      {/* Code representation */}
      <div>
        <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Khai báo JSX có điều kiện tương ứng:</span>
        <pre className="code-pill">
{`{status === 'success' ? (\n  <SuccessMessage />\n) : (\n  <form onSubmit={handleSubmit}>\n    <textarea disabled={status === 'submitting'} />\n    {error && <ErrorMessage error={error} />}\n    <button disabled={status === 'submitting' || answer.length === 0}>\n      {status === 'submitting' ? <Spinner /> : 'Gửi'}\n    </button>\n  </form>\n)}`}
        </pre>
      </div>
    </div>
  );
}
