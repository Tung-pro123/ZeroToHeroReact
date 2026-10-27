import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function TwoCallbacksLabPage() {
  const [pipelineState, setPipelineState] = useState('idle'); // 'idle' | 'valid' | 'invalid'
  const [receivedData, setReceivedData] = useState(null);
  const [receivedErrors, setReceivedErrors] = useState(null);
  const [callCount, setCallCount] = useState({ valid: 0, invalid: 0 });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      age: '',
      agreeTerms: false,
    },
  });

  // Callback 1: onValid (chỉ chạy khi TẤT CẢ validation đều PASS)
  const onValidCallback = (data) => {
    setPipelineState('valid');
    setReceivedData(data);
    setReceivedErrors(null);
    setCallCount((prev) => ({ ...prev, valid: prev.valid + 1 }));
  };

  // Callback 2: onInvalid (chỉ chạy khi CÓ ÍT NHẤT 1 validation FAIL)
  const onInvalidCallback = (fieldErrors) => {
    setPipelineState('invalid');
    setReceivedErrors(fieldErrors);
    setReceivedData(null);
    setCallCount((prev) => ({ ...prev, invalid: prev.invalid + 1 }));
  };

  // Preset triggers
  const fillValidData = () => {
    setValue('username', 'tung_developer', { shouldValidate: true });
    setValue('email', 'tung@example.com', { shouldValidate: true });
    setValue('age', 24, { shouldValidate: true });
    setValue('agreeTerms', true, { shouldValidate: true });
    setPipelineState('idle');
  };

  const fillInvalidAge = () => {
    setValue('username', 'tung_developer', { shouldValidate: true });
    setValue('email', 'tung@example.com', { shouldValidate: true });
    setValue('age', 15, { shouldValidate: true }); // Dưới 18
    setValue('agreeTerms', true, { shouldValidate: true });
    setPipelineState('idle');
  };

  const fillEmpty = () => {
    reset({
      username: '',
      email: '',
      age: '',
      agreeTerms: false,
    });
    setPipelineState('idle');
    setReceivedData(null);
    setReceivedErrors(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">ADVANCED DISCOVERY</span>
              <span className="badge badge-emerald">DUAL CALLBACK ARCHITECTURE</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Bí Mật handleSubmit(onValid, onInvalid): 2 Nhánh Rẽ Độc Lập
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Bình thường ta chỉ truyền 1 hàm <code>handleSubmit(onSubmit)</code>. Nhưng RHF thực chất hỗ trợ 2 tham số: 
              <strong>onValid</strong> và <strong>onInvalid</strong>.
            </p>
          </div>
          <RenderCounter name="TwoCallbacksLabPage" />
        </div>
      </div>

      {/* Realtime Visual Decision Tree */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🌳</span> Cây Rẽ Nhánh Thực Thi (Live Execution Decision Tree)
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-emerald">onValid Count: {callCount.valid}</span>
            <span className="badge badge-rose">onInvalid Count: {callCount.invalid}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1.5rem 0' }}>
          {/* Top Node */}
          <div
            className={`pipeline-node ${pipelineState !== 'idle' ? 'active' : ''}`}
            style={{ width: '280px' }}
          >
            <span className="node-tag">Cổng Tiếp Nhận</span>
            <span className="node-title">handleSubmit(...)</span>
            <span className="node-subtitle">e.preventDefault() &amp; Validate Fields</span>
          </div>

          <div style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>⬇️</div>

          {/* Fork Nodes */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', width: '100%', maxWidth: '780px' }}>
            {/* Valid Branch */}
            <div
              className={`comparison-col ${pipelineState === 'valid' ? 'highlight-pass' : ''}`}
              style={{
                background: pipelineState === 'valid' ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--accent-emerald)', fontSize: '0.95rem' }}>
                  ✅ Nhánh 1: onValid(data)
                </span>
                <span className="badge badge-emerald">{pipelineState === 'valid' ? 'TRIGGERED!' : 'Standby'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Được RHF gọi khi <strong>100% các trường</strong> thỏa mãn điều kiện validation.
              </p>
              <div className="code-block" style={{ fontSize: '0.78rem', flex: 1, minHeight: '120px' }}>
                {receivedData ? (
                  <pre>{JSON.stringify(receivedData, null, 2)}</pre>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>// Chưa có data hợp lệ...</span>
                )}
              </div>
            </div>

            {/* Invalid Branch */}
            <div
              className={`comparison-col ${pipelineState === 'invalid' ? 'highlight-fail' : ''}`}
              style={{
                background: pipelineState === 'invalid' ? 'rgba(244, 63, 94, 0.08)' : 'var(--bg-secondary)',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: '700', color: 'var(--accent-rose)', fontSize: '0.95rem' }}>
                  ❌ Nhánh 2: onInvalid(errors)
                </span>
                <span className="badge badge-rose">{pipelineState === 'invalid' ? 'TRIGGERED!' : 'Standby'}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                Được RHF gọi khi <strong>có ít nhất 1 trường</strong> không đạt validation rules.
              </p>
              <div className="code-block" style={{ fontSize: '0.78rem', flex: 1, minHeight: '120px' }}>
                {receivedErrors ? (
                  <pre>{JSON.stringify(Object.keys(receivedErrors).reduce((acc, key) => ({
                    ...acc,
                    [key]: {
                      type: receivedErrors[key]?.type,
                      message: receivedErrors[key]?.message,
                    }
                  }), {}), null, 2)}</pre>
                ) : (
                  <span style={{ color: 'var(--text-muted)' }}>// Không có lỗi validation...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Fill Buttons & Live Interactive Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Column */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>✍️</span> Biểu Mẫu Có Ràng Buộc Validation
            </div>
            <span className="badge badge-indigo">Live Form</span>
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillValidData}>
              ⚡ Nạp Data Hợp Lệ (Pass 100%)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillInvalidAge}>
              ⚠️ Nạp Tuổi = 15 (Fail min 18)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillEmpty}>
              🔄 Reset Rỗng
            </button>
          </div>

          <form onSubmit={handleSubmit(onValidCallback, onInvalidCallback)}>
            <div className="form-group">
              <label className="form-label">
                Tên Đăng Nhập <span className="required">* (tối thiểu 4 ký tự)</span>
              </label>
              <input
                className={`form-input ${errors.username ? 'is-invalid' : ''}`}
                {...register('username', {
                  required: 'Username không được để trống',
                  minLength: { value: 4, message: 'Username phải từ 4 ký tự trở lên' },
                })}
                placeholder="ví dụ: nguyenvana"
              />
              {errors.username && <div className="error-feedback">⚠️ {errors.username.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Doanh Nghiệp <span className="required">* (đúng định dạng)</span>
              </label>
              <input
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Email bắt buộc phải có',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Địa chỉ email không đúng định dạng',
                  },
                })}
                placeholder="ví dụ: user@example.com"
              />
              {errors.email && <div className="error-feedback">⚠️ {errors.email.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                Tuổi Người Dùng <span className="required">* (&gt;= 18 tuổi)</span>
              </label>
              <input
                type="number"
                className={`form-input ${errors.age ? 'is-invalid' : ''}`}
                {...register('age', {
                  required: 'Vui lòng nhập tuổi',
                  min: { value: 18, message: 'Bạn phải từ 18 tuổi trở lên để đăng ký' },
                })}
                placeholder="ví dụ: 20"
              />
              {errors.age && <div className="error-feedback">⚠️ {errors.age.message}</div>}
            </div>

            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="terms"
                {...register('agreeTerms', {
                  required: 'Bạn cần đồng ý với điều khoản sử dụng',
                })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="terms" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                Tôi đồng ý với chính sách bảo mật <span className="required">*</span>
              </label>
            </div>
            {errors.agreeTerms && <div className="error-feedback" style={{ marginBottom: '1rem' }}>⚠️ {errors.agreeTerms.message}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Form (handleSubmit(onValid, onInvalid))
            </button>
          </form>
        </div>

        {/* Deep Dive Note Column */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>💡</span> Tại Sao Thực Tế Ít Khi Cần Dùng onInvalid?
            </div>
            <span className="badge badge-amber">Architect Insights</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            <p>
              Hầu hết các dự án chỉ truyền 1 hàm: <code>handleSubmit(onSubmit)</code>. Vậy tại sao RHF lại có thêm <code>onInvalid</code>?
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-cyan)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>1. Khi nào NÊN dùng onInvalid?</strong>
              <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem' }}>
                <li>Hiển thị Toast thông báo lỗi tổng quát: <em>"Vui lòng điền đủ 3 trường màu đỏ bên dưới"</em>.</li>
                <li>Gửi log phân tích UX (Telemetry/Analytics) để biết người dùng hay bị kẹt ở bước validation nào nhất.</li>
                <li>Tự động cuộn màn hình (scroll) hoặc focus lên input đầu tiên bị lỗi nếu form quá dài.</li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--accent-purple)' }}>
              <strong style={{ color: 'var(--text-primary)' }}>2. Hiển thị lỗi UI thường dùng gì?</strong>
              <p style={{ marginTop: '0.35rem' }}>
                Để render thông báo lỗi ngay dưới từng input, chúng ta dùng trực tiếp:
                <code>const {'{'} formState: {'{'} errors {'}'} {'}'} = useForm();</code>
                (Sẽ học cực sâu ở Bài 6: FormState &amp; Error Handling).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

