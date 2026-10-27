import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

const BLACKLISTED_USERNAMES = ['admin', 'root', 'administrator', 'superuser', 'system'];
const ALLOWED_DOMAINS = ['fpt.com', 'viettel.vn', 'google.com', 'techcorp.io'];

export default function CustomValidateLabPage() {
  const [successData, setSuccessData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: 'onChange', // Kích hoạt real-time để thấy checklist cập nhật
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
      corporateEmail: '',
    },
  });

  const currentValues = watch();

  const onSubmit = (data) => {
    setSuccessData(data);
  };

  // Helper checks cho visual checklist
  const isLengthValid = (currentValues.password || '').length >= 8;
  const hasUpperCase = /[A-Z]/.test(currentValues.password || '');
  const hasLowerCase = /[a-z]/.test(currentValues.password || '');
  const hasDigit = /[0-9]/.test(currentValues.password || '');
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(currentValues.password || '');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span className="badge badge-purple">CUSTOM VALIDATION</span>
              <span className="badge badge-emerald">BUSINESS LOGIC ENGINE</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800' }}>
              Cơ Chế Custom validate: Giải Quyết Mọi Bài Toán Nghiệp Vụ Phức Tạp
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Khi các rule built-in không đủ diễn tả nghiệp vụ (như cấm username <code>admin</code>, so khớp mật khẩu xác nhận, hoặc lọc tên miền email), 
              hàm <code>validate: (value, formValues) =&gt; true | "Error Message"</code> là chìa khóa vạn năng.
            </p>
          </div>
          <RenderCounter name="CustomValidateLabPage" />
        </div>
      </div>

      {/* Code Breakdown & Mental Model */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>🧠</span> 3 Cấp Độ Viết Hàm validate
          </div>
          <span className="badge badge-cyan">Syntax Breakdown</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1rem' }}>
          <div className="code-block" style={{ fontSize: '0.78rem' }}>
            <span className="code-comment">// Cấp độ 1: Trả về boolean hoặc chuỗi lỗi (Toán tử ||)</span><br />
            <span className="code-prop">validate</span>: (<span className="code-func">val</span>) =&gt; <span className="code-func">val</span> !== <span className="code-string">"admin"</span> || <span className="code-string">"Tên này đã bị cấm!"</span>
          </div>

          <div className="code-block" style={{ fontSize: '0.78rem' }}>
            <span className="code-comment">// Cấp độ 2: Truyền formValues để so sánh chéo giữa 2 trường</span><br />
            <span className="code-prop">validate</span>: (<span className="code-func">val</span>, <span className="code-func">formValues</span>) =&gt; <br />
            &nbsp;&nbsp;<span className="code-func">val</span> === <span className="code-func">formValues</span>.password || <span className="code-string">"Mật khẩu xác nhận không khớp!"</span>
          </div>

          <div className="code-block" style={{ fontSize: '0.78rem' }}>
            <span className="code-comment">// Cấp độ 3: Object chứa nhiều hàm custom độc lập</span><br />
            <span className="code-prop">validate</span>: {'{'}<br />
            &nbsp;&nbsp;<span className="code-func">noAdmin</span>: (<span className="code-func">v</span>) =&gt; <span className="code-func">v</span> !== <span className="code-string">"admin"</span> || <span className="code-string">"Cấm admin"</span>,<br />
            &nbsp;&nbsp;<span className="code-func">noSpaces</span>: (<span className="code-func">v</span>) =&gt; !/\s/.<span className="code-func">test</span>(<span className="code-func">v</span>) || <span className="code-string">"Không có khoảng trắng"</span><br />
            {'}'}
          </div>
        </div>
      </div>

      {/* Interactive Form & Live Real-Time Strength Meter */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <span>✍️</span> Thử Nghiệm Form Custom Validate
            </div>
            <span className="badge badge-purple">Real-Time (mode: onChange)</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Field: Username */}
            <div className="form-group">
              <label className="form-label">
                Tên Người Dùng (Username) <span className="required">* (Không được là admin/root/system)</span>
              </label>
              <input
                className={`form-input ${errors.username ? 'is-invalid' : ''}`}
                {...register('username', {
                  required: 'Username bắt buộc phải có',
                  minLength: { value: 3, message: 'Tối thiểu 3 ký tự' },
                  validate: {
                    notBlacklisted: (value) =>
                      !BLACKLISTED_USERNAMES.includes(value.toLowerCase().trim()) ||
                      `Tên "${value}" là từ khóa đặc quyền hệ thống, không được sử dụng!`,
                    noSpecialSymbols: (value) =>
                      /^[a-zA-Z0-9_]+$/.test(value) ||
                      'Username chỉ được chứa chữ cái, số và dấu gạch dưới (_)',
                  },
                })}
                placeholder="Thử gõ 'admin' hoặc 'root' xem điều gì xảy ra..."
              />
              {errors.username && <div className="error-feedback">⚠️ {errors.username.message}</div>}
              <div className="input-hint">Blacklist: admin, root, administrator, superuser, system</div>
            </div>

            {/* Field: Corporate Email */}
            <div className="form-group">
              <label className="form-label">
                Email Doanh Nghiệp <span className="required">* (Miền cho phép: fpt.com, viettel.vn, google.com)</span>
              </label>
              <input
                className={`form-input ${errors.corporateEmail ? 'is-invalid' : ''}`}
                {...register('corporateEmail', {
                  required: 'Vui lòng nhập email công ty',
                  validate: (value) => {
                    const parts = value.split('@');
                    if (parts.length !== 2) return 'Email không hợp lệ (thiếu ký tự @)';
                    const domain = parts[1].toLowerCase();
                    if (!ALLOWED_DOMAINS.includes(domain)) {
                      return `Miền @${domain} không được phép! Chỉ chấp nhận: ${ALLOWED_DOMAINS.join(', ')}`;
                    }
                    return true;
                  },
                })}
                placeholder="ví dụ: developer@fpt.com"
              />
              {errors.corporateEmail && <div className="error-feedback">⚠️ {errors.corporateEmail.message}</div>}
            </div>

            {/* Field: Password */}
            <div className="form-group">
              <label className="form-label">
                Mật Khẩu <span className="required">* (Phức tạp đa tiêu chuẩn)</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.password ? 'is-invalid' : ''}`}
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  validate: {
                    hasUpper: (v) => /[A-Z]/.test(v) || 'Mật khẩu phải có ít nhất 1 chữ in HOA (A-Z)',
                    hasLower: (v) => /[a-z]/.test(v) || 'Mật khẩu phải có ít nhất 1 chữ in thường (a-z)',
                    hasNumber: (v) => /[0-9]/.test(v) || 'Mật khẩu phải có ít nhất 1 chữ số (0-9)',
                    hasSymbol: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) || 'Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$...)',
                  },
                })}
                placeholder="Nhập mật khẩu mạnh..."
              />
              {errors.password && <div className="error-feedback">⚠️ {errors.password.message}</div>}
            </div>

            {/* Field: Confirm Password (Cross-field validation) */}
            <div className="form-group">
              <label className="form-label">
                Xác Nhận Mật Khẩu (Confirm Password) <span className="required">* (Phải khớp với mật khẩu trên)</span>
              </label>
              <input
                type="password"
                className={`form-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                {...register('confirmPassword', {
                  required: 'Vui lòng xác nhận mật khẩu',
                  validate: (val, formValues) =>
                    val === formValues.password || 'Mật khẩu xác nhận KHÔNG KHỚP với mật khẩu đã nhập!',
                })}
                placeholder="Gõ lại chính xác mật khẩu..."
              />
              {errors.confirmPassword && <div className="error-feedback">⚠️ {errors.confirmPassword.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
              Kiểm Tra Toàn Bộ Business Rules
            </button>
          </form>
        </div>

        {/* Live Visual Checklist & Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Password Security Checklist */}
          <div className="card">
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🛡️</span> Bộ Tiêu Chuẩn Bảo Mật Mật Khẩu (Live Checklist)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`rule-check-pill ${isLengthValid ? 'rule-check-pass' : 'rule-check-fail'}`}>
                  {isLengthValid ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span>Tối thiểu 8 ký tự</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`rule-check-pill ${hasUpperCase ? 'rule-check-pass' : 'rule-check-fail'}`}>
                  {hasUpperCase ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span>Chứa ít nhất 1 chữ IN HOA (A-Z)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`rule-check-pill ${hasLowerCase ? 'rule-check-pass' : 'rule-check-fail'}`}>
                  {hasLowerCase ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span>Chứa ít nhất 1 chữ thường (a-z)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`rule-check-pill ${hasDigit ? 'rule-check-pass' : 'rule-check-fail'}`}>
                  {hasDigit ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span>Chứa ít nhất 1 chữ số (0-9)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className={`rule-check-pill ${hasSpecialChar ? 'rule-check-pass' : 'rule-check-fail'}`}>
                  {hasSpecialChar ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span>Chứa ký tự đặc biệt (!@#$%^&amp;*)</span>
              </div>
            </div>
          </div>

          {/* Validation Success Output */}
          <div className="card" style={{ flex: 1 }}>
            <div className="card-header">
              <div className="card-title" style={{ fontSize: '1rem' }}>
                <span>🎉</span> Kết Quả onSubmit Sau Khi Vượt Qua Custom Rules
              </div>
              {successData && <span className="badge badge-emerald">Valid Payload</span>}
            </div>

            <div className="inspector-panel" style={{ minHeight: '140px' }}>
              {successData ? (
                <pre>{JSON.stringify(successData, null, 2)}</pre>
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>
                  // Hãy điền dữ liệu thỏa mãn các điều kiện nghiệp vụ và bấm submit...
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

