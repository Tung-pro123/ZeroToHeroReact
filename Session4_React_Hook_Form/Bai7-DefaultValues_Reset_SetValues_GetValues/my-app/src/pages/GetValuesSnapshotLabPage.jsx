import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function GetValuesSnapshotLabPage() {
  const [snapshotLogs, setSnapshotLogs] = useState([]);
  const [copiedNotification, setCopiedNotification] = useState('');

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      accountEmail: 'tung.nguyen@security.vn',
      newPassword: '',
      confirmPassword: '',
      notes: 'Ghi chú nội bộ bảo mật...',
    },
  });

  const takeFullSnapshot = () => {
    // getValues() đọc tức thời giá trị toàn bộ form mà KHÔNG gây re-render
    const currentData = getValues();
    const time = new Date().toLocaleTimeString();
    setSnapshotLogs((prev) => [
      { id: Date.now(), time, type: 'FULL_FORM', data: currentData },
      ...prev.slice(0, 9),
    ]);
  };

  const takeFieldSnapshot = (fieldName) => {
    // getValues("fieldName") đọc riêng 1 trường
    const singleVal = getValues(fieldName);
    const time = new Date().toLocaleTimeString();
    setSnapshotLogs((prev) => [
      { id: Date.now(), time, type: `FIELD_${fieldName}`, data: singleVal },
      ...prev.slice(0, 9),
    ]);
  };

  const copyNotesToClipboard = () => {
    const notesText = getValues('notes');
    navigator.clipboard?.writeText(notesText);
    setCopiedNotification(`Đã sao chép nội dung: "${notesText}"`);
    setTimeout(() => setCopiedNotification(''), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-emerald">ZERO RE-RENDER</span>
              <span className="badge badge-blue">SNAPSHOT ENGINE</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              getValues() Snapshot: Đọc Dữ Liệu Tức Thì Không Gây Re-render
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              <code>getValues()</code> giống như việc nhìn vào đồng hồ để xem giờ tại một thời điểm: nó đọc giá trị hiện tại ngay lập tức 
              mà <strong>không làm component re-render lại</strong>. Hoàn hảo cho Event Handlers và so sánh chéo mật khẩu xác nhận (Confirm Password).
            </p>
          </div>
          <RenderCounter name="GetValuesSnapshotLabPage" />
        </div>
      </div>

      {/* Snapshot vs Subscription Comparison Alert */}
      <div className="card" style={{ background: 'rgba(6, 182, 212, 0.08)', borderColor: 'var(--accent-cyan)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <span style={{ fontSize: '1.75rem' }}>💡</span>
          <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
            <strong style={{ color: 'var(--accent-cyan)', display: 'block', marginBottom: '0.25rem' }}>
              Nguyên Lý Vàng: Snapshot vs Subscription (Preview Lesson 8)
            </strong>
            <p style={{ color: 'var(--text-secondary)' }}>
              • <strong>getValues()</strong> = Đọc một lần tại thời điểm click/gọi hàm (Snapshot). Không lắng nghe thay đổi, không tốn render.<br />
              • <strong>watch() / useWatch()</strong> = Đăng ký theo dõi liên tục (Subscription). Tự động kích hoạt re-render để cập nhật UI thời gian thực.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form & Snapshot Action Terminal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>🔐</span> Biểu Mẫu Đổi Mật Khẩu &amp; Ghi Chú
            </div>
            <span className="badge badge-cyan">Cross-Field Validation</span>
          </div>

          <form onSubmit={handleSubmit(() => {})}>
            <div className="form-group">
              <label className="form-label">Email Tài Khoản</label>
              <input className="form-input" {...register('accountEmail')} />
            </div>

            <div className="form-group">
              <label className="form-label">
                Mật Khẩu Mới <span className="required">* (tối thiểu 6 ký tự)</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.newPassword ? 'is-invalid' : ''}`}
                {...register('newPassword', {
                  required: 'Vui lòng nhập mật khẩu mới',
                  minLength: { value: 6, message: 'Mật khẩu phải từ 6 ký tự trở lên' },
                })}
                placeholder="••••••"
              />
              {errors.newPassword && <div className="error-feedback">⚠️ {errors.newPassword.message}</div>}
            </div>

            {/* Cross-Field Validation using getValues("newPassword") */}
            <div className="form-group">
              <label className="form-label">
                Xác Nhận Mật Khẩu (Confirm Password) <span className="required">*</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                {...register('confirmPassword', {
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: (value) =>
                    value === getValues('newPassword') || 'Mật khẩu xác nhận KHÔNG KHỚP với mật khẩu mới!',
                })}
                placeholder="Nhập lại chính xác mật khẩu..."
              />
              {errors.confirmPassword && <div className="error-feedback">⚠️ {errors.confirmPassword.message}</div>}
              <div className="input-hint">
                Thẩm định chéo bằng: <code>value === getValues("newPassword")</code>
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Ghi Chú Đính Kèm (Notes)</label>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
                  onClick={copyNotesToClipboard}
                >
                  📋 Sao Chép (getValues("notes"))
                </button>
              </div>
              <textarea rows={2} className="form-textarea" {...register('notes')} />
              {copiedNotification && (
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', marginTop: '0.25rem' }}>
                  ✓ {copiedNotification}
                </div>
              )}
            </div>
          </form>

          {/* Snapshot Trigger Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ fontSize: '0.8rem', flex: 1 }}
              onClick={takeFullSnapshot}
            >
              📸 Chụp Snapshot Toàn Form (getValues())
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '0.8rem' }}
              onClick={() => takeFieldSnapshot('accountEmail')}
            >
              Đọc getValues("accountEmail")
            </button>
          </div>
        </div>

        {/* Snapshot Terminal Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
              🖨️ Nhật Ký Đọc Snapshot getValues()
            </span>
            <button
              type="button"
              className="btn btn-outline"
              style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}
              onClick={() => setSnapshotLogs([])}
            >
              Xóa Nhật Ký
            </button>
          </div>

          <div className="inspector-panel" style={{ flex: 1, minHeight: '300px' }}>
            {snapshotLogs.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem 0' }}>
                Chưa có ảnh chụp dữ liệu nào. Hãy gõ vài thông tin và bấm nút "📸 Chụp Snapshot Toàn Form"...
              </div>
            ) : (
              snapshotLogs.map((log) => (
                <div key={log.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: '700' }}>[{log.type}]</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{log.time}</span>
                  </div>
                  <pre style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>{JSON.stringify(log.data, null, 2)}</pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

