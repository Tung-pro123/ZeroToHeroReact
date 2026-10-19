import { useState } from 'react';
import InfoBox from '../common/InfoBox';

export default function StateParadoxRefactorLab() {
  // 6 Boolean Flags (Hỗn loạn)
  const [isTyping, setIsTyping] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  // Phát hiện nghịch lý (State Paradox)
  const hasParadox =
    (isTyping && isSubmitting) ||
    (isSuccess && isError) ||
    (isSubmitting && isSuccess);

  return (
    <div className="lab-card">
      <div className="lab-card-header">
        <h2 className="lab-card-title">⚖️ Triệt Tiêu Nghịch Lý State (State Paradoxes)</h2>
        <p className="lab-card-desc">
          Khám phá nguy cơ sinh lỗi khi dùng quá nhiều cờ boolean rời rạc và cách quy hoạch lại thành một biến State hữu hạn duy nhất.
        </p>
      </div>

      <InfoBox
        type={hasParadox ? 'danger' : 'tip'}
        title={hasParadox ? 'CẢNH BÁO: ĐANG CÓ NGHỊCH LÝ GIAO DIỆN (STATE PARADOX)!' : 'Mô Hình Trạng Thái An Toàn'}
      >
        {hasParadox
          ? 'Các cờ boolean đang mâu thuẫn lẫn nhau! Ví dụ: Form không thể vừa đang gửi (Submitting) vừa báo Thành công (Success), hoặc vừa Thành công lại vừa Báo lỗi!'
          : 'Hãy dùng biến status nhận các giá trị: "typing" | "submitting" | "success". Bằng cách này, hệ thống chỉ có thể ở 1 trạng thái tại 1 thời điểm!'}
      </InfoBox>

      {/* Boolean Toggles Grid */}
      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '1.25rem', margin: '1.25rem 0' }}>
        <h4 style={{ color: '#f59e0b', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          🧪 Thử Bật/Tắt Các Cờ Boolean Hỗn Loạn:
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.6rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isTyping}
              onChange={(e) => setIsTyping(e.target.checked)}
              style={{ accentColor: '#38bdf8' }}
            />
            <span style={{ fontSize: '0.85rem', color: '#f8fafc' }}>isTyping: <strong>{String(isTyping)}</strong></span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.6rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isSubmitting}
              onChange={(e) => setIsSubmitting(e.target.checked)}
              style={{ accentColor: '#38bdf8' }}
            />
            <span style={{ fontSize: '0.85rem', color: '#f8fafc' }}>isSubmitting: <strong>{String(isSubmitting)}</strong></span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.6rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isSuccess}
              onChange={(e) => setIsSuccess(e.target.checked)}
              style={{ accentColor: '#10b981' }}
            />
            <span style={{ fontSize: '0.85rem', color: '#f8fafc' }}>isSuccess: <strong>{String(isSuccess)}</strong></span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#1e293b', padding: '0.6rem 0.9rem', borderRadius: '8px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isError}
              onChange={(e) => setIsError(e.target.checked)}
              style={{ accentColor: '#ef4444' }}
            />
            <span style={{ fontSize: '0.85rem', color: '#f8fafc' }}>isError: <strong>{String(isError)}</strong></span>
          </label>
        </div>

        {hasParadox && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid #ef4444', borderRadius: '8px', color: '#fca5a5', fontSize: '0.85rem' }}>
            🚨 <strong>LỖI NGHỊCH LÝ PHÁT SINH:</strong> Giao diện bị rơi vào trạng thái phi logic mà người dùng không thể thoát ra được!
          </div>
        )}
      </div>

      {/* Refactored Architecture Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem', marginTop: '1.5rem' }}>
        <div style={{ background: '#1a1824', padding: '1.25rem', borderRadius: '12px', border: '1px solid #ef4444' }}>
          <h4 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>❌ Kiến Trúc Cũ: 6 Biến Hỗn Loạn</h4>
          <pre className="code-pill">
{`const [answer, setAnswer] = useState('');\nconst [error, setError] = useState(null);\nconst [isEmpty, setIsEmpty] = useState(true); // Thừa\nconst [isTyping, setIsTyping] = useState(false); // Dễ nghịch lý\nconst [isSubmitting, setIsSubmitting] = useState(false);\nconst [isSuccess, setIsSuccess] = useState(false);`}
          </pre>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            Số trạng thái tổ hợp lý thuyết: $2^4 = 16$ trạng thái (trong đó phần lớn là trạng thái vô nghĩa).
          </p>
        </div>

        <div style={{ background: '#0e241e', padding: '1.25rem', borderRadius: '12px', border: '1px solid #10b981' }}>
          <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>✅ Kiến Trúc Chuẩn: 3 Biến Cốt Lõi (FSM)</h4>
          <pre className="code-pill">
{`const [answer, setAnswer] = useState('');\nconst [error, setError] = useState(null);\n// Chỉ cho phép 1 trong 3 trạng thái:\nconst [status, setStatus] = useState('typing'); \n// 'typing' | 'submitting' | 'success'\n\n// Derived State (Tính trực tiếp):\nconst isEmpty = answer.length === 0;`}
          </pre>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.5rem' }}>
            Triệt tiêu 100% khả năng xảy ra State Paradox, code ngắn gọn và dễ bảo trì gấp 3 lần.
          </p>
        </div>
      </div>
    </div>
  );
}
