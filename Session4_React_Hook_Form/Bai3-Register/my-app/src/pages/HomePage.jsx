import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const goldenRules = [
    {
      num: 1,
      title: 'register() là Cây Cầu Nối DOM ↔ RHF',
      desc: 'register("fieldName") nói với React Hook Form: "Input này thuộc form của bạn và mang danh tính là fieldName".',
      icon: '🌉',
      color: '#ec4899',
    },
    {
      num: 2,
      title: 'Tham Số String Quyết Định JSON Key',
      desc: 'register("email") tạo ra data.email khi submit. register("user.profile.age") tạo ra object lồng nhau data.user.profile.age.',
      icon: '🏷️',
      color: '#38bdf8',
    },
    {
      num: 3,
      title: 'register() Trả Về Một Object Chứa 4 Props',
      desc: 'Nó không trả về string. Nó trả về { name, onChange, onBlur, ref } chứa toàn bộ mã kết nối cần thiết.',
      icon: '📦',
      color: '#10b981',
    },
    {
      num: 4,
      title: 'Dấu ... Là JavaScript Spread Syntax Thuần Túy',
      desc: 'Không phải cú pháp ma thuật của RHF. Dấu ... chỉ đơn giản là trải (spread) 4 properties của object vào thẻ JSX <input />.',
      icon: '✨',
      color: '#f59e0b',
    },
    {
      num: 5,
      title: 'Cẩn Thận Cạm Bẫy Ghi Đè (Override Trap)',
      desc: 'Nếu viết <input {...register("email")} onChange={fn} />, hàm fn sẽ vô tình đè mất onChange của RHF, khiến form không lưu được dữ liệu!',
      icon: '⚠️',
      color: '#f43f5e',
    },
    {
      num: 6,
      title: 'HTML Input Luôn Trả Về Chuỗi (String)',
      desc: '<input type="number" /> vẫn trả chuỗi "20" trong DOM. Cần thêm { valueAsNumber: true } nếu muốn RHF tự ép sang kiểu số.',
      icon: '🔢',
      color: '#c084fc',
    },
  ];

  return (
    <div>
      <div className="glass-card" style={{ borderLeft: '4px solid var(--accent-pink)' }}>
        <h2 className="card-title">
          <span>✍️</span> register() — Cây Cầu Nối Giữa DOM Input Và React Hook Form
        </h2>
        <p className="card-subtitle">
          Trong các bài học trước, bạn đã thấy dòng code quen thuộc: <code>&lt;input &#123;...register("email")&#125; /&gt;</code>. 
          Hôm nay chúng ta sẽ <strong>mổ xẻ đến tận cùng</strong>: <code>register()</code> thực sự trả về cái gì, 
          tại sao lại có dấu ba chấm <code>...</code>, và làm thế nào mà RHF biết được người dùng đang gõ gì mà không cần <code>useState</code>.
        </p>

        {/* Visual Dissection Banner */}
        <div style={{ background: '#03050e', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(236, 72, 153, 0.3)', marginBottom: '1.75rem' }}>
          <div style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.6rem' }}>
            🔬 Giải Phẫu Cú Pháp: &lt;input &#123;...register("email")&#125; /&gt;
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', fontFamily: 'JetBrains Mono', fontSize: '0.84rem' }}>
            <div style={{ background: 'rgba(236, 72, 153, 0.08)', border: '1px solid rgba(236, 72, 153, 0.25)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#f472b6', fontWeight: 700, marginBottom: '0.3rem' }}>1. register("email") thực thi:</div>
              <div style={{ color: '#cbd5e1' }}>
                Trả về object:<br />
                &#123;<br />
                &nbsp;&nbsp;name: "email",<br />
                &nbsp;&nbsp;onChange: [Function],<br />
                &nbsp;&nbsp;onBlur: [Function],<br />
                &nbsp;&nbsp;ref: [Function]<br />
                &#125;
              </div>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '0.3rem' }}>2. Toán tử spread (...) bung ra:</div>
              <div style={{ color: '#cbd5e1' }}>
                Tương đương viết thủ công:<br />
                &lt;input<br />
                &nbsp;&nbsp;name="email"<br />
                &nbsp;&nbsp;onChange=&#123;rhfChange&#125;<br />
                &nbsp;&nbsp;onBlur=&#123;rhfBlur&#125;<br />
                &nbsp;&nbsp;ref=&#123;rhfRef&#125;<br />
                /&gt;
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Golden Rules */}
      <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>💎</span> 6 Nguyên Tắc Vàng Của Lesson 3
      </h3>

      <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
        {goldenRules.map((rule) => (
          <div
            key={rule.num}
            style={{
              background: 'rgba(14, 19, 36, 0.9)',
              borderRadius: '14px',
              padding: '1.35rem',
              border: `1px solid rgba(255, 255, 255, 0.08)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '1.4rem' }}>{rule.icon}</span>
                <span className="badge" style={{ background: `${rule.color}22`, color: rule.color, border: `1px solid ${rule.color}55` }}>
                  Mục #{rule.num}
                </span>
              </div>
              <h4 style={{ color: '#f8fafc', fontSize: '1rem', fontWeight: 700, marginBottom: '0.45rem', lineHeight: 1.4 }}>
                {rule.title}
              </h4>
              <p style={{ color: '#94a3b8', fontSize: '0.86rem', lineHeight: 1.55 }}>
                {rule.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Launch Cards */}
      <div className="grid-3">
        <div style={{ background: 'rgba(14, 19, 36, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#ec4899', marginBottom: '0.4rem' }}>🔬 Giải Phẫu Spread</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Xem trực tiếp Object do register(name) sinh ra và thử nghiệm dynamic field name.
          </p>
          <Link to="/spread-inspector" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Mở Spread Inspector →
          </Link>
        </div>

        <div style={{ background: 'rgba(14, 19, 36, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#38bdf8', marginBottom: '0.4rem' }}>🧬 Mổ Xẻ 4 Props</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Tương tác chi tiết với name, onChange, onBlur và ref trên phần tử DOM thật.
          </p>
          <Link to="/the-4-props" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Mở 4 Props Lab →
          </Link>
        </div>

        <div style={{ background: 'rgba(14, 19, 36, 0.8)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h4 style={{ color: '#f43f5e', marginBottom: '0.4rem' }}>⚠️ Cạm Bẫy Ghi Đè</h4>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem' }}>
            Tránh lỗi tai hại khi đặt custom onChange phía sau cú pháp spread {...register}.
          </p>
          <Link to="/override-pitfall" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            Xem Cạm Bẫy →
          </Link>
        </div>
      </div>
    </div>
  );
}
