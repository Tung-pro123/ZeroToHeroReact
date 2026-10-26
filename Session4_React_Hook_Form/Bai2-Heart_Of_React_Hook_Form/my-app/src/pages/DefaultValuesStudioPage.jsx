import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function DefaultValuesStudioPage() {
  // Hybrid React State for UI toggle (Show/Hide Password, Edit/Preview Mode)
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Initial user profile fetched from DB
  const initialProfile = {
    displayName: 'Nguyễn Thanh Tùng',
    email: 'tung.nguyen@enterprise.com',
    secretKey: 'PROD_SEC_9921_KEY',
    notificationLevel: 'ALL',
    themePreference: 'DARK_NEON',
  };

  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = useForm({
    defaultValues: initialProfile,
  });

  const onSaveProfile = (data) => {
    setIsSaved(true);
    // Reset form with new values so isDirty returns to false!
    reset(data);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
        <h2 className="card-title">
          <span>⚙️</span> defaultValues Studio & Kết Hợp Cùng useState
        </h2>
        <p className="card-subtitle">
          Khám phá cơ chế khởi tạo dữ liệu mặc định với <code>useForm(&#123; defaultValues &#125;)</code> và giải mã thắc mắc: 
          <em>"Dùng React Hook Form rồi thì có cần useState nữa không?"</em>
        </p>

        {/* Profile Form */}
        <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: '0.3rem' }}>Profile Editor</span>
              <h3 style={{ color: '#f8fafc', fontSize: '1.15rem', fontWeight: 700 }}>
                Hồ Sơ Chuyên Gia (Edit Profile)
              </h3>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span className={`badge ${isDirty ? 'badge-amber' : 'badge-cyan'}`}>
                {isDirty ? '⚠️ Đã thay đổi (isDirty)' : '✓ Đồng bộ dữ liệu gốc'}
              </span>
              <button
                onClick={() => reset(initialProfile)}
                disabled={!isDirty}
                className="btn btn-secondary btn-sm"
                style={{ opacity: !isDirty ? 0.4 : 1 }}
              >
                Hoàn tác thay đổi
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSaveProfile)}>
            <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Họ và tên (displayName)
                </label>
                <input
                  type="text"
                  {...register('displayName', { required: 'Họ tên không được để trống' })}
                  className="form-input"
                />
                {errors.displayName && <div className="field-error-msg">⚠️ {errors.displayName.message}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Email công ty (email)
                </label>
                <input
                  type="email"
                  {...register('email', { required: 'Email là bắt buộc' })}
                  className="form-input"
                />
              </div>

              {/* Secret Key with useState toggle */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 600 }}>
                    Khóa bảo mật API (secretKey)
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{ fontSize: '0.74rem', color: '#38bdf8', background: 'none' }}
                  >
                    {showPassword ? '🙈 Ẩn mã bí mật' : '👁️ Hiện mã bí mật'} (useState)
                  </button>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('secretKey')}
                  className="form-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Cấp độ thông báo (notificationLevel)
                </label>
                <select {...register('notificationLevel')} className="form-select">
                  <option value="ALL">Tất cả thông báo</option>
                  <option value="CRITICAL_ONLY">Chỉ sự cố khẩn cấp</option>
                  <option value="NONE">Tắt toàn bộ</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button type="submit" disabled={!isDirty} className="btn btn-emerald" style={{ opacity: !isDirty ? 0.5 : 1 }}>
                Lưu Thay Đổi (Save Profile) 💾
              </button>

              {isSaved && (
                <span style={{ color: '#34d399', fontSize: '0.88rem', fontWeight: 600 }}>
                  ✓ Đã lưu thành công! isDirty đã được reset về false.
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Why useState is still essential */}
        <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🧠</span> Khi Nào Vẫn Cần Dùng useState Song Song Với React Hook Form?
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Nhiều bạn nghĩ rằng khi đã có RHF thì bỏ hoàn toàn <code>useState</code>. Đây là sai lầm! 
            Hãy phân định theo bản chất dữ liệu:
          </p>
          <ul style={{ fontSize: '0.85rem', color: '#94a3b8', paddingLeft: '1.2rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
            <li><strong style={{ color: '#38bdf8' }}>Dùng React Hook Form cho:</strong> Form inputs, validation, form lifecycle, dữ liệu gửi lên API.</li>
            <li><strong style={{ color: '#f472b6' }}>Dùng React useState cho:</strong> Trạng thái hiển thị giao diện thuần túy (UI State) như: ẩn/hiện mật khẩu (<code>showPassword</code>), mở/đóng Modal popup, chuyển đổi Dark/Light mode, tab đang active...</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
