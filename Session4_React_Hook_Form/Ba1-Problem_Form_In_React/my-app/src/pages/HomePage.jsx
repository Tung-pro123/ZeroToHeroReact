import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const goldenRules = [
    {
      num: 1,
      title: 'HTML Input Vốn Tự Quản Lý Value Trong DOM',
      desc: 'Thẻ <input /> trong HTML thuần và trong React không bắt buộc phải có useState thì user mới gõ được chữ. Bản thân trình duyệt đã lưu trữ value trong DOM Node.',
      icon: '🌐',
      color: '#38bdf8'
    },
    {
      num: 2,
      title: 'Controlled Input: Dùng React State Điều Khiển Value',
      desc: 'Khi khai báo value={state} và onChange={e => setState(e.target.value)}, React state trở thành nguồn sự thật duy nhất (Single Source of Truth) quyết định input hiển thị gì.',
      icon: '🔒',
      color: '#ec4899'
    },
    {
      num: 3,
      title: 'Vòng Lặp Keystroke Re-render Vĩnh Cửu',
      desc: 'Mỗi lần gõ một ký tự: onChange kích hoạt -> setState -> component re-render -> render cây con -> cập nhật value lên DOM. 100 ký tự = 100 lần re-render!',
      icon: '🔄',
      color: '#fbbf24'
    },
    {
      num: 4,
      title: 'Controlled Form Không Sai, Nhưng Phình To Rất Nhanh',
      desc: 'Với form 10+ fields, bạn phải tự quản lý: values, validations, error messages, touched state, dirty state, isSubmitting, reset... gây bùng nổ code (Boilerplate Explosion).',
      icon: '💥',
      color: '#f43f5e'
    },
    {
      num: 5,
      title: 'React Hook Form Quản Lý Form Toàn Diện & Hiệu Quả',
      desc: 'RHF tận dụng tiếp cận gần với native/uncontrolled inputs để triệt tiêu re-render thừa mứa, đồng thời cung cấp hệ thống register, handleSubmit, formState cực kỳ tinh gọn.',
      icon: '⚡',
      color: '#34d399'
    },
    {
      num: 6,
      title: 'RHF & Zod: Hai Trọng Trách Hoàn Toàn Khác Biệt',
      desc: 'React Hook Form = Quản lý Form (Values, Events, FormState, Submissions). Zod = Định nghĩa Schema & Xác thực Dữ liệu (Schema Validation). Chúng kết hợp hoàn hảo nhưng độc lập.',
      icon: '🛡️',
      color: '#c084fc'
    }
  ];

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-pink)' }}>
        <h2 className="card-title">
          <span>📋</span> Vấn Đề Của Form Trong React — Nguồn Gốc Của React Hook Form
        </h2>
        <p className="card-subtitle">
          Trước khi vội vã học <code>useForm()</code> và <code>register()</code>, hãy hiểu rõ: 
          <strong> Tại sao React thuần lại gặp khó khăn khi form phình to?</strong> 
          React Hook Form không xuất hiện vì <code>useState</code> không làm được form, mà vì khi form mở rộng, 
          chi phí tự quản lý State, Validation, Errors và Re-render trở nên quá cồng kềnh.
        </p>

        {/* Evolution Timeline */}
        <div style={{ marginTop: '1.75rem', background: 'rgba(0, 0, 0, 0.4)', padding: '1.5rem', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#f472b6', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⏳</span> Lộ Trình Tiến Hóa Của Quản Lý Form Trên Web
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '1.2rem', borderRadius: '10px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                1. HTML THUẦN (Native DOM)
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Browser tự quản lý giá trị trong DOM input. Không cần JavaScript hay React State. Nhẹ và nhanh, nhưng khó validate tức thì.
              </p>
            </div>

            <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.3)', padding: '1.2rem', borderRadius: '10px' }}>
              <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                2. REACT CONTROLLED FORM
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Dùng <code>useState</code> + <code>value</code> + <code>onChange</code>. React nắm toàn quyền kiểm soát nhưng gây re-render trên từng phím gõ.
              </p>
            </div>

            <div style={{ background: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.3)', padding: '1.2rem', borderRadius: '10px' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                3. REACT HOOK FORM + ZOD
              </div>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                Tận dụng native inputs + subscription engine: Zero re-render khi gõ phím, tự động thu thập giá trị, validation schema chuẩn mực.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Golden Rules */}
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>💎</span> 6 Nguyên Tắc Cốt Tử Của Lesson 1 Cần Khắc Cốt Ghi Tâm
      </h3>

      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        {goldenRules.map((rule) => (
          <div
            key={rule.num}
            style={{
              background: 'rgba(15, 19, 34, 0.9)',
              borderRadius: '14px',
              padding: '1.4rem',
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{rule.icon}</span>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: rule.color, border: `1px solid ${rule.color}55` }}>
                  Nguyên tắc #{rule.num}
                </span>
              </div>
              <h4 style={{ color: '#f8fafc', fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                {rule.title}
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: 1.55 }}>
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Launch Cards */}
      <div className="glass-card">
        <h3 className="card-title">
          <span>🚀</span> Các Phòng Thí Nghiệm Trực Quan (Interactive Labs)
        </h3>
        <p className="card-subtitle">
          Hãy tương tác trực tiếp với các demo bên dưới để cảm nhận sự khác biệt:
        </p>

        <div className="grid-3">
          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>1. Native vs Controlled</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Trực quan hóa vòng lặp 8 bước của Controlled Input và so sánh với DOM thuần.
            </p>
            <Link to="/native-vs-controlled" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở Native vs Controlled →
            </Link>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#f43f5e', marginBottom: '0.4rem' }}>2. State Explosion</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Trải nghiệm "Monster Form" 10 fields và quan sát Re-render Heatmap sáng rực.
            </p>
            <Link to="/state-explosion" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở State Explosion Lab →
            </Link>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1.25rem', borderRadius: '10px' }}>
            <h4 style={{ color: '#34d399', marginBottom: '0.4rem' }}>3. Uncontrolled & useRef</h4>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
              Khai thác DOM Ref để triệt tiêu re-render khi gõ phím, tiền đề của React Hook Form.
            </p>
            <Link to="/uncontrolled-lab" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Mở Uncontrolled Lab →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
