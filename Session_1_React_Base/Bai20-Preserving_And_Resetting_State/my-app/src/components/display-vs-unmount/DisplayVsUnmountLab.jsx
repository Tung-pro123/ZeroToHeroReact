import { useState } from 'react';
import InfoBox from '../common/InfoBox';

// Sub-component Form Đóng Góp Ý Kiến
function FeedbackForm() {
  const [subject, setSubject] = useState('Đề xuất cải tiến UI');
  const [message, setMessage] = useState('Em thấy bài 20 rất hay và trực quan!');
  const [rating, setRating] = useState('5');

  return (
    <div style={{ background: '#0d1527', border: '1px solid #10b981', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', color: '#34d399', fontWeight: 600, marginBottom: '1rem' }}>
        📝 Biểu Mẫu Góp Ý (Chứa State Nhập Liệu)
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', marginBottom: '0.3rem' }}>
            Chủ đề:
          </label>
          <input
            type="text"
            className="input-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', marginBottom: '0.3rem' }}>
            Nội dung chi tiết:
          </label>
          <textarea
            rows={3}
            className="input-control"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ resize: 'none' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#e5e7eb', marginBottom: '0.3rem' }}>
            Đánh giá chất lượng:
          </label>
          <select
            className="input-control"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐ Tuyệt vời (5 sao)</option>
            <option value="4">⭐⭐⭐⭐ Hài lòng (4 sao)</option>
            <option value="3">⭐⭐⭐ Bình thường (3 sao)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default function DisplayVsUnmountLab() {
  const [strategy, setStrategy] = useState('css-display'); // 'unmount' | 'css-display'
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">👁️ 5. Bí Kíp Giữ State Khi Ẩn/Hiện: CSS Display vs Unmount</h2>
        <p className="lab-card-desc">
          Làm thế nào để ẩn một Modal hoặc Tab phức tạp mà không làm mất dữ liệu người dùng đang gõ dở, 
          mà không cần phải nhọc công kéo State lên Root?
        </p>
      </div>

      {/* Switcher */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          className={`btn ${strategy === 'css-display' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setStrategy('css-display')}
        >
          ✅ Chiến Thuật CSS (display: none): BẢO TOÀN STATE 100%
        </button>
        <button
          className={`btn ${strategy === 'unmount' ? 'btn-danger' : 'btn-secondary'}`}
          onClick={() => setStrategy('unmount')}
        >
          ❌ Chiến Thuật Gỡ Khỏi DOM (Unmount): MẤT SẠCH DỮ LIỆU
        </button>
      </div>

      <InfoBox
        type={strategy === 'css-display' ? 'tip' : 'danger'}
        title={
          strategy === 'css-display'
            ? 'Component Vẫn Nằm Trong Render Tree -> State An Toàn'
            : 'Component Bị Xóa Khỏi DOM -> React Tiêu Hủy State Ngay Lập Tức'
        }
      >
        {strategy === 'css-display' ? (
          <div>
            Hãy gõ thêm vài chữ vào biểu mẫu bên dưới, sau đó bấm <strong>&quot;Ẩn Biểu Mẫu&quot;</strong> rồi bấm <strong>&quot;Hiện Lại&quot;</strong>.<br />
            Bạn sẽ thấy toàn bộ câu chữ bạn gõ <strong>vẫn còn nguyên vẹn</strong> vì component chưa hề bị unmount khỏi cây Virtual DOM!
          </div>
        ) : (
          <div>
            Gõ một đoạn văn bản dài, sau đó bấm <strong>&quot;Ẩn Biểu Mẫu&quot;</strong>. Khi bạn mở lại, 
            toàn bộ nội dung vừa gõ đã <strong>bị xóa sạch</strong> và quay về giá trị khởi tạo mặc định ban đầu!
          </div>
        )}
      </InfoBox>

      {/* Toggle button */}
      <div style={{ marginBottom: '1.25rem' }}>
        <button className="btn btn-secondary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '🙈 Ẩn Biểu Mẫu' : '👁️ Mở Lại Biểu Mẫu'}
        </button>
      </div>

      {/* Form Display Logic */}
      {strategy === 'unmount' ? (
        isOpen && <FeedbackForm />
      ) : (
        <div style={{ display: isOpen ? 'block' : 'none' }}>
          <FeedbackForm />
        </div>
      )}
    </div>
  );
}
