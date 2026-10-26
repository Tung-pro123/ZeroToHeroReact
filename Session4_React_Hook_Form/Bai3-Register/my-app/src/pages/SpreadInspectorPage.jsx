import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import RenderCounter from '../components/common/RenderCounter';

export default function SpreadInspectorPage() {
  const [fieldName, setFieldName] = useState('userEmail');
  const [submittedJson, setSubmittedJson] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Inspect the raw object returned by register()
  const registrationObject = register(fieldName);

  const onSubmit = (data) => {
    setSubmittedJson(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #ec4899' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <h2 className="card-title">
              <span>🔬</span> Bộ Giải Phẫu Cú Pháp Spread: register("{fieldName}")
            </h2>
            <p className="card-subtitle" style={{ marginBottom: 0 }}>
              Nhập tên trường bất kỳ để xem cấu trúc đối tượng JavaScript thực tế được <code>register()</code> sinh ra ngay tức thì.
            </p>
          </div>

          <RenderCounter label="Dissector Renders" />
        </div>

        {/* Dynamic Name Input */}
        <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.75rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
            🔤 Nhập tên trường để chạy register(fieldName):
          </label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value.trim() || 'defaultField')}
              className="form-input"
              style={{ maxWidth: '300px', fontFamily: 'JetBrains Mono' }}
            />
            {['userEmail', 'account.password', 'personalInfo.age', 'company.taxId'].map((preset) => (
              <button
                key={preset}
                onClick={() => setFieldName(preset)}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.78rem' }}
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Live Object Inspector Card */}
        <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.3)', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>📦</span> Kết Quả Thực Tế: const regObj = register("{fieldName}")
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.85rem' }}>
            <div style={{ background: '#03050e', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #38bdf8' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>regObj.name</div>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginTop: '0.2rem' }}>"{registrationObject.name}"</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Định danh trường & cấu trúc key JSON</div>
            </div>

            <div style={{ background: '#03050e', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>typeof regObj.onChange</div>
              <div style={{ color: '#34d399', fontWeight: 700, marginTop: '0.2rem' }}>"{typeof registrationObject.onChange}" (Function)</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Bắt sự kiện gõ phím cập nhật vào RHF</div>
            </div>

            <div style={{ background: '#03050e', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #fbbf24' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>typeof regObj.onBlur</div>
              <div style={{ color: '#fbbf24', fontWeight: 700, marginTop: '0.2rem' }}>"{typeof registrationObject.onBlur}" (Function)</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Bắt sự kiện rời ô (mất focus)</div>
            </div>

            <div style={{ background: '#03050e', padding: '1rem', borderRadius: '8px', borderLeft: '3px solid #c084fc' }}>
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>typeof regObj.ref</div>
              <div style={{ color: '#c084fc', fontWeight: 700, marginTop: '0.2rem' }}>"{typeof registrationObject.ref}" (Ref Callback)</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.3rem' }}>Kết nối trực tiếp với HTMLInputElement DOM</div>
            </div>
          </div>
        </div>

        {/* Side-by-Side JSX Syntax Comparison */}
        <h3 style={{ fontSize: '1.1rem', color: '#f8fafc', fontWeight: 700, marginBottom: '0.8rem' }}>
          ⚖️ So Sánh: Cú Pháp Viết Gọn vs Tương Đương Được Bung Ra
        </h3>

        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(236, 72, 153, 0.3)' }}>
            <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              Cách viết chuẩn với Spread:
            </div>
            <pre style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
{`<input 
  type="text" 
  {...register("${fieldName}")} 
/>`}
            </pre>
          </div>

          <div style={{ background: '#03050e', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.5rem' }}>
              Tương đương khi toán tử spread bung ra:
            </div>
            <pre style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
{`<input 
  type="text" 
  name="${registrationObject.name}"
  onChange={regObj.onChange}
  onBlur={regObj.onBlur}
  ref={regObj.ref}
/>`}
            </pre>
          </div>
        </div>

        {/* Live Interactive Testing */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.6rem', fontWeight: 700 }}>
            🧪 Thử Nghiệm Nhập Liệu Và Submit Với Field: "{fieldName}"
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Gõ giá trị bất kỳ vào ô bên dưới rồi nhấn Submit để xem JSON payload phản ánh chính xác <code>regObj.name</code>.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '600px' }}>
            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder={`Nhập dữ liệu cho ${fieldName}...`}
                {...register(fieldName)}
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button type="submit" className="btn btn-primary">
                Submit Form 🚀
              </button>
              <button type="button" onClick={() => { reset(); setSubmittedJson(null); }} className="btn btn-secondary">
                Reset
              </button>
            </div>
          </form>

          {submittedJson && (
            <div style={{ marginTop: '1.25rem', background: '#03050e', padding: '1rem 1.25rem', borderRadius: '8px', border: '1px solid #10b981' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                ✓ JSON Payload thu thập được:
              </div>
              <pre style={{ margin: 0, color: '#e2e8f0', fontSize: '0.82rem' }}>
                {JSON.stringify(submittedJson, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
