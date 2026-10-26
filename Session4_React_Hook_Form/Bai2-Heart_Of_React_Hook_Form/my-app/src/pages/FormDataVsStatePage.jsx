import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FormDataVsStatePage() {
  const [submittedSnapshot, setSubmittedSnapshot] = useState(null);

  // useForm with mode: 'onChange' so formState is updated interactively
  const {
    register,
    handleSubmit,
    formState: { isDirty, dirtyFields, touchedFields, isValid, isSubmitting, submitCount, errors },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      accountName: 'tung_master',
      email: 'tung@zerotohero.vn',
      bio: '',
    },
  });

  const onSubmit = async (data) => {
    // Fake 500ms submit latency to show isSubmitting
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmittedSnapshot(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
        <h2 className="card-title">
          <span>📊</span> Phân Biệt Cốt Tử: Form Data vs Form State
        </h2>
        <p className="card-subtitle">
          Rất nhiều người nhầm lẫn hai khái niệm này. 
          <strong> Form Data</strong> trả lời câu hỏi <em>"Người dùng nhập cái gì?"</em>, 
          còn <strong>Form State</strong> trả lời câu hỏi <em>"Form hiện đang ở trạng thái nào?"</em>.
        </p>

        {/* Live Form State Dashboard */}
        <div style={{ background: '#03050e', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
              📡 Bảng Điều Khiển Form State Theo Thời Gian Thực (Live FormState)
            </span>
            <button onClick={() => { reset(); setSubmittedSnapshot(null); }} className="btn btn-secondary btn-sm">
              🔄 Reset về defaultValues
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.8rem', marginBottom: '1.25rem' }}>
            {/* isDirty */}
            <div className={`state-indicator ${isDirty ? 'active' : 'inactive'}`}>
              <span>isDirty (đã chỉnh sửa?):</span>
              <strong>{isDirty ? 'TRUE' : 'FALSE'}</strong>
            </div>

            {/* isValid */}
            <div className={`state-indicator ${isValid ? 'active' : 'inactive'}`}>
              <span>isValid (hợp lệ?):</span>
              <strong>{isValid ? 'TRUE' : 'FALSE'}</strong>
            </div>

            {/* isSubmitting */}
            <div className={`state-indicator ${isSubmitting ? 'active' : 'inactive'}`}>
              <span>isSubmitting (đang gửi?):</span>
              <strong>{isSubmitting ? 'TRUE' : 'FALSE'}</strong>
            </div>

            {/* submitCount */}
            <div className={`state-indicator ${submitCount > 0 ? 'active' : 'inactive'}`}>
              <span>submitCount (số lần nhấn):</span>
              <strong>{submitCount}</strong>
            </div>
          </div>

          {/* Details on touched and dirty fields */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.82rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.3rem' }}>touchedFields (đã click vào & blur ra ngoài):</div>
              <div style={{ color: '#c084fc' }}>{JSON.stringify(touchedFields)}</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ color: '#94a3b8', marginBottom: '0.3rem' }}>dirtyFields (khác với giá trị defaultValues):</div>
              <div style={{ color: '#34d399' }}>{JSON.stringify(dirtyFields)}</div>
            </div>
          </div>
        </div>

        {/* Interactive Form */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '1rem', fontWeight: 700 }}>
            📝 Tương Tác Trực Tiếp Với Form
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Account Name (mặc định: tung_master)
                </label>
                <input
                  type="text"
                  {...register('accountName', { required: 'Không được để trống' })}
                  className={`form-input ${errors.accountName ? 'input-error' : ''}`}
                />
                {errors.accountName && <div className="field-error-msg">⚠️ {errors.accountName.message}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Email (mặc định: tung@zerotohero.vn)
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email là bắt buộc' })}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <div className="field-error-msg">⚠️ {errors.email.message}</div>}
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Tiểu sử (mặc định: rỗng)
                </label>
                <textarea
                  rows="2"
                  placeholder="Thử gõ vài chữ vào đây và nhìn cờ isDirty đổi màu xanh lá!"
                  {...register('bio')}
                  className="form-textarea"
                />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
              {isSubmitting ? '⏳ Đang xử lý submit...' : 'Submit Form và Chụp Snapshot 📸'}
            </button>
          </form>

          {/* Form Data Snapshot */}
          {submittedSnapshot && (
            <div style={{ marginTop: '1.25rem', background: '#03050e', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid #10b981' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                📦 Form Data thu thập được (Dữ liệu người dùng):
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.82rem' }}>
                {JSON.stringify(submittedSnapshot, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Mental Model Table */}
        <div style={{ background: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#38bdf8', fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            💡 Bảng Phân Tách Trách Nhiệm Dữ Liệu
          </h4>
          <div className="grid-2" style={{ fontSize: '0.86rem' }}>
            <div>
              <strong style={{ color: '#ec4899' }}>FORM DATA (User Input)</strong>
              <p style={{ color: '#cbd5e1', marginTop: '0.3rem' }}>
                - Trả lời: Người dùng đã nhập những gì?<br />
                - Ví dụ: <code>&#123; accountName: "tung_master", email: "..." &#125;</code><br />
                - Điểm đến: Được đóng gói và gửi qua mạng đến Spring Boot Database.
              </p>
            </div>
            <div>
              <strong style={{ color: '#38bdf8' }}>FORM STATE (Metadata)</strong>
              <p style={{ color: '#cbd5e1', marginTop: '0.3rem' }}>
                - Trả lời: Form đang ở trạng thái nào?<br />
                - Ví dụ: <code>isDirty</code>, <code>isSubmitting</code>, <code>errors</code>, <code>touchedFields</code>.<br />
                - Điểm đến: Dùng để điều khiển UI (disable nút submit, hiển thị loading spinner, highlight viền đỏ).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
