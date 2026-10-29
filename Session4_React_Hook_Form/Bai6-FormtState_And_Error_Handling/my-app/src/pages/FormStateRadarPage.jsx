import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

const INITIAL_DEFAULTS = {
  username: 'alex_dev',
  email: 'alex@company.vn',
  score: 85,
};

export default function FormStateRadarPage() {
  const [submitHistory, setSubmitHistory] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isValid,
      isSubmitting,
    },
  } = useForm({
    mode: 'onChange', // Giúp isValid và dirty tracking phản hồi real-time
    defaultValues: INITIAL_DEFAULTS,
  });

  const onSubmit = async (data) => {
    // Giả lập trễ mạng 1.5 giây để người dùng quan sát isSubmitting
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitHistory((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), data },
      ...prev.slice(0, 5),
    ]);
  };

  // Preset triggers
  const fillValidChanges = () => {
    setValue('username', 'alex_senior', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setValue('email', 'alex.senior@company.vn', { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    setValue('score', 98, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
  };

  const simulateTouchOnly = () => {
    setFocus('email');
    setTimeout(() => {
      setFocus('score'); // Khi focus sang ô khác, ô email tự động bị blur -> touched = true
    }, 200);
  };

  const testRevertToDefault = () => {
    setValue('username', INITIAL_DEFAULTS.username, { shouldValidate: true, shouldDirty: true });
    setValue('email', INITIAL_DEFAULTS.email, { shouldValidate: true, shouldDirty: true });
    setValue('score', INITIAL_DEFAULTS.score, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-indigo">LIVE RADAR</span>
              <span className="badge badge-emerald">REAL-TIME FORM METADATA</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Trung Tâm Giám Sát Radar: 6 Thuộc Tính formState
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Quan sát cách RHF tự động cập nhật <code>errors</code>, <code>isDirty</code>, <code>dirtyFields</code>, <code>touchedFields</code>, <code>isValid</code>, và <code>isSubmitting</code> trong thời gian thực.
            </p>
          </div>
          <RenderCounter name="FormStateRadarPage" />
        </div>
      </div>

      {/* 6 Radar Metrics Grid */}
      <div className="radar-grid">
        {/* 1. isDirty */}
        <div className={`radar-card ${isDirty ? 'active-warn' : 'active-info'}`}>
          <span className="radar-title">isDirty (Toàn Form)</span>
          <span className="radar-value" style={{ color: isDirty ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
            {isDirty ? 'TRUE' : 'FALSE'}
          </span>
          <span className="radar-sub">{isDirty ? 'Đã khác defaultValues' : 'Trùng khớp default'}</span>
        </div>

        {/* 2. isValid */}
        <div className={`radar-card ${isValid ? 'active-pass' : 'active-fail'}`}>
          <span className="radar-title">isValid (Hợp lệ)</span>
          <span className="radar-value" style={{ color: isValid ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
            {isValid ? 'TRUE' : 'FALSE'}
          </span>
          <span className="radar-sub">{isValid ? 'Đạt 100% rules' : 'Có trường vi phạm'}</span>
        </div>

        {/* 3. isSubmitting */}
        <div className={`radar-card ${isSubmitting ? 'active-warn' : 'active-info'}`}>
          <span className="radar-title">isSubmitting</span>
          <span className="radar-value" style={{ color: isSubmitting ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
            {isSubmitting ? 'SUBMITTING...' : 'IDLE'}
          </span>
          <span className="radar-sub">{isSubmitting ? 'Promise đang pending' : 'Không có request'}</span>
        </div>

        {/* 4. errors count */}
        <div className={`radar-card ${Object.keys(errors).length > 0 ? 'active-fail' : 'active-pass'}`}>
          <span className="radar-title">errors count</span>
          <span className="radar-value" style={{ color: Object.keys(errors).length > 0 ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
            {Object.keys(errors).length} Lỗi
          </span>
          <span className="radar-sub">{Object.keys(errors).length > 0 ? Object.keys(errors).join(', ') : 'Sạch lỗi'}</span>
        </div>

        {/* 5. dirtyFields count */}
        <div className={`radar-card ${Object.keys(dirtyFields).length > 0 ? 'active-warn' : 'active-info'}`}>
          <span className="radar-title">dirtyFields count</span>
          <span className="radar-value" style={{ color: Object.keys(dirtyFields).length > 0 ? 'var(--accent-amber)' : 'var(--text-muted)' }}>
            {Object.keys(dirtyFields).length} Fields
          </span>
          <span className="radar-sub">{Object.keys(dirtyFields).length > 0 ? Object.keys(dirtyFields).join(', ') : 'Chưa ô nào đổi'}</span>
        </div>

        {/* 6. touchedFields count */}
        <div className={`radar-card ${Object.keys(touchedFields).length > 0 ? 'active-info' : 'active-info'}`}>
          <span className="radar-title">touchedFields count</span>
          <span className="radar-value" style={{ color: Object.keys(touchedFields).length > 0 ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
            {Object.keys(touchedFields).length} Fields
          </span>
          <span className="radar-sub">{Object.keys(touchedFields).length > 0 ? Object.keys(touchedFields).join(', ') : 'Chưa rời ô nào'}</span>
        </div>
      </div>

      {/* Preset Action Bar */}
      <div className="card" style={{ padding: '1rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
            ⚡ Thử Nghiệm Kịch Bản Tương Tác:
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={fillValidChanges}>
              ✏️ Sửa Giá Trị Hợp Lệ (isDirty = true)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={simulateTouchOnly}>
              👆 Chạm Email Rồi Rời Đi (Touched Only)
            </button>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={testRevertToDefault}>
              🔄 Sửa Về Đúng Default (isDirty = false)
            </button>
            <button type="button" className="btn btn-danger" style={{ fontSize: '0.75rem', padding: '0.35rem 0.65rem' }} onClick={() => reset(INITIAL_DEFAULTS)}>
              Reset Hoàn Toàn
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form & Inspector Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>📝</span> Form Đánh Giá Ứng Viên (Evaluation Form)
            </div>
            <span className="badge badge-indigo">mode: onChange</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field: Username */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Tên Đăng Nhập <span className="required">* (tối thiểu 4 ký tự)</span>
                </label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <span className={`status-pill ${dirtyFields.username ? 'status-pill-true' : 'status-pill-false'}`}>
                    Dirty: {dirtyFields.username ? 'YES' : 'NO'}
                  </span>
                  <span className={`status-pill ${touchedFields.username ? 'status-pill-true' : 'status-pill-false'}`}>
                    Touched: {touchedFields.username ? 'YES' : 'NO'}
                  </span>
                </div>
              </div>
              <input
                className={`form-input ${errors.username ? 'is-invalid' : ''}`}
                {...register('username', {
                  required: 'Username bắt buộc phải nhập',
                  minLength: { value: 4, message: 'Username phải từ 4 ký tự trở lên' },
                })}
              />
              {errors.username && <div className="error-feedback">⚠️ {errors.username.message}</div>}
              <div className="input-hint">Giá trị ban đầu (default): "{INITIAL_DEFAULTS.username}"</div>
            </div>

            {/* Field: Email */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Email Công Vụ <span className="required">*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <span className={`status-pill ${dirtyFields.email ? 'status-pill-true' : 'status-pill-false'}`}>
                    Dirty: {dirtyFields.email ? 'YES' : 'NO'}
                  </span>
                  <span className={`status-pill ${touchedFields.email ? 'status-pill-true' : 'status-pill-false'}`}>
                    Touched: {touchedFields.email ? 'YES' : 'NO'}
                  </span>
                </div>
              </div>
              <input
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Email bắt buộc phải có',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Email không đúng chuẩn' },
                })}
              />
              {errors.email && <div className="error-feedback">⚠️ {errors.email.message}</div>}
              <div className="input-hint">Giá trị ban đầu (default): "{INITIAL_DEFAULTS.email}"</div>
            </div>

            {/* Field: Score */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Điểm Chuyên Môn <span className="required">* (0 - 100)</span>
                </label>
                <div style={{ display: 'flex', gap: '0.3rem' }}>
                  <span className={`status-pill ${dirtyFields.score ? 'status-pill-true' : 'status-pill-false'}`}>
                    Dirty: {dirtyFields.score ? 'YES' : 'NO'}
                  </span>
                  <span className={`status-pill ${touchedFields.score ? 'status-pill-true' : 'status-pill-false'}`}>
                    Touched: {touchedFields.score ? 'YES' : 'NO'}
                  </span>
                </div>
              </div>
              <input
                type="number"
                className={`form-input ${errors.score ? 'is-invalid' : ''}`}
                {...register('score', {
                  valueAsNumber: true,
                  required: 'Vui lòng cho điểm chuyên môn',
                  min: { value: 0, message: 'Điểm tối thiểu là 0' },
                  max: { value: 100, message: 'Điểm tối đa là 100' },
                })}
              />
              {errors.score && <div className="error-feedback">⚠️ {errors.score.message}</div>}
              <div className="input-hint">Giá trị ban đầu (default): {INITIAL_DEFAULTS.score}</div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '0.75rem' }}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting ? '⏳ Đang Xử Lý Gửi Form (1500ms)...' : '🚀 Submit Đánh Giá (handleSubmit)'}
            </button>
          </form>
        </div>

        {/* Live Inspectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Detailed formState JSON Inspector */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🔍</span> Trực Quan Hóa formState Metadata (Raw JSON)
              </div>
            </div>

            <div className="inspector-panel" style={{ minHeight: '180px' }}>
              <pre>{JSON.stringify({
                isDirty,
                isValid,
                isSubmitting,
                dirtyFields,
                touchedFields,
                errors: Object.keys(errors).reduce((acc, key) => ({
                  ...acc,
                  [key]: { type: errors[key]?.type, message: errors[key]?.message }
                }), {}),
              }, null, 2)}</pre>
            </div>
          </div>

          {/* Submission History Log */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>📦</span> Lịch Sử Submits Thành Công
              </div>
              <span className="badge badge-emerald">{submitHistory.length} Lần</span>
            </div>

            <div className="inspector-panel" style={{ minHeight: '120px' }}>
              {submitHistory.length === 0 ? (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Chưa có lần submit nào. Hãy thử bấm Submit để xem trạng thái isSubmitting...
                </div>
              ) : (
                submitHistory.map((item) => (
                  <div key={item.id} style={{ padding: '0.4rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: '600', marginRight: '0.5rem' }}>
                      [{item.time}]
                    </span>
                    <span>Payload: {JSON.stringify(item.data)}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

