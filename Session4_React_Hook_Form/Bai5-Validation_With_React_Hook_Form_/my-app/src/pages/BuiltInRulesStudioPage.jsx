import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function BuiltInRulesStudioPage() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      employeeCode: '',
      age: 25,
      password: '',
    },
  });

  const watchedValues = watch();

  const onSubmit = (data) => {
    setSubmittedData({
      ...data,
      ageType: typeof data.age,
      submittedAt: new Date().toLocaleTimeString(),
    });
  };

  // Preset triggers
  const fillValid = () => {
    setValue('fullName', 'Nguyễn Văn An', { shouldValidate: true });
    setValue('employeeCode', 'DEV-2048', { shouldValidate: true });
    setValue('age', 28, { shouldValidate: true });
    setValue('password', 'SuperSecret123', { shouldValidate: true });
  };

  const fillInvalidPattern = () => {
    setValue('fullName', 'Lê Thị Bình', { shouldValidate: true });
    setValue('employeeCode', 'INVALID-CODE', { shouldValidate: true }); // Không khớp DEV-XXXX
    setValue('age', 22, { shouldValidate: true });
    setValue('password', 'ValidPass123', { shouldValidate: true });
  };

  const fillInvalidAge = () => {
    setValue('fullName', 'Trần Văn Cường', { shouldValidate: true });
    setValue('employeeCode', 'DEV-9999', { shouldValidate: true });
    setValue('age', 16, { shouldValidate: true }); // Dưới 18
    setValue('password', 'ValidPass123', { shouldValidate: true });
  };

  const fillInvalidLength = () => {
    setValue('fullName', 'An', { shouldValidate: true }); // Quá ngắn (< 3)
    setValue('employeeCode', 'DEV-1234', { shouldValidate: true });
    setValue('age', 25, { shouldValidate: true });
    setValue('password', '123', { shouldValidate: true }); // Quá ngắn (< 8)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-blue">BUILT-IN LAB</span>
              <span className="badge badge-emerald">6 CORE RULES</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Phòng Thí Nghiệm 6 Quy Tắc Thẩm Định Cơ Bản &amp; valueAsNumber
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Khảo sát cách cấu hình <code>required</code>, <code>minLength</code>, <code>maxLength</code>, <code>min</code>, <code>max</code>, <code>pattern</code>, 
              và giải mã cơ chế ép kiểu <code>valueAsNumber: true</code>.
            </p>
          </div>
          <RenderCounter name="BuiltInRulesStudioPage" />
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
            🧪 Chọn Nhanh Kịch Bản Kiểm Thử (Presets):
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillValid}>
              ✅ Nạp Hợp Lệ (Pass All)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillInvalidPattern}>
              ⚠️ Sai Pattern Mã NV
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillInvalidAge}>
              ⚠️ Tuổi = 16 (&lt; 18)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillInvalidLength}>
              ⚠️ Độ Dài Quá Ngắn
            </button>
            <button type="button" className="btn btn-danger" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={() => { reset(); setSubmittedData(null); }}>
              🔄 Reset Rỗng
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Form & Live Diagnostics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>📝</span> Form Đăng Ký Nhân Sự
            </div>
            <span className="badge badge-cyan">Validation Mode: onBlur</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field 1: fullName (required, minLength, maxLength) */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Họ và Tên <span className="required">* (3 - 30 ký tự)</span>
                </label>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {(watchedValues.fullName || '').length}/30
                </span>
              </div>
              <input
                className={`form-input ${errors.fullName ? 'is-invalid' : ''}`}
                {...register('fullName', {
                  required: 'Họ và tên là bắt buộc nhập',
                  minLength: { value: 3, message: 'Họ tên phải có ít nhất 3 ký tự' },
                  maxLength: { value: 30, message: 'Họ tên không được vượt quá 30 ký tự' },
                })}
                placeholder="ví dụ: Nguyễn Văn An"
              />
              {errors.fullName && <div className="error-feedback">⚠️ {errors.fullName.message}</div>}
              <div className="input-hint">Rules: required • minLength: 3 • maxLength: 30</div>
            </div>

            {/* Field 2: employeeCode (required, pattern) */}
            <div className="form-group">
              <label className="form-label">
                Mã Định Danh Nhân Viên <span className="required">* (DEV-XXXX hoặc QA-XXXX)</span>
              </label>
              <input
                className={`form-input ${errors.employeeCode ? 'is-invalid' : ''}`}
                {...register('employeeCode', {
                  required: 'Mã nhân viên bắt buộc phải có',
                  pattern: {
                    value: /^(DEV|QA)-\d{4}$/,
                    message: 'Mã phải bắt đầu bằng DEV- hoặc QA- kèm 4 chữ số (VD: DEV-2048)',
                  },
                })}
                placeholder="ví dụ: DEV-1024"
              />
              {errors.employeeCode && <div className="error-feedback">⚠️ {errors.employeeCode.message}</div>}
              <div className="input-hint">Rules: pattern: /^(DEV|QA)-\d{'{4}'}$/</div>
            </div>

            {/* Field 3: age (required, min, max, valueAsNumber) */}
            <div className="form-group">
              <label className="form-label">
                Độ Tuổi <span className="required">* (18 - 65 tuổi, valueAsNumber)</span>
              </label>
              <input
                type="number"
                className={`form-input ${errors.age ? 'is-invalid' : ''}`}
                {...register('age', {
                  valueAsNumber: true,
                  required: 'Vui lòng cung cấp độ tuổi',
                  min: { value: 18, message: 'Bạn phải từ đủ 18 tuổi trở lên' },
                  max: { value: 65, message: 'Độ tuổi lao động tối đa là 65 tuổi' },
                })}
                placeholder="ví dụ: 25"
              />
              {errors.age && <div className="error-feedback">⚠️ {errors.age.message}</div>}
              <div className="input-hint">Rules: min: 18 • max: 65 • valueAsNumber: true</div>
            </div>

            {/* Field 4: password (required, minLength) */}
            <div className="form-group">
              <label className="form-label">
                Mật Khẩu Đăng Nhập <span className="required">* (tối thiểu 8 ký tự)</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', {
                  required: 'Mật khẩu không được để trống',
                  minLength: { value: 8, message: 'Mật khẩu phải chứa ít nhất 8 ký tự' },
                })}
                placeholder="••••••••"
              />
              {errors.password && <div className="error-feedback">⚠️ {errors.password.message}</div>}
              <div className="input-hint">Rules: required • minLength: 8</div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Kiểm Tra &amp; Submit Form (handleSubmit)
            </button>
          </form>
        </div>

        {/* Live Diagnostics Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* valueAsNumber deep dive note */}
          <div className="card" style={{ borderColor: 'var(--accent-amber)' }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem', color: 'var(--accent-amber)' }}>
                <span>💡</span> Bí Ẩn valueAsNumber: true
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Thẻ HTML <code>&lt;input type="number" /&gt;</code> theo mặc định của trình duyệt <strong>vẫn trả về chuỗi String</strong> (ví dụ <code>"25"</code>). 
              Khi bật <code>valueAsNumber: true</code>, RHF sử dụng thuộc tính <code>HTMLInputElement.valueAsNumber</code> của DOM để biến giá trị thành <code>25</code> (kiểu <code>number</code> chuẩn).
            </p>
          </div>

          {/* Form State Errors Inspector */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🔍</span> Trạng Thái Lỗi (formState.errors)
              </div>
              <span className={`badge ${Object.keys(errors).length === 0 ? 'badge-emerald' : 'badge-rose'}`}>
                {Object.keys(errors).length} Lỗi Phát Hiện
              </span>
            </div>

            <div className="inspector-panel" style={{ minHeight: '120px' }}>
              {Object.keys(errors).length === 0 ? (
                <span style={{ color: 'var(--accent-emerald)' }}>
                  ✅ Không có lỗi validation nào! Form đang ở trạng thái hợp lệ.
                </span>
              ) : (
                <pre>{JSON.stringify(Object.keys(errors).reduce((acc, key) => ({
                  ...acc,
                  [key]: {
                    type: errors[key]?.type,
                    message: errors[key]?.message,
                  }
                }), {}), null, 2)}</pre>
              )}
            </div>
          </div>

          {/* Submitted Data Payload Inspector */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>📦</span> Dữ Liệu Thu Thập Thành Công (Clean Data)
              </div>
              {submittedData && <span className="badge badge-emerald">Đã Nhận Data</span>}
            </div>

            <div className="inspector-panel" style={{ minHeight: '130px' }}>
              {submittedData ? (
                <div>
                  <pre>{JSON.stringify(submittedData, null, 2)}</pre>
                  <div style={{ marginTop: '0.5rem', color: 'var(--primary-light)', fontSize: '0.75rem' }}>
                    Kiểu dữ liệu trường age: <strong>{submittedData.ageType}</strong> (Không bị String hóa!)
                  </div>
                </div>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>
                  // Hãy bấm nút "Submit Form" để xem payload sạch được giao cho onSubmit(data)...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

