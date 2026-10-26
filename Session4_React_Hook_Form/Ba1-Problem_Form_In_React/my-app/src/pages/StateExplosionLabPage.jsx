import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

export default function StateExplosionLabPage() {
  const [mode, setMode] = useState('singleObject'); // 'separate' or 'singleObject'
  const [showValidation, setShowValidation] = useState(true);

  // Form state
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    address: '',
    bio: '',
  });

  // Manual Errors State (Simulating state explosion)
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Manual validation during keystroke
    if (showValidation) {
      validateField(name, value);
    }
  };

  const validateField = (name, value) => {
    let err = '';
    if (name === 'username' && value.length > 0 && value.length < 3) {
      err = 'Username phải từ 3 ký tự trở lên';
    } else if (name === 'email' && value.length > 0 && !value.includes('@')) {
      err = 'Email phải chứa ký tự @';
    } else if (name === 'password' && value.length > 0 && value.length < 8) {
      err = 'Mật khẩu phải từ 8 ký tự trở lên';
    } else if (name === 'confirmPassword' && value !== formData.password) {
      err = 'Mật khẩu xác nhận không khớp';
    } else if (name === 'age' && value.length > 0 && Number(value) < 18) {
      err = 'Tuổi phải từ 18 trở lên';
    }

    setErrors((prev) => ({
      ...prev,
      [name]: err,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username là bắt buộc';
    if (!formData.email) newErrors.email = 'Email là bắt buộc';
    if (!formData.password) newErrors.password = 'Mật khẩu là bắt buộc';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    if (!formData.age || Number(formData.age) < 18) newErrors.age = 'Phải đủ 18 tuổi';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmittedData(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      age: '',
      address: '',
      bio: '',
    });
    setErrors({});
    setSubmittedData(null);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #f43f5e' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="card-title">
              <span>💥</span> Khủng Hoảng Bùng Nổ State (The 10-Field Monster Form)
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              Khi một form thực tế có từ 10 trường trở lên, bạn sẽ chứng kiến sự bùng nổ của <strong>Boilerplate Code</strong> và <strong>Re-render Heatmap</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <RenderCounter label="Form Total Renders" />
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              🔄 Reset Form
            </button>
          </div>
        </div>

        {/* Control toolbar */}
        <div style={{ background: '#030610', padding: '1rem 1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Chế độ quản lý State:</span>
            <button
              onClick={() => setMode('separate')}
              className={`btn btn-sm ${mode === 'separate' ? 'btn-primary' : 'btn-secondary'}`}
            >
              10 State riêng lẻ (10 useState)
            </button>
            <button
              onClick={() => setMode('singleObject')}
              className={`btn btn-sm ${mode === 'singleObject' ? 'btn-primary' : 'btn-secondary'}`}
            >
              1 Object State gộp ({'{ [name]: value }'})
            </button>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#cbd5e1', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={showValidation}
              onChange={(e) => setShowValidation(e.target.checked)}
            />
            <span>Bật Validation thủ công khi gõ</span>
          </label>
        </div>

        {/* Code comparison callout */}
        <div style={{ background: 'rgba(244, 63, 94, 0.06)', border: '1px solid rgba(244, 63, 94, 0.25)', padding: '1rem 1.25rem', borderRadius: '10px', marginBottom: '1.5rem' }}>
          <div style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.35rem' }}>
            {mode === 'separate' ? '⚠️ Góc nhìn 10 useState:' : '💡 Góc nhìn 1 Object State:'}
          </div>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: '0.8rem', color: '#cbd5e1' }}>
            {mode === 'separate' ? (
              <span>
                const [username, setUsername] = useState("");<br />
                const [firstName, setFirstName] = useState("");<br />
                const [lastName, setLastName] = useState("");<br />
                ... (còn 7 state nữa + 10 error states + 10 handlers onChange)
              </span>
            ) : (
              <span>
                const [form, setForm] = useState(&#123; username: "", email: "", ... &#125;);<br />
                function handleChange(e) &#123; setForm(prev =&gt; (&#123; ...prev, [e.target.name]: e.target.value &#125;)); &#125;
              </span>
            )}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.5rem' }}>
            👉 <strong>Vấn đề còn lại:</strong> Dù gộp vào 1 Object, mỗi lần bạn gõ 1 chữ ở trường <em>Bio</em>, toàn bộ Component này vẫn <strong>re-render lại từ đầu</strong> và tính toán lại toàn bộ 10 inputs!
          </div>
        </div>

        {/* The 10-Field Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
            {/* Field 1 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>1. Tên tài khoản (username) *</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="tung_nguyen"
                className={`form-input ${errors.username ? 'input-error' : ''}`}
              />
              {errors.username && <div className="field-error-msg">⚠️ {errors.username}</div>}
            </div>

            {/* Field 2 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>2. Tên (First Name)</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Tùng"
                className="form-input"
              />
            </div>

            {/* Field 3 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>3. Họ và tên đệm (Last Name)</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Nguyễn Thanh"
                className="form-input"
              />
            </div>

            {/* Field 4 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>4. Địa chỉ Email *</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tung@example.com"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
              />
              {errors.email && <div className="field-error-msg">⚠️ {errors.email}</div>}
            </div>

            {/* Field 5 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>5. Số điện thoại (Phone)</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0987654321"
                className="form-input"
              />
            </div>

            {/* Field 6 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>6. Mật khẩu (Password) *</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Tối thiểu 8 ký tự"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
              />
              {errors.password && <div className="field-error-msg">⚠️ {errors.password}</div>}
            </div>

            {/* Field 7 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>7. Xác nhận mật khẩu *</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Nhập lại mật khẩu"
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
              />
              {errors.confirmPassword && <div className="field-error-msg">⚠️ {errors.confirmPassword}</div>}
            </div>

            {/* Field 8 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>8. Tuổi (Age) *</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="18+"
                className={`form-input ${errors.age ? 'input-error' : ''}`}
              />
              {errors.age && <div className="field-error-msg">⚠️ {errors.age}</div>}
            </div>

            {/* Field 9 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>9. Địa chỉ thường trú</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Quận 1, TP. Hồ Chí Minh"
                className="form-input"
              />
            </div>

            {/* Field 10 */}
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                <span>10. Tiểu sử (Bio / Ghi chú)</span>
                <RenderCounter label="R" />
              </label>
              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Lập trình viên React & Spring Boot"
                className="form-input"
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary">
              Gửi dữ liệu đăng ký (Submit Form) 🚀
            </button>
            <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Hãy thử gõ chữ vào bất kỳ ô nào và quan sát tất cả các huy hiệu Re-render nhấp nháy đồng loạt!
            </span>
          </div>
        </form>

        {/* Submission Output */}
        {submittedData && (
          <div style={{ marginTop: '1.5rem', background: '#030610', padding: '1.25rem', borderRadius: '10px', border: '1px solid #10b981' }}>
            <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              ✓ Submit thành công! Dữ liệu thu thập được:
            </div>
            <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.82rem' }}>
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
