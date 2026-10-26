import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function NestedAndTypesStudioPage() {
  const [submittedData, setSubmittedData] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      user: {
        fullName: 'Nguyễn Văn A',
        email: 'vana@zerotohero.vn',
      },
      address: {
        street: '123 Đường Công Nghệ',
        city: 'Hà Nội',
      },
      plainAge: 25,
      typedAge: 25,
    },
  });

  const onSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
        <h2 className="card-title">
          <span>🌲</span> Nested Data Paths & Cạm Bẫy Kiểu Dữ Liệu Số (valueAsNumber)
        </h2>
        <p className="card-subtitle">
          Khám phá cách <code>register("parent.child")</code> tự động dựng cây JSON phức tạp, 
          và cách giải quyết triệt để vấn đề thẻ HTML <code>type="number"</code> nhưng lại trả về chuỗi <code>"25"</code>.
        </p>

        {/* Studio Form */}
        <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.25)', marginBottom: '2rem' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Section 1: Nested Structure */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>📁</span> 1. Cấu Trúc Dữ Liệu Lồng Nhau (Nested Paths):
              </div>

              <div className="grid-2">
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Họ và tên (register("user.fullName"))
                  </label>
                  <input
                    type="text"
                    {...register('user.fullName')}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Email (register("user.email"))
                  </label>
                  <input
                    type="email"
                    {...register('user.email')}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Đường / Phố (register("address.street"))
                  </label>
                  <input
                    type="text"
                    {...register('address.street')}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Thành phố (register("address.city"))
                  </label>
                  <input
                    type="text"
                    {...register('address.city')}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Number vs String */}
            <div style={{ marginBottom: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1.25rem' }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span>🔢</span> 2. So Sánh Kiểu Dữ Liệu Số (Mặc định vs valueAsNumber: true):
              </div>

              <div className="grid-2">
                <div style={{ background: 'rgba(244, 63, 94, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#fb7185', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Tuổi thông thường: register("plainAge")
                  </label>
                  <input
                    type="number"
                    {...register('plainAge')}
                    className="form-input"
                  />
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    ⚠️ HTML DOM mặc định trả về: <code style={{ color: '#fb7185' }}>"25" (string)</code>
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#34d399', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Tuổi có option: register("typedAge", &#123; valueAsNumber: true &#125;)
                  </label>
                  <input
                    type="number"
                    {...register('typedAge', { valueAsNumber: true })}
                    className="form-input"
                  />
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.4rem' }}>
                    ✅ RHF tự động ép kiểu sang: <code style={{ color: '#34d399' }}>25 (number)</code>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button type="submit" className="btn btn-emerald">
                Submit Form Và Xem Cấu Trúc JSON 🚀
              </button>
              <button type="button" onClick={() => { reset(); setSubmittedData(null); }} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>

          {/* Submitted JSON Output */}
          {submittedData && (
            <div style={{ marginTop: '1.5rem', background: '#03050e', padding: '1.25rem', borderRadius: '10px', border: '1px solid #10b981' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>
                  ✓ JSON Payload Nhận Được:
                </span>
                <span className="badge badge-emerald">Nested Object Created</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '0.75rem', fontFamily: 'JetBrains Mono', fontSize: '0.82rem' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '6px' }}>
                  typeof data.plainAge: <strong style={{ color: '#fb7185' }}>"{typeof submittedData.plainAge}"</strong> (Giá trị: {JSON.stringify(submittedData.plainAge)})
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: '6px' }}>
                  typeof data.typedAge: <strong style={{ color: '#34d399' }}>"{typeof submittedData.typedAge}"</strong> (Giá trị: {JSON.stringify(submittedData.typedAge)})
                </div>
              </div>

              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.82rem' }}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
