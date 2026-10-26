import React, { useRef, useState } from 'react';
import RenderCounter from '../components/common/RenderCounter';

export default function UncontrolledRefLabPage() {
  // Controlled demo state
  const [controlledText, setControlledText] = useState('');

  // Uncontrolled demo refs
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const [uncontrolledOutput, setUncontrolledOutput] = useState(null);

  const handleUncontrolledSubmit = (e) => {
    e.preventDefault();
    setUncontrolledOutput({
      username: usernameRef.current ? usernameRef.current.value : '',
      email: emailRef.current ? emailRef.current.value : '',
    });
  };

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid #10b981' }}>
        <h2 className="card-title">
          <span>🎯</span> Uncontrolled Components & Sức Mạnh Của useRef
        </h2>
        <p className="card-subtitle">
          Tìm hiểu cách khai thác <code>useRef</code> để đọc trực tiếp dữ liệu từ DOM mà <strong>hoàn toàn không kích hoạt Re-render</strong> khi người dùng gõ phím.
        </p>

        {/* Side-by-side Live Comparison */}
        <div className="grid-2" style={{ marginBottom: '2rem' }}>
          {/* Controlled Form */}
          <div style={{ background: '#030610', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.95rem' }}>
                Form A: Controlled (useState)
              </span>
              <RenderCounter label="Form A Renders" />
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Mỗi phím gõ phát sinh <code>onChange</code> -&gt; <code>setState</code> -&gt; kích hoạt re-render ngay lập tức.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Gõ vào đây và xem số render nhảy liên tục..."
                value={controlledText}
                onChange={(e) => setControlledText(e.target.value)}
                className="form-input"
              />
            </div>

            <div style={{ fontSize: '0.82rem', color: '#cbd5e1', background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem 0.75rem', borderRadius: '6px' }}>
              Giá trị trong State: <strong style={{ color: '#ec4899' }}>"{controlledText}"</strong>
            </div>
          </div>

          {/* Uncontrolled Form with Ref */}
          <div style={{ background: '#030610', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
              <span style={{ color: '#34d399', fontWeight: 700, fontSize: '0.95rem' }}>
                Form B: Uncontrolled (useRef)
              </span>
              <RenderCounter label="Form B Renders" />
            </div>

            <p style={{ fontSize: '0.84rem', color: '#94a3b8', marginBottom: '1rem' }}>
              DOM tự giữ giá trị. Bạn gõ cả đoạn văn dài thì số lần Re-render vẫn <strong>giữ nguyên bằng 1</strong>!
            </p>

            <form onSubmit={handleUncontrolledSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username (ref={usernameRef})"
                  defaultValue="tung_pro"
                  className="form-input"
                />
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email (ref={emailRef})"
                  defaultValue="tung@gmail.com"
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-emerald btn-sm" style={{ width: '100%' }}>
                Đọc giá trị từ Ref (Submit) 🚀
              </button>
            </form>

            {uncontrolledOutput && (
              <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.08)', padding: '0.5rem', borderRadius: '6px' }}>
                Đọc được: {uncontrolledOutput.username} | {uncontrolledOutput.email}
              </div>
            )}
          </div>
        </div>

        {/* Critical Architecture Rule: RHF is NOT just useRef */}
        <div style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.3)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ color: '#c084fc', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🧠</span> ĐỪNG HIỂU SAI RẰNG: React Hook Form = Chỉ Là Wrapper Của useRef!
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1rem' }}>
            Nhiều lập trình viên lầm tưởng: <em>"Ồ, RHF chỉ là bọc cái ref lại thôi chứ có gì đâu!"</em>. 
            Thực tế, tận dụng Uncontrolled/Native inputs chỉ là một phần nhỏ trong nền tảng kiến trúc của React Hook Form. RHF là một <strong>Hệ Điều Hành Quản Lý Form Toàn Diện</strong>:
          </p>

          <div className="grid-3" style={{ fontSize: '0.85rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.3rem' }}>1. Field Registration</div>
              <p style={{ color: '#94a3b8' }}>Tự động đăng ký lifecycle của input vào bộ nhớ trung tâm thông qua <code>register()</code>.</p>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#ec4899', fontWeight: 700, marginBottom: '0.3rem' }}>2. Validation Engine</div>
              <p style={{ color: '#94a3b8' }}>Hỗ trợ cả validation chuẩn HTML5 (required, min, max, pattern) lẫn Schema Validation với Zod.</p>
            </div>

            <div style={{ background: 'rgba(0, 0, 0, 0.35)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: '0.3rem' }}>3. FormState Subscriptions</div>
              <p style={{ color: '#94a3b8' }}>Chỉ re-render những thành phần thực sự đăng ký lắng nghe (Proxy-based tracking) như <code>errors</code>, <code>isDirty</code>, <code>isValid</code>.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
