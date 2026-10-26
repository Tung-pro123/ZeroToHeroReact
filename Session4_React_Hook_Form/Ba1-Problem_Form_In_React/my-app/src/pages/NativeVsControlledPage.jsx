import React, { useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

export default function NativeVsControlledPage() {
  // Controlled state
  const [controlledName, setControlledName] = useState('');
  
  // Missing onChange demo state
  const [lockedValue, setLockedValue] = useState('Dữ liệu bị khóa cứng');
  
  // Native inspector state
  const [nativeValueRead, setNativeValueRead] = useState('');

  // Step-by-step simulator state
  const [simStep, setSimStep] = useState(1);
  const steps = [
    { step: 1, title: 'User bấm phím "T"', desc: 'Bàn phím gửi tín hiệu nhập liệu vào phần tử DOM <input>.' },
    { step: 2, title: 'Phát sinh sự kiện onChange', desc: 'Trình duyệt DOM kích hoạt event handler onChange={(e) => ...}.' },
    { step: 3, title: 'Bóc tách e.target.value', desc: 'Event object chứa e.target.value mang giá trị chuỗi "T".' },
    { step: 4, title: 'Gọi setUsername("T")', desc: 'React State dispatch hàm cập nhật state mới vào hàng đợi (Queue).' },
    { step: 5, title: 'React xếp lịch Re-render', desc: 'React Scheduler đánh dấu component này cần được re-render lại.' },
    { step: 6, title: 'Component Re-render', desc: 'Hàm Component chạy lại từ đầu đến cuối với username = "T".' },
    { step: 7, title: 'Truyền value={username}', desc: 'Thuộc tính value="T" được chuyển xuống phần tử React Virtual DOM.' },
    { step: 8, title: 'Commit lên DOM thật', desc: 'React cập nhật thuộc tính value của HTMLInputElement và hiển thị chữ "T".' },
  ];

  const handleReadNativeDom = () => {
    const el = document.getElementById('native-input-demo');
    if (el) {
      setNativeValueRead(el.value);
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #38bdf8' }}>
        <h2 className="card-title">
          <span>🔄</span> Native HTML vs Vòng Lặp Controlled Component
        </h2>
        <p className="card-subtitle">
          Khám phá bản chất tại sao HTML thuần không cần state vẫn gõ được, và cơ chế vòng tròn khép kín của Controlled Input trong React.
        </p>

        {/* Comparison Row */}
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* Card 1: Native HTML */}
          <div style={{ background: '#030610', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1rem' }}>
                1. Native HTML Input (Không State)
              </span>
              <span className="badge badge-cyan">0 Re-renders</span>
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Thẻ <code>&lt;input /&gt;</code> tự quản lý giá trị trong bộ nhớ DOM của Browser. Bạn gõ thoải mái mà <strong>Component không bao giờ bị re-render</strong>.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <input
                id="native-input-demo"
                type="text"
                defaultValue="Gõ thử vào đây..."
                className="form-input"
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleReadNativeDom} className="btn btn-secondary btn-sm">
                🔍 Đọc giá trị từ DOM (document.getElementById)
              </button>
              {nativeValueRead && (
                <span style={{ fontSize: '0.85rem', color: '#34d399', fontFamily: 'JetBrains Mono' }}>
                  DOM value = "{nativeValueRead}"
                </span>
              )}
            </div>
          </div>

          {/* Card 2: Controlled Input */}
          <div style={{ background: '#030610', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#ec4899', fontWeight: 700, fontSize: '1rem' }}>
                2. Controlled Input (useState)
              </span>
              <RenderCounter label="Re-renders" />
            </div>

            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Khi gắn <code>value=&#123;controlledName&#125;</code> và <code>onChange</code>, mỗi ký tự gõ vào sẽ kích hoạt 1 lần re-render toàn bộ component!
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Gõ thử vào đây và nhìn huy hiệu Re-renders góc trên..."
                value={controlledName}
                onChange={(e) => setControlledName(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ fontSize: '0.85rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', padding: '0.6rem 0.8rem', borderRadius: '6px' }}>
              React State hiện tại: <strong style={{ color: '#ec4899' }}>"{controlledName}"</strong> (Độ dài: {controlledName.length})
            </div>
          </div>
        </div>

        {/* 8-Step Circular Loop Visualizer */}
        <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚙️</span> Mô Phỏng Vòng Lặp 8 Bước Của Controlled Component
            </h3>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <button
                onClick={() => setSimStep((prev) => (prev > 1 ? prev - 1 : 8))}
                className="btn btn-secondary btn-sm"
              >
                ← Bước trước
              </button>
              <button
                onClick={() => setSimStep((prev) => (prev < 8 ? prev + 1 : 1))}
                className="btn btn-primary btn-sm"
              >
                Bước tiếp theo →
              </button>
            </div>
          </div>

          {/* Stepper pills */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.75rem', marginBottom: '1.25rem' }}>
            {steps.map((s) => (
              <button
                key={s.step}
                onClick={() => setSimStep(s.step)}
                className={`btn btn-sm ${simStep === s.step ? 'btn-primary' : 'btn-secondary'}`}
                style={{ fontSize: '0.78rem', whiteSpace: 'nowrap' }}
              >
                Bước {s.step}
              </button>
            ))}
          </div>

          {/* Active step display */}
          {steps
            .filter((s) => s.step === simStep)
            .map((s) => (
              <div
                key={s.step}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  borderLeft: '4px solid #fbbf24',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: 700 }}>
                    {s.title}
                  </h4>
                  <span className="badge badge-amber">Step {s.step} / 8</span>
                </div>
                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
        </div>

        {/* The Missing onChange Trap */}
        <div style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.3)', padding: '1.25rem', borderRadius: '12px' }}>
          <h4 style={{ color: '#fb7185', fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚠️</span> CẠM BẪY KHI CHỈ CÓ value MÀ KHÔNG CÓ onChange!
          </h4>
          <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '0.8rem' }}>
            Nếu bạn truyền <code>value=&#123;state&#125;</code> vào thẻ input nhưng quên không viết <code>onChange</code>, input sẽ <strong>bị khóa cứng (Read-only)</strong> vì React liên tục áp đặt giá trị của State lên DOM sau mỗi lần nhấn phím!
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <input
                type="text"
                value={lockedValue}
                onChange={() => {}} // dummy to avoid React dev warning, but does not update state
                className="form-input"
                style={{ borderColor: '#f43f5e' }}
              />
            </div>
            <span style={{ fontSize: '0.82rem', color: '#fb7185' }}>
              👈 Thử gõ vào ô này: Bạn không thể thêm bớt bất kỳ ký tự nào!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
