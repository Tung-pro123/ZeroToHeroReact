import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function TriadHubPage() {
  const [submittedData, setSubmittedData] = useState(null);

  // useForm instance
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // User's onSubmit function
  const onMySubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #ec4899' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="card-title">
              <span>🏛️</span> Bộ Ba Trụ Cột: register, handleSubmit & formState
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              Tìm hiểu cách 3 nhân vật cốt lõi này tương tác nhịp nhàng để tạo nên sức mạnh của React Hook Form.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            <RenderCounter label="Component Renders" />
            <button onClick={() => { reset(); setSubmittedData(null); }} className="btn btn-secondary btn-sm">
              🔄 Reset Form
            </button>
          </div>
        </div>

        {/* 3 Pillars Summary Cards */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              1. register(name)
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
              "Nói với RHF: input này thuộc form của tôi và có tên là <code>name</code>". Tên này sẽ biến thành key trong JSON payload khi submit.
            </p>
          </div>

          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
            <div style={{ color: '#a855f7', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              2. handleSubmit(fn)
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Hàm trung gian của RHF: Chặn reload trang mặc định, kích hoạt validation, gom toàn bộ Form Data và trao cho hàm <code>onSubmit(data)</code> của bạn.
            </p>
          </div>

          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.4rem', fontFamily: 'JetBrains Mono' }}>
              3. formState
            </div>
            <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
              Chứa thông tin siêu dữ liệu (Metadata): <code>errors</code>, <code>isDirty</code>, <code>isValid</code>, <code>isSubmitting</code>.
            </p>
          </div>
        </div>

        {/* Live Form Testing */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '1rem', fontWeight: 700 }}>
            🧪 Trải Nghiệm Thực Tế: Quan Sát Cách Field Name Biến Thành JSON Data
          </h3>

          <form onSubmit={handleSubmit(onMySubmit)}>
            <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
              {/* Field 1 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Tên tài khoản (register("username"))
                </label>
                <input
                  type="text"
                  placeholder="tung_pro123"
                  {...register('username', { required: 'Username là bắt buộc' })}
                  className={`form-input ${errors.username ? 'input-error' : ''}`}
                />
                {errors.username && <div className="field-error-msg">⚠️ {errors.username.message}</div>}
              </div>

              {/* Field 2 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Địa chỉ Email (register("email"))
                </label>
                <input
                  type="email"
                  placeholder="tung@zero-to-hero.dev"
                  {...register('email', { required: 'Email là bắt buộc' })}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <div className="field-error-msg">⚠️ {errors.email.message}</div>}
              </div>

              {/* Field 3 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Vai trò dự án (register("role"))
                </label>
                <select {...register('role')} className="form-select">
                  <option value="FULLSTACK_DEV">Fullstack Developer (React & Spring)</option>
                  <option value="FRONTEND_LEAD">Frontend Lead</option>
                  <option value="SYSTEM_ARCHITECT">System Architect</option>
                </select>
              </div>

              {/* Field 4 */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                  Thâm niên (register("yearsExperience"))
                </label>
                <input
                  type="number"
                  placeholder="3"
                  defaultValue="3"
                  {...register('yearsExperience')}
                  className="form-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Gửi dữ liệu qua handleSubmit(onMySubmit) 🚀
            </button>
          </form>

          {/* Submission Output */}
          {submittedData && (
            <div style={{ marginTop: '1.5rem', background: '#03050e', padding: '1.25rem', borderRadius: '10px', border: '1px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>
                  ✓ Dữ liệu `data` tự động được RHF tạo và truyền vào onMySubmit(data):
                </span>
                <span className="badge badge-emerald">JSON Ready for API</span>
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.84rem' }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* handleSubmit vs onSubmit Demystified */}
        <div style={{ background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#c084fc', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚡</span> ĐỪNG NHẦM LẪN: handleSubmit KHÔNG PHẢI LÀ onSubmit!
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6 }}>
            - <strong>handleSubmit</strong>: Là function do React Hook Form cung cấp. Nó là "người gác cổng" (Middleware).<br />
            - <strong>onSubmit</strong>: Là function do bạn tự viết để nhận dữ liệu sạch và gửi đến Backend Spring Boot.<br />
            - Khi viết <code>onSubmit=&#123;handleSubmit(onSubmit)&#125;</code>: Bạn đang giao việc kiểm tra và gom data cho RHF trước; nếu mọi thứ hợp lệ, RHF sẽ gọi hàm <code>onSubmit(data)</code> của bạn!
          </p>
        </div>
      </div>
    </div>
  );
}
