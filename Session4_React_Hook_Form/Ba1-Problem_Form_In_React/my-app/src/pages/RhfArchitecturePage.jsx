import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function RhfArchitecturePage() {
  const [rhfOutput, setRhfOutput] = useState(null);

  // Live React Hook Form instance
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onRhfSubmit = (data) => {
    setRhfOutput(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #a855f7' }}>
        <h2 className="card-title">
          <span>⚡</span> Kiến Trúc React Hook Form vs Zod & Xem Trước useForm()
        </h2>
        <p className="card-subtitle">
          Khám phá cách React Hook Form thu gọn 50 dòng code thủ công thành một vài dòng khai báo thanh lịch, đồng thời phân định ranh giới giữa RHF và Zod.
        </p>

        {/* Live RHF Demo */}
        <div style={{ background: '#030610', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.3)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ color: '#c084fc', fontWeight: 700, fontSize: '1rem' }}>
              🔬 Trải Nghiệm Thử Nghiệm: React Hook Form Hoạt Động Trực Tiếp
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <RenderCounter label="RHF Component Renders" />
              <button onClick={() => { reset(); setRhfOutput(null); }} className="btn btn-secondary btn-sm">
                Reset
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onRhfSubmit)}>
            <div className="grid-2" style={{ marginBottom: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Email (register("email", &#123; required: true &#125;))
                </label>
                <input
                  type="email"
                  placeholder="nhap.email@example.com"
                  {...register('email', { required: 'Email không được để trống' })}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <div className="field-error-msg">⚠️ {errors.email.message}</div>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem', fontWeight: 600 }}>
                  Mật khẩu (register("password", &#123; minLength: 6 &#125;))
                </label>
                <input
                  type="password"
                  placeholder="Tối thiểu 6 ký tự"
                  {...register('password', {
                    required: 'Mật khẩu là bắt buộc',
                    minLength: { value: 6, message: 'Tối thiểu 6 ký tự' },
                  })}
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                />
                {errors.password && <div className="field-error-msg">⚠️ {errors.password.message}</div>}
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn btn-purple">
              Gửi Form Qua handleSubmit(onSubmit) 🚀
            </button>
          </form>

          {rhfOutput && (
            <div style={{ marginTop: '1rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid #10b981', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                ✓ handleSubmit đã tự động gom dữ liệu & validate:
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.82rem' }}>
                {JSON.stringify(rhfOutput, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Code Comparison */}
        <h3 style={{ fontSize: '1.15rem', color: '#f8fafc', fontWeight: 700, marginBottom: '1rem' }}>
          💻 So Sánh Mã Nguồn: React Thuần vs React Hook Form
        </h3>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* React Pure */}
          <div style={{ background: '#030610', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.9rem' }}>❌ React Thuần (40+ dòng code thủ công)</span>
              <span className="badge badge-pink" style={{ fontSize: '0.7rem' }}>Nhiều Boilerplate</span>
            </div>
            <pre style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, overflowX: 'auto' }}>
{`// Phải tạo state riêng cho từng trường & lỗi
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

function handleSubmit(e) {
  e.preventDefault();
  if (!email) { setEmailError("Required"); return; }
  if (password.length < 6) { setPasswordError("Min 6"); return; }
  sendApi({ email, password });
}

return (
  <form onSubmit={handleSubmit}>
    <input value={email} onChange={e => setEmail(e.target.value)} />
    {emailError && <span>{emailError}</span>}
    <input value={password} onChange={e => setPassword(e.target.value)} />
    {passwordError && <span>{passwordError}</span>}
  </form>
);`}
            </pre>
          </div>

          {/* React Hook Form */}
          <div style={{ background: '#030610', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#c084fc', fontWeight: 700, fontSize: '0.9rem' }}>✅ React Hook Form (10 dòng thanh lịch)</span>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>Chuẩn Production</span>
            </div>
            <pre style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0, overflowX: 'auto' }}>
{`// useForm tự động quản lý tất cả!
const { register, handleSubmit, formState: { errors } } = useForm();

function onSubmit(data) {
  sendApi(data); // Dữ liệu đã validate xong
}

return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register("email", { required: true })} />
    {errors.email && <span>Bắt buộc</span>}
    
    <input {...register("password", { minLength: 6 })} />
    {errors.password && <span>Tối thiểu 6 ký tự</span>}
    
    <button type="submit">Submit</button>
  </form>
);`}
            </pre>
          </div>
        </div>

        {/* Demarcation: RHF vs Zod */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#38bdf8', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🛡️</span> Phân Định Rạch Ròi: React Hook Form vs Zod
          </h3>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
            Rất nhiều bạn mới học bị nhầm lẫn và coi hai thư viện này là một. Hãy khắc sâu ranh giới kỹ thuật:
          </p>

          <div className="grid-2">
            <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '1.2rem', borderRadius: '10px' }}>
              <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                React Hook Form = QUẢN LÝ FORM (Form Engine)
              </div>
              <ul style={{ fontSize: '0.84rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li>Đăng ký và hủy đăng ký các trường input trong DOM.</li>
                <li>Theo dõi trạng thái: <code>isDirty</code>, <code>isSubmitting</code>, <code>touchedFields</code>.</li>
                <li>Bắt sự kiện Submit, reset form, quản lý form lifecycle.</li>
                <li>Tối ưu hiệu năng, triệt tiêu re-render khi gõ phím.</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1.2rem', borderRadius: '10px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                Zod = ĐỊNH NGHĨA SCHEMA & VALIDATION DỮ LIỆU
              </div>
              <ul style={{ fontSize: '0.84rem', color: '#cbd5e1', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
                <li>Định nghĩa cấu trúc hình dáng của object (Schema Contract).</li>
                <li>Kiểm tra tính hợp lệ nghiệp vụ: email hợp lệ, regex, min/max, custom rules.</li>
                <li>Tự động sinh ra TypeScript Type tương ứng (<code>z.infer&lt;typeof schema&gt;</code>).</li>
                <li>Có thể dùng độc lập ở cả Frontend lẫn Backend Node.js.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* When NOT to use RHF */}
        <div style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fbbf24', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💡</span> Khi Nào KHÔNG Cần Dùng React Hook Form?
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            Không phải cứ thấy thẻ <code>&lt;form&gt;</code> là phải cài RHF. 
            Nếu bạn chỉ làm một <strong>ô tìm kiếm đơn giản 1 trường (Search Bar)</strong> hoặc một form 2 nút gạt Toggle không có validation phức tạp, 
            thì <code>const [search, setSearch] = useState("")</code> hoàn toàn đủ tốt và nhanh gọn.
          </p>
        </div>
      </div>
    </div>
  );
}
