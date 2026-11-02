import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="homepage-container">
      {/* Hero Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #131d2e 0%, #0b0f19 100%)' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.75rem', color: '#38bdf8' }}>
          🎛️ Controller — Khi register() Không Còn Đủ Sức
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: '1.7' }}>
          Với các thẻ <code>&lt;input&gt;</code> HTML thuần, <code>register()</code> là vũ khí tối thượng nhờ cú pháp spread gọn gàng.
          Nhưng trong các hệ thống Design System hiện đại (AntD, MUI, React-Select, Custom UI), các component đòi hỏi prop riêng biệt
          như <code>rating</code>, <code>onRatingChange</code>, <code>checked</code>, hay trả về complex object.
          <strong>Controller chính là Adapter Pattern (Bộ chuyển đổi)</strong> giúp RHF kết nối với bất kỳ UI Component nào trên đời!
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <Link to="/lab1-adapter" className="btn btn-primary">
            <span>🚀 Khám Phá Lab 1 (Adapter Custom Rating & Switch)</span>
          </Link>
          <Link to="/lab2-hybrid" className="btn btn-secondary">
            <span>⚡ Thử Nghiệm Lab 2 (Hybrid Form: register + Controller)</span>
          </Link>
          <Link to="/lab3-transform" className="btn btn-outline">
            <span>🔄 Xem Lab 3 (Object Data Transformation)</span>
          </Link>
        </div>
      </div>

      {/* The 3 State Scenarios Matrix */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">💡 Giải Phẫu 3 Trường Hợp: Ai Đang Quản Lý State?</h3>
          <span className="badge badge-purple">Senior Mental Model</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1.25rem' }}>
          Một trong những hiểu lầm lớn nhất của lập trình viên là nghĩ rằng: <em>"Cứ viết Custom Component là bắt buộc phải dùng Controller"</em>.
          Thực tế, câu hỏi quyết định phải là: <strong>"Ai đang quản lý giá trị của component này?"</strong>
        </p>

        <div className="grid-3">
          <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>⚛️</div>
            <h4 style={{ color: '#38bdf8', marginBottom: '0.5rem' }}>1. useState Cục Bộ Quản Lý</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Component tự quản lý bằng <code>useState(1)</code>. Nối thẳng <code>rating={'{rating}'}</code> và <code>onRatingChange={'{setRating}'}</code>.
            </p>
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', fontSize: '0.8rem', color: '#f87171' }}>
              ❌ <strong>KHÔNG CẦN Controller</strong> (RHF không tham gia)
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>👨‍👦</div>
            <h4 style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>2. Parent State Quản Lý</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Component Cha truyền props và callback tùy biến xuống cho Con. State nằm ở cha.
            </p>
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '6px', fontSize: '0.8rem', color: '#f87171' }}>
              ❌ <strong>KHÔNG CẦN Controller</strong> (Chưa cần tích hợp form)
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: '10px', border: '1px solid #334155' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🎛️</div>
            <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>3. React Hook Form Quản Lý</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
              Giá trị này nằm trong form data submit, cần validate, reset, dirty tracking của RHF.
            </p>
            <div style={{ marginTop: '0.75rem', padding: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', borderRadius: '6px', fontSize: '0.8rem', color: '#34d399' }}>
              ✅ <strong>BẮT BUỘC DÙNG Controller</strong> làm Adapter!
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Golden Questions Formula */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🔑 Công Thức 4 Câu Hỏi Vàng (Tích Hợp Mọi Thư Viện UI)</h3>
          <span className="badge badge-emerald">Universal Adapter Recipe</span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
          Khi gặp bất kỳ component nào từ Material UI, Ant Design, Mantine hay thư viện tự viết, bạn không cần học thuộc cú pháp. Chỉ cần trả lời 4 câu hỏi:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#0e1626', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
            <strong style={{ color: '#38bdf8' }}>① Component nhận VALUE bằng prop nào?</strong>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.3rem' }}>
              Ví dụ: <code>value</code>, <code>rating</code>, <code>checked</code>, <code>selectedDate</code>...<br />
              👉 Ánh xạ: <code>propName={'{field.value}'}</code>
            </p>
          </div>

          <div style={{ background: '#0e1626', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #a855f7' }}>
            <strong style={{ color: '#c084fc' }}>② Component báo CHANGE bằng callback nào?</strong>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.3rem' }}>
              Ví dụ: <code>onChange</code>, <code>onRatingChange</code>, <code>onToggle</code>...<br />
              👉 Ánh xạ: <code>callbackName={'{field.onChange}'}</code>
            </p>
          </div>

          <div style={{ background: '#0e1626', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <strong style={{ color: '#fbbf24' }}>③ Callback trả ra dữ liệu dạng gì?</strong>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.3rem' }}>
              Trực tiếp (số/string), hay DOM Event <code>e.target.value</code>, hay Object <code>{'{ label, value }'}</code>?
            </p>
          </div>

          <div style={{ background: '#0e1626', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
            <strong style={{ color: '#34d399' }}>④ RHF Form cần lưu dữ liệu dạng gì?</strong>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.3rem' }}>
              Nếu cần transform, bạn tự bọc: <code>onChange={'(val) => field.onChange(val.id)'}</code>
            </p>
          </div>
        </div>
      </div>

      {/* Comparison: register vs Controller */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">⚖️ So Sánh Trực Diện: register() vs Controller</h3>
          <span className="badge badge-cyan">Architecture Checklist</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="matrix-table">
            <thead>
              <tr>
                <th>Tiêu Chí</th>
                <th><code>register("fieldName")</code></th>
                <th><code>&lt;Controller /&gt;</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Mục tiêu áp dụng</strong></td>
                <td>Native inputs (<code>&lt;input&gt;</code>, <code>&lt;select&gt;</code>, <code>&lt;textarea&gt;</code>) hoặc Custom component forwardRef</td>
                <td>Controlled components của 3rd-party hoặc Custom UI không tương thích API native</td>
              </tr>
              <tr>
                <td><strong>Bản chất kỹ thuật</strong></td>
                <td>Trả về <code>{'{ name, onChange, onBlur, ref }'}</code> để spread</td>
                <td>Render-prop component nhận <code>field</code> và <code>fieldState</code> để tự mapping</td>
              </tr>
              <tr>
                <td><strong>Độ phức tạp code</strong></td>
                <td>Rất ngắn gọn (1 dòng)</td>
                <td>Dài hơn, cần chỉ định <code>control</code> và hàm <code>render</code></td>
              </tr>
              <tr>
                <td><strong>Khả năng Transform dữ liệu</strong></td>
                <td>Hạn chế (phụ thuộc giá trị input native)</td>
                <td>Rất linh hoạt, có thể biến đổi Object, mảng, số tùy ý trước khi nạp vào form</td>
              </tr>
              <tr>
                <td><strong>Hiệu năng render</strong></td>
                <td>Cực cao (Uncontrolled mặc định)</td>
                <td>Tối ưu nhờ cô lập trong component Controller</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

