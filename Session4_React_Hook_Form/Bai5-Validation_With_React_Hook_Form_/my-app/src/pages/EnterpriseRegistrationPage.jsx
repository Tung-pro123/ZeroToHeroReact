import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function EnterpriseRegistrationPage() {
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      age: 26,
      department: 'DEVELOPMENT',
      bio: '',
      agreePolicy: false,
    },
  });

  const bioContent = watch('bio') || '';

  const onSubmit = (data) => {
    setSubmittedData({
      ...data,
      receivedTimestamp: new Date().toISOString(),
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-blue">FULLSCALE LAB</span>
              <span className="badge badge-emerald">FRONTEND UX + BACKEND SECURITY</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Biểu Mẫu Doanh Nghiệp &amp; Đối Chiếu Spring Boot Validation
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Tổng hợp toàn bộ các quy tắc thẩm định trong một form đăng ký nhân viên hoàn chỉnh, và đối chiếu 1-1 với các Bean Validation Annotation trong Spring Boot.
            </p>
          </div>
          <RenderCounter name="EnterpriseRegistrationPage" />
        </div>
      </div>

      {/* Main Grid: Form & Spring Boot Side-by-Side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Column */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>📝</span> Hồ Sơ Đăng Ký Tài Khoản Kỹ Sư
            </div>
            <button type="button" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} onClick={() => reset()}>
              Reset
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div className="form-group">
              <label className="form-label">
                Tên Đăng Nhập <span className="required">* (3 - 20 ký tự, không chứa ký tự đặc biệt)</span>
              </label>
              <input
                className={`form-input ${errors.username ? 'is-invalid' : ''}`}
                {...register('username', {
                  required: 'Username là bắt buộc',
                  minLength: { value: 3, message: 'Username tối thiểu 3 ký tự' },
                  maxLength: { value: 20, message: 'Username không quá 20 ký tự' },
                  pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Username chỉ được gồm chữ và số' },
                  validate: (v) => !['admin', 'root', 'system'].includes(v.toLowerCase()) || 'Username này không được phép!',
                })}
                placeholder="ví dụ: tran_thi_mai"
              />
              {errors.username && <div className="error-feedback">⚠️ {errors.username.message}</div>}
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                Email Công Ty <span className="required">*</span>
              </label>
              <input
                className={`form-input ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Email là bắt buộc',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Địa chỉ email không đúng chuẩn',
                  },
                })}
                placeholder="mai.tran@company.com"
              />
              {errors.email && <div className="error-feedback">⚠️ {errors.email.message}</div>}
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                Mật Khẩu <span className="required">* (tối thiểu 8 ký tự, có cả chữ và số)</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: { value: 8, message: 'Mật khẩu phải từ 8 ký tự' },
                  validate: (v) => (/[A-Za-z]/.test(v) && /[0-9]/.test(v)) || 'Mật khẩu phải chứa cả chữ cái và chữ số!',
                })}
                placeholder="••••••••"
              />
              {errors.password && <div className="error-feedback">⚠️ {errors.password.message}</div>}
            </div>

            {/* Age & Department Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  Độ Tuổi <span className="required">* (18 - 65)</span>
                </label>
                <input
                  type="number"
                  className={`form-input ${errors.age ? 'is-invalid' : ''}`}
                  {...register('age', {
                    valueAsNumber: true,
                    required: 'Vui lòng nhập tuổi',
                    min: { value: 18, message: 'Phải từ 18 tuổi trở lên' },
                    max: { value: 65, message: 'Không vượt quá 65 tuổi' },
                  })}
                />
                {errors.age && <div className="error-feedback">⚠️ {errors.age.message}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Phòng Ban</label>
                <select className="form-select" {...register('department')}>
                  <option value="DEVELOPMENT">Phát Triển (R&amp;D)</option>
                  <option value="SECURITY">An Toàn Thông Tin</option>
                  <option value="INFRASTRUCTURE">Hạ Tầng DevOps</option>
                </select>
              </div>
            </div>

            {/* Bio with Live Character Count */}
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label">Tóm Tắt Kỹ Năng (Tối đa 100 ký tự)</label>
                <span style={{ fontSize: '0.75rem', color: bioContent.length > 100 ? 'var(--accent-rose)' : 'var(--text-muted)' }}>
                  {bioContent.length}/100 ký tự
                </span>
              </div>
              <textarea
                rows={3}
                className={`form-textarea ${errors.bio ? 'is-invalid' : ''}`}
                {...register('bio', {
                  maxLength: { value: 100, message: 'Tóm tắt không được vượt quá 100 ký tự' },
                })}
                placeholder="Mô tả ngắn về kinh nghiệm chuyên môn..."
              />
              {errors.bio && <div className="error-feedback">⚠️ {errors.bio.message}</div>}
            </div>

            {/* Terms Checkbox */}
            <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                id="agreePolicy"
                {...register('agreePolicy', {
                  required: 'Bạn bắt buộc phải đồng ý với nội quy công ty',
                })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <label htmlFor="agreePolicy" style={{ fontSize: '0.85rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                Cam kết tuân thủ chính sách bảo mật nội bộ <span className="required">*</span>
              </label>
            </div>
            {errors.agreePolicy && <div className="error-feedback" style={{ marginBottom: '1rem' }}>⚠️ {errors.agreePolicy.message}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Hoàn Tất &amp; Gửi Dữ Liệu
            </button>
          </form>
        </div>

        {/* Spring Boot Dual Defense Comparison Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Spring Boot Code Display */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem', color: '#38bdf8' }}>
                <span>🛡️</span> Đối Chiếu Tương Đương Phía Spring Boot Java
              </div>
              <span className="badge badge-cyan">DTO Bean Validation</span>
            </div>

            <div className="code-block" style={{ fontSize: '0.78rem' }}>
              <span className="code-keyword">public class</span> <span className="code-func">EmployeeRegisterDto</span> {'{'}<br /><br />
              &nbsp;&nbsp;<span className="code-comment">// Tương đương required + minLength + maxLength + pattern</span><br />
              &nbsp;&nbsp;<span className="code-keyword">@NotBlank</span>(message = <span className="code-string">"Username là bắt buộc"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">@Size</span>(min = 3, max = 20, message = <span className="code-string">"Từ 3 đến 20 ký tự"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">@Pattern</span>(regexp = <span className="code-string">"^[a-zA-Z0-9]+$"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">private</span> String username;<br /><br />

              &nbsp;&nbsp;<span className="code-comment">// Tương đương pattern email</span><br />
              &nbsp;&nbsp;<span className="code-keyword">@NotBlank</span><br />
              &nbsp;&nbsp;<span className="code-keyword">@Email</span>(message = <span className="code-string">"Email không đúng định dạng"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">private</span> String email;<br /><br />

              &nbsp;&nbsp;<span className="code-comment">// Tương đương min: 18, max: 65</span><br />
              &nbsp;&nbsp;<span className="code-keyword">@NotNull</span><br />
              &nbsp;&nbsp;<span className="code-keyword">@Min</span>(value = 18, message = <span className="code-string">"Phải >= 18 tuổi"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">@Max</span>(value = 65, message = <span className="code-string">"Không quá 65 tuổi"</span>)<br />
              &nbsp;&nbsp;<span className="code-keyword">private</span> Integer age;<br />
              {'}'}
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.5' }}>
              💡 <strong>Nguyên lý bảo mật:</strong> Dù RHF chặn lỗi xuất sắc trên trình duyệt, hacker hoàn toàn có thể gửi HTTP Request qua Postman. 
              Do đó, hệ thống bắt buộc phải duy trì <strong>Dual Validation (Kiểm tra kép)</strong> ở cả Client và Server.
            </p>
          </div>

          {/* Success Payload Output */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>📦</span> Clean JSON Sẵn Sàng Gửi Backend
              </div>
              {submittedData && <span className="badge badge-emerald">Valid</span>}
            </div>

            <div className="inspector-panel" style={{ minHeight: '140px' }}>
              {submittedData ? (
                <pre>{JSON.stringify(submittedData, null, 2)}</pre>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>
                  // Hãy hoàn thành các trường hợp lệ và bấm Submit...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

