import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function OverridePitfallLabPage() {
  const [customCounterA, setCustomCounterA] = useState(0);
  const [customCounterB, setCustomCounterB] = useState(0);
  const [submittedResult, setSubmittedResult] = useState(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      brokenField: '',
      fixedField: '',
    },
  });

  const fixedReg = register('fixedField');

  const onSubmit = (data) => {
    setSubmittedResult(data);
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #f43f5e' }}>
        <h2 className="card-title">
          <span>⚠️</span> Cạm Bẫy Ghi Đè (The Props Override Trap)
        </h2>
        <p className="card-subtitle">
          Khi tự ý viết thêm <code>onChange</code> hoặc <code>name</code> sau cú pháp spread <code>&#123;...register()&#125;</code>, 
          bạn có thể vô tình <strong>xóa sổ hoàn toàn liên kết của React Hook Form</strong>!
        </p>

        {/* Comparison Grid */}
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* Box 1: Broken */}
          <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#fb7185', fontWeight: 700, fontSize: '0.95rem' }}>
                ❌ LỖI: Ghi đè onChange của RHF
              </span>
              <span className="badge badge-pink">Bug Nguy Hiểm</span>
            </div>

            <div className="code-box" style={{ fontSize: '0.78rem', marginBottom: '1rem' }}>
              &lt;input<br />
              &nbsp;&nbsp;&#123;...register("brokenField")&#125;<br />
              &nbsp;&nbsp;<span style={{ color: '#f43f5e', fontWeight: 700 }}>onChange=&#123;(e) =&gt; setCustom(e)&#125;</span><br />
              /&gt;<br />
              <span style={{ color: '#64748b', fontStyle: 'italic' }}>// 👉 onChange đặt sau đã xóa sạch onChange của RHF!</span>
            </div>

            <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
              Thử gõ vào ô bị lỗi (brokenField):
            </label>
            <input
              type="text"
              placeholder="Gõ thử vào đây..."
              {...register('brokenField')}
              onChange={() => {
                setCustomCounterA((prev) => prev + 1);
                // Vô tình không gọi RHF onChange!
              }}
              className="form-input"
              style={{ borderColor: '#f43f5e' }}
            />
            <div style={{ fontSize: '0.78rem', color: '#fb7185', marginTop: '0.4rem' }}>
              Sự kiện gõ ngoài lề đã bắt: {customCounterA} lần (nhưng RHF không hề biết!)
            </div>
          </div>

          {/* Box 2: Fixed */}
          <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem' }}>
                ✅ CHUẨN: Gọi hàm lồng nhau (Chaining)
              </span>
              <span className="badge badge-emerald">Giải Pháp Senior</span>
            </div>

            <div className="code-box" style={{ fontSize: '0.78rem', marginBottom: '1rem' }}>
              const fixedReg = register("fixedField");<br />
              &lt;input<br />
              &nbsp;&nbsp;&#123;...fixedReg&#125;<br />
              &nbsp;&nbsp;<span style={{ color: '#34d399', fontWeight: 700 }}>onChange=&#123;(e) =&gt; &#123;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#38bdf8' }}>fixedReg.onChange(e);</span> // Báo cho RHF<br />
              &nbsp;&nbsp;&nbsp;&nbsp;setCustom(e); // Logic của bạn<br />
              &nbsp;&nbsp;&#125;&#125;<br />
              /&gt;
            </div>

            <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem', fontWeight: 600 }}>
              Thử gõ vào ô chuẩn (fixedField):
            </label>
            <input
              type="text"
              placeholder="Gõ thử vào đây..."
              name={fixedReg.name}
              onBlur={fixedReg.onBlur}
              ref={fixedReg.ref}
              onChange={(e) => {
                fixedReg.onChange(e); // Báo RHF
                setCustomCounterB((prev) => prev + 1);
              }}
              className="form-input"
              style={{ borderColor: '#10b981' }}
            />
            <div style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '0.4rem' }}>
              Sự kiện gõ ngoài lề đã bắt: {customCounterB} lần (và RHF vẫn nhận data đầy đủ!)
            </div>
          </div>
        </div>

        {/* Live Submit Test */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f8fafc', marginBottom: '0.6rem', fontWeight: 700 }}>
            🚀 Nhấn Submit Để Xem Sự Thật Trần Trụi Về Dữ Liệu RHF Nhận Được:
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Sau khi gõ chữ vào cả 2 ô bên trên, hãy bấm nút Submit dưới đây để xem sự khác biệt.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleSubmit(onSubmit)} className="btn btn-primary">
              Kiểm Tra Dữ Liệu RHF Thu Thập 🚀
            </button>
            <button
              onClick={() => {
                reset();
                setCustomCounterA(0);
                setCustomCounterB(0);
                setSubmittedResult(null);
              }}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>

          {submittedResult && (
            <div style={{ marginTop: '1.25rem', background: '#03050e', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.15)' }}>
              <div style={{ color: '#f8fafc', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Kết quả JSON từ hàm onSubmit(data):
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.84rem' }}>
                <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #f43f5e' }}>
                  <div style={{ color: '#fb7185', fontWeight: 700 }}>brokenField:</div>
                  <div style={{ color: '#cbd5e1', marginTop: '0.2rem' }}>
                    "{submittedResult.brokenField}" <span style={{ color: '#fb7185' }}>(❌ Rỗng! Bị mất do override)</span>
                  </div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.85rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  <div style={{ color: '#34d399', fontWeight: 700 }}>fixedField:</div>
                  <div style={{ color: '#cbd5e1', marginTop: '0.2rem' }}>
                    "{submittedResult.fixedField}" <span style={{ color: '#34d399' }}>(✅ Thu thập chính xác 100%)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
