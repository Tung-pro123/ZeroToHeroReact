import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

const INITIAL_PROFILE = {
  displayName: 'Trần Anh Khoa',
  jobTitle: 'Senior Cloud Architect',
  workPhone: '0901234567',
  officeLocation: 'HANOI_CAMPUS',
  bio: 'Chuyên gia thiết kế kiến trúc hệ thống phân tán và bảo mật đám mây.',
};

export default function EditProfileStudioPage() {
  const [currentProfile, setCurrentProfile] = useState(INITIAL_PROFILE);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
      isDirty,
      dirtyFields,
      touchedFields,
      isValid,
      isSubmitting,
    },
  } = useForm({
    mode: 'onChange',
    defaultValues: currentProfile,
  });

  const bioContent = watch('bio') || '';

  const onSaveProfile = async (formData) => {
    setSaveSuccessMsg('');
    // Giả lập lưu vào cơ sở dữ liệu qua REST API với độ trễ 1.2s
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setCurrentProfile(formData);
    // Reset form với dữ liệu mới, giúp isDirty tự động trở về false!
    reset(formData);
    setSaveSuccessMsg('Hồ sơ nhân sự đã được cập nhật thành công vào cơ sở dữ liệu!');
  };

  const onRevertChanges = () => {
    reset(currentProfile);
    setSaveSuccessMsg('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-emerald">REAL-WORLD APPLICATION</span>
              <span className="badge badge-indigo">EDIT FORM DIRTY TRACKING</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Studio Cập Nhật Hồ Sơ: Quản Trị Trạng Thái Form Doanh Nghiệp
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Áp dụng thực tế <code>isDirty</code>, <code>dirtyFields</code>, <code>isValid</code>, và <code>isSubmitting</code> để 
              xây dựng trải nghiệm chỉnh sửa hồ sơ mượt mà, khóa nút lưu thông minh và ngăn chặn double-submit.
            </p>
          </div>
          <RenderCounter name="EditProfileStudioPage" />
        </div>
      </div>

      {/* Success Notification Alert */}
      {saveSuccessMsg && (
        <div style={{ background: 'rgba(16, 185, 129, 0.12)', border: '1px solid var(--accent-emerald)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>🎉 {saveSuccessMsg}</span>
          <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }} onClick={() => setSaveSuccessMsg('')}>
            Đóng
          </button>
        </div>
      )}

      {/* Main Grid: Edit Form & Live Preview Card */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Column */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>✍️</span> Chỉnh Sửa Thông Tin Cá Nhân
            </div>
            {isDirty ? (
              <span className="badge badge-amber">Có {Object.keys(dirtyFields).length} Thay Đổi</span>
            ) : (
              <span className="badge badge-indigo">Chưa Thay Đổi</span>
            )}
          </div>

          <form onSubmit={handleSubmit(onSaveProfile)}>
            {/* Field: Display Name */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Họ và Tên Hiển Thị <span className="required">*</span>
                </label>
                {dirtyFields.displayName && (
                  <span className="status-pill status-pill-true">✏️ Đã chỉnh sửa</span>
                )}
              </div>
              <input
                className={`form-input ${errors.displayName ? 'is-invalid' : ''}`}
                {...register('displayName', {
                  required: 'Họ tên không được để trống',
                  minLength: { value: 3, message: 'Họ tên phải từ 3 ký tự trở lên' },
                })}
              />
              {errors.displayName && <div className="error-feedback">⚠️ {errors.displayName.message}</div>}
            </div>

            {/* Field: Job Title */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">
                  Chức Danh Chuyên Môn <span className="required">*</span>
                </label>
                {dirtyFields.jobTitle && (
                  <span className="status-pill status-pill-true">✏️ Đã chỉnh sửa</span>
                )}
              </div>
              <input
                className={`form-input ${errors.jobTitle ? 'is-invalid' : ''}`}
                {...register('jobTitle', {
                  required: 'Chức danh là bắt buộc',
                })}
              />
              {errors.jobTitle && <div className="error-feedback">⚠️ {errors.jobTitle.message}</div>}
            </div>

            {/* Field: Work Phone & Office Location */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Số Điện Thoại</label>
                  {dirtyFields.workPhone && <span className="status-pill status-pill-true">✏️</span>}
                </div>
                <input
                  className={`form-input ${errors.workPhone ? 'is-invalid' : ''}`}
                  {...register('workPhone', {
                    pattern: { value: /^[0-9]{10}$/, message: 'Phải gồm 10 chữ số' },
                  })}
                />
                {errors.workPhone && <div className="error-feedback">⚠️ {errors.workPhone.message}</div>}
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="form-label">Văn Phòng</label>
                  {dirtyFields.officeLocation && <span className="status-pill status-pill-true">✏️</span>}
                </div>
                <select className="form-select" {...register('officeLocation')}>
                  <option value="HANOI_CAMPUS">Hà Nội (Keangnam)</option>
                  <option value="DANANG_CAMPUS">Đà Nẵng (FPT City)</option>
                  <option value="HCM_CAMPUS">TP. Hồ Chí Minh (Q9)</option>
                </select>
              </div>
            </div>

            {/* Field: Bio */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Tiểu Sử Tóm Tắt (Bio)</label>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  {dirtyFields.bio && <span className="status-pill status-pill-true">✏️ Đã sửa</span>}
                  <span style={{ fontSize: '0.75rem', color: bioContent.length > 150 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                    {bioContent.length}/150
                  </span>
                </div>
              </div>
              <textarea
                rows={3}
                className={`form-textarea ${errors.bio ? 'is-invalid' : ''}`}
                {...register('bio', {
                  maxLength: { value: 150, message: 'Tiểu sử không được vượt quá 150 ký tự' },
                })}
              />
              {errors.bio && <div className="error-feedback">⚠️ {errors.bio.message}</div>}
            </div>

            {/* Smart Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ flex: 1 }}
                disabled={!isDirty || !isValid || isSubmitting}
                title={!isDirty ? 'Không có thay đổi nào để lưu' : !isValid ? 'Form đang có lỗi' : 'Lưu dữ liệu'}
              >
                {isSubmitting ? (
                  <>⏳ Đang Lưu Dữ Liệu...</>
                ) : (
                  <>💾 Lưu Thay Đổi ({Object.keys(dirtyFields).length})</>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline"
                disabled={!isDirty || isSubmitting}
                onClick={onRevertChanges}
              >
                🔄 Khôi Phục Gốc
              </button>
            </div>
          </form>
        </div>

        {/* Live Employee Profile Card Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Official Badge Card */}
          <div className="card" style={{ background: 'linear-gradient(180deg, #162035 0%, #0d1424 100%)', borderColor: '#3b82f6' }}>
            <div className="card-header" style={{ marginBottom: '0.75rem' }}>
              <div className="card-title" style={{ fontSize: '1rem', color: '#60a5fa' }}>
                <span>🪪</span> Thẻ Nhân Viên Đang Lưu Trên Server
              </div>
              <span className="badge badge-emerald">Synced with DB</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800' }}>
                {currentProfile.displayName.charAt(0)}
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800' }}>{currentProfile.displayName}</h3>
                <p style={{ color: 'var(--primary-light)', fontSize: '0.85rem' }}>{currentProfile.jobTitle}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>📍 {currentProfile.officeLocation}</p>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '0.875rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <strong>Tiểu sử:</strong> {currentProfile.bio || 'Chưa cập nhật tiểu sử.'}
            </div>
            <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              📞 Hotline liên hệ: <strong style={{ color: 'var(--text-primary)' }}>{currentProfile.workPhone}</strong>
            </div>
          </div>

          {/* FormState Control Logic Explanation */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🧠</span> Logic Điều Khiển Nút "Lưu Thay Đổi"
              </div>
            </div>

            <div className="code-block" style={{ fontSize: '0.78rem' }}>
              <span className="code-comment">// Nút "Lưu" bị vô hiệu hóa khi thỏa 1 trong 3 điều kiện:</span><br />
              <span className="code-prop">disabled</span>={'{'}!<span className="code-func">isDirty</span> || !<span className="code-func">isValid</span> || <span className="code-func">isSubmitting</span>{'}'}<br /><br />
              <span className="code-comment">// 1. !isDirty: Ngăn gửi request thừa khi user chưa sửa gì</span><br />
              <span className="code-comment">// 2. !isValid: Ngăn submit khi dữ liệu chưa đạt validation rules</span><br />
              <span className="code-comment">// 3. isSubmitting: Khóa nút tức thì khi đang gửi mạng để chống click đúp</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

